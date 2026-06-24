"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  BookOpen,
  DollarSign,
  Clock,
  TrendingUp,
  Camera,
  MapPin,
  Calendar,
  User,
  Search,
} from "lucide-react";
import { Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const UserProfile = ({ userPayment = [] }) => {
  const { theme } = useTheme();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  //  ১. রিয়াল ডাটা এনালাইসিস এবং পাইপলাইন ক্যালকুলেশন
  const totalRead = userPayment.filter(
    (item) => item?.status === "Delivered",
  ).length;
  const pendingDeliveries = userPayment.filter(
    (item) => item?.status === "Pending" || item?.status === "Dispatched",
  ).length;
  const totalSpent = userPayment.reduce(
    (sum, item) => sum + (item?.amount || 0),
    0,
  );

  // 📊 ২. চার্টের জন্য ডাটাবেজের অবজেক্টের রিয়াল 'month' ফিল্ড সরাসরি রিড করা
  const monthlySpentObj = userPayment.reduce((acc, item) => {
    const monthName = item?.month;
    if (monthName) {
      acc[monthName] = (acc[monthName] || 0) + (item?.amount || 0);
    }
    return acc;
  }, {});

  // রিয়াল ডাটার মাসের কি (Keys) দিয়ে চার্ট ডেটা অ্যারে ম্যাপিং (কোনো ফেক বা মক ফলব্যাক নাই)
  const analyticsData = Object.keys(monthlySpentObj).map((month) => ({
    name: month,
    spending: monthlySpentObj[month],
  }));

  const stats = [
    {
      title: "Total Books Read",
      value: totalRead,
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Total Spent on Fees",
      value: `$${totalSpent}`,
      icon: DollarSign,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Pending Deliveries",
      value: pendingDeliveries,
      icon: Clock,
      color: "bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <div className="w-full font-urbanist text-foreground min-h-screen pb-12">
      {/* কভার এবং প্রোফাইল ব্যানার সেকশন */}
      <div className="relative rounded-b-3xl border-b border-border bg-card shadow-sm overflow-hidden">
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-primary/40 via-secondary/20 to-primary/40 relative">
          <img
            src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200"
            alt="Reader Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <button className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer">
            <Camera size={14} /> Edit Cover Photo
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-6 relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20">
          <div className="relative z-10">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 rounded-full p-20 ring-4 ring-card bg-card shadow-xl text-3xl font-bold font-poppins">
              <Avatar.Image
                alt={user?.name || "Reader Name"}
                src={
                  user?.image ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                }
                referrerPolicy="no-referrer"
              />
              <Avatar.Fallback>
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </Avatar.Fallback>
            </Avatar>
            <button className="absolute bottom-2 right-2 bg-primary text-background p-2 rounded-full shadow-lg hover:opacity-90 transition-all cursor-pointer border-2 border-card">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left md:pt-10 mt-12">
            <h1 className="text-2xl md:text-3xl font-extrabold font-poppins text-foreground flex items-center justify-center md:justify-start gap-2">
              {user?.name || "Reader Profile"}
              <span className="text-xs bg-primary/20 text-primary font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {user?.role || "User"}
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              Avid Reader | Exploring worlds through pages.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-xs text-muted-foreground font-semibold">
              <span className="flex items-center gap-1">
                <User size={14} /> Verified Member
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> Reader Hub
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Joined 2026
              </span>
            </div>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0 flex-shrink-0">
            <Link
              href="/books"
              className="px-4 py-2 bg-primary text-background font-bold text-sm rounded-xl flex items-center gap-1.5 hover:opacity-90 transition-all shadow-md cursor-pointer"
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(135deg, #c4844a, #6b4226)"
                    : "linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))",
                color: theme === "dark" ? "#071a1d" : "#fff",
              }}
            >
              <Search size={16} /> Browse Books
            </Link>
          </div>
        </div>
      </div>

      {/* টাইমলাইন লেআউট বডি গ্রিড */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* বাম পাশের ইন্ট্রো এবং কুইক ম্যাট্রিক্স কার্ড কলাম */}
        <div className="space-y-6">
          <div className="border border-border bg-card/40 rounded-3xl p-5 shadow-sm">
            <h3 className="text-lg font-bold font-poppins mb-3">Intro</h3>
            <div className="space-y-4 text-sm text-foreground/90 font-medium">
              <p className="text-center text-muted-foreground text-xs italic border-b border-border/40 pb-3">
                "So many books, so little time." — Frank Zappa
              </p>
              <div className="flex items-center gap-3">
                <span className="text-lg">📧</span>
                <span className="truncate">
                  {user?.email || "reader@gmail.com"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">🛡️</span>
                <span>
                  Security Token:{" "}
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded border border-border">
                    JWT Active
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="border border-border bg-card/40 rounded-3xl p-5 shadow-sm">
            <h3 className="text-lg font-bold font-poppins mb-3">
              Quick Metrics
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-muted/40 rounded-xl border border-border/40">
                <span className="block text-xl font-bold text-primary font-poppins">
                  {totalRead}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  Read
                </span>
              </div>
              <div className="p-3 bg-muted/40 rounded-xl border border-border/40">
                <span className="block text-xl font-bold text-primary font-poppins">
                  ${totalSpent}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  Spent
                </span>
              </div>
              <div className="p-3 bg-muted/40 rounded-xl border border-border/40">
                <span className="block text-xl font-bold text-primary font-poppins">
                  {pendingDeliveries}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ডান পাশের রিয়েল টাইম স্পেন্ডিং চার্ট এবং ট্রেন্ড কলাম */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="border border-border bg-card/40 rounded-3xl p-4 flex items-center gap-4 shadow-sm"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block truncate">
                      {stat.title}
                    </span>
                    <span className="text-xl font-bold font-poppins text-foreground block mt-0.5">
                      {stat.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* প্রধান স্পেন্ডিং এনালিটিক্স চার্ট বক্স */}
          <div className="border border-border bg-card/40 rounded-3xl p-5 shadow-sm">
            <div className="pb-4 border-b border-border/50 mb-6">
              <h3 className="text-xl font-bold font-poppins text-foreground">
                Spending Insights
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Monthly delivery fee funding flow metrics feed
              </p>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="userPrimaryGlow"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="rgb(var(--primary))"
                        stopOpacity={0.3}
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
                    stroke="rgba(var(--border), 0.3)"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="rgb(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="rgb(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgb(var(--card))",
                      borderColor: "rgb(var(--border))",
                      borderRadius: "16px",
                      color: "rgb(var(--foreground))",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="spending"
                    stroke="rgb(var(--primary))"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#userPrimaryGlow)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-1 text-xs text-muted-foreground font-semibold">
              <TrendingUp size={14} className="text-primary" />
              <span>
                Investment metrics synced via active delivery logs pipeline
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
