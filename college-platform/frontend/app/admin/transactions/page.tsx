"use client";

import { useEffect, useState } from 'react';
import api from '../../../lib/api';

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/transactions');
        setTransactions(res.data);
      } catch (error) {
        console.error("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(t => 
    t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.user?.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-sm text-gray-500">View and manage all platform payments</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-300 shadow-sm px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">Export CSV</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Search reference, name, or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading transactions...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider border-b">
                  <th className="p-4 font-medium">Reference ID</th>
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Method</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-mono text-xs text-gray-600">{tx.reference}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{tx.user?.fullname || 'Unknown'}</div>
                      <div className="text-xs text-gray-500">{tx.user?.email || ''}</div>
                    </td>
                    <td className="p-4 font-bold text-gray-900">₦{tx.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium">{tx.paymentMethod}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 
                        tx.status === 'FAILED' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 whitespace-nowrap">{new Date(tx.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View</button>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr><td colSpan={7} className="p-8 text-center text-gray-500">No transactions found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Showing {filteredTransactions.length} results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600 border-blue-200">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
