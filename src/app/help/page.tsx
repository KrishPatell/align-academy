"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Search, HelpCircle, MessageSquare, Mail, Phone, ChevronRight, ChevronDown, ChevronUp, FileText, BookOpen, Zap, CreditCard, Users, Settings, X, ThumbsUp, ThumbsDown } from "lucide-react";

const helpTopics = [
  { id: 1, title: "Getting Started", icon: Zap, color: "from-blue-500 to-cyan-500", articles: 12, description: "Learn the basics of Kravio" },
  { id: 2, title: "Account & Billing", icon: CreditCard, color: "from-green-500 to-emerald-500", articles: 8, description: "Manage your subscription" },
  { id: 3, title: "Integrations", icon: Settings, color: "from-slate-500 to-pink-500", articles: 15, description: "Connect with your tools" },
  { id: 4, title: "Team Management", icon: Users, color: "from-orange-500 to-red-500", articles: 10, description: "Add and manage team members" },
  { id: 5, title: "Security", icon: HelpCircle, color: "from-slate-500 to-slate-500", articles: 6, description: "Keep your account secure" },
  { id: 6, title: "API Reference", icon: FileText, color: "from-teal-500 to-blue-500", articles: 20, description: "Developer documentation" },
];

const faqs = [
  { id: 1, question: "How do I reset my password?", answer: "Go to Settings > Security > Reset Password. You'll receive an email with a reset link." },
  { id: 2, question: "Can I change my plan later?", answer: "Yes! Go to Settings > Billing and click 'Change Plan'. You can upgrade or downgrade anytime." },
  { id: 3, question: "How do I add team members?", answer: "Navigate to Team > Add Members. Enter their email and select a role." },
  { id: 4, question: "What integrations are available?", answer: "We support Slack, Zapier, GitHub, Jira, and 50+ more integrations. Check the Integrations page." },
  { id: 5, question: "How does billing work?", answer: "We bill monthly or annually. You can change your billing cycle in Settings > Billing." },
];

const popularArticles = [
  { id: 1, title: "Quick Start Guide", views: 1250 },
  { id: 2, title: "Setting up integrations", views: 980 },
  { id: 3, title: "Managing team permissions", views: 856 },
  { id: 4, title: "Billing FAQ", views: 743 },
];

export default function HelpPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<typeof helpTopics[0] | null>(null);
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<number, boolean>>({});

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const openTopic = (topic: typeof helpTopics[0]) => {
    setSelectedTopic(topic);
    setIsTopicOpen(true);
  };

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const submitFeedback = (faqId: number, isHelpful: boolean) => {
    setHelpfulFeedback(prev => ({ ...prev, [faqId]: isHelpful }));
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Support / Help Center</div>
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <p className="text-slate-500 text-sm">Find answers and get help</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search for help..." 
            className="pl-12 h-14 text-lg bg-white dark:bg-[#1a1a1a] shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-slate-600 to-blue-600 text-white cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-slate-100 text-sm">Chat with support</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-green-100 text-sm">support@kravio.com</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-orange-100 text-sm">Mon-Fri 9am-6pm</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Topics */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Browse by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {helpTopics.map((topic) => (
              <Card 
                key={topic.id} 
                className="bg-white dark:bg-[#1a1a1a] hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 group"
                onClick={() => openTopic(topic)}
              >
                <CardContent className="pt-6 text-center">
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <topic.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-slate-600 transition-colors">{topic.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{topic.articles} articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-600" />
                Popular Articles
              </h3>
              <div className="space-y-3">
                {popularArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <span className="font-medium">{article.title}</span>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>{article.views} views</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-slate-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="font-medium">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4 animate-fade-in">
                        <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                          <span className="text-sm text-slate-500">Was this helpful?</span>
                          <div className="flex gap-2">
                            <Button 
                              variant={helpfulFeedback[faq.id] === true ? "default" : "outline"} 
                              size="sm"
                              onClick={() => submitFeedback(faq.id, true)}
                              className={helpfulFeedback[faq.id] === true ? "bg-green-600" : ""}
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant={helpfulFeedback[faq.id] === false ? "default" : "outline"} 
                              size="sm"
                              onClick={() => submitFeedback(faq.id, false)}
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Topic Detail Dialog */}
        <Dialog open={isTopicOpen} onOpenChange={setIsTopicOpen}>
          <DialogContent className="max-w-2xl">
            {selectedTopic && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedTopic.color} flex items-center justify-center`}>
                      <selectedTopic.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <DialogTitle>{selectedTopic.title}</DialogTitle>
                      <p className="text-sm text-slate-500">{selectedTopic.description}</p>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="py-4 space-y-2 max-h-96 overflow-y-auto">
                  {Array.from({ length: selectedTopic.articles }).map((_, i) => (
                    <div key={i} className="p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors flex items-center justify-between">
                      <span className="font-medium">Article {i + 1}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  ))}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsTopicOpen(false)}>Close</Button>
                  <Button className="bg-slate-600 hover:bg-slate-700 gap-2">
                    <MessageSquare className="h-4 w-4" /> Contact Support
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
