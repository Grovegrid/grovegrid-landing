"use client";

import { motion, type Variants } from "framer-motion";
import { GraduationCap, Newspaper, Pill, BookOpen, ShoppingBag, Layout } from "lucide-react";

const services = [
  {
    title: "School Systems",
    desc: "Digital results, attendance, and student tracking. Full LMS with automated SMS alerts and faculty workflows.",
    icon: GraduationCap,
    tags: ["LMS", "Automation", "SMS Alerts"],
    span: "md:col-span-2 md:row-span-2",
    num: "01",
  },
  {
    title: "Newspaper Portals",
    desc: "Ultra-fast, mobile-optimized digital news with SEO-first architecture.",
    icon: Newspaper,
    tags: ["SEO", "AdSense", "Speed"],
    span: "md:col-span-1 md:row-span-1",
    num: "02",
  },
  {
    title: "Pharma Management",
    desc: "Intelligent inventory and POS for modern pharmacies with real-time analytics.",
    icon: Pill,
    tags: ["Inventory", "POS", "Analytics"],
    span: "md:col-span-1 md:row-span-2",
    num: "03",
  },
  {
    title: "Coaching Portals",
    desc: "Online exams, payments, and complete CRM for coaching institutes.",
    icon: BookOpen,
    tags: ["Exams", "Payments", "CRM"],
    span: "md:col-span-2 md:row-span-1",
    num: "04",
  },
  {
    title: "E-commerce Stores",
    desc: "Automated checkout, payments, and order tracking with smart inventory sync.",
    icon: ShoppingBag,
    tags: ["Payment", "Inventory", "UI/UX"],
    span: "md:col-span-2 md:row-span-1",
    num: "05",
  },
  {
    title: "Corporate Identity",
    desc: "Custom high-end websites for premium brands. Pixel-perfect, blazing fast.",
    icon: Layout,
    tags: ["Branding", "Landing Page", "Performance"],
    span: "md:col-span-1 md:row-span-1",
    num: "06",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const Services = () => {
  return (
    <section id="services" className="py-14 sm:py-20 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 sm:mb-14 text-center"
      >
        <span className="font-mono text-[10px] text-cyan-default uppercase tracking-[0.2em] border border-cyan-default/25 bg-cyan-default/6 px-4 py-1.5 rounded-full inline-block mb-5">
          Capabilities
        </span>
        <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest mb-3">
          <span className="text-white">What We </span>
          <span className="text-gradient">Build.</span>
        </h2>
        <p className="text-textMuted font-light text-sm max-w-lg mx-auto">
          Specialized solutions engineered for real industries — from education to commerce.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-3 auto-rows-auto md:auto-rows-[240px] gap-3"
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
              className={`
                relative group overflow-hidden rounded-2xl cursor-default
                flex flex-col justify-between p-5 sm:p-6
                border border-cyan-default/15
                bg-gradient-to-br from-cyan-default/10 via-[#0a1f1a]/80 to-[#050d0a]
                backdrop-blur-md
                ${service.span}
              `}
            >
              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl border border-cyan-default/0 group-hover:border-cyan-default/35 transition-all duration-400 pointer-events-none" />

              {/* Inner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: "inset 0 0 50px -12px rgba(16,185,129,0.12)" }}
              />

              {/* Top-left icon box */}
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-cyan-default/20 border border-cyan-default/35 flex items-center justify-center group-hover:bg-cyan-default/30 group-hover:border-cyan-default/60 transition-all duration-300 shadow-[0_0_14px_rgba(16,185,129,0.15)]">
                  <Icon className="w-5 h-5 text-cyan-default" />
                </div>
              </div>

              {/* Bottom content */}
              <div className="relative z-10 mt-auto">
                {/* Watermark number */}
                <div className="absolute bottom-0 right-1 font-syne font-extrabold text-[4.5rem] leading-none text-cyan-default/5 select-none pointer-events-none group-hover:text-cyan-default/9 transition-colors duration-500">
                  {service.num}
                </div>

                <h3 className="font-syne font-extrabold text-base sm:text-xl mb-1.5 text-cyan-default leading-tight">
                  {service.title}
                </h3>
                <p className="text-textMuted/80 font-light text-xs sm:text-sm mb-4 leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-cyan-default/60 border border-cyan-default/15 bg-cyan-default/5 px-2 py-1 rounded-md group-hover:border-cyan-default/30 group-hover:text-cyan-default/80 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
