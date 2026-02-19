"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, BookOpen, HelpCircle, ChevronRight, ChevronDown, Eye, ThumbsUp, ArrowLeft, Clock, User, X } from "lucide-react";

const categories = [
  { id: 1, name: "Getting Started", articles: 12, icon: BookOpen, color: "from-green-500 to-emerald-500", description: "Learn the basics of using Kravio" },
  { id: 2, name: "Account & Billing", articles: 8, icon: FileText, color: "from-blue-500 to-cyan-500", description: "Manage payments and subscriptions" },
  { id: 3, name: "Technical Support", articles: 15, icon: HelpCircle, color: "from-purple-500 to-violet-500", description: "Troubleshooting and technical guides" },
  { id: 4, name: "FAQs", articles: 20, icon: HelpCircle, color: "from-amber-500 to-orange-500", description: "Frequently asked questions" },
];

const articles = [
  { id: 1, title: "How to reset your password", category: "Getting Started", views: 1250, helpful: 89, content: "To reset your password, navigate to Settings > Security > Change Password. Enter your current password, then type your new password twice to confirm. Click 'Update Password' to save. If you've forgotten your current password, click 'Forgot Password' on the login page and follow the email instructions.", author: "Sarah Mitchell", updated: "2026-02-15" },
  { id: 2, title: "Understanding your invoice", category: "Account & Billing", views: 980, helpful: 76, content: "Your invoice includes a breakdown of all charges for the billing period. The summary section shows your plan cost, any add-ons, and applicable taxes. You can download invoices as PDF from the Invoices page. For billing questions, contact our support team.", author: "John Davidson", updated: "2026-02-12" },
  { id: 3, title: "Setting up two-factor authentication", category: "Getting Started", views: 856, helpful: 82, content: "Two-factor authentication (2FA) adds an extra layer of security. Go to Settings > Security > Two-Factor Authentication. Click 'Enable' and scan the QR code with an authenticator app like Google Authenticator or Authy. Enter the 6-digit code to verify, then save your backup codes in a secure location.", author: "Emily Roberts", updated: "2026-02-10" },
  { id: 4, title: "Troubleshooting login issues", category: "Technical Support", views: 743, helpful: 65, content: "If you're having trouble logging in: 1) Clear your browser cache and cookies. 2) Try a different browser or incognito mode. 3) Check if your account is locked after too many failed attempts. 4) Ensure your email address is correct. 5) Reset your password if needed. Contact support if the issue persists.", author: "Mike Thompson", updated: "2026-02-08" },
  { id: 5, title: "How to upgrade your plan", category: "Account & Billing", views: 620, helpful: 71, content: "To upgrade your plan, go to Settings > Subscription > Change Plan. Select your desired plan and review the pricing changes. Upgrades take effect immediately, and you'll be charged a prorated amount for the remaining billing period. Downgrades take effect at the start of your next billing cycle.", author: "Lisa Anderson", updated: "2026-02-05" },
];

const gettingStartedSteps = [
  { title: "Create your account", description: "Sign up and set up your profile with your team details.", done: true },
  { title: "Invite team members", description: "Add your support agents and assign them to teams.", done: true },
  { title: "Configure integrations", description: "Connect Slack, email, and other tools to streamline your workflow.", done: false },
  { title: "Set up your Knowledge Base", description: "Create help articles for your customers to find answers quickly.", done: false },
  { title: "Customize your dashboard", description: "Personalize widgets and views to match your workflow.", done: false },
];

export default function KnowledgePage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const [gettingStartedOpen, setGettingStartedOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0, 1]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // Article detail view
  if (selectedArticle) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6 max-w-4xl">
          <Button variant="ghost" onClick={() => setSelectedArticle(null)} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Knowledge Base
          </Button>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-8 pb-8">
              <Badge variant="outline" className="mb-4">{selectedArticle.category}</Badge>
              <h1 className="text-2xl font-bold mb-4">{selectedArticle.title}</h1>
              <div className="flex items-center gap-6 text-sm text-slate-500 mb-8 pb-6 border-b">
                <div className="flex items-center gap-2"><User className="h-4 w-4" /> {selectedArticle.author}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Updated {selectedArticle.updated}</div>
                <div className="flex items-center gap-2"><Eye className="h-4 w-4" /> {selectedArticle.views.toLocaleString()} views</div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">{selectedArticle.content}</p>
              </div>
              <div className="mt-10 pt-6 border-t">
                <p className="text-sm text-slate-500 mb-3">Was this article helpful?</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => alert("Thanks for your feedback!")}>
                    <ThumbsUp className="h-4 w-4" /> Yes ({selectedArticle.helpful}%)
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => alert("Thanks! We'll work on improving this article.")}>
                    👎 No
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const filteredArticles = articles.filter(a => {
    const matchesSearch = searchQuery ? a.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesCategory = selectedCategory ? a.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Resources / Knowledge Base</div>
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
            <p className="text-slate-500 text-sm">Help articles and documentation</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" /> New Article
          </Button>
        </div>

        {/* Get Started Section */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setGettingStartedOpen(!gettingStartedOpen)}>
              <div>
                <h2 className="text-xl font-bold">🚀 Get Started with Kravio</h2>
                <p className="text-purple-100 text-sm mt-1">{completedSteps.length} of {gettingStartedSteps.length} steps completed</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-white/20 rounded-full">
                  <div className="h-2 bg-white rounded-full transition-all" style={{ width: `${(completedSteps.length / gettingStartedSteps.length) * 100}%` }} />
                </div>
                {gettingStartedOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </div>
            </div>
            {gettingStartedOpen && (
              <div className="mt-6 space-y-3">
                {gettingStartedSteps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-colors cursor-pointer ${
                      completedSteps.includes(i) ? "bg-white/10" : "bg-white/5 hover:bg-white/10"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompletedSteps(prev =>
                        prev.includes(i) ? prev.filter(s => s !== i) : [...prev, i]
                      );
                    }}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      completedSteps.includes(i)
                        ? "bg-white text-purple-600"
                        : "border-2 border-white/50 text-white/70"
                    }`}>
                      {completedSteps.includes(i) ? "✓" : i + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${completedSteps.includes(i) ? "line-through opacity-70" : ""}`}>{step.title}</p>
                      <p className="text-sm text-purple-100/80">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="categories">
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="articles">All Articles</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-4">
            {selectedCategory && (
              <div className="mb-4">
                <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> All Categories
                </Button>
                <h2 className="text-xl font-bold mt-2 ml-2">{selectedCategory}</h2>
              </div>
            )}

            {!selectedCategory ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <Card
                    key={cat.id}
                    className="bg-white dark:bg-[#1a1a1a] hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color}`}>
                          <cat.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{cat.name}</p>
                          <p className="text-sm text-slate-500">{cat.articles} articles</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mb-4">{cat.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <Button variant="ghost" size="sm" className="text-purple-600">
                          View <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {articles.filter(a => a.category === selectedCategory).map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer bg-white dark:bg-[#1a1a1a]"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium">{article.title}</p>
                        <p className="text-sm text-slate-500">{article.views.toLocaleString()} views · {article.helpful}% helpful</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                ))}
                {articles.filter(a => a.category === selectedCategory).length === 0 && (
                  <p className="text-center text-slate-500 py-8">No articles in this category yet.</p>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="articles" className="mt-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardContent className="pt-6">
                <div className="relative max-w-md mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="flex items-center gap-4">
                        <FileText className="h-5 w-5 text-slate-400" />
                        <div>
                          <p className="font-medium">{article.title}</p>
                          <p className="text-sm text-slate-500">{article.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Eye className="h-4 w-4" /> {article.views}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <ThumbsUp className="h-4 w-4" /> {article.helpful}%
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                  {filteredArticles.length === 0 && (
                    <p className="text-center text-slate-500 py-8">No articles found.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
