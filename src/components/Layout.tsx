import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { tailwindColors } from '../styles/colors';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen gap-6">
      <Sidebar />
      <main className={`flex-1 ${tailwindColors.main.bg} overflow-y-auto`}>
        {children}
      </main>
    </div>
  );
}

