"use client";
import { motion } from "framer-motion";

export default function TopLibrarians() {
  // ডক রিকোয়ারমেন্ট: মোস্ট কমপ্লিটেড ডেলিভারি করা ৩ জন লাইব্রেরিয়ানের স্ট্যাটিক ডাটা
  const librarians = [
    {
      name: "Kamaluddin",
      avatar:
        "https://i.ibb.co/chbcHVwv/pngtree-muslim-boy-having-worship-and-praying-for-fasting-eid-of-islamic-image-15635901.jpg",
      deliveries: "142 Deliveries Successfully Handled",
    },
    {
      name: "Zayan Khan",
      avatar: "https://i.ibb.co/4wtvhX7Q/istockphoto-1361217779-612x612.jpg",
      deliveries: "118 Deliveries Successfully Handled",
    },
    {
      name: "Nusrat Jahan",
      avatar:
        "https://i.ibb.co/qYcd0THb/HD-wallpaper-islamic-girl-animated-girl-muslim-girl.jpg",
      deliveries: "95 Deliveries Successfully Handled",
    },
  ];

  return (
    <section className=" py-16 bg-background text-foreground">
      {/* শিরোনাম জোন (আপনার Poppins এবং সেরিফ থিম সিঙ্কড) */}
      <div className=" flex flex-col items-center text-center space-y-4 mb-16">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          Ecosystem Pillars
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight italic font-serif">
          Top{" "}
          <span className="text-primary font-serif">
            Librarians & Providers
          </span>
        </h2>
        <div className="w-12 h-0.5 bg-primary/60 my-1" />
      </div>

      {/* 🌊 Framer Motion: স্ক্রোলের সাথে স্ট্যাগার এনিমেশন পপ করবে */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
        className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {librarians.map((lib, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -5 }}
            className="dashboard-card flex flex-col items-center text-center p-8 bg-card/60 group relative overflow-hidden"
          >
            {/* ডার্ক মোড নিয়ন নিট গ্লো ব্যাকগ্রাউন্ড রিং */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

            {/* লাইব্রেরিয়ান অবতার ফ্রেম */}
            <div className="w-24 h-24 rounded-full p-1 border-2 border-primary/40 group-hover:border-primary transition-colors overflow-hidden mb-4 shadow-md bg-card-soft">
              <img
                src={lib.avatar}
                alt={lib.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <h4 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {lib.name}
            </h4>
            <p className="text-[10px] text-primary font-black uppercase mt-1 tracking-widest">
              {lib.deliveries}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
