import React from "react";
import {
  BookOpen,
  Bookmark,
  Compass,
  Stars,
  User,
  Mail,
  Book,
} from "lucide-react";
import { getUserSession } from "@/lib/core/session";

const UserDashboardHomePage = async () => {
  const user = await getUserSession();

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center p-4 font-urbanist bg-background">
      <div className="max-w-xl w-full border border-border/50 bg-gradient-to-b from-card/60 to-card/20 rounded-[32px] p-8 md:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden backdrop-blur-md">
        {/*  Top bookmark decoration banner */}
        <div className="hidden md:flex absolute top-0 right-12 w-8 h-16 bg-primary/20 border-x border-b border-primary/30 rounded-b-xl items-end justify-center pb-2 text-primary animate-bounce duration-1000">
          <Bookmark size={14} className="fill-current" />
        </div>

        {/*  Minimal book icon layout */}

        <div className="flex justify-center pt-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center text-primary shadow-inner relative">
            {user?.image ? (
              <img
                src={user.image}
                alt="admin avatar"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <BookOpen size={28} className="stroke-[1.5]" />
            )}

            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse z-10" />
          </div>
        </div>

        {/*  ডাইনামিক গ্রিটিংস এবং ইউজারের নাম */}
        <div className="space-y-3">
          <p className="text-3xl md:text-4xl font-semibold tracking-tight leading-none italic font-serif  mb-3">
            Welcome back, <br />
            <span className="text-primary italic font-serif">
              {user?.name || "Reader"}
            </span>{" "}
          </p>

          {/* <h1 className="text-3xl md:text-4xl font-semibold font-poppins text-foreground tracking-tight capitalize">
            Welcome back, <br /> {user?.name || "Premium Reader"}
          </h1> */}
          <p className="text-xs text-primary font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-1">
            <Stars size={12} className="fill-current" /> Your Personal Library
            Hub
          </p>
        </div>

        {/*  ইউজারের ইমেইল ব্যাজ */}
        <div className="inline-flex items-center gap-2 bg-muted/40 border border-border/60 rounded-full px-4 py-1.5 mx-auto max-w-full">
          <Mail size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium truncate max-w-[220px]">
            {user?.email || "email-missing@bibliodrop.com"}
          </span>
        </div>

        {/*  Static aesthetic quote badge */}
        <div className="bg-muted/30 border border-border/40 rounded-2xl p-4 max-w-sm mx-auto shadow-sm">
          <p className="text-xs md:text-sm italic text-muted-foreground/90 font-medium leading-relaxed">
            "A reader lives a thousand lives before he dies."
          </p>
        </div>

        {/*  সিস্টেম মেটা অ্যানালিটিক্স ইনফরমেশন গ্রিড */}
        <div className="pt-6 border-t border-border/40 grid grid-cols-2 gap-4 text-left max-w-xs mx-auto">
          {/* স্ট্যাটাস কার্ড */}
          <div className="flex items-center gap-2.5 text-muted-foreground bg-card-soft/30 p-2 rounded-xl border border-border/20">
            <Compass size={16} className="text-primary flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[9px] uppercase font-bold tracking-wider opacity-60">
                Status
              </span>
              <span className="block text-xs font-bold text-foreground truncate">
                Live & Secure
              </span>
            </div>
          </div>

          {/* রোল কার্ড (১০০% ডাইনামিক ভাই!) */}
          <div className="flex items-center gap-2.5 text-muted-foreground bg-card-soft/30 p-2 rounded-xl border border-border/20">
            <User size={16} className="text-primary flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[9px] uppercase font-bold tracking-wider opacity-60">
                Role
              </span>
              <span className="block text-xs font-bold text-primary truncate capitalize">
                {user?.role || "Reader"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHomePage;
