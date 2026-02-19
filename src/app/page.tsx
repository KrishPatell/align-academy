"use client";

import { useState } from "react";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  ChevronDown,
  TrendingDown,
  TrendingUp,
  Search,
  Bell,
  Home,
  BarChart3,
  Users,
  FileText,
  RefreshCcw,
  DollarSign,
  UserCheck,
  Target,
  FlaskConical,
  MapPin,
  Plug,
  Settings,
  LayoutDashboard,
  Download,
  Filter,
} from "lucide-react";

const generateMockData = () => {
  const days = eachDayOfInterval({
    start: subDays(new Date(), 29),
    end: new Date(),
  });

  return days.map((day) => {
    const courses = Math.floor(Math.random() * 3000) + 2000;
    const membership = Math.floor(Math.random() * 2000) + 1500;
    const marketplace = Math.floor(Math.random() * 1500) + 800;
    const certifications = Math.floor(Math.random() * 1000) + 500;
    const coaching = Math.floor(Math.random() * 800) + 200;

    return {
      date: format(day, "MMM dd"),
      Courses: courses,
      Membership: membership,
      Marketplace: marketplace,
      Certifications: certifications,
      "1:1 Coaching": coaching,
      total: courses + membership + marketplace + certifications + coaching,
    };
  });
};

const productData = [
  { name: "Courses", revenue: 131000, refunds: 320, net: 130680, share: 36.7, change: 6.8, color: "#7c3aed" },
  { name: "Membership", revenue: 88100, refunds: 180, net: 87920, share: 24.8, change: 0.8, color: "#3b82f6" },
  { name: "Marketplace", revenue: 66300, refunds: 290, net: 66010, share: 18.6, change: -6.4, color: "#0ea5e9" },
  { name: "Certifications", revenue: 48700, refunds: 50, net: 48650, share: 13.7, change: 4.2, color: "#a855f7" },
  { name: "1:1 Coaching", revenue: 22500, refunds: 39, net: 22461, share: 6.3, change: 3.8, color: "#ec4899" },
];

const revenueData = generateMockData();
const totalRevenue = revenueData.reduce((sum, d) => sum + d.total, 0);

const sidebarItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: BarChart3, label: "Revenue Analytics", href: "#", active: true },
  { icon: Users, label: "Subscriptions", href: "#" },
  { icon: UserCheck, label: "Customers", href: "#" },
  { icon: FileText, label: "Invoices", href: "#" },
  { icon: RefreshCcw, label: "Refunds", href: "#" },
  { icon: DollarSign, label: "Payouts", href: "#" },
];

const growthItems = [
  { icon: Target, label: "Campaigns", href: "#" },
  { icon: FlaskConical, label: "Experiments", href: "#" },
];

const opsItems = [
  { icon: BarChart3, label: "Forecasting", href: "#" },
  { icon: MapPin, label: "Data Sources", href: "#" },
  { icon: Plug, label: "Integrations", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export default function RevenueDashboard() {
  const [viewMode, setViewMode] = useState<"stacked" | "grouped">("stacked");
  const [dateRange, setDateRange] = useState<{from: Date; to: Date}>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });
  const [calendarOpen, setCalendarOpen] = useState(false);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-muted/50 fixed left-0 top-0 h-full overflow-y-auto">
        <div className="p-4 border-b border-muted/50">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-purple-600" />
            <span className="font-semibold text-lg">Align Academy</span>
          </div>
        </div>

        <nav className="p-4 space-y-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
              Main
            </p>
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-purple-50 text-purple-700"
                        : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
              Growth
            </p>
            <ul className="space-y-1">
              {growthItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-slate-50 hover:text-foreground transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
              Operations
            </p>
            <ul className="space-y-1">
              {opsItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-slate-50 hover:text-foreground transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-muted/50 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-80 bg-slate-50 border border-muted/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-purple-500 rounded-full" />
              </Button>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-700">K</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Today's Revenue
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {formatCurrency(12472)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className={
                      0.2 > 0
                        ? "text-green-600 bg-green-50 border-green-200"
                        : "text-red-600 bg-red-50 border-red-200"
                    }
                  >
                    {0.2 > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(0.2)}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    same day last week
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Monthly Recurring Revenue
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {formatCurrency(632304)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground">
                    ARR: {formatCurrency(7587648)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Profit (last 30d)
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {formatCurrency(170760)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-50 border-green-200"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    4.4%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    vs previous 30d
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="shadow-sm mb-8">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Revenue</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(totalRevenue)} total • +1.7% from previous period
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        {dateRange.from && dateRange.to
                          ? `${format(dateRange.from, "MMM dd, yyyy")} – ${format(
                              dateRange.to,
                              "MMM dd, yyyy"
                            )}`
                          : "Select dates"}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <div className="p-4 border-b border-muted/50 flex justify-between items-center">
                        <span className="text-sm font-medium">Select date range</span>
                      </div>
                      <div className="flex">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={(range) => {
                            if (range?.from && range?.to) {
                              setDateRange({ from: range.from, to: range.to });
                            }
                          }}
                          numberOfMonths={2}
                          className="border-none"
                        />
                      </div>
                      <div className="p-3 border-t border-muted/50 flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCalendarOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setCalendarOpen(false)}
                          className="bg-black text-white hover:bg-black/90"
                        >
                          Apply
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button
                    variant={viewMode === "stacked" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("stacked")}
                    className={viewMode === "stacked" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Stacked
                  </Button>
                  <Button
                    variant={viewMode === "grouped" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grouped")}
                    className={viewMode === "grouped" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Grouped
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData} barSize={20}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "20px",
                    }}
                  />
                  <Bar
                    dataKey="Courses"
                    stackId={viewMode === "stacked" ? "a" : undefined}
                    fill="#7c3aed"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Membership"
                    stackId={viewMode === "stacked" ? "a" : undefined}
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Marketplace"
                    stackId={viewMode === "stacked" ? "a" : undefined}
                    fill="#0ea5e9"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Certifications"
                    stackId={viewMode === "stacked" ? "a" : undefined}
                    fill="#a855f7"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="1:1 Coaching"
                    stackId={viewMode === "stacked" ? "a" : undefined}
                    fill="#ec4899"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sales by Product Table */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Sales by Product</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Product Name</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Refunds</TableHead>
                    <TableHead className="text-right">Net</TableHead>
                    <TableHead className="text-right">Share</TableHead>
                    <TableHead className="text-right">YoY Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productData.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: product.color }}
                          />
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(product.revenue)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(product.refunds)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(product.net)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-slate-50">
                          {product.share}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            product.change > 0
                              ? "text-green-600 bg-green-50 border-green-200"
                              : "text-red-600 bg-red-50 border-red-200"
                          }
                        >
                          {product.change > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(product.change)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="hover:bg-transparent font-semibold">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(354600)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(879)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(353721)}
                    </TableCell>
                    <TableCell className="text-right">100%</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className="text-green-600 bg-green-50 border-green-200"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        2.1%
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
