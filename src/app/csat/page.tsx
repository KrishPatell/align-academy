"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Filter, MoreHorizontal, ChevronDown, ChevronUp,
  TrendingUp, TrendingDown, ThumbsUp, ThumbsDown, Star, 
  Smile, Meh, Frown, Users, Calendar 
} from "lucide-react";

const csatData = {
  score: 4.2,
  total: 1247,
  responses: { positive: 892, neutral: 245, negative: 110 },
  byAgent: [
    { agent: "Sarah M.", rating: 4.8, responses: 156, trend: "up" },
    { agent: "John D.", rating: 4.5, responses: 142, trend: "up" },
    { agent: "Emily R.", rating: 4.3, responses: 138, trend: "stable" },
    { agent: "Mike T.", rating: 3.9, responses: 121, trend: "down" },
  ]
};

const npsData = {
  score: 72,
  promoters: 486,
  passives: 524,
  detractors: 237,
  responses: { promoters: 38.9, passives: 42.0, detractors: 19.0 },
};

const feedbackList = [
  { id: "CSAT-001", customer: "John Smith", rating: 5, comment: "Amazing support! Very quick and helpful.", date: "2026-02-19", agent: "Sarah M.", type: "positive" },
  { id: "CSAT-002", customer: "Sarah Johnson", rating: 2, comment: "Long wait times, not satisfied.", date: "2026-02-19", agent: "John D.", type: "negative" },
  { id: "CSAT-003", customer: "Mike Brown", rating: 4, comment: "Good experience overall.", date: "2026-02-18", agent: "Emily R.", type: "positive" },
  { id: "CSAT-004", customer: "Lisa Davis", rating: 1, comment: "Very disappointed with the service.", date: "2026-02-18", agent: "Mike T.", type: "negative" },
  { id: "CSAT-005", customer: "Chris Wilson", rating: 5, comment: "Perfect! They went above and beyond.", date: "2026-02-17", agent: "Sarah M.", type: "positive" },
];

export default function CSATPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("csat");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Analytics / CSAT & NPS</div>
            <h1 className="text-2xl font-bold">Customer Satisfaction</h1>
            <p className="text-slate-500 text-sm">Track CSAT scores and Net Promoter Score</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="csat">CSAT</TabsTrigger>
            <TabsTrigger value="nps">NPS</TabsTrigger>
          </TabsList>

          <TabsContent value="csat" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-50">
                      <Star className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">CSAT Score</p>
                      <p className="text-2xl font-bold">{csatData.score}/5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-50">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Total Responses</p>
                      <p className="text-2xl font-bold">{csatData.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-green-50">
                      <ThumbsUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Positive</p>
                      <p className="text-2xl font-bold text-green-600">{csatData.responses.positive}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-red-50">
                      <ThumbsDown className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Negative</p>
                      <p className="text-2xl font-bold text-red-600">{csatData.responses.negative}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">CSAT by Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {csatData.byAgent.map((agent, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
                          {agent.agent.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{agent.agent}</p>
                          <p className="text-sm text-slate-500">{agent.responses} responses</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className={`h-4 w-4 ${star <= agent.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />
                          ))}
                        </div>
                        {agent.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {agent.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                        {agent.trend === "stable" && <Meh className="h-4 w-4 text-slate-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nps" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white dark:bg-[#1a1a1a] lg:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-slate-500 mb-2">NPS Score</p>
                      <p className="text-6xl font-bold text-purple-600">{npsData.score}</p>
                      <p className="text-sm text-slate-500 mt-2">Excellent (100+ is excellent)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-green-50">
                      <Smile className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Promoters (9-10)</p>
                      <p className="text-2xl font-bold">{npsData.promoters}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-[#1a1a1a]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-red-50">
                      <Frown className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Detractors (0-6)</p>
                      <p className="text-2xl font-bold">{npsData.detractors}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">NPS Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Promoters (9-10)</span>
                      <span className="font-medium">{npsData.responses.promoters}%</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${npsData.responses.promoters}%` }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Passives (7-8)</span>
                      <span className="font-medium">{npsData.responses.passives}%</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${npsData.responses.passives}%` }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Detractors (0-6)</span>
                      <span className="font-medium">{npsData.responses.detractors}%</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${npsData.responses.detractors}%` }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
