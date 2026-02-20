"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

export function SkipLink() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show skip link when user presses Tab (but not Shift+Tab)
      if (e.key === "Tab" && !e.shiftKey) {
        setIsVisible(true);
      }
    };

    const handleClick = () => {
      // Hide after clicking
      setIsVisible(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleClick = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
    setIsVisible(false);
  };

  return (
    <>
      {/* Skip Link - Visible on focus or when triggered */}
      <a
        href="#main-content"
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          fixed top-4 left-4 z-[100] 
          flex items-center gap-2 
          px-4 py-2 
          bg-slate-600 text-white 
          font-medium text-sm 
          rounded-lg 
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
          ${isFocused ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
          ${isVisible || isFocused ? "opacity-100 translate-y-0" : ""}
          hover:bg-slate-700
          shadow-lg shadow-slate-600/30
        `}
        aria-label="Skip to main content"
      >
        <span>Skip to main content</span>
        <ChevronRight className="h-4 w-4" />
      </a>
      
      {/* Live region for screen reader announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="a11y-announcer"
      />
    </>
  );
}

// Hook for announcing messages to screen readers
export function useA11yAnnounce(message: string, priority: "polite" | "assertive" = "polite") {
  useEffect(() => {
    const announcer = document.getElementById("a11y-announcer");
    if (announcer) {
      announcer.setAttribute("aria-live", priority);
      announcer.textContent = message;
      
      // Clear after announcement
      const timer = setTimeout(() => {
        announcer.textContent = "";
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [message, priority]);
}

// Keyboard navigation hook with roving tabindex
export function useRovingTabIndex(itemCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        newIndex = (currentIndex + 1) % itemCount;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        newIndex = (currentIndex - 1 + itemCount) % itemCount;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = itemCount - 1;
        break;
      default:
        return;
    }

    setActiveIndex(newIndex);
  };

  return { activeIndex, setActiveIndex, handleKeyDown };
}
