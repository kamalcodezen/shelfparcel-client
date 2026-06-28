"use client";
import { motion } from "framer-motion";
import { FiSearch, FiTruck, FiBookOpen } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FiSearch size={22} />,
      title: "Discover Books",
      desc: "Explore thousands of physical library catalogs across Palanpur instantly.",
    },
    {
      icon: <FiTruck size={22} />,
      title: "Smart Logistics",
      desc: "Our verified provider eco-system delivers to your exact coordinate.",
    },
    {
      icon: <FiBookOpen size={22} />,
      title: "Secure Returns",
      desc: "Read at your own pace and schedule stress-free returns via local hubs.",
    },
  ];

  return (
    <section className=" py-16 bg-background text-foreground">
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <span className="text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          Seamless Process
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight italic font-serif">
          How <span className="text-primary font-serif">BiblioDrop Works</span>
        </h2>
        <div className="w-12 h-0.5 bg-primary/60 my-1" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
        className=" w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -5 }}
            className="soft-card flex flex-col items-center text-center p-8 bg-card/40 group relative border border-border/60"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              {step.icon}
            </div>
            <h4 className="text-lg font-bold mt-5 tracking-tight">
              {step.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xs">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
