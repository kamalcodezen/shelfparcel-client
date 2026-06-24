"use client";

import React from "react";
import { BookOpen, Bookmark, Compass, Stars } from "lucide-react";

const UserDashboardHomePage = () => {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center p-4 font-urbanist">
      <div className="max-w-xl w-full border border-border/50 bg-gradient-to-b from-card/60 to-card/20 rounded-[32px] p-8 md:p-12 shadow-xl text-center space-y-6 relative overflow-hidden">
        {/* Top bookmark decoration banner */}
        <div className="absolute top-0 right-12 w-8 h-16 bg-primary/20 border-x border-b border-primary/30 rounded-b-xl flex items-end justify-center pb-2 text-primary">
          <Bookmark size={14} className="fill-current" />
        </div>

        {/* Minimal book icon layout */}
        <div className="flex justify-center pt-4">
          <div className="w-16 h-16 bg-muted/60 rounded-2xl border border-border flex items-center justify-center text-primary shadow-sm">
            <BookOpen size={28} className="stroke-[1.5]" />
          </div>
        </div>

        {/* Main greeting message headings */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground tracking-tight">
            Hello, Reader
          </h1>
          <p className="text-xs text-primary font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-1">
            <Stars size={12} className="fill-current" /> Your Personal Library
            Hub
          </p>
        </div>

        {/* Static aesthetic quote badge */}
        <div className="bg-muted/30 border border-border/40 rounded-2xl p-4 max-w-sm mx-auto">
          <p className="text-xs md:text-sm italic text-muted-foreground/90 font-medium leading-relaxed">
            "A reader lives a thousand lives before he dies."
          </p>
        </div>

        {/* System meta analytics information grid */}
        <div className="pt-6 border-t border-border/40 grid grid-cols-2 gap-4 text-left max-w-xs mx-auto">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Compass size={16} className="text-primary flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[10px] uppercase font-bold tracking-wider opacity-60">
                Status
              </span>
              <span className="block text-xs font-bold text-foreground truncate">
                Live & Secure
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Bookmark size={16} className="text-primary flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[10px] uppercase font-bold tracking-wider opacity-60">
                Role
              </span>
              <span className="block text-xs font-bold text-foreground truncate">
                Verified Reader
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHomePage;
