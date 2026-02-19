"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  TrendingUp,
  TrendingDown,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  FileText,
  Users,
  ArrowUp,
  ArrowRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const kpiData = [
  { label: "Current Tickets", value: "3,484", change: 7.1, trend: "up", sparkline: [30, 45, 35, 50, 65, 55, 70] },
  { label: "Daily Avg. Resolution", value: "486", change: 2, trend: "up", sparkline: [40, 42, 38, 45, 48, 46, 50] },
  { label: "SLA Compliance Rate", value: "92%", change: -1.3, trend: "down", sparkline: [95, 94, 93, 92, 93, 92, 91] },
];

const ticketVolumeData = [
  { day: "Sun", volume: 420 },
  { day: "Mon", volume: 512 },
  { day: "Tue", volume: 584 },
  { day: "Wed", volume: 548 },
  { day: "Thu", volume: 620 },
  { day: "Fri", volume: 590 },
  { day: "Sat", volume: 380 },
];

const updates = [
  { type: "ticket", message: "Ticket #2341 status changed to 'In Progress'", time: "2 min ago", icon: "ticket" },
  { type: "client", message: "New client 'Acme Corp' registered", time: "15 min ago", icon: "user" },
  { type: "assign", message: "Ticket #2338 reassigned to Sarah", time: "32 min ago", icon: "assign" },
  { type: "sla", message: "SLA breach risk: Ticket #2319", time: "1 hour ago", icon: "alert" },
  { type: "article", message: "New KB article published", time: "2 hours ago", icon: "file" },
  { type: "feedback", message: "New customer feedback received", time: "3 hours ago", icon: "message" },
];

const slaTickets = [
  { id: "#2319", subject: "Payment failed on invoice", priority: "high", agent: "Sarah M.", status: "In Review", slaDue: "2h left", slaStatus: "warning" },
  { id: "#2320", subject: "Cannot access dashboard", priority: "medium", agent: "John D.", status: "Delivered", slaDue: "1d left", slaStatus: "ok" },
  { id: "#2321", subject: "Feature request: Dark mode", priority: "low", agent: "Emily R.", status: "In Progress", slaDue: "3d left", slaStatus: "ok" },
  { id: "#2322", subject: "API integration issue", priority: "high", agent: "Mike T.", status: "In Review", slaDue: "4h left", slaStatus: "warning" },
  { id: "#2323", subject: "Billing question", priority: "medium", agent: "Sarah M.", status: "In Progress", slaDue: "6h left", slaStatus: "ok" },
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

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const totalVolume = ticketVolumeData.reduce((sum, d) => sum + d.volume, 0);
  const volumeChange = 8;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kpiData.map((kpi, i) => (
            <Card key={i} className="bg-white dark:bg-[#1a1a1a]">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
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
                      <span className="text-xs text-slate-400">vs last week</span>
                    </div>
                  </div>
                  {/* Sparkline */}
                  <div className="flex items-end gap-1 h-12">
                    {kpi.sparkline.map((v, j) => (
                      <div
                        key={j}
                        className="w-2 bg-purple-500 rounded-t"
                        style={{ height: `${(v / 70) * 100}%` }}
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
                    {totalVolume.toLocaleString()} total tickets • 
                    <span className="text-green-600 font-medium"> +{volumeChange}%</span> vs last week
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
              {/* Bar Chart visualization */}
              <div className="flex items-end justify-between h-48 gap-2">
                {ticketVolumeData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative group cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors" style={{ height: `${(d.volume / 650) * 100}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {d.volume}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{d.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Latest Updates */}
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Latest Updates</CardTitle>
                <div className="flex gap-1">
                  {["today", "yesterday", "this week"].map((tab) => (
                    <Button
                      key={tab}
                      variant={activeTab === tab ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab(tab)}
                      className={`text-xs px-2 ${activeTab === tab ? "bg-purple-600" : ""}`}
                    >
                      {tab === "this week" ? "This week" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {updates.map((update, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
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
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Ticket</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Subject</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Priority</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Assigned Agent</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">SLA Due</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slaTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
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
                            {ticket.agent.charAt(0)}
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
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Assign to...</DropdownMenuItem>
                            <DropdownMenuItem>Change priority</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Close ticket</DropdownMenuItem>
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
