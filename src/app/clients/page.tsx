"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, MoreHorizontal, Mail, Phone, MapPin, Globe, Calendar, DollarSign, Edit, Trash2, Eye, FileText, Bell } from "lucide-react";
import { useToast } from "@/components/ui/toast";

const clients = [
  { id: 1, name: "Acme Corporation", contact: "John Smith", email: "john@acme.com", phone: "+1 234 567 890", website: "acme.com", plan: "Enterprise", spent: "$12,450", status: "active", joined: "Jan 15, 2025" },
  { id: 2, name: "TechStart Inc", contact: "Sarah Johnson", email: "sarah@techstart.io", phone: "+1 234 567 891", website: "techstart.io", plan: "Professional", spent: "$8,200", status: "active", joined: "Mar 22, 2025" },
  { id: 3, name: "Global Media", contact: "Mike Brown", email: "mike@globalmedia.com", phone: "+1 234 567 892", website: "globalmedia.com", plan: "Business", spent: "$5,680", status: "active", joined: "May 10, 2025" },
  { id: 4, name: "StartupXYZ", contact: "Lisa Davis", email: "lisa@startupxyz.co", phone: "+1 234 567 893", website: "startupxyz.co", plan: "Starter", spent: "$2,100", status: "pending", joined: "Aug 5, 2025" },
  { id: 5, name: "DataFlow Systems", contact: "Chris Wilson", email: "chris@dataflow.io", phone: "+1 234 567 894", website: "dataflow.io", plan: "Enterprise", spent: "$15,900", status: "active", joined: "Feb 28, 2025" },
];

export default function ClientsPage() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openClientDetail = (client: typeof clients[0]) => {
    setSelectedClient(client);
    setIsDetailOpen(true);
  };

  const openEdit = () => {
    setIsEditOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Customers / Clients</div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <p className="text-slate-500 text-sm">Manage your customer relationships</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast({ title: "Notifications enabled", description: "You'll receive alerts for new clients", variant: "info" })}>
              <Bell className="h-4 w-4" />
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
              <Plus className="h-4 w-4" /> Add Client
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Total Clients</p>
              <p className="text-2xl font-bold">{clients.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Active</p>
              <p className="text-2xl font-bold text-green-600">{clients.filter(c => c.status === "active").length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold">${clients.reduce((sum, c) => sum + parseInt(c.spent.replace(/[$,]/g, '')), 0).toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Avg. Spent</p>
              <p className="text-2xl font-bold">${Math.round(clients.reduce((sum, c) => sum + parseInt(c.spent.replace(/[$,]/g, '')), 0) / clients.length).toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Toast Buttons */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-3">Toast Notifications Demo</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Success!", description: "Client added successfully", variant: "success" })}>
                Success Toast
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Error", description: "Failed to delete client", variant: "destructive" })}>
                Error Toast
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Warning", description: "Client subscription expires soon", variant: "warning" })}>
                Warning Toast
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Info", description: "New client onboarding started", variant: "info" })}>
                Info Toast
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search clients..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <Card 
              key={client.id} 
              className="bg-white dark:bg-[#1a1a1a] hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => openClientDetail(client)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-purple-600 transition-colors">{client.name}</h3>
                      <p className="text-sm text-slate-500">{client.contact}</p>
                    </div>
                  </div>
                  <Badge className={client.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                    {client.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Globe className="h-4 w-4" />
                    <span>{client.website}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <DollarSign className="h-4 w-4" />
                    <span>{client.spent} · {client.plan}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); openClientDetail(client); }}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); setSelectedClient(client); setIsEditOpen(true); }}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl">
            {selectedClient && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-2xl">
                      {selectedClient.name.charAt(0)}
                    </div>
                    <div>
                      <DialogTitle className="text-xl">{selectedClient.name}</DialogTitle>
                      <p className="text-slate-500">{selectedClient.contact}</p>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="grid grid-cols-2 gap-6 py-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-500">Email</Label>
                      <p className="font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4" /> {selectedClient.email}
                      </p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Phone</Label>
                      <p className="font-medium flex items-center gap-2">
                        <Phone className="h-4 w-4" /> {selectedClient.phone}
                      </p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Website</Label>
                      <p className="font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4" /> {selectedClient.website}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-500">Plan</Label>
                      <p className="font-medium">{selectedClient.plan}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Total Spent</Label>
                      <p className="font-medium text-green-600">{selectedClient.spent}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Member Since</Label>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {selectedClient.joined}
                      </p>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                    <FileText className="h-4 w-4" /> View Invoices
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Client Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Client</DialogTitle>
            </DialogHeader>
            {selectedClient && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue={selectedClient.name} />
                </div>
                <div className="space-y-2">
                  <Label>Contact Person</Label>
                  <Input defaultValue={selectedClient.contact} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={selectedClient.email} type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue={selectedClient.phone} />
                </div>
                <div className="space-y-2">
                  <Label>Plan</Label>
                  <Select defaultValue={selectedClient.plan.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
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
