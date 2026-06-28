"use client";

import React from "react";
import { Card } from "@heroui/react";
import {
  BookOpen,
  Truck,
  DollarSign,
  BarChart3,
  TrendingUp,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserOverview = ({ userPayment = [], user = {} }) => {
  // =============================================================
  //  REAL STATS CALCULATIONS (Synced with MongoDB schema)
  // =============================================================

  // 1. Total Books Read: status strictly equals "Delivered"
  const totalBooksRead = userPayment.filter(
    (item) => item.status === "Delivered",
  ).length;

  // 2. Pending Deliveries: tracks "Pending" and "Dispatched" requests
  const pendingDeliveries = userPayment.filter(
    (item) => item.status === "Pending" || item.status === "Dispatched",
  ).length;

  // 3. Total Spent on Fees: safely handles reducing float and int amounts
  const totalSpent = userPayment.reduce(
    (sum, item) => sum + (item.amount || 0),
    0,
  );

  // =============================================================
  //  MONTHLY INLINE DATA REDUCER (Reads direct "month" field)
  // =============================================================
  const monthlyDataObj = userPayment.reduce((acc, item) => {
    const month = item.month || "Unknown";
    acc[month] = (acc[month] || 0) + (item.amount || 0);
    return acc;
  }, {});

  // Formatting compiled dataset array for Recharts distribution
  const chartData = Object.keys(monthlyDataObj).map((month) => ({
    name: month,
    Spent: monthlyDataObj[month],
  }));

  return (
    <div className="space-y-8 font-urbanist text-foreground pt-4 w-full">
      {/* Overview Metric Heading Section */}
      <div className="pl-4">
        <h2 className="text-xl md:text-2xl font-semibold font-serif tracking-tight flex flex-wrap items-center gap-2 capitalize text-foreground">
          <span className="text-primary font-bold">
            {user?.name || "Reader"}
          </span>
          <span className="text-muted-foreground font-medium text-lg md:text-xl">
            — Overview Diagnostics
          </span>
          <TrendingUp
            size={22}
            className="text-primary flex-shrink-0 animate-pulse"
          />
        </h2>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here is your real-time reading and payment summary.
        </p>
      </div>

      {/* Analytics Counter Dashboard Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Books Read Card */}
        <Card className="p-5 border border-border/60 bg-card/40 rounded-3xl shadow-sm flex flex-row items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
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
            <p className="text-sm text-muted-foreground font-medium">
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
            <p className="text-sm text-muted-foreground font-medium">
              Total Spent on Fees
            </p>
            <h3 className="text-2xl font-bold font-poppins text-foreground mt-0.5">
              ${totalSpent}
            </h3>
          </div>
        </Card>
      </div>

      {/* Recharts Area Container Bound To Core Variable Tokens */}
      <div className="border border-border bg-card/20 rounded-3xl p-5 shadow-sm space-y-4">
        <div>
          <h4 className="font-poppins font-bold text-base  text-foreground">
            Monthly Fee Analytics
          </h4>
          <p className="text-sm text-muted-foreground">
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
                {/* 🎨 Seamlessly bound to your custom @theme primary variable tokens */}
                <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="rgb(var(--primary))"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="rgb(var(--primary))"
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
                stroke="rgb(var(--primary))"
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
