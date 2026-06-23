"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@heroui/react";
import { BookOpen, Truck, DollarSign, BarChart3 } from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const UserOverview = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock Data deliveries
  const mockDeliveries = [
    {
      _id: "1",
      bookTitle: "React Pro Architecture",
      status: "Delivered",
      deliveryFee: 60,
      month: "Jan",
    },
    {
      _id: "2",
      bookTitle: "Next.js Complete Guide",
      status: "Pending Approval",
      deliveryFee: 50,
      month: "Feb",
    },
    {
      _id: "3",
      bookTitle: "Tailwind UI Mastery",
      status: "Delivered",
      deliveryFee: 40,
      month: "Feb",
    },
    {
      _id: "4",
      bookTitle: "Node.js Backend Deep Dive",
      status: "Dispatched",
      deliveryFee: 70,
      month: "Mar",
    },
    {
      _id: "5",
      bookTitle: "Prisma ORM Solutions",
      status: "Delivered",
      deliveryFee: 80,
      month: "Mar",
    },
    {
      _id: "6",
      bookTitle: "TypeScript Essentials",
      status: "Delivered",
      deliveryFee: 50,
      month: "Apr",
    },
  ];

  useEffect(() => {
    
    setDeliveries(mockDeliveries);


  }, []);


  // =============================================================

  // ১. Total Books Read: status  "Delivered" 
  const totalBooksRead = deliveries.filter(
    (item) => item.status === "Delivered",
  ).length;

  // ২. Pending Deliveries: "Pending Approval" / "Dispatched" 
  const pendingDeliveries = deliveries.filter(
    (item) =>
      item.status === "Pending Approval" || item.status === "Dispatched",
  ).length;

  // ৩. Total Spent on Fees: 
  const totalSpent = deliveries.reduce(
    (sum, item) => sum + item.deliveryFee,
    0,
  );

  // =============================================================
  // Recharts Per Monthly Spent
  // =============================================================
  const monthlyDataObj = deliveries.reduce((acc, item) => {
    const month = item.month || "Unknown";
    acc[month] = (acc[month] || 0) + item.deliveryFee;
    return acc;
  }, {});

  // Recharts-
  const chartData = Object.keys(monthlyDataObj).map((month) => ({
    name: month,
    Spent: monthlyDataObj[month],
  }));

  return (
    <div className="space-y-8 font-urbanist text-foreground pt-4 w-full">
      {/* heading */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-4">
        <div className="p-2.5 bg-primary/10 border border-primary/20 text-primary rounded-xl">
          <BarChart3 size={22} />
        </div>
        <div>
          <h2 className="font-poppins font-bold text-xl tracking-tight">
            User Dashboard Overview
          </h2>
          <p className="text-xs text-muted-foreground">
            Welcome back! Here is your real-time reading and payment summary.
          </p>
        </div>
      </div>

      {/* All Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* All Reading Card */}
        <Card className="p-5 border border-border/60 bg-card/40 rounded-3xl shadow-sm flex flex-row items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Total Books Read
            </p>
            <h3 className="text-2xl font-bold font-poppins text-foreground mt-0.5">
              {totalBooksRead}
            </h3>
          </div>
        </Card>

        {/* Pending Deliveries Card */}
        <Card className="p-5 border border-border/60 bg-card/40 rounded-3xl shadow-sm flex flex-row items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl border border-amber-500/20">
            <Truck size={24} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Pending Deliveries
            </p>
            <h3 className="text-2xl font-bold font-poppins text-foreground mt-0.5">
              {pendingDeliveries}
            </h3>
          </div>
        </Card>

        {/* Total Spent on Fees Card */}
        <Card className="p-5 border border-border/60 bg-card/40 rounded-3xl shadow-sm flex flex-row items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl border border-blue-500/20">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Total Spent on Fees
            </p>
            <h3 className="text-2xl font-bold font-poppins text-foreground mt-0.5">
              ${totalSpent}
            </h3>
          </div>
        </Card>
      </div>

      {/* Recharts Per Monthly Spent */}
      <div className="border border-border bg-card/20 rounded-3xl p-5 shadow-sm space-y-4">
        <div>
          <h4 className="font-poppins font-bold text-sm text-foreground">
            Monthly Fee Analytics
          </h4>
          <p className="text-xs text-muted-foreground">
            Visual representation of your subscription and delivery spendings.
          </p>
        </div>

        <div className="w-full h-[300px] pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                {/* Gradient Defs */}
                <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--heroui-primary))"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--heroui-primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: "12px",
                  fontFamily: "var(--font-poppins)",
                }}
                formatter={(value) => [`$${value}`, "Spent"]}
              />
              <Area
                type="monotone"
                dataKey="Spent"
                stroke="hsl(var(--heroui-primary))"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorSpent)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
