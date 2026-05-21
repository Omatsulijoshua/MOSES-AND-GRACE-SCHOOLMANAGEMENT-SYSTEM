"use client";

import { useEffect, useState } from 'react';
import api from '../../../lib/api';

export default function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // We are using a mock array here for UI completion, 
  // but it would normally fetch from a /api/admin/logs endpoint
  useEffect(() => {
    // Mocking an API call
    setTimeout(() => {
      setLogs([
        { id: 1, action: 'LOGIN', adminName: 'Super Admin', description: 'Logged into the system', time: new Date().toISOString() },
        { id: 2, action: 'CREDIT_WALLET', adminName: 'Super Admin', description: 'Credited 5000 to user 2', time: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, action: 'CREATE_PAYOUT', adminName: 'Super Admin', description: 'Created payout of 10000 to John Doe', time: new Date(Date.now() - 7200000).toISOString() },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Logs & Activity</h1>
          <p className="text-sm text-gray-500">Immutable audit trail of administrator actions</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading audit trail...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b">
                  <th className="p-4 font-medium">Timestamp</th>
                  <th className="p-4 font-medium">Administrator</th>
                  <th className="p-4 font-medium">Action</th>
                  <th className="p-4 font-medium">Details</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 text-gray-500 font-mono text-xs">{new Date(log.time).toLocaleString()}</td>
                    <td className="p-4 font-medium text-gray-900">{log.adminName}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-bold font-mono">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{log.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
