"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonTableRow } from "@/components/ui/skeleton";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Plus, MoreHorizontal, Mail, Phone, Star, Clock, MessageSquare, Edit, Trash2, UserPlus, Bell, 
  Calendar, TrendingUp, Activity, CheckCircle, XCircle, AlertCircle 
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts";

const agents = [
  { 
    id: 1, name: "Sarah Mitchell", role: "Senior Support Lead", email: "sarah@company.com", phone: "+1 234 567 890", 
    status: "online", tickets: 45, rating: 4.8, joined: "Jan 2024",
    available: true,
    skills: ["Technical Support", "Billing", "Escalation", "Training"],
    performance: [
      { month: "Aug", tickets: 42, resolved: 40, avgTime: 12 },
      { month: "Sep", tickets: 48, resolved: 46, avgTime: 10 },
      { month: "Oct", tickets: 45, resolved: 44, avgTime: 11 },
      { month: "Nov", tickets: 52, resolved: 50, avgTime: 9 },
      { month: "Dec", tickets: 45, resolved: 45, avgTime: 10 },
      { month: "Jan", tickets: 45, resolved: 44, avgTime: 8 },
    ]
  },
  { 
    id: 2, name: "John Davidson", role: "Support Agent", email: "john@company.com", phone: "+1 234 567 891", 
    status: "online", tickets: 38, rating: 4.5, joined: "Mar 2024",
    available: true,
    skills: ["Technical Support", "Customer Relations"],
    performance: [
      { month: "Aug", tickets: 30, resolved: 28, avgTime: 15 },
      { month: "Sep", tickets: 35, resolved: 33, avgTime: 14 },
      { month: "Oct", tickets: 38, resolved: 36, avgTime: 13 },
      { month: "Nov", tickets: 40, resolved: 38, avgTime: 12 },
      { month: "Dec", tickets: 35, resolved: 34, avgTime: 14 },
      { month: "Jan", tickets: 38, resolved: 37, avgTime: 11 },
    ]
  },
  { 
    id: 3, name: "Emily Roberts", role: "Support Agent", email: "emily@company.com", phone: "+1 234 567 892", 
    status: "away", tickets: 32, rating: 4.3, joined: "May 2024",
    available: false,
    skills: ["Billing", "Technical Support", "Documentation"],
    performance: [
      { month: "Aug", tickets: 25, resolved: 23, avgTime: 18 },
      { month: "Sep", tickets: 28, resolved: 26, avgTime: 16 },
      { month: "Oct", tickets: 30, resolved: 28, avgTime: 15 },
      { month: "Nov", tickets: 32, resolved: 30, avgTime: 14 },
      { month: "Dec", tickets: 30, resolved: 29, avgTime: 15 },
      { month: "Jan", tickets: 32, resolved: 31, avgTime: 13 },
    ]
  },
  { 
    id: 4, name: "Mike Thompson", role: "Junior Agent", email: "mike@company.com", phone: "+1 234 567 893", 
    status: "offline", tickets: 28, rating: 3.9, joined: "Jul 2024",
    available: false,
    skills: ["Technical Support", "Chat Support"],
    performance: [
      { month: "Aug", tickets: 20, resolved: 18, avgTime: 22 },
      { month: "Sep", tickets: 22, resolved: 20, avgTime: 20 },
      { month: "Oct", tickets: 25, resolved: 23, avgTime: 18 },
      { month: "Nov", tickets: 27, resolved: 25, avgTime: 17 },
      { month: "Dec", tickets: 25, resolved: 24, avgTime: 18 },
      { month: "Jan", tickets: 28, resolved: 27, avgTime: 15 },
    ]
  },
  { 
    id: 5, name: "Lisa Anderson", role: "Support Agent", email: "lisa@company.com", phone: "+1 234 567 894", 
    status: "online", tickets: 35, rating: 4.6, joined: "Feb 2024",
    available: true,
    skills: ["Escalation", "Billing", "Technical Support", "Product Knowledge"],
    performance: [
      { month: "Aug", tickets: 32, resolved: 30, avgTime: 14 },
      { month: "Sep", tickets: 35, resolved: 33, avgTime: 12 },
      { month: "Oct", tickets: 38, resolved: 36, avgTime: 11 },
      { month: "Nov", tickets: 40, resolved: 38, avgTime: 10 },
      { month: "Dec", tickets: 35, resolved: 34, avgTime: 11 },
      { month: "Jan", tickets: 35, resolved: 34, avgTime: 10 },
    ]
  },
];

const activityLog = [
  { id: 1, agent: "Sarah Mitchell", action: "Ticket resolved", detail: "Ticket #1234 - Technical issue", time: "2 mins ago", type: "success" },
  { id: 2, agent: "John Davidson", action: "Agent went online", detail: "Now available for tickets", time: "15 mins ago", type: "info" },
  { id: 3, agent: "Emily Roberts", action: "Status changed", detail: "Set to Away - On break", time: "30 mins ago", type: "warning" },
  { id: 4, agent: "Lisa Anderson", action: "Ticket escalated", detail: "Escalated to Senior Support", time: "1 hour ago", type: "info" },
  { id: 5, agent: "Mike Thompson", action: "Agent went offline", detail: "End of shift", time: "2 hours ago", type: "default" },
  { id: 6, agent: "Sarah Mitchell", action: "Performance milestone", detail: "50 tickets this week", time: "3 hours ago", type: "success" },
];

export default function AgentsPage() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [availability, setAvailability] = useState<Record<number, boolean>>({});

  useEffect(() => { 
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 800);
    const initialAvailability: Record<number, boolean> = {};
    agents.forEach(a => { initialAvailability[a.id] = a.available; });
    setAvailability(initialAvailability);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
          <SkeletonTable columns={6} rows={5} />
        </div>
      </DashboardLayout>
    );
  }

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAvailability = (agentId: number) => {
    setAvailability(prev => ({ ...prev, [agentId]: !prev[agentId] }));
    const agent = agents.find(a => a.id === agentId);
    toast({
      title: availability[agentId] ? "Agent set to unavailable" : "Agent set to available",
      description: `${agent?.name} is now ${availability[agentId] ? 'unavailable' : 'available'} for new tickets`,
      variant: availability[agentId] ? "warning" : "success"
    });
  };

  const openAgentProfile = (agent: typeof agents[0]) => {
    setSelectedAgent(agent);
    setIsProfileOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Team / Agents & Teams</div>
            <h1 className="text-2xl font-bold">Agents & Teams</h1>
            <p className="text-slate-500 text-sm">Manage your support team members</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast({ title: "Notifications enabled", description: "You'll receive agent activity alerts", variant: "info" })}>
              <Bell className="h-4 w-4" />
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
              <UserPlus className="h-4 w-4" /> Add Agent
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Total Agents</p>
              <p className="text-2xl font-bold">{agents.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Online Now</p>
              <p className="text-2xl font-bold text-green-600">{agents.filter(a => a.status === "online").length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Avg. Rating</p>
              <p className="text-2xl font-bold flex items-center gap-1">
                {agents.reduce((sum, a) => sum + a.rating, 0) / agents.length}
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Total Tickets</p>
              <p className="text-2xl font-bold">{agents.reduce((sum, a) => sum + a.tickets, 0)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="agents" className="space-y-4">
          <TabsList className="bg-slate-100 dark:bg-slate-800">
            <TabsTrigger value="agents" className="gap-2">
              <UserPlus className="h-4 w-4" /> Agents
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <TrendingUp className="h-4 w-4" /> Performance
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="h-4 w-4" /> Activity Log
            </TabsTrigger>
          </TabsList>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-4">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search agents..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Agents Grid with Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAgents.map((agent) => (
                <Card 
                  key={agent.id} 
                  className="bg-white dark:bg-[#1a1a1a] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => openAgentProfile(agent)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                            agent.status === 'online' ? 'bg-green-500' : 
                            agent.status === 'away' ? 'bg-amber-500' : 'bg-slate-400'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-purple-600 transition-colors">{agent.name}</h3>
                          <p className="text-sm text-slate-500">{agent.role}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openAgentProfile(agent); }}>
                            <UserPlus className="h-4 w-4 mr-2" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedAgent(agent); setIsEditOpen(true); }}>
                            <Edit className="h-4 w-4 mr-2" /> Edit Agent
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" /> Assign Tickets
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {/* Skills/Tags */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {agent.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                            {skill}
                          </Badge>
                        ))}
                        {agent.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{agent.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Availability Toggle */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-500">Available</span>
                      </div>
                      <Switch 
                        checked={availability[agent.id] ?? agent.available}
                        onCheckedChange={() => toggleAvailability(agent.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{agent.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Phone className="h-4 w-4" />
                        <span>{agent.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="font-semibold">{agent.tickets}</p>
                          <p className="text-xs text-slate-500">Tickets</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold flex items-center gap-1">
                            {agent.rating}
                            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                          </p>
                          <p className="text-xs text-slate-500">Rating</p>
                        </div>
                      </div>
                      <Badge className={`${
                        agent.status === 'online' ? 'bg-green-100 text-green-700' : 
                        agent.status === 'away' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {agent.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ticket Resolution Chart */}
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardHeader>
                  <CardTitle className="text-lg">Ticket Resolution Trend</CardTitle>
                  <p className="text-sm text-slate-500">Tickets resolved over the last 6 months</p>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={agents[0].performance}>
                        <defs>
                          <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255,255,255,0.95)', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="resolved" 
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorResolved)" 
                          name="Resolved"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Average Response Time Chart */}
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardHeader>
                  <CardTitle className="text-lg">Average Response Time</CardTitle>
                  <p className="text-sm text-slate-500">Response time in minutes</p>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={agents[0].performance}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255,255,255,0.95)', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="avgTime" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Avg Time (min)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Agent Performance Comparison */}
              <Card className="bg-white dark:bg-[#1a1a1a] lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Agent Performance Comparison</CardTitle>
                  <p className="text-sm text-slate-500">Monthly tickets handled by each agent</p>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255,255,255,0.95)', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px'
                          }}
                        />
                        <Line type="monotone" data={agents[0].performance} dataKey="resolved" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} name="Sarah" />
                        <Line type="monotone" data={agents[1].performance} dataKey="resolved" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="John" />
                        <Line type="monotone" data={agents[2].performance} dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Emily" />
                        <Line type="monotone" data={agents[4].performance} dataKey="resolved" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Lisa" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">Recent Agent Activity</CardTitle>
                <p className="text-sm text-slate-500">Latest actions and events from your team</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLog.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className={`mt-1 p-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                        activity.type === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                        activity.type === 'info' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                      }`}>
                        {activity.type === 'success' ? <CheckCircle className="h-4 w-4" /> :
                         activity.type === 'warning' ? <AlertCircle className="h-4 w-4" /> :
                         activity.type === 'info' ? <Activity className="h-4 w-4" /> :
                         <Clock className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium">{activity.agent}</p>
                          <span className="text-xs text-slate-500">{activity.time}</span>
                        </div>
                        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">{activity.action}</p>
                        <p className="text-sm text-slate-500">{activity.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Agent Profile Dialog */}
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="max-w-md">
            {selectedAgent && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-xl">
                        {selectedAgent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 ${
                        selectedAgent.status === 'online' ? 'bg-green-500' : 
                        selectedAgent.status === 'away' ? 'bg-amber-500' : 'bg-slate-400'
                      }`} />
                    </div>
                    <div>
                      <DialogTitle className="text-xl">{selectedAgent.name}</DialogTitle>
                      <p className="text-slate-500">{selectedAgent.role}</p>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  {/* Skills in Profile */}
                  <div>
                    <p className="text-sm font-medium mb-2">Skills & Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Availability Toggle in Profile */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium">Availability</span>
                    </div>
                    <Switch 
                      checked={availability[selectedAgent.id] ?? selectedAgent.available}
                      onCheckedChange={() => toggleAvailability(selectedAgent.id)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
                      <p className="text-2xl font-bold">{selectedAgent.tickets}</p>
                      <p className="text-sm text-slate-500">Tickets</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
                      <p className="text-2xl font-bold flex items-center justify-center gap-1">
                        {selectedAgent.rating}
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      </p>
                      <p className="text-sm text-slate-500">Rating</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span>{selectedAgent.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{selectedAgent.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>Joined {selectedAgent.joined}</span>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsProfileOpen(false)}>Close</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                    <MessageSquare className="h-4 w-4" /> Message
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Agent Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Agent</DialogTitle>
            </DialogHeader>
            {selectedAgent && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue={selectedAgent.name} />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input defaultValue={selectedAgent.role} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={selectedAgent.email} type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue={selectedAgent.phone} />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsEditOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
