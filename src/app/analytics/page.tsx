"use client";

import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  ReferenceLine,
  Line,
  ComposedChart,
} from "recharts";
import { format, subDays, subMonths, eachDayOfInterval, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
import {
  TrendingUp,
  TrendingDown,
  Users,
  UserMinus,
  Download,
  Filter,
  Calendar as CalendarIcon,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Target,
  Activity,
} from "lucide-react";

// Generate mock data based on date range
const generateRevenueData = (dateRange: { from: Date; to: Date }) => {
  const days = eachDayOfInterval({
    start: dateRange.from,
    end: dateRange.to,
  });

  return days.map((day) => {
    const dayOfWeek = day.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const multiplier = isWeekend ? 0.6 : 1;
    const dateNum = day.getTime();
    const randomSeed = (dateNum % 1000) / 1000;
    
    return {
      date: format(day, "MMM dd"),
      fullDate: day,
      Courses: Math.floor((Math.random() * 2500 + 1800) * multiplier * (0.9 + randomSeed * 0.2)),
      Membership: Math.floor((Math.random() * 1800 + 1200) * multiplier * (0.9 + randomSeed * 0.2)),
      Marketplace: Math.floor((Math.random() * 1200 + 600) * multiplier * (0.9 + randomSeed * 0.2)),
      Certifications: Math.floor((Math.random() * 800 + 400) * multiplier * (0.9 + randomSeed * 0.2)),
      Coaching: Math.floor((Math.random() * 600 + 150) * multiplier * (0.9 + randomSeed * 0.2)),
    };
  });
};

// Generate previous period data for comparison
const generatePreviousPeriodData = (dateRange: { from: Date; to: Date }) => {
  const daysDiff = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
  const prevFrom = subDays(dateRange.from, daysDiff);
  const prevTo = subDays(dateRange.from, 1);
  
  return generateRevenueData({ from: prevFrom, to: prevTo });
};

const productData = [
  { name: "Courses", revenue: 131000, share: 36.7, change: 6.8, color: "#7c3aed" },
  { name: "Membership", revenue: 88100, share: 24.8, change: 0.8, color: "#3b82f6" },
  { name: "Marketplace", revenue: 66300, share: 18.6, change: -6.4, color: "#0ea5e9" },
  { name: "Certifications", revenue: 48700, share: 13.7, change: 4.2, color: "#a855f7" },
  { name: "Coaching", revenue: 22500, share: 6.3, change: 3.8, color: "#ec4899" },
];

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

type DatePreset = "7d" | "14d" | "30d" | "90d" | "mtd" | "lmt" | "custom";

const datePresets: { label: string; value: DatePreset; getDates: () => { from: Date; to: Date } }[] = [
  { label: "Last 7 days", value: "7d", getDates: () => ({ from: subDays(new Date(), 6), to: new Date() }) },
  { label: "Last 14 days", value: "14d", getDates: () => ({ from: subDays(new Date(), 13), to: new Date() }) },
  { label: "Last 30 days", value: "30d", getDates: () => ({ from: subDays(new Date(), 29), to: new Date() }) },
  { label: "Last 90 days", value: "90d", getDates: () => ({ from: subDays(new Date(), 89), to: new Date() }) },
  { label: "Month to date", value: "mtd", getDates: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
  { label: "Last month", value: "lmt", getDates: () => ({ from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) }) },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"stacked" | "grouped">("stacked");
  const [compareMode, setCompareMode] = useState(false);
  const [activePreset, setActivePreset] = useState<DatePreset>("30d");
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 29),
    to: new Date(),
  });
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const revenueData = useMemo(() => generateRevenueData(dateRange), [dateRange]);
  const previousPeriodData = useMemo(() => generatePreviousPeriodData(dateRange), [dateRange]);

  // Combine current and previous period data for comparison chart
  const chartData = useMemo(() => {
    return revenueData.map((d, i) => {
      const prev = previousPeriodData[i];
      return {
        ...d,
        PreviousTotal: prev ? prev.Courses + prev.Membership + prev.Marketplace + prev.Certifications + prev.Coaching : 0,
        CurrentTotal: d.Courses + d.Membership + d.Marketplace + d.Certifications + d.Coaching,
      };
    });
  }, [revenueData, previousPeriodData]);

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.Courses + d.Membership + d.Marketplace + d.Certifications + d.Coaching, 0);
  const prevTotalRevenue = previousPeriodData.reduce((sum, d) => sum + d.Courses + d.Membership + d.Marketplace + d.Certifications + d.Coaching, 0);
  const revenueChange = ((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const handlePresetChange = (preset: DatePreset) => {
    const dates = datePresets.find(p => p.value === preset)?.getDates() || dateRange;
    setDateRange(dates);
    setActivePreset(preset);
  };

  const exportToCSV = () => {
    const headers = ["Date", "Courses", "Membership", "Marketplace", "Certifications", "Coaching", "Total"];
    const rows = revenueData.map(d => [
      d.fullDate.toISOString().split('T')[0],
      d.Courses,
      d.Membership,
      d.Marketplace,
      d.Certifications,
      d.Coaching,
      d.Courses + d.Membership + d.Marketplace + d.Certifications + d.Coaching,
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${format(dateRange.from, "yyyy-MM-dd")}-${format(dateRange.to, "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const data = revenueData.map(d => ({
      date: d.fullDate.toISOString().split('T')[0],
      revenue: {
        Courses: d.Courses,
        Membership: d.Membership,
        Marketplace: d.Marketplace,
        Certifications: d.Certifications,
        Coaching: d.Coaching,
      },
      total: d.Courses + d.Membership + d.Marketplace + d.Certifications + d.Coaching,
    }));
    
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${format(dateRange.from, "yyyy-MM-dd")}-${format(dateRange.to, "yyyy-MM-dd")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export dropdown with multiple formats
  const [exportOpen, setExportOpen] = useState(false);

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 dark:text-slate-300">{entry.dataKey}</span>
                </div>
                <span className="font-medium text-slate-900 dark:text-slate-100">{formatCurrency(entry.value)}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
            <span className="text-sm text-slate-500">Total</span>
            <span className="font-bold text-purple-600">{formatCurrency(total)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header with Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
            <p className="text-slate-500 dark:text-slate-400">Track your revenue and performance metrics</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Compare Toggle */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
              <Switch
                id="compare-mode"
                checked={compareMode}
                onCheckedChange={setCompareMode}
                className="data-[state=checked]:bg-purple-600"
              />
              <Label htmlFor="compare-mode" className="text-sm cursor-pointer">Compare to previous period</Label>
            </div>
            {/* Export Dropdown */}
            <Popover open={exportOpen} onOpenChange={setExportOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Export
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-40">
                <div className="grid gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start font-normal"
                    onClick={() => { exportToCSV(); setExportOpen(false); }}
                  >
                    <Download className="h-4 w-4 mr-2" /> Export as CSV
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start font-normal"
                    onClick={() => { exportToJSON(); setExportOpen(false); }}
                  >
                    <Download className="h-4 w-4 mr-2" /> Export as JSON
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Enhanced KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Revenue</p>
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{formatCurrency(totalRevenue)}</p>
              <div className="flex items-center gap-1 mt-2">
                {revenueChange >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${revenueChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {revenueChange >= 0 ? "+" : ""}{revenueChange.toFixed(1)}%
                </span>
                <span className="text-xs text-slate-500">vs prev period</span>
              </div>
            </CardContent>
          </Card>

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
                <CardTitle className="text-xl">Revenue Breakdown</CardTitle>
                <p className="text-sm text-slate-500 mt-1">
                  {formatCurrency(totalRevenue)} total • {revenueChange >= 0 ? "+" : ""}{revenueChange.toFixed(1)}% from previous period
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Preset Date Ranges */}
                <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  {datePresets.slice(0, 5).map((preset) => (
                    <Button
                      key={preset.value}
                      variant={activePreset === preset.value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handlePresetChange(preset.value)}
                      className={activePreset === preset.value ? "bg-purple-600 hover:bg-purple-700" : "text-slate-600 dark:text-slate-300"}
                    >
                      {preset.value === "7d" ? "7D" : preset.value === "14d" ? "14D" : preset.value === "30d" ? "30D" : preset.value === "90d" ? "90D" : "MTD"}
                    </Button>
                  ))}
                </div>
                
                {/* Custom Date Picker */}
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <CalendarIcon className="h-4 w-4" />
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
                          setActivePreset("custom");
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
                
                {/* View Mode Toggle */}
                <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Button
                    variant={viewMode === "stacked" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("stacked")}
                    className={viewMode === "stacked" ? "bg-purple-600 hover:bg-purple-700" : "text-slate-600 dark:text-slate-300"}
                  >
                    Stacked
                  </Button>
                  <Button
                    variant={viewMode === "grouped" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grouped")}
                    className={viewMode === "grouped" ? "bg-purple-600 hover:bg-purple-700" : "text-slate-600 dark:text-slate-300"}
                  >
                    Grouped
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={380}>
              <ComposedChart data={chartData} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 11 }} 
                  dy={10}
                  interval={Math.floor(chartData.length / 10)}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 11 }} 
                  tickFormatter={(v) => `$${v / 1000}k`} 
                  dx={-10}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(124, 58, 237, 0.1)' }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "20px" }} 
                  iconType="circle"
                  iconSize={8}
                />
                {compareMode && (
                  <Line 
                    type="monotone" 
                    dataKey="PreviousTotal" 
                    stroke="#94a3b8" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Previous Period"
                    animationDuration={500}
                  />
                )}
                <Bar 
                  dataKey="Courses" 
                  stackId={viewMode === "stacked" ? "a" : undefined} 
                  fill="#7c3aed" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={500}
                />
                <Bar 
                  dataKey="Membership" 
                  stackId={viewMode === "stacked" ? "a" : undefined} 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={500}
                />
                <Bar 
                  dataKey="Marketplace" 
                  stackId={viewMode === "stacked" ? "a" : undefined} 
                  fill="#0ea5e9" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={500}
                />
                <Bar 
                  dataKey="Certifications" 
                  stackId={viewMode === "stacked" ? "a" : undefined} 
                  fill="#a855f7" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={500}
                />
                <Bar 
                  dataKey="Coaching" 
                  stackId={viewMode === "stacked" ? "a" : undefined} 
                  fill="#ec4899" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={500}
                />
              </ComposedChart>
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
                    <tr key={product.name} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
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
