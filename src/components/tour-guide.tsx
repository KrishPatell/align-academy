"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Compass, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  Home,
  BarChart3,
  Users,
  Search,
  Zap,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TourStep {
  target: string;
  title: string;
  content: string;
  position: "top" | "bottom" | "left" | "right";
}

interface TourProps {
  steps: TourStep[];
  onComplete: () => void;
  onSkip: () => void;
}

const defaultSteps: TourStep[] = [
  {
    target: "[data-tour='sidebar']",
    title: "Navigation Sidebar",
    content: "Access all pages from here. Click on any item to navigate. Use the collapse button to save space.",
    position: "right",
  },
  {
    target: "[data-tour='search']",
    title: "Quick Search",
    content: "Press ⌘K anywhere to open the command palette. Search for pages, actions, and more!",
    position: "bottom",
  },
  {
    target: "[data-tour='theme']",
    title: "Theme Toggle",
    content: "Switch between light and dark mode. Your preference is saved automatically.",
    position: "bottom",
  },
  {
    target: "[data-tour='notifications']",
    title: "Notifications",
    content: "Stay updated with important alerts and notifications here.",
    position: "bottom",
  },
  {
    target: "[data-tour='whats-new']",
    title: "What's New",
    content: "Check here for the latest features and updates. We add new stuff regularly!",
    position: "bottom",
  },
  {
    target: "[data-tour='shortcuts']",
    title: "Keyboard Shortcuts",
    content: "Press ? to view all keyboard shortcuts. Navigate faster with keyboard commands!",
    position: "bottom",
  },
];

// Local storage key for tour completion
const TOUR_COMPLETED_KEY = "align-academy-tour-completed";
const TOUR_STEP_KEY = "align-academy-tour-step";

export function useTour() {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if this is first visit
    const tourCompleted = localStorage.getItem(TOUR_COMPLETED_KEY);
    if (!tourCompleted) {
      // Auto-start tour after a short delay
      const timer = setTimeout(() => {
        setIsTourOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Listen for custom event to start tour
    const handleStartTour = () => {
      const tourCompleted = localStorage.getItem(TOUR_COMPLETED_KEY);
      if (!tourCompleted) {
        setIsTourOpen(true);
        setCurrentStep(0);
      }
    };

    window.addEventListener("start-tour", handleStartTour);
    return () => window.removeEventListener("start-tour", handleStartTour);
  }, []);

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setIsTourOpen(true);
  }, []);

  const closeTour = useCallback(() => {
    setIsTourOpen(false);
  }, []);

  const completeTour = useCallback(() => {
    localStorage.setItem(TOUR_COMPLETED_KEY, "true");
    setIsTourOpen(false);
  }, []);

  const restartTour = useCallback(() => {
    localStorage.removeItem(TOUR_COMPLETED_KEY);
    localStorage.removeItem(TOUR_STEP_KEY);
    setCurrentStep(0);
    setIsTourOpen(true);
  }, []);

  return {
    isTourOpen,
    currentStep,
    setCurrentStep,
    startTour,
    closeTour,
    completeTour,
    restartTour,
    steps: defaultSteps,
  };
}

export function TourGuide({ 
  steps = defaultSteps,
  isOpen,
  currentStep,
  onStepChange,
  onComplete,
  onSkip 
}: {
  steps?: TourStep[];
  isOpen: boolean;
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onSkip: () => void;
}) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isOpen || !steps[currentStep]) return;

    const updatePosition = () => {
      const target = document.querySelector(steps[currentStep].target);
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetRect(rect);
        // Scroll element into view
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, currentStep, steps]);

  if (!isOpen || !steps[currentStep]) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Calculate tooltip position
  const getTooltipStyle = () => {
    if (!targetRect) return {};

    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const gap = 12;
    const padding = 20;

    let top = 0;
    let left = 0;

    switch (step.position) {
      case "top":
        top = targetRect.top - tooltipHeight - gap;
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
        break;
      case "bottom":
        top = targetRect.bottom + gap;
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
        break;
      case "left":
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
        left = targetRect.left - tooltipWidth - gap;
        break;
      case "right":
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
        left = targetRect.right + gap;
        break;
    }

    // Keep within viewport
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));

    return { top, left };
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      {/* Highlight effect */}
      {targetRect && (
        <div 
          className="absolute border-2 border-purple-500 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] z-30 transition-all duration-300"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
        />
      )}

      {/* Tooltip */}
      <div 
        className="fixed z-50 w-80 animate-in fade-in zoom-in-95 duration-200"
        style={getTooltipStyle()}
      >
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-purple-50 dark:bg-purple-900/20 border-b border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <button
              onClick={onSkip}
              className="p-1 hover:bg-purple-100 dark:hover:bg-purple-800 rounded transition-colors"
            >
              <X className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {step.content}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={onSkip}
              className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Skip tour
            </button>
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onStepChange(currentStep - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="sm"
                className={cn(
                  "gap-2",
                  isLastStep 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-purple-600 hover:bg-purple-700"
                )}
                onClick={() => {
                  if (isLastStep) {
                    onComplete();
                  } else {
                    onStepChange(currentStep + 1);
                  }
                }}
              >
                {isLastStep ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Finish
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 py-2">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onStepChange(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  idx === currentStep 
                    ? "w-6 bg-purple-600" 
                    : idx < currentStep 
                      ? "w-1.5 bg-purple-300 dark:bg-purple-700" 
                      : "w-1.5 bg-slate-300 dark:bg-slate-600"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TourGuide;
