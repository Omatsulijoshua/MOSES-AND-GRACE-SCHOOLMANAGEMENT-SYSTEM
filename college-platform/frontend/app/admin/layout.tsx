"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/portal/login');
      } else if (user.role !== 'ADMIN') {
        router.push('/portal');
      }
    }
  }, [user, authLoading, router]);

  if (authLoading || !user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: '📊' },
    { name: 'Transactions', path: '/admin/transactions', icon: '💳' },
    { name: 'Revenue Analytics', path: '/admin/analytics', icon: '📈' },
    { name: 'Users / Students', path: '/admin/users', icon: '👥' },
    { name: 'Wallet Management', path: '/admin/wallets', icon: '💰' },
    { name: 'Payouts', path: '/admin/payouts', icon: '💸' },
    { name: 'Logs & Activity', path: '/admin/logs', icon: '📜' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-[#0a192f] text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tight">System<span className="text-blue-400">Admin</span></div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-[#0a192f] text-gray-300 flex-shrink-0 transition-all duration-300`}>
        <div className="p-6 hidden md:block">
          <h2 className="font-extrabold text-2xl tracking-tight text-white">System<span className="text-blue-400">Admin</span></h2>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Control Center</p>
        </div>
        
        <nav className="mt-2 md:mt-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-6 py-3 transition-colors ${isActive ? 'bg-[#112240] text-blue-400 border-l-4 border-blue-400' : 'hover:bg-[#112240] hover:text-white border-l-4 border-transparent'}`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto hidden md:block absolute bottom-0 w-64 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {user.fullname.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user.fullname}</p>
              <button onClick={logout} className="text-xs text-red-400 hover:text-red-300">Logout</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 hidden md:flex">
          <div className="font-medium text-gray-800 text-lg">
            {menuItems.find(item => item.path === pathname)?.name || 'Dashboard'}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Environment: <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-bold text-xs">Production</span></span>
            <div className="h-8 w-px bg-gray-200"></div>
            <button onClick={logout} className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign Out</button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
