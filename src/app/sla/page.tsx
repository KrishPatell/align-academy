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
  X,
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

const statusConfig: Record<string, { bg: string; text: string; icon: any; label: string }> = {
  on_track: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle, label: "On Track" },
  at_risk: { bg: "bg-amber-100", text: "text-amber-700", icon: AlertTriangle, label: "At Risk" },
  breached: { bg: "bg-red-100", text: "text-red-700", icon: XCircle, label: "Breached" },
};

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

// Ticket Detail Modal
function TicketDetailModal({ ticket, onClose }: { ticket: typeof slaTickets[0]; onClose: () => void }) {
  const status = statusConfig[ticket.status];
  const StatusIcon = status.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-purple-600">{ticket.id}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
              {ticket.priority}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{ticket.subject}</h3>
            <p className="text-sm text-slate-500">{ticket.customer}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">SLA Status</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${status.bg} ${status.text}`}>
                <StatusIcon className="h-3 w-3" />
                {status.label}
              </span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Response Time</p>
              <p className="font-medium">{ticket.responseTime}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Created</p>
              <p className="font-medium">{ticket.created}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Due</p>
              <p className="font-medium">{ticket.due}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Assigned Agent</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs">
                  {ticket.agent.charAt(0)}
                </div>
                <span className="text-sm">{ticket.agent}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">View Full Ticket</Button>
            <Button variant="outline">Assign</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SLAPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPriority, setExpandedPriority] = useState<string[]>(["High", "Medium", "Low"]);
  const [selectedTicket, setSelectedTicket] = useState<typeof slaTickets[0] | null>(null);

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

  const togglePriorityFilter = (priority: string) => {
    setPriorityFilter(priorityFilter === priority ? null : priority);
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(statusFilter === status ? null : status);
  };

  const togglePrioritySection = (priority: string) => {
    setExpandedPriority(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  const filteredTickets = slaTickets.filter(ticket => {
    const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const matchesSearch = !searchQuery || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.agent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesStatus && matchesSearch;
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
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
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <CardTitle className="text-lg">SLA Tickets</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Priority Quick Filters */}
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 mr-1">Priority:</span>
                      <Button
                        variant={priorityFilter === "high" ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePriorityFilter("high")}
                        className={`h-7 text-xs ${priorityFilter === "high" ? "bg-red-500 hover:bg-red-600" : ""}`}
                      >
                        Critical
                      </Button>
                      <Button
                        variant={priorityFilter === "medium" ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePriorityFilter("medium")}
                        className={`h-7 text-xs ${priorityFilter === "medium" ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                      >
                        Medium
                      </Button>
                      <Button
                        variant={priorityFilter === "low" ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePriorityFilter("low")}
                        className={`h-7 text-xs ${priorityFilter === "low" ? "bg-green-500 hover:bg-green-600" : ""}`}
                      >
                        Low
                      </Button>
                    </div>

                    {/* Status Quick Filters */}
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 mr-1">Status:</span>
                      <Button
                        variant={statusFilter === "on_track" ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleStatusFilter("on_track")}
                        className={`h-7 text-xs gap-1 ${statusFilter === "on_track" ? "bg-green-500 hover:bg-green-600" : ""}`}
                      >
                        <CheckCircle className="h-3 w-3" /> On Track
                      </Button>
                      <Button
                        variant={statusFilter === "at_risk" ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleStatusFilter("at_risk")}
                        className={`h-7 text-xs gap-1 ${statusFilter === "at_risk" ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                      >
                        <AlertTriangle className="h-3 w-3" /> At Risk
                      </Button>
                      <Button
                        variant={statusFilter === "breached" ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleStatusFilter("breached")}
                        className={`h-7 text-xs gap-1 ${statusFilter === "breached" ? "bg-red-500 hover:bg-red-600" : ""}`}
                      >
                        <XCircle className="h-3 w-3" /> Breached
                      </Button>
                    </div>

                    {/* Clear Filters */}
                    {(priorityFilter || statusFilter) && (
                      <Button variant="ghost" size="sm" onClick={() => { setPriorityFilter(null); setStatusFilter(null); }} className="h-7 text-xs">
                        <X className="h-3 w-3 mr-1" /> Clear
                      </Button>
                    )}

                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                      <Input 
                        placeholder="Search tickets..." 
                        className="w-64 pl-9 h-7 text-xs" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Filter Results Summary */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FileText className="h-4 w-4" />
                    <span>Showing <span className="font-medium text-slate-700 dark:text-slate-300">{sortedTickets.length}</span> of <span className="font-medium text-slate-700 dark:text-slate-300">{slaTickets.length}</span> tickets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(priorityFilter || statusFilter || searchQuery) && (
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-slate-500">Active filters:</span>
                        {priorityFilter && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                            {priorityFilter === 'high' ? 'Critical' : priorityFilter}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => setPriorityFilter(null)} />
                          </span>
                        )}
                        {statusFilter && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full">
                            {statusConfig[statusFilter]?.label}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter(null)} />
                          </span>
                        )}
                        {searchQuery && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                            "{searchQuery}"
                            <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("id")}>
                          <div className="flex items-center gap-1">Ticket {sortField === "id" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Subject</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-purple-600" onClick={() => handleSort("priority")}>
                          <div className="flex items-center gap-1">Priority {sortField === "priority" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Customer</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Due</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-purple-600" onClick={() => handleSort("status")}>
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
                          <tr 
                            key={ticket.id} 
                            className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <td className="py-3 px-4 font-medium text-purple-600">{ticket.id}</td>
                            <td className="py-3 px-4">{ticket.subject}</td>
                            <td className="py-3 px-4">
                              <span 
                                className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:ring-2 hover:ring-offset-1 transition-all ${priorityColors[ticket.priority]} ${priorityFilter === ticket.priority ? 'ring-2 ring-purple-500' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePriorityFilter(ticket.priority);
                                }}
                              >
                                {ticket.priority === 'high' ? 'Critical' : ticket.priority}
                              </span>
                            </td>
                            <td className="py-3 px-4">{ticket.customer}</td>
                            <td className="py-3 px-4 text-sm">{ticket.due}</td>
                            <td className="py-3 px-4">
                              <span 
                                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit cursor-pointer hover:ring-2 hover:ring-offset-1 transition-all ${status.bg} ${status.text} ${statusFilter === ticket.status ? 'ring-2 ring-purple-500' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStatusFilter(ticket.status);
                                }}
                              >
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
                            <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => setSelectedTicket(ticket)}>View details</DropdownMenuItem>
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
                <div className="grid grid-cols-1 gap-4">
                  {slaByPriority.map((item) => (
                    <div key={item.priority} className="rounded-xl border overflow-hidden">
                      {/* Collapsible Header */}
                      <div 
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => togglePrioritySection(item.priority)}
                      >
                        <div className="flex items-center gap-4">
                          {expandedPriority.includes(item.priority) ? (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[item.priority.toLowerCase()]}`}>
                            {item.priority}
                          </span>
                          <span className="text-sm text-slate-500">{item.total} tickets</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Target: {item.target}%</span>
                          <span className={`text-2xl font-bold ${item.rate >= item.target ? 'text-green-600' : 'text-red-600'}`}>{item.rate}%</span>
                        </div>
                      </div>
                      
                      {/* Collapsible Content */}
                      {expandedPriority.includes(item.priority) && (
                        <div className="p-4 border-t">
                          <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
                            <div 
                              className={`h-full rounded-full ${item.rate >= item.target ? 'bg-green-500' : 'bg-red-500'}`}
                              style={{ width: `${Math.min(item.rate, 100)}%` }}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                              <p className="text-2xl font-bold">{item.total}</p>
                              <p className="text-xs text-slate-500">Total</p>
                            </div>
                            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                              <p className="text-2xl font-bold text-green-600">{item.met}</p>
                              <p className="text-xs text-slate-500">SLA Met</p>
                            </div>
                            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                              <p className="text-2xl font-bold text-red-600">{item.total - item.met}</p>
                              <p className="text-xs text-slate-500">Breached</p>
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

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <TicketDetailModal 
            ticket={selectedTicket} 
            onClose={() => setSelectedTicket(null)} 
          />
        )}
      </div>
    </DashboardLayout>
  );
}
