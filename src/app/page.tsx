"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, CheckCircle, Clock, AlertCircle, Plus, FileText, Users, Ticket
} from "lucide-react";

const statusConfig: Record<string, { bg: string; text: string; label: string; icon: any }> = {
  paid: { bg: "#dcfce7", text: "#16a34a", label: "Paid", icon: CheckCircle },
  pending: { bg: "#fef3c7", text: "#d97706", label: "Pending", icon: Clock },
  overdue: { bg: "#fee2e2", text: "#dc2626", label: "Overdue", icon: AlertCircle },
};

const recentInvoices = [
  { id: "INV-001", customer: "Umbrella Corp", date: "Feb 1, 2026", amount: 52847, status: "paid" },
  { id: "INV-002", customer: "Acme Corporation", date: "Feb 3, 2026", amount: 48192, status: "paid" },
  { id: "INV-003", customer: "Globex Inc", date: "Feb 10, 2026", amount: 32041, status: "pending" },
  { id: "INV-004", customer: "Initech", date: "Feb 12, 2026", amount: 29062, status: "pending" },
  { id: "INV-005", customer: "Wayne Enterprises", date: "Jan 28, 2026", amount: 24593, status: "overdue" },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);

  const stats = [
    { label: "Total Invoiced", value: 205614, icon: DollarSign, color: "blue" },
    { label: "Paid", value: 144918, icon: CheckCircle, color: "green" },
    { label: "Pending", value: 61103, icon: Clock, color: "amber" },
    { label: "Overdue", value: 24593, icon: AlertCircle, color: "red" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-white dark:bg-[#1a1a1a]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
                    <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="text-xl font-bold">{formatCurrency(stat.value)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700"><Plus className="h-4 w-4 mr-1" />New Invoice</Button>
          <Button variant="outline"><Users className="h-4 w-4 mr-1" />Add Client</Button>
        </div>

        {/* Recent Invoices */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentInvoices.map((invoice) => {
                const status = statusConfig[invoice.status];
                const StatusIcon = status.icon;
                return (
                  <div key={invoice.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-slate-500">{invoice.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(invoice.amount)}</p>
                        <p className="text-sm text-slate-500">{invoice.date}</p>
                      </div>
                      <Badge variant="outline" className="gap-1" style={{ backgroundColor: status.bg, color: status.text }}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
