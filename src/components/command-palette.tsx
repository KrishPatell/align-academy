"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Command, X, FileText, Users, BarChart3, Settings, Ticket, BookOpen, Zap, MessageSquare, HelpCircle, Home, ArrowRight } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  href: string;
}

const searchData: SearchResult[] = [
  // Main Navigation
  { id: "overview", title: "Overview", description: "Dashboard home and summary", icon: Home, category: "Navigation", href: "/" },
  { id: "analytics", title: "Analytics", description: "Revenue and performance analytics", icon: BarChart3, category: "Navigation", href: "/analytics" },
  { id: "invoices", title: "Invoices", description: "Manage invoices and billing", icon: Ticket, category: "Navigation", href: "/invoices" },
  { id: "clients", title: "Clients", description: "Customer management", icon: Users, category: "Navigation", href: "/clients" },
  { id: "agents", title: "Agents & Teams", description: "Team management", icon: Users, category: "Navigation", href: "/agents" },
  { id: "knowledge", title: "Knowledge Base", description: "Help articles and docs", icon: BookOpen, category: "Navigation", href: "/knowledge" },
  { id: "integrations", title: "Integrations", description: "Connect third-party apps", icon: Zap, category: "Navigation", href: "/integrations" },
  
  // Analytics
  { id: "sla", title: "SLA Compliance", description: "Service level agreement tracking", icon: BarChart3, category: "Analytics", href: "/sla" },
  { id: "csat", title: "CSAT & NPS", description: "Customer satisfaction scores", icon: BarChart3, category: "Analytics", href: "/csat" },
  { id: "workload", title: "Workload Analytics", description: "Team workload distribution", icon: BarChart3, category: "Analytics", href: "/workload" },
  { id: "reports", title: "Reports", description: "Generate and schedule reports", icon: FileText, category: "Analytics", href: "/reports" },
  { id: "sites", title: "Sites & Servers", description: "Infrastructure management", icon: BarChart3, category: "Analytics", href: "/sites" },
  
  // Support
  { id: "feedback", title: "Feedback", description: "Customer feedback management", icon: MessageSquare, category: "Support", href: "/feedback" },
  { id: "help", title: "Help & Support", description: "Get help and support", icon: HelpCircle, category: "Support", href: "/help" },
  
  // Settings
  { id: "settings", title: "Settings", description: "Account and app settings", icon: Settings, category: "Settings", href: "/settings" },
  
  // Auth
  { id: "login", title: "Login", description: "Sign in to your account", icon: Users, category: "Auth", href: "/login" },
  { id: "signup", title: "Sign Up", description: "Create a new account", icon: Users, category: "Auth", href: "/signup" },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredResults = searchData.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const handleSelect = useCallback((href: string) => {
    router.push(href);
    onOpenChange(false);
    setQuery("");
    setSelectedIndex(0);
  }, [router, onOpenChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      handleSelect(filteredResults[selectedIndex].href);
    } else if (e.key === "Escape") {
      onOpenChange(false);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [filteredResults, selectedIndex, handleSelect, onOpenChange]);

  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  let flatIndex = 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Modal */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-200 dark:border-slate-700">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-slate-400"
              autoFocus
            />
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">ESC</kbd>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto py-2">
            {query === "" ? (
              <div className="px-4 py-8 text-center text-slate-500">
                <Command className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                <p>Start typing to search...</p>
                <p className="text-sm mt-1">Search pages, settings, and more</p>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="px-4 py-8 text-center text-slate-500">
                <Search className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                <p>No results found</p>
                <p className="text-sm mt-1">Try searching for something else</p>
              </div>
            ) : (
              Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <div className="px-4 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {category}
                  </div>
                  {items.map((item) => {
                    const currentIndex = flatIndex++;
                    const isSelected = currentIndex === selectedIndex;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.href)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          isSelected 
                            ? "bg-purple-50 dark:bg-purple-900/20" 
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isSelected ? "bg-purple-100 dark:bg-purple-800" : "bg-slate-100 dark:bg-slate-800"}`}>
                          <item.icon className={`h-4 w-4 ${isSelected ? "text-purple-600" : "text-slate-500"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${isSelected ? "text-purple-700 dark:text-purple-300" : ""}`}>
                            {item.title}
                          </p>
                          <p className="text-sm text-slate-500 truncate">{item.description}</p>
                        </div>
                        <ArrowRight className={`h-4 w-4 text-slate-300 ${isSelected ? "text-purple-400" : ""}`} />
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">↓</kbd>
                <span>to navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">↵</kbd>
                <span>to select</span>
              </span>
            </div>
            <span>{filteredResults.length} results</span>
          </div>
        </div>
      </div>
    </>
  );
}
