"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "default" | "primary" | "secondary" | "muted";
  label?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const variantClasses = {
  default: "text-slate-500 dark:text-slate-400",
  primary: "text-slate-600 dark:text-slate-400",
  secondary: "text-blue-600 dark:text-blue-400",
  muted: "text-slate-400 dark:text-slate-600",
};

export function Spinner({ size = "md", className, variant = "default", label }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Loader2 className={cn("animate-spin", sizeClasses[size], variantClasses[variant])} />
      {label && (
        <span className={cn("text-sm", variantClasses[variant])}>{label}</span>
      )}
    </div>
  );
}

// Full page loading spinner
export function PageLoader({ 
  message = "Loading...",
  className 
}: { 
  message?: string;
  className?: string;
}) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[400px] p-8",
      className
    )}>
      <Spinner size="xl" variant="primary" />
      {message && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}

// Inline loading spinner for buttons
interface ButtonSpinnerProps {
  className?: string;
}

export function ButtonSpinner({ className }: ButtonSpinnerProps) {
  return (
    <Loader2 className={cn("h-4 w-4 animate-spin mr-2", className)} />
  );
}

// Table loading overlay
export function TableLoader({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full">
      {Array.from({ length: rows }).map((_, i) => (
        <div 
          key={i} 
          className="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-800 animate-pulse"
        >
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// Card loading skeleton
export function CardLoader({ className }: { className?: string }) {
  return (
    <div className={cn(
      "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6",
      className
    )}>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default Spinner;
