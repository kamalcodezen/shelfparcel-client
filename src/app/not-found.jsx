import React from "react";
import { HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found | BiblioDrop",
};

const NotFoundPage = () => {
  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center p-4 font-urbanist text-foreground">
      <div className="max-w-md w-full text-center space-y-6 bg-card/40 border border-border/60 backdrop-blur-md p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden">
        {/* Decorative Ambient Background Light */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Core 404 Icon Badge */}
        <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center rounded-2xl">
          <HelpCircle size={28} />
        </div>

        {/* Error Context Headings */}
        <div className="space-y-2">
          <h1 className="font-poppins font-black text-4xl tracking-tight text-foreground">
            404
          </h1>
          <h2 className="font-poppins font-bold text-lg text-muted-foreground uppercase tracking-wider">
            Page Not Found
          </h2>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          The library shelf you are looking for doesn't exist or has been
          relocated permanently within the BiblioDrop matrix.
        </p>

        {/* Back to Safety Navigation Trigger */}
        <div className="pt-2 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-foreground text-background font-poppins font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-all shadow-md group cursor-pointer"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5 duration-300"
            />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
