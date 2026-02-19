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
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Star,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  Clock,
  Eye,
  Download,
  RefreshCw,
  Send,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock feedback data
const feedbackData = [
  { id: "FB-001", customer: "John Smith", email: "john@acme.com", rating: 5, comment: "Excellent support! Very quick resolution.", date: "2026-02-19", status: "positive", source: "Email" },
  { id: "FB-002", customer: "Sarah Johnson", email: "sarah@techcorp.com", rating: 2, comment: "Long wait times, not satisfied with the response.", date: "2026-02-19", status: "negative", source: "Chat" },
  { id: "FB-003", customer: "Mike Brown", email: "mike@startup.io", rating: 4, comment: "Good experience overall, but could be faster.", date: "2026-02-18", status: "positive", source: "In-app" },
  { id: "FB-004", customer: "Emily Davis", email: "emily@design.co", rating: 1, comment: "Very disappointed. Agent was rude.", date: "2026-02-18", status: "negative", source: "Email" },
  { id: "FB-005", customer: "Chris Wilson", email: "chris@enterprise.com", rating: 5, comment: "Perfect! They went above and beyond.", date: "2026-02-17", status: "positive", source: "Chat" },
  { id: "FB-006", customer: "Lisa Anderson", email: "lisa@retail.com", rating: 3, comment: "Average experience, nothing special.", date: "2026-02-17", status: "neutral", source: "In-app" },
  { id: "FB-007", customer: "David Lee", email: "david@agency.co", rating: 4, comment: "Very helpful, resolved my issue quickly.", date: "2026-02-16", status: "positive", source: "Email" },
  { id: "FB-008", customer: "Anna Martinez", email: "anna@healthcare.io", rating: 1, comment: "Support agent hung up on me. Very unprofessional.", date: "2026-02-16", status: "negative", source: "Chat" },
];

const ratingColors: Record<number, string> = {
  1: "text-red-500",
  2: "text-red-400",
  3: "text-amber-500",
  4: "text-green-400",
  5: "text-green-500",
};

const statusColors: Record<string, string> = {
  positive: "bg-green-100 text-green-700",
  negative: "bg-red-100 text-red-700",
  neutral: "bg-slate-100 text-slate-700",
};

export default function FeedbackPage() {
  const [mounted, setMounted] = useState(false);
  const [feedback, setFeedback] = useState(feedbackData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // Stats
  const totalFeedback = feedback.length;
  const positiveCount = feedback.filter(f => f.status === "positive").length;
  const negativeCount = feedback.filter(f => f.status === "negative").length;
  const neutralCount = feedback.filter(f => f.status === "neutral").length;
  const avgRating = (feedback.reduce((sum, f) => sum + f.rating, 0) / totalFeedback).toFixed(1);
  const satisfactionRate = Math.round((positiveCount / totalFeedback) * 100);

  const filteredFeedback = feedback
    .filter(f => {
      const matchesSearch = f.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f.comment.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || f.status === statusFilter;
      const matchesSource = sourceFilter === "all" || f.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    })
    .sort((a, b) => {
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
      setSortDirection("desc");
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredFeedback.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredFeedback.map(f => f.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Support / Feedback</div>
            <h1 className="text-2xl font-bold">Customer Feedback</h1>
            <p className="text-slate-500 text-sm">Track and analyze customer feedback across all channels</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Feedback</p>
                  <p className="text-2xl font-bold">{totalFeedback}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Satisfaction Rate</p>
                  <p className="text-2xl font-bold">{satisfactionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Avg Rating</p>
                  <p className="text-2xl font-bold flex items-center gap-1">
                    {avgRating} <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  </p>
                </div>
                <Star className="h-8 w-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Positive</p>
                  <p className="text-2xl font-bold text-green-600">{positiveCount}</p>
                </div>
                <ThumbsUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Negative</p>
                  <p className="text-2xl font-bold text-red-600">{negativeCount}</p>
                </div>
                <ThumbsDown className="h-8 w-8 text-red-500" />
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
                  placeholder="Search feedback..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10" 
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Chat">Chat</SelectItem>
                    <SelectItem value="In-app">In-app</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Table */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.length === filteredFeedback.length && filteredFeedback.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("id")}>
                      <div className="flex items-center gap-1">ID {sortField === "id" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Customer</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("rating")}>
                      <div className="flex items-center gap-1">Rating {sortField === "rating" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Comment</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Source</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase cursor-pointer" onClick={() => handleSort("date")}>
                      <div className="flex items-center gap-1">Date {sortField === "date" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Status</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedback.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(item.id)}
                          onChange={() => toggleRow(item.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium">{item.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{item.customer}</p>
                          <p className="text-xs text-slate-500">{item.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= item.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-sm truncate">{item.comment}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-slate-50">{item.source}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-500">{item.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View details</DropdownMenuItem>
                            <DropdownMenuItem><MessageSquare className="h-4 w-4 mr-2" /> Reply</DropdownMenuItem>
                            <DropdownMenuItem><ThumbsUp className="h-4 w-4 mr-2" /> Mark positive</DropdownMenuItem>
                            <DropdownMenuItem><ThumbsDown className="h-4 w-4 mr-2" /> Mark negative</DropdownMenuItem>
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
