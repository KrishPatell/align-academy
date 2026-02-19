"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Search, Plus, MoreHorizontal, Check, Zap, Slack, Mail, MessageSquare, 
  CreditCard, Globe, Twitter, Github, Youtube, MoreVertical, Headphones, 
  Palette, Megaphone, Code, Video, Settings, RefreshCw, Shield, Bell
} from "lucide-react";

interface Integration {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  connected: boolean;
  category: string;
  participants: number;
  quote: string;
  date: string;
  config?: {
    webhookUrl?: string;
    apiKey?: string;
    notifications?: boolean;
    autoSync?: boolean;
  };
}

const integrationIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Slack, Mail, Headphones, Palette, Github, Twitter, CreditCard, Youtube, MessageSquare, Globe, Zap, Megaphone, Code, Video
};

const initialIntegrations: Integration[] = [
  { 
    id: 1, 
    name: "Slack Bot", 
    description: "Automate support responses and notifications",
    icon: Slack, 
    connected: true, 
    category: "Communication",
    participants: 5,
    quote: "Streamlined our entire workflow!",
    date: "15.02.26",
    config: { webhookUrl: "https://hooks.slack.com/xxx", notifications: true, autoSync: true }
  },
  { 
    id: 2, 
    name: "Premium Support", 
    description: "Priority customer support integration",
    icon: Headphones, 
    connected: true, 
    category: "Support",
    participants: 3,
    quote: "Customers love the quick response time",
    date: "22.11.25",
    config: { notifications: true }
  },
  { 
    id: 3, 
    name: "Design Tools", 
    description: "Figma integration for design handoff",
    icon: Palette, 
    connected: false, 
    category: "Design",
    participants: 4,
    quote: "Design to development, seamless",
    date: "06.03.26"
  },
  { 
    id: 4, 
    name: "Marketing Sync", 
    description: "Email marketing automation",
    icon: Mail, 
    connected: true, 
    category: "Marketing",
    participants: 6,
    quote: "Our campaigns are now fully automated",
    date: "14.03.26",
    config: { apiKey: "mk_live_xxx", autoSync: true }
  },
  { 
    id: 5, 
    name: "Developer Hub", 
    description: "GitHub integration for issue tracking",
    icon: Github, 
    connected: true, 
    category: "Developer",
    participants: 4,
    quote: "Bugs get fixed faster than ever",
    date: "16.01.26",
    config: { webhookUrl: "https://api.github.com/xxx", notifications: true }
  },
  { 
    id: 6, 
    name: "Social Media", 
    description: "Cross-platform social management",
    icon: Twitter, 
    connected: false, 
    category: "Marketing",
    participants: 4,
    quote: "One dashboard for all socials",
    date: "28.02.26"
  },
  { 
    id: 7, 
    name: "Payment Pro", 
    description: "Stripe & PayPal unified payments",
    icon: CreditCard, 
    connected: true, 
    category: "Payments",
    participants: 2,
    quote: "Payment issues are a thing of the past",
    date: "10.02.26",
    config: { apiKey: "sk_live_xxx", autoSync: true }
  },
  { 
    id: 8, 
    name: "Media Hub", 
    description: "YouTube and video content management",
    icon: Youtube, 
    connected: false, 
    category: "Media",
    participants: 3,
    quote: "Video content made easy",
    date: "05.03.26"
  },
];

const categories = ["All", "Communication", "Support", "Marketing", "Developer", "Payments", "Design", "Media"];

export default function IntegrationsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [tempConfig, setTempConfig] = useState<Integration["config"]>({});

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filtered = integrations.filter(i => {
    const matchesCategory = activeCategory === "All" || i.category === activeCategory;
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         i.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleConnection = (id: number) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected }
        : integration
    ));
  };

  const openConfigModal = (integration: Integration) => {
    setSelectedIntegration(integration);
    setTempConfig(integration.config || {});
    setConfigModalOpen(true);
  };

  const saveConfig = () => {
    if (!selectedIntegration) return;
    setIntegrations(prev => prev.map(integration => 
      integration.id === selectedIntegration.id 
        ? { ...integration, config: tempConfig }
        : integration
    ));
    setConfigModalOpen(false);
    setSelectedIntegration(null);
  };

  const getIconComponent = (iconName: string) => {
    return integrationIcons[iconName] || Zap;
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Settings / Integrations</div>
            <h1 className="text-2xl font-bold">Integrations</h1>
            <p className="text-slate-500 text-sm">Connect your favorite tools and services</p>
          </div>
          <Button className="bg-black hover:bg-black/90 text-white gap-2">
            <Plus className="h-4 w-4" /> Add New
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search integrations..." 
              className="pl-10 border-slate-200 dark:border-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? "bg-black hover:bg-black/90" : "border-slate-200 dark:border-slate-700"}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Total Integrations</p>
              <p className="text-2xl font-bold">{integrations.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Connected</p>
              <p className="text-2xl font-bold text-green-600">{integrations.filter(i => i.connected).length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Available</p>
              <p className="text-2xl font-bold">{integrations.filter(i => !i.connected).length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Categories</p>
              <p className="text-2xl font-bold">{categories.length - 1}</p>
            </CardContent>
          </Card>
        </div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((integration) => (
            <Card 
              key={integration.id} 
              className={`bg-white dark:bg-[#1a1a1a] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden ${
                integration.connected ? 'ring-2 ring-green-200 dark:ring-green-800' : ''
              }`}
            >
              <CardContent className="p-0">
                {/* Card Header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        integration.connected 
                          ? "bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25" 
                          : "bg-slate-100 dark:bg-slate-800 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30"
                      }`}>
                        <integration.icon className={`h-6 w-6 transition-colors ${integration.connected ? "text-white" : "text-slate-500 group-hover:text-purple-600"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">{integration.name}</h3>
                        <p className="text-sm text-slate-500">{integration.description}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                        onClick={() => openConfigModal(integration)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="px-5 pb-3">
                  <blockquote className="text-sm text-slate-600 dark:text-slate-400 italic border-l-2 border-purple-500 pl-3">
                    "{integration.quote}"
                  </blockquote>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Participants */}
                    <div className="flex items-center gap-1">
                      <div className="flex -space-x-2">
                        {Array(Math.min(integration.participants, 3)).fill(0).map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border-2 border-white dark:border-slate-100" />
                        ))}
                        {integration.participants > 3 && (
                          <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white dark:border-slate-100 flex items-center justify-center text-xs font-medium">
                            +{integration.participants - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 ml-2">{integration.participants}</span>
                    </div>
                    {/* Date */}
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span>{integration.date}</span>
                    </div>
                  </div>
                  {/* Status / Connect Button */}
                  {integration.connected ? (
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                        onClick={() => openConfigModal(integration)}
                      >
                        <Settings className="h-3 w-3 mr-1" /> Configure
                      </Button>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 cursor-pointer" onClick={() => toggleConnection(integration.id)}>
                        <Check className="h-3 w-3" /> Connected
                      </Badge>
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      className="bg-black hover:bg-black/90 text-white transition-all duration-200 hover:shadow-lg hover:scale-105"
                      onClick={() => toggleConnection(integration.id)}
                    >
                      Connect
                    </Button>
                  )}
                </div>

                {/* Connected indicator bar */}
                {integration.connected && (
                  <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No integrations found matching your criteria.</p>
          </div>
        )}

        {/* Configuration Modal */}
        <Dialog open={configModalOpen} onOpenChange={setConfigModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedIntegration && (
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedIntegration.connected 
                      ? "bg-gradient-to-br from-purple-500 to-blue-500" 
                      : "bg-slate-100 dark:bg-slate-800"
                  }`}>
                    <selectedIntegration.icon className={`h-4 w-4 ${selectedIntegration.connected ? "text-white" : "text-slate-500"}`} />
                  </div>
                )}
                Configure Integration
              </DialogTitle>
              <DialogDescription>
                Customize settings for {selectedIntegration?.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              {/* Webhook URL */}
              <div className="grid gap-2">
                <Label htmlFor="webhook" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" /> Webhook URL
                </Label>
                <Input
                  id="webhook"
                  placeholder="https://your-webhook-url.com"
                  value={tempConfig?.webhookUrl || ""}
                  onChange={(e) => setTempConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
                  className="col-span-3"
                />
              </div>

              {/* API Key */}
              <div className="grid gap-2">
                <Label htmlFor="apikey" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> API Key
                </Label>
                <Input
                  id="apikey"
                  type="password"
                  placeholder="Enter your API key"
                  value={tempConfig?.apiKey || ""}
                  onChange={(e) => setTempConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="col-span-3"
                />
              </div>

              {/* Notifications Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-slate-500" />
                  <Label htmlFor="notifications" className="cursor-pointer">
                    Enable Notifications
                  </Label>
                </div>
                <Switch
                  id="notifications"
                  checked={tempConfig?.notifications || false}
                  onCheckedChange={(checked) => setTempConfig(prev => ({ ...prev, notifications: checked }))}
                />
              </div>

              {/* Auto Sync Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-slate-500" />
                  <Label htmlFor="autosync" className="cursor-pointer">
                    Auto Sync
                  </Label>
                </div>
                <Switch
                  id="autosync"
                  checked={tempConfig?.autoSync || false}
                  onCheckedChange={(checked) => setTempConfig(prev => ({ ...prev, autoSync: checked }))}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setConfigModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={saveConfig}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
