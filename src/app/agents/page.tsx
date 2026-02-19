"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Mail, Phone, Eye, Edit, Trash2, ArrowLeft, Star, Ticket, Clock, X } from "lucide-react";

const initialAgents = [
  { id: 1, name: "Sarah Mitchell", role: "Senior Support Lead", email: "sarah@company.com", phone: "+1 555-1001", status: "online", tickets: 45, rating: 4.8, joined: "2024-06-15", resolved: 312 },
  { id: 2, name: "John Davidson", role: "Support Agent", email: "john@company.com", phone: "+1 555-1002", status: "online", tickets: 38, rating: 4.5, joined: "2024-09-01", resolved: 245 },
  { id: 3, name: "Emily Roberts", role: "Support Agent", email: "emily@company.com", phone: "+1 555-1003", status: "away", tickets: 32, rating: 4.3, joined: "2025-01-10", resolved: 189 },
  { id: 4, name: "Mike Thompson", role: "Junior Agent", email: "mike@company.com", phone: "+1 555-1004", status: "offline", tickets: 28, rating: 3.9, joined: "2025-06-20", resolved: 102 },
  { id: 5, name: "Lisa Anderson", role: "Support Agent", email: "lisa@company.com", phone: "+1 555-1005", status: "online", tickets: 35, rating: 4.6, joined: "2024-11-12", resolved: 267 },
];

const teams = [
  { id: 1, name: "Tier 1 Support", members: 5, lead: "Sarah Mitchell", active: true },
  { id: 2, name: "Tier 2 Support", members: 3, lead: "John Davidson", active: true },
  { id: 3, name: "Billing Team", members: 2, lead: "Emily Roberts", active: true },
];

type Agent = typeof initialAgents[0];

const statusColorMap: Record<string, string> = {
  online: "bg-green-500",
  away: "bg-amber-500",
  offline: "bg-slate-400",
};

export default function AgentsPage() {
  const [mounted, setMounted] = useState(false);
  const [agents, setAgents] = useState(initialAgents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [editAgent, setEditAgent] = useState<Agent | null>(null);
  const [editForm, setEditForm] = useState({ name: "", role: "", email: "", phone: "", status: "" });

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filteredAgents = agents.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEdit = (agent: Agent) => {
    setEditAgent(agent);
    setEditForm({ name: agent.name, role: agent.role, email: agent.email, phone: agent.phone, status: agent.status });
  };

  const saveEdit = () => {
    if (!editAgent) return;
    setAgents(prev => prev.map(a => a.id === editAgent.id ? { ...a, ...editForm } : a));
    if (selectedAgent?.id === editAgent.id) setSelectedAgent({ ...editAgent, ...editForm });
    setEditAgent(null);
  };

  const deleteAgent = (id: number) => {
    if (confirm("Are you sure you want to remove this agent?")) {
      setAgents(prev => prev.filter(a => a.id !== id));
      if (selectedAgent?.id === id) setSelectedAgent(null);
    }
  };

  // Agent detail view
  if (selectedAgent) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <Button variant="ghost" onClick={() => setSelectedAgent(null)} className="gap-2 mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Agents
          </Button>
          <div className="flex flex-col lg:flex-row gap-6">
            <Card className="bg-white dark:bg-[#1a1a1a] lg:w-96">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                      {selectedAgent.name.charAt(0)}
                    </div>
                    <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${statusColorMap[selectedAgent.status]}`} />
                  </div>
                  <h2 className="text-xl font-bold mt-4">{selectedAgent.name}</h2>
                  <p className="text-sm text-slate-500">{selectedAgent.role}</p>
                  <Badge variant={selectedAgent.status === "online" ? "default" : "secondary"} className={`mt-2 ${selectedAgent.status === "online" ? "bg-green-500" : ""}`}>
                    {selectedAgent.status}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm"><Mail className="h-4 w-4 text-slate-400" />{selectedAgent.email}</div>
                  <div className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-slate-400" />{selectedAgent.phone}</div>
                  <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-slate-400" />Joined {selectedAgent.joined}</div>
                </div>
                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700" onClick={() => openEdit(selectedAgent)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit Agent
                </Button>
              </CardContent>
            </Card>
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-white dark:bg-[#1a1a1a]">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-50"><Ticket className="h-5 w-5 text-blue-600" /></div>
                      <div>
                        <p className="text-sm text-slate-500">Open Tickets</p>
                        <p className="text-xl font-bold">{selectedAgent.tickets}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-[#1a1a1a]">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-green-50"><Star className="h-5 w-5 text-green-600" /></div>
                      <div>
                        <p className="text-sm text-slate-500">Rating</p>
                        <p className="text-xl font-bold">{selectedAgent.rating} / 5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-[#1a1a1a]">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-50"><Ticket className="h-5 w-5 text-purple-600" /></div>
                      <div>
                        <p className="text-sm text-slate-500">Resolved</p>
                        <p className="text-xl font-bold">{selectedAgent.resolved}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardHeader><CardTitle className="text-lg">Performance</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1"><span>Resolution Rate</span><span className="font-medium">92%</span></div>
                      <div className="h-2 bg-slate-100 rounded-full"><div className="h-2 bg-green-500 rounded-full" style={{ width: "92%" }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1"><span>First Response Time</span><span className="font-medium">~15 min</span></div>
                      <div className="h-2 bg-slate-100 rounded-full"><div className="h-2 bg-blue-500 rounded-full" style={{ width: "85%" }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1"><span>Customer Satisfaction</span><span className="font-medium">{selectedAgent.rating}/5</span></div>
                      <div className="h-2 bg-slate-100 rounded-full"><div className="h-2 bg-purple-500 rounded-full" style={{ width: `${(selectedAgent.rating / 5) * 100}%` }} /></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Edit Agent Dialog */}
        <Dialog open={!!editAgent} onOpenChange={(open) => !open && setEditAgent(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Agent — {editAgent?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input value={editForm.role} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editForm.status} onValueChange={v => setEditForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="away">Away</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditAgent(null)}>Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={saveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Team / Agents & Teams</div>
            <h1 className="text-2xl font-bold">Agents & Teams</h1>
            <p className="text-slate-500 text-sm">Manage your support team members</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" /> Add Agent
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
              <p className="text-sm text-slate-500">Teams</p>
              <p className="text-2xl font-bold">{teams.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Avg. Rating</p>
              <p className="text-2xl font-bold">{(agents.reduce((s, a) => s + a.rating, 0) / agents.length).toFixed(1)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Agents Table */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardHeader>
            <CardTitle className="text-lg">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search agents..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Agent</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Tickets</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map((agent) => (
                    <tr key={agent.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedAgent(agent)}>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
                              {agent.name.charAt(0)}
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${statusColorMap[agent.status]}`} />
                          </div>
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            <p className="text-sm text-slate-500">{agent.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{agent.role}</td>
                      <td className="py-3 px-4">
                        <Badge variant={agent.status === "online" ? "default" : "secondary"} className={agent.status === "online" ? "bg-green-500" : ""}>
                          {agent.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{agent.tickets}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          {agent.rating}
                        </div>
                      </td>
                      <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedAgent(agent)}>
                              <Eye className="h-4 w-4 mr-2" /> View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEdit(agent)}>
                              <Edit className="h-4 w-4 mr-2" /> Edit Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `mailto:${agent.email}`}>
                              <Mail className="h-4 w-4 mr-2" /> Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => deleteAgent(agent.id)}>
                              <Trash2 className="h-4 w-4 mr-2" /> Remove Agent
                            </DropdownMenuItem>
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
