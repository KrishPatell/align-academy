"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, TrendingDown, Users, Clock, CheckCircle, AlertCircle, Download, Filter, ChevronDown, ChevronUp, AlertTriangle, X, Mail, MessageCircle } from "lucide-react";

const workloadData = {
  overview: {
    totalTickets: 1247,
    openTickets: 89,
    resolvedToday: 45,
    avgResponseTime: "2h 15m",
    ticketsTrend: 12,
    responseTrend: -8,
  },
  byAgent: [
    { name: "Sarah Mitchell", avatar: "SM", open: 23, inProgress: 15, resolved: 156, capacity: 85, status: "overloaded" },
    { name: "John Davidson", avatar: "JD", open: 18, inProgress: 12, resolved: 142, capacity: 72, status: "optimal" },
    { name: "Emily Roberts", avatar: "ER", open: 15, inProgress: 10, resolved: 138, capacity: 65, status: "optimal" },
    { name: "Mike Thompson", avatar: "MT", open: 12, inProgress: 8, resolved: 121, capacity: 58, status: "optimal" },
    { name: "Lisa Anderson", avatar: "LA", open: 21, inProgress: 14, resolved: 98, capacity: 92, status: "overloaded" },
  ],
  byPriority: [
    { priority: "Critical", count: 12, avgTime: "45m", trend: "up" },
    { priority: "High", count: 34, avgTime: "2h", trend: "stable" },
    { priority: "Medium", count: 89, avgTime: "4h", trend: "down" },
    { priority: "Low", count: 156, avgTime: "8h", trend: "down" },
  ],
  weeklyData: [
    { day: "Mon", tickets: 145, resolved: 132 },
    { day: "Tue", tickets: 168, resolved: 155 },
    { day: "Wed", tickets: 156, resolved: 148 },
    { day: "Thu", tickets: 189, resolved: 172 },
    { day: "Fri", tickets: 178, resolved: 165 },
    { day: "Sat", tickets: 89, resolved: 95 },
    { day: "Sun", tickets: 67, resolved: 72 },
  ],
};

export default function WorkloadPage() {
  const [mounted, setMounted] = useState(false);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<typeof workloadData.byAgent[0] | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const maxCapacity = Math.max(...workloadData.byAgent.map(a => a.capacity));

  const toggleAgentExpand = (name: string) => {
    setExpandedAgent(expandedAgent === name ? null : name);
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 90) return "text-red-600 bg-red-50 dark:bg-red-900/20";
    if (capacity >= 75) return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
    return "text-green-600 bg-green-50 dark:bg-green-900/20";
  };

  const getCapacityWarning = (capacity: number) => {
    if (capacity >= 90) return { message: "Critical capacity - immediate attention needed", color: "text-red-600 bg-red-50 dark:bg-red-900/20" };
    if (capacity >= 75) return { message: "High capacity - consider redistributing tickets", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" };
    return null;
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Analytics / Workload Analytics</div>
            <h1 className="text-2xl font-bold">Workload Analytics</h1>
            <p className="text-slate-500 text-sm">Team performance and ticket distribution</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Tickets</p>
                  <p className="text-2xl font-bold">{workloadData.overview.totalTickets}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="h-3 w-3" />
                +{workloadData.overview.ticketsTrend}% from last week
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Open Tickets</p>
                  <p className="text-2xl font-bold">{workloadData.overview.openTickets}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Resolved Today</p>
                  <p className="text-2xl font-bold">{workloadData.overview.resolvedToday}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="h-3 w-3" />
                Great work!
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Avg Response</p>
                  <p className="text-2xl font-bold">{workloadData.overview.avgResponseTime}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingDown className="h-3 w-3" />
                {workloadData.overview.responseTrend}% faster
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Team Size</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2">Active agents</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="agents" className="space-y-4">
          <TabsList>
            <TabsTrigger value="agents">By Agent</TabsTrigger>
            <TabsTrigger value="priority">By Priority</TabsTrigger>
            <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">Agent Workload Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workloadData.byAgent.map((agent, idx) => {
                    const isExpanded = expandedAgent === agent.name;
                    const warning = getCapacityWarning(agent.capacity);
                    return (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-800/50 cursor-pointer transition-all hover:shadow-md"
                      onClick={() => toggleAgentExpand(agent.name)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {agent.avatar}
                          </div>
                          <div>
                            <p className="font-semibold">{agent.name}</p>
                            <p className="text-sm text-slate-500">{agent.open + agent.inProgress} active tickets</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCapacityColor(agent.capacity)}`}>
                            {agent.capacity}%
                          </div>
                          <Badge className={agent.status === "overloaded" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}>
                            {agent.status === "overloaded" ? "Overloaded" : "Optimal"}
                          </Badge>
                          {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                        </div>
                      </div>
                      
                      {/* Capacity Warning */}
                      {warning && (
                        <div className={`flex items-center gap-2 p-2 rounded-lg mb-3 ${warning.color}`}>
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm">{warning.message}</span>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Capacity</span>
                          <span className="font-medium">{agent.capacity}%</span>
                        </div>
                        <Progress 
                          value={agent.capacity} 
                          className={`h-2 ${agent.capacity >= 90 ? '[&>div]:bg-red-500' : agent.capacity >= 75 ? '[&>div]:bg-amber-500' : '[&>div]:bg-green-500'}`} 
                        />
                      </div>
                      
                      {/* Expandable Details */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t" onClick={(e) => e.stopPropagation()}>
                          <div className="grid grid-cols-3 gap-4 text-center mb-4">
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-900">
                              <p className="text-xl font-bold">{agent.open}</p>
                              <p className="text-xs text-slate-500">Open</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-900">
                              <p className="text-xl font-bold">{agent.inProgress}</p>
                              <p className="text-xs text-slate-500">In Progress</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-900">
                              <p className="text-xl font-bold">{agent.resolved}</p>
                              <p className="text-xs text-slate-500">Resolved</p>
                            </div>
                          </div>
                          
                          {/* Additional Stats */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 text-center">
                              <p className="text-lg font-bold">{Math.round(agent.resolved / 7)}</p>
                              <p className="text-xs text-slate-500">Avg Daily Resolutions</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 text-center">
                              <p className="text-lg font-bold">{agent.capacity >= 90 ? <span>🔴</span> : agent.capacity >= 75 ? <span>🟡</span> : <span>🟢</span>}</p>
                              <p className="text-xs text-slate-500">Workload Status</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={(e) => { e.stopPropagation(); setSelectedAgent(agent); }}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )})}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="priority" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {workloadData.byPriority.map((item, idx) => (
                <Card key={idx} className="bg-white dark:bg-[#1a1a1a]">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${
                        item.priority === "Critical" ? "bg-red-100 text-red-700" :
                        item.priority === "High" ? "bg-orange-100 text-orange-700" :
                        item.priority === "Medium" ? "bg-blue-100 text-blue-700" :
                        "bg-slate-100 text-slate-700"
                      }`}>
                        {item.priority}
                      </Badge>
                      {item.trend === "up" && <TrendingUp className="h-4 w-4 text-red-500" />}
                      {item.trend === "down" && <TrendingDown className="h-4 w-4 text-green-500" />}
                      {item.trend === "stable" && <span className="text-xs text-slate-400">Stable</span>}
                    </div>
                    <p className="text-3xl font-bold mb-1">{item.count}</p>
                    <p className="text-sm text-slate-500">tickets</p>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-slate-500">Avg. resolution time</p>
                      <p className="font-semibold">{item.avgTime}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">Weekly Ticket Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {workloadData.weeklyData.map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex gap-1 h-48">
                        <div 
                          className="flex-1 bg-purple-500 rounded-t-md" 
                          style={{ height: `${(day.tickets / 200) * 100}%` }}
                          title={`${day.tickets} tickets`}
                        />
                        <div 
                          className="flex-1 bg-green-500 rounded-t-md" 
                          style={{ height: `${(day.resolved / 200) * 100}%` }}
                          title={`${day.resolved} resolved`}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{day.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span className="text-sm text-slate-500">Incoming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm text-slate-500">Resolved</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Agent Detail Modal */}
        {selectedAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedAgent(null)} />
            <div className="relative bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white dark:bg-[#1a1a1a]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                    {selectedAgent.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedAgent.name}</h3>
                    <p className="text-sm text-slate-500">
                      {selectedAgent.open + selectedAgent.inProgress} active tickets • {selectedAgent.capacity}% capacity
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedAgent(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 space-y-6">
                {/* Status & Capacity */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    Workload Status
                  </h4>
                  <div className="flex items-center justify-center mb-4">
                    <div className={`px-4 py-2 rounded-full text-2xl font-bold ${getCapacityColor(selectedAgent.capacity)}`}>
                      {selectedAgent.capacity}%
                    </div>
                  </div>
                  {getCapacityWarning(selectedAgent.capacity) && (
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${getCapacityWarning(selectedAgent.capacity)?.color}`}>
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">{getCapacityWarning(selectedAgent.capacity)?.message}</span>
                    </div>
                  )}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Capacity Used</span>
                      <span className="font-medium">{selectedAgent.capacity}%</span>
                    </div>
                    <Progress 
                      value={selectedAgent.capacity} 
                      className={`h-3 ${selectedAgent.capacity >= 90 ? '[&>div]:bg-red-500' : selectedAgent.capacity >= 75 ? '[&>div]:bg-amber-500' : '[&>div]:bg-green-500'}`} 
                    />
                  </div>
                </div>

                {/* Ticket Breakdown */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Ticket Breakdown
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-center">
                      <p className="text-2xl font-bold text-red-600">{selectedAgent.open}</p>
                      <p className="text-xs text-slate-500">Open</p>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-center">
                      <p className="text-2xl font-bold text-amber-600">{selectedAgent.inProgress}</p>
                      <p className="text-xs text-slate-500">In Progress</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedAgent.resolved}</p>
                      <p className="text-xs text-slate-500">Resolved</p>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                      <p className="text-xl font-bold">{Math.round(selectedAgent.resolved / 7)}</p>
                      <p className="text-xs text-slate-500">Avg Daily Resolutions</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                      <p className="text-xl font-bold">{selectedAgent.status === "overloaded" ? <span>🔴</span> : <span>🟢</span>}</p>
                      <p className="text-xs text-slate-500">Current Status</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
