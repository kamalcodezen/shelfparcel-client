"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
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
  Briefcase,
  Plus,
} from "lucide-react";
import { Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

// মক ডেটা (চার্ট ও মোস্ট রিকোয়েস্টেড লিস্টের জন্য)
const analyticsData = [
  { name: "Jan", earnings: 400, requests: 24 },
  { name: "Feb", earnings: 300, requests: 18 },
  { name: "Mar", earnings: 600, requests: 35 },
  { name: "Apr", earnings: 800, requests: 48 },
  { name: "May", earnings: 500, requests: 30 },
  { name: "Jun", earnings: 1100, requests: 55 },
];

const LibrarianHomePage = () => {
  const { theme } = useTheme();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const stats = [
    {
      title: "Total Books Listed",
      value: "148",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Total Earnings",
      value: "$1,240",
      icon: DollarSign,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Active Pending Requests",
      value: "9",
      icon: Clock,
      color: "bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <div className="w-full font-urbanist text-foreground min-h-screen pb-12">
      {/* =========================================
            (COVER & AVATAR)
      ========================================= */}
      <div className="relative rounded-b-3xl border-b border-border bg-card shadow-sm overflow-hidden">
        {/* কভার ফটো */}
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-primary/40 via-secondary/20 to-primary/40 relative">
          <img
            src="https://i.ibb.co/3mKH0XrZ/slider3.jpg"
            alt="Library Cover"
            className="w-full h-full "
          />
          <button className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer">
            <Camera size={14} /> Edit Cover Photo
          </button>
        </div>

        {/* প্রোফাইল সেকশন কন্টেইনার */}
        <div className="max-w-6xl mx-auto px-4 pb-6 relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20">
          {/* প্রোফাইল পিকচার */}
          <div className="relative z-10">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 rounded-full p-20 ring-4 ring-card bg-card shadow-xl text-3xl  font-bold font-poppins">
              <Avatar.Image
                alt={user?.name || "Librarian"}
                src={user?.image || "https://i.ibb.co/0LVjf0L/ajax-loader.gif"}
                referrerPolicy="no-referrer"
              />
              <Avatar.Fallback>
                {user?.name ? user.name.charAt(0).toUpperCase() : "L"}
              </Avatar.Fallback>
            </Avatar>
            <button className="absolute bottom-2 right-2 bg-primary text-background p-2 rounded-full shadow-lg hover:opacity-90 transition-all cursor-pointer border-2 border-card">
              <Camera size={16} />
            </button>
          </div>

          {/* নাম, বায়ো এবং অ্যাকশন বাটন */}
          <div className="flex-1 text-center md:text-left  md:pt-10 mt-12">
            <h1 className="text-2xl md:text-3xl font-extrabold font-poppins text-foreground flex items-center justify-center md:justify-start gap-2 ">
              {user?.name || "Librarian Name"}
              <span className="text-xs bg-primary/20 text-primary font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {user?.role || "Librarian"}
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              Managing knowledge, one doorstep at a time.
            </p>

            {/* ইন্ট্রো মেটা ট্যাগ */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-xs text-muted-foreground font-semibold">
              <span className="flex items-center gap-1">
                <Briefcase size={14} /> Official Provider
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> Central Library
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Joined 2026
              </span>
            </div>
          </div>

          {/* অ্যাকশন বাটন গ্রুপ */}
          <div className="flex gap-2 mt-4 md:mt-0 flex-shrink-0">
            <Link
              href="/dashboard/librarian/addBook"
              className="px-4 py-2 bg-primary text-background font-bold text-sm rounded-xl flex items-center gap-1.5 hover:opacity-90 transition-all shadow-md cursor-pointer"
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(135deg, #c4844a, #6b4226)"
                    : "linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))",
                color: theme === "dark" ? "#071a1d" : "#fff",
              }}
            >
              <Plus size={16} /> Add New Book
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================
         📰 ২. TIMELINE LAYOUT (LEFT INTRO & RIGHT STATS)
      ========================================= */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ⬅️ বাম পাশের ছোট কলাম: ফেসবুকের মতো Intro/About Box */}
        <div className="space-y-6">
          <div className="dashboard-card">
            <h3 className="text-lg font-bold font-poppins mb-3">Intro</h3>
            <div className="space-y-4 text-sm text-foreground/90 font-medium">
              <p className="text-center text-muted-foreground text-xs italic border-b border-border/40 pb-3">
                "Books are a uniquely portable magic." — Stephen King
              </p>
              <div className="flex items-center gap-3">
                <span className="text-lg">📧</span>
                <span className="truncate">
                  {user?.email || "librarian@gmail.com"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">📈</span>
                <span>
                  Active Status:{" "}
                  <span className="text-green-500 font-bold">Verified</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">🛡️</span>
                <span>
                  Security Token:{" "}
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded border border-border">
                    JWT Locked
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* ফেসবুকের মতো স্ট্যাটস গ্যালারি বা কুইক লিংক কার্ড */}
          <div className="dashboard-card">
            <h3 className="text-lg font-bold font-poppins mb-3">
              Quick Metrics
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-card-soft/60 rounded-xl border border-border/40">
                <span className="block text-xl font-bold text-primary font-poppins">
                  148
                </span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  Books
                </span>
              </div>
              <div className="p-3 bg-card-soft/60 rounded-xl border border-border/40">
                <span className="block text-xl font-bold text-primary font-poppins">
                  $1.2K
                </span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  Earned
                </span>
              </div>
              <div className="p-3 bg-card-soft/60 rounded-xl border border-border/40">
                <span className="block text-xl font-bold text-primary font-poppins">
                  9
                </span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ➡️ ডান পাশের বড় কলাম: ফেসবুকের ফিডের মতো চার্ট এবং অ্যানালিটিক্স */}
        <div className="lg:col-span-2 space-y-6">
          {/* ৩টি কুইক স্ট্যাটস ব্যানার রো */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="dashboard-card !p-4 flex items-center gap-4"
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

          {/* প্রধান এনালিটিক্স চার্ট বক্স (Facebook Feed Post Style) */}
          <div className="dashboard-card">
            <div className="pb-4 border-b border-border/50 mb-6">
              <h3 className="text-xl font-bold font-poppins text-foreground">
                Performance Insights
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Monthly revenue generation analytics feed
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
                      id="facebookPrimary"
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
                    dataKey="earnings"
                    stroke="rgb(var(--primary))"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#facebookPrimary)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-1 text-xs text-muted-foreground font-semibold">
              <TrendingUp size={14} className="text-primary" />
              <span>+20% higher performance than last trailing month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianHomePage;
