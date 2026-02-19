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
  Bell,
  Settings,
  MoreHorizontal,
  Filter,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  FileText,
  Users,
  ArrowUpDown,
  Eye,
  UserPlus,
  Flag,
  XCircle,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Data for different time periods
const periodData: Record<string, { 
  kpis: { label: string; value: string; change: number; trend: string; sparkline: number[] }[];
  volume: { day: string; volume: number }[];
  updates: { type: string; message: string; time: string; icon: string }[];
}> = {
  today: {
    kpis: [
      { label: "Current Tickets", value: "3,484", change: 7.1, trend: "up", sparkline: [30, 45, 35, 50, 65, 55, 70] },
      { label: "Daily Avg. Resolution", value: "486", change: 2, trend: "up", sparkline: [40, 42, 38, 45, 48, 46, 50] },
      { label: "SLA Compliance Rate", value: "92%", change: -1.3, trend: "down", sparkline: [95, 94, 93, 92, 93, 92, 91] },
      { label: "First Response Time", value: "4.2m", change: -8.5, trend: "down", sparkline: [6, 5, 5.5, 4.8, 4.5, 4.2, 4] },
    ],
    volume: [
      { day: "Sun", volume: 420 },
      { day: "Mon", volume: 512 },
      { day: "Tue", volume: 584 },
      { day: "Wed", volume: 548 },
      { day: "Thu", volume: 620 },
      { day: "Fri", volume: 590 },
      { day: "Sat", volume: 380 },
    ],
    updates: [
      { type: "ticket", message: "Ticket #2341 status changed to 'In Progress'", time: "2 min ago", icon: "ticket" },
      { type: "client", message: "New client 'Acme Corp' registered", time: "15 min ago", icon: "user" },
      { type: "assign", message: "Ticket #2338 reassigned to Sarah", time: "32 min ago", icon: "assign" },
      { type: "sla", message: "SLA breach risk: Ticket #2319", time: "1 hour ago", icon: "alert" },
    ],
  },
  yesterday: {
    kpis: [
      { label: "Current Tickets", value: "3,256", change: 3.2, trend: "up", sparkline: [28, 35, 40, 38, 42, 45, 48] },
      { label: "Daily Avg. Resolution", value: "412", change: -5, trend: "down", sparkline: [45, 44, 42, 40, 41, 39, 38] },
      { label: "SLA Compliance Rate", value: "94%", change: 0.8, trend: "up", sparkline: [92, 93, 94, 93, 94, 95, 94] },
      { label: "First Response Time", value: "5.1m", change: -12.3, trend: "down", sparkline: [7, 6.5, 6, 5.8, 5.5, 5.2, 5] },
    ],
    volume: [
      { day: "Sun", volume: 380 },
      { day: "Mon", volume: 456 },
      { day: "Tue", volume: 520 },
      { day: "Wed", volume: 490 },
      { day: "Thu", volume: 580 },
      { day: "Fri", volume: 540 },
      { day: "Sat", volume: 320 },
    ],
    updates: [
      { type: "ticket", message: "Ticket #2335 resolved successfully", time: "1 hour ago", icon: "ticket" },
      { type: "client", message: "New client 'TechStart' registered", time: "3 hours ago", icon: "user" },
      { type: "assign", message: "Ticket #2330 reassigned to John", time: "5 hours ago", icon: "assign" },
      { type: "article", message: "New KB article published", time: "6 hours ago", icon: "file" },
    ],
  },
  week: {
    kpis: [
      { label: "Current Tickets", value: "3,847", change: 12.5, trend: "up", sparkline: [35, 42, 48, 55, 62, 58, 65] },
      { label: "Daily Avg. Resolution", value: "478", change: 8, trend: "up", sparkline: [38, 40, 42, 45, 47, 46, 48] },
      { label: "SLA Compliance Rate", value: "89%", change: -3.2, trend: "down", sparkline: [96, 95, 94, 92, 91, 90, 89] },
      { label: "First Response Time", value: "5.8m", change: -15.2, trend: "down", sparkline: [8, 7.5, 7, 6.5, 6.2, 6, 5.5] },
    ],
    volume: [
      { day: "Sun", volume: 380 },
      { day: "Mon", volume: 520 },
      { day: "Tue", volume: 640 },
      { day: "Wed", volume: 580 },
      { day: "Thu", volume: 690 },
      { day: "Fri", volume: 650 },
      { day: "Sat", volume: 420 },
    ],
    updates: [
      { type: "ticket", message: "Ticket #2300-#2310 batch resolved", time: "2 days ago", icon: "ticket" },
      { type: "client", message: "5 new clients registered this week", time: "2 days ago", icon: "user" },
      { type: "sla", message: "SLA breach on 3 tickets last week", time: "3 days ago", icon: "alert" },
      { type: "feedback", message: "New customer feedback received", time: "4 days ago", icon: "message" },
    ],
  },
};

const initialTickets = [
  { id: "#2319", subject: "Payment failed on invoice", priority: "high", agent: "Sarah M.", agentInitials: "SM", status: "In Review", slaDue: "2h left", slaStatus: "warning" },
  { id: "#2320", subject: "Cannot access dashboard", priority: "medium", agent: "John D.", agentInitials: "JD", status: "Delivered", slaDue: "1d left", slaStatus: "ok" },
  { id: "#2321", subject: "Feature request: Dark mode", priority: "low", agent: "Emily R.", agentInitials: "ER", status: "In Progress", slaDue: "3d left", slaStatus: "ok" },
  { id: "#2322", subject: "API integration issue", priority: "high", agent: "Mike T.", agentInitials: "MT", status: "In Review", slaDue: "4h left", slaStatus: "warning" },
  { id: "#2323", subject: "Billing question", priority: "medium", agent: "Sarah M.", agentInitials: "SM", status: "In Progress", slaDue: "6h left", slaStatus: "ok" },
  { id: "#2324", subject: "Account locked out", priority: "high", agent: "John D.", agentInitials: "JD", status: "Open", slaDue: "30m left", slaStatus: "critical" },
  { id: "#2325", subject: "Password reset request", priority: "medium", agent: "Emily R.", agentInitials: "ER", status: "Delivered", slaDue: "8h left", slaStatus: "ok" },
  { id: "#2326", subject: "Mobile app crash", priority: "high", agent: "Mike T.", agentInitials: "MT", status: "In Progress", slaDue: "1h left", slaStatus: "warning" },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

const slaStatusColors: Record<string, string> = {
  ok: "text-green-600",
  warning: "text-amber-600",
  critical: "text-red-600",
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [tickets, setTickets] = useState(initialTickets);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filterPriority, setFilterPriority] = useState("all");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const currentData = periodData[activeTab];
  const maxVolume = Math.max(...currentData.volume.map(d => d.volume));

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredTickets = tickets
    .filter(t => filterPriority === "all" || t.priority === filterPriority)
    .sort((a, b) => {
      if (!sortField) return 0;
      const aVal = a[sortField as keyof typeof a];
      const bVal = b[sortField as keyof typeof b];
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredTickets.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredTickets.map(t => t.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Overview / Dashboard</div>
            <h1 className="text-2xl font-bold">Hello, Krish Walker 👋</h1>
            <p className="text-slate-500 text-sm">Here's what's happening with your support today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="lastweek">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="lastweek">Last week</SelectItem>
                <SelectItem value="lastmonth">Last month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentData.kpis.map((kpi, i) => (
            <Card key={i} className="bg-white dark:bg-[#1a1a1a]">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-slate-500">{kpi.label}</p>
                    <p className="text-3xl font-bold mt-1">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {kpi.trend === "up" ? (
                        <TrendingUp className={`h-4 w-4 ${kpi.change > 0 ? "text-green-500" : "text-red-500"}`} />
                      ) : (
                        <TrendingDown className={`h-4 w-4 ${kpi.change > 0 ? "text-green-500" : "text-red-500"}`} />
                      )}
                      <span className={`text-sm font-medium ${kpi.change > 0 ? "text-green-500" : "text-red-500"}`}>
                        {kpi.change > 0 ? "+" : ""}{kpi.change}%
                      </span>
                      <span className="text-xs text-slate-400">vs last period</span>
                    </div>
                  </div>
                  {/* Green Sparkline */}
                  <div className="flex items-end gap-1 h-14 w-20">
                    {kpi.sparkline.map((v, j) => (
                      <div
                        key={j}
                        className="flex-1 bg-green-500 rounded-t transition-all hover:bg-green-600"
                        style={{ height: `${(v / Math.max(...kpi.sparkline)) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket Volume Chart */}
          <Card className="lg:col-span-2 bg-white dark:bg-[#1a1a1a]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Ticket Volume</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    {currentData.volume.reduce((sum, d) => sum + d.volume, 0).toLocaleString()} total tickets
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Last week</DropdownMenuItem>
                    <DropdownMenuItem>Last month</DropdownMenuItem>
                    <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              {/* Smooth Bar Chart */}
              <div className="flex items-end justify-between h-52 gap-3">
                {currentData.volume.map((d, i) => {
                  const barHeight = Math.max((d.volume / maxVolume) * 100, 5);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full h-full flex items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all duration-300 group-hover:from-purple-700 group-hover:to-purple-500 cursor-pointer relative"
                          style={{ height: `${barHeight}%`, minHeight: '8px' }}
                        >
                          {/* Tooltip */}
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {d.volume} tickets
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Latest Updates */}
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Latest Updates</CardTitle>
                <div className="flex gap-1">
                  {[
                    { key: "today", label: "Today" },
                    { key: "yesterday", label: "Yest." },
                    { key: "week", label: "Week" }
                  ].map((tab) => (
                    <Button
                      key={tab.key}
                      variant={activeTab === tab.key ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab(tab.key)}
                      className={`text-xs px-2 h-7 ${activeTab === tab.key ? "bg-purple-600 hover:bg-purple-700" : "text-slate-500"}`}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentData.updates.map((update, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      update.type === "ticket" ? "bg-blue-100" :
                      update.type === "client" ? "bg-green-100" :
                      update.type === "sla" ? "bg-red-100" :
                      update.type === "assign" ? "bg-purple-100" :
                      "bg-slate-100"
                    }`}>
                      {update.type === "ticket" && <FileText className="h-4 w-4 text-blue-600" />}
                      {update.type === "client" && <Users className="h-4 w-4 text-green-600" />}
                      {update.type === "assign" && <User className="h-4 w-4 text-purple-600" />}
                      {update.type === "sla" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      {update.type === "article" && <FileText className="h-4 w-4 text-slate-600" />}
                      {update.type === "feedback" && <MessageSquare className="h-4 w-4 text-slate-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{update.message}</p>
                      <p className="text-xs text-slate-400">{update.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SLA Monitoring Table */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg">SLA Monitoring</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search tickets..." className="pl-10 w-64" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" /> 
                      {filterPriority === "all" ? "Filter" : filterPriority}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterPriority("all")}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterPriority("high")}>High</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterPriority("medium")}>Medium</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterPriority("low")}>Low</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.length === filteredTickets.length && filteredTickets.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-slate-700" onClick={() => handleSort("id")}>
                      <div className="flex items-center gap-1">
                        Ticket
                        {sortField === "id" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Subject</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-slate-700" onClick={() => handleSort("priority")}>
                      <div className="flex items-center gap-1">
                        Priority
                        {sortField === "priority" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-slate-700" onClick={() => handleSort("agent")}>
                      <div className="flex items-center gap-1">
                        Assigned
                        {sortField === "agent" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-slate-700" onClick={() => handleSort("status")}>
                      <div className="flex items-center gap-1">
                        Status
                        {sortField === "status" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-slate-700" onClick={() => handleSort("slaDue")}>
                      <div className="flex items-center gap-1">
                        SLA Due
                        {sortField === "slaDue" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                      </div>
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(ticket.id)}
                          onChange={() => toggleRow(ticket.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium text-purple-600">{ticket.id}</td>
                      <td className="py-3 px-4">{ticket.subject}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs">
                            {ticket.agentInitials}
                          </div>
                          <span>{ticket.agent}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-slate-50">
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className={`py-3 px-4 font-medium ${slaStatusColors[ticket.slaStatus]}`}>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {ticket.slaDue}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View details</DropdownMenuItem>
                            <DropdownMenuItem><UserPlus className="h-4 w-4 mr-2" /> Assign to...</DropdownMenuItem>
                            <DropdownMenuItem><Flag className="h-4 w-4 mr-2" /> Change priority</DropdownMenuItem>
                            <DropdownMenuItem><RefreshCw className="h-4 w-4 mr-2" /> Mark as pending</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600"><XCircle className="h-4 w-4 mr-2" /> Close ticket</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
