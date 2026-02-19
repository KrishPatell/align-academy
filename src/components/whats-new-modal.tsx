"use client";

import { useState, useEffect } from "react";
import { X, ExternalLink, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ChangelogItem {
  version: string;
  date: string;
  features: { type: "new" | "improvement" | "fix"; text: string }[];
}

const changelog: ChangelogItem[] = [
  {
    version: "2.0.0",
    date: "February 2026",
    features: [
      { type: "new", text: "Keyboard shortcuts page - Press ? to view all shortcuts" },
      { type: "new", text: "What's New modal - Stay updated with latest features" },
      { type: "new", text: "Interactive onboarding tour for new users" },
      { type: "new", text: "Help tooltips throughout the dashboard" },
      { type: "improvement", text: "Enhanced command palette with more actions" },
      { type: "improvement", text: "Improved sidebar collapse persistence" },
    ],
  },
  {
    version: "1.5.0",
    date: "January 2026",
    features: [
      { type: "new", text: "Advanced analytics dashboard" },
      { type: "improvement", text: "Better performance for large datasets" },
      { type: "fix", text: "Fixed timezone display issues" },
    ],
  },
  {
    version: "1.4.0",
    date: "December 2025",
    features: [
      { type: "new", text: "SLA compliance tracking" },
      { type: "new", text: "CSAT & NPS reporting" },
      { type: "improvement", text: "Export functionality improvements" },
    ],
  },
];

interface WhatsNewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isNewUser?: boolean;
}

export default function WhatsNewModal({ open, onOpenChange, isNewUser }: WhatsNewModalProps) {
  const [dismissedVersion, setDismissedVersion] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("whats-new-dismissed");
    if (saved) {
      setDismissedVersion(saved);
    }
  }, []);

  const handleDismiss = (version: string) => {
    localStorage.setItem("whats-new-dismissed", version);
    setDismissedVersion(version);
    onOpenChange(false);
  };

  const getFeatureIcon = (type: string) => {
    switch (type) {
      case "new":
        return <Sparkles className="h-3.5 w-3.5 text-purple-500" />;
      case "improvement":
        return <ChevronRight className="h-3.5 w-3.5 text-blue-500" />;
      case "fix":
        return <span className="text-green-500">✓</span>;
      default:
        return null;
    }
  };

  const getFeatureBadge = (type: string) => {
    switch (type) {
      case "new":
        return <span className="text-[10px] font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded">NEW</span>;
      case "improvement":
        return <span className="text-[10px] font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">IMPROVED</span>;
      case "fix":
        return <span className="text-[10px] font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded">FIXED</span>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            {isNewUser ? "Welcome to Align Academy!" : "What's New"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {isNewUser && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                👋 Welcome aboard!
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Get started with our interactive tour or explore the keyboard shortcuts to navigate faster.
              </p>
              <div className="flex gap-2 mt-3">
                <Button 
                  size="sm" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => {
                    onOpenChange(false);
                    // Trigger tour - will be handled by parent
                    window.dispatchEvent(new CustomEvent("start-tour"));
                  }}
                >
                  Start Tour
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = "/shortcuts"}
                >
                  View Shortcuts
                </Button>
              </div>
            </div>
          )}

          {changelog.map((item) => (
            <div 
              key={item.version} 
              className={`rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden ${
                dismissedVersion === item.version ? "opacity-50" : ""
              }`}
            >
              <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    v{item.version}
                  </span>
                  <span className="text-xs text-slate-500">{item.date}</span>
                </div>
                {dismissedVersion !== item.version && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs text-slate-400 hover:text-slate-600"
                    onClick={() => handleDismiss(item.version)}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Dismiss
                  </Button>
                )}
              </div>
              <div className="p-4 space-y-2">
                {item.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="mt-0.5">{getFeatureIcon(feature.type)}</span>
                    <span className="flex-1 text-slate-600 dark:text-slate-300">
                      {feature.text}
                    </span>
                    {getFeatureBadge(feature.type)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-shrink-0 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <Button
            variant="link"
            size="sm"
            className="text-slate-500"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            View Changelog on GitHub
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
