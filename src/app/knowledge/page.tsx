"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, BookOpen, HelpCircle, ChevronRight, Eye, ThumbsUp, ThumbsDown, Clock, User, ArrowRight, X } from "lucide-react";

const categories = [
  { id: 1, name: "Getting Started", articles: 12, icon: BookOpen, color: "from-blue-500 to-cyan-500" },
  { id: 2, name: "Account & Billing", articles: 8, icon: FileText, color: "from-purple-500 to-pink-500" },
  { id: 3, name: "Technical Support", articles: 15, icon: HelpCircle, color: "from-green-500 to-emerald-500" },
  { id: 4, name: "Integrations", articles: 10, icon: ArrowRight, color: "from-orange-500 to-red-500" },
  { id: 5, name: "API Documentation", articles: 20, icon: FileText, color: "from-indigo-500 to-purple-500" },
  { id: 6, name: "Best Practices", articles: 8, icon: BookOpen, color: "from-teal-500 to-blue-500" },
];

const getStartedArticles = [
  { id: 1, title: "Welcome to Kravio", excerpt: "Get started with your account setup and basic configuration", category: "Getting Started" },
  { id: 2, title: "Setting up your first team", excerpt: "Learn how to invite team members and manage roles", category: "Getting Started" },
  { id: 3, title: "Understanding your dashboard", excerpt: "A complete tour of all features and capabilities", category: "Getting Started" },
];

const articles = [
  { id: 1, title: "How to reset your password", category: "Getting Started", views: 1250, helpful: 89, date: "Feb 15, 2026" },
  { id: 2, title: "Understanding your invoice", category: "Account & Billing", views: 980, helpful: 76, date: "Feb 14, 2026" },
  { id: 3, title: "Setting up two-factor authentication", category: "Getting Started", views: 856, helpful: 82, date: "Feb 13, 2026" },
  { id: 4, title: "Troubleshooting login issues", category: "Technical Support", views: 743, helpful: 65, date: "Feb 12, 2026" },
  { id: 5, title: "How to upgrade your plan", category: "Account & Billing", views: 620, helpful: 71, date: "Feb 11, 2026" },
  { id: 6, title: "API authentication guide", category: "API Documentation", views: 520, helpful: 88, date: "Feb 10, 2026" },
  { id: 7, title: "Webhook configuration", category: "Integrations", views: 445, helpful: 79, date: "Feb 9, 2026" },
  { id: 8, title: "Best practices for support teams", category: "Best Practices", views: 380, helpful: 92, date: "Feb 8, 2026" },
];

export default function KnowledgePage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const [expandedGetStarted, setExpandedGetStarted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filteredArticles = activeTab === "all" 
    ? articles 
    : articles.filter(a => a.category.toLowerCase() === activeTab);

  const openArticle = (article: typeof articles[0]) => {
    setSelectedArticle(article);
    setIsArticleOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Resources / Knowledge Base</div>
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
            <p className="text-slate-500 text-sm">Help articles and documentation</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
            <Plus className="h-4 w-4" /> New Article
          </Button>
        </div>

        {/* Get Started Section */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">🚀 Get Started</h2>
                <p className="text-purple-100 mb-4">New to Kravio? Start here for quick setup guides</p>
                <div className="flex flex-wrap gap-2">
                  {getStartedArticles.slice(0, expandedGetStarted ? 3 : 2).map((article) => (
                    <Button 
                      key={article.id}
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 border-0 text-white"
                      onClick={() => openArticle({...article, views: 0, helpful: 0, date: ""})}
                    >
                      {article.title}
                    </Button>
                  ))}
                  {!expandedGetStarted && getStartedArticles[2] && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={() => setExpandedGetStarted(true)}
                    >
                      +{getStartedArticles.length - 2} more
                    </Button>
                  )}
                </div>
              </div>
              <BookOpen className="h-24 w-24 text-white/20" />
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search articles..." 
            className="pl-12 h-12 text-lg bg-white dark:bg-[#1a1a1a]"
          />
        </div>

        {/* Categories Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Card 
                key={cat.id} 
                className="bg-white dark:bg-[#1a1a1a] hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCategory(cat)}
              >
                <CardContent className="pt-6 text-center">
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <cat.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-purple-600 transition-colors">{cat.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{cat.articles} articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">All Articles</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 flex flex-wrap h-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="getting started">Getting Started</TabsTrigger>
              <TabsTrigger value="account & billing">Billing</TabsTrigger>
              <TabsTrigger value="technical support">Technical</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="api documentation">API</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-3">
                {filteredArticles.map((article) => (
                  <Card 
                    key={article.id} 
                    className="bg-white dark:bg-[#1a1a1a] hover:shadow-md transition-all duration-200 cursor-pointer group"
                    onClick={() => openArticle(article)}
                  >
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {article.date}
                            </span>
                          </div>
                          <h3 className="font-medium group-hover:text-purple-600 transition-colors">{article.title}</h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" /> {article.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" /> {article.helpful}%
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-purple-500 transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Article Detail Dialog */}
        <Dialog open={isArticleOpen} onOpenChange={setIsArticleOpen}>
          <DialogContent className="max-w-2xl">
            {selectedArticle && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{selectedArticle.category}</Badge>
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {selectedArticle.date}
                    </span>
                  </div>
                  <DialogTitle className="text-xl">{selectedArticle.title}</DialogTitle>
                </DialogHeader>
                
                <div className="py-4 space-y-4">
                  <p className="text-slate-600 dark:text-slate-300">
                    This is a placeholder for the article content. In a full implementation, 
                    this would contain the full article text, code snippets, images, and step-by-step guides.
                  </p>
                  
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <h4 className="font-medium mb-2">Quick Summary</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Learn how to properly configure and use this feature for optimal results.
                    </p>
                  </div>

                  {selectedArticle.views > 0 && (
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" /> {selectedArticle.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" /> {selectedArticle.helpful}% found this helpful
                      </span>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">Was this helpful?</span>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsUp className="h-4 w-4" /> Yes
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsDown className="h-4 w-4" /> No
                      </Button>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Print Article
                    </Button>
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Category Articles Dialog */}
        <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
          <DialogContent className="max-w-2xl">
            {selectedCategory && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedCategory.color} flex items-center justify-center`}>
                      <selectedCategory.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <DialogTitle>{selectedCategory.name}</DialogTitle>
                      <p className="text-sm text-slate-500">{selectedCategory.articles} articles</p>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="py-4 space-y-2 max-h-96 overflow-y-auto">
                  {articles.filter(a => a.category === selectedCategory.name).map((article) => (
                    <div 
                      key={article.id}
                      className="p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedCategory(null);
                        openArticle(article);
                      }}
                    >
                      <h4 className="font-medium">{article.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {article.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" /> {article.helpful}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
