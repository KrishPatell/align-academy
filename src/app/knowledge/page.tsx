"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Plus, FileText, BookOpen, HelpCircle, ChevronRight, ChevronDown, 
  Eye, ThumbsUp, ArrowLeft, Clock, User, X, Copy, ExternalLink
} from "lucide-react";

const getStartedSections = [
  { id: 1, title: "Quick Start Guide", content: "Get up and running in under 5 minutes with our step-by-step guide." },
  { id: 2, title: "Account Setup", content: "Learn how to configure your account settings and preferences." },
  { id: 3, title: "First Integration", content: "Connect your first tool and start automating workflows." },
];

const categories = [
  { id: 1, name: "Getting Started", articles: 12, icon: BookOpen, description: "Everything you need to begin" },
  { id: 2, name: "Account & Billing", articles: 8, icon: FileText, description: "Manage your account" },
  { id: 3, name: "Technical Support", articles: 15, icon: HelpCircle, description: "Get help when you need it" },
  { id: 4, name: "FAQs", articles: 20, icon: HelpCircle, description: "Common questions answered" },
];

const articles = [
  { id: 1, title: "How to reset your password", category: "Getting Started", views: 1250, helpful: 89, date: "2025-01-15", author: "Sarah Johnson", content: "To reset your password, follow these simple steps:\n\n1. Click on the 'Forgot Password' link on the login page\n2. Enter your registered email address\n3. Check your inbox for the reset link\n4. Click the link and create a new password\n5. Make sure your new password is strong and unique\n\nTips for a secure password:\n- Use at least 8 characters\n- Include uppercase and lowercase letters\n- Add numbers and special characters\n- Avoid using personal information" },
  { id: 2, title: "Understanding your invoice", category: "Account & Billing", views: 980, helpful: 76, date: "2025-01-20", author: "Mike Chen", content: "Your invoice contains several important sections:\n\n**Invoice Header**: Contains your account details and invoice number\n\n**Billing Period**: The dates covered by this invoice\n\n**Line Items**: Detailed breakdown of charges\n\n**Total**: Final amount due\n\n**Payment Methods**: Accepted payment options\n\nIf you have any questions about your invoice, contact our billing team." },
  { id: 3, title: "Setting up two-factor authentication", category: "Getting Started", views: 856, helpful: 82, date: "2025-02-01", author: "Emma Wilson", content: "Two-factor authentication adds an extra layer of security:\n\n1. Go to Settings > Security\n2. Click 'Enable 2FA'\n3. Choose your verification method (SMS or Authenticator App)\n4. Scan the QR code with your authenticator app\n5. Enter the verification code\n6. Save your backup codes securely\n\nWe strongly recommend using an authenticator app for better security." },
  { id: 4, title: "Troubleshooting login issues", category: "Technical Support", views: 743, helpful: 65, date: "2025-02-10", author: "David Park", content: "Can't log in? Try these solutions:\n\n**Clear your browser cache**\nSometimes cached data causes login issues. Clear your browser's cache and cookies.\n\n**Check your credentials**\nMake sure you're using the correct email and password.\n\n**Disable extensions**\nBrowser extensions can sometimes interfere with login.\n\n**Try incognito mode**\nThis bypasses cached data and extensions.\n\nIf problems persist, contact support." },
  { id: 5, title: "How to upgrade your plan", category: "Account & Billing", views: 620, helpful: 71, date: "2025-02-05", author: "Sarah Johnson", content: "Upgrading your plan is easy:\n\n1. Go to Settings > Subscription\n2. Click 'Change Plan'\n3. Browse available plans\n4. Select your desired plan\n5. Confirm your choice\n6. Enjoy your new features!\n\nProrated charges will apply for upgrades mid-cycle." },
  { id: 6, title: "API Documentation", category: "Technical Support", views: 520, helpful: 88, date: "2025-02-12", author: "Alex Rivera", content: "Our comprehensive API documentation covers:\n\n- Authentication\n- Endpoints\n- Webhooks\n- Rate limits\n- Error handling\n\nVisit our developer portal for full documentation." },
];

export default function KnowledgePage() {
  const [mounted, setMounted] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [selectedArticle, typeofarticles[0] | null] = useState(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filteredArticles = selectedCategory 
    ? articles.filter(a => a.category === selectedCategory.name)
    : articles;

  const handleCategoryClick = (category: typeof categories[0]) => {
    setSelectedCategory(category);
    setSelectedArticle(null);
  };

  const handleArticleClick = (article: typeof articles[0]) => {
    setSelectedArticle(article);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedArticle(null);
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
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
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" /> New Article
          </Button>
        </div>

        {/* Get Started Section */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-0">
            <button 
              onClick={() => setGetStartedOpen(!getStartedOpen)}
              className="w-full p-4 flex items-center justify-between hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors rounded-t-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-600 text-white">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100">Get Started</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Quick guides to help you begin</p>
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 text-purple-600 transition-transform duration-300 ${getStartedOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                getStartedOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 pb-4 pt-2 space-y-2">
                {getStartedSections.map((section) => (
                  <div 
                    key={section.id}
                    className="p-3 bg-white dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 cursor-pointer transition-colors"
                  >
                    <p className="font-medium text-purple-900 dark:text-purple-100">{section.title}</p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Breadcrumb */}
        {(selectedCategory || selectedArticle) && (
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={handleBackToCategories}
              className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Categories
            </button>
            {selectedCategory && !selectedArticle && (
              <>
                <ChevronRight className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-400">{selectedCategory.name}</span>
              </>
            )}
            {selectedArticle && (
              <>
                <ChevronRight className="h-4 w-4 text-slate-400" />
                <button 
                  onClick={handleBackToArticles}
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Articles
                </button>
                <ChevronRight className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-400 truncate max-w-[200px]">{selectedArticle.title}</span>
              </>
            )}
          </div>
        )}

        {/* Category View */}
        {!selectedCategory && !selectedArticle && (
          <Tabs defaultValue="categories">
            <TabsList>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="articles">All Articles</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <Card 
                    key={cat.id} 
                    className="bg-white dark:bg-[#1a1a1a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800 group"
                    onClick={() => handleCategoryClick(cat)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-colors">
                          <cat.icon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{cat.name}</p>
                          <p className="text-sm text-slate-500">{cat.articles} articles</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mb-4">{cat.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <Button variant="ghost" size="sm" className="text-purple-600 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 transition-colors">
                          View <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="articles" className="mt-4">
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardContent className="pt-6">
                  <div className="relative max-w-md mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search articles..." className="pl-10" />
                  </div>
                  <div className="space-y-3">
                    {articles.map((article) => (
                      <div 
                        key={article.id} 
                        onClick={() => handleArticleClick(article)}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-purple-200 dark:hover:border-purple-800 hover:shadow-md transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <FileText className="h-5 w-5 text-slate-400 group-hover:text-purple-500 transition-colors" />
                          <div>
                            <p className="font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">{article.title}</p>
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
                          <Button variant="ghost" size="sm" className="group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30">
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Articles List for Selected Category */}
        {selectedCategory && !selectedArticle && (
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                  <selectedCategory.icon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedCategory.name}</h2>
                  <p className="text-slate-500">{selectedCategory.description}</p>
                </div>
              </div>
              <div className="space-y-3">
                {filteredArticles.map((article) => (
                  <div 
                    key={article.id} 
                    onClick={() => handleArticleClick(article)}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-purple-200 dark:hover:border-purple-800 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-slate-400 group-hover:text-purple-500 transition-colors" />
                      <div>
                        <p className="font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">{article.title}</p>
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
                      <Button variant="ghost" size="sm" className="group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30">
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Article Detail View */}
        {selectedArticle && (
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-purple-600 border-purple-200">
                    {selectedArticle.category}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" /> {selectedArticle.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {selectedArticle.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" /> {selectedArticle.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" /> {selectedArticle.helpful}% found this helpful
                  </div>
                </div>
              </div>
              
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">
                  {selectedArticle.content}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex items-center justify-between">
                <div>
                  <p className="font-medium mb-2">Was this article helpful?</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <ThumbsUp className="h-4 w-4" /> Yes
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <ThumbsUp className="h-4 w-4 rotate-180" /> No
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Copy className="h-4 w-4" /> Copy link
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" /> Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
