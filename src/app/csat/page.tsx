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
  Smile, Meh, Frown, Users, Calendar, X, Mail, MessageCircle
} from "lucide-react";

const csatData = {
  score: 4.2,
  total: 1247,
  responses: { positive: 892, neutral: 245, negative: 110 },
  byAgent: [
    { agent: "Sarah M.", name: "Sarah Mitchell", rating: 4.8, responses: 156, trend: "up", positive: 132, neutral: 18, negative: 6, email: "sarah.m@company.com" },
    { agent: "John D.", name: "John Davidson", rating: 4.5, responses: 142, trend: "up", positive: 115, neutral: 20, negative: 7, email: "john.d@company.com" },
    { agent: "Emily R.", name: "Emily Roberts", rating: 4.3, responses: 138, trend: "stable", positive: 108, neutral: 22, negative: 8, email: "emily.r@company.com" },
    { agent: "Mike T.", name: "Mike Thompson", rating: 3.9, responses: 121, trend: "down", positive: 87, neutral: 24, negative: 10, email: "mike.t@company.com" },
  ]
};

const npsData = {
  score: 72,
  promoters: 486,
  passives: 524,
  detractors: 237,
  responses: { promoters: 38.9, passives: 42.0, detractors: 19.0 },
  byAgent: [
    { agent: "Sarah M.", nps: 82, promoters: 68, passives: 52, detractors: 12 },
    { agent: "John D.", nps: 75, promoters: 58, passives: 48, detractors: 14 },
    { agent: "Emily R.", nps: 71, promoters: 52, passives: 46, detractors: 16 },
    { agent: "Mike T.", nps: 58, promoters: 42, passives: 40, detractors: 22 },
  ],
};

const feedbackList = [
  { id: "CSAT-001", customer: "John Smith", rating: 5, comment: "Amazing support! Very quick and helpful.", date: "2026-02-19", agent: "Sarah M.", type: "positive" },
  { id: "CSAT-002", customer: "Sarah Johnson", rating: 2, comment: "Long wait times, not satisfied.", date: "2026-02-19", agent: "John D.", type: "negative" },
  { id: "CSAT-003", customer: "Mike Brown", rating: 4, comment: "Good experience overall.", date: "2026-02-18", agent: "Emily R.", type: "positive" },
  { id: "CSAT-004", customer: "Lisa Davis", rating: 1, comment: "Very disappointed with the service.", date: "2026-02-18", agent: "Mike T.", type: "negative" },
  { id: "CSAT-005", customer: "Chris Wilson", rating: 5, comment: "Perfect! They went above and beyond.", date: "2026-02-17", agent: "Sarah M.", type: "positive" },
];

// Agent Detail Modal
function AgentDetailModal({ agent, type, onClose }: { agent: typeof csatData.byAgent[0]; type: "csat" | "nps"; onClose: () => void }) {
  const npsAgent = npsData.byAgent.find(n => n.agent === agent.agent);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white dark:bg-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
              {agent.agent.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{agent.name}</h3>
              <p className="text-sm text-slate-500">{agent.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-6">
          {/* CSAT Breakdown */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              CSAT Breakdown
            </h4>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
                <p className="text-2xl font-bold text-green-600">{agent.positive}</p>
                <p className="text-xs text-slate-500">Positive (4-5)</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
                <p className="text-2xl font-bold">{agent.neutral}</p>
                <p className="text-xs text-slate-500">Neutral (3)</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-center">
                <p className="text-2xl font-bold text-red-600">{agent.negative}</p>
                <p className="text-xs text-slate-500">Negative (1-2)</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Satisfaction Rate</span>
                <span className="font-medium">{Math.round((agent.positive / agent.responses) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${(agent.positive / agent.responses) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* NPS Breakdown */}
          {npsAgent && (
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-slate-500" />
                NPS Breakdown
              </h4>
              <div className="flex items-center justify-center mb-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-slate-600">{npsAgent.nps}</p>
                  <p className="text-xs text-slate-500">NPS Score</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
                  <p className="text-xl font-bold text-green-600">{npsAgent.promoters}</p>
                  <p className="text-xs text-slate-500">Promoters</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-center">
                  <p className="text-xl font-bold text-amber-600">{npsAgent.passives}</p>
                  <p className="text-xs text-slate-500">Passives</p>
                </div>
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-center">
                  <p className="text-xl font-bold text-red-600">{npsAgent.detractors}</p>
                  <p className="text-xs text-slate-500">Detractors</p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Feedback */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-blue-500" />
              Recent Feedback
            </h4>
            <div className="space-y-2">
              {feedbackList.filter(f => f.agent === agent.agent).slice(0, 3).map((feedback) => (
                <div key={feedback.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{feedback.customer}</span>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className={`h-3 w-3 ${star <= feedback.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button className="flex-1 bg-slate-600 hover:bg-slate-700">View All Feedback</Button>
            <Button variant="outline">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CSATPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("csat");
  const [selectedAgent, setSelectedAgent] = useState<typeof csatData.byAgent[0] | null>(null);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const toggleAgentExpand = (agent: string) => {
    setExpandedAgent(expandedAgent === agent ? null : agent);
  };

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
                    <div className="p-2.5 rounded-xl bg-slate-50">
                      <Star className="h-5 w-5 text-slate-600" />
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
                <div className="space-y-2">
                  {csatData.byAgent.map((agent, i) => (
                    <div 
                      key={i} 
                      className="rounded-lg border overflow-hidden cursor-pointer transition-all hover:shadow-md"
                      onClick={() => setSelectedAgent(agent)}
                    >
                      {/* Agent Card Header - Clickable */}
                      <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-blue-500 flex items-center justify-center text-white font-medium">
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
                          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${expandedAgent === agent.agent ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      
                      {/* Expandable Details */}
                      {expandedAgent === agent.agent && (
                        <div className="p-3 border-t bg-slate-50 dark:bg-slate-800/50" onClick={(e) => e.stopPropagation()}>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                              <p className="text-lg font-bold text-green-600">{agent.positive}</p>
                              <p className="text-xs text-slate-500">Positive</p>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                              <p className="text-lg font-bold">{agent.neutral}</p>
                              <p className="text-xs text-slate-500">Neutral</p>
                            </div>
                            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                              <p className="text-lg font-bold text-red-600">{agent.negative}</p>
                              <p className="text-xs text-slate-500">Negative</p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t flex gap-2">
                            <Button size="sm" className="flex-1 bg-slate-600 hover:bg-slate-700" onClick={() => setSelectedAgent(agent)}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      )}
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
                      <p className="text-6xl font-bold text-slate-600">{npsData.score}</p>
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

            {/* NPS by Agent */}
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">NPS by Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {npsData.byAgent.map((agent, i) => (
                    <div 
                      key={i} 
                      className="rounded-lg border overflow-hidden cursor-pointer transition-all hover:shadow-md"
                      onClick={() => {
                        const csatAgent = csatData.byAgent.find(c => c.agent === agent.agent);
                        if (csatAgent) setSelectedAgent(csatAgent);
                      }}
                    >
                      <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-blue-500 flex items-center justify-center text-white font-medium">
                            {agent.agent.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{agent.agent}</p>
                            <p className="text-sm text-slate-500">{agent.promoters + agent.passives + agent.detractors} responses</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${agent.nps >= 70 ? 'text-green-600' : agent.nps >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                              {agent.nps}
                            </p>
                            <p className="text-xs text-slate-500">NPS</p>
                          </div>
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Agent Detail Modal */}
        {selectedAgent && (
          <AgentDetailModal 
            agent={selectedAgent} 
            type={activeTab as "csat" | "nps"}
            onClose={() => setSelectedAgent(null)} 
          />
        )}
      </div>
    </DashboardLayout>
  );
}
