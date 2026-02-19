import { Metadata } from "next";
import DashboardLayout from "@/components/dashboard-layout";

export const metadata: Metadata = {
  title: "Keyboard Shortcuts - Align Academy",
  description: "Master keyboard shortcuts to navigate Align Academy faster",
};

export default function KeyboardShortcutsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Keyboard Shortcuts</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Press <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">?</kbd> anywhere to see keyboard shortcuts.
        </p>
      </div>
    </DashboardLayout>
  );
}
