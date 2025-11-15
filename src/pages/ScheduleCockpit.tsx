/**
 * 페이지 3: 스케줄 조종석 (Schedule Cockpit)
 * 세련된 디자인으로 재구성
 */

import { useState } from 'react';

export default function ScheduleCockpit() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-[1600px] mx-auto">
        {/* 헤더 */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule Cockpit</h1>
            <p className="text-gray-500">AI-powered schedule management</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">auto_awesome</span>
              Regenerate AI Schedule
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined">check_circle</span>
              Confirm & Dispatch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 왼쪽: 간트 차트 */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Master Schedule</h2>
              
              {/* 타임라인 헤더 */}
              <div className="grid grid-cols-[150px_repeat(10,1fr)] gap-px text-xs text-center font-semibold text-gray-500 mb-4">
                <div className="text-left">Resource</div>
                <div>08:00</div>
                <div>09:00</div>
                <div>10:00</div>
                <div>11:00</div>
                <div>12:00</div>
                <div>13:00</div>
                <div>14:00</div>
                <div>15:00</div>
                <div>16:00</div>
                <div>17:00</div>
              </div>

              {/* 용접공 스케줄 */}
              <div className="space-y-3">
                {/* Welder 1 */}
                <div className="grid grid-cols-[150px_repeat(10,1fr)] gap-px items-center">
                  <div className="font-semibold text-gray-900 text-sm">John Doe</div>
                  <div className="col-span-10 h-14 relative bg-gray-50 rounded-xl">
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '0%', width: '10%' }}>
                      Travel
                    </div>
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '10%', width: '5%' }}>
                      Setup
                    </div>
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm cursor-pointer hover:shadow-md transition-shadow" style={{ left: '15%', width: '25%' }} onClick={() => setShowModal(true)}>
                      Work: D-123
                    </div>
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '40%', width: '10%' }}>
                      Travel
                    </div>
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '50%', width: '30%' }}>
                      Work: D-124
                    </div>
                  </div>
                </div>

                {/* Welder 2 */}
                <div className="grid grid-cols-[150px_repeat(10,1fr)] gap-px items-center">
                  <div className="font-semibold text-gray-900 text-sm">Jane Smith</div>
                  <div className="col-span-10 h-14 relative bg-gray-50 rounded-xl">
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '5%', width: '35%' }}>
                      Work: D-125
                    </div>
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '40%', width: '10%' }}>
                      Setup
                    </div>
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '50%', width: '15%' }}>
                      Travel
                    </div>
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '65%', width: '20%' }}>
                      Work: D-126
                    </div>
                  </div>
                </div>

                {/* Welder 3 */}
                <div className="grid grid-cols-[150px_repeat(10,1fr)] gap-px items-center">
                  <div className="font-semibold text-gray-900 text-sm">Mike Ross</div>
                  <div className="col-span-10 h-14 relative bg-gray-50 rounded-xl">
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '0%', width: '8%' }}>
                      Setup
                    </div>
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '8%', width: '22%' }}>
                      Work: D-127
                    </div>
                    <div className="absolute h-12 top-1 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center px-3 text-xs text-white font-medium shadow-sm" style={{ left: '45%', width: '40%' }}>
                      Work: D-128
                    </div>
                  </div>
                </div>

                {/* Welder 4 */}
                <div className="grid grid-cols-[150px_repeat(10,1fr)] gap-px items-center">
                  <div className="font-semibold text-gray-900 text-sm">Sarah Connor</div>
                  <div className="col-span-10 h-14 relative bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                    Unassigned
                  </div>
                </div>
              </div>
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
