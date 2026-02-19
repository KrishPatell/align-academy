"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Zap, Slack, Mail, MessageSquare, CreditCard, Globe, Check } from "lucide-react";

const integrations = [
  { id: 1, name: "Slack", description: "Team communication", icon: Slack, connected: true, category: "Communication" },
  { id: 2, name: "Gmail", description: "Email integration", icon: Mail, connected: true, category: "Communication" },
  { id: 3, name: "Twilio", description: "SMS notifications", icon: MessageSquare, connected: false, category: "Communication" },
  { id: 4, name: "Stripe", description: "Payment processing", icon: CreditCard, connected: true, category: "Payments" },
  { id: 5, name: "PayPal", description: "Payment processing", icon: CreditCard, connected: false, category: "Payments" },
  { id: 6, name: "Zapier", description: "Workflow automation", icon: Zap, connected: false, category: "Automation" },
  { id: 7, name: "Custom Webhook", description: "Send data to any endpoint", icon: Globe, connected: false, category: "Developer" },
];

const categories = ["All", "Communication", "Payments", "Automation", "Developer"];

export default function IntegrationsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filtered = activeCategory === "All" 
    ? integrations 
    : integrations.filter(i => i.category === activeCategory);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Settings / Integrations</div>
            <h1 className="text-2xl font-bold">Integrations</h1>
            <p className="text-slate-500 text-sm">Connect your favorite tools</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" /> Browse Integrations
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((integration) => (
            <Card key={integration.id} className="bg-white dark:bg-[#1a1a1a]">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${integration.connected ? "bg-purple-50 dark:bg-purple-900/20" : "bg-slate-100 dark:bg-slate-800"}`}>
                      <integration.icon className={`h-6 w-6 ${integration.connected ? "text-purple-600" : "text-slate-500"}`} />
                    </div>
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-sm text-slate-500">{integration.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {integration.connected ? (
                    <>
                      <Badge className="bg-green-500">Connected</Badge>
                      <Button variant="outline" size="sm">Configure</Button>
                    </>
                  ) : (
                    <>
                      <Badge variant="secondary">Not connected</Badge>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Connect</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
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
      </div>
    </DashboardLayout>
  );
}
