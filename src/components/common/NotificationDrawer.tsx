import React from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { X, Check, Bell, Calendar, DollarSign, Info } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const NotificationDrawer: React.FC = () => {
  const { notifications, isDrawerOpen, setIsDrawerOpen, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  if (!isDrawerOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-4 h-4 text-emerald-400" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 text-brand-gold" />;
      default:
        return <Info className="w-4 h-4 text-brand-crimson" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-white/10 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center space-x-2.5">
              <Bell className="w-5 h-5 text-brand-crimson" />
              <h3 className="font-semibold text-white font-display text-lg">In-App Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-brand-crimson text-white text-xs font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mark All As Read */}
          {unreadCount > 0 && (
            <div className="px-6 py-2 bg-white/5 border-b border-white/5 flex justify-end">
              <button
                onClick={markAllAsRead}
                className="text-xs text-brand-crimson hover:underline font-medium flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Mark all as read
              </button>
            </div>
          )}

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    notif.read
                      ? 'bg-white/5 border-white/5 opacity-75'
                      : 'bg-brand-card border-brand-crimson/30 shadow-md glow-subtle'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white truncate">{notif.title}</h4>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                          {formatDistanceToNow(parseISO(notif.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-white/5 border-t border-white/10 text-center">
            <span className="text-xs text-slate-400">
              Booking updates & reminders are saved here in real-time.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
