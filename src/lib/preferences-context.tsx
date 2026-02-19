"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type TableDensity = "compact" | "comfortable" | "spacious";

export interface UserPreferences {
  tableDensity: TableDensity;
  autoRefresh: boolean;
  autoRefreshInterval: number; // in seconds
  rememberView: boolean;
}

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  isLoaded: boolean;
}

const defaultPreferences: UserPreferences = {
  tableDensity: "comfortable",
  autoRefresh: false,
  autoRefreshInterval: 60,
  rememberView: true,
};

const STORAGE_KEY = "align-academy-preferences";

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...defaultPreferences, ...parsed });
      }
    } catch (e) {
      console.error("Failed to load preferences:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save preferences to localStorage whenever they change
  const updatePreference = useCallback(<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
      } catch (e) {
        console.error("Failed to save preferences:", e);
      }
      return newPrefs;
    });
  }, []);

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreference, isLoaded }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}

// Hook for table view persistence (Remember View functionality)
export function useTableViewState(tableId: string) {
  const { preferences } = usePreferences();
  const [viewState, setViewState] = useState<{
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filters?: Record<string, string>;
    page?: number;
    pageSize?: number;
  }>({});

  useEffect(() => {
    if (!preferences.rememberView) return;
    
    try {
      const stored = localStorage.getItem(`table-view-${tableId}`);
      if (stored) {
        setViewState(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load table view state:", e);
    }
  }, [tableId, preferences.rememberView]);

  const saveViewState = useCallback((state: typeof viewState) => {
    if (!preferences.rememberView) return;
    
    setViewState(state);
    try {
      localStorage.setItem(`table-view-${tableId}`, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save table view state:", e);
    }
  }, [tableId, preferences.rememberView]);

  const clearViewState = useCallback(() => {
    setViewState({});
    try {
      localStorage.removeItem(`table-view-${tableId}`);
    } catch (e) {
      console.error("Failed to clear table view state:", e);
    }
  }, [tableId]);

  return { viewState, saveViewState, clearViewState };
}

// Hook for auto-refresh functionality
export function useAutoRefresh(callback: () => void, enabled: boolean, intervalSeconds: number) {
  const { preferences } = usePreferences();
  
  useEffect(() => {
    if (!enabled || !preferences.autoRefresh) return;

    const interval = setInterval(callback, preferences.autoRefreshInterval * 1000);
    return () => clearInterval(interval);
  }, [callback, enabled, preferences.autoRefresh, preferences.autoRefreshInterval]);
}

// Get table density class names
export function getTableDensityClasses(density: TableDensity): string {
  switch (density) {
    case "compact":
      return "py-1 px-2 text-xs";
    case "comfortable":
      return "py-2 px-4 text-sm";
    case "spacious":
      return "py-4 px-6 text-base";
    default:
      return "py-2 px-4 text-sm";
  }
}
