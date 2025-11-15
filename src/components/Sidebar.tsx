import { Link, useLocation } from 'react-router-dom';
import { tailwindColors } from '../styles/colors';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: 'dashboard', label: 'Live Monitor' },
  { path: '/qc-portal', icon: 'add_circle', label: 'QC Portal' },
  { path: '/management', icon: 'list_alt', label: 'Lists & Controls' },
  { path: '/schedule', icon: 'calendar_month', label: 'Schedule Cockpit' },
  { path: '/analytics', icon: 'bar_chart', label: 'Analytics' },
];

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={`flex flex-col w-64 ${tailwindColors.nav.bg} min-h-screen shrink-0`}>
      {/* 로고/타이틀 영역 */}
      <div className="p-6 border-b border-purple-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">precision_manufacturing</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-purple-900">Bubansang</h1>
            <p className="text-xs text-purple-700">AI Rework System</p>
          </div>
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 p-4">
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${
                  isActive(item.path)
                    ? `${tailwindColors.nav.active} ${tailwindColors.nav.activeText}`
                    : `${tailwindColors.nav.hover} ${tailwindColors.nav.text}`
                }
              `}
            >
              <span className="material-symbols-outlined text-2xl">
                {item.icon}
              </span>
              <p className="text-sm font-medium">{item.label}</p>
            </Link>
          ))}
        </div>
      </nav>

      {/* 하단 메뉴 */}
      <div className="p-4 border-t border-purple-200">
        <div className="flex flex-col gap-1">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${tailwindColors.nav.hover} ${tailwindColors.nav.text} transition-colors`}
          >
            <span className="material-symbols-outlined text-2xl">settings</span>
            <p className="text-sm font-medium">Settings</p>
          </Link>
          <button
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${tailwindColors.nav.hover} ${tailwindColors.nav.text} transition-colors`}
            onClick={() => {
              // 로그아웃 로직
              console.log('Logout clicked');
            }}
          >
            <span className="material-symbols-outlined text-2xl">logout</span>
            <p className="text-sm font-medium">Logout</p>
          </button>
        </div>
      </div>
    </aside>
  );
}

