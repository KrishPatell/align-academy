"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delay?: number;
  icon?: boolean;
  className?: string;
}

export function HelpTooltip({
  content,
  children,
  side = "top",
  align = "center",
  delay = 300,
  icon = true,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPermanentlyVisible, setIsPermanentlyVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isPermanentlyVisible) {
      setIsVisible(false);
    }
  };

  const togglePermanent = () => {
    if (isPermanentlyVisible) {
      setIsPermanentlyVisible(false);
      setIsVisible(false);
    } else {
      setIsPermanentlyVisible(true);
      setIsVisible(true);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsPermanentlyVisible(false);
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div 
      ref={tooltipRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={togglePermanent}
    >
      {children || (
        <HelpCircle className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help transition-colors" />
      )}
      
      {isVisible && (
        <div 
          className={cn(
            "absolute z-50 animate-in fade-in zoom-in-95 duration-200",
            sideClasses[side],
            side !== "left" && side !== "right" && alignClasses[align]
          )}
        >
          <div className="bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-2 rounded-lg shadow-xl max-w-xs">
            {content}
            {isPermanentlyVisible && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPermanentlyVisible(false);
                  setIsVisible(false);
                }}
                className="absolute -top-1 -right-1 h-4 w-4 bg-slate-600 rounded-full flex items-center justify-center hover:bg-slate-500"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
            {/* Arrow */}
            <div 
              className={cn(
                "absolute w-2 h-2 bg-slate-900 dark:bg-slate-700 rotate-45",
                side === "top" && "top-full left-1/2 -translate-x-1/2 -mt-1",
                side === "bottom" && "bottom-full left-1/2 -translate-x-1/2 -mb-1",
                side === "left" && "left-full top-1/2 -translate-y-1/2 -ml-1",
                side === "right" && "right-full top-1/2 -translate-y-1/2 -mr-1"
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Context-aware help tooltip with more info
interface ContextTooltipProps {
  title: string;
  content: string;
  link?: string;
  className?: string;
}

export function ContextTooltip({ title, content, link, className }: ContextTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showDetailTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setShowDetail(true);
    }, 400);
  };

  const hideDetailTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
    setShowDetail(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={tooltipRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={showDetailTooltip}
      onMouseLeave={hideDetailTooltip}
    >
      <HelpCircle className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help transition-colors" />
      
      {isVisible && showDetail && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-700/50 px-3 py-2 border-b border-slate-200 dark:border-slate-700">
              <p className="font-medium text-sm text-slate-900 dark:text-white">{title}</p>
            </div>
            <div className="p-3">
              <p className="text-xs text-slate-600 dark:text-slate-300">{content}</p>
              {link && (
                <a 
                  href={link} 
                  className="text-xs text-slate-600 hover:text-slate-700 mt-2 inline-block font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn more →
                </a>
              )}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="w-2 h-2 bg-white dark:bg-slate-800 rotate-45 border-r border-b border-slate-200 dark:border-slate-700" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpTooltip;
