"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, BookOpen, HelpCircle, ChevronRight, Eye, ThumbsUp } from "lucide-react";

const categories = [
  { id: 1, name: "Getting Started", articles: 12, icon: BookOpen },
  { id: 2, name: "Account & Billing", articles: 8, icon: FileText },
  { id: 3, name: "Technical Support", articles: 15, icon: HelpCircle },
  { id: 4, name: "FAQs", articles: 20, icon: HelpCircle },
];

const articles = [
  { id: 1, title: "How to reset your password", category: "Getting Started", views: 1250, helpful: 89 },
  { id: 2, title: "Understanding your invoice", category: "Account & Billing", views: 980, helpful: 76 },
  { id: 3, title: "Setting up two-factor authentication", category: "Getting Started", views: 856, helpful: 82 },
  { id: 4, title: "Troubleshooting login issues", category: "Technical Support", views: 743, helpful: 65 },
  { id: 5, title: "How to upgrade your plan", category: "Account & Billing", views: 620, helpful: 71 },
];

export default function KnowledgePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

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

        <Tabs defaultValue="categories">
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="articles">All Articles</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <Card key={cat.id} className="bg-white dark:bg-[#1a1a1a] hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                        <cat.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{cat.name}</p>
                        <p className="text-sm text-slate-500">{cat.articles} articles</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <Button variant="ghost" size="sm" className="text-purple-600">
                        View <ChevronRight className="h-4 w-4 ml-1" />
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
                    <div key={article.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
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
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
