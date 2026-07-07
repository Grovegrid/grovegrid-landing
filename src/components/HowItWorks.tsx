"use client";

import { motion, useInView } from "framer-motion";
import { Search, Compass, Zap, Rocket } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We strip your idea to the studs — identify bottlenecks, define the audience, and set brutally honest goals.",
    icon: Search,
    color: "from-cyan-default/20 to-cyan-default/5",
    iconColor: "text-cyan-default",
    borderColor: "border-cyan-default/30",
    glowColor: "rgba(16,185,129,0.15)",
  },
  {
    num: "02",
    title: "Scope & Plan",
    desc: "Architectural blueprinting: data structures, tech stack, and API design locked in before writing a single line.",
    icon: Compass,
    color: "from-purple-accent/20 to-purple-accent/5",
    iconColor: "text-cyan-default",
    borderColor: "border-purple-accent/30",
    glowColor: "rgba(4,120,87,0.15)",
  },
  {
    num: "03",
    title: "Build & Review",
    desc: "Aggressive iteration cycles with continuous staging deploys and client collaboration until the product is airtight.",
    icon: Zap,
    color: "from-cyan-default/20 to-cyan-default/5",
    iconColor: "text-cyan-default",
    borderColor: "border-cyan-default/30",
    glowColor: "rgba(16,185,129,0.15)",
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "Production deployment, monitoring, and hand-off. Automated scaling handles traffic from day one.",
    icon: Rocket,
    color: "from-purple-accent/20 to-purple-accent/5",
    iconColor: "text-cyan-default",
    borderColor: "border-purple-accent/30",
    glowColor: "rgba(4,120,87,0.15)",
  },
];

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="how"
      ref={sectionRef}
      className="py-14 sm:py-20 relative z-10 px-4 sm:px-6 overflow-hidden"
    >
      {/* Section background panel */}
      <div className="absolute inset-0 bg-white/[0.015] border-y border-white/[0.06] pointer-events-none" />

      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-32 bg-cyan-default/5 blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14 text-center"
        >
          <span className="font-mono text-[10px] text-cyan-default uppercase tracking-[0.2em] border border-cyan-default/25 bg-cyan-default/6 px-4 py-1.5 rounded-full inline-block mb-5">
            Methodology
          </span>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest">
            <span className="text-white">How We </span>
            <span className="text-gradient">Work.</span>
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">

          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[2.4rem] left-[12%] right-[12%] h-px z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-default/30 via-cyan-default/60 to-cyan-default/30"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="relative group"
              >
                {/* Card */}
                <div
                  className={`relative h-full rounded-2xl border ${step.borderColor} bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-md p-5 sm:p-6 flex flex-col gap-4 overflow-hidden transition-all duration-400`}
                  style={{
                    boxShadow: `0 0 0 0 transparent`,
                  }}
                >
                  {/* Card hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                    style={{
                      boxShadow: `0 0 40px -8px ${step.glowColor}, inset 0 0 30px -12px ${step.glowColor}`,
                    }}
                  />

                  {/* Top gradient */}
                  <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${step.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Step number + connector dot */}
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`relative w-10 h-10 rounded-xl border ${step.borderColor} bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                      {/* Pulse ring on enter */}
                      {isInView && (
                        <motion.div
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 1.7, opacity: 0 }}
                          transition={{ duration: 1.1, delay: index * 0.15 + 0.4 }}
                          className={`absolute inset-0 rounded-xl border ${step.borderColor}`}
                        />
                      )}
                      <span className="font-mono text-xs font-bold text-cyan-default">{step.num}</span>
                    </div>

                    {/* Dot connector (visible only on lg between cards via absolute line above) */}
                    <div className="hidden lg:flex flex-1 items-center justify-end">
                      {index < steps.length - 1 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ duration: 0.4, delay: index * 0.15 + 0.6 }}
                          className="w-1.5 h-1.5 rounded-full bg-cyan-default/50"
                        />
                      )}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-lg border ${step.borderColor} bg-white/[0.04] flex items-center justify-center relative z-10 group-hover:border-cyan-default/50 transition-colors duration-300`}>
                    <Icon className={`w-4 h-4 ${step.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                  </div>

                  {/* Text */}
                  <div className="relative z-10 flex-1">
                    <h4 className="font-syne text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-default transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-textMuted text-xs sm:text-sm font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "2rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.12 + 0.5 }}
                    className="h-[1.5px] bg-gradient-to-r from-cyan-default to-transparent rounded-full relative z-10"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
