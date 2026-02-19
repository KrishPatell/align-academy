"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Settings, 
  X,
  AlertCircle,
  Info,
  CheckCircle2,
  TrendingUp,
  Users,
  FileText,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types
export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  icon?: "invoice" | "client" | "agent" | "analytics" | "message";
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  digest: "realtime" | "daily" | "weekly";
  types: {
    invoices: boolean;
    clients: boolean;
    agents: boolean;
    analytics: boolean;
    messages: boolean;
  };
}

// Default notifications for demo
const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Invoice Paid",
    message: "Client Acme Corp paid invoice #INV-2024-001 for $5,000",
    time: "2 min ago",
    read: false,
    actionUrl: "/invoices",
    icon: "invoice"
  },
  {
    id: "2",
    type: "warning",
    title: "SLA Breach Risk",
    message: "Ticket #TK-1234 approaching SLA deadline in 30 minutes",
    time: "15 min ago",
    read: false,
    actionUrl: "/analytics",
    icon: "analytics"
  },
  {
    id: "3",
    type: "info",
    title: "New Client Onboarded",
    message: "TechStart Inc has been added to your client list",
    time: "1 hour ago",
    read: false,
    actionUrl: "/clients",
    icon: "client"
  },
  {
    id: "4",
    type: "success",
    title: "Agent Performance",
    message: "Sarah achieved 100% CSAT for the week!",
    time: "3 hours ago",
    read: true,
    actionUrl: "/agents",
    icon: "agent"
  },
  {
    id: "5",
    type: "info",
    title: "Weekly Report Ready",
    message: "Your weekly performance report is ready to view",
    time: "Yesterday",
    read: true,
    actionUrl: "/reports",
    icon: "analytics"
  },
  {
    id: "6",
    type: "message",
    title: "New Feedback Received",
    message: "A client left new feedback on recent support ticket",
    time: "Yesterday",
    read: true,
    actionUrl: "/feedback",
    icon: "message"
  },
];

const defaultSettings: NotificationSettings = {
  email: true,
  push: true,
  digest: "daily",
  types: {
    invoices: true,
    clients: true,
    agents: true,
    analytics: true,
    messages: true,
  }
};

// Context
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  settings: NotificationSettings;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  markAsUnread: (id: string) => void;
  deleteNotification: (id: string) => void;
  updateSettings: (newSettings: Partial<NotificationSettings>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const markAsUnread = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: false } : n));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      settings,
      markAsRead,
      markAllAsRead,
      markAsUnread,
      deleteNotification,
      updateSettings,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

// Hook
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}

// Icon mapping
const iconMap = {
  invoice: FileText,
  client: Users,
  agent: Users,
  analytics: TrendingUp,
  message: MessageSquare,
};

// Type color mapping
const typeStyles = {
  info: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  success: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  error: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

// Notification Item Component
function NotificationItem({ 
  notification, 
  onMarkRead, 
  onDelete 
}: { 
  notification: Notification; 
  onMarkRead: () => void;
  onDelete: () => void;
}) {
  const IconComponent = iconMap[notification.icon || "info"];
  
  return (
    <div 
      className={`group flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
        !notification.read ? "bg-purple-50/50 dark:bg-purple-900/10" : ""
      }`}
    >
      {/* Icon */}
      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${typeStyles[notification.type]}`}>
        {notification.type === "warning" ? (
          <AlertCircle className="h-4 w-4" />
        ) : notification.type === "success" ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : notification.type === "error" ? (
          <AlertCircle className="h-4 w-4" />
        ) : notification.type === "info" ? (
          <Info className="h-4 w-4" />
        ) : (
          <IconComponent className="h-4 w-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
            {notification.title}
          </p>
          {!notification.read && (
            <span className="w-2 h-2 bg-purple-500 rounded-full shrink-0" />
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
          {notification.message}
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
          {notification.time}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notification.read && (
          <button
            onClick={onMarkRead}
            className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            title="Mark as read"
          >
            <CheckCheck className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          onClick={onDelete}
          className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500"
          title="Delete"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// Notifications Dropdown Component
export function NotificationsDropdown({ className }: { className?: string }) {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`relative h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 ${className}`}
        >
          <Bell className="h-5 w-5 text-slate-500" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 md:w-96 p-0 border-slate-200 dark:border-slate-700 shadow-xl"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-7 px-2 text-xs text-slate-500 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <CheckCheck className="h-3.5 w-3.5 mr-1" />
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="h-7 w-7 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {settingsOpen && (
          <NotificationSettingsPanel onClose={() => setSettingsOpen(false)} />
        )}

        {/* Notifications List */}
        <ScrollArea className="max-h-96">
          {notifications.length === 0 ? (
            <div className="p-6 text-center">
              <Bell className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500 dark:text-slate-400">No notifications</p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={() => markAsRead(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-2 border-t border-slate-200 dark:border-slate-700">
          <Button
            variant="ghost"
            className="w-full text-sm text-slate-500 hover:text-purple-600 dark:hover:text-purple-400"
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Notification Settings Panel
function NotificationSettingsPanel({ onClose }: { onClose: () => void }) {
  const { settings, updateSettings } = useNotifications();

  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-slate-900 dark:text-white">Notification Settings</h4>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <X className="h-4 w-4 text-slate-400" />
        </button>
      </div>
      
      <div className="space-y-3">
        {/* Delivery toggles */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-300">Email notifications</span>
          <Switch
            checked={settings.email}
            onCheckedChange={(checked) => updateSettings({ email: checked })}
            className="scale-90"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-300">Push notifications</span>
          <Switch
            checked={settings.push}
            onCheckedChange={(checked) => updateSettings({ push: checked })}
            className="scale-90"
          />
        </div>

        {/* Digest frequency */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-300">Digest frequency</span>
          <select
            value={settings.digest}
            onChange={(e) => updateSettings({ digest: e.target.value as "realtime" | "daily" | "weekly" })}
            className="text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md px-2 py-1 text-slate-700 dark:text-slate-200"
          >
            <option value="realtime">Real-time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {/* Notification types */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Notify me about</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.types.invoices}
                onChange={(e) => updateSettings({ 
                  types: { ...settings.types, invoices: e.target.checked } 
                })}
                className="rounded border-slate-300 dark:border-slate-600"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300">Invoices</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.types.clients}
                onChange={(e) => updateSettings({ 
                  types: { ...settings.types, clients: e.target.checked } 
                })}
                className="rounded border-slate-300 dark:border-slate-600"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300">Clients</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.types.agents}
                onChange={(e) => updateSettings({ 
                  types: { ...settings.types, agents: e.target.checked } 
                })}
                className="rounded border-slate-300 dark:border-slate-600"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300">Agents</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.types.analytics}
                onChange={(e) => updateSettings({ 
                  types: { ...settings.types, analytics: e.target.checked } 
                })}
                className="rounded border-slate-300 dark:border-slate-600"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300">Analytics</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.types.messages}
                onChange={(e) => updateSettings({ 
                  types: { ...settings.types, messages: e.target.checked } 
                })}
                className="rounded border-slate-300 dark:border-slate-600"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300">Messages</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// Badge component for use throughout the app
export function NotificationBadge({ 
  count, 
  maxCount = 9,
  className = ""
}: { 
  count: number; 
  maxCount?: number;
  className?: string;
}) {
  if (count === 0) return null;
  
  return (
    <span className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center px-1 animate-pulse ${className}`}>
      {count > maxCount ? `${maxCount}+` : count}
    </span>
  );
}
