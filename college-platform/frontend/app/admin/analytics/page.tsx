"use client";

import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AdminAnalytics() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics/revenue');
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const totalGross = data.reduce((sum, item) => sum + item.amount, 0);
  const totalFees = data.reduce((sum, item) => sum + item.gatewayFee, 0);
  const totalNet = data.reduce((sum, item) => sum + item.netAmount, 0);

  // Mock chart data structure since raw data isn't grouped yet
  const chartData = [
    { name: 'Mon', gross: 4000, net: 3800, fees: 200 },
    { name: 'Tue', gross: 3000, net: 2850, fees: 150 },
    { name: 'Wed', gross: 2000, net: 1900, fees: 100 },
    { name: 'Thu', gross: 2780, net: 2640, fees: 140 },
    { name: 'Fri', gross: 1890, net: 1800, fees: 90 },
    { name: 'Sat', gross: 2390, net: 2270, fees: 120 },
    { name: 'Sun', gross: 3490, net: 3310, fees: 180 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue Analytics</h1>
          <p className="text-sm text-gray-500">Track gross income, fees, and net profit</p>
        </div>
      </div>

      {/* Profit Calculator / Summary */}
      <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-8 text-white">
        <h2 className="text-lg font-bold text-gray-300 mb-6">Financial Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-gray-400 mb-1">Gross Revenue</p>
            <p className="text-4xl font-light text-white">₦{totalGross.toLocaleString()}</p>
            <p className="text-sm text-green-400 mt-2">Total money collected</p>
          </div>
          <div className="hidden md:flex justify-center items-center text-4xl font-light text-gray-600">-</div>
          <div>
            <p className="text-gray-400 mb-1">Gateway Fees</p>
            <p className="text-4xl font-light text-red-400">₦{totalFees.toLocaleString()}</p>
            <p className="text-sm text-red-400 mt-2">OPay/Processor charges</p>
          </div>
          <div className="hidden md:flex justify-center items-center text-4xl font-light text-gray-600">=</div>
          <div>
            <p className="text-gray-400 mb-1">Net Profit</p>
            <p className="text-4xl font-bold text-green-400">₦{totalNet.toLocaleString()}</p>
            <p className="text-sm text-green-400 mt-2">Actual settlement</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Income Breakdown</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} tickFormatter={(val) => `₦${val/1000}k`} />
              <Tooltip 
                cursor={{fill: '#F3F4F6'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="gross" name="Gross Revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="net" name="Net Profit" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fees" name="Fees" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
