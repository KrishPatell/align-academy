"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Bell,
  Palette,
  Shield,
  Globe,
  Mail,
  Moon,
  Sun,
  Camera,
  CreditCard,
  Crown,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from "lucide-react";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [profileImage, setProfileImage] = useState("/api/placeholder/120/120");
  
  // Notification states
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [smsNotif, setSmsNotif] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);
  
  // Security states
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Billing states
  const [currentPlan] = useState("pro");
  
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <TabsTrigger value="profile" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:dark:bg-slate-700 data-[state=active]:shadow-sm">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:dark:bg-slate-700 data-[state=active]:shadow-sm">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:dark:bg-slate-700 data-[state=active]:shadow-sm">
              <Shield className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:dark:bg-slate-700 data-[state=active]:shadow-sm">
              <CreditCard className="h-4 w-4" /> Billing
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:dark:bg-slate-700 data-[state=active]:shadow-sm">
              <Palette className="h-4 w-4" /> Appearance
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-slate-600" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and profile picture</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-8">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 ring-4 ring-slate-200 dark:ring-slate-800">
                      <AvatarImage src={profileImage} alt="Profile" />
                      <AvatarFallback className="bg-slate-100 text-slate-600 text-2xl font-semibold">KW</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 bg-slate-600 text-white p-2 rounded-full hover:bg-slate-700 transition-colors shadow-lg">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Profile Photo</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">JPG, GIF or PNG. Max size of 800K</p>
                    <Button variant="outline" size="sm" className="mt-3">Upload New</Button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-300">First Name</Label>
                    <Input id="firstName" defaultValue="Krish" className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-300">Last Name</Label>
                    <Input id="lastName" defaultValue="Walker" className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
                    <Input id="email" type="email" defaultValue="krish@alignacademy.com" className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-slate-700 dark:text-slate-300">Timezone</Label>
                    <Select defaultValue="asia-kolkata">
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
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
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Button className="bg-slate-600 hover:bg-slate-700 text-white px-6">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-5 w-5 text-amber-500" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to receive updates and alerts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Email Notifications</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Receive updates and reports via email</p>
                    </div>
                  </div>
                  <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800/30 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Push Notifications</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Receive real-time browser notifications</p>
                    </div>
                  </div>
                  <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Bell className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">SMS Notifications</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Get important alerts via text message</p>
                    </div>
                  </div>
                  <Switch checked={smsNotif} onCheckedChange={setSmsNotif} />
                </div>

                {/* Weekly Summary */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Weekly Summary</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Receive weekly performance digest</p>
                    </div>
                  </div>
                  <Switch checked={weeklySummary} onCheckedChange={setWeeklySummary} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security and authentication</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Change Password */}
                <div className="flex items-center justify-between p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Change Password</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Update your password regularly for security</p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    Change <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${twoFactorEnabled ? 'bg-green-100 dark:bg-green-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                      <Shield className={`h-6 w-6 ${twoFactorEnabled ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {twoFactorEnabled ? (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Enabled
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-600 gap-1">
                        <AlertCircle className="h-3 w-3" /> Not Enabled
                      </Badge>
                    )}
                    <Button 
                      variant={twoFactorEnabled ? "outline" : "default"}
                      className={twoFactorEnabled ? "" : "bg-slate-600 hover:bg-slate-700"}
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    >
                      {twoFactorEnabled ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">Active Sessions</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Manage devices logged into your account</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  <div className="ml-16 mt-4 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">MacBook Air - Chrome</p>
                          <p className="text-xs text-slate-500">Mumbai, India • Current session</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            {/* Current Plan */}
            <Card className="bg-gradient-to-r from-slate-600 to-slate-600 text-white border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-5 w-5 text-yellow-300" />
                      <span className="text-slate-200 font-medium">Current Plan</span>
                    </div>
                    <h2 className="text-3xl font-bold">Pro Plan</h2>
                    <p className="text-slate-200 mt-1">$29/month • Billed monthly</p>
                    <div className="flex items-center gap-2 mt-4">
                      <CheckCircle2 className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Next billing date: March 19, 2026</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="bg-white text-slate-600 hover:bg-slate-50 font-medium">
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Plan Features */}
            <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Plan Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Team Members", value: "5/10" },
                    { label: "Storage", value: "25 GB" },
                    { label: "API Calls", value: "10,000/mo" },
                  ].map((feature, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                      <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">{feature.value}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{feature.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-slate-600" />
                  Payment Method
                </CardTitle>
                <CardDescription>Manage your billing information</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">•••• •••• •••• 4242</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Expires 12/2027</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Default</Badge>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="gap-2">
                    <CreditCard className="h-4 w-4" /> Update Card
                  </Button>
                  <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    Remove
                  </Button>
                </div>

                {/* Billing Address */}
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-4">Billing Address</h4>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-slate-700 dark:text-slate-300">Krish Walker</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">123 Main Street</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Mumbai, Maharashtra 400001</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">India</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">Edit Address</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Palette className="h-5 w-5 text-pink-500" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize how the dashboard looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Theme */}
                <div className="space-y-4">
                  <Label className="text-slate-700 dark:text-slate-300 text-base">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-800 flex flex-col items-center gap-2">
                      <Sun className="h-6 w-6 text-amber-500" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    <button className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 flex flex-col items-center gap-2 hover:border-slate-300 dark:hover:border-slate-600">
                      <Moon className="h-6 w-6 text-slate-500" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                    <button className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 flex flex-col items-center gap-2 hover:border-slate-300 dark:hover:border-slate-600">
                      <div className="h-6 w-6 flex">
                        <div className="w-3 h-6 bg-slate-900 rounded-l" />
                        <div className="w-3 h-6 bg-slate-100 rounded-r" />
                      </div>
                      <span className="text-sm font-medium">System</span>
                    </button>
                  </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Label className="text-slate-700 dark:text-slate-300 text-base">Accent Color</Label>
                  <div className="flex gap-3">
                    {['bg-slate-600', 'bg-blue-600', 'bg-slate-600', 'bg-pink-600', 'bg-emerald-600', 'bg-orange-600'].map((color, idx) => (
                      <button 
                        key={idx} 
                        className={`w-10 h-10 rounded-full ${color} ${idx === 0 ? 'ring-2 ring-offset-2 ring-slate-400' : ''} hover:scale-110 transition-transform`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
