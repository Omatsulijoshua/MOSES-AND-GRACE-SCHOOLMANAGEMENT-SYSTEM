"use client";

import { useEffect, useState } from 'react';
import api from '../../lib/api';

interface Announcement {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function News() {
  const [news, setNews] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get('/announcements');
        setNews(res.data);
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-secondary-50 min-h-screen pb-20">
      <div className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white">News & Events</h1>
          <p className="mt-4 text-xl text-primary-100">Stay updated with the latest from Moses & Grace College</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No news available</h3>
            <p className="text-gray-500">Check back later for updates and announcements.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="text-sm text-primary-600 font-semibold mb-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 line-clamp-4">{item.content}</p>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t">
                  <button className="text-primary-600 font-medium hover:text-primary-800 transition">Read Full Story &rarr;</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
