"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  FileText,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// SLA Data
const slaMetrics = {
  overall: 92.4,
  firstResponse: 94.2,
  resolution: 89.8,
  breached: 23,
  atRisk: 15,
  onTrack: 156,
};

const slaByPriority = [
  { priority: "High", total: 245, met: 228, rate: 93.1, target: 95 },
  { priority: "Medium", total: 412, met: 385, rate: 93.4, target: 90 },
  { priority: "Low", total: 189, met: 181, rate: 95.8, target: 85 },
];

const slaTickets = [
  { id: "#2341", subject: "Payment failed on invoice", priority: "high", customer: "Umbrella Corp", created: "2026-02-19 10:30", due: "2026-02-19 14:30", status: "at_risk", agent: "Sarah M.", responseTime: "15m" },
  { id: "#2342", subject: "Dashboard not loading", priority: "high", customer: "Acme Corp", created: "2026-02-19 09:15", due: "2026-02-19 13:15", status: "breached", agent: "John D.", responseTime: "2h 15m" },
  { id: "#2343", subject: "Feature request: Export PDF", priority: "low", customer: "Globex Inc", created: "2026-02-19 08:00", due: "2026-02-21 08:00", status: "on_track", agent: "Emily R.", responseTime: "5m" },
  { id: "#2344", subject: "API rate limit exceeded", priority: "medium", customer: "Initech", created: "2026-02-19 07:45", due: "2026-02-19 15:45", status: "on_track", agent: "Mike T.", responseTime: "30m" },
  { id: "#2345", subject: "Billing discrepancy", priority: "high", customer: "Wayne Ent", created: "2026-02-18 16:00", due: "2026-02-19 08:00", status: "breached", agent: "Sarah M.", responseTime: "4h 30m" },
];

const statusConfig = {
  on_track: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle, label: "On Track" },
  at_risk: { bg: "bg-amber-100", text: "text-amber-700", icon: AlertTriangle, label: "At Risk" },
  breached: { bg: "bg-red-100", text: "text-red-700", icon: XCircle, label: "Breached" },
};

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

export default function SLAPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedTickets = [...slaTickets].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField as keyof typeof a];
    const bVal = b[sortField as keyof typeof b];
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Analytics / SLA Compliance</div>
            <h1 className="text-2xl font-bold">SLA Compliance</h1>
            <p className="text-slate-500 text-sm">Monitor and manage your Service Level Agreements</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Overall SLA</p>
              <p className="text-2xl font-bold mt-1">{slaMetrics.overall}%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-500">+2.1%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">First Response</p>
              <p className="text-2xl font-bold mt-1">{slaMetrics.firstResponse}%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-500">+1.5%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Resolution</p>
              <p className="text-2xl font-bold mt-1">{slaMetrics.resolution}%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-xs text-red-500">-0.8%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Breached</p>
              <p className="text-2xl font-bold mt-1 text-red-600">{slaMetrics.breached}</p>
              <div className="flex items-center gap-1 mt-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-xs text-slate-500">tickets</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">At Risk</p>
              <p className="text-2xl font-bold mt-1 text-amber-600">{slaMetrics.atRisk}</p>
              <div className="flex items-center gap-1 mt-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-xs text-slate-500">tickets</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">On Track</p>
              <p className="text-2xl font-bold mt-1 text-green-600">{slaMetrics.onTrack}</p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs text-slate-500">tickets</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">SLA Tickets</TabsTrigger>
            <TabsTrigger value="bypriority">By Priority</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">SLA Compliance by Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {slaByPriority.map((item) => (
                    <div key={item.priority} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[item.priority.toLowerCase()]}`}>
                            {item.priority}
                          </span>
                          <span className="text-sm text-slate-500">{item.total} tickets</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Target: {item.target}%</span>
                          <span className={`font-bold ${item.rate >= item.target ? 'text-green-600' : 'text-red-600'}`}>{item.rate}%</span>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.rate >= item.target ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(item.rate, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="mt-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">SLA Tickets</CardTitle>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Search tickets..." className="w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("id")}>
                          <div className="flex items-center gap-1">Ticket {sortField === "id" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Subject</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("priority")}>
                          <div className="flex items-center gap-1">Priority {sortField === "priority" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Customer</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Due</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("status")}>
                          <div className="flex items-center gap-1">SLA Status {sortField === "status" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Agent</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Response</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedTickets.map((ticket) => {
                        const status = statusConfig[ticket.status];
                        const StatusIcon = status.icon;
                        return (
                          <tr key={ticket.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-3 px-4 font-medium text-purple-600">{ticket.id}</td>
                            <td className="py-3 px-4">{ticket.subject}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
                                {ticket.priority}
                              </span>
                            </td>
                            <td className="py-3 px-4">{ticket.customer}</td>
                            <td className="py-3 px-4 text-sm">{ticket.due}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${status.bg} ${status.text}`}>
                                <StatusIcon className="h-3 w-3" />
                                {status.label}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs">
                                  {ticket.agent.charAt(0)}
                                </div>
                                <span className="text-sm">{ticket.agent}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">{ticket.responseTime}</td>
                            <td className="py-3 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View details</DropdownMenuItem>
                                  <DropdownMenuItem>Extend SLA</DropdownMenuItem>
                                  <DropdownMenuItem>Assign to...</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bypriority" className="mt-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">SLA by Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {slaByPriority.map((item) => (
                    <div key={item.priority} className="p-4 rounded-xl border">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[item.priority.toLowerCase()]}`}>
                          {item.priority}
                        </span>
                        <span className="text-2xl font-bold">{item.rate}%</span>
                      </div>
                      <div className="space-y-2 text-sm text-slate-500">
                        <div className="flex justify-between">
                          <span>Total Tickets</span>
                          <span>{item.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SLA Met</span>
                          <span>{item.met}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Target</span>
                          <span>{item.target}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
