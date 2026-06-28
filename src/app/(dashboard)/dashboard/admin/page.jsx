import React from "react";
import {
  Shield,
  Bookmark,
  Cpu,
  Activity,
  ShieldCheck,
  LayoutDashboard,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";

const AdminHomePage = async () => {
  const admin = await getUserSession();

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center p-4 font-urbanist text-foreground bg-background">
      <div className="max-w-xl w-full border border-border/50 bg-gradient-to-b from-card/60 to-card/20 rounded-[32px] p-8 md:p-10 shadow-xl text-center space-y-5 relative overflow-hidden backdrop-blur-md">
        {/*  Top librarian bookmark decoration banner */}
        <div className="hidden md:flex absolute top-0 right-12 w-8 h-16 bg-primary/20 border-x border-b border-primary/30 rounded-b-xl items-end justify-center pb-2 text-primary animate-bounce duration-1000">
          <Bookmark size={14} className="fill-current" />
        </div>

        {/*  Minimal administrative shield icon layout */}
        <div className="flex justify-center pt-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center text-primary shadow-inner relative">
            {admin?.image ? (
              <img
                src={admin.image}
                alt="admin avatar"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <Shield size={28} className="stroke-[1.5]" />
            )}

            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse z-10" />
          </div>
        </div>

        {/* admin greeting message headings */}
        <div className="space-y-2">
          <p className="text-3xl md:text-4xl font-semibold tracking-tight leading-none italic font-serif  mb-3">
            Welcome back, <br />
            <span className="text-primary italic font-serif">
              {admin?.name || "Admin"}
            </span>{" "}
          </p>

          <p className="text-[10px] text-primary font-black uppercase tracking-[0.25em] flex items-center justify-center gap-1 font-poppins">
            Authorized Administrative Matrix
          </p>
        </div>

        {/* Email badge*/}
        <div className="inline-flex items-center gap-2 bg-muted/40 border border-border/60 rounded-full px-4 py-1.5 mx-auto max-w-full">
          <Mail size={12} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium truncate max-w-[220px]">
            {admin?.email || "admin-core@bibliodrop.com"}
          </span>
        </div>

        {/*  Static aesthetic operational narrative badge */}
        <div className="bg-muted/30 border border-border/40 rounded-2xl p-4 max-w-sm mx-auto shadow-sm">
          <p className="text-base italic text-muted-foreground/90 font-medium leading-relaxed">
            "The platform architecture is optimized. Core data layers are
            completely locked and secure."
          </p>
        </div>

        {/*  System meta analytics information grid */}
        <div className="pt-6 border-t border-border/40 grid grid-cols-3 gap-2 text-left max-w-md mx-auto">
          {/*  System Status */}
          <div className="flex items-center gap-2 text-muted-foreground bg-card-soft/20 p-1.5 rounded-xl border border-border/10">
            <Activity size={15} className="text-primary flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[9px] uppercase font-bold tracking-wider opacity-60">
                Engine
              </span>
              <span className="block text-[11px] font-bold text-foreground truncate">
                Active 100%
              </span>
            </div>
          </div>

          {/*  Data Link */}
          <div className="flex items-center gap-2 text-muted-foreground border-x border-border/40 px-2 bg-card-soft/20 p-1.5 rounded-xl">
            <Cpu size={15} className="text-primary flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[9px] uppercase font-bold tracking-wider opacity-60">
                Pipeline
              </span>
              <span className="block text-[11px] font-bold text-foreground truncate">
                Synced
              </span>
            </div>
          </div>

          {/*  Clearance Level */}
          <div className="flex items-center gap-2 text-muted-foreground pl-1 bg-card-soft/20 p-1.5 rounded-xl border border-border/10">
            <ShieldCheck size={15} className="text-primary flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[9px] uppercase font-bold tracking-wider opacity-60">
                Clearance
              </span>
              <span className="block text-[11px] font-bold text-primary truncate capitalize">
                {admin?.role || "Admin"}
              </span>
            </div>
          </div>
        </div>

        {/*  Console steering action control trigger */}
        <div className="pt-4 flex items-center justify-center">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-poppins font-bold text-sm uppercase tracking-wider rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md group cursor-pointer"
          >
            <LayoutDashboard size={14} />
            <span>Launch Management Console</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
