"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, MoreHorizontal, Mail, Phone } from "lucide-react";

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

export default function AgentsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
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
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Online Now</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Teams</p>
              <p className="text-2xl font-bold">4</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Avg. Rating</p>
              <p className="text-2xl font-bold">4.5</p>
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
                <Input placeholder="Search agents..." className="pl-10" />
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
                  {agents.map((agent) => (
                    <tr key={agent.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
                            {agent.name.charAt(0)}
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
                      <td className="py-3 px-4">{agent.rating}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
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
