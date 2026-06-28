import React from "react";
import { ShieldAlert, ArrowLeft, Home, Key, Lock } from "lucide-react";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center p-4 font-urbanist text-foreground relative overflow-hidden">
      {/* Background radial ambient deep red glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full border border-red-500/20 bg-gradient-to-b from-card/60 via-card/40 to-background/20 backdrop-blur-xl p-8 md:p-10 rounded-[36px] shadow-2xl text-center space-y-6 relative">
        {/* Top Floating Mini Ledger Status */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 font-poppins">
            <Lock size={10} /> Security Breach Logged
          </span>
        </div>

        {/* Core Focal Point: Central Alert Radar Shell */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          {/* Pulsing Outer Neon Border Circle */}
          <div className="absolute inset-0 border-2 border-red-500/20 rounded-full animate-ping opacity-75 duration-1000" />
          <div className="absolute inset-2 border border-red-500/30 rounded-full" />

          {/* Core Icon Container */}
          <div className="w-14 h-14 bg-red-500/10 border-2 border-red-500/30 text-red-500 flex items-center justify-center rounded-2xl shadow-lg shadow-red-500/5">
            <ShieldAlert size={26} className="animate-pulse" />
          </div>
        </div>

        {/* Text Context Component Block */}
        <div className="space-y-2">
          <h1 className="font-poppins font-black text-2xl md:text-3xl tracking-tight text-foreground uppercase">
            401 Access Denied
          </h1>
          <p className="text-sm text-muted-foreground/80 max-w-xs mx-auto leading-relaxed">
            Your current account credentials do not hold the mandatory clearance
            tokens required to initialize this dashboard node.
          </p>
        </div>

        {/* Minimal Dash Divider Line */}
        <div className="border-t border-dashed border-border/60 max-w-[120px] mx-auto" />

        {/* Grid Container for Redirection Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          {/* Action 1: Safely Return Home */}
          <Link
            href="/"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-border bg-card/40 hover:bg-muted/40 text-foreground font-poppins font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Home size={14} />
            <span>Go Home</span>
          </Link>

          {/* Action 2: Authenticate Identity */}
          <Link
            href="/signin"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-foreground text-background font-poppins font-bold text-sm uppercase tracking-wider rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg group cursor-pointer"
          >
            <Key size={14} />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
