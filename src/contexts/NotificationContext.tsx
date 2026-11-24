import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppNotification } from '../types';

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (title: string, message: string, type?: AppNotification['type'], bookingId?: string) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Welcome to iDez Entertainment',
    message: 'Browse our rate cards, watch performance reels, and book directly online.',
    timestamp: new Date().toISOString(),
    read: false,
    type: 'system',
  },
  {
    id: 'notif-2',
    title: '70% Deposit Policy',
    message: 'Dates are locked once your 70% deposit is confirmed. Outstanding balances are payable before event day.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    read: false,
    type: 'payment',
  },
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('idez_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('idez_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (
    title: string,
    message: string,
    type: AppNotification['type'] = 'system',
    bookingId?: string
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      type,
      bookingId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};
