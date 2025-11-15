/**
 * 페이지 2: 작업/자원 관리 (Lists & Controls)
 * 세련된 디자인으로 재구성
 */

import { useState } from 'react';

type TabType = 'defects' | 'welders';

export default function Management() {
  const [activeTab, setActiveTab] = useState<TabType>('defects');

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
                Defect History
              </button>
              <button
                onClick={() => setActiveTab('welders')}
                className={`px-8 py-4 rounded-lg font-semibold text-base transition-all ${
                  activeTab === 'welders'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Welder History
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
                  {[
                    { id: 'D-00123', pipe: 'P-A582', location: 'Zone B', type: 'Porosity', severity: '1.2/1.1', skill: 'GTAW', time: '45 min', status: 'pending', priority: 8 },
                    { id: 'D-00122', pipe: 'P-C109', location: 'Zone E', type: 'Crack', severity: '0.8/0.8', skill: 'GMAW', time: '60 min', status: 'in_progress', priority: 10 },
                    { id: 'D-00121', pipe: 'P-B433', location: 'Zone F', type: 'Undercut', severity: '1.5/1.3', skill: 'GTAW', time: '30 min', status: 'completed', priority: 5 },
                  ].map((defect) => (
                    <tr key={defect.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-8 text-base font-semibold text-gray-900">{defect.id}</td>
                      <td className="px-8 py-8 text-base text-gray-600">{defect.pipe}</td>
                      <td className="px-8 py-8 text-base text-gray-600">{defect.location}</td>
                      <td className="px-8 py-8 text-base text-gray-600">{defect.type}</td>
                      <td className="px-8 py-8 text-base text-gray-600">{defect.severity}</td>
                      <td className="px-8 py-8 text-base text-gray-600">{defect.skill}</td>
                      <td className="px-8 py-8 text-base text-gray-600">{defect.time}</td>
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
                          defaultValue={defect.priority}
                          className="w-24 px-4 py-2.5 border border-gray-200 rounded-lg text-base text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 py-6 border-t-2 border-gray-200 flex items-center justify-between">
              <p className="text-base text-gray-600">Showing 1 to 3 of 25 results</p>
              <div className="flex gap-3">
                <button className="px-6 py-3 border border-gray-200 rounded-lg text-base font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors">
                  Previous
                </button>
                <button className="px-8 py-3 border border-gray-200 rounded-xl text-base font-medium hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
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
                  {[
                    { id: 'W-001', name: 'John Doe', skills: 'GTAW, GMAW', location: 'Zone B', task: 'D-00123', status: 'working', shiftEnd: '18:00' },
                    { id: 'W-002', name: 'Jane Smith', skills: 'SMAW, GTAW', location: 'Zone E', task: 'D-00122', status: 'working', shiftEnd: '17:00' },
                    { id: 'W-003', name: 'Mike Ross', skills: 'GMAW', location: 'Zone A', task: '-', status: 'available', shiftEnd: '19:00' },
                  ].map((welder) => (
                    <tr key={welder.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-7 text-base font-semibold text-gray-900">{welder.id}</td>
                      <td className="px-8 py-8 text-base text-gray-600">{welder.name}</td>
                      <td className="px-8 py-8 text-base text-gray-600">{welder.skills}</td>
                      <td className="px-8 py-8 text-base text-gray-600">{welder.location}</td>
                      <td className="px-8 py-8 text-base text-gray-600">{welder.task}</td>
                      <td className="px-8 py-8">
                        <span
                          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold ${
                            welder.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${welder.status === 'available' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                          {welder.status === 'available' ? 'Available' : 'Working'}
                        </span>
                      </td>
                      <td className="px-8 py-8 text-base text-gray-600">{welder.shiftEnd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing 1 to 3 of 12 results</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
