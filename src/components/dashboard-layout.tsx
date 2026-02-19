"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import CommandPalette from "@/components/command-palette";
import {
  Home,
  Ticket,
  UsersRound,
  Users,
  BookOpen,
  Zap,
  TrendingUp,
  Smile,
  BarChart3,
  BarChart4,
  FileBarChart,
  MapPin,
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
  RefreshCw,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
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

// Enhanced breadcrumb mapping with parent hierarchy
const breadcrumbs: Record<string, { label: string; href: string; parent?: string }[]> = {
  "/": [{ label: "Overview", href: "/" }],
  "/analytics": [{ label: "Analytics", href: "/analytics" }],
  "/invoices": [{ label: "Invoices", href: "/invoices" }],
  "/clients": [{ label: "Clients", href: "/clients" }],
  "/agents": [{ label: "Agents & Teams", href: "/agents" }],
  "/knowledge": [{ label: "Knowledge Base", href: "/knowledge" }],
  "/integrations": [{ label: "Integrations", href: "/integrations" }],
  "/sla": [{ label: "SLA Compliance", href: "/sla" }],
  "/csat": [{ label: "CSAT & NPS", href: "/csat" }],
  "/workload": [{ label: "Workload Analytics", href: "/workload" }],
  "/reports": [{ label: "Reports", href: "/reports" }],
  "/sites": [{ label: "Sites & Servers", href: "/sites" }],
  "/feedback": [{ label: "Feedback", href: "/feedback" }],
  "/help": [{ label: "Help & Support", href: "/help" }],
  "/settings": [{ label: "Settings", href: "/settings" }],
};

const mainNav = [
  { icon: Home, label: "Overview", href: "/" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Ticket, label: "Invoices", href: "/invoices", hasDropdown: true, items: ["All Invoices", "Pending", "Paid", "Overdue"] },
  { icon: UsersRound, label: "Clients", href: "/clients" },
  { icon: Users, label: "Agents & Teams", href: "/agents" },
  { icon: BookOpen, label: "Knowledge Base", href: "/knowledge" },
  { icon: Zap, label: "Integrations", href: "/integrations" },
];

const analyticsNav = [
  { icon: TrendingUp, label: "SLA Compliance", href: "/sla" },
  { icon: Smile, label: "CSAT & NPS", href: "/csat" },
  { icon: BarChart4, label: "Workload Analytics", href: "/workload" },
  { icon: FileBarChart, label: "Reports", href: "/reports" },
  { icon: MapPin, label: "Sites", href: "/sites" },
];

const supportNav = [
  { icon: MessageSquare, label: "Feedback", href: "/feedback" },
  { icon: HelpCircle, label: "Help & Support", href: "/help" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

// Sidebar item with tooltip
function SidebarItemWithTooltip({ 
  item, 
  isActive, 
  onClick,
  hasChildren = false,
  isOpen = false,
  children 
}: { 
  item: typeof mainNav[0]; 
  isActive: boolean; 
  onClick?: () => void;
  hasChildren?: boolean;
  isOpen?: boolean;
  children?: React.ReactNode;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => setShowTooltip(true), 500);
    setTooltipTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeout) clearTimeout(tooltipTimeout);
    setShowTooltip(false);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hasChildren ? (
        <button
          onClick={onClick}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive 
              ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" 
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:translate-x-1"
          }`}
        >
          <item.icon className="h-4 w-4" />
          <span className="flex-1 text-left">{item.label}</span>
          {hasChildren && (
            isOpen ? <ChevronDown className="h-4 w-4 transition-transform duration-200" /> : <ChevronRight className="h-4 w-4 transition-transform duration-200" />
          )}
        </button>
      ) : (
        <Link
          href={item.href}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive 
              ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" 
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:translate-x-1"
          }`}
        >
          <item.icon className="h-4 w-4" />
          <span className="flex-1 text-left">{item.label}</span>
        </Link>
      )}
      
      {/* Tooltip for collapsed state */}
      {showTooltip && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 animate-fade-in">
          <div className="bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
            {item.label}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 border-8 border-transparent border-r-slate-900 dark:border-r-slate-700" />
          </div>
        </div>
      )}
      
      {/* Dropdown children */}
      {children}
    </div>
  );
}

// Breadcrumb component with smooth transitions
function Breadcrumb({ 
  items 
}: { 
  items: { label: string; href: string }[] 
}) {
  return (
    <nav className="flex items-center gap-1.5 text-sm">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-1.5">
          {index > 0 && (
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          )}
          <Link
            href={item.href}
            className={`transition-colors duration-200 hover:text-slate-900 dark:hover:text-white ${
              index === items.length - 1
                ? "text-slate-900 dark:text-white font-medium"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}

// Page wrapper with transition
function PageTransition({ 
  children, 
  keyProp 
}: { 
  children: React.ReactNode; 
  keyProp?: string;
}) {
  return (
    <div 
      key={keyProp}
      className="animate-fade-in-up"
    >
      {children}
    </div>
  );
}

export default function DashboardLayout({ children }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(["Invoices"]);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  // Keyboard shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]);
  };

  const isActive = (href: string) => pathname === href;
  
  const currentBreadcrumbs = breadcrumbs[pathname] || [{ label: "Dashboard", href: "/" }];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#121212]">
      {/* Sidebar */}
      <aside 
        className={`bg-white dark:bg-[#1a1a1a] border-r border-slate-200 dark:border-slate-800 h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 ease-out ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shrink-0">
              <Crown className="h-5 w-5 text-white" />
            </div>
            {!isSidebarCollapsed && (
              <span className="font-bold text-lg animate-fade-in">Kravio</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* Main Navigation */}
          <div className="mb-4">
            {!isSidebarCollapsed && (
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 transition-opacity duration-200">
                Main Navigation
              </p>
            )}
            {mainNav.map((item) => (
              <div key={item.label}>
                <SidebarItemWithTooltip
                  item={item}
                  isActive={isActive(item.href)}
                  hasChildren={item.hasDropdown}
                  isOpen={openMenus.includes(item.label)}
                  onClick={item.hasDropdown ? () => toggleMenu(item.label) : undefined}
                >
                  {item.hasDropdown && openMenus.includes(item.label) && item.items && !isSidebarCollapsed && (
                    <div className="ml-6 mt-1 space-y-1 animate-fade-in">
                      {item.items.map((subItem, i) => (
                        <Link 
                          key={i} 
                          href={item.href} 
                          className="block px-3 py-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white rounded transition-colors duration-200"
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </SidebarItemWithTooltip>
              </div>
            ))}
          </div>

          {/* Analytics & Insights */}
          {!isSidebarCollapsed && (
            <div className="mb-4 animate-fade-in">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Analytics & Insights</p>
              {analyticsNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:translate-x-1"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Support */}
          {!isSidebarCollapsed && (
            <div className="mb-4 animate-fade-in">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Support</p>
              {supportNav.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:translate-x-1"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* User Profile Card - Premium styled */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className={`flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            {isSidebarCollapsed ? (
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  KW
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-slate-100 dark:border-slate-800" />
              </div>
            ) : (
              <>
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
                    <DropdownMenuItem onClick={() => router.push("/settings")}><Settings className="h-4 w-4 mr-2" />Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/help")}><HelpCircle className="h-4 w-4 mr-2" />Help</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => { alert("Signed out"); console.log("[Auth] User signed out at", new Date().toISOString()); }}><LogOut className="h-4 w-4 mr-2" />Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Collapse toggle button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <ChevronRight className={`h-3 w-3 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
        </Button>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ease-out ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="h-16 bg-white dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-slate-800 px-6 sticky top-0 z-20 flex items-center justify-between">
          {/* Left - Breadcrumb & Title */}
          <div className="flex flex-col gap-1">
            <Breadcrumb items={currentBreadcrumbs} />
            <p className="text-xs text-slate-400">
              {currentDate} · All clouds
            </p>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3">
            {/* Refresh */}
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4 text-slate-500" />
            </Button>

            {/* Download */}
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <Download className="h-4 w-4 text-slate-500" />
            </Button>

            {/* Search */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
            >
              <Search className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-400">Search</span>
              <kbd className="hidden sm:flex items-center gap-1 text-xs text-slate-400 bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 rounded">
                <Command className="h-3 w-3" />K
              </kbd>
            </button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Theme Toggle */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400">☀</span>
              <Switch 
                checked={theme === "dark"} 
                onCheckedChange={(c) => setTheme(c ? "dark" : "light")}
                className="scale-75"
              />
              <span className="text-[10px] text-slate-400">🌙</span>
            </div>
          </div>
        </header>

        {/* Page Content with Transition */}
        <PageTransition keyProp={pathname}>
          {children}
        </PageTransition>

        {/* Global Command Palette */}
        <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
      </main>
    </div>
  );
}
