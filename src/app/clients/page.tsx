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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  Check,
  Building,
  Clock,
  CreditCard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const clientsData = [
  { id: "CL-001", name: "Umbrella Corp", email: "billing@umbrella.com", phone: "+1 555-0101", location: "Raccoon City, US", company: "Umbrella Corp", plan: "Enterprise", status: "active", spent: 52847, tickets: 12, joined: "2025-06-15" },
  { id: "CL-002", name: "Acme Corporation", email: "accounts@acme.com", phone: "+1 555-0102", location: "Arizona, US", company: "Acme Corporation", plan: "Business", status: "active", spent: 48192, tickets: 8, joined: "2025-08-22" },
  { id: "CL-003", name: "Globex Inc", email: "finance@globex.com", phone: "+1 555-0103", location: "San Francisco, US", company: "Globex Inc", plan: "Business", status: "active", spent: 32041, tickets: 5, joined: "2025-10-01" },
  { id: "CL-004", name: "Initech", email: "ap@initech.com", phone: "+1 555-0104", location: "Austin, US", company: "Initech", plan: "Pro", status: "active", spent: 29062, tickets: 15, joined: "2025-11-12" },
  { id: "CL-005", name: "Wayne Enterprises", email: "payments@wayne.com", phone: "+1 555-0105", location: "Gotham, US", company: "Wayne Enterprises", plan: "Enterprise", status: "active", spent: 24593, tickets: 3, joined: "2025-09-05" },
  { id: "CL-006", name: "Stark Industries", email: "legal@stark.com", phone: "+1 555-0106", location: "Malibu, US", company: "Stark Industries", plan: "Enterprise", status: "active", spent: 18879, tickets: 7, joined: "2025-12-01" },
  { id: "CL-007", name: "Cyberdyne Systems", email: "info@cyberdyne.com", phone: "+1 555-0107", location: "Los Angeles, US", company: "Cyberdyne Systems", plan: "Business", status: "pending", spent: 0, tickets: 2, joined: "2026-02-10" },
  { id: "CL-008", name: "Oscorp", email: "contacts@oscorp.com", phone: "+1 555-0108", location: "New York, US", company: "Oscorp", plan: "Pro", status: "inactive", spent: 8750, tickets: 20, joined: "2025-04-20" },
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

type Client = typeof clientsData[0];

export default function ClientsPage() {
  const [mounted, setMounted] = useState(false);
  const [clients, setClients] = useState(clientsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  // Modal states
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", company: "" });

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

  const openClientDetail = (client: Client) => {
    setSelectedClient(client);
    setEditForm({ name: client.name, email: client.email, company: client.company });
    setIsEditMode(false);
    setIsDetailOpen(true);
  };

  const handleEditSave = () => {
    if (selectedClient) {
      setClients(prev => prev.map(c => 
        c.id === selectedClient.id 
          ? { ...c, name: editForm.name, email: editForm.email, company: editForm.company }
          : c
      ));
      setSelectedClient(prev => prev ? { ...prev, name: editForm.name, email: editForm.email, company: editForm.company } : null);
      setIsEditMode(false);
    }
  };

  const handleViewInvoices = () => {
    // Navigate to invoices page with client filter
    console.log("Viewing invoices for:", selectedClient?.name);
    setIsDetailOpen(false);
  };

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === "active").length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.spent, 0);
  const avgSpent = Math.round(totalRevenue / activeClients);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
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
          <Card className="bg-white dark:bg-[#1a1a1a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Clients</p>
                  <p className="text-xl font-bold">{totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-50">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Active Clients</p>
                  <p className="text-xl font-bold">{activeClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Revenue</p>
                  <p className="text-xl font-bold">${totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
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
                <Input 
                  placeholder="Search clients..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 transition-all focus:ring-2 focus:ring-purple-500" 
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
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
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-purple-600 transition-colors" onClick={() => handleSort("name")}>
                      <div className="flex items-center gap-1">Client {sortField === "name" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Contact</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-purple-600 transition-colors" onClick={() => handleSort("plan")}>
                      <div className="flex items-center gap-1">Plan {sortField === "plan" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-purple-600 transition-colors" onClick={() => handleSort("spent")}>
                      <div className="flex items-center gap-1">Total Spent {sortField === "spent" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Tickets</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer hover:text-purple-600 transition-colors" onClick={() => handleSort("joined")}>
                      <div className="flex items-center gap-1">Joined {sortField === "joined" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr 
                      key={client.id} 
                      className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01]"
                      onClick={() => openClientDetail(client)}
                    >
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={selectedRows.includes(client.id)} onChange={() => toggleRow(client.id)} className="rounded" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium transition-transform hover:scale-110">
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
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-slate-400" />
                            <span>{client.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Phone className="h-3 w-3" />
                            <span>{client.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${planColors[client.plan]}`}>
                          {client.plan}
                        </span>
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
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 hover:scale-110 transition-all">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => openClientDetail(client)}>
                              <Eye className="h-4 w-4 mr-2" /> View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { openClientDetail(client); setIsEditMode(true); }}>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleViewInvoices}>
                              <FileText className="h-4 w-4 mr-2" /> View invoices
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
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

        {/* Client Detail Modal */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                {isEditMode ? "Edit Client" : "Client Details"}
              </DialogTitle>
            </DialogHeader>
            
            {selectedClient && (
              <div className="space-y-6">
                {/* Client Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold transition-transform hover:scale-110">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedClient.name}</h3>
                    <p className="text-slate-500">{selectedClient.id}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedClient.status]}`}>
                      {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${planColors[selectedClient.plan]}`}>
                      {selectedClient.plan}
                    </span>
                  </div>
                </div>

                {isEditMode ? (
                  /* Edit Form */
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input 
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="transition-all focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="transition-all focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company</label>
                      <Input 
                        value={editForm.company}
                        onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                        className="transition-all focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={handleEditSave}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 transition-all hover:scale-105"
                      >
                        <Check className="h-4 w-4 mr-2" /> Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditMode(false)}
                        className="transition-all hover:scale-105"
                      >
                        <X className="h-4 w-4 mr-2" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <>
                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="p-2 rounded-lg bg-slate-100">
                            <Mail className="h-4 w-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Email</p>
                            <p className="font-medium">{selectedClient.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="p-2 rounded-lg bg-slate-100">
                            <Phone className="h-4 w-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Phone</p>
                            <p className="font-medium">{selectedClient.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="p-2 rounded-lg bg-slate-100">
                            <Building className="h-4 w-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Company</p>
                            <p className="font-medium">{selectedClient.company}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="p-2 rounded-lg bg-slate-100">
                            <MapPin className="h-4 w-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Location</p>
                            <p className="font-medium">{selectedClient.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="p-2 rounded-lg bg-slate-100">
                            <Calendar className="h-4 w-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Joined</p>
                            <p className="font-medium">{selectedClient.joined}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="p-2 rounded-lg bg-slate-100">
                            <Clock className="h-4 w-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Tickets</p>
                            <p className="font-medium">{selectedClient.tickets}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50">
                        <DollarSign className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                        <p className="text-2xl font-bold">${selectedClient.spent.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">Total Spent</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                        <CreditCard className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <p className="text-2xl font-bold">{selectedClient.plan}</p>
                        <p className="text-xs text-slate-500">Current Plan</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={() => setIsEditMode(true)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 transition-all hover:scale-105"
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit Client
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleViewInvoices}
                        className="flex-1 transition-all hover:scale-105"
                      >
                        <FileText className="h-4 w-4 mr-2" /> View Invoices
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
