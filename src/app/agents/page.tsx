"use client";

import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, MoreHorizontal, Mail, Phone, Eye, Edit, Ticket, Trash2, ChevronDown } from "lucide-react";

const agents = [
  { id: 1, name: "Sarah Mitchell", role: "Senior Support Lead", email: "sarah@company.com", status: "online", tickets: 45, rating: 4.8 },
  { id: 2, name: "John Davidson", role: "Support Agent", email: "john@company.com", status: "online", tickets: 38, rating: 4.5 },
  { id: 3, name: "Emily Roberts", role: "Support Agent", email: "emily@company.com", status: "away", tickets: 32, rating: 4.3 },
  { id: 4, name: "Mike Thompson", role: "Junior Agent", email: "mike@company.com", status: "offline", tickets: 28, rating: 3.9 },
  { id: 5, name: "Lisa Anderson", role: "Support Agent", email: "lisa@company.com", status: "online", tickets: 35, rating: 4.6 },
];

const teams = [
  { id: 1, name: "Tier 1 Support", members: 5, lead: "Sarah Mitchell", active: true },
  { id: 2, name: "Tier 2 Support", members: 3, lead: "John Davidson", active: true },
  { id: 3, name: "Billing Team", members: 2, lead: "Emily Roberts", active: true },
];

function DropdownMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block">
      {children}
    </div>
  );
}

function DropdownMenuTrigger({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function DropdownMenuContent({ align = "end", children, onClose }: { align?: "start" | "end" | "center"; children: React.ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={`absolute z-50 min-w-[180px] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e1e1e] shadow-xl animate-in fade-in zoom-in-95 duration-200 ${
        align === "end" ? "right-0" : align === "start" ? "left-0" : "left-1/2 -translate-x-1/2"
      } top-full mt-2`}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

function DropdownMenuItem({ icon: Icon, label, danger, onClick }: { icon: React.ElementType; label: string; danger?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-150 ${
        danger 
          ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" 
          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
      }`}
    >
      <Icon className={`h-4 w-4 ${danger ? "text-red-500" : "text-slate-400"}`} />
      <span className="font-medium">{label}</span>
    </button>
  );
}

function DropdownMenuSeparator() {
  return <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />;
}

interface AgentRowProps {
  agent: typeof agents[0];
  onViewProfile: (agent: typeof agents[0]) => void;
  onEdit: (agent: typeof agents[0]) => void;
  onAssignTickets: (agent: typeof agents[0]) => void;
  onRemove: (agent: typeof agents[0]) => void;
}

function AgentRow({ agent, onViewProfile, onEdit, onAssignTickets, onRemove }: AgentRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleRowClick = () => {
    onViewProfile(agent);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <tr 
      onClick={handleRowClick}
      className="border-b border-slate-100 dark:border-slate-800 cursor-pointer group hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300"
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
            {agent.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">{agent.name}</p>
            <p className="text-sm text-slate-500">{agent.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{agent.role}</td>
      <td className="py-4 px-4">
        <Badge 
          variant={agent.status === "online" ? "default" : "secondary"} 
          className={`${
            agent.status === "online" 
              ? "bg-green-500 hover:bg-green-600 shadow-sm" 
              : agent.status === "away"
                ? "bg-amber-500 hover:bg-amber-600 shadow-sm"
                : "bg-slate-400 hover:bg-slate-500 shadow-sm"
          } text-white transition-all duration-200`}
        >
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${agent.status === "online" ? "bg-white" : "bg-white/70"}`} />
          {agent.status}
        </Badge>
      </td>
      <td className="py-4 px-4 font-medium text-slate-700 dark:text-slate-200">{agent.tickets}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1.5">
          <span className="text-amber-500">★</span>
          <span className="font-medium text-slate-700 dark:text-slate-200">{agent.rating}</span>
        </div>
      </td>
      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger onClick={handleMenuClick}>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          {menuOpen && (
            <DropdownMenuContent align="end" onClose={() => setMenuOpen(false)}>
              <DropdownMenuItem 
                icon={Eye} 
                label="View Profile" 
                onClick={() => { onViewProfile(agent); setMenuOpen(false); }} 
              />
              <DropdownMenuItem 
                icon={Edit} 
                label="Edit Agent" 
                onClick={() => { onEdit(agent); setMenuOpen(false); }} 
              />
              <DropdownMenuItem 
                icon={Ticket} 
                label="Assign Tickets" 
                onClick={() => { onAssignTickets(agent); setMenuOpen(false); }} 
              />
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                icon={Trash2} 
                label="Remove" 
                danger 
                onClick={() => { onRemove(agent); setMenuOpen(false); }} 
              />
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </td>
    </tr>
  );
}

export default function AgentsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleViewProfile = (agent: typeof agents[0]) => {
    console.log("View profile:", agent);
  };

  const handleEdit = (agent: typeof agents[0]) => {
    console.log("Edit agent:", agent);
  };

  const handleAssignTickets = (agent: typeof agents[0]) => {
    console.log("Assign tickets:", agent);
  };

  const handleRemove = (agent: typeof agents[0]) => {
    console.log("Remove agent:", agent);
  };

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Team / Agents & Teams</div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Agents & Teams</h1>
            <p className="text-slate-500 text-sm">Manage your support team members</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/25 hover:shadow-purple-700/30 transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" /> Add Agent
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Total Agents</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">12</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-green-200 dark:hover:border-green-800 transition-all duration-300">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Online Now</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Teams</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">4</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-300">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Avg. Rating</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">4.5</p>
            </CardContent>
          </Card>
        </div>

        {/* Agents Table */}
        <Card className="bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-slate-800 overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Team Members</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search agents..." 
                    className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="text-left py-3 px-4 font-semibold text-slate-500 text-sm">Agent</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-500 text-sm">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-500 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-500 text-sm">Tickets</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-500 text-sm">Rating</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-500 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <AgentRow 
                      key={agent.id} 
                      agent={agent}
                      onViewProfile={handleViewProfile}
                      onEdit={handleEdit}
                      onAssignTickets={handleAssignTickets}
                      onRemove={handleRemove}
                    />
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
