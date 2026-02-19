"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Home,
  Ticket,
  UsersRound,
  Users,
  BookOpen,
  Zap,
  TrendingUp,
  Smile,
  BarChart4,
  FileBarChart,
  MessageSquare,
  HelpCircle,
  Settings,
  LayoutDashboard,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Crown,
  Command,
  MoreHorizontal,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  children: React.ReactNode;
}

const mainNav = [
  { icon: Home, label: "Overview", href: "/" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Ticket, label: "Invoices", href: "/invoices", hasDropdown: true, items: ["All Invoices", "Pending", "Paid", "Overdue"] },
  { icon: UsersRound, label: "Clients", href: "#" },
  { icon: Users, label: "Agents & Teams", href: "#", hasDropdown: true },
  { icon: BookOpen, label: "Knowledge Base", href: "#", hasDropdown: true },
  { icon: Zap, label: "Integrations", href: "#" },
];

const analyticsNav = [
  { icon: TrendingUp, label: "SLA Compliance", href: "#" },
  { icon: Smile, label: "CSAT & NPS", href: "#" },
  { icon: BarChart4, label: "Workload Analytics", href: "#" },
  { icon: FileBarChart, label: "Reports", href: "#" },
];

const supportNav = [
  { icon: MessageSquare, label: "Feedback", href: "#" },
  { icon: HelpCircle, label: "Help & Support", href: "#" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function DashboardLayout({ children }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(["Invoices"]);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#121212]">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#1a1a1a] border-r border-slate-200 dark:border-slate-800 h-screen fixed left-0 top-0 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">Kravio</span>
          </Link>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search anything" className="pl-10 bg-slate-100 dark:bg-slate-800 border-0 text-sm" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">
              <Command className="h-3 w-3" />K
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {/* Main Navigation */}
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Main Navigation</p>
            {mainNav.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => item.hasDropdown && toggleMenu(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href) 
                      ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" 
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasDropdown && (
                    openMenus.includes(item.label) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {item.hasDropdown && openMenus.includes(item.label) && item.items && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.items.map((subItem, i) => (
                      <Link key={i} href={item.href} className="block px-3 py-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white rounded">
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Analytics & Insights */}
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Analytics & Insights</p>
            {analyticsNav.map((item) => (
              <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Support */}
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Support</p>
            {supportNav.map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* User Profile Card */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                KW
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Krish Walker</p>
              <p className="text-xs text-slate-500 truncate">krish@alignacademy.com</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><Settings className="h-4 w-4 mr-2" />Settings</DropdownMenuItem>
                <DropdownMenuItem><HelpCircle className="h-4 w-4 mr-2" />Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600"><LogOut className="h-4 w-4 mr-2" />Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-slate-800 px-6 sticky top-0 z-20 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">
              {pathname === "/" ? "Overview" : pathname === "/invoices" ? "Invoices" : pathname === "/settings" ? "Settings" : "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Light</span>
              <Switch checked={theme === "dark"} onCheckedChange={(c) => setTheme(c ? "dark" : "light")} />
              <span className="text-xs text-slate-500">Dark</span>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
