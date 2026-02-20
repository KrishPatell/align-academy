"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";

interface RecentItem {
  href: string;
  label: string;
  timestamp: number;
}

interface FavoriteItem {
  href: string;
  label: string;
}

interface UserPreferences {
  recentItems: RecentItem[];
  favorites: FavoriteItem[];
  quickLinks: FavoriteItem[];
}

interface UserPreferencesContextType {
  recentItems: RecentItem[];
  favorites: FavoriteItem[];
  quickLinks: FavoriteItem[];
  addRecentItem: (href: string, label: string) => void;
  toggleFavorite: (href: string, label: string) => void;
  addQuickLink: (href: string, label: string) => void;
  removeQuickLink: (href: string) => void;
  isFavorite: (href: string) => boolean;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

const MAX_RECENT_ITEMS = 8;
const MAX_QUICK_LINKS = 6;

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [quickLinks, setQuickLinks] = useState<FavoriteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const stored = localStorage.getItem("align-academy-preferences");
      if (stored) {
        const parsed: UserPreferences = JSON.parse(stored);
        setRecentItems(parsed.recentItems || []);
        setFavorites(parsed.favorites || []);
        setQuickLinks(parsed.quickLinks || []);
      } else {
        // Default quick links for new users
        setQuickLinks([
          { href: "/clients", label: "Clients" },
          { href: "/agents", label: "Agents & Teams" },
          { href: "/analytics", label: "Analytics" },
        ]);
      }
    } catch (e) {
      console.error("Failed to load preferences:", e);
    }
    setLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!loaded) return;
    
    const preferences: UserPreferences = {
      recentItems,
      favorites,
      quickLinks,
    };
    localStorage.setItem("align-academy-preferences", JSON.stringify(preferences));
  }, [recentItems, favorites, quickLinks, loaded]);

  const addRecentItem = useCallback((href: string, label: string) => {
    setRecentItems(prev => {
      const filtered = prev.filter(item => item.href !== href);
      const newItem: RecentItem = { href, label, timestamp: Date.now() };
      const updated = [newItem, ...filtered].slice(0, MAX_RECENT_ITEMS);
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((href: string, label: string) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.href === href);
      if (exists) {
        return prev.filter(f => f.href !== href);
      } else {
        return [...prev, { href, label }];
      }
    });
  }, []);

  const addQuickLink = useCallback((href: string, label: string) => {
    setQuickLinks(prev => {
      if (prev.length >= MAX_QUICK_LINKS || prev.some(q => q.href === href)) {
        return prev;
      }
      return [...prev, { href, label }];
    });
  }, []);

  const removeQuickLink = useCallback((href: string) => {
    setQuickLinks(prev => prev.filter(q => q.href !== href));
  }, []);

  const isFavorite = useCallback((href: string) => {
    return favorites.some(f => f.href === href);
  }, [favorites]);

  return (
    <UserPreferencesContext.Provider
      value={{
        recentItems,
        favorites,
        quickLinks,
        addRecentItem,
        toggleFavorite,
        addQuickLink,
        removeQuickLink,
        isFavorite,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
  }
  return context;
}
