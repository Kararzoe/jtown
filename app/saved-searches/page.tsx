'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Search, Trash2, Bell, BellOff } from 'lucide-react';

export default function SavedSearches() {
  const [searches, setSearches] = useState<any[]>([]);

  useEffect(() => {
    loadSearches();
  }, []);

  const loadSearches = async () => {
    const data = await api.getSavedSearches();
    setSearches(data);
  };

  const deleteSearch = async (id: string) => {
    await api.deleteSavedSearch(id);
    loadSearches();
  };

  const runSearch = (filters: any) => {
    const params = new URLSearchParams(filters).toString();
    window.location.href = `/products?${params}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Saved Searches</h1>

        {searches.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">No saved searches yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {searches.map(search => (
              <div key={search._id} className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{search.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(search.filters).map(([key, value]) => (
                      <span key={key} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {key}: {String(value)}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    {search.notifyOnNew ? (
                      <>
                        <Bell className="w-4 h-4 text-primary-500" />
                        <span>Notifications enabled</span>
                      </>
                    ) : (
                      <>
                        <BellOff className="w-4 h-4" />
                        <span>Notifications disabled</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => runSearch(search.filters)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  >
                    Run Search
                  </button>
                  <button
                    onClick={() => deleteSearch(search._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
