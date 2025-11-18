/**
 * 페이지 3: 스케줄 조종석 (Schedule Cockpit)
 * 백엔드 API 연동
 */

import { useState, useEffect } from 'react';
import { optimizeScheduleORTools, querySchedule, confirmSchedule, getWelderTicket } from '../services/scheduleService';
import { batchUpdatePriority } from '../services/defectService';
import type { ScheduleResponse, ScheduleJob } from '../types/api';
import ScheduleTimeline from '../components/ScheduleTimeline';

export default function ScheduleCockpit() {
  const [showModal, setShowModal] = useState(false);
  const [selectedWelderId, setSelectedWelderId] = useState<number | null>(null);
  const [welderTicket, setWelderTicket] = useState<any>(null);
  
  // 날짜/세션 선택
  const [targetDate, setTargetDate] = useState<string>(
    new Date().toISOString().split('T')[0] // 오늘 날짜 (YYYY-MM-DD)
  );
  const [targetSession, setTargetSession] = useState<'morning' | 'afternoon' | 'night'>('morning');
  
  // 뷰 모드 (표 또는 타임라인)
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('table');
  
  // 스케줄 상태
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  
  // 드래그 앤 드롭 상태
  const [draggedJobIndex, setDraggedJobIndex] = useState<number | null>(null);
  const [priorityChanges, setPriorityChanges] = useState<Map<number, number>>(new Map());
  const [hasChanges, setHasChanges] = useState(false);
  
  // 날짜/세션 변경 시 기존 스케줄 로드
  useEffect(() => {
    loadExistingSchedule();
  }, [targetDate, targetSession]);
  
  const loadExistingSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await querySchedule(targetDate, targetSession);
      setSchedule(response);
    } catch (error: any) {
      // 404는 정상 (스케줄이 없는 경우)
      if (error.response?.status !== 404) {
        console.error('Error loading schedule:', error);
      }
      setSchedule(null);
    } finally {
      setLoading(false);
    }
  };
  
  // 스케줄 생성
  const handleGenerateSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await optimizeScheduleORTools(targetDate, targetSession);
      setSchedule(response);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to generate schedule');
      console.error('Error generating schedule:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 스케줄 확정
  const handleConfirmSchedule = async () => {
    if (!schedule) return;
    
    setConfirming(true);
    try {
      await confirmSchedule(schedule.batch_id);
      // 다시 로드하여 상태 업데이트
      await loadExistingSchedule();
      alert('스케줄이 확정되었습니다!');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to confirm schedule');
      console.error('Error confirming schedule:', error);
    } finally {
      setConfirming(false);
    }
  };
  
  // 작업자 티켓 조회
  const handleShowWelderTicket = async (welderId: number) => {
    if (schedule?.status !== 'confirmed') {
      alert('확정된 스케줄만 작업 지시서를 볼 수 있습니다.');
      return;
    }
    
    try {
      const ticket = await getWelderTicket(welderId, targetDate, targetSession);
      setWelderTicket(ticket);
      setSelectedWelderId(welderId);
      setShowModal(true);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to load welder ticket');
      console.error('Error loading welder ticket:', error);
    }
  };
  
  // 드래그 시작
  const handleDragStart = (e: React.DragEvent, jobId: number, displayIndex: number) => {
    if (schedule?.status === 'confirmed') {
      e.preventDefault();
      return;
    }
    setDraggedJobIndex(displayIndex);
    e.dataTransfer.setData('jobId', jobId.toString());
    e.dataTransfer.effectAllowed = 'move';
  };
  
  // 드롭
  const handleDrop = (e: React.DragEvent, _dropJobId: number, dropDisplayIndex: number) => {
    e.preventDefault();
    
    if (draggedJobIndex === null || draggedJobIndex === dropDisplayIndex || !schedule) return;
    
    const draggedJobId = parseInt(e.dataTransfer.getData('jobId'));
    const draggedJob = schedule.jobs.find(j => j.job_id === draggedJobId);
    
    if (!draggedJob) return;
    
    const defectId = draggedJob.defect_id;
    
    // 위로 이동: priority = 10
    // 아래로 이동: priority = 1
    let newPriority: number;
    if (dropDisplayIndex < draggedJobIndex) {
      // 위로 이동
      newPriority = 10;
    } else {
      // 아래로 이동
      newPriority = 1;
    }
    
    const newChanges = new Map(priorityChanges);
    newChanges.set(defectId, newPriority);
    setPriorityChanges(newChanges);
    setHasChanges(true);
    
    setDraggedJobIndex(null);
  };
  
  // 드래그 오버
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  // 우선순위 변경 적용 및 재스케줄링
  const handleApplyPriorityChanges = async () => {
    if (!hasChanges || priorityChanges.size === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // 우선순위 일괄 업데이트
      const priorities = Array.from(priorityChanges.entries()).map(([defect_id, priority_factor]) => ({
        defect_id,
        priority_factor
      }));
      
      await batchUpdatePriority(priorities);
      
      // 재스케줄링
      const response = await optimizeScheduleORTools(targetDate, targetSession);
      setSchedule(response);
      
      // 상태 초기화
      setPriorityChanges(new Map());
      setHasChanges(false);
      
      alert('우선순위가 적용되고 재스케줄링되었습니다!');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to apply priority changes');
      console.error('Error applying priority changes:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 우선순위 변경 취소
  const handleCancelPriorityChanges = () => {
    setPriorityChanges(new Map());
    setHasChanges(false);
  };

  // 세션별 시작/종료 시간 계산
  const getSessionTimes = () => {
    const date = new Date(targetDate + 'T00:00:00');
    let startHour = 9;
    let endHour = 12;

    if (targetSession === 'morning') {
      startHour = 9;
      endHour = 12;
    } else if (targetSession === 'afternoon') {
      startHour = 13;
      endHour = 18;
    } else if (targetSession === 'night') {
      startHour = 19;
      endHour = 22;
    }

    const sessionStart = new Date(date);
    sessionStart.setHours(startHour, 0, 0, 0);

    const sessionEnd = new Date(date);
    sessionEnd.setHours(endHour, 0, 0, 0);

    return { sessionStart, sessionEnd };
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-[1600px] mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule Cockpit</h1>
              <p>Schedule Management</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleGenerateSchedule}
                disabled={loading}
                className="px-6 py-3 bg-white border-2 border-[#4975D4] text-[#4975D4] rounded-xl font-semibold hover:bg-[#DCE5F9] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-[#4975D4]"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Regenerate Schedule
                  </>
                )}
              </button>
              <button 
                onClick={handleConfirmSchedule}
                disabled={!schedule || schedule.status === 'confirmed' || confirming}
                className="px-6 py-3 bg-[#4975D4] text-white rounded-xl font-semibold hover:bg-[#DCE5F9] transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {confirming ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Confirming...
                  </>
                ) : schedule?.status === 'confirmed' ? (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    Confirmed
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    Confirm & Dispatch
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* 날짜/세션 선택 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center gap-6 mb-15">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">Session:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTargetSession('morning')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    targetSession === 'morning'
                      ? 'bg-[#4975D4] hover:bg-[#DCE5F9] text-white'
                      : 'bg-[#DCE5F9] hover:bg-[#BCD5F7] text-white'
                  }`}
                >
                  Morning (9AM-12PM)
                </button>
                <button
                  onClick={() => setTargetSession('afternoon')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    targetSession === 'afternoon'
                      ? 'bg-[#4975D4] hover:bg-[#DCE5F9] text-white'
                      : 'bg-[#DCE5F9] hover:bg-[#BCD5F7] text-white'
                  }`}
                >
                  Afternoon (13PM-18PM)
                </button>
                <button
                  onClick={() => setTargetSession('night')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    targetSession === 'night'
                      ? 'bg-[#4975D4] hover:bg-[#DCE5F9] text-white'
                      : 'bg-[#DCE5F9] hover:bg-[#BCD5F7] text-white'
                  }`}
                >
                  Night (19PM-22PM)
                </button>
              </div>
            </div>
            
            {schedule && (
              <div className="ml-auto flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Batch ID:</span>
                  <span className="font-semibold text-gray-900">#{schedule.batch_id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Total Jobs:</span>
                  <span className="font-semibold text-[#4975D4]">{schedule.total_jobs}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Severity Score:</span>
                  <span className="font-semibold text-orange-600">{schedule.optimization_metrics.total_severity_score}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* 에러 메시지 */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-red-500">error</span>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}
          
          {/* 우선순위 변경 알림 */}
          {hasChanges && schedule?.status !== 'confirmed' && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-500">info</span>
                  <p className="text-blue-700 font-medium">
                    {priorityChanges.size}개 결함의 우선순위가 변경되었습니다. 재스케줄링을 적용하시겠습니까?
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelPriorityChanges}
                    className="px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleApplyPriorityChanges}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    재스케줄링 적용
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6 mb-10">
          {/* 왼쪽: 스케줄 테이블 */}
          <div className="col-span-12">
            <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Master Schedule
                  <p></p>
                  {schedule && (
                    <span className="ml-3 text-sm font-normal text-gray-500">
                      {schedule.target_date}, {schedule.session_time}
                    </span>
                  )}
                </h2>
                {/* 표/시간 토글 */}
                {schedule && (
                  <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'table'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      표
                    </button>
                    <button
                      onClick={() => setViewMode('timeline')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'timeline'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      시간
                    </button>
                  </div>
                )}
              </div>
              
              {/* 스케줄 Jobs 테이블 */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4975D4] mb-4"></div>
                    <p className="text-gray-600">Generating schedule...</p>
                  </div>
                </div>
              ) : !schedule ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-gray-400 text-5xl mb-4">calendar_month</span>
                    <p className="text-gray-600 mb-2">No schedule generated yet</p>
                    <p className="text-sm text-gray-500">Select date and session, then click "Regenerate Schedule"</p>
                  </div>
                </div>
              ) : viewMode === 'table' ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Order</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Welder</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Defect</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Start Time</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">End Time</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Duration</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Severity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[...schedule.jobs]
                        .sort((a, b) => new Date(a.estimated_start_time).getTime() - new Date(b.estimated_start_time).getTime())
                        .map((job, index) => {
                        const hasPriorityChange = priorityChanges.has(job.defect_id);
                        const newPriority = priorityChanges.get(job.defect_id);
                        
                        return (
                          <tr 
                            key={job.job_id} 
                            draggable={schedule.status !== 'confirmed'}
                            onDragStart={(e) => handleDragStart(e, job.job_id, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, job.job_id, index)}
                            className={`hover:bg-gray-50 transition-colors ${
                              schedule.status !== 'confirmed' ? 'cursor-move' : ''
                            } ${
                              hasPriorityChange ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                            } ${
                              draggedJobIndex === index ? 'opacity-50' : ''
                            }`}
                          >
                            <td className="px-8 py-8 text-base font-semibold text-gray-900">
                              <div className="flex items-center gap-2">
                                {schedule.status !== 'confirmed' && (
                                  <span className="material-symbols-outlined text-gray-400 text-sm">drag_indicator</span>
                                )}
                                #{index + 1}
                                {hasPriorityChange && (
                                  <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                    Priority: {newPriority}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-8 py-8 text-base">
                              <button
                                onClick={() => handleShowWelderTicket(job.welder_id)}
                                className={`text-gray-600 hover:text-[#4975D4] font-medium transition-colors ${
                                  schedule.status === 'confirmed' ? 'cursor-pointer underline decoration-dotted' : 'cursor-default'
                                }`}
                                disabled={schedule.status !== 'confirmed'}
                              >
                                {job.welder_name}
                              </button>
                            </td>
                            <td className="px-8 py-8 text-base font-medium text-[#4975D4]">
                              D-{String(job.defect_id).padStart(5, '0')}
                            </td>
                            <td className="px-8 py-8 text-base text-gray-600">{job.defect_type_name}</td>
                            <td className="px-8 py-8 text-base text-gray-600">{job.location_name}</td>
                            <td className="px-8 py-8 text-base text-gray-600">
                              {new Date(job.estimated_start_time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </td>
                            <td className="px-8 py-8 text-base text-gray-600">
                              {new Date(job.estimated_end_time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </td>
                            <td className="px-8 py-8 text-base text-gray-600">{job.rework_time} min</td>
                            <td className="px-8 py-8 text-base">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                job.severity_score >= 2.0 ? 'bg-red-100 text-red-700' :
                                job.severity_score >= 1.0 ? 'bg-orange-100 text-orange-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {job.severity_score.toFixed(1)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                </>
              ) : (
                <ScheduleTimeline
                  jobs={schedule.jobs}
                  sessionStart={getSessionTimes().sessionStart}
                  sessionEnd={getSessionTimes().sessionEnd}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 작업 지시서 모달 */}
      {showModal && welderTicket && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* 헤더 - 파란색 그라데이션 배경 */}
            <div className="bg-gradient-to-r from-[#4975D4] to-[#8cace5] px-8 py-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-3xl">assignment</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      작업 지시서
                    </h3>
                    <p className="text-sm text-white/90">
                      {welderTicket.target_date} | {welderTicket.session_time}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setWelderTicket(null);
                  }}
                  className="w-10 h-10 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-white">close</span>
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* 작업자 정보 - 좌우 분할 레이아웃 적용 */}
              <div className="bg-white rounded-xl mb-8 overflow-hidden flex">
                
                {/* 왼쪽: 프로필*/}
                <div className="w-1/3 p-6 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#4975D4] flex items-center justify-center shadow-lg mb-4 ring-4 ring-white">
                    <span className="material-symbols-outlined text-white text-5xl">person</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">{welderTicket.welder_name}</h4>
                  <div className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-500">
                    ID: {welderTicket.welder_id}
                  </div>
                </div>

                {/* 오른쪽: 상세 스탯 및 스킬 */}
                <div className="w-2/3 p-6 flex flex-col justify-center">
                  {/* 상단: 퇴근시간 & 작업수 */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-xl p-4 mb-6">
                      <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">logout</span> 퇴근 시간
                      </p>
                      <p className="text-xl font-bold text-[#4975D4]">{welderTicket.shift_end_time}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 mb-6">
                      <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">build</span> 총 작업 수
                      </p>
                      <p className="text-xl font-bold text-[#4975D4]">{welderTicket.total_jobs}개</p>
                    </div>
                  </div>

                  {/* 하단: 스킬 */}
                  {welderTicket.skills && welderTicket.skills.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wide">보유 스킬</p>
                      <div className="flex flex-wrap gap-2">
                        {welderTicket.skills.map((skill: any, idx: number) => (
                          <span key={idx} className="px-5 py-3 bg-gray-100 rounded-md text-xs font-bold text-gray-600 border border-gray-200">
                            {skill.skill_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 작업 목록 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#4975D4]">format_list_numbered</span>
                  <h5 className="text-xl font-bold text-gray-900">작업 순서</h5>
                </div>
                <div className="space-y-3">
                  {welderTicket.jobs.map((job: any, index: number) => (
                    <div key={job.job_id} className="bg-[#DCE5F9] rounded-xl p-5 border-2 border-gray-100 hover:border-[#8cace5] transition-all hover:shadow-md">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#4975D4] to-[#8cace5] text-white flex items-center justify-center font-bold text-base shadow-md">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-lg font-bold text-gray-900">
                              결함 D-{String(job.defect_id).padStart(5, '0')}
                            </p>
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${
                              job.severity_score >= 2.0 ? 'bg-red-100 text-red-700 border border-red-200' :
                              job.severity_score >= 1.0 ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                              'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            }`}>
                              심각도 {job.severity_score.toFixed(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[#4975D4] text-sm">category</span>
                              <div>
                                <span className="text-xs text-gray-500">타입</span>
                                <p className="font-semibold text-gray-900 text-sm">{job.defect_type_name}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[#4975D4] text-sm">location_on</span>
                              <div>
                                <span className="text-xs text-gray-500">위치</span>
                                <p className="font-semibold text-gray-900 text-sm">{job.location_name}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[#4975D4] text-sm">schedule</span>
                              <div>
                                <span className="text-xs text-gray-500">시작</span>
                                <p className="font-semibold text-gray-900 text-sm">
                                  {new Date(job.estimated_start_time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[#4975D4] text-sm">event</span>
                              <div>
                                <span className="text-xs text-gray-500">종료</span>
                                <p className="font-semibold text-gray-900 text-sm">
                                  {new Date(job.estimated_end_time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-[#DCE5F9]/30 rounded-lg px-3 py-2 inline-flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#4975D4] text-sm">timer</span>
                            <span className="text-sm text-gray-600">작업 시간:</span>
                            <span className="font-bold text-[#4975D4] text-sm">{job.rework_time}분</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
