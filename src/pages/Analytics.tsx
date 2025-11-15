/**
 * 페이지 5: 성과 분석 (Analytics)
 * 세련된 디자인으로 재구성
 */

export default function Analytics() {
  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Performance Analytics</h1>
            <p className="text-gray-500 text-base">AI engine efficiency and ROI analysis</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined">download</span>
            Export Report
          </button>
        </div>

        {/* 필터 */}
        <div className="flex gap-3 mb-10">
          <button className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold shadow-sm">
            Last 30 Days
          </button>
          <button className="px-5 py-2.5 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            This Quarter
          </button>
          <button className="px-5 py-2.5 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            Last 90 Days
          </button>
          <button className="px-5 py-2.5 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
            Custom Range
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
        </div>

        {/* KPI 카드 */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-2">Efficiency Gain</p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-4xl font-bold text-gray-900">18%</p>
              <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-base">trending_up</span>
                5.2%
              </span>
            </div>
            <p className="text-xs text-gray-400">vs last period</p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-2">Time Saved</p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-4xl font-bold text-gray-900">420</p>
              <span className="text-xl font-medium text-gray-600">hrs</span>
            </div>
            <p className="text-xs text-gray-400">total rework time</p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-2">Schedule Accuracy</p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-4xl font-bold text-gray-900">92%</p>
              <span className="text-red-500 text-sm font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-base">trending_down</span>
                1.5%
              </span>
            </div>
            <p className="text-xs text-gray-400">average accuracy</p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-2">ROI</p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-4xl font-bold text-gray-900">$15.2k</p>
            </div>
            <p className="text-xs text-gray-400">calculated savings</p>
          </div>
        </div>

        {/* 차트 그리드 */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {/* 용접공 효율 */}
          <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Welder Efficiency</h3>
              <p className="text-sm text-gray-500">Time allocation breakdown</p>
            </div>
            <div className="flex items-center gap-4 text-sm mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Work</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <span className="text-gray-600">Travel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-gray-600">Setup</span>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Welder A', work: 70, travel: 10, setup: 20 },
                { name: 'Welder B', work: 60, travel: 25, setup: 15 },
                { name: 'Team C', work: 85, travel: 5, setup: 10 },
                { name: 'Welder D', work: 50, travel: 20, setup: 30 },
              ].map((welder) => (
                <div key={welder.name} className="flex items-center gap-4">
                  <p className="text-sm font-medium text-gray-700 w-20">{welder.name}</p>
                  <div className="flex-1 h-8 bg-gray-100 rounded-full flex overflow-hidden">
                    <div className="bg-green-500" style={{ width: `${welder.work}%` }}></div>
                    <div className="bg-blue-400" style={{ width: `${welder.travel}%` }}></div>
                    <div className="bg-yellow-400" style={{ width: `${welder.setup}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 스케줄 정확도 */}
          <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Schedule Accuracy</h3>
              <p className="text-sm text-gray-500">Estimated vs actual completion</p>
            </div>
            <div className="flex items-end justify-between h-64 border-b border-gray-200 px-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-[60%] bg-purple-200 rounded-t-xl hover:bg-purple-300 transition-colors"></div>
                <p className="text-xs text-gray-500">&lt;-60m</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-[80%] bg-purple-300 rounded-t-xl hover:bg-purple-400 transition-colors"></div>
                <p className="text-xs text-gray-500">-30m</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-full bg-gradient-to-t from-purple-500 to-purple-600 rounded-t-xl shadow-sm"></div>
                <p className="text-xs font-bold text-purple-600">On Time</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-[85%] bg-purple-400 rounded-t-xl hover:bg-purple-500 transition-colors"></div>
                <p className="text-xs text-gray-500">+30m</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-[55%] bg-purple-300 rounded-t-xl hover:bg-purple-400 transition-colors"></div>
                <p className="text-xs text-gray-500">+60m</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-[30%] bg-purple-200 rounded-t-xl hover:bg-purple-300 transition-colors"></div>
                <p className="text-xs text-gray-500">&gt;60m</p>
              </div>
            </div>
          </div>
        </div>

        {/* 결함 백로그 추이 */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Defect Backlog Trend</h3>
              <p className="text-sm text-gray-500">Occurrence vs processing rate</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600">Occurred</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Processed</span>
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
      </div>
    </div>
  );
}
