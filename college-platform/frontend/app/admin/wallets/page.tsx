"use client";

import { useEffect, useState } from 'react';
import api from '../../../lib/api';

export default function AdminWallets() {
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<'CREDIT' | 'DEBIT'>('CREDIT');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const res = await api.get('/wallets');
      setWallets(res.data);
    } catch (error) {
      console.error("Failed to fetch wallets");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const endpoint = modalAction === 'CREDIT' ? '/wallets/credit' : '/wallets/debit';
      await api.post(endpoint, {
        userId: selectedUserId,
        amount: Number(amount),
        description
      });
      setShowModal(false);
      setAmount('');
      setDescription('');
      fetchWallets();
    } catch (error) {
      console.error("Failed to process wallet action");
      alert("Action failed. Check user balance or ID.");
    } finally {
      setActionLoading(false);
    }
  };

  const openModal = (userId: string, action: 'CREDIT' | 'DEBIT') => {
    setSelectedUserId(userId);
    setModalAction(action);
    setShowModal(true);
  };

  const totalSystemBalance = wallets.reduce((acc, w) => acc + w.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wallet Management</h1>
          <p className="text-sm text-gray-500">Monitor liquidity and manage user balances</p>
        </div>
        <button 
          onClick={() => { setSelectedUserId(''); setModalAction('CREDIT'); setShowModal(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium text-sm"
        >
          + Manual Credit
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total System Liquidity</h3>
          <p className="text-3xl font-bold text-gray-900">₦{totalSystemBalance.toLocaleString()}</p>
        </div>
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl">
          🏦
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading wallets...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b">
                  <th className="p-4 font-medium">User ID</th>
                  <th className="p-4 font-medium">User Details</th>
                  <th className="p-4 font-medium text-right">Balance</th>
                  <th className="p-4 font-medium">Last Updated</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {wallets.map((w) => (
                  <tr key={w.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-mono text-xs text-gray-500">UID-{w.userId}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{w.user?.fullname}</div>
                      <div className="text-xs text-gray-500">{w.user?.email}</div>
                    </td>
                    <td className="p-4 font-bold text-right text-gray-900">
                      ₦{w.balance.toLocaleString()}
                    </td>
                    <td className="p-4 text-gray-500 whitespace-nowrap">{new Date(w.updatedAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openModal(w.userId.toString(), 'CREDIT')} className="text-green-600 hover:text-green-800 font-medium text-sm mr-3">Credit</button>
                      <button onClick={() => openModal(w.userId.toString(), 'DEBIT')} className="text-red-600 hover:text-red-800 font-medium text-sm">Debit</button>
                    </td>
                  </tr>
                ))}
                {wallets.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500">No active wallets found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {modalAction === 'CREDIT' ? 'Credit User Wallet' : 'Debit User Wallet'}
            </h2>
            <form onSubmit={handleAction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <input 
                  type="text" 
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  readOnly={selectedUserId !== '' && selectedUserId !== null}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                <input 
                  type="number" 
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description / Reason</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-md text-white font-medium ${modalAction === 'CREDIT' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} disabled:opacity-50`}
                >
                  {actionLoading ? 'Processing...' : `Confirm ${modalAction}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
