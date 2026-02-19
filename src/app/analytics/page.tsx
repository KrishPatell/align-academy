"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, eachDayOfInterval } from "date-fns";
import {
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  UserMinus,
  FileText,
  ArrowUpDown,
  ChevronDown,
  Calendar as CalendarIcon,
} from "lucide-react";

// Generate mock data
const generateRevenueData = () => {
  const days = eachDayOfInterval({
    start: subDays(new Date(), 29),
    end: new Date(),
  });

  return days.map((day) => {
    const dayOfWeek = day.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const multiplier = isWeekend ? 0.6 : 1;
    
    return {
      date: format(day, "MMM dd"),
      Courses: Math.floor((Math.random() * 2500 + 1800) * multiplier),
      Membership: Math.floor((Math.random() * 1800 + 1200) * multiplier),
      Marketplace: Math.floor((Math.random() * 1200 + 600) * multiplier),
      Certifications: Math.floor((Math.random() * 800 + 400) * multiplier),
      Coaching: Math.floor((Math.random() * 600 + 150) * multiplier),
    };
  });
};

const productData = [
  { name: "Courses", revenue: 131000, share: 36.7, change: 6.8, color: "#7c3aed" },
  { name: "Membership", revenue: 88100, share: 24.8, change: 0.8, color: "#3b82f6" },
  { name: "Marketplace", revenue: 66300, share: 18.6, change: -6.4, color: "#0ea5e9" },
  { name: "Certifications", revenue: 48700, share: 13.7, change: 4.2, color: "#a855f7" },
  { name: "Coaching", revenue: 22500, share: 6.3, change: 3.8, color: "#ec4899" },
];

const revenueData = generateRevenueData();
const totalRevenue = revenueData.reduce((sum, d) => sum + d.Courses + d.Membership + d.Marketplace + d.Certifications + d.Coaching, 0);

const stats = {
  todayRevenue: 12472,
  todayChange: 2.1,
  mrr: 632304,
  arr: 7587648,
  profit: 170760,
  profitChange: 4.4,
  customers: 12847,
  newCustomers: 342,
  churnRate: 2.1,
  arpu: 49.20,
};

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"stacked" | "grouped">("stacked");
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 29),
    to: new Date(),
  });
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-slate-500 mb-1">Today's Revenue</p>
              <p className="text-2xl font-bold tracking-tight">{formatCurrency(stats.todayRevenue)}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={stats.todayChange > 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}>
                  {stats.todayChange > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(stats.todayChange)}%
                </Badge>
                <span className="text-xs text-slate-500">vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-slate-500 mb-1">Monthly Recurring</p>
              <p className="text-2xl font-bold tracking-tight">{formatCurrency(stats.mrr)}</p>
              <div className="mt-2">
                <span className="text-sm text-slate-500">ARR: {formatCurrency(stats.arr)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-slate-500 mb-1">Profit (30d)</p>
              <p className="text-2xl font-bold tracking-tight">{formatCurrency(stats.profit)}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-green-600 bg-green-50">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stats.profitChange}%
                </Badge>
                <span className="text-xs text-slate-500">vs prev 30d</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-1">
                <Users className="h-3 w-3" /> Total Customers
              </p>
              <p className="text-2xl font-bold tracking-tight">{stats.customers.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-green-600 bg-green-50">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{stats.newCustomers}
                </Badge>
                <span className="text-xs text-slate-500">new</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-1">
                <UserMinus className="h-3 w-3" /> Churn Rate
              </p>
              <p className="text-2xl font-bold tracking-tight">{stats.churnRate}%</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-green-600 bg-green-50">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -0.3%
                </Badge>
                <span className="text-xs text-slate-500">vs last mo</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-slate-500 mb-1">ARPU</p>
              <p className="text-2xl font-bold tracking-tight">${stats.arpu}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-green-600 bg-green-50">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +$2.40
                </Badge>
                <span className="text-xs text-slate-500">vs last mo</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardHeader className="pb-2">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Revenue</CardTitle>
                <p className="text-sm text-slate-500 mt-1">
                  {formatCurrency(totalRevenue)} total • +1.7% from previous period
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      {format(dateRange.from, "MMM dd")} – {format(dateRange.to, "MMM dd")}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setDateRange({ from: range.from, to: range.to });
                        }
                      }}
                      numberOfMonths={2}
                    />
                    <div className="p-3 border-t flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setCalendarOpen(false)}>Cancel</Button>
                      <Button size="sm" onClick={() => setCalendarOpen(false)}>Apply</Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  variant={viewMode === "stacked" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("stacked")}
                  className={viewMode === "stacked" ? "bg-purple-600" : ""}
                >
                  Stacked
                </Button>
                <Button
                  variant={viewMode === "grouped" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grouped")}
                  className={viewMode === "grouped" ? "bg-purple-600" : ""}
                >
                  Grouped
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "8px" }} formatter={(value: any) => formatCurrency(Number(value))} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="Courses" stackId={viewMode === "stacked" ? "a" : undefined} fill="#7c3aed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Membership" stackId={viewMode === "stacked" ? "a" : undefined} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Marketplace" stackId={viewMode === "stacked" ? "a" : undefined} fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Certifications" stackId={viewMode === "stacked" ? "a" : undefined} fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Coaching" stackId={viewMode === "stacked" ? "a" : undefined} fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Product Table */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardHeader>
            <CardTitle className="text-xl">Sales by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Product</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">Revenue</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">Share</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">YoY Change</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((product) => (
                    <tr key={product.name} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: product.color }} />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="text-right py-4 px-4 font-medium">{formatCurrency(product.revenue)}</td>
                      <td className="text-right py-4 px-4">
                        <Badge variant="outline" className="bg-slate-50">{product.share}%</Badge>
                      </td>
                      <td className="text-right py-4 px-4">
                        <Badge variant="outline" className={product.change > 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}>
                          {product.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                          {Math.abs(product.change)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td className="py-4 px-4">Total</td>
                    <td className="text-right py-4 px-4">{formatCurrency(354600)}</td>
                    <td className="text-right py-4 px-4">100%</td>
                    <td className="text-right py-4 px-4">
                      <Badge variant="outline" className="text-green-600 bg-green-50">
                        <TrendingUp className="h-3 w-3 mr-1" />2.1%
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
