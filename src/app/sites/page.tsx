"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Search, Plus, MapPin, Globe, Server, Activity, Clock, TrendingUp, 
  MoreHorizontal, Eye, Edit, Trash2, ChevronDown, ChevronUp, 
  Power, PowerOff, Database, Cpu, HardDrive, Network, Shield
} from "lucide-react";

const sitesData = {
  overview: {
    totalSites: 24,
    activeServers: 156,
    uptime: 99.97,
    locations: 12,
  },
  byLocation: [
    { country: "United States", flag: "🇺🇸", servers: 45, status: "healthy", usage: 78, trend: 5.2 },
    { country: "United Kingdom", flag: "🇬🇧", servers: 28, status: "healthy", usage: 65, trend: 7.8 },
    { country: "Germany", flag: "🇩🇪", servers: 22, status: "healthy", usage: 82, trend: 3.4 },
    { country: "Canada", flag: "🇨🇦", servers: 18, status: "warning", usage: 91, trend: -2.1 },
    { country: "Australia", flag: "🇦🇺", servers: 15, status: "healthy", usage: 55, trend: 1.2 },
    { country: "Japan", flag: "🇯🇵", servers: 12, status: "healthy", usage: 48, trend: 4.5 },
    { country: "France", flag: "🇫🇷", servers: 10, status: "critical", usage: 96, trend: -5.8 },
    { country: "Singapore", flag: "🇸🇬", servers: 6, status: "healthy", usage: 62, trend: 2.3 },
  ],
  servers: [
    { id: "srv-001", name: "US-East-Primary", location: "Virginia, US", status: "running", uptime: "99.99%", cpu: 45, memory: 62, disk: 38, network: 72, lastBackup: "2 hours ago", ip: "10.0.1.1", os: "Ubuntu 22.04", ram: "16 GB" },
    { id: "srv-002", name: "US-West-Backup", location: "California, US", status: "running", uptime: "99.95%", cpu: 38, memory: 51, disk: 45, network: 55, lastBackup: "4 hours ago", ip: "10.0.2.1", os: "Ubuntu 22.04", ram: "16 GB" },
    { id: "srv-003", name: "EU-Central", location: "Frankfurt, DE", status: "running", uptime: "99.98%", cpu: 72, memory: 68, disk: 52, network: 85, lastBackup: "1 hour ago", ip: "10.0.3.1", os: "Debian 12", ram: "32 GB" },
    { id: "srv-004", name: "UK-South", location: "London, UK", status: "running", uptime: "99.92%", cpu: 55, memory: 44, disk: 28, network: 62, lastBackup: "3 hours ago", ip: "10.0.4.1", os: "Ubuntu 22.04", ram: "16 GB" },
    { id: "srv-005", name: "AP-Southeast", location: "Singapore", status: "stopped", uptime: "99.87%", cpu: 0, memory: 0, disk: 28, network: 0, lastBackup: "1 day ago", ip: "10.0.5.1", os: "Ubuntu 22.04", ram: "16 GB" },
    { id: "srv-006", name: "AU-East", location: "Sydney, AU", status: "running", uptime: "99.99%", cpu: 28, memory: 35, disk: 18, network: 42, lastBackup: "30 min ago", ip: "10.0.6.1", os: "Rocky Linux 9", ram: "8 GB" },
  ],
};

type ServerStatus = "running" | "stopped" | "starting" | "stopping";

export default function SitesPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("locations");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedServer, setSelectedServer] = useState<typeof sitesData.servers[0] | null>(null);
  const [serverStatuses, setServerStatuses] = useState<Record<string, ServerStatus>>(
    Object.fromEntries(sitesData.servers.map(s => [s.id, s.status as ServerStatus]))
  );

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleServerStatus = (id: string) => {
    setServerStatuses(prev => {
      const current = prev[id];
      if (current === "running") {
        return { ...prev, [id]: "stopping" };
      } else if (current === "stopped") {
        return { ...prev, [id]: "starting" };
      }
      return prev;
    });

    // Simulate status change after delay
    setTimeout(() => {
      setServerStatuses(prev => {
        const current = prev[id];
        return { 
          ...prev, 
          [id]: current === "running" ? "stopped" : "running" 
        };
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Analytics / Sites</div>
            <h1 className="text-2xl font-bold">Sites & Servers</h1>
            <p className="text-slate-500 text-sm">Manage locations and infrastructure</p>
          </div>
          <Button className="bg-slate-600 hover:bg-slate-700 gap-2">
            <Plus className="h-4 w-4" /> Add Site
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Sites</p>
                  <p className="text-2xl font-bold">{sitesData.overview.totalSites}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <Server className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Active Servers</p>
                  <p className="text-2xl font-bold">{sitesData.overview.activeServers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/20">
                  <Activity className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Uptime</p>
                  <p className="text-2xl font-bold">{sitesData.overview.uptime}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <Globe className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Locations</p>
                  <p className="text-2xl font-bold">{sitesData.overview.locations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="locations">By Location</TabsTrigger>
            <TabsTrigger value="servers">Servers</TabsTrigger>
          </TabsList>

          <TabsContent value="locations" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Map/List View */}
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardHeader>
                  <CardTitle className="text-lg">Server Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sitesData.byLocation.map((location, idx) => (
                      <div key={idx} className="p-4 rounded-xl border hover:border-slate-500 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{location.flag}</span>
                            <div>
                              <p className="font-semibold">{location.country}</p>
                              <p className="text-sm text-slate-500">{location.servers} servers</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${
                              location.status === "healthy" ? "bg-green-100 text-green-700" :
                              location.status === "warning" ? "bg-amber-100 text-amber-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {location.status}
                            </Badge>
                            <span className={`text-sm font-medium ${location.trend > 0 ? "text-green-600" : "text-red-600"}`}>
                              {location.trend > 0 ? "+" : ""}{location.trend}%
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Usage</span>
                            <span className="font-medium">{location.usage}%</span>
                          </div>
                          <Progress value={location.usage} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Usage by Location Chart */}
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardHeader>
                  <CardTitle className="text-lg">Usage by Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sitesData.byLocation.slice(0, 6).map((location, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <span className="text-xl w-8">{location.flag}</span>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{location.country}</span>
                            <span className="text-slate-500">{location.usage}%</span>
                          </div>
                          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                location.usage > 90 ? "bg-red-500" :
                                location.usage > 75 ? "bg-amber-500" :
                                "bg-slate-500"
                              }`}
                              style={{ width: `${location.usage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="servers" className="mt-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Server Inventory</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search servers..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sitesData.servers.map((server) => (
                    <div 
                      key={server.id} 
                      className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                        expandedRows.has(server.id) 
                          ? "border-slate-500 shadow-lg shadow-slate-500/10" 
                          : "hover:border-slate-300"
                      }`}
                    >
                      {/* Main Row */}
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        onClick={() => toggleRow(server.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-xl transition-colors ${
                            serverStatuses[server.id] === "running" 
                              ? "bg-green-50 dark:bg-green-900/20" 
                              : "bg-slate-100 dark:bg-slate-800"
                          }`}>
                            <Server className={`h-5 w-5 ${
                              serverStatuses[server.id] === "running" 
                                ? "text-green-600" 
                                : "text-slate-400"
                            }`} />
                          </div>
                          <div>
                            <p className="font-semibold">{server.name}</p>
                            <p className="text-xs text-slate-500">{server.id}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <span className="text-slate-600 hidden md:inline">{server.location}</span>
                          
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={serverStatuses[server.id] === "running"}
                              onCheckedChange={() => toggleServerStatus(server.id)}
                              onClick={(e) => e.stopPropagation()}
                              className="data-[state=checked]:bg-green-500"
                            />
                            <Badge className={`${
                              serverStatuses[server.id] === "running" 
                                ? "bg-green-100 text-green-700" 
                                : serverStatuses[server.id] === "stopped"
                                ? "bg-slate-100 text-slate-600"
                                : "bg-amber-100 text-amber-700"
                            }`}>
                              {serverStatuses[server.id] === "running" ? "Running" : 
                               serverStatuses[server.id] === "stopped" ? "Stopped" :
                               serverStatuses[server.id] === "starting" ? "Starting..." : "Stopping..."}
                            </Badge>
                          </div>
                          
                          <div className="hidden lg:flex items-center gap-1 text-sm text-slate-500">
                            <Clock className="h-3 w-3" />
                            {server.uptime}
                          </div>
                          
                          <div className="hidden lg:flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-slate-500 rounded-full" 
                                style={{ width: `${server.cpu}%` }} 
                              />
                            </div>
                            <span className="text-sm w-10">{server.cpu}%</span>
                          </div>
                          
                          <div className="hidden lg:flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full" 
                                style={{ width: `${server.memory}%` }} 
                              />
                            </div>
                            <span className="text-sm w-10">{server.memory}%</span>
                          </div>
                          
                          <div className="hidden md:flex items-center gap-1 text-sm text-slate-500">
                            {server.lastBackup}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedServer(server);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            {expandedRows.has(server.id) ? (
                              <ChevronUp className="h-4 w-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedRows.has(server.id) && (
                        <div className="p-4 pt-0 bg-slate-50 dark:bg-slate-800/30 border-t">
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-white dark:bg-slate-800">
                                <Cpu className="h-4 w-4 text-slate-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">CPU Usage</p>
                                <p className="font-semibold">{server.cpu}%</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-white dark:bg-slate-800">
                                <Database className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">Memory</p>
                                <p className="font-semibold">{server.memory}%</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-white dark:bg-slate-800">
                                <HardDrive className="h-4 w-4 text-amber-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">Disk</p>
                                <p className="font-semibold">{server.disk}%</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-white dark:bg-slate-800">
                                <Network className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">Network</p>
                                <p className="font-semibold">{server.network}%</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-white dark:bg-slate-800">
                                <Shield className="h-4 w-4 text-slate-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">IP Address</p>
                                <p className="font-semibold text-sm">{server.ip}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-white dark:bg-slate-800">
                                <Server className="h-4 w-4 text-slate-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">OS / RAM</p>
                                <p className="font-semibold text-sm">{server.os.split(' ')[0]}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress Bars */}
                          <div className="grid grid-cols-4 gap-4 mt-4">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-500">CPU</span>
                                <span className="font-medium">{server.cpu}%</span>
                              </div>
                              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-500 rounded-full transition-all" style={{ width: `${server.cpu}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-500">Memory</span>
                                <span className="font-medium">{server.memory}%</span>
                              </div>
                              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${server.memory}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-500">Disk</span>
                                <span className="font-medium">{server.disk}%</span>
                              </div>
                              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${server.disk}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-500">Network</span>
                                <span className="font-medium">{server.network}%</span>
                              </div>
                              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${server.network}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Server Detail Modal */}
        {selectedServer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedServer(null)}
            />
            <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-600 to-slate-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur">
                      <Server className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedServer.name}</h2>
                      <p className="text-white/70 text-sm">{selectedServer.id} • {selectedServer.location}</p>
                    </div>
                  </div>
                  <Badge className={`${
                    serverStatuses[selectedServer.id] === "running" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {serverStatuses[selectedServer.id] === "running" ? "Running" : "Stopped"}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <Cpu className="h-5 w-5 text-slate-600 mb-2" />
                    <p className="text-2xl font-bold">{selectedServer.cpu}%</p>
                    <p className="text-xs text-slate-500">CPU</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <Database className="h-5 w-5 text-blue-600 mb-2" />
                    <p className="text-2xl font-bold">{selectedServer.memory}%</p>
                    <p className="text-xs text-slate-500">Memory</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <HardDrive className="h-5 w-5 text-amber-600 mb-2" />
                    <p className="text-2xl font-bold">{selectedServer.disk}%</p>
                    <p className="text-xs text-slate-500">Disk</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <Activity className="h-5 w-5 text-green-600 mb-2" />
                    <p className="text-2xl font-bold">{selectedServer.uptime}</p>
                    <p className="text-xs text-slate-500">Uptime</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border">
                    <p className="text-sm text-slate-500 mb-1">IP Address</p>
                    <p className="font-semibold">{selectedServer.ip}</p>
                  </div>
                  <div className="p-4 rounded-xl border">
                    <p className="text-sm text-slate-500 mb-1">Operating System</p>
                    <p className="font-semibold">{selectedServer.os}</p>
                  </div>
                  <div className="p-4 rounded-xl border">
                    <p className="text-sm text-slate-500 mb-1">RAM</p>
                    <p className="font-semibold">{selectedServer.ram}</p>
                  </div>
                  <div className="p-4 rounded-xl border">
                    <p className="text-sm text-slate-500 mb-1">Last Backup</p>
                    <p className="font-semibold">{selectedServer.lastBackup}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => toggleServerStatus(selectedServer.id)}
                  >
                    {serverStatuses[selectedServer.id] === "running" ? (
                      <>
                        <PowerOff className="h-4 w-4" />
                        Stop Server
                      </>
                    ) : (
                      <>
                        <Power className="h-4 w-4" />
                        Start Server
                      </>
                    )}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSelectedServer(null)}>
                      Close
                    </Button>
                    <Button className="bg-slate-600 hover:bg-slate-700 gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Server
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
