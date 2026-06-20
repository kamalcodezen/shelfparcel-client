"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiLayers } from "react-icons/fi";

export default function PopularCategories() {
  // ডক রিকোয়ারমেন্ট অনুযায়ী ক্যাটাগরি স্লাগ ম্যাপিং (যা অল বুকস পেজে ফিল্টার হ্যান্ডেল করবে)
  const categories = [
    { name: "Fiction", count: "4,250 Books Available", slug: "Fiction" },
    { name: "Sci-Fi", count: "1,890 Books Available", slug: "Sci-Fi" },
    { name: "Academic", count: "3,120 Books Available", slug: "Academic" },
    { name: "Biography", count: "850 Books Available", slug: "Biography" },
  ];

  return (
    <section className="container-custom py-16 bg-background text-foreground select-none">
      {/* শিরোনাম জোন (আপনার Poppins ফন্ট সিঙ্কড) */}
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 Urbanist">
          Genre Gateway
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground Poppins">
          Popular <span className="text-primary">Categories</span>
        </h2>
        <div className="w-12 h-0.5 bg-primary/60 my-1" />
      </div>

      {/* 🌊 Framer Motion: স্ক্রোলের সাথে চমৎকার স্ট্যাগার এনিমেশন */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {categories.map((cat, idx) => (
          // 🎯 ক্লিক করলেই ডাইরেক্ট কুয়েরি প্যারামিটারসহ অল-বুকস রাউটে নিয়ে যাবে
          <Link key={idx} href={`/books?category=${cat.slug}`}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              whileTap={{ scale: 0.98 }}
              className="soft-card flex flex-col justify-between h-40 p-6 group cursor-pointer hover:border-primary/40 hover:bg-card/40 transition-all duration-300 shadow-sm"
            >
              {/* ফ্লোটিং নিয়ন আইকন */}
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <FiLayers size={18} />
              </div>

              <div className="space-y-0.5">
                <h4 className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors Poppins">
                  {cat.name}
                </h4>
                <p className="text-xs text-muted-foreground font-medium Urbanist">
                  {cat.count}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
