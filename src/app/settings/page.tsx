"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  User,
  Bell,
  Palette,
  Shield,
  Globe,
  Mail,
  Moon,
  Sun,
  Home,
  BarChart3,
  Users,
  FileText,
  RefreshCcw,
  DollarSign,
  UserCheck,
  Target,
  FlaskConical,
  MapPin,
  Plug,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BarChart3, label: "Revenue Analytics", href: "/" },
  { icon: Users, label: "Subscriptions", href: "#" },
  { icon: UserCheck, label: "Customers", href: "#" },
  { icon: FileText, label: "Invoices", href: "#" },
  { icon: RefreshCcw, label: "Refunds", href: "#" },
  { icon: DollarSign, label: "Payouts", href: "#" },
];

const growthItems = [
  { icon: Target, label: "Campaigns", href: "#" },
  { icon: FlaskConical, label: "Experiments", href: "#" },
];

const opsItems = [
  { icon: BarChart3, label: "Forecasting", href: "#" },
  { icon: MapPin, label: "Data Sources", href: "#" },
  { icon: Plug, label: "Integrations", href: "#" },
  { icon: Settings, label: "Settings", href: "/settings", active: true },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#121212] transition-colors">
      {/* Mobile Menu Button */}
      <button className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-[#1a1a1a] shadow-md">
        <Settings className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <aside className="fixed lg:static z-40 w-64 bg-white dark:bg-[#1a1a1a] border-r border-slate-200 dark:border-slate-800 h-full overflow-y-auto">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-purple-600" />
            <span className="font-semibold text-lg">Align Academy</span>
          </div>
        </div>

        <nav className="p-4 space-y-6">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-2">
              Main
            </p>
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-2">
              Growth
            </p>
            <ul className="space-y-1">
              {growthItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-2">
              Operations
            </p>
            <ul className="space-y-1">
              {opsItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center gap-4 lg:pl-0 pl-12">
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-4xl">
          {/* Profile Settings */}
          <Card className="mb-6 bg-white dark:bg-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Krish Patel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="krish@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="asia-kolkata">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia-kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                    <SelectItem value="us-eastern">US/Eastern (GMT-5)</SelectItem>
                    <SelectItem value="us-pacific">US/Pacific (GMT-8)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="mb-6 bg-white dark:bg-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize how the dashboard looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Theme</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Select your preferred color scheme</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className={theme === "light" ? "bg-purple-600" : ""}
                  >
                    <Sun className="h-4 w-4 mr-1" /> Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className={theme === "dark" ? "bg-purple-600" : ""}
                  >
                    <Moon className="h-4 w-4 mr-1" /> Dark
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="mb-6 bg-white dark:bg-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Receive daily reports via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Browser push notifications</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Summary</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Receive weekly performance summary</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="mb-6 bg-white dark:bg-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Auto-logout after inactivity</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* API & Integrations */}
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plug className="h-5 w-5" />
                API & Integrations
              </CardTitle>
              <CardDescription>Manage external connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-slate-500" />
                  <div>
                    <Label>Stripe</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Payment processing</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <div>
                    <Label>SendGrid</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Email delivery</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-slate-500" />
                  <div>
                    <Label>Slack</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Team notifications</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">Connect</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
