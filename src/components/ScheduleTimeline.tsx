//타임라인

import { useEffect, useState } from 'react';
import type { ScheduleJob } from '../types/api';

interface TimelineSegment {
  type: 'work' | 'idle' | 'move';
  label: string;
  start: Date;
  end: Date;
  jobData?: ScheduleJob;
}

interface WorkerTimeline {
  welderName: string;
  welderId: number;
  segments: TimelineSegment[];
}

interface ScheduleTimelineProps {
  jobs: ScheduleJob[];
  sessionStart: Date;
  sessionEnd: Date;
}

export default function ScheduleTimeline({ jobs, sessionStart, sessionEnd }: ScheduleTimelineProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 현재 시간 업데이트 (1초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 용접공별로 작업 그룹화 및 타임라인 생성
  const workerTimelines: WorkerTimeline[] = (() => {
    const welderMap = new Map<number, ScheduleJob[]>();
    
    // 용접공별로 작업 그룹화
    jobs.forEach(job => {
      const existing = welderMap.get(job.welder_id) || [];
      welderMap.set(job.welder_id, [...existing, job]);
    });

    // 각 용접공의 타임라인 생성
    return Array.from(welderMap.entries()).map(([welderId, welderJobs]) => {
      // 시작 시간 순으로 정렬
      const sortedJobs = [...welderJobs].sort((a, b) => 
        new Date(a.estimated_start_time).getTime() - new Date(b.estimated_start_time).getTime()
      );

      const segments: TimelineSegment[] = [];
      let lastEndTime = new Date(sessionStart);

      sortedJobs.forEach((job, index) => {
        const jobStart = new Date(job.estimated_start_time);
        const jobEnd = new Date(job.estimated_end_time);

        // 첫 번째 작업인지 확인
        const isFirstJob = index === 0;
        
        // 이전 작업과의 간격 확인 (대기 또는 이동/셋업)
        if (jobStart.getTime() > lastEndTime.getTime()) {
          const gapMinutes = (jobStart.getTime() - lastEndTime.getTime()) / 60000;
          
          if (isFirstJob) {
            // 첫 작업은 항상 이동/셋업으로 표시 (A구역 → D구역 → 작업위치)
            segments.push({
              type: 'move',
              label: `A구역 출발 → 장비셋업 → ${job.location_name}`,
              start: lastEndTime,
              end: jobStart,
            });
          } else if (gapMinutes > 2) {
            // 2분 이상 간격이면 이동 또는 대기
            const prevJob = sortedJobs[index - 1];
            const isMoving = prevJob && prevJob.location_id !== job.location_id;
            
            segments.push({
              type: isMoving ? 'move' : 'idle',
              label: isMoving
                ? `이동 / 장비셋업 → ${job.location_name}` 
                : `대기 (${Math.round(gapMinutes)}분)`,
              start: lastEndTime,
              end: jobStart,
            });
          }
        } else if (isFirstJob && jobStart.getTime() === lastEndTime.getTime()) {
          // 예외: 첫 작업이 세션 시작과 동시에 시작하는 경우 (오류 상황)
          // 이 경우에도 최소한의 이동/셋업 시간을 표시
          console.warn(`Warning: First job starts at session start time for welder ${job.welder_id}`);
        }

        // 작업 추가
        segments.push({
          type: 'work',
          label: `${job.location_name} - ${job.defect_type_name}`,
          start: jobStart,
          end: jobEnd,
          jobData: job,
        });

        lastEndTime = jobEnd;
      });

      // 마지막 작업 이후 세션 종료까지 대기
      if (lastEndTime < sessionEnd) {
        segments.push({
          type: 'idle',
          label: '대기',
          start: lastEndTime,
          end: sessionEnd,
        });
      }

      return {
        welderName: sortedJobs[0]?.welder_name || '알 수 없음',
        welderId,
        segments,
      };
    });
  })();

  // 시간 범위 계산 (분 단위)
  const totalMinutes = (sessionEnd.getTime() - sessionStart.getTime()) / 60000;
  
  // 15분 단위 시간 눈금 생성
  const timeMarks: Date[] = [];
  let current = new Date(sessionStart);
  while (current <= sessionEnd) {
    timeMarks.push(new Date(current));
    current = new Date(current.getTime() + 15 * 60000); // 15분 추가
  }

  // 시간을 픽셀 위치로 변환
  const timeToPosition = (time: Date): number => {
    const minutes = (time.getTime() - sessionStart.getTime()) / 60000;
    return (minutes / totalMinutes) * 100;
  };

  // 현재 시간 위치
  const currentTimePosition = timeToPosition(currentTime);

  // 색상 매핑
  const getColor = (type: 'work' | 'idle' | 'move') => {
    switch (type) {
      case 'work':
        return 'bg-[#FBBF24]'; // 노란색
      case 'idle':
        return 'bg-[#D3D3D3]'; // 회색
      case 'move':
        return 'bg-[#4975D4]'; // 파랑 (메인컬러)
      default:
        return 'bg-gray-300';
    }
  };

  const getTextColor = (type: 'work' | 'idle' | 'move') => {
    switch (type) {
      case 'work':
        return 'text-black';
      case 'idle':
        return 'text-black';
      case 'move':
        return 'text-white';
      default:
        return 'text-gray-200';
    }
  };

  return (
    <div className="w-full">
      {/* 시간 헤더 */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-24 flex-shrink-0"></div>
          <div className="flex-1 relative" style={{ minHeight: '40px' }}>
            {timeMarks.map((time, index) => {
              const position = timeToPosition(time);
              return (
                <div
                  key={index}
                  className="absolute top-0"
                  style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="text-xs font-semibold text-gray-700">
                    {time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* 시간 눈금선 */}
        <div className="flex">
          <div className="w-24 flex-shrink-0"></div>
          <div className="flex-1 relative h-2">
            {timeMarks.map((time, index) => {
              const position = timeToPosition(time);
              return (
                <div
                  key={index}
                  className="absolute top-0 bottom-0 w-px bg-gray-200"
                  style={{ left: `${position}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 작업자 타임라인 */}
      <div className="space-y-2 pb-4">
        {workerTimelines.map((worker) => (
          <div key={worker.welderId} className="flex items-center">
            {/* 작업자 이름 */}
            <div className="w-24 flex-shrink-0 pr-3">
              <div className="font-bold text-gray-900 text-sm">{worker.welderName}</div>
              <div className="text-xs text-gray-500">ID: {worker.welderId}</div>
            </div>

            {/* 타임라인 바 */}
            <div className="flex-1 relative h-12 bg-gray-50 rounded-lg border border-gray-200">
              {/* 세그먼트들 */}
              {worker.segments.map((segment, index) => {
                const startPos = timeToPosition(segment.start);
                const endPos = timeToPosition(segment.end);
                const width = endPos - startPos;

                return (
                  <div
                    key={index}
                    className={`absolute top-0 bottom-0 ${getColor(segment.type)} border-r border-white flex items-center justify-center px-2 overflow-hidden transition-all hover:opacity-90 group cursor-pointer`}
                    style={{
                      left: `${startPos}%`,
                      width: `${width}%`,
                    }}
                    title={`${segment.label}\n${segment.start.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${segment.end.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}`}
                  >
                    <div className={`text-xs font-semibold ${getTextColor(segment.type)} truncate text-center leading-tight`}>
                      {segment.label}
                      {segment.jobData && (
                        <div className="text-[10px] opacity-75">
                          D-{String(segment.jobData.defect_id).padStart(5, '0')}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* 현재 시간 표시 (세션 내에 있을 때만) */}
              {currentTime >= sessionStart && currentTime <= sessionEnd && (
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                  style={{ left: `${currentTimePosition}%` }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 범례 */}
      <div className="mt-6 flex items-center gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#FBBF24] rounded border border-gray-300"></div>
          <span className="text-sm text-gray-700 font-medium">작업</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#4975D4] rounded border border-gray-300"></div>
          <span className="text-sm text-gray-700 font-medium">이동 / 장비셋업</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#D3D3D3] rounded border border-gray-300"></div>
          <span className="text-sm text-gray-700 font-medium">대기</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-6 bg-red-500"></div>
          <span className="text-sm text-gray-700 font-medium">현재 시간</span>
        </div>
      </div>

      {/* 타임라인이 비어있을 때 */}
      {workerTimelines.length === 0 && (
        <div className="flex items-center justify-center py-20 text-gray-500">
          스케줄된 작업이 없습니다.
        </div>
      )}
    </div>
  );
}

