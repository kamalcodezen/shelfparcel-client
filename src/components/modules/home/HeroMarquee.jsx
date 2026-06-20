"use client";
import { motion } from "framer-motion";
import { BookOpen, Star, Bookmark, Share2, Award, Zap } from "lucide-react";

export default function HeroMarquee() {
  const items = [
    { text: "Trending Fiction", icon: <Zap size={18} />, angle: 0 },
    { text: "Best Sellers 2026", icon: <Award size={18} />, angle: 60 },
    { text: "Sci-Fi Masterpieces", icon: <BookOpen size={18} />, angle: 120 },
    { text: "Academic Archives", icon: <Bookmark size={18} />, angle: 180 },
    { text: "Librarian's Choice", icon: <Star size={18} />, angle: 240 },
    { text: "BiblioDrop Specials", icon: <Share2 size={18} />, angle: 300 },
  ];

  return (
    <section className="relative py-18 bg-background overflow-hidden border-y border-border select-none flex flex-col items-center justify-center">
      
      {/* 👑 অরবিটের মাঝখানের ব্র্যান্ড টেক্সট কোর জোন */}
      <div className="absolute z-20 text-center pointer-events-none space-y-2">
        <h3 className="text-2xl font-black tracking-widest text-primary font-mono">BIBLIODROP</h3>
        <p className="text-xs font-serif italic text-muted-foreground">Live Circulation Track</p>
      </div>

      {/* 👑 ৩D অরবিট ট্র্যাক কন্টেইনার */}
      <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center">
        
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
        <div className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        {/* অরবিট গাইড রিং (Visual Guide Line) */}
        <div className="absolute inset-0 rounded-full border border-dashed border-border/60 animate-[spin_80s_linear_infinite]" />

        {/* 👑 মেকানিজম: প্রতিটা কার্ড বৃত্তের নির্দিষ্ট এঙ্গেলে থ্রিডি স্পেসে ঘুরবে */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
          className="absolute inset-0 w-full h-full"
        >
          {items.map((item, idx) => {
            return (
              <div
                key={idx}
                className="absolute top-1/2 left-1/2 w-[160px] md:w-[180px]"
                style={{
                  transform: `translate(-50%, -50%) rotate(${item.angle}deg) translate(160px) rotate(-${item.angle}deg)`,
                  // এখানে মেলাচ্ছি আসল ট্রিক: এঙ্গেল ম্যাপ করে এলিমেন্টগুলোকে সার্কেলে পুশ করা
                }}
              >
                {/* 👑 ভেতরের কার্ড যা নিজের রোটেশন ঠিক রেখে সোজা হয়ে ভাসবে */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    ease: "linear",
                    duration: 30,
                    repeat: Infinity,
                  }}
                  whileHover={{ scale: 1.08, y: -5 }}
                  className="p-4 rounded-2xl border border-border bg-card/90 shadow-lg backdrop-blur-sm hover:border-primary/50 transition-all duration-300 flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-card-soft border border-border flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs tracking-wide text-foreground group-hover:text-primary transition-colors">
                      {item.text}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium">Explore →</span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
      
    </section>
  );
}