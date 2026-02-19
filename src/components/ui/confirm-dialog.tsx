"use client"

import * as React from "react"
import { AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
  loading?: boolean
}

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  loading = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          
          {/* Dialog */}
          <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 fade-in duration-200">
            {/* Header */}
            <div className="flex items-start gap-4 p-6">
              <div className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                variant === "destructive" 
                  ? "bg-red-100 dark:bg-red-900/30" 
                  : "bg-purple-100 dark:bg-purple-900/30"
              )}>
                <AlertTriangle className={cn(
                  "h-6 w-6",
                  variant === "destructive" 
                    ? "text-red-600 dark:text-red-400" 
                    : "text-purple-600 dark:text-purple-400"
                )} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {description}
                </p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 px-6 pb-6">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                {cancelText}
              </Button>
              <Button
                variant={variant === "destructive" ? "destructive" : "default"}
                onClick={handleConfirm}
                disabled={loading}
                className={cn(
                  variant !== "destructive" && "bg-purple-600 hover:bg-purple-700"
                )}
              >
                {loading ? "Processing..." : confirmText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
