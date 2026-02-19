"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonTableRow } from "@/components/ui/skeleton";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Mail, Phone, Star, Clock, MessageSquare, Edit, Trash2, UserPlus } from "lucide-react";

const agents = [
  { id: 1, name: "Sarah Mitchell", role: "Senior Support Lead", email: "sarah@company.com", phone: "+1 234 567 890", status: "online", tickets: 45, rating: 4.8, joined: "Jan 2024" },
  { id: 2, name: "John Davidson", role: "Support Agent", email: "john@company.com", phone: "+1 234 567 891", status: "online", tickets: 38, rating: 4.5, joined: "Mar 2024" },
  { id: 3, name: "Emily Roberts", role: "Support Agent", email: "emily@company.com", phone: "+1 234 567 892", status: "away", tickets: 32, rating: 4.3, joined: "May 2024" },
  { id: 4, name: "Mike Thompson", role: "Junior Agent", email: "mike@company.com", phone: "+1 234 567 893", status: "offline", tickets: 28, rating: 3.9, joined: "Jul 2024" },
  { id: 5, name: "Lisa Anderson", role: "Support Agent", email: "lisa@company.com", phone: "+1 234 567 894", status: "online", tickets: 35, rating: 4.6, joined: "Feb 2024" },
];

export default function AgentsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => { 
    setMounted(true);
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  if (!mounted) return null;

  // Loading skeleton
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
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
            <UserPlus className="h-4 w-4" /> Add Agent
          </Button>
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

        {/* Agents Grid */}
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
