import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { NotificationProvider } from "@/components/notifications";
import { PreferencesProvider } from "@/lib/preferences-context";
import { SkipLink } from "@/components/skip-link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Align Academy - Revenue Analytics",
  description: "Revenue analytics dashboard for Align Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SkipLink />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <NotificationProvider>
              <PreferencesProvider>
                {children}
              </PreferencesProvider>
            </NotificationProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
