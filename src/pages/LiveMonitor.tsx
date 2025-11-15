/**
 * 페이지 4: 메인 대시보드 (Live Monitor)
 * 실시간 현장 모니터링 - 세련된 디자인
 */

export default function LiveMonitor() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Live Monitor</h1>
          <p className="text-gray-500 text-base">{currentDate}</p>
        </div>

        {/* 메인 그리드 */}
        <div className="grid grid-cols-12 gap-6">
          {/* 왼쪽 컬럼 - KPI & 차트 */}
          <div className="col-span-8 space-y-8">
            {/* KPI 카드 그리드 */}
            <div className="grid grid-cols-2 gap-6">
              {/* Pending Defects */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Pending Defects</p>
                    <p className="text-4xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">error</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-red-500 text-sm font-semibold">+2</span>
                  <span className="text-gray-400 text-sm">from yesterday</span>
                </div>
              </div>

              {/* Available Welders */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Available Welders</p>
                    <p className="text-4xl font-bold text-gray-900">4</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">person_check</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-green-500 text-sm font-semibold">Ready</span>
                  <span className="text-gray-400 text-sm">to work</span>
                </div>
              </div>

              {/* Working Welders */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Working Welders</p>
                    <p className="text-4xl font-bold text-gray-900">3</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">engineering</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-blue-500 text-sm font-semibold">Active</span>
                  <span className="text-gray-400 text-sm">in progress</span>
                </div>
              </div>

              {/* Shift Ending */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Shift Ending Soon</p>
                    <p className="text-4xl font-bold text-gray-900">1</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">schedule</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-orange-500 text-sm font-semibold">1 hour</span>
                  <span className="text-gray-400 text-sm">remaining</span>
                </div>
              </div>
            </div>

              {/* 차트 */}
              <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Defect Trend</h3>
                  <p className="text-sm text-gray-500">Last 7 days</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-gray-600">Occurred</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="text-sm text-gray-600">Processed</span>
                  </div>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
                <div className="text-center">
                  <span className="material-symbols-outlined text-gray-300 text-6xl mb-2">show_chart</span>
                  <p className="text-gray-400 text-sm">Chart visualization</p>
                </div>
              </div>
            </div>

            {/* 구역 지도 */}
            <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Zone Status</h3>
                  <p className="text-sm text-gray-500">Real-time workshop floor</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-semibold text-green-700">Live</span>
                </div>
              </div>
              <div className="grid grid-cols-4 grid-rows-2 gap-4 h-48">
                <div className="col-span-1 row-span-2 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer">
                  <div className="text-center">
                    <p className="text-gray-700 font-semibold">Zone A</p>
                    <p className="text-xs text-gray-400 mt-1">Idle</p>
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer">
                  <p className="text-gray-700 font-semibold text-sm">Zone B</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-red-50 border-2 border-red-300 shadow-sm cursor-pointer">
                  <span className="material-symbols-outlined text-red-500 text-xl mb-1">warning</span>
                  <p className="text-red-700 font-semibold text-sm">Zone C</p>
                  <p className="text-xs text-red-600 font-medium">2 Pending</p>
                </div>
                <div className="flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer">
                  <p className="text-gray-700 font-semibold text-sm">Zone D</p>
                </div>
                <div className="flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer">
                  <p className="text-gray-700 font-semibold text-sm">Zone E</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-purple-50 border-2 border-purple-300 shadow-sm cursor-pointer">
                  <span className="material-symbols-outlined text-purple-500 text-xl mb-1">engineering</span>
                  <p className="text-purple-700 font-semibold text-sm">Zone F</p>
                  <p className="text-xs text-purple-600 font-medium">1 Working</p>
                </div>
                <div className="flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer">
                  <p className="text-gray-700 font-semibold text-sm">Zone G</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 컬럼 - 타임라인 & 알림 */}
          <div className="col-span-4 space-y-8">
            {/* 타임라인 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-8">Today's Timeline</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-white text-lg">logout</span>
                    </div>
                    <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-sm font-semibold text-gray-900">Welder X Clock Out</p>
                    <p className="text-xs text-gray-400 mt-1">17:00 • In 2 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-white text-lg">login</span>
                    </div>
                    <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-sm font-semibold text-gray-900">Welder Y Shift Start</p>
                    <p className="text-xs text-gray-400 mt-1">18:00 • In 3 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-white text-lg">build</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-sm font-semibold text-gray-900">Machine Maintenance</p>
                    <p className="text-xs text-gray-400 mt-1">20:30 • In 5.5 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 알림 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900">Alerts</h3>
                <button className="text-purple-600 text-sm font-medium hover:text-purple-700">View all</button>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-red-50 border border-red-100 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-red-600 text-lg">error</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-red-900">Bottleneck in Zone C</p>
                      <p className="text-xs text-red-600 mt-1">2 defects pending • 2 min ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-blue-600 text-lg">info</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-blue-900">AI Analysis Complete</p>
                      <p className="text-xs text-blue-600 mt-1">Defect #105 • 5 min ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-orange-600 text-lg">warning</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-orange-900">High Temperature Alert</p>
                      <p className="text-xs text-orange-600 mt-1">Welder #4 • 12 min ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
