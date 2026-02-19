"use client";

import * as React from "react";

export type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

export interface AutoSaveOptions<T> {
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Callback when data should be saved */
  onSave: (data: T) => Promise<void> | void;
  /** Callback when save succeeds */
  onSaved?: () => void;
  /** Callback when save fails */
  onError?: (error: Error) => void;
  /** Initial data (optional) */
  initialData?: T;
}

export interface UseAutoSaveReturn<T> {
  /** Current data being edited */
  data: T;
  /** Update data (triggers auto-save after debounce) */
  setData: React.Dispatch<React.SetStateAction<T>>;
  /** Manual save trigger */
  save: () => Promise<void>;
  /** Current save status */
  status: AutoSaveStatus;
  /** Last saved timestamp */
  lastSaved: Date | null;
  /** Error message if save failed */
  error: string | null;
  /** Whether there are unsaved changes */
  isDirty: boolean;
  /** Reset to last saved state */
  reset: () => void;
}

/**
 * Hook for implementing auto-save functionality with debouncing
 */
export function useAutoSave<T>(options: AutoSaveOptions<T>): UseAutoSaveReturn<T> {
  const {
    debounceMs = 1000,
    onSave,
    onSaved,
    onError,
    initialData,
  } = options;

  const [data, setData] = React.useState<T>(initialData as T);
  const [status, setStatus] = React.useState<AutoSaveStatus>("idle");
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isDirty, setIsDirty] = React.useState(false);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const lastSavedDataRef = React.useRef<T>(initialData as T);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const save = React.useCallback(async () => {
    if (!isDirty) return;

    setStatus("saving");
    setError(null);

    try {
      await onSave(data);
      setStatus("saved");
      setLastSaved(new Date());
      setIsDirty(false);
      lastSavedDataRef.current = data;
      onSaved?.();
      
      // Reset to idle after 2 seconds
      setTimeout(() => {
        setStatus((prev) => (prev === "saved" ? "idle" : prev));
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save";
      setStatus("error");
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  }, [data, isDirty, onSave, onSaved, onError]);

  const debouncedSave = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      save();
    }, debounceMs);
  }, [save, debounceMs]);

  const updateData = React.useCallback((updater: React.SetStateAction<T>) => {
    setData((prev) => {
      const newData = updater instanceof Function ? updater(prev) : updater;
      
      // Check if data actually changed
      if (JSON.stringify(newData) !== JSON.stringify(lastSavedDataRef.current)) {
        setIsDirty(true);
        debouncedSave();
      }
      
      return newData;
    });
  }, [debouncedSave]);

  const reset = React.useCallback(() => {
    setData(lastSavedDataRef.current);
    setIsDirty(false);
  }, []);

  return {
    data,
    setData: updateData,
    save,
    status,
    lastSaved,
    error,
    isDirty,
    reset,
  };
}

/**
 * Simplified hook for forms with basic auto-save
 */
export function useFormAutoSave<T extends Record<string, unknown>>(
  initialData: T,
  onSave: (data: T) => Promise<void> | void,
  debounceMs = 1000
) {
  const [formData, setFormData] = React.useState<T>(initialData);
  const [status, setStatus] = React.useState<AutoSaveStatus>("idle");
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const updateField = <K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        setStatus("saving");
        try {
          await onSave(newData);
          setStatus("saved");
          setLastSaved(new Date());
          setError(null);
          
          setTimeout(() => setStatus("idle"), 2000);
        } catch (err) {
          setStatus("error");
          setError(err instanceof Error ? err.message : "Save failed");
        }
      }, debounceMs);

      return newData;
    });
  };

  const saveNow = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setStatus("saving");
    try {
      await onSave(formData);
      setStatus("saved");
      setLastSaved(new Date());
      setError(null);
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return {
    formData,
    setFormData,
    updateField,
    saveNow,
    status,
    lastSaved,
    error,
  };
}
