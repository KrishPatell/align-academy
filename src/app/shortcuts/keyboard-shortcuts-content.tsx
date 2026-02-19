"use client";

import { 
  Keyboard, 
  Command, 
  Search, 
  PanelLeftClose, 
  PanelLeft,
  Bell,
  Settings,
  Home,
  BarChart3,
  Ticket,
  Users,
  BookOpen,
  Zap,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Enter,
  Escape,
  QuestionMark,
  Sparkles,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ShortcutGroup {
  title: string;
  icon: React.ElementType;
  shortcuts: Shortcut[];
}

interface Shortcut {
  keys: string[];
  description: string;
  action?: string;
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: "Global Navigation",
    icon: Command,
    shortcuts: [
      { keys: ["⌘", "K"], description: "Open command palette", action: "Search pages, actions, and more" },
      { keys: ["⌘", "B"], description: "Toggle sidebar", action: "Expand or collapse the navigation sidebar" },
      { keys: ["?"], description: "Show keyboard shortcuts", action: "View all available keyboard shortcuts" },
      { keys: ["⌘", "⇧", "N"], description: "Open What's New", action: "View latest features and updates" },
      { keys: ["Esc"], description: "Close modal/palette", action: "Close any open dialog or command palette" },
    ],
  },
  {
    title: "Quick Navigation",
    icon: Search,
    shortcuts: [
      { keys: ["G", "H"], description: "Go to Home", action: "Navigate to dashboard overview" },
      { keys: ["G", "A"], description: "Go to Analytics", action: "Navigate to analytics page" },
      { keys: ["G", "I"], description: "Go to Invoices", action: "Navigate to invoices page" },
      { keys: ["G", "C"], description: "Go to Clients", action: "Navigate to clients page" },
      { keys: ["G", "T"], description: "Go to Agents", action: "Navigate to agents & teams page" },
      { keys: ["G", "K"], description: "Go to Knowledge Base", action: "Navigate to knowledge base" },
      { keys: ["G", "S"], description: "Go to Settings", action: "Navigate to settings page" },
    ],
  },
  {
    title: "Command Palette",
    icon: Command,
    shortcuts: [
      { keys: ["↑", "↓"], description: "Navigate results", action: "Move up and down in the list" },
      { keys: ["Enter"], description: "Select item", action: "Open the selected page or action" },
      { keys: ["Esc"], description: "Close palette", action: "Close the command palette" },
    ],
  },
  {
    title: "Sidebar",
    icon: PanelLeftClose,
    shortcuts: [
      { keys: ["⌘", "B"], description: "Toggle sidebar", action: "Expand or collapse the sidebar" },
      { keys: ["⌘", "1-7"], description: "Quick nav items", action: "Navigate to main menu items" },
    ],
  },
  {
    title: "General",
    icon: Keyboard,
    shortcuts: [
      { keys: ["Tab"], description: "Next element", action: "Move focus to next interactive element" },
      { keys: ["⇧", "Tab"], description: "Previous element", action: "Move focus to previous element" },
      { keys: ["Space"], description: "Activate button", action: "Click or toggle the focused element" },
      { keys: ["Enter"], description: "Submit form", action: "Submit the current form" },
    ],
  },
];

const tips = [
  "Press ? anywhere to quickly view keyboard shortcuts",
  "Use G + letter to quickly navigate to any page",
  "The command palette (⌘K) can search for anything",
  "Customize your experience in Settings → Preferences",
];

export default function KeyboardShortcutsContent() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Keyboard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Keyboard Shortcuts
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Master these shortcuts to navigate Align Academy faster than ever.
        </p>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 mb-8 border border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-purple-500 mt-0.5" />
          <div>
            <p className="font-medium text-purple-900 dark:text-purple-100 mb-1">Quick Tips</p>
            <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Shortcut Groups */}
      <div className="grid gap-6">
        {shortcutGroups.map((group) => (
          <div 
            key={group.title}
            className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
              <group.icon className="h-4 w-4 text-slate-500" />
              <h2 className="font-semibold text-slate-900 dark:text-white">
                {group.title}
              </h2>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {group.shortcuts.map((shortcut, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {shortcut.description}
                    </p>
                    {shortcut.action && (
                      <p className="text-sm text-slate-500">
                        {shortcut.action}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIdx) => (
                      <kbd 
                        key={keyIdx}
                        className="min-w-[28px] h-7 flex items-center justify-center px-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Platform-specific note */}
      <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong className="text-slate-900 dark:text-white">Note:</strong> Mac users use ⌘ (Command) key. 
          Windows/Linux users use Ctrl key. The shortcuts work in your browser.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between">
        <Link href="/help">
          <Button variant="outline">
            Back to Help
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Customize Settings
          </Button>
        </Link>
      </div>
    </div>
  );
}
