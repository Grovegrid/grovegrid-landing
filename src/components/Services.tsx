"use client";

import { motion, type Variants } from "framer-motion";
import { GraduationCap, Newspaper, Pill, BookOpen, ShoppingBag, Layout } from "lucide-react";

const services = [
  {
    title: "School Systems",
    desc: "Digital results, attendance, and student tracking. Full LMS with automated SMS alerts and faculty workflows.",
    icon: <GraduationCap className="w-6 h-6 text-white" />,
    tags: ["LMS", "Automation", "SMS Alerts"],
    span: "md:col-span-2 md:row-span-2",
    gradient: "from-purple-accent/25 via-purple-accent/10 to-transparent",
    iconBg: "bg-purple-accent/20 border-purple-accent/40",
    accent: "rgba(4,120,87,0.15)",
    num: "01",
  },
  {
    title: "Newspaper Portals",
    desc: "Ultra-fast, mobile-optimized digital news with SEO-first architecture.",
    icon: <Newspaper className="w-6 h-6 text-cyan-default" />,
    tags: ["SEO", "AdSense", "Speed"],
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-cyan-default/12 to-transparent",
    iconBg: "bg-cyan-default/10 border-cyan-default/30",
    accent: "rgba(16,185,129,0.1)",
    num: "02",
  },
  {
    title: "Pharma Management",
    desc: "Intelligent inventory and POS for modern pharmacies with real-time analytics.",
    icon: <Pill className="w-6 h-6 text-purple-accent" />,
    tags: ["Inventory", "POS", "Analytics"],
    span: "md:col-span-1 md:row-span-2",
    gradient: "from-purple-accent/12 to-transparent",
    iconBg: "bg-purple-accent/10 border-purple-accent/30",
    accent: "rgba(4,120,87,0.12)",
    num: "03",
  },
  {
    title: "Coaching Portals",
    desc: "Online exams, payments, and complete CRM for coaching institutes.",
    icon: <BookOpen className="w-6 h-6 text-cyan-default" />,
    tags: ["Exams", "Payments", "CRM"],
    span: "md:col-span-2 md:row-span-1",
    gradient: "from-cyan-default/15 to-transparent",
    iconBg: "bg-cyan-default/15 border-cyan-default/40",
    accent: "rgba(16,185,129,0.12)",
    num: "04",
  },
  {
    title: "E-commerce Stores",
    desc: "Automated checkout, payments, and order tracking with smart inventory sync.",
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    tags: ["Payment", "Inventory", "UI/UX"],
    span: "md:col-span-2 md:row-span-1",
    gradient: "from-purple-accent/15 to-transparent",
    iconBg: "bg-purple-accent/15 border-purple-accent/40",
    accent: "rgba(4,120,87,0.1)",
    num: "05",
  },
  {
    title: "Corporate Identity",
    desc: "Custom high-end websites for premium brands. Pixel-perfect, blazing fast.",
    icon: <Layout className="w-6 h-6 text-cyan-default" />,
    tags: ["Branding", "Landing Page", "Performance"],
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-cyan-default/10 to-transparent",
    iconBg: "bg-cyan-default/10 border-cyan-default/30",
    accent: "rgba(16,185,129,0.08)",
    num: "06",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export const Services = () => {
  return (
    <section id="services" className="py-14 sm:py-20 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 sm:mb-14 text-center"
      >
        <span className="font-mono text-xs text-cyan-default uppercase tracking-widest border border-cyan-default/30 bg-cyan-default/8 px-4 py-1.5 rounded-full mb-6 inline-block shadow-[0_0_12px_rgba(16,185,129,0.12)]">
          Capabilities
        </span>
        <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest mb-4">
          <span className="text-white">What We </span>
          <span className="text-gradient">Build.</span>
        </h2>
        <p className="text-textMuted font-light text-sm sm:text-base max-w-xl mx-auto">
          Specialized solutions engineered for real industries — from education to commerce.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto md:auto-rows-[240px] gap-3 sm:gap-4"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            className={`glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative cursor-default ${service.span}`}
            style={{ boxShadow: "0 0 0 0 transparent" }}
          >
            {/* Gradient fill */}
            <div
              className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${service.gradient} opacity-50 group-hover:opacity-90 transition-opacity duration-500`}
            />
            {/* Shimmer on hover */}
            <div className="service-card-shimmer rounded-2xl" />
            {/* Number watermark */}
            <div className="absolute bottom-4 right-6 font-syne font-extrabold text-[4rem] leading-none text-white/3 select-none pointer-events-none group-hover:text-white/6 transition-colors duration-500">
              {service.num}
            </div>

            <div className="relative z-10 flex justify-between items-start mb-4">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.12 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center shadow-lg ${service.iconBg}`}
                style={{ minWidth: 48, minHeight: 48 }}
              >
                {service.icon}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300"
              >
                <span className="text-white text-sm">→</span>
              </motion.div>
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="font-syne text-xl sm:text-2xl font-extrabold mb-2 text-white group-hover:text-cyan-default transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-textMuted font-light text-sm mb-5 leading-relaxed">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-[9px] sm:text-[10px] text-white/70 uppercase">
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white/4 backdrop-blur-md border border-white/8 px-3 py-1 rounded-lg group-hover:border-white/15 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
