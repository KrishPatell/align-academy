"use client";

import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Clock, 
  FileText, 
  Users, 
  BarChart3, 
  BookOpen, 
  Zap, 
  Ticket,
  Settings,
  HelpCircle,
  MessageSquare,
  TrendingUp,
  Smile,
  MapPin,
  FileBarChart,
  BarChart4,
  X,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const iconMap: Record<string, React.ElementType> = {
  "/": FileText,
  "/clients": Users,
  "/agents": Users,
  "/knowledge": BookOpen,
  "/integrations": Zap,
  "/analytics": BarChart3,
  "/sla": TrendingUp,
  "/csat": Smile,
  "/workload": BarChart4,
  "/reports": FileBarChart,
  "/sites": MapPin,
  "/feedback": MessageSquare,
  "/help": HelpCircle,
  "/settings": Settings,
  "/invoices": Ticket,
};

export function RecentItems() {
  const { recentItems, addRecentItem } = useUserPreferences();
  const pathname = usePathname();

  // Track page visits
  useEffect(() => {
    const label = getPageLabel(pathname);
    if (label) {
      addRecentItem(pathname, label);
    }
  }, [pathname, addRecentItem]);

  if (recentItems.length === 0) {
    return (
      <Card className="bg-white dark:bg-[#1a1a1a]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-slate-600" />
            Recent Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
            No recent items yet. Navigate to different pages to see them here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-[#1a1a1a] hover:shadow-xl hover:shadow-slate-500/10 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-slate-600" />
          Recent Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentItems.map((item, index) => {
            const Icon = iconMap[item.href] || FileText;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={`${item.href}-${index}`}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-slate-50 dark:bg-slate-800/20" 
                    : "hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-slate-800/10 dark:hover:to-slate-700/10"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                  isActive 
                    ? "bg-slate-100 dark:bg-slate-700/40" 
                    : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700/30"
                }`}>
                  <Icon className={`h-5 w-5 ${isActive ? "text-slate-600" : "text-slate-600 dark:text-slate-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? "text-slate-700 dark:text-slate-300" : "text-slate-700 dark:text-slate-300"}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400">
                    {getRelativeTime(item.timestamp)}
                  </p>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isActive ? "text-slate-500" : "text-slate-400"}`} />
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function getPageLabel(href: string): string | null {
  const labels: Record<string, string> = {
    "/": "Overview",
    "/clients": "Clients",
    "/agents": "Agents & Teams",
    "/knowledge": "Knowledge Base",
    "/integrations": "Integrations",
    "/analytics": "Analytics",
    "/sla": "SLA Compliance",
    "/csat": "CSAT & NPS",
    "/workload": "Workload Analytics",
    "/reports": "Reports",
    "/sites": "Sites & Servers",
    "/feedback": "Feedback",
    "/help": "Help & Support",
    "/settings": "Settings",
    "/invoices": "Invoices",
  };
  return labels[href] || null;
}

function getRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}
