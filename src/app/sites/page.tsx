"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MapPin, Globe, Server, Activity, Clock, TrendingUp, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";

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
    { id: "srv-001", name: "US-East-Primary", location: "Virginia, US", status: "running", uptime: "99.99%", cpu: 45, memory: 62, lastBackup: "2 hours ago" },
    { id: "srv-002", name: "US-West-Backup", location: "California, US", status: "running", uptime: "99.95%", cpu: 38, memory: 51, lastBackup: "4 hours ago" },
    { id: "srv-003", name: "EU-Central", location: "Frankfurt, DE", status: "running", uptime: "99.98%", cpu: 72, memory: 68, lastBackup: "1 hour ago" },
    { id: "srv-004", name: "UK-South", location: "London, UK", status: "running", uptime: "99.92%", cpu: 55, memory: 44, lastBackup: "3 hours ago" },
    { id: "srv-005", name: "AP-Southeast", location: "Singapore", status: "stopped", uptime: "99.87%", cpu: 0, memory: 0, lastBackup: "1 day ago" },
    { id: "srv-006", name: "AU-East", location: "Sydney, AU", status: "running", uptime: "99.99%", cpu: 28, memory: 35, lastBackup: "30 min ago" },
  ],
};

export default function SitesPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("locations");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Analytics / Sites</div>
            <h1 className="text-2xl font-bold">Sites & Servers</h1>
            <p className="text-slate-500 text-sm">Manage locations and infrastructure</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
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
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                  <Activity className="h-5 w-5 text-purple-600" />
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
                      <div key={idx} className="p-4 rounded-xl border hover:border-purple-500 transition-colors">
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
                                "bg-purple-500"
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
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Server</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Uptime</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">CPU</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Memory</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Last Backup</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sitesData.servers.map((server) => (
                        <tr key={server.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <Server className="h-4 w-4 text-slate-600" />
                              </div>
                              <div>
                                <p className="font-medium">{server.name}</p>
                                <p className="text-xs text-slate-500">{server.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{server.location}</td>
                          <td className="py-3 px-4">
                            <Badge className={`${
                              server.status === "running" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                              {server.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-slate-400" />
                              {server.uptime}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${server.cpu}%` }} />
                              </div>
                              <span className="text-sm">{server.cpu}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${server.memory}%` }} />
                              </div>
                              <span className="text-sm">{server.memory}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-sm">{server.lastBackup}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
