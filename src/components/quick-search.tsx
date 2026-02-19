"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Clock, FileText, Users, Ticket, BarChart3, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  type: "invoice" | "client" | "agent" | "page";
  href: string;
}

const quickLinks: SearchResult[] = [
  { id: "1", title: "Analytics", subtitle: "View analytics dashboard", icon: <BarChart3 className="h-4 w-4" />, type: "page", href: "/analytics" },
  { id: "2", title: "Clients", subtitle: "Manage clients", icon: <Users className="h-4 w-4" />, type: "page", href: "/clients" },
  { id: "3", title: "Invoices", subtitle: "View invoices", icon: <Ticket className="h-4 w-4" />, type: "page", href: "/invoices" },
  { id: "4", title: "Integrations", subtitle: "Manage integrations", icon: <Zap className="h-4 w-4" />, type: "page", href: "/integrations" },
  { id: "5", title: "Agents", subtitle: "Manage team", icon: <Users className="h-4 w-4" />, type: "page", href: "/agents" },
  { id: "6", title: "Reports", subtitle: "View reports", icon: <BarChart3 className="h-4 w-4" />, type: "page", href: "/reports" },
];

interface QuickSearchProps {
  placeholder?: string;
}

export function QuickSearch({ placeholder = "Search anything..." }: QuickSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearch(query);
      // In a real app, this would trigger a global search
      console.log("Searching for:", query);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    saveSearch(result.title);
    router.push(result.href);
    setIsOpen(false);
    setQuery("");
  };

  const filteredResults = query.length > 0 
    ? quickLinks.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : quickLinks;

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            className="w-64 pl-10 pr-10 h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </form>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-fade-in">
          {/* Recent Searches */}
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-3 border-b border-slate-200 dark:border-slate-700">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Recent Searches
              </p>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => { setQuery(search); saveSearch(search); }}
                  className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-left"
                >
                  <Clock className="h-3 w-3 text-slate-400" />
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Results */}
          <div className="p-2 max-h-80 overflow-y-auto">
            {filteredResults.length > 0 ? (
              <>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider px-2 mb-2">
                  {query.length > 0 ? "Results" : "Quick Links"}
                </p>
                {filteredResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-left"
                  >
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {result.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </>
            ) : (
              <div className="p-4 text-center text-slate-500">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No results found for "{query}"</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-600 rounded">↵</kbd> to search</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickSearch;
