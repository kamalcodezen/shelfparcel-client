"use client";
import { motion } from "framer-motion";
import { BookOpen, Star, Bookmark, Share2, Award, Zap } from "lucide-react";

export default function HeroMarquee() {
  const col1Items = [
    {
      text: "Trending Fiction",
      count: "12K+ Readers",
      icon: <Zap size={18} />,
    },
    {
      text: "Best Sellers 2026",
      count: "Top Choice",
      icon: <Award size={18} />,
    },
    {
      text: "Sci-Fi Masterpieces",
      count: "New Uploads",
      icon: <BookOpen size={18} />,
    },
    {
      text: "Academic Archives",
      count: "Verified",
      icon: <Bookmark size={18} />,
    },
  ];

  const col2Items = [
    { text: "Librarian's Choice", count: "Premium", icon: <Star size={18} /> },
    {
      text: "Doorstep Delivered",
      count: "99% Success",
      icon: <Zap size={18} />,
    },
    {
      text: "Rare Manuscripts",
      count: "Exclusive",
      icon: <BookOpen size={18} />,
    },
    {
      text: "BiblioDrop Specials",
      count: "Featured",
      icon: <Share2 size={18} />,
    },
  ];

  // ইনফিনিটি স্ক্রোলিং স্মুথ রাখার জন্য ডেটা ডাবল করা হলো
  const doubleCol1 = [...col1Items, ...col1Items];
  const doubleCol2 = [...col2Items, ...col2Items];

  return (
    <section className="relative py-20 bg-background overflow-hidden  select-none">
      <div className="container-custom grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 w-fit inline-block">
            Live Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight italic font-serif text-foreground">
            Elegance in <br />
            <span className="text-primary font-serif">Every Chapter.</span>
          </h2>
          <p className="text-lg sm:text-base md:text-lg sm:text-base text-muted-foreground leading-relaxed max-w-sm">
            Real-time status of trending categories, verified library catalogs,
            and fast doorstep distribution routes.
          </p>
        </div>

        {/*  ডান পাশ: কিলার ৩D ভার্টিক্যাল ডাবল মারকুই ট্র্যাক */}
        <div className="lg:col-span-7 h-[380px] relative grid grid-cols-2 gap-6 overflow-hidden rounded-[30px] border border-border/40 bg-card-soft/20 p-6">
          {/* গ্লাস মরফিজম টপ ও বটম ফেডিং মাস্ক */}
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background via-background/60 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background via-background/60 to-transparent z-20 pointer-events-none" />

          {/* COLUMN 1: ওপর থেকে নিচে স্ক্রোল হবে (UP TO DOWN) */}
          <div className="w-full overflow-hidden relative">
            <motion.div
              animate={{ y: [0, -400] }}
              transition={{
                ease: "linear",
                duration: 20,
                repeat: Infinity,
              }}
              className="flex flex-col gap-4"
            >
              {doubleCol1.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col gap-2 group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-primary">
                    {item.icon}
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-card-soft px-2 py-0.5 rounded border border-border text-muted-foreground group-hover:text-primary transition-colors">
                      {item.count}
                    </span>
                  </div>
                  <span className="font-bold text-lg sm:text-base tracking-wide text-foreground mt-1">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* COLUMN 2: নিচ থেকে ওপরে স্ক্রোল হবে (DOWN TO UP REVERSE) */}
          <div className="w-full overflow-hidden relative">
            <motion.div
              animate={{ y: [-400, 0] }}
              transition={{
                ease: "linear",
                duration: 22, // ভিন্ন স্পিড ছন্দ ধরে রাখার জন্য
                repeat: Infinity,
              }}
              className="flex flex-col gap-4"
            >
              {doubleCol2.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col gap-2 group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-primary">
                    {item.icon}
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-card-soft px-2 py-0.5 rounded border border-border text-muted-foreground group-hover:text-primary transition-colors">
                      {item.count}
                    </span>
                  </div>
                  <span className="font-bold text-lg sm:text-base tracking-wide text-foreground mt-1">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
