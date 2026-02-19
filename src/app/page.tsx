"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Home,
  BarChart3,
  Users,
  FileText,
  RefreshCcw,
  DollarSign,
  UserCheck,
  Target,
  FlaskConical,
  MapPin,
  Plug,
  Settings,
  LayoutDashboard,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Crown,
  Command,
  Ticket,
  UsersRound,
  BookOpen,
  Zap,
  TrendingUp,
  Smile,
  BarChart4,
  FileBarChart,
  MessageSquare,
  HelpCircle,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  File,
  Plus,
  MoreHorizontal,
  Download,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  { id: "1", invoiceNumber: "INV-001", customer: { name: "Umbrella Corp", email: "billing@umbrella.com", address: "123 Evil Way" }, date: "2026-02-01", dueDate: "2026-02-15", status: "paid", items: [{ id: "1", description: "Enterprise License", quantity: 1, rate: 45000, amount: 45000 }], subtotal: 52847, tax: 0, total: 52847, notes: "Thank you!" },
  { id: "2", invoiceNumber: "INV-002", customer: { name: "Acme Corporation", email: "accounts@acme.com", address: "456 Rocket Rd" }, date: "2026-02-03", dueDate: "2026-02-17", status: "paid", items: [{ id: "1", description: "Annual Subscription", quantity: 1, rate: 42000, amount: 42000 }], subtotal: 48192, tax: 0, total: 48192, notes: "" },
  { id: "3", invoiceNumber: "INV-003", customer: { name: "Globex Inc", email: "finance@globex.com", address: "789 Tech Park" }, date: "2026-02-10", dueDate: "2026-02-24", status: "pending", items: [{ id: "1", description: "Pro Plan", quantity: 12, rate: 2670, amount: 32041 }], subtotal: 32041, tax: 0, total: 32041, notes: "" },
  { id: "4", invoiceNumber: "INV-004", customer: { name: "Initech", email: "ap@initech.com", address: "321 Cubicle Ave" }, date: "2026-02-12", dueDate: "2026-02-26", status: "pending", items: [{ id: "1", description: "Consulting", quantity: 40, rate: 726, amount: 29062 }], subtotal: 29062, tax: 0, total: 29062, notes: "" },
  { id: "5", invoiceNumber: "INV-005", customer: { name: "Wayne Enterprises", email: "payments@wayne.com", address: "1007 Mountain Dr" }, date: "2026-01-28", dueDate: "2026-02-11", status: "overdue", items: [{ id: "1", description: "Security Suite", quantity: 1, rate: 18000, amount: 18000 }], subtotal: 24593, tax: 0, total: 24593, notes: "" },
];

const statusConfig: Record<InvoiceStatus, { bg: string; text: string; label: string; icon: any }> = {
  paid: { bg: "#dcfce7", text: "#16a34a", label: "Paid", icon: CheckCircle },
  pending: { bg: "#fef3c7", text: "#d97706", label: "Pending", icon: Clock },
  overdue: { bg: "#fee2e2", text: "#dc2626", label: "Overdue", icon: AlertCircle },
  draft: { bg: "#f5f5f3", text: "#4a4a4a", label: "Draft", icon: File },
};

// Menu items
const mainNav = [
  { icon: Home, label: "Overview", href: "/" },
  { icon: Ticket, label: "Tickets", href: "#", hasDropdown: true, items: ["All / My Queue", "SLA Breach Risk", "Escalations"] },
  { icon: UsersRound, label: "Clients", href: "#" },
  { icon: Users, label: "Agents & Teams", href: "#", hasDropdown: true },
  { icon: BookOpen, label: "Knowledge Base", href: "#", hasDropdown: true },
  { icon: Zap, label: "Integrations", href: "#" },
];

const analyticsNav = [
  { icon: TrendingUp, label: "SLA Compliance", href: "#" },
  { icon: Smile, label: "CSAT & NPS", href: "#" },
  { icon: BarChart4, label: "Workload Analytics", href: "#" },
  { icon: FileBarChart, label: "Reports", href: "#" },
];

const supportNav = [
  { icon: MessageSquare, label: "Feedback", href: "#" },
  { icon: HelpCircle, label: "Help & Support", href: "#" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(["Tickets"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const formatCurrency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);
  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]);
  };

  const filteredInvoices = initialInvoices.filter(inv => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) || inv.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && (statusFilter === "all" || inv.status === statusFilter);
  });

  const totalInvoiced = initialInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = initialInvoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = initialInvoices.filter(inv => inv.status === "pending").reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = initialInvoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#121212]">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#1a1a1a] border-r border-slate-200 dark:border-slate-800 h-screen fixed left-0 top-0 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">Kravio</span>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search anything" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-100 dark:bg-slate-800 border-0 text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">
              <Command className="h-3 w-3" />K
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {/* Main Navigation */}
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Main Navigation</p>
            {mainNav.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => item.hasDropdown && toggleMenu(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.label === "Overview" ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasDropdown && (
                    openMenus.includes(item.label) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {item.hasDropdown && openMenus.includes(item.label) && item.items && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.items.map((subItem, i) => (
                      <button key={i} className="w-full text-left px-3 py-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white rounded">
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Analytics & Insights */}
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Analytics & Insights</p>
            {analyticsNav.map((item) => (
              <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Support */}
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Support</p>
            {supportNav.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* User Profile Card */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                KW
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Krish Walker</p>
              <p className="text-xs text-slate-500 truncate">krish@alignacademy.com</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><Settings className="h-4 w-4 mr-2" />Settings</DropdownMenuItem>
                <DropdownMenuItem><HelpCircle className="h-4 w-4 mr-2" />Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600"><LogOut className="h-4 w-4 mr-2" />Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-slate-800 px-6 sticky top-0 z-20 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Light</span>
              <Switch checked={theme === "dark"} onCheckedChange={(c) => setTheme(c ? "dark" : "light")} />
              <span className="text-xs text-slate-500">Dark</span>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Invoiced", value: totalInvoiced, icon: DollarSign, color: "blue" },
              { label: "Paid", value: paidAmount, icon: CheckCircle, color: "green" },
              { label: "Pending", value: pendingAmount, icon: Clock, color: "amber" },
              { label: "Overdue", value: overdueAmount, icon: AlertCircle, color: "red" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white dark:bg-[#1a1a1a]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
                      <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="text-xl font-bold">{formatCurrency(stat.value)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button className="bg-purple-600 hover:bg-purple-700"><Plus className="h-4 w-4 mr-1" />New Invoice</Button>
            <Button variant="outline"><Download className="h-4 w-4 mr-1" />Export</Button>
          </div>

          {/* Recent Invoices */}
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Invoices</CardTitle>
              <Link href="/invoices" className="text-sm text-purple-600 hover:underline">View all</Link>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.slice(0, 5).map((invoice) => {
                    const status = statusConfig[invoice.status];
                    return (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.customer.name}</TableCell>
                        <TableCell>{formatDate(invoice.date)}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(invoice.total)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1" style={{ backgroundColor: status.bg, color: status.text }}>
                            <status.icon className="h-3 w-3" />
                            {status.label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
