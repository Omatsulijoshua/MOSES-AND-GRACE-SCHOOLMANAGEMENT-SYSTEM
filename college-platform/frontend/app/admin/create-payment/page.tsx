"use client";

import { useState } from 'react';
import api from '../../../lib/api';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  amount: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, { message: "Amount must be a positive number" }),
  paymentType: z.string().min(1, { message: "Payment type is required" }),
  academicSession: z.string().optional(),
  semester: z.string().optional(),
  department: z.string().optional(),
  level: z.string().optional(),
  isCompulsory: z.boolean().default(true),
  dueDate: z.string().optional(),
  status: z.string().default('ACTIVE')
});

export default function CreatePaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      isCompulsory: true,
      status: 'ACTIVE'
    }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/admin/payment-categories', data);
      router.push('/admin/payment-categories');
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create payment category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Payment Category</h1>
        <p className="text-sm text-gray-500">Define a new fee or payment item for students.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Title*</label>
              <input 
                {...register('title')}
                type="text" 
                placeholder="e.g., School Fees, Project Fee" 
                className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.title && <p className="text-xs text-red-500">{(errors.title as any).message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Amount (₦)*</label>
              <input 
                {...register('amount')}
                type="number" 
                step="0.01"
                placeholder="e.g., 50000" 
                className={`w-full p-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.amount && <p className="text-xs text-red-500">{(errors.amount as any).message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Payment Type*</label>
              <select 
                {...register('paymentType')}
                className={`w-full p-2 border ${errors.paymentType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Type</option>
                <option value="School Fees">School Fees</option>
                <option value="Acceptance Fee">Acceptance Fee</option>
                <option value="Project Fee">Project Fee</option>
                <option value="Hostel Fee">Hostel Fee</option>
                <option value="Departmental Levy">Departmental Levy</option>
                <option value="Laboratory Fee">Laboratory Fee</option>
                <option value="Clearance Fee">Clearance Fee</option>
              </select>
              {errors.paymentType && <p className="text-xs text-red-500">{(errors.paymentType as any).message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Academic Session</label>
              <input 
                {...register('academicSession')}
                type="text" 
                placeholder="e.g., 2026/2027" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Semester</label>
              <select 
                {...register('semester')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Semesters</option>
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <input 
                {...register('department')}
                type="text" 
                placeholder="e.g., Nursing (or leave blank for All)" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Level</label>
              <input 
                {...register('level')}
                type="text" 
                placeholder="e.g., ND1 (or leave blank for All)" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Due Date</label>
              <input 
                {...register('dueDate')}
                type="date" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea 
              {...register('description')}
              placeholder="Provide more details about this fee..." 
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input 
                {...register('isCompulsory')}
                type="checkbox" 
                id="isCompulsory"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isCompulsory" className="ml-2 block text-sm text-gray-900">
                Compulsory Payment
              </label>
            </div>

            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">Status:</label>
              <select 
                {...register('status')}
                className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 border-top pt-4">
            <button 
              type="button"
              onClick={() => router.push('/admin/payment-categories')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
