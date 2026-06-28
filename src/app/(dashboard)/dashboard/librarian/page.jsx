import React from "react";
import {
  BookOpen,
  Bookmark,
  Compass,
  Stars,
  Settings,
  LayoutDashboard,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";

const LibrarianHomePage = async () => {
  //  সার্ভার সাইড থেকে সরাসরি লাইব্রেরিয়ানের সেশন ডেটা নিয়ে আসলাম ভাই
  const librarian = await getUserSession();

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center p-4 md:p-6 font-urbanist text-foreground bg-background">
      {/* Main Container Layout with Left Alignment Shift */}
      <div className="max-w-2xl w-full border border-border/50 bg-gradient-to-b from-card/60 to-card/20 rounded-[32px] p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 backdrop-blur-md">
        {/* Top librarian bookmark decoration banner */}
        <div className="hidden md:flex absolute top-0 right-12 w-8 h-16 bg-primary/20 border-x border-b border-primary/30 rounded-b-xl  items-end justify-center pb-2 text-primary animate-bounce duration-1000">
          <Bookmark size={14} className="fill-current" />
        </div>

        {/* Left Side: Identity and Metadata Alignment */}
        <div className="space-y-5 flex-1 pt-4 md:pt-0">
          {/* Header Row: Floating Asset Icon + Main Identity Titles */}
          <div className="flex items-center gap-4">
            {/*  Minimal administrative shield icon layout */}
            <div className="flex justify-center pt-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center text-primary shadow-inner relative">
                {librarian?.image ? (
                  <img
                    src={librarian.image}
                    alt="librarian avatar"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <BookOpen size={28} className="stroke-[1.5]" />
                )}

                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse z-10" />
              </div>
            </div>
            {/* welcome back message */}
            <div className="space-y-0.5 pl-3">
              <p className="text-3xl md:text-4xl font-semibold tracking-tight leading-none italic font-serif  mb-1">
                Welcome back, <br />
                <span className="text-primary italic font-serif">
                  {librarian?.name || "Librarian"}
                </span>{" "}
              </p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] flex items-center gap-1 font-poppins">
                <Stars size={10} className="fill-current" /> Inventory
                Controller
              </p>
            </div>
          </div>
          {/* email badge */}
          <div className="inline-flex items-center gap-2 bg-muted/40 border border-border/60 rounded-full px-4 py-1.5 max-w-full">
            <Mail size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium truncate max-w-[240px]">
              {librarian?.email || "librarian-email@bibliodrop.com"}
            </span>
          </div>

          {/* Aesthetic Narrative Quote Block */}
          <div className="bg-muted/30 border border-border/40 rounded-2xl p-4 max-w-md shadow-sm">
            <p className="text-xs italic text-muted-foreground/90 font-medium leading-relaxed">
              "A library is not a luxury but one of the necessities of life."
            </p>
          </div>

          {/* Infrastructure Metrics Grid Alignment */}
          <div className="pt-4 border-t border-border/40 grid grid-cols-3 gap-2 text-left max-w-sm">
            {/* Metric Node 1 */}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Compass size={14} className="text-primary flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="block text-[8px] uppercase font-bold tracking-wider opacity-60">
                  Status
                </span>
                <span className="block text-xs font-bold text-foreground truncate">
                  Active
                </span>
              </div>
            </div>

            {/* Metric Node 2 */}
            <div className="flex items-center gap-1.5 text-muted-foreground border-x border-border/40 px-2">
              <Bookmark size={14} className="text-primary flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="block text-[8px] uppercase font-bold tracking-wider opacity-60">
                  Role
                </span>
                <span className="block text-xs font-bold text-primary truncate capitalize">
                  {librarian?.role || "Librarian"}
                </span>
              </div>
            </div>

            {/* Metric Node 3 */}
            <div className="flex items-center gap-1.5 text-muted-foreground pl-1">
              <Settings size={14} className="text-primary flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="block text-[8px] uppercase font-bold tracking-wider opacity-60">
                  Console
                </span>
                <span className="block text-xs font-bold text-foreground truncate">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Navigation Trigger Button Alignment */}
        <div className="flex items-center justify-start md:justify-end flex-shrink-0">
          <Link
            href="/dashboard/librarian"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-foreground text-background font-poppins font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md group cursor-pointer whitespace-nowrap"
          >
            <LayoutDashboard size={14} />
            <span>Launch Console</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LibrarianHomePage;
