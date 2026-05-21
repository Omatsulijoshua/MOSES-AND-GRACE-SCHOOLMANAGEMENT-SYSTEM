"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function PortalDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileLoading, setProfileLoading] = useState(false);
  const [notices, setNotices] = useState([]);
  const [fees, setFees] = useState<any[]>([]);
  const [feesLoading, setFeesLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/portal/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchNotices = async () => {
        try {
          const res = await api.get('/announcements');
          setNotices(res.data.slice(0, 3)); // Just get top 3 for dashboard
        } catch (error) {
          console.error("Failed to fetch notices");
        }
      };
      fetchNotices();
      
      const fetchFees = async () => {
        setFeesLoading(true);
        try {
          const res = await api.get('/student/outstanding-fees');
          setFees(res.data);
        } catch (error) {
          console.error("Failed to fetch fees");
        } finally {
          setFeesLoading(false);
        }
      };
      fetchFees();
    }
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-primary-900 text-white text-center">
            <div className="w-20 h-20 bg-primary-100 text-primary-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
              {user.fullname.charAt(0)}
            </div>
            <h2 className="font-bold text-lg">{user.fullname}</h2>
            <p className="text-primary-200 text-sm">{user.matricNo || 'Matric No: N/A'}</p>
          </div>
          <div className="flex flex-col py-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-left font-medium hover:bg-gray-50 transition ${activeTab === 'overview' ? 'text-primary-600 border-l-4 border-primary-600 bg-blue-50' : 'text-gray-700'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 text-left font-medium hover:bg-gray-50 transition ${activeTab === 'profile' ? 'text-primary-600 border-l-4 border-primary-600 bg-blue-50' : 'text-gray-700'}`}
            >
              My Profile
            </button>
            <button 
              onClick={() => setActiveTab('courses')}
              className={`px-6 py-3 text-left font-medium hover:bg-gray-50 transition ${activeTab === 'courses' ? 'text-primary-600 border-l-4 border-primary-600 bg-blue-50' : 'text-gray-700'}`}
            >
              My Courses
            </button>
            <button 
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 text-left font-medium hover:bg-gray-50 transition ${activeTab === 'payments' ? 'text-primary-600 border-l-4 border-primary-600 bg-blue-50' : 'text-gray-700'}`}
            >
              Payments
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.fullname.split(' ')[0]}!</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Current Level</h3>
                <p className="text-2xl font-bold text-gray-900">{user.level || '100L'}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-green-500">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Registered Courses</h3>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-red-500">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Outstanding Fees</h3>
                <p className="text-2xl font-bold text-gray-900">
                  ₦{fees.reduce((acc, fee) => acc + fee.balanceRemaining, 0).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Recent Notices</h2>
              {notices.length > 0 ? (
                <div className="space-y-4">
                  {notices.map((notice: any) => (
                    <div key={notice.id} className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-bold text-primary-900">{notice.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notice.content}</p>
                      <span className="text-xs text-gray-500 mt-2 block">{new Date(notice.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No new notices at this time.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                <div className="text-gray-900 font-medium p-2 bg-gray-50 rounded border">{user.fullname}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                <div className="text-gray-900 font-medium p-2 bg-gray-50 rounded border">{user.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Matriculation Number</label>
                <div className="text-gray-900 font-medium p-2 bg-gray-50 rounded border">{user.matricNo || 'Not Assigned'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                <div className="text-gray-900 font-medium p-2 bg-gray-50 rounded border">{user.department || 'Not Assigned'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Level</label>
                <div className="text-gray-900 font-medium p-2 bg-gray-50 rounded border">{user.level || 'Not Assigned'}</div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t">
              <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition">Edit Profile</button>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center py-20">
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
              <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Registered Courses</h3>
            <p className="text-gray-500 mb-6">You have not registered for any courses for the current semester.</p>
            <button className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition">Course Registration</button>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Outstanding Fees</h2>
            
            {feesLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-100 rounded"></div>
                <div className="h-10 bg-gray-100 rounded"></div>
              </div>
            ) : fees.length > 0 ? (
              <div className="space-y-4">
                {fees.map((fee) => (
                  <div key={fee.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <h4 className="font-bold text-gray-900">{fee.title}</h4>
                      <p className="text-sm text-gray-500">{fee.paymentType} • {fee.academicSession}</p>
                      <p className="text-xs text-gray-400">Due: {fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">₦{fee.balanceRemaining.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Paid: ₦{fee.amountPaid.toLocaleString()}</div>
                      <button 
                        onClick={async () => {
                          const amount = prompt(`Enter amount to pay for ${fee.title} (Max: ${fee.balanceRemaining}):`, fee.balanceRemaining.toString());
                          if (amount) {
                            try {
                              await api.post('/student/pay', { paymentCategoryId: fee.id, amount });
                              alert('Payment successful (Mock)');
                              window.location.reload();
                            } catch (error) {
                              alert('Payment failed');
                            }
                          }
                        }}
                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="inline-block p-4 bg-green-50 rounded-full mb-4">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Outstanding Payments</h3>
                <p className="text-gray-500">Your fee status is cleared for the current academic session.</p>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
