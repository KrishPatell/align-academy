"use client";

import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonTableRow } from "@/components/ui/skeleton";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Plus, MoreHorizontal, Mail, Phone, MapPin, Globe, Calendar, DollarSign, 
  Edit, Trash2, Eye, FileText, Bell, Send, Tag, X, Upload, ImagePlus, StickyNote, Download
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  website: string;
  plan: string;
  spent: string;
  status: "active" | "pending" | "inactive";
  joined: string;
  avatar?: string;
  tags: string[];
  notes: string;
}

const initialClients: Client[] = [
  { id: 1, name: "Acme Corporation", contact: "John Smith", email: "john@acme.com", phone: "+1 234 567 890", website: "acme.com", plan: "Enterprise", spent: "$12,450", status: "active", joined: "Jan 15, 2025", tags: ["VIP", "Long-term"], notes: "Key enterprise client. Prefers quarterly check-ins." },
  { id: 2, name: "TechStart Inc", contact: "Sarah Johnson", email: "sarah@techstart.io", phone: "+1 234 567 891", website: "techstart.io", plan: "Professional", spent: "$8,200", status: "active", joined: "Mar 22, 2025", tags: ["Startup", "Tech"], notes: "Growing startup, high potential for upgrade." },
  { id: 3, name: "Global Media", contact: "Mike Brown", email: "mike@globalmedia.com", phone: "+1 234 567 892", website: "globalmedia.com", plan: "Business", spent: "$5,680", status: "active", joined: "May 10, 2025", tags: ["Media", "Agency"], notes: "Media agency managing multiple campaigns." },
  { id: 4, name: "StartupXYZ", contact: "Lisa Davis", email: "lisa@startupxyz.co", phone: "+1 234 567 893", website: "startupxyz.co", plan: "Starter", spent: "$2,100", status: "pending", joined: "Aug 5, 2025", tags: ["New", "Startup"], notes: "New onboarding client. Follow up on setup." },
  { id: 5, name: "DataFlow Systems", contact: "Chris Wilson", email: "chris@dataflow.io", phone: "+1 234 567 894", website: "dataflow.io", plan: "Enterprise", spent: "$15,900", status: "active", joined: "Feb 28, 2025", tags: ["Enterprise", "Data"], notes: "Data infrastructure client. Priority support required." },
];

const availableTags = ["VIP", "New", "Startup", "Enterprise", "SMB", "Agency", "Tech", "Media", "Data", "Long-term", "Priority", "On-hold"];

export default function ClientsPage() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTags, setEditingTags] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newTag, setNewTag] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { 
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openClientDetail = (client: Client) => {
    setSelectedClient(client);
    setNewNote(client.notes);
    setIsDetailOpen(true);
  };

  const openEdit = () => {
    setIsEditOpen(true);
  };

  const handleAvatarUpload = (clientId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setClients(clients.map(c => 
          c.id === clientId ? { ...c, avatar: result } : c
        ));
        if (selectedClient?.id === clientId) {
          setSelectedClient({ ...selectedClient, avatar: result });
        }
        toast({ title: "Avatar updated", description: "Client avatar has been uploaded successfully", variant: "success" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendEmail = (client: Client) => {
    window.location.href = `mailto:${client.email}`;
    toast({ title: "Opening email client", description: `Preparing email to ${client.email}`, variant: "info" });
  };

  const addTag = (clientId: number, tag: string) => {
    if (tag && !availableTags.includes(tag)) {
      toast({ title: "Invalid tag", description: "Please select a tag from the available options", variant: "warning" });
      return;
    }
    if (tag && !clients.find(c => c.id === clientId)?.tags.includes(tag)) {
      setClients(clients.map(c => 
        c.id === clientId ? { ...c, tags: [...c.tags, tag] } : c
      ));
      if (selectedClient?.id === clientId) {
        setSelectedClient({ ...selectedClient, tags: [...selectedClient.tags, tag] });
      }
    }
    setNewTag("");
  };

  const removeTag = (clientId: number, tag: string) => {
    setClients(clients.map(c => 
      c.id === clientId ? { ...c, tags: c.tags.filter(t => t !== tag) } : c
    ));
    if (selectedClient?.id === clientId) {
      setSelectedClient({ ...selectedClient, tags: selectedClient.tags.filter(t => t !== tag) });
    }
  };

  const saveNotes = (clientId: number) => {
    setClients(clients.map(c => 
      c.id === clientId ? { ...c, notes: newNote } : c
    ));
    if (selectedClient?.id === clientId) {
      setSelectedClient({ ...selectedClient, notes: newNote });
    }
    setEditingNotes(false);
    toast({ title: "Notes saved", description: "Client notes have been updated", variant: "success" });
  };

  const exportAllClients = () => {
    const headers = ["Name", "Contact", "Email", "Phone", "Website", "Plan", "Spent", "Status", "Joined"];
    const rows = filteredClients.map(c => [c.name, c.contact, c.email, c.phone, c.website, c.plan, c.spent, c.status, c.joined]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clients-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast({ title: "Export successful", description: `${filteredClients.length} clients exported to CSV`, variant: "success" });
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
            <Button className="bg-slate-600 hover:bg-slate-700 gap-2">
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
              placeholder="Search clients by name, email, or tag..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {filteredClients.map((client) => (
            <Card 
              key={client.id} 
              className="bg-white dark:bg-[#1a1a1a] hover:shadow-xl transition-all duration-300 cursor-pointer group card-hover-lift border-glow"
              onClick={() => openClientDetail(client)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar with upload */}
                    <div className="relative">
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleAvatarUpload(client.id, e)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {client.avatar ? (
                        <div 
                          className="w-12 h-12 rounded-xl bg-cover bg-center border-2 border-transparent group-hover:border-slate-400 transition-all cursor-pointer"
                          style={{ backgroundImage: `url(${client.avatar})` }}
                          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        />
                      ) : (
                        <div 
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg group-hover:scale-110 transition-transform duration-300"
                          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        >
                          {client.name.charAt(0)}
                        </div>
                      )}
                      <div 
                        className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      >
                        <Upload className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-slate-600 transition-colors duration-200">{client.name}</h3>
                      <p className="text-sm text-slate-500">{client.contact}</p>
                    </div>
                  </div>
                  <Badge className={`badge-pop ${client.status === "active" ? "bg-green-100 text-green-700" : client.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                    {client.status}
                  </Badge>
                </div>

                {/* Tags */}
                {client.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {client.tags.map((tag, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="text-xs bg-slate-50 border-slate-200 text-slate-700"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    <Globe className="h-4 w-4" />
                    <span>{client.website}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    <DollarSign className="h-4 w-4" />
                    <span>{client.spent} · {client.plan}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1 hover-scale" onClick={(e) => { e.stopPropagation(); openClientDetail(client); }}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover-scale" 
                    onClick={(e) => { e.stopPropagation(); handleSendEmail(client); }}
                  >
                    <Send className="h-4 w-4 mr-1" /> Email
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 icon-rotate">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedClient && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    {/* Large Avatar with upload */}
                    <div className="relative">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleAvatarUpload(selectedClient.id, e)}
                        id="avatar-upload-detail"
                      />
                      {selectedClient.avatar ? (
                        <div 
                          className="w-16 h-16 rounded-xl bg-cover bg-center border-2 border-transparent cursor-pointer"
                          style={{ backgroundImage: `url(${selectedClient.avatar})` }}
                          onClick={() => document.getElementById('avatar-upload-detail')?.click()}
                        />
                      ) : (
                        <div 
                          className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-500 to-blue-500 flex items-center justify-center text-white font-semibold text-2xl cursor-pointer"
                          onClick={() => document.getElementById('avatar-upload-detail')?.click()}
                        >
                          {selectedClient.name.charAt(0)}
                        </div>
                      )}
                      <label 
                        htmlFor="avatar-upload-detail"
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors"
                      >
                        <Upload className="h-3 w-3 text-white" />
                      </label>
                    </div>
                    <div>
                      <DialogTitle className="text-xl">{selectedClient.name}</DialogTitle>
                      <p className="text-slate-500">{selectedClient.contact}</p>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Tags Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-slate-500 flex items-center gap-2">
                        <Tag className="h-4 w-4" /> Tags
                      </Label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs"
                        onClick={() => setEditingTags(!editingTags)}
                      >
                        {editingTags ? "Done" : "Edit"}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedClient.tags.map((tag, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="bg-slate-50 border-slate-200 text-slate-700 pr-1"
                        >
                          {tag}
                          {editingTags && (
                            <button 
                              className="ml-1 hover:text-red-500"
                              onClick={() => removeTag(selectedClient.id, tag)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                      {editingTags && (
                        <div className="flex items-center gap-1">
                          <Select value={newTag} onValueChange={(val) => addTag(selectedClient.id, val)}>
                            <SelectTrigger className="h-7 w-32 text-xs">
                              <SelectValue placeholder="Add tag..." />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTags.filter(t => !selectedClient.tags.includes(t)).map(tag => (
                                <SelectItem key={tag} value={tag} className="text-xs">{tag}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {selectedClient.tags.length === 0 && !editingTags && (
                        <p className="text-sm text-slate-400 italic">No tags added</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
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

                  {/* Notes Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-slate-500 flex items-center gap-2">
                        <StickyNote className="h-4 w-4" /> Notes
                      </Label>
                      {!editingNotes && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs"
                          onClick={() => setEditingNotes(true)}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                    {editingNotes ? (
                      <div className="space-y-2">
                        <Textarea 
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add notes about this client..."
                          className="min-h-[100px]"
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-slate-600 hover:bg-slate-700"
                            onClick={() => saveNotes(selectedClient.id)}
                          >
                            Save Notes
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => { setNewNote(selectedClient.notes); setEditingNotes(false); }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {selectedClient.notes || "No notes added yet. Click Edit to add notes."}
                      </p>
                    )}
                  </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    className="gap-2 flex-1 sm:flex-none"
                    onClick={() => handleSendEmail(selectedClient)}
                  >
                    <Send className="h-4 w-4" /> Send Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 flex-1 sm:flex-none"
                    onClick={() => { setIsDetailOpen(false); setSelectedClient(selectedClient); setIsEditOpen(true); }}
                  >
                    <Edit className="h-4 w-4" /> Edit Client
                  </Button>
                  <Button className="bg-slate-600 hover:bg-slate-700 gap-2 flex-1 sm:flex-none">
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
              <Button className="bg-slate-600 hover:bg-slate-700" onClick={() => setIsEditOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
