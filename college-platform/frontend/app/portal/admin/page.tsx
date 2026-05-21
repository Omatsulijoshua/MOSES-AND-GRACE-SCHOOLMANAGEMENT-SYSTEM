"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../lib/api';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [students, setStudents] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [noticeCreating, setNoticeCreating] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/portal/login');
      } else if (user.role !== 'ADMIN') {
        router.push('/portal');
      }
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      fetchNotices();
      fetchStudents();
      fetchMessages();
    }
  }, [user]);

  const fetchNotices = async () => {
    try {
      const res = await api.get('/announcements');
      setNotices(res.data);
    } catch (error) {
      console.error("Failed to fetch notices");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await api.get('/admin/students');
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get('/admin/messages');
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to fetch messages");
    }
  };

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;
    
    setNoticeCreating(true);
    try {
      await api.post('/admin/announcements', { title: newNoticeTitle, content: newNoticeContent });
      setNewNoticeTitle('');
      setNewNoticeContent('');
      fetchNotices();
    } catch (error) {
      console.error("Failed to create notice");
    } finally {
      setNoticeCreating(false);
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      await api.delete(`/admin/announcements/${id}`);
      fetchNotices();
    } catch (error) {
      console.error("Failed to delete notice");
    }
  };

  if (authLoading || !user || user.role !== 'ADMIN') {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 overflow-hidden text-white">
          <div className="p-6 bg-black text-center">
            <h2 className="font-bold text-xl text-yellow-400">Admin Control</h2>
            <p className="text-gray-400 text-sm">Moses & Grace College</p>
          </div>
          <div className="flex flex-col py-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-left font-medium hover:bg-gray-800 transition ${activeTab === 'overview' ? 'text-yellow-400 border-l-4 border-yellow-400 bg-gray-800' : 'text-gray-300'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('students')}
              className={`px-6 py-3 text-left font-medium hover:bg-gray-800 transition ${activeTab === 'students' ? 'text-yellow-400 border-l-4 border-yellow-400 bg-gray-800' : 'text-gray-300'}`}
            >
              Manage Students
            </button>
            <button 
              onClick={() => setActiveTab('notices')}
              className={`px-6 py-3 text-left font-medium hover:bg-gray-800 transition ${activeTab === 'notices' ? 'text-yellow-400 border-l-4 border-yellow-400 bg-gray-800' : 'text-gray-300'}`}
            >
              Manage Notices
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-3 text-left font-medium hover:bg-gray-800 transition ${activeTab === 'messages' ? 'text-yellow-400 border-l-4 border-yellow-400 bg-gray-800' : 'text-gray-300'}`}
            >
              View Messages
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Students</h3>
                <p className="text-3xl font-bold text-gray-900">{students.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-green-500">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Messages</h3>
                <p className="text-3xl font-bold text-gray-900">{messages.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-yellow-500">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Active Notices</h3>
                <p className="text-3xl font-bold text-gray-900">{notices.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Registered Students</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium border-b">Name</th>
                    <th className="p-4 font-medium border-b">Email</th>
                    <th className="p-4 font-medium border-b">Matric No</th>
                    <th className="p-4 font-medium border-b">Level</th>
                    <th className="p-4 font-medium border-b">Role</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">{student.fullname}</td>
                      <td className="p-4 text-gray-600">{student.email}</td>
                      <td className="p-4 text-gray-600">{student.matricNo || '-'}</td>
                      <td className="p-4 text-gray-600">{student.level || '-'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${student.role === 'ADMIN' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                          {student.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr><td colSpan={5} className="p-8 text-center text-gray-500">No students found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'notices' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Publish New Notice</h2>
              <form onSubmit={handleCreateNotice} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea 
                    rows={4} 
                    value={newNoticeContent}
                    onChange={(e) => setNewNoticeContent(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={noticeCreating}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition disabled:opacity-70"
                >
                  {noticeCreating ? 'Publishing...' : 'Publish Notice'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Existing Notices</h2>
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <h4 className="font-bold text-gray-900">{notice.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notice.content}</p>
                      <span className="text-xs text-gray-400 mt-2 block">{new Date(notice.createdAt).toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteNotice(notice.id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded ml-4 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {notices.length === 0 && <p className="text-gray-500">No active notices.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Contact Form Messages</h2>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-900">{msg.fullname}</h4>
                    <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <a href={`mailto:${msg.email}`} className="text-sm text-primary-600 hover:underline mb-2 block">{msg.email}</a>
                  <p className="text-gray-700 whitespace-pre-wrap text-sm bg-white p-3 border border-gray-100 rounded">{msg.message}</p>
                </div>
              ))}
              {messages.length === 0 && <p className="text-gray-500">No messages received yet.</p>}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
