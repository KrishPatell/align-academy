"use client";

import { cn } from "@/lib/utils";

// Base skeleton component
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer",
        "before:bg-gradient-to-r before:from-transparent before:via-slate-300/60 dark:before:via-slate-600/60 before:to-transparent",
        className
      )}
      {...props}
    />
  );
}

// Card skeleton
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6", className)}>
      <Skeleton className="h-6 w-1/3 mb-4" />
      <Skeleton className="h-8 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}

// Table row skeleton
function SkeletonTableRow({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-slate-200 dark:border-slate-800">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

// Table skeleton
function SkeletonTable({ 
  columns = 5, 
  rows = 5,
  className 
}: { 
  columns?: number; 
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden", className)}>
      <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-800/50">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="p-4 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonTableRow key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// List skeleton for clients/agents
function SkeletonListItem({ 
  avatar = true,
  title = true,
  subtitle = true,
  badge = false,
  action = false 
}: { 
  avatar?: boolean;
  title?: boolean;
  subtitle?: boolean;
  badge?: boolean;
  action?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-800">
      {avatar && <Skeleton className="h-10 w-10 rounded-full" />}
      <div className="flex-1 space-y-2">
        {title && <Skeleton className="h-4 w-1/3" />}
        {subtitle && <Skeleton className="h-3 w-1/2" />}
      </div>
      {badge && <Skeleton className="h-6 w-16 rounded-full" />}
      {action && <Skeleton className="h-8 w-8 rounded-md" />}
    </div>
  );
}

// Page skeleton with header
function SkeletonPage({ 
  title = true,
  description = true,
  cards = 4,
  table = false,
  tableRows = 5,
  className 
}: { 
  title?: boolean;
  description?: boolean;
  cards?: number;
  table?: boolean;
  tableRows?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-6 p-6", className)}>
      {/* Header */}
      {(title || description) && (
        <div className="space-y-2">
          {title && <Skeleton className="h-7 w-48" />}
          {description && <Skeleton className="h-4 w-72" />}
        </div>
      )}

      {/* Cards Grid */}
      {cards > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: cards }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Table */}
      {table && <SkeletonTable rows={tableRows} />}
    </div>
  );
}

// Stats/Metric skeleton
function SkeletonStat({ 
  label = true,
  value = true,
  change = true 
}: { 
  label?: boolean;
  value?: boolean;
  change?: boolean;
}) {
  return (
    <div className="space-y-2">
      {label && <Skeleton className="h-3 w-16" />}
      {value && <Skeleton className="h-8 w-24" />}
      {change && <Skeleton className="h-3 w-12" />}
    </div>
  );
}

// Sidebar skeleton (for loading state)
function SkeletonSidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-[#1a1a1a] border-r border-slate-200 dark:border-slate-800 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
      <div className="flex-1 p-4 space-y-6">
        {[1, 2, 3].map((section) => (
          <div key={section} className="space-y-2">
            <Skeleton className="h-3 w-24" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded-lg" />
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

// Header skeleton
function SkeletonHeader() {
  return (
    <header className="h-16 bg-white dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-slate-800 px-6 sticky top-0 z-20 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-9 w-48 rounded-lg" />
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>
    </header>
  );
}

export {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
  SkeletonTableRow,
  SkeletonListItem,
  SkeletonPage,
  SkeletonStat,
  SkeletonSidebar,
  SkeletonHeader,
};
