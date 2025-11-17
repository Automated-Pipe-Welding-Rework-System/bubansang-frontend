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
      <div className="p-6 pb-10 border-b border-[#8cace5]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#DCE5F9] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#4975D4] text-2xl">precision_manufacturing</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-[#BCD5F7]">Bubansang</h1>
            <p className="text-xl text-[#BCD5F7] mt-1">AI Rework System</p>
          </div>
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 px-6 pb-6 pt-10">
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                ${
                  isActive(item.path)
                    ? `${tailwindColors.nav.active} ${tailwindColors.nav.activeText}`
                    : `${tailwindColors.nav.hover} ${tailwindColors.nav.text}`
                }
              `}
            >
              <span className="material-symbols-outlined text-4xl">
                {item.icon}
              </span>
              <p className="text-xl font-medium">{item.label}</p>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}

