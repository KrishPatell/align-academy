"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Video,
  ExternalLink,
  Clock,
  User,
  CheckCircle,
  Circle,
  Send,
  Star,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  MessageSquare,
  PhoneCall,
  MailQuestion,
  BookMarked,
  Lightbulb,
  AlertTriangle,
  RefreshCw,
  Download,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Help categories
const helpCategories = [
  { icon: BookOpen, label: "Knowledge Base", count: 156, color: "bg-blue-100 text-blue-600" },
  { icon: MessageSquare, label: "Live Chat", count: 24, color: "bg-purple-100 text-purple-600" },
  { icon: PhoneCall, label: "Phone Support", count: 8, color: "bg-green-100 text-green-600" },
  { icon: MailQuestion, label: "Email Support", count: 12, color: "bg-amber-100 text-amber-600" },
];

// Popular articles
const popularArticles = [
  { title: "How to reset your password", views: 2453, category: "Account" },
  { title: "Setting up two-factor authentication", views: 1892, category: "Security" },
  { title: "Understanding your billing cycle", views: 1654, category: "Billing" },
  { title: "How to integrate with Slack", views: 1423, category: "Integrations" },
  { title: "Managing team permissions", views: 1287, category: "Teams" },
];

// KB Articles
const kbArticles = [
  { id: "KB-001", title: "Getting Started with Kravio", category: "Getting Started", views: 2453, lastUpdated: "2026-02-15", status: "published" },
  { id: "KB-002", title: "How to create and send invoices", category: "Invoices", views: 1892, lastUpdated: "2026-02-14", status: "published" },
  { id: "KB-003", title: "Understanding subscription tiers", category: "Billing", views: 1654, lastUpdated: "2026-02-12", status: "published" },
  { id: "KB-004", title: "API authentication guide", category: "Developers", views: 1423, lastUpdated: "2026-02-10", status: "published" },
  { id: "KB-005", title: "Setting up team roles and permissions", category: "Teams", views: 1287, lastUpdated: "2026-02-08", status: "draft" },
  { id: "KB-006", title: "Troubleshooting payment issues", category: "Billing", views: 1156, lastUpdated: "2026-02-05", status: "published" },
];

// Support tickets
const supportTickets = [
  { id: "SUP-001", subject: "Cannot access my dashboard", status: "open", priority: "high", created: "2026-02-19", responseTime: "< 1h" },
  { id: "SUP-002", subject: "Billing discrepancy on invoice", status: "pending", priority: "medium", created: "2026-02-18", responseTime: "2h" },
  { id: "SUP-003", subject: "Feature request: Dark mode", status: "resolved", priority: "low", created: "2026-02-17", responseTime: "24h" },
];

const statusColors: Record<string, string> = {
  open: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  resolved: "bg-slate-100 text-slate-700",
};

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-slate-100 text-slate-700",
};

export default function HelpPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("kb");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filteredArticles = kbArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Support / Help & Support</div>
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <p className="text-slate-500 text-sm">Find answers, get help, or contact our support team</p>
          </div>
        </div>

        {/* Search */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">How can we help you?</h2>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Search for articles, guides, or topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg bg-white text-slate-900 border-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {helpCategories.map((category, i) => (
            <Card key={i} className="bg-white dark:bg-[#1a1a1a] cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">{category.label}</p>
                    <p className="text-sm text-slate-500">{category.count} articles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white dark:bg-[#1a1a1a]">
            <TabsTrigger value="kb">Knowledge Base</TabsTrigger>
            <TabsTrigger value="support">My Tickets</TabsTrigger>
            <TabsTrigger value="feedback">Submit Feedback</TabsTrigger>
          </TabsList>

          {/* Knowledge Base Tab */}
          <TabsContent value="kb" className="space-y-4 mt-4">
            {/* Popular Articles */}
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">Popular Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularArticles.map((article, i) => (
                    <div key={i} className="p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex items-start justify-between">
                        <BookMarked className="h-5 w-5 text-purple-500" />
                        <Badge variant="outline" className="text-xs">{article.category}</Badge>
                      </div>
                      <h3 className="font-medium mt-3 mb-2">{article.title}</h3>
                      <p className="text-xs text-slate-500">{article.views.toLocaleString()} views</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* All Articles */}
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg">All Articles</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Getting Started">Getting Started</SelectItem>
                        <SelectItem value="Invoices">Invoices</SelectItem>
                        <SelectItem value="Billing">Billing</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                        <SelectItem value="Teams">Teams</SelectItem>
                        <SelectItem value="Developers">Developers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex items-center gap-4">
                        <BookOpen className="h-5 w-5 text-slate-400" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{article.title}</h3>
                            {article.status === "draft" && <Badge variant="outline" className="text-xs">Draft</Badge>}
                          </div>
                          <p className="text-sm text-slate-500">{article.category} • {article.views.toLocaleString()} views</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-400">Updated {article.lastUpdated}</span>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="support" className="space-y-4 mt-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Your Support Tickets</CardTitle>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" /> New Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <HelpCircle className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{ticket.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[ticket.status]}`}>{ticket.status}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
                          </div>
                          <p className="text-sm text-slate-500">{ticket.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Created</p>
                          <p className="text-sm">{ticket.created}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Response</p>
                          <p className="text-sm">{ticket.responseTime}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Feedback Tab */}
          <TabsContent value="feedback" className="space-y-4 mt-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">Submit Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <Input placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="improvement">Improvement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Brief description of your feedback" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Please provide as much detail as possible..." rows={5} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">How would you rate your experience?</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="p-2 hover:scale-110 transition-transform">
                        <Star className="h-8 w-8 text-amber-400 fill-amber-400" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" /> Submit Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
