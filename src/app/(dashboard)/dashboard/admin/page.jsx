import React from "react";
import {
  Shield,
  Bookmark,
  Cpu,
  Activity,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

const AdminHomePage = () => {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center p-4 font-urbanist text-foreground">
      <div className="max-w-xl w-full border border-border/50 bg-gradient-to-b from-card/60 to-card/20 rounded-[32px] p-8 md:p-12 shadow-xl text-center space-y-6 relative overflow-hidden">
        {/* Top admin bookmark decoration banner */}
        <div className="absolute top-0 right-12 w-8 h-16 bg-primary/20 border-x border-b border-primary/30 rounded-b-xl flex items-end justify-center pb-2 text-primary">
          <Bookmark size={14} className="fill-current" />
        </div>

        {/* Minimal administrative shield icon layout */}
        <div className="flex justify-center pt-4">
          <div className="w-16 h-16 bg-muted/60 rounded-2xl border border-border flex items-center justify-center text-primary shadow-sm relative">
            <Shield size={28} className="stroke-[1.5]" />
            {/* Pulsing online network radar dot */}
            <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Main greeting message headings */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground tracking-tight">
            System Mainframe
          </h1>
          <p className="text-[10px] text-primary font-black uppercase tracking-[0.25em] flex items-center justify-center gap-1 font-poppins">
            Authorized Administrative Matrix
          </p>
        </div>

        {/* Static aesthetic operational narrative badge */}
        <div className="bg-muted/30 border border-border/40 rounded-2xl p-4 max-w-sm mx-auto">
          <p className="text-xs md:text-sm italic text-muted-foreground/90 font-medium leading-relaxed">
            "The platform architecture is optimized. Core data layers are
            completely locked and secure."
          </p>
        </div>

        {/* System meta analytics information grid (Upgraded to 3 columns for a clean look) */}
        <div className="pt-6 border-t border-border/40 grid grid-cols-3 gap-2 text-left max-w-md mx-auto">
          {/* Column 1: System Status */}
          <div className="flex items-center gap-2 text-muted-foreground">
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

          {/* Column 2: Data Link */}
          <div className="flex items-center gap-2 text-muted-foreground border-x border-border/40 px-2">
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

          {/* Column 3: Clearance Level */}
          <div className="flex items-center gap-2 text-muted-foreground pl-1">
            <ShieldCheck size={15} className="text-primary flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[9px] uppercase font-bold tracking-wider opacity-60">
                Clearance
              </span>
              <span className="block text-[11px] font-bold text-foreground truncate">
                Root Admin
              </span>
            </div>
          </div>
        </div>

        {/* Console steering action control trigger */}
        <div className="pt-4 flex items-center justify-center">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-poppins font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md group cursor-pointer"
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
