"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MoreHorizontal, Check, Zap, Slack, Mail, MessageSquare, CreditCard, Globe, Twitter, Instagram, Github, Figma, Spotify, Youtube, MoreVertical } from "lucide-react";

const integrations = [
  { 
    id: 1, 
    name: "Slack Bot", 
    description: "Automate support responses and notifications",
    icon: Slack, 
    connected: true, 
    category: "Communication",
    participants: 5,
    quote: "Streamlined our entire workflow!",
    date: "15.02.26"
  },
  { 
    id: 2, 
    name: "Premium Support", 
    description: "Priority customer support integration",
    icon: Spotify, 
    connected: true, 
    category: "Support",
    participants: 3,
    quote: "Customers love the quick response time",
    date: "22.11.25"
  },
  { 
    id: 3, 
    name: "Design Tools", 
    description: "Figma integration for design handoff",
    icon: Figma, 
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
    date: "14.03.26"
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
    date: "16.01.26"
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
    date: "10.02.26"
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

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filtered = integrations.filter(i => {
    const matchesCategory = activeCategory === "All" || i.category === activeCategory;
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         i.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Total Integrations</p>
              <p className="text-2xl font-bold">{integrations.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Connected</p>
              <p className="text-2xl font-bold text-green-600">{integrations.filter(i => i.connected).length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Available</p>
              <p className="text-2xl font-bold">{integrations.filter(i => !i.connected).length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Categories</p>
              <p className="text-2xl font-bold">{categories.length - 1}</p>
            </CardContent>
          </Card>
        </div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((integration) => (
            <Card key={integration.id} className="bg-white dark:bg-[#1a1a1a] hover:shadow-lg transition-shadow group">
              <CardContent className="p-0">
                {/* Card Header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        integration.connected 
                          ? "bg-gradient-to-br from-purple-500 to-blue-500" 
                          : "bg-slate-100 dark:bg-slate-800"
                      }`}>
                        <integration.icon className={`h-6 w-6 ${integration.connected ? "text-white" : "text-slate-500"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{integration.name}</h3>
                        <p className="text-sm text-slate-500">{integration.description}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
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
                  {/* Status */}
                  {integration.connected ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
                      <Check className="h-3 w-3" /> Connected
                    </Badge>
                  ) : (
                    <Button size="sm" className="bg-black hover:bg-black/90 text-white">
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No integrations found matching your criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
