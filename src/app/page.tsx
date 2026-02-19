"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Ticket, DollarSign, TrendingUp, ArrowRight, 
  Clock, CheckCircle, AlertCircle 
} from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Krish!</h1>
            <p className="text-slate-500 mt-1">Here's what's happening with your business today.</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Customers</p>
                  <p className="text-xl font-bold">12,847</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50">
                  <Ticket className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Active Invoices</p>
                  <p className="text-xl font-bold">6</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-50">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Revenue (MTD)</p>
                  <p className="text-xl font-bold">$205,614</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Growth</p>
                  <p className="text-xl font-bold">+12.4%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white dark:bg-[#1a1a1a] cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Create Invoice</h3>
                <p className="text-sm text-slate-500 mt-1">Send a new invoice to a client</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400" />
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">View Analytics</h3>
                <p className="text-sm text-slate-500 mt-1">See detailed revenue analytics</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400" />
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Manage Clients</h3>
                <p className="text-sm text-slate-500 mt-1">View and edit client information</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white dark:bg-[#1a1a1a]">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { icon: CheckCircle, text: "Invoice INV-001 paid by Umbrella Corp", time: "2 hours ago", color: "green" },
                { icon: Ticket, text: "New invoice INV-006 created for Stark Industries", time: "5 hours ago", color: "purple" },
                { icon: AlertCircle, text: "Invoice INV-005 is overdue", time: "1 day ago", color: "red" },
                { icon: Clock, text: "Invoice INV-003 marked as pending", time: "2 days ago", color: "amber" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <activity.icon className={`h-4 w-4 text-${activity.color}-500`} />
                  <span className="flex-1 text-sm">{activity.text}</span>
                  <span className="text-xs text-slate-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
