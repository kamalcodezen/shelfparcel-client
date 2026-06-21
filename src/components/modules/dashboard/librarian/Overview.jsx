"use client";

import React from "react";
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
import { BookOpen, DollarSign, Clock, TrendingUp } from "lucide-react";
import { Avatar } from "@heroui/react";

// মক ডেটা (আপনার ব্যাকএন্ড এপিআই কানেক্ট করার আগ পর্যন্ত চার্ট ও লিস্ট দেখানোর জন্য)
const analyticsData = [
  { name: "Jan", earnings: 400, requests: 24 },
  { name: "Feb", earnings: 300, requests: 18 },
  { name: "Mar", earnings: 600, requests: 35 },
  { name: "Apr", earnings: 800, requests: 48 },
  { name: "May", earnings: 500, requests: 30 },
  { name: "Jun", earnings: 1100, requests: 55 },
];

const mostRequestedBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    requests: 45,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=100",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    requests: 38,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=100",
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    requests: 29,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=100",
  },
];

export default function LibrarianOverview() {
  // কুইক স্ট্যাটসের কাল্পনিক হিসাব (পরবর্তীতে রিয়েল ডেটা বসবে)
  const stats = [
    {
      title: "Total Books Listed",
      value: "148",
      icon: BookOpen,
      desc: "+12 new this month",
    },
    {
      title: "Total Earnings",
      value: "$1,240",
      icon: DollarSign,
      desc: "+20% from last month",
    },
    {
      title: "Active Pending Requests",
      value: "9",
      icon: Clock,
      desc: "Requires immediate action",
    },
  ];

  return (
    <div className="space-y-8 font-urbanist text-foreground py-10">
      {/* =========================================
         👑 ১. QUICK STATS CARDS SECTION
      ========================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold mt-2 font-poppins text-foreground">
                    {stat.value}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                <TrendingUp size={14} className="text-primary" />
                {stat.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* =========================================
         📊 ২. CHARTS VISUALIZATION SECTION
      ========================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* প্রধান ইনকাম চার্ট (Earnings Overview) */}
        <div className="dashboard-card lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold font-poppins text-foreground">
              Earnings Analytics
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Monthly revenue generation overview
            </p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" h="100%">
              <AreaChart
                data={analyticsData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
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
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="rgb(var(--muted-foreground))"
                  fontSize={12}
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
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrimary)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ৩. MINI-LIST: MOST REQUESTED BOOKS */}
        <div className="dashboard-card flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold font-poppins text-foreground">
              Most Requested
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Your top performing book listings
            </p>
          </div>

          <div className="space-y-4 flex-1">
            {mostRequestedBooks.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-card-soft/50 border border-border/40 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Avatar
                    src={book?.image}
                    radius="lg"
                    className="w-11 h-11 flex-shrink-0 object-cover"
                  />
                  <div className="overflow-hidden">
                    <h4 className="font-semibold text-foreground text-sm truncate font-poppins">
                      {book.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      by {book.author}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 pl-2">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {book.requests} reqs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
