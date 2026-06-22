"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Truck,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  BookMarked,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Trending Bar Chart mock data
const mockTrendData = [
  { name: "Jan", revenue: 400, deliveries: 120, registrations: 80 },
  { name: "Feb", revenue: 900, deliveries: 250, registrations: 140 },
  { name: "Mar", revenue: 600, deliveries: 190, registrations: 210 },
  { name: "Apr", revenue: 1200, deliveries: 410, registrations: 380 },
  { name: "May", revenue: 1000, deliveries: 320, registrations: 310 },
  { name: "Jun", revenue: 1560, deliveries: 312, registrations: 142 },
];

// Category Bar Chart mock data
const mockCategoryData = [
  { name: "Fiction", value: 150, color: "#10b981" }, // Emerald
  { name: "Sci-Fi", value: 95, color: "#3b82f6" }, // Blue
  { name: "Academic", value: 180, color: "#f59e0b" }, // Amber
  { name: "Biography", value: 60, color: "#ef4444" }, // Red
];

// Most Requested Books list mock data
const mockMostRequested = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    requests: 12,
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: 2,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    requests: 14,
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    requests: 8,
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=100",
  },
];

const AdminOverview = () => {
    // Stats Cards mock data
  const statCards = [
    {
      id: "users",
      title: "Total Users",
      value: "142",
      change: "+15%",
      icon: <Users size={20} />,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "books",
      title: "Total Books",
      value: "485",
      change: "Steady",
      icon: <BookOpen size={20} />,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "deliveries",
      title: "Total Deliveries",
      value: "312",
      change: "Active",
      icon: <Truck size={20} />,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "revenue",
      title: "Total Revenue",
      value: "$1,560.50",
      change: "+22%",
      icon: <DollarSign size={20} />,
      color: "text-red-500 bg-red-500/10 border-red-500/20",
    },
  ];

  return (
    <div className="space-y-8 font-urbanist p-4 md:p-6 text-foreground bg-background/40">
      {/* Dashboard Header*/}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-2xl font-black font-poppins tracking-tight flex items-center gap-2">
            Overview Diagnostics{" "}
            <TrendingUp size={24} className="text-primary" />
          </h2>
          <p className="text-sm text-muted-foreground">
            Platform-wide insights and transactional analytics dashboard.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-card/60 border border-border px-4 py-2 rounded-xl text-xs font-bold font-poppins focus:outline-none">
            <option>All Categories</option>
            <option>This Month</option>
            <option>Yearly Overview</option>
          </select>
        </div>
      </div>

      {/* Stats Cards*/}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-poppins tracking-tight">
          Quick Stats Dashboard
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="p-5 rounded-2xl border border-border bg-card/60 shadow-sm flex items-center justify-between group hover:border-border/80 transition-colors"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  {card.title}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-poppins tracking-tight">
                    {card.value}
                  </span>
                  {card.change !== "Steady" && card.change !== "Active" && (
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                      <ArrowUpRight size={10} /> {card.change}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${card.color}`}
              >
                {card.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/*(Area Chart + Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real-time Charts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 p-6 border border-border bg-card/40 backdrop-blur-md rounded-3xl space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold font-poppins tracking-tight">
              Growth & Revenue Dynamic
            </h3>
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />{" "}
              Live System Monitor
            </span>
          </div>
          <div className="h-64 md:h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockTrendData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="rgb(var(--muted-foreground)/0.4)"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="rgb(var(--muted-foreground)/0.4)"
                  fontSize={11}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgb(var(--card))",
                    borderRadius: "12px",
                    borderColor: "rgb(var(--border))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Total Revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart*/}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 p-6 border border-border bg-card/40 backdrop-blur-md rounded-3xl flex flex-col justify-between"
        >
          <h3 className="text-base font-bold font-poppins tracking-tight">
            Books by Category
          </h3>
          <div className="h-44 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {mockCategoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="focus:outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-black font-poppins">485</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                Total
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/30">
            {mockCategoryData.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5 text-xs font-medium"
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground truncate">
                  {item.name}{" "}
                  <span className="text-foreground font-bold">
                    ({Math.round(item.value / 4.85)}%)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Most Requested Books list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-3xl space-y-4"
      >
        <h3 className="text-base font-bold font-poppins tracking-tight flex items-center gap-2">
          <BookMarked size={18} className="text-primary" /> Mini-list of Most
          Requested Books{" "}
          <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-widest">
            (System Optional)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockMostRequested.map((book, i) => (
            <div
              key={book.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-card-soft/20 hover:bg-card-soft/40 transition-colors"
            >
              <span className="font-poppins font-black text-sm text-muted-foreground/50 w-4">
                {i + 1}
              </span>
              <img
                src={book.cover}
                alt={book.title}
                className="w-10 h-12 object-cover rounded-lg border border-border/60 shadow-sm"
              />
              <div className="overflow-hidden flex-1">
                <h4 className="text-xs font-bold font-poppins truncate text-foreground">
                  {book.title}
                </h4>
                <p className="text-[11px] text-muted-foreground truncate">
                  by {book.author}
                </p>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-md mt-1 inline-block font-poppins">
                  {book.requests} requests
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOverview;
