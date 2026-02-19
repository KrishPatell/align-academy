"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Filter, ChevronDown, ChevronUp, Clock, AlertTriangle, CheckCircle, XCircle, MoreHorizontal, Eye, MessageSquare, Calendar, User, ArrowRight } from "lucide-react";

const slaMetrics = {
  overall: 94.2,
  firstResponse: 96.5,
  resolution: 91.8,
  breached: 12,
  atRisk: 8,
  onTrack: 156,
};

const tickets = [
  { id: "TKT-001", title: "Login issues on mobile app", priority: "Critical", status: "on_track", client: "Acme Corp", agent: "Sarah M.", due: "2h", created: "2h ago" },
  { id: "TKT-002", title: "Payment processing error", priority: "High", status: "at_risk", client: "TechStart", agent: "John D.", due: "1h", created: "3h ago" },
  { id: "TKT-003", title: "API rate limit exceeded", priority: "High", status: "on_track", client: "Global Media", agent: "Emily R.", due: "4h", created: "5h ago" },
  { id: "TKT-004", title: "Cannot export reports", priority: "Medium", status: "breached", client: "StartupXYZ", agent: "Mike T.", due: "Overdue", created: "1d ago" },
  { id: "TKT-005", title: "Feature request: Dark mode", priority: "Low", status: "on_track", client: "DataFlow", agent: "Lisa A.", due: "2d", created: "2d ago" },
  { id: "TKT-006", title: "Integration not working", priority: "High", status: "at_risk", client: "Acme Corp", agent: "Sarah M.", due: "30m", created: "4h ago" },
];

const priorityBreakdown = [
  { priority: "Critical", total: 12, onTrack: 8, atRisk: 3, breached: 1, avgTime: "45m" },
  { priority: "High", total: 34, onTrack: 22, atRisk: 8, breached: 4, avgTime: "2h" },
  { priority: "Medium", total: 89, onTrack: 68, atRisk: 15, breached: 6, avgTime: "4h" },
  { priority: "Low", total: 41, onTrack: 38, atRisk: 2, breached: 1, avgTime: "8h" },
];

export default function SLAPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [expandedPriority, setExpandedPriority] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "all" || t.priority.toLowerCase() === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const openTicketDetail = (ticket: typeof tickets[0]) => {
    setSelectedTicket(ticket);
    setIsDetailOpen(true);
  };

  const statusConfig = {
    on_track: { color: "bg-green-500", icon: CheckCircle, label: "On Track" },
    at_risk: { color: "bg-amber-500", icon: AlertTriangle, label: "At Risk" },
    breached: { color: "bg-red-500", icon: XCircle, label: "Breached" },
  };

  const priorityColors: Record<string, string> = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-blue-100 text-blue-700",
    Low: "bg-slate-100 text-slate-700",
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Analytics / SLA Compliance</div>
            <h1 className="text-2xl font-bold">SLA Compliance</h1>
            <p className="text-slate-500 text-sm">Track service level agreement performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Overall SLA</p>
              <p className="text-2xl font-bold text-green-600">{slaMetrics.overall}%</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">First Response</p>
              <p className="text-2xl font-bold text-blue-600">{slaMetrics.firstResponse}%</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Resolution</p>
              <p className="text-2xl font-bold text-purple-600">{slaMetrics.resolution}%</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Breached</p>
              <p className="text-2xl font-bold text-red-600">{slaMetrics.breached}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">At Risk</p>
              <p className="text-2xl font-bold text-amber-600">{slaMetrics.atRisk}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">On Track</p>
              <p className="text-2xl font-bold text-green-600">{slaMetrics.onTrack}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">SLA Tickets</TabsTrigger>
            <TabsTrigger value="priority">By Priority</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">SLA Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-end justify-between gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full h-32 flex items-end gap-1">
                        <div className="flex-1 bg-purple-500 rounded-t-md" style={{ height: `${70 + Math.random() * 30}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="mt-4 space-y-4">
            {/* Search & Filter */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search tickets..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {["all", "critical", "high", "medium", "low"].map((p) => (
                  <Button 
                    key={p}
                    variant={priorityFilter === p ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setPriorityFilter(p)}
                    className={priorityFilter === p ? "bg-purple-600" : ""}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tickets Table */}
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Ticket</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Priority</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Client</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Agent</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Due</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map((ticket) => {
                        const status = statusConfig[ticket.status as keyof typeof statusConfig];
                        const StatusIcon = status.icon;
                        return (
                          <tr 
                            key={ticket.id} 
                            className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                            onClick={() => openTicketDetail(ticket)}
                          >
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium">{ticket.id}</p>
                                <p className="text-sm text-slate-500 truncate max-w-xs">{ticket.title}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={priorityColors[ticket.priority as keyof typeof priorityColors]}>
                                {ticket.priority}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <StatusIcon className={`h-4 w-4 ${status.color}`} />
                                <span className="text-sm">{status.label}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-600">{ticket.client}</td>
                            <td className="py-3 px-4 text-slate-600">{ticket.agent}</td>
                            <td className="py-3 px-4">
                              <span className={ticket.due === "Overdue" ? "text-red-600 font-medium" : ""}>
                                {ticket.due}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
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

          <TabsContent value="priority" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {priorityBreakdown.map((item, idx) => (
                <Card 
                  key={idx} 
                  className="bg-white dark:bg-[#1a1a1a] cursor-pointer transition-all hover:shadow-lg"
                  onClick={() => setExpandedPriority(expandedPriority === item.priority ? null : item.priority)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={priorityColors[item.priority as keyof typeof priorityColors]}>
                        {item.priority}
                      </Badge>
                      {expandedPriority === item.priority ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                    <p className="text-3xl font-bold mb-1">{item.total}</p>
                    <p className="text-sm text-slate-500">tickets</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">On Track</span>
                        <span className="font-medium text-green-600">{item.onTrack}</span>
                      </div>
                      <Progress value={(item.onTrack / item.total) * 100} className="h-2" />
                    </div>

                    {expandedPriority === item.priority && (
                      <div className="mt-4 pt-4 border-t space-y-3 animate-fade-in">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">At Risk</span>
                          <span className="font-medium text-amber-600">{item.atRisk}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Breached</span>
                          <span className="font-medium text-red-600">{item.breached}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Avg. Time</span>
                          <span className="font-medium">{item.avgTime}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Ticket Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl">
            {selectedTicket && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <Badge className={priorityColors[selectedTicket.priority as keyof typeof priorityColors]}>
                      {selectedTicket.priority}
                    </Badge>
                    <DialogTitle>{selectedTicket.id}</DialogTitle>
                  </div>
                </DialogHeader>
                
                <div className="py-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedTicket.title}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-500">Client</span>
                      </div>
                      <p className="font-medium">{selectedTicket.client}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-500">Agent</span>
                      </div>
                      <p className="font-medium">{selectedTicket.agent}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-500">Due In</span>
                      </div>
                      <p className="font-medium">{selectedTicket.due}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-500">Created</span>
                      </div>
                      <p className="font-medium">{selectedTicket.created}</p>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                    <MessageSquare className="h-4 w-4" /> Reply
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
