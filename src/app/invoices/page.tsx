"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Download,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  File,
  X,
  Save,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type InvoiceStatus = "paid" | "pending" | "overdue" | "draft";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: { name: string; email: string; address: string };
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
}

const initialInvoices: Invoice[] = [
  {
    id: "1", invoiceNumber: "INV-001", customer: { name: "Umbrella Corp", email: "billing@umbrella.com", address: "123 Evil Way" },
    date: "2026-02-01", dueDate: "2026-02-15", status: "paid",
    items: [{ id: "1", description: "Enterprise License", quantity: 1, rate: 45000, amount: 45000 }],
    subtotal: 52847, tax: 0, total: 52847, notes: "Thank you!",
  },
  {
    id: "2", invoiceNumber: "INV-002", customer: { name: "Acme Corporation", email: "accounts@acme.com", address: "456 Rocket Rd" },
    date: "2026-02-03", dueDate: "2026-02-17", status: "paid",
    items: [{ id: "1", description: "Annual Subscription", quantity: 1, rate: 42000, amount: 42000 }],
    subtotal: 48192, tax: 0, total: 48192, notes: "",
  },
  {
    id: "3", invoiceNumber: "INV-003", customer: { name: "Globex Inc", email: "finance@globex.com", address: "789 Tech Park" },
    date: "2026-02-10", dueDate: "2026-02-24", status: "pending",
    items: [{ id: "1", description: "Pro Plan", quantity: 12, rate: 2670, amount: 32041 }],
    subtotal: 32041, tax: 0, total: 32041, notes: "",
  },
  {
    id: "4", invoiceNumber: "INV-004", customer: { name: "Initech", email: "ap@initech.com", address: "321 Cubicle Ave" },
    date: "2026-02-12", dueDate: "2026-02-26", status: "pending",
    items: [{ id: "1", description: "Consulting", quantity: 40, rate: 726, amount: 29062 }],
    subtotal: 29062, tax: 0, total: 29062, notes: "",
  },
  {
    id: "5", invoiceNumber: "INV-005", customer: { name: "Wayne Enterprises", email: "payments@wayne.com", address: "1007 Mountain Dr" },
    date: "2026-01-28", dueDate: "2026-02-11", status: "overdue",
    items: [{ id: "1", description: "Security Suite", quantity: 1, rate: 18000, amount: 18000 }],
    subtotal: 24593, tax: 0, total: 24593, notes: "",
  },
  {
    id: "6", invoiceNumber: "INV-006", customer: { name: "Stark Industries", email: "legal@stark.com", address: "10880 Malibu Point" },
    date: "2026-02-08", dueDate: "2026-02-22", status: "draft",
    items: [{ id: "1", description: "AI Module License", quantity: 1, rate: 15000, amount: 15000 }],
    subtotal: 18879, tax: 0, total: 18879, notes: "Draft",
  },
];

const statusConfig: Record<InvoiceStatus, { bg: string; text: string; label: string; icon: any }> = {
  paid: { bg: "#dcfce7", text: "#16a34a", label: "Paid", icon: CheckCircle },
  pending: { bg: "#fef3c7", text: "#d97706", label: "Pending", icon: Clock },
  overdue: { bg: "#fee2e2", text: "#dc2626", label: "Overdue", icon: AlertCircle },
  draft: { bg: "#f5f5f3", text: "#4a4a4a", label: "Draft", icon: File },
};

export default function InvoicesPage() {
  const [mounted, setMounted] = useState(false);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Partial<Invoice>>({});

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const formatCurrency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);
  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = invoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = invoices.filter(inv => inv.status === "pending").reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = invoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.total, 0);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) || inv.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && (statusFilter === "all" || inv.status === statusFilter);
  });

  const handleCreateInvoice = () => {
    const newInvoice: Invoice = {
      id: String(invoices.length + 1),
      invoiceNumber: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      customer: { name: "", email: "", address: "" },
      date: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "draft",
      items: [{ id: "1", description: "", quantity: 1, rate: 0, amount: 0 }],
      subtotal: 0, tax: 0, total: 0, notes: "",
    };
    setEditingInvoice(newInvoice);
    setIsCreateModalOpen(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice({ ...invoice });
    setIsEditModalOpen(true);
  };

  const handleSaveInvoice = () => {
    if (editingInvoice.id) {
      setInvoices(invoices.map(inv => inv.id === editingInvoice.id ? editingInvoice as Invoice : inv));
      setIsEditModalOpen(false);
    } else {
      setInvoices([...invoices, editingInvoice as Invoice]);
      setIsCreateModalOpen(false);
    }
    setEditingInvoice({});
  };

  const handleDeleteInvoice = (id: string) => setInvoices(invoices.filter(inv => inv.id !== id));
  const handleStatusChange = (id: string, newStatus: InvoiceStatus) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: newStatus } : inv));
  };

  const calculateTotals = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    return { subtotal, tax: 0, total: subtotal };
  };

  const handleItemChange = (field: string, value: any, itemId?: string) => {
    if (itemId && editingInvoice.items) {
      const newItems = editingInvoice.items.map(item => {
        if (item.id === itemId) {
          const updated = { ...item, [field]: value };
          if (field === "quantity" || field === "rate") updated.amount = Number(updated.quantity) * Number(updated.rate);
          return updated;
        }
        return item;
      });
      setEditingInvoice({ ...editingInvoice, items: newItems, ...calculateTotals(newItems) });
    }
  };

  const addItem = () => {
    const newItem: InvoiceItem = { id: String((editingInvoice.items?.length || 0) + 1), description: "", quantity: 1, rate: 0, amount: 0 };
    setEditingInvoice({ ...editingInvoice, items: [...(editingInvoice.items || []), newItem] });
  };

  const removeItem = (itemId: string) => {
    const newItems = editingInvoice.items?.filter(item => item.id !== itemId);
    setEditingInvoice({ ...editingInvoice, items: newItems, ...calculateTotals(newItems || []) });
  };

  const exportCSV = () => {
    const headers = ["Invoice #", "Customer", "Date", "Due Date", "Status", "Total"];
    const rows = filteredInvoices.map(inv => [inv.invoiceNumber, inv.customer.name, inv.date, inv.dueDate, inv.status, inv.total]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoices-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Invoiced</p>
                  <p className="text-xl font-bold">{formatCurrency(totalInvoiced)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Paid</p>
                  <p className="text-xl font-bold">{formatCurrency(paidAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Pending</p>
                  <p className="text-xl font-bold">{formatCurrency(pendingAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Overdue</p>
                  <p className="text-xl font-bold">{formatCurrency(overdueAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search invoices..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="sm" onClick={exportCSV}><Download className="h-4 w-4 mr-1" />Export</Button>
            <Button size="sm" onClick={handleCreateInvoice}><Plus className="h-4 w-4 mr-1" />Create Invoice</Button>
          </div>
        </div>

        {/* Invoice Table */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const status = statusConfig[invoice.status];
                  const StatusIcon = status.icon;
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-purple-600" />
                          </div>
                          <span className="font-semibold">{invoice.invoiceNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{invoice.customer.name}</p>
                        <p className="text-sm text-slate-500">{invoice.customer.email}</p>
                      </TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell className="text-right font-semibold">{formatCurrency(invoice.total)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="gap-1" style={{ backgroundColor: status.bg, color: status.text, borderColor: "transparent" }}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditInvoice(invoice)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusChange(invoice.id, "paid")}><CheckCircle className="h-4 w-4 mr-2" />Mark Paid</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(invoice.id, "pending")}><Clock className="h-4 w-4 mr-2" />Mark Pending</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteInvoice(invoice.id)} className="text-red-600"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={isCreateModalOpen || isEditModalOpen} onOpenChange={(open) => { if (!open) { setIsCreateModalOpen(false); setIsEditModalOpen(false); setEditingInvoice({}); } }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingInvoice.id ? "Edit Invoice" : "Create New Invoice"}</DialogTitle>
            <DialogDescription>{editingInvoice.id ? "Update invoice details" : "Fill in the details to create a new invoice"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Customer Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Customer Name</Label>
                  <Input value={editingInvoice.customer?.name || ""} onChange={(e) => setEditingInvoice({ ...editingInvoice, customer: { ...editingInvoice.customer!, name: e.target.value } })} placeholder="Enter customer name" />
                </div>
                <div className="space-y-2">
                  <Label>Customer Email</Label>
                  <Input type="email" value={editingInvoice.customer?.email || ""} onChange={(e) => setEditingInvoice({ ...editingInvoice, customer: { ...editingInvoice.customer!, email: e.target.value } })} placeholder="customer@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Customer Address</Label>
                <Input value={editingInvoice.customer?.address || ""} onChange={(e) => setEditingInvoice({ ...editingInvoice, customer: { ...editingInvoice.customer!, address: e.target.value } })} placeholder="Customer address" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Invoice Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Invoice Date</Label>
                  <Input type="date" value={editingInvoice.date || ""} onChange={(e) => setEditingInvoice({ ...editingInvoice, date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" value={editingInvoice.dueDate || ""} onChange={(e) => setEditingInvoice({ ...editingInvoice, dueDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editingInvoice.status} onValueChange={(v: InvoiceStatus) => setEditingInvoice({ ...editingInvoice, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Line Items</h3>
                <Button variant="outline" size="sm" onClick={addItem}><Plus className="h-4 w-4 mr-1" />Add Item</Button>
              </div>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-24">Qty</TableHead>
                      <TableHead className="w-32">Rate</TableHead>
                      <TableHead className="text-right w-32">Amount</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editingInvoice.items?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell><Input value={item.description} onChange={(e) => handleItemChange("description", e.target.value, item.id)} placeholder="Item description" className="border-0 bg-transparent" /></TableCell>
                        <TableCell><Input type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange("quantity", Number(e.target.value), item.id)} className="border-0 bg-transparent" /></TableCell>
                        <TableCell><Input type="number" min="0" step="0.01" value={item.rate} onChange={(e) => handleItemChange("rate", Number(e.target.value), item.id)} className="border-0 bg-transparent" /></TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(item.amount)}</TableCell>
                        <TableCell><Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500" onClick={() => removeItem(item.id)}><X className="h-4 w-4" /></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><span>{formatCurrency(editingInvoice.subtotal || 0)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Tax (0%)</span><span>{formatCurrency(editingInvoice.tax || 0)}</span></div>
                <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Total</span><span>{formatCurrency(editingInvoice.total || 0)}</span></div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Input value={editingInvoice.notes || ""} onChange={(e) => setEditingInvoice({ ...editingInvoice, notes: e.target.value })} placeholder="Additional notes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); setEditingInvoice({}); }}>Cancel</Button>
            <Button onClick={handleSaveInvoice}><Save className="h-4 w-4 mr-1" />Save Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
