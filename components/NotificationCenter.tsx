'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Bell, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function NotificationCenter() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      loadNotifications();
      const interval = setInterval(loadNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      const data = await api.getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter((n: any) => !n.read).length);
    } catch (error) {
      console.error(error);
    }
  };

  const markRead = async (id: string) => {
    await api.markNotificationRead(id);
    loadNotifications();
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 hover:bg-gray-100 rounded-full"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border max-h-96 overflow-y-auto z-50">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-bold">Notifications</h3>
            <button onClick={() => setShowPanel(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {notifications.length === 0 ? (
            <p className="p-4 text-gray-600 text-center">No notifications</p>
          ) : (
            <div>
              {notifications.map((notif: any) => (
                <div
                  key={notif._id}
                  onClick={() => {
                    markRead(notif._id);
                    if (notif.link) window.location.href = notif.link;
                  }}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}
                >
                  <p className="font-semibold text-sm">{notif.type}</p>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
