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
  Reply,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock feedback data
const feedbackData = [
  { id: "FB-001", customer: "John Smith", email: "john@acme.com", rating: 5, comment: "Excellent support! Very quick resolution. The team was incredibly helpful and resolved my issue within minutes. I couldn't be happier with the service.", date: "2026-02-19", status: "positive", source: "Email", replies: [] },
  { id: "FB-002", customer: "Sarah Johnson", email: "sarah@techcorp.com", rating: 2, comment: "Long wait times, not satisfied with the response. Had to wait over 30 minutes just to get a simple answer.", date: "2026-02-19", status: "negative", source: "Chat", replies: [] },
  { id: "FB-003", customer: "Mike Brown", email: "mike@startup.io", rating: 4, comment: "Good experience overall, but could be faster.", date: "2026-02-18", status: "positive", source: "In-app", replies: [] },
  { id: "FB-004", customer: "Emily Davis", email: "emily@design.co", rating: 1, comment: "Very disappointed. Agent was rude and unhelpful. This is not the experience I expected from a premium service.", date: "2026-02-18", status: "negative", source: "Email", replies: [] },
  { id: "FB-005", customer: "Chris Wilson", email: "chris@enterprise.com", rating: 5, comment: "Perfect! They went above and beyond to help me. Truly exceptional customer service!", date: "2026-02-17", status: "positive", source: "Chat", replies: [{ text: "Thank you for your kind words, Chris! We're glad we could help.", date: "2026-02-17" }] },
  { id: "FB-006", customer: "Lisa Anderson", email: "lisa@retail.com", rating: 3, comment: "Average experience, nothing special. It was okay but nothing to write home about.", date: "2026-02-17", status: "neutral", source: "In-app", replies: [] },
  { id: "FB-007", customer: "David Lee", email: "david@agency.co", rating: 4, comment: "Very helpful, resolved my issue quickly. Would recommend to others.", date: "2026-02-16", status: "positive", source: "Email", replies: [] },
  { id: "FB-008", customer: "Anna Martinez", email: "anna@healthcare.io", rating: 1, comment: "Support agent hung up on me. Very unprofessional. I expect better from your company.", date: "2026-02-16", status: "negative", source: "Chat", replies: [{ text: "We sincerely apologize for this experience. Please contact us at support@company.com so we can make this right.", date: "2026-02-16" }] },
];

const ratingColors: Record<number, string> = {
  1: "text-red-500",
  2: "text-red-400",
  3: "text-amber-500",
  4: "text-green-400",
  5: "text-green-500",
};

const statusColors: Record<string, string> = {
  positive: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  negative: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

type StatusFilter = "all" | "positive" | "negative" | "neutral";

export default function FeedbackPage() {
  const [mounted, setMounted] = useState(false);
  const [feedback, setFeedback] = useState(feedbackData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

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
        f.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || f.status === statusFilter;
      const matchesRating = ratingFilter === "all" || f.rating === parseInt(ratingFilter);
      const matchesSource = sourceFilter === "all" || f.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesRating && matchesSource;
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

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleReply = (id: string) => {
    if (replyingTo === id) {
      setReplyingTo(null);
      setReplyText("");
    } else {
      setReplyingTo(id);
      setReplyText("");
    }
  };

  const submitReply = (id: string) => {
    if (!replyText.trim()) return;
    setFeedback(prev => prev.map(f => {
      if (f.id === id) {
        return {
          ...f,
          replies: [...f.replies, { text: replyText, date: new Date().toISOString().split('T')[0] }]
        };
      }
      return f;
    }));
    setReplyingTo(null);
    setReplyText("");
  };

  const filterButtons: { value: StatusFilter; label: string; color: string }[] = [
    { value: "all", label: "All", color: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700" },
    { value: "positive", label: "Positive", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50" },
    { value: "neutral", label: "Neutral", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50" },
    { value: "negative", label: "Negative", color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50" },
  ];

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
          <Card className="bg-white dark:bg-[#1a1a1a] border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Feedback</p>
                  <p className="text-2xl font-bold">{totalFeedback}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800/30 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-slate-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Satisfaction Rate</p>
                  <p className="text-2xl font-bold">{satisfactionRate}%</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Avg Rating</p>
                  <p className="text-2xl font-bold flex items-center gap-1">
                    {avgRating} <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Star className="h-6 w-6 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Positive</p>
                  <p className="text-2xl font-bold text-green-600">{positiveCount}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <ThumbsUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Negative</p>
                  <p className="text-2xl font-bold text-red-600">{negativeCount}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <ThumbsDown className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white dark:bg-[#1a1a1a] border-0 shadow-sm">
          <CardContent className="pt-4 pb-4">
            {/* Filter Buttons */}
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-500 mr-2">Filter:</span>
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setStatusFilter(btn.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    statusFilter === btn.value
                      ? btn.color + " ring-2 ring-offset-2 ring-slate-500"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search by customer, email, or comment..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" 
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-36 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ (4)</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ (3)</SelectItem>
                    <SelectItem value="2">⭐⭐ (2)</SelectItem>
                    <SelectItem value="1">⭐ (1)</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-36 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
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

        {/* Feedback Cards */}
        <div className="space-y-4">
          {filteredFeedback.map((item) => (
            <Card 
              key={item.id} 
              className={`bg-white dark:bg-[#1a1a1a] border-0 shadow-sm transition-all ${
                expandedRows.includes(item.id) ? "ring-2 ring-slate-500" : ""
              }`}
            >
              <CardContent className="p-0">
                {/* Main Row */}
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {item.customer.split(" ").map(n => n[0]).join("")}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{item.customer}</span>
                        <span className="text-sm text-slate-400">{item.email}</span>
                        <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 text-xs">{item.source}</Badge>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= item.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} 
                          />
                        ))}
                        <span className={`text-sm ml-1 ${ratingColors[item.rating]}`}>({item.rating}/5)</span>
                      </div>
                      
                      {/* Comment - Expandable */}
                      <div 
                        className="mt-3 cursor-pointer"
                        onClick={() => toggleExpand(item.id)}
                      >
                        <p className={`text-sm text-slate-600 dark:text-slate-300 ${expandedRows.includes(item.id) ? "" : "line-clamp-2"}`}>
                          {item.comment}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          <span>{item.date}</span>
                          <span className="text-slate-500 flex items-center gap-1 hover:underline">
                            {expandedRows.includes(item.id) ? (
                              <> <ChevronUp className="h-3 w-3" /> Show less</>
                            ) : (
                              <> <ChevronDown className="h-3 w-3" /> Show more</>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button 
                        variant={replyingTo === item.id ? "default" : "outline"} 
                        size="sm" 
                        className={`gap-1 ${replyingTo === item.id ? "bg-slate-600 hover:bg-slate-700" : ""}`}
                        onClick={() => handleReply(item.id)}
                      >
                        <Reply className="h-4 w-4" />
                        Reply
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View details</DropdownMenuItem>
                          <DropdownMenuItem><ThumbsUp className="h-4 w-4 mr-2" /> Mark positive</DropdownMenuItem>
                          <DropdownMenuItem><ThumbsDown className="h-4 w-4 mr-2" /> Mark negative</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                
                {/* Reply Section */}
                {replyingTo === item.id && (
                  <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex gap-3">
                      <Textarea
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="min-h-[80px] bg-white dark:bg-slate-900"
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleReply(item.id)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-slate-600 hover:bg-slate-700 gap-1"
                        onClick={() => submitReply(item.id)}
                        disabled={!replyText.trim()}
                      >
                        <Send className="h-4 w-4" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Existing Replies */}
                {item.replies.length > 0 && expandedRows.includes(item.id) && (
                  <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-green-50/50 dark:bg-green-900/10">
                    <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">Replies ({item.replies.length})</p>
                    {item.replies.map((reply, idx) => (
                      <div key={idx} className="text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded-lg mt-2">
                        <p>{reply.text}</p>
                        <p className="text-xs text-slate-400 mt-1">{reply.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {filteredFeedback.length === 0 && (
            <Card className="bg-white dark:bg-[#1a1a1a] border-0 shadow-sm">
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No feedback found matching your criteria</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setRatingFilter("all");
                    setSourceFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
