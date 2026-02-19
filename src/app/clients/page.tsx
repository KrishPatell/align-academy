"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Plus,
  Download,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ArrowLeft,
  Ticket,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialClientsData = [
  { id: "CL-001", name: "Umbrella Corp", email: "billing@umbrella.com", phone: "+1 555-0101", location: "Raccoon City, US", plan: "Enterprise", status: "active", spent: 52847, tickets: 12, joined: "2025-06-15" },
  { id: "CL-002", name: "Acme Corporation", email: "accounts@acme.com", phone: "+1 555-0102", location: "Arizona, US", plan: "Business", status: "active", spent: 48192, tickets: 8, joined: "2025-08-22" },
  { id: "CL-003", name: "Globex Inc", email: "finance@globex.com", phone: "+1 555-0103", location: "San Francisco, US", plan: "Business", status: "active", spent: 32041, tickets: 5, joined: "2025-10-01" },
  { id: "CL-004", name: "Initech", email: "ap@initech.com", phone: "+1 555-0104", location: "Austin, US", plan: "Pro", status: "active", spent: 29062, tickets: 15, joined: "2025-11-12" },
  { id: "CL-005", name: "Wayne Enterprises", email: "payments@wayne.com", phone: "+1 555-0105", location: "Gotham, US", plan: "Enterprise", status: "active", spent: 24593, tickets: 3, joined: "2025-09-05" },
  { id: "CL-006", name: "Stark Industries", email: "legal@stark.com", phone: "+1 555-0106", location: "Malibu, US", plan: "Enterprise", status: "active", spent: 18879, tickets: 7, joined: "2025-12-01" },
  { id: "CL-007", name: "Cyberdyne Systems", email: "info@cyberdyne.com", phone: "+1 555-0107", location: "Los Angeles, US", plan: "Business", status: "pending", spent: 0, tickets: 2, joined: "2026-02-10" },
  { id: "CL-008", name: "Oscorp", email: "contacts@oscorp.com", phone: "+1 555-0108", location: "New York, US", plan: "Pro", status: "inactive", spent: 8750, tickets: 20, joined: "2025-04-20" },
];

const planColors: Record<string, string> = {
  Enterprise: "bg-purple-100 text-purple-700",
  Business: "bg-blue-100 text-blue-700",
  Pro: "bg-green-100 text-green-700",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-slate-100 text-slate-700",
  pending: "bg-amber-100 text-amber-700",
};

type Client = typeof initialClientsData[0];

export default function ClientsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [clients, setClients] = useState(initialClientsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", location: "", plan: "", status: "" });

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filteredClients = clients
    .filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      const matchesPlan = planFilter === "all" || c.plan === planFilter;
      return matchesSearch && matchesStatus && matchesPlan;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      const aVal = a[sortField as keyof typeof a];
      const bVal = b[sortField as keyof typeof b];
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredClients.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredClients.map(c => c.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const openEdit = (client: Client) => {
    setEditClient(client);
    setEditForm({ name: client.name, email: client.email, phone: client.phone, location: client.location, plan: client.plan, status: client.status });
  };

  const saveEdit = () => {
    if (!editClient) return;
    setClients(prev => prev.map(c => c.id === editClient.id ? { ...c, ...editForm } : c));
    if (selectedClient?.id === editClient.id) {
      setSelectedClient({ ...editClient, ...editForm });
    }
    setEditClient(null);
  };

  const deleteClient = (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      setClients(prev => prev.filter(c => c.id !== id));
      if (selectedClient?.id === id) setSelectedClient(null);
    }
  };

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === "active").length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.spent, 0);
  const avgSpent = activeClients > 0 ? Math.round(totalRevenue / activeClients) : 0;

  // Client detail view
  if (selectedClient) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <Button variant="ghost" onClick={() => setSelectedClient(null)} className="gap-2 mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Clients
          </Button>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Card */}
            <Card className="bg-white dark:bg-[#1a1a1a] lg:w-96">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-bold">{selectedClient.name}</h2>
                  <p className="text-sm text-slate-500">{selectedClient.id}</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${planColors[selectedClient.plan]}`}>{selectedClient.plan}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedClient.status]}`}>
                      {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{selectedClient.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{selectedClient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{selectedClient.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>Joined {selectedClient.joined}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => openEdit(selectedClient)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => router.push(`/invoices?client=${encodeURIComponent(selectedClient.name)}`)}>
                    <FileText className="h-4 w-4 mr-2" /> Invoices
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats & Activity */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-white dark:bg-[#1a1a1a]">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-50"><DollarSign className="h-5 w-5 text-purple-600" /></div>
                      <div>
                        <p className="text-sm text-slate-500">Total Spent</p>
                        <p className="text-xl font-bold">${selectedClient.spent.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-[#1a1a1a]">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-50"><Ticket className="h-5 w-5 text-blue-600" /></div>
                      <div>
                        <p className="text-sm text-slate-500">Tickets</p>
                        <p className="text-xl font-bold">{selectedClient.tickets}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-[#1a1a1a]">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-green-50"><Calendar className="h-5 w-5 text-green-600" /></div>
                      <div>
                        <p className="text-sm text-slate-500">Member Since</p>
                        <p className="text-xl font-bold">{new Date(selectedClient.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Invoice #INV-2024 paid", time: "2 hours ago", type: "payment" },
                      { action: "Support ticket #T-456 opened", time: "1 day ago", type: "ticket" },
                      { action: "Plan upgraded to " + selectedClient.plan, time: "5 days ago", type: "upgrade" },
                      { action: "Account created", time: selectedClient.joined, type: "create" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === "payment" ? "bg-green-500" : 
                          activity.type === "ticket" ? "bg-amber-500" : 
                          activity.type === "upgrade" ? "bg-purple-500" : "bg-blue-500"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-slate-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
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
        {/* Edit Client Dialog */}
        <Dialog open={!!editClient} onOpenChange={(open) => !open && setEditClient(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Client — {editClient?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={editForm.location} onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plan</Label>
                  <Select value={editForm.plan} onValueChange={v => setEditForm(f => ({ ...f, plan: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Pro">Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editForm.status} onValueChange={v => setEditForm(f => ({ ...f, status: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditClient(null)}>Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={saveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Clients</div>
            <h1 className="text-2xl font-bold">Customers</h1>
            <p className="text-slate-500 text-sm">Manage and view all your customers</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="gap-2 bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4" /> Add Client
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50"><User className="h-5 w-5 text-blue-600" /></div>
                <div>
                  <p className="text-sm text-slate-500">Total Clients</p>
                  <p className="text-xl font-bold">{totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-50"><User className="h-5 w-5 text-green-600" /></div>
                <div>
                  <p className="text-sm text-slate-500">Active Clients</p>
                  <p className="text-xl font-bold">{activeClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50"><DollarSign className="h-5 w-5 text-purple-600" /></div>
                <div>
                  <p className="text-sm text-slate-500">Total Revenue</p>
                  <p className="text-xl font-bold">${totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50"><DollarSign className="h-5 w-5 text-amber-600" /></div>
                <div>
                  <p className="text-sm text-slate-500">Avg. Spent</p>
                  <p className="text-xl font-bold">${avgSpent.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardContent className="pt-4 pb-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Plan" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">
                      <input type="checkbox" checked={selectedRows.length === filteredClients.length && filteredClients.length > 0} onChange={toggleSelectAll} className="rounded" />
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("name")}>
                      <div className="flex items-center gap-1">Client {sortField === "name" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Contact</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("plan")}>
                      <div className="flex items-center gap-1">Plan {sortField === "plan" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("spent")}>
                      <div className="flex items-center gap-1">Total Spent {sortField === "spent" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Tickets</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("joined")}>
                      <div className="flex items-center gap-1">Joined {sortField === "joined" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedClient(client)}>
                      <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                        <input type="checkbox" checked={selectedRows.includes(client.id)} onChange={() => toggleRow(client.id)} className="rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-xs text-slate-500">{client.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm"><Mail className="h-3 w-3 text-slate-400" /><span>{client.email}</span></div>
                          <div className="flex items-center gap-2 text-xs text-slate-500"><Phone className="h-3 w-3" /><span>{client.phone}</span></div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${planColors[client.plan]}`}>{client.plan}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[client.status]}`}>
                          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">${client.spent.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-slate-50">{client.tickets}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-500">{client.joined}</td>
                      <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedClient(client)}><Eye className="h-4 w-4 mr-2" /> View details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEdit(client)}><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/invoices?client=${encodeURIComponent(client.name)}`)}><FileText className="h-4 w-4 mr-2" /> View invoices</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => deleteClient(client.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
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
