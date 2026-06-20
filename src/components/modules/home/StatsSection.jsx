"use client";
import { motion } from "framer-motion";
// 👑 CountUp লাইব্রেরি ইম্পোর্ট
import CountUp from "react-countup";

export default function StatsSection() {
  const stats = [
    {
      start: 0,
      end: 12,
      suffix: "K+",
      decimals: 0,
      label: "Physical Catalogs Locked",
    },
    {
      start: 0,
      end: 4.8,
      suffix: "K+",
      decimals: 1,
      label: "Active Avid Readers",
    },
    {
      start: 0,
      end: 99.4,
      suffix: "%",
      decimals: 1,
      label: "On-Time Secure Logistics",
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-11/12 mx-auto dashboard-card grid grid-cols-1 md:grid-cols-3 gap-10 py-12 px-6 text-center relative"
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="space-y-1 relative group">
            {/* 👑 🎯 FIX: Render Props ব্যবহার করে টার্গেট নোড লক করা হলো যাতে Null এরর না আসে */}
            <h3 className="text-4xl lg:text-5xl font-black text-primary tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent Poppins">
              <CountUp
                start={stat.start}
                end={stat.end}
                decimals={stat.decimals}
                suffix={stat.suffix}
                duration={2.5}
                enableScrollSpy={true}
                scrollSpyOnce={true}
              >
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
            </h3>

            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1 Urbanist">
              {stat.label}
            </p>

            {/* কার্ডের মাঝখানের ডিভাইডার বর্ডার লাইন */}
            {idx < 2 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-border/40" />
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
