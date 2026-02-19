"use client";

import { useState } from "react";
import { 
  Activity, 
  User, 
  Settings, 
  Ticket, 
  FileText, 
  Users, 
  Shield, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  LogIn,
  LogOut,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Zap,
  Database,
  Server,
  Globe,
  Mail,
  MessageSquare,
  Bell,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Activity type definitions
export type ActivityType = 
  | "login" 
  | "logout" 
  | "create" 
  | "update" 
  | "delete" 
  | "view" 
  | "download" 
  | "upload"
  | "assign"
  | "comment"
  | "status_change"
  | "sla_breach"
  | "alert"
  | "system";

export type ActivitySeverity = "info" | "success" | "warning" | "error";

export interface TimelineActivity {
  id: string;
  type: ActivityType;
  severity: ActivitySeverity;
  title: string;
  description: string;
  user?: string;
  userAvatar?: string;
  timestamp: Date;
  metadata?: Record<string, string>;
  category?: string;
}

interface ActivityTimelineProps {
  activities: TimelineActivity[];
  limit?: number;
  showFilters?: boolean;
  onActivityClick?: (activity: TimelineActivity) => void;
}

// Icon mapping for activity types
const getActivityIcon = (type: ActivityType) => {
  const icons: Record<ActivityType, typeof Activity> = {
    login: LogIn,
    logout: LogOut,
    create: AddIcon,
    update: Edit,
    delete: Trash2,
    view: Eye,
    download: Download,
    upload: Upload,
    assign: User,
    comment: MessageSquare,
    status_change: RefreshCw,
    sla_breach: AlertCircle,
    alert: Bell,
    system: Settings,
  };
  return icons[type] || Activity;
};

// Color mapping for severity levels
const getSeverityColor = (severity: ActivitySeverity) => {
  const colors: Record<ActivitySeverity, string> = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
  };
  return colors[severity];
};

const getSeverityBorderColor = (severity: ActivitySeverity) => {
  const colors: Record<ActivitySeverity, string> = {
    info: "border-l-blue-500",
    success: "border-l-green-500",
    warning: "border-l-amber-500",
    error: "border-l-red-500",
  };
  return colors[severity];
};

const getSeverityBadgeColor = (severity: ActivitySeverity) => {
  const colors: Record<ActivitySeverity, string> = {
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  return colors[severity];
};

// Add icon component (lucide-react doesn't have Add, using Plus)
function AddIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

// Format relative time
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Format timestamp for display
const formatTimestamp = (date: Date): string => {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Activity type label
const getActivityTypeLabel = (type: ActivityType): string => {
  const labels: Record<ActivityType, string> = {
    login: "Login",
    logout: "Logout",
    create: "Created",
    update: "Updated",
    delete: "Deleted",
    view: "Viewed",
    download: "Downloaded",
    upload: "Uploaded",
    assign: "Assigned",
    comment: "Commented",
    status_change: "Status Changed",
    sla_breach: "SLA Breach",
    alert: "Alert",
    system: "System",
  };
  return labels[type];
};

// Category icon and color
const getCategoryInfo = (category?: string) => {
  if (!category) return { icon: Activity, color: "text-slate-500" };
  
  const categories: Record<string, { icon: typeof Activity; color: string }> = {
    tickets: { icon: Ticket, color: "text-purple-500" },
    clients: { icon: Users, color: "text-blue-500" },
    agents: { icon: User, color: "text-green-500" },
    invoices: { icon: FileText, color: "text-amber-500" },
    security: { icon: Shield, color: "text-red-500" },
    system: { icon: Server, color: "text-slate-500" },
    integrations: { icon: Zap, color: "text-cyan-500" },
    knowledge: { icon: FileText, color: "text-indigo-500" },
  };
  
  return categories[category] || { icon: Activity, color: "text-slate-500" };
};

export function ActivityTimeline({ 
  activities, 
  limit = 10, 
  showFilters = true,
  onActivityClick 
}: ActivityTimelineProps) {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Filter activities
  const filteredActivities = activities.filter((activity) => {
    if (filterType !== "all" && activity.type !== filterType) return false;
    if (filterSeverity !== "all" && activity.severity !== filterSeverity) return false;
    if (filterCategory !== "all" && activity.category !== filterCategory) return false;
    return true;
  }).slice(0, limit);

  // Get unique categories from activities
  const categories = [...new Set(activities.map((a) => a.category).filter(Boolean))] as string[];

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
              <SelectItem value="create">Created</SelectItem>
              <SelectItem value="update">Updated</SelectItem>
              <SelectItem value="delete">Deleted</SelectItem>
              <SelectItem value="view">Viewed</SelectItem>
              <SelectItem value="assign">Assigned</SelectItem>
              <SelectItem value="comment">Commented</SelectItem>
              <SelectItem value="status_change">Status Change</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />

        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No activities found</p>
            </div>
          ) : (
            filteredActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              const { icon: CategoryIcon, color: categoryColor } = getCategoryInfo(activity.category);
              
              return (
                <div
                  key={activity.id}
                  className={`relative pl-10 cursor-pointer group ${getSeverityBorderColor(activity.severity)} border-l-2`}
                  onClick={() => onActivityClick?.(activity)}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-2 top-1.5 w-4 h-4 rounded-full ${getSeverityColor(activity.severity)} flex items-center justify-center`}>
                    <Icon className="h-2.5 w-2.5 text-white" />
                  </div>

                  {/* Activity card */}
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-slate-900 dark:text-white truncate">
                            {activity.title}
                          </span>
                          <Badge className={`text-xs ${getSeverityBadgeColor(activity.severity)}`}>
                            {getActivityTypeLabel(activity.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                          {activity.description}
                        </p>
                        {activity.user && (
                          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                            <User className="h-3 w-3" />
                            <span>{activity.user}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {formatRelativeTime(activity.timestamp)}
                        </span>
                        {activity.category && (
                          <CategoryIcon className={`h-4 w-4 ${categoryColor}`} />
                        )}
                      </div>
                    </div>
                    
                    {/* Metadata display */}
                    {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(activity.metadata).map(([key, value]) => (
                            <span key={key} className="text-xs text-slate-500 dark:text-slate-400">
                              <span className="font-medium">{key}:</span> {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {filteredActivities.length > 0 && filteredActivities.length === limit && (
          <div className="text-center mt-4">
            <Button variant="ghost" size="sm">
              View All Activities
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Compact version for dashboard widgets
export function ActivityTimelineCompact({ 
  activities, 
  limit = 5 
}: { 
  activities: TimelineActivity[];
  limit?: number;
}) {
  const displayActivities = activities.slice(0, limit);

  return (
    <div className="space-y-3">
      {displayActivities.map((activity) => {
        const Icon = getActivityIcon(activity.type);
        
        return (
          <div
            key={activity.id}
            className="flex items-start gap-3"
          >
            <div className={`mt-0.5 p-1.5 rounded-full ${getSeverityColor(activity.severity)} bg-opacity-10`}>
              <Icon className={`h-3.5 w-3.5 ${getSeverityColor(activity.severity).replace("bg-", "text-")}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-900 dark:text-white truncate">
                {activity.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activity.user ? `${activity.user} • ` : ""}{formatRelativeTime(activity.timestamp)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Sample data generator for demo purposes
export function generateSampleActivities(): TimelineActivity[] {
  const now = new Date();
  
  return [
    {
      id: "1",
      type: "login",
      severity: "success",
      title: "User Login",
      description: "Sarah Chen logged in from Chrome on macOS",
      user: "Sarah Chen",
      timestamp: new Date(now.getTime() - 2 * 60 * 1000),
      category: "system",
    },
    {
      id: "2",
      type: "create",
      severity: "info",
      title: "New Ticket Created",
      description: "Ticket #2345 created for 'API Integration Issue'",
      user: "Michael Brown",
      timestamp: new Date(now.getTime() - 15 * 60 * 1000),
      category: "tickets",
      metadata: { Priority: "High", Client: "Acme Corp" },
    },
    {
      id: "3",
      type: "status_change",
      severity: "info",
      title: "Ticket Status Updated",
      description: "Ticket #2341 status changed from 'Open' to 'In Progress'",
      user: "Sarah Chen",
      timestamp: new Date(now.getTime() - 32 * 60 * 1000),
      category: "tickets",
    },
    {
      id: "4",
      type: "sla_breach",
      severity: "error",
      title: "SLA Breach Risk",
      description: "Ticket #2319 approaching SLA deadline (2h remaining)",
      user: "System",
      timestamp: new Date(now.getTime() - 60 * 60 * 1000),
      category: "tickets",
      metadata: { "Time Remaining": "2h", "SLA Target": "4h" },
    },
    {
      id: "5",
      type: "assign",
      severity: "info",
      title: "Ticket Assigned",
      description: "Ticket #2338 reassigned to Sarah Chen",
      user: "David Wilson",
      timestamp: new Date(now.getTime() - 90 * 60 * 1000),
      category: "tickets",
    },
    {
      id: "6",
      type: "create",
      severity: "success",
      title: "New Client Registered",
      description: "New client 'TechStart Inc' has been added",
      user: "System",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      category: "clients",
      metadata: { Plan: "Enterprise", Industry: "Technology" },
    },
    {
      id: "7",
      type: "comment",
      severity: "info",
      title: "Comment Added",
      description: "New comment on Ticket #2335",
      user: "Emily Davis",
      timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      category: "tickets",
    },
    {
      id: "8",
      type: "alert",
      severity: "warning",
      title: "System Alert",
      description: "High CPU usage detected on server us-east-1",
      user: "System",
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      category: "system",
      metadata: { Server: "us-east-1", CPU: "92%" },
    },
    {
      id: "9",
      type: "update",
      severity: "info",
      title: "Knowledge Base Updated",
      description: "Article 'Getting Started Guide' has been updated",
      user: "Admin",
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      category: "knowledge",
    },
    {
      id: "10",
      type: "download",
      severity: "info",
      title: "Report Downloaded",
      description: "Monthly performance report downloaded",
      user: "Michael Brown",
      timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      category: "system",
      metadata: { Format: "PDF", Size: "2.4 MB" },
    },
  ];
}

export default ActivityTimeline;
