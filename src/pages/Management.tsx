/**
 * 페이지 2: 작업/자원 관리 (Lists & Controls)
 * 백엔드 API 연동
 */

import { useState, useEffect } from 'react';
import { getDefects, updateDefectPriority } from '../services/defectService';
import { getWelders, updateWelderStatus } from '../services/welderService';
import type { DefectItem, WelderItem } from '../types/api';

type TabType = 'defects' | 'welders';

export default function Management() {
  const [activeTab, setActiveTab] = useState<TabType>('defects');
  
  // Defects 상태
  const [defects, setDefects] = useState<DefectItem[]>([]);
  const [defectsLoading, setDefectsLoading] = useState(false);
  const [defectsError, setDefectsError] = useState<string | null>(null);
  
  // Welders 상태
  const [welders, setWelders] = useState<WelderItem[]>([]);
  const [weldersLoading, setWeldersLoading] = useState(false);
  const [weldersError, setWeldersError] = useState<string | null>(null);
  
  // 결함 목록 로드
  const loadDefects = async (status: string = 'pending') => {
    setDefectsLoading(true);
    setDefectsError(null);
    try {
      const response = await getDefects(status);
      setDefects(response.defects);
    } catch (error: any) {
      setDefectsError(error.response?.data?.error || 'Failed to load defects');
      console.error('Error loading defects:', error);
    } finally {
      setDefectsLoading(false);
    }
  };
  
  // 용접공 목록 로드
  const loadWelders = async () => {
    setWeldersLoading(true);
    setWeldersError(null);
    try {
      const response = await getWelders('available,working,on_break,off_duty');
      setWelders(response.welders);
    } catch (error: any) {
      setWeldersError(error.response?.data?.error || 'Failed to load welders');
      console.error('Error loading welders:', error);
    } finally {
      setWeldersLoading(false);
    }
  };
  
  // Priority 수정 핸들러 (디바운싱)
  const handlePriorityChange = async (defectId: number, newPriority: number) => {
    if (newPriority < 1 || newPriority > 10) return;
    
    try {
      await updateDefectPriority(defectId, newPriority);
      // 성공 시 로컬 상태 업데이트
      setDefects(prev => 
        prev.map(d => d.defect_id === defectId ? { ...d, priority_factor: newPriority } : d)
      );
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to update priority');
      console.error('Error updating priority:', error);
    }
  };
  
  // Welder status 수정 핸들러
  const handleWelderStatusChange = async (welderId: number, newStatus: string) => {
    try {
      await updateWelderStatus(welderId, newStatus);
      // 성공 시 로컬 상태 업데이트
      setWelders(prev => 
        prev.map(w => w.welder_id === welderId ? { ...w, status: newStatus as any } : w)
      );
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to update welder status');
      console.error('Error updating welder status:', error);
    }
  };
  
  // 초기 로드
  useEffect(() => {
    if (activeTab === 'defects') {
      loadDefects();
    } else {
      loadWelders();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Lists & Controls</h1>
          <p className="text-gray-500 text-base">Manage defects and welders</p>
</div>

        {/* 탭 & 검색 */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab('defects')}
                className={`px-8 py-4 rounded-lg font-semibold text-base transition-all ${
                  activeTab === 'defects'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Managed Defects
              </button>
              <button
                onClick={() => setActiveTab('welders')}
                className={`px-8 py-4 rounded-lg font-semibold text-base transition-all ${
                  activeTab === 'welders'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Welder Status
              </button>
</div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  search
                </span>
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-12 pr-4 py-3 w-72 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
</div>
              <button className="px-6 py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold text-base hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm flex items-center gap-2 whitespace-nowrap">
                <span className="material-symbols-outlined text-xl">add</span>
                New Defect
              </button>
</div>
</div>
</div>

        {/* 테이블 */}
        {activeTab === 'defects' ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {defectsLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                  <p className="text-gray-600">Loading defects...</p>
                </div>
              </div>
            ) : defectsError ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
                  <p className="text-red-600 font-semibold mb-2">Error loading defects</p>
                  <p className="text-gray-600 mb-4">{defectsError}</p>
                  <button 
                    onClick={() => loadDefects()}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : defects.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <span className="material-symbols-outlined text-gray-400 text-5xl mb-4">inbox</span>
                  <p className="text-gray-600">No defects found</p>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Defect ID</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pipe ID</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Severity</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Skill</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Time</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {defects.map((defect) => (
                        <tr key={defect.defect_id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-8 text-base font-semibold text-gray-900">D-{String(defect.defect_id).padStart(5, '0')}</td>
                          <td className="px-8 py-8 text-base text-gray-600">{defect.pipe_id}</td>
                          <td className="px-8 py-8 text-base text-gray-600">{defect.location_name || `Zone ${defect.location_id}`}</td>
                          <td className="px-8 py-8 text-base text-gray-600">
                            {defect.is_critical && (
                              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            )}
                            {defect.defect_type_name}
                          </td>
                          <td className="px-8 py-8 text-base text-gray-600">
                            {defect.severity_score.toFixed(1)}
                            <span className="text-xs text-gray-400 ml-1">({defect.p_in}/{defect.p_out})</span>
                          </td>
                          <td className="px-8 py-8 text-base text-gray-600">{defect.required_skill || 'N/A'}</td>
                          <td className="px-8 py-8 text-base text-gray-600">{defect.rework_time} min</td>
                          <td className="px-8 py-8">
                            <span
                              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold ${
                                defect.status === 'pending'
                                  ? 'bg-red-100 text-red-700'
                                  : defect.status === 'in_progress'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                defect.status === 'pending' ? 'bg-red-500' : defect.status === 'in_progress' ? 'bg-blue-500' : 'bg-green-500'
                              }`}></span>
                              {defect.status === 'pending' ? 'Pending' : defect.status === 'in_progress' ? 'In Progress' : 'Completed'}
                            </span>
                          </td>
                          <td className="px-8 py-7">
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={defect.priority_factor}
                              onChange={(e) => handlePriorityChange(defect.defect_id, parseInt(e.target.value))}
                              className="w-24 px-4 py-2.5 border border-gray-200 rounded-lg text-base text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-8 py-6 border-t-2 border-gray-200 flex items-center justify-between">
                  <p className="text-base text-gray-600">Showing {defects.length} defect(s)</p>
                  <button 
                    onClick={() => loadDefects()}
                    className="px-6 py-2 border border-gray-200 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">refresh</span>
                    Refresh
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {weldersLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                  <p className="text-gray-600">Loading welders...</p>
                </div>
              </div>
            ) : weldersError ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
                  <p className="text-red-600 font-semibold mb-2">Error loading welders</p>
                  <p className="text-gray-600 mb-4">{weldersError}</p>
                  <button 
                    onClick={() => loadWelders()}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : welders.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <span className="material-symbols-outlined text-gray-400 text-5xl mb-4">inbox</span>
                  <p className="text-gray-600">No welders found</p>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Welder ID</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Skills</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Current Task</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Shift End</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {welders.map((welder) => (
                        <tr key={welder.welder_id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-7 text-base font-semibold text-gray-900">W-{String(welder.welder_id).padStart(3, '0')}</td>
                          <td className="px-8 py-8 text-base text-gray-600">{welder.welder_name}</td>
                          <td className="px-8 py-8 text-base text-gray-600">
                            <div className="flex flex-wrap gap-1">
                              {welder.skills.slice(0, 2).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                  {skill.process}
                                </span>
                              ))}
                              {welder.skill_count > 2 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                  +{welder.skill_count - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-8 text-base text-gray-600">{welder.current_location_name || `Zone ${welder.current_location_id}`}</td>
                          <td className="px-8 py-8 text-base text-gray-600">
                            {welder.current_defect_id ? `D-${String(welder.current_defect_id).padStart(5, '0')}` : '-'}
                          </td>
                          <td className="px-8 py-8">
                            <select
                              value={welder.status}
                              onChange={(e) => handleWelderStatusChange(welder.welder_id, e.target.value)}
                              className={`px-4 py-1.5 rounded-full text-xs font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                welder.status === 'available' 
                                  ? 'bg-green-100 text-green-700' 
                                  : welder.status === 'working'
                                  ? 'bg-blue-100 text-blue-700'
                                  : welder.status === 'on_break'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              <option value="available">Available</option>
                              <option value="working">Working</option>
                              <option value="on_break">On Break</option>
                              <option value="off_duty">Off Duty</option>
                            </select>
                          </td>
                          <td className="px-8 py-8 text-base text-gray-600">
                            {new Date(welder.shift_end_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-8 py-6 border-t-2 border-gray-200 flex items-center justify-between">
                  <p className="text-base text-gray-600">Showing {welders.length} welder(s)</p>
                  <button 
                    onClick={() => loadWelders()}
                    className="px-6 py-2 border border-gray-200 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">refresh</span>
                    Refresh
                  </button>
                </div>
              </>
            )}
          </div>
        )}
</div>
</div>
  );
}
