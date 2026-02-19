import { Metadata } from "next";
import KeyboardShortcutsContent from "./keyboard-shortcuts-content";

export const metadata: Metadata = {
  title: "Keyboard Shortcuts - Align Academy",
  description: "Master keyboard shortcuts to navigate Align Academy faster",
};

export default function KeyboardShortcutsPage() {
  return <KeyboardShortcutsContent />;
}
