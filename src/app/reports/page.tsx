"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Download, FileText, Calendar, BarChart3, PieChart, 
  LineChart, Clock, Users, DollarSign, TrendingUp, Filter,
  Play, CheckCircle, XCircle
} from "lucide-react";

const reportTemplates = [
  { id: 1, name: "SLA Performance Report", description: "Track SLA compliance and breach rates", type: "SLA", lastRun: "2 hours ago", status: "ready" },
  { id: 2, name: "Agent Performance", description: "Individual and team metrics", type: "Performance", lastRun: "1 day ago", status: "ready" },
  { id: 3, name: "Customer Satisfaction", description: "CSAT scores and feedback analysis", type: "CSAT", lastRun: "3 hours ago", status: "ready" },
  { id: 4, name: "Revenue Summary", description: "Billing and invoice overview", type: "Revenue", lastRun: "5 hours ago", status: "ready" },
  { id: 5, name: "Ticket Volume Analysis", description: "Trends and patterns in support tickets", type: "Analytics", lastRun: "1 week ago", status: "ready" },
  { id: 6, name: "Response Time Report", description: "First response and resolution times", type: "Performance", lastRun: "2 days ago", status: "ready" },
];

const scheduledReports = [
  { id: 1, name: "Weekly SLA Summary", schedule: "Every Monday at 9:00 AM", recipients: 3, nextRun: "Feb 24, 2026", status: "active" },
  { id: 2, name: "Monthly Revenue Report", schedule: "1st of every month", recipients: 5, nextRun: "Mar 1, 2026", status: "active" },
  { id: 3, name: "Daily Ticket Summary", schedule: "Every day at 6:00 PM", recipients: 2, nextRun: "Feb 20, 2026", status: "active" },
];

const recentReports = [
  { id: 1, name: "SLA_Performance_Jan2026.pdf", type: "PDF", size: "2.4 MB", generated: "Feb 1, 2026", downloads: 45 },
  { id: 2, name: "Agent_Performance_Q4.xlsx", type: "Excel", size: "1.8 MB", generated: "Jan 15, 2026", downloads: 32 },
  { id: 3, name: "CSAT_Analysis_Dec2025.pdf", type: "PDF", size: "3.1 MB", generated: "Dec 31, 2025", downloads: 28 },
  { id: 4, name: "Revenue_Summary_Nov2025.xlsx", type: "Excel", size: "1.2 MB", generated: "Nov 30, 2025", downloads: 56 },
  { id: 5, name: "Ticket_Volume_Oct2025.pdf", type: "PDF", size: "2.8 MB", generated: "Oct 31, 2025", downloads: 19 },
];

const reportStats = {
  totalGenerated: 156,
  thisMonth: 23,
  avgSize: "2.1 MB",
  downloads: 1247,
};

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("templates");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Analytics / Reports</div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-slate-500 text-sm">Generate and schedule custom reports</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
            <FileText className="h-4 w-4" /> Create Report
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Generated</p>
                  <p className="text-2xl font-bold">{reportStats.totalGenerated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">This Month</p>
                  <p className="text-2xl font-bold">{reportStats.thisMonth}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Downloads</p>
                  <p className="text-2xl font-bold">{reportStats.downloads}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Avg. Size</p>
                  <p className="text-2xl font-bold">{reportStats.avgSize}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="mt-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search templates..." className="pl-10" />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reportTemplates.map((template) => (
                    <div key={template.id} className="p-4 rounded-xl border hover:border-purple-500 transition-colors group">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${
                          template.type === "SLA" ? "bg-blue-50 dark:bg-blue-900/20" :
                          template.type === "Performance" ? "bg-purple-50 dark:bg-purple-900/20" :
                          template.type === "CSAT" ? "bg-green-50 dark:bg-green-900/20" :
                          "bg-amber-50 dark:bg-amber-900/20"
                        }`}>
                          {template.type === "SLA" && <BarChart3 className="h-5 w-5 text-blue-600" />}
                          {template.type === "Performance" && <TrendingUp className="h-5 w-5 text-purple-600" />}
                          {template.type === "CSAT" && <Users className="h-5 w-5 text-green-600" />}
                          {template.type === "Revenue" && <DollarSign className="h-5 w-5 text-amber-600" />}
                          {template.type === "Analytics" && <LineChart className="h-5 w-5 text-indigo-600" />}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {template.type}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-purple-600 transition-colors">{template.name}</h3>
                      <p className="text-sm text-slate-500 mb-4">{template.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-xs text-slate-500">Last run: {template.lastRun}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="mt-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 rounded-xl border">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{report.name}</p>
                          <p className="text-sm text-slate-500">{report.schedule}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Next run</p>
                          <p className="font-medium">{report.nextRun}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Recipients</p>
                          <p className="font-medium">{report.recipients} users</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 border-2 border-dashed">
                  <Calendar className="h-4 w-4 mr-2" /> Schedule New Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="mt-4">
            <Card className="bg-white dark:bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-lg">Recently Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Report Name</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Size</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Generated</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Downloads</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReports.map((report) => (
                        <tr key={report.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <FileText className="h-4 w-4 text-slate-600" />
                              </div>
                              <span className="font-medium">{report.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary" className="text-xs">{report.type}</Badge>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{report.size}</td>
                          <td className="py-3 px-4 text-slate-600">{report.generated}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Download className="h-4 w-4 text-slate-400" />
                              {report.downloads}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm" className="h-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
