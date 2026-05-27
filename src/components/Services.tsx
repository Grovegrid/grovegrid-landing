"use client";

import { motion } from "framer-motion";
import { GraduationCap, Newspaper, Pill, BookOpen, ShoppingBag, Layout } from "lucide-react";

const services = [
  {
    title: "School Systems",
    desc: "Complete digitalization of results, attendance, and student tracking. Stand out from other schools with a professional portal.",
    icon: <GraduationCap className="w-6 h-6 text-white" />,
    tags: ["LMS", "Automation", "SMS Alerts"],
    span: "md:col-span-2 md:row-span-2",
    gradient: "from-purple-accent/20 to-transparent",
    iconBg: "bg-purple-accent/20 border-purple-accent/40"
  },
  {
    title: "Newspaper Portals",
    desc: "Ultra-fast digital news platforms optimized for mobile.",
    icon: <Newspaper className="w-6 h-6 text-cyan-default" />,
    tags: ["SEO", "AdSense", "Speed"],
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-cyan-default/10 to-transparent",
    iconBg: "bg-cyan-default/10 border-cyan-default/30"
  },
  {
    title: "Pharma Management",
    desc: "Intelligent inventory for local pharmacies. Track expiry dates, manage stock levels, and eliminate financial loss.",
    icon: <Pill className="w-6 h-6 text-purple-accent" />,
    tags: ["Inventory", "POS", "Analytics"],
    span: "md:col-span-1 md:row-span-2",
    gradient: "from-purple-accent/10 to-transparent",
    iconBg: "bg-purple-accent/10 border-purple-accent/30"
  },
  {
    title: "Coaching Portals",
    desc: "Comprehensive management for coaching centers. Online exams, lecture sheets, and parent notifications.",
    icon: <BookOpen className="w-6 h-6 text-cyan-default" />,
    tags: ["Exams", "Payments", "CRM"],
    span: "md:col-span-2 md:row-span-1",
    gradient: "from-cyan-default/15 to-transparent",
    iconBg: "bg-cyan-default/15 border-cyan-default/40"
  },
  {
    title: "E-commerce Stores",
    desc: "Level up from F-commerce to a professional store. Automated checkout, payment gateway integration, and order tracking.",
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    tags: ["Payment", "Inventory", "UI/UX"],
    span: "md:col-span-2 md:row-span-1",
    gradient: "from-purple-accent/15 to-transparent",
    iconBg: "bg-purple-accent/15 border-purple-accent/40"
  },
  {
    title: "Corporate Identity",
    desc: "Custom high-end websites for local businesses looking to build a premium brand presence.",
    icon: <Layout className="w-6 h-6 text-cyan-default" />,
    tags: ["Branding", "Landing Page", "Performance"],
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-cyan-default/10 to-transparent",
    iconBg: "bg-cyan-default/10 border-cyan-default/30"
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <span className="font-mono text-xs text-cyan-default uppercase tracking-widest border border-cyan-default/30 bg-cyan-default/10 px-4 py-1.5 rounded-full mb-6 inline-block shadow-[0_0_10px_rgba(16,185,129,0.15)]">
          Capabilities
        </span>
        <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-accent drop-shadow-md">
          What We Build
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto md:auto-rows-[300px] gap-4 sm:gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative ${service.span}`}
          >
            {/* Background Gradient */}
            <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${service.gradient} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}></div>
            
            <div className="relative z-10 flex justify-between items-start mb-4">
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 ${service.iconBg}`}>
                {service.icon}
              </div>
              <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="text-white">→</span>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="font-syne text-2xl font-extrabold mb-3 text-white group-hover:text-cyan-default transition-colors duration-300">{service.title}</h3>
              <p className="text-textMuted font-light text-sm mb-6 leading-relaxed line-clamp-3">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-[10px] text-white/80 uppercase">
                {service.tags.map((tag, i) => (
                  <span key={i} className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
