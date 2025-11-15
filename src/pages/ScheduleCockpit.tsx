/**
 * 페이지 3: 스케줄 조종석 (Schedule Cockpit)
 * 백엔드 API 연동
 */

import { useState } from 'react';
import { optimizeSchedule } from '../services/scheduleService';
import type { ScheduleResponse } from '../types/api';

export default function ScheduleCockpit() {
  const [showModal, setShowModal] = useState(false);
  
  // 날짜/세션 선택
  const [targetDate, setTargetDate] = useState<string>(
    new Date().toISOString().split('T')[0] // 오늘 날짜 (YYYY-MM-DD)
  );
  const [targetSession, setTargetSession] = useState<'morning' | 'afternoon' | 'night'>('morning');
  
  // 스케줄 상태
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 스케줄 생성
  const handleGenerateSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await optimizeSchedule(targetDate, targetSession);
      setSchedule(response);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to generate schedule');
      console.error('Error generating schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-[1600px] mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule Cockpit</h1>
              <p className="text-gray-500">AI-powered schedule management</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleGenerateSchedule}
                disabled={loading}
                className="px-6 py-3 bg-white border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Regenerate Schedule
                  </>
                )}
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                Confirm & Dispatch
              </button>
            </div>
          </div>
          
          {/* 날짜/세션 선택 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">Target Date:</label>
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
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Morning (09:00-12:00)
                </button>
                <button
                  onClick={() => setTargetSession('afternoon')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    targetSession === 'afternoon'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Afternoon (13:00-18:00)
                </button>
                <button
                  onClick={() => setTargetSession('night')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    targetSession === 'night'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Night (19:00-22:00)
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
                  <span className="font-semibold text-purple-600">{schedule.total_jobs}</span>
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
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 왼쪽: 스케줄 테이블 */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-8">
                Master Schedule
                {schedule && (
                  <span className="ml-3 text-sm font-normal text-gray-500">
                    {schedule.target_date} - {schedule.session_time}
                  </span>
                )}
              </h2>
              
              {/* 스케줄 Jobs 테이블 */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
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
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Order</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Welder</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Defect</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Start Time</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">End Time</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Duration</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Severity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {schedule.jobs.map((job) => (
                        <tr key={job.job_id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4 text-sm font-semibold text-gray-900">#{job.job_order}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{job.welder_name}</td>
                          <td className="px-4 py-4 text-sm font-medium text-purple-600">
                            D-{String(job.defect_id).padStart(5, '0')}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">{job.defect_type_name}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{job.location_name}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {new Date(job.estimated_start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {new Date(job.estimated_end_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">{job.rework_time} min</td>
                          <td className="px-4 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              job.severity_score >= 2.0 ? 'bg-red-100 text-red-700' :
                              job.severity_score >= 1.0 ? 'bg-orange-100 text-orange-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {job.severity_score.toFixed(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 대기 결함 큐 */}
          <div className="col-span-4">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Defects</h2>
              
              {/* 검색 */}
              <div className="relative mb-4">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  search
                </span>
                <input
                  type="search"
                  placeholder="Search defects..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 결함 카드 */}
              <div className="space-y-3">
                {[
                  { id: 'D-129', location: 'Zone B', type: 'T-Joint', priority: 'High' },
                  { id: 'D-130', location: 'Zone E', type: 'Lap Joint', priority: 'Medium' },
                  { id: 'D-131', location: 'Zone F', type: 'Butt Weld', priority: 'Low' },
                  { id: 'D-132', location: 'Zone G', type: 'Corner Joint', priority: 'Medium' },
                ].map((defect) => (
                  <div
                    key={defect.id}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all cursor-grab"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-bold text-gray-900">{defect.id}</p>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          defect.priority === 'High'
                            ? 'bg-red-100 text-red-700'
                            : defect.priority === 'Medium'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {defect.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{defect.location}</p>
                    <p className="text-xs text-gray-500">{defect.type}</p>
                    <div className="mt-3">
                      <label className="text-xs text-gray-500 block mb-1">Priority (1-10)</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        defaultValue={defect.priority === 'High' ? 8 : defect.priority === 'Medium' ? 5 : 3}
                        className="w-full px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Work Order: John Doe</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-gray-400">close</span>
                </button>
              </div>
              <div className="space-y-3 mb-6">
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <p className="text-sm font-semibold text-purple-900">1. Travel to Zone B (7 min)</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <p className="text-sm font-semibold text-purple-900">2. SMAW Setup (10 min)</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <p className="text-sm font-semibold text-purple-900">3. Execute Rework on D-123 (2.5 hrs)</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <p className="text-sm font-semibold text-purple-900">4. Travel to Zone E (5 min)</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <p className="text-sm font-semibold text-purple-900">5. Execute Rework on D-124 (3 hrs)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-white border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">print</span>
                  Print
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">send_to_mobile</span>
                  Send to Device
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
