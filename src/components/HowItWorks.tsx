"use client";

import { motion, useInView } from "framer-motion";
import { Search, Compass, Zap, Rocket } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We strip your idea to the studs — identify bottlenecks, define the audience, and set brutally honest goals.",
    icon: <Search className="w-5 h-5 text-cyan-default" />,
  },
  {
    num: "02",
    title: "Scope & Plan",
    desc: "Architectural blueprinting: data structures, tech stack, and API design locked in before writing a single line.",
    icon: <Compass className="w-5 h-5 text-cyan-default" />,
  },
  {
    num: "03",
    title: "Build & Review",
    desc: "Aggressive iteration cycles with continuous staging deploys and client collaboration until the product is airtight.",
    icon: <Zap className="w-5 h-5 text-cyan-default" />,
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "Production deployment, monitoring, and hand-off. Automated scaling handles traffic from day one.",
    icon: <Rocket className="w-5 h-5 text-cyan-default" />,
  },
];

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="how"
      ref={sectionRef}
      className="py-14 sm:py-20 bg-panel border-y border-borderCol relative z-10 px-4 sm:px-6 overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-cyan-default/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14 text-center"
        >
          <span className="font-mono text-xs text-cyan-default uppercase tracking-widest border border-cyan-default/30 bg-cyan-default/8 px-4 py-1.5 rounded-full mb-6 inline-block">
            Methodology
          </span>
          <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest">
            <span className="text-white">How We </span>
            <span className="text-gradient">Work.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[2.75rem] left-[12.5%] right-[12.5%] h-[1px]">
            <div
              className="h-full bg-gradient-to-r from-cyan-default/20 via-cyan-default/50 to-cyan-default/20"
              style={{
                transform: isInView ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.4s",
              }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.12,
              }}
              className="relative flex flex-col"
            >
              {/* Step number box */}
              <div className="relative mb-6">
                <div className="w-[52px] h-[52px] border border-cyan-default/40 bg-cyan-default/8 flex items-center justify-center font-mono text-xl font-bold text-cyan-default relative z-10 rounded-lg">
                  {step.num}
                </div>
                {/* Pulse ring on first load */}
                {isInView && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 1.2, delay: index * 0.18, ease: "easeOut" }}
                    className="absolute inset-0 rounded-lg border border-cyan-default/30"
                  />
                )}
                {/* Connector dot */}
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-default/50" />
              </div>

              {/* Step icon */}
              <div className="w-9 h-9 rounded-lg bg-cyan-default/8 border border-cyan-default/20 flex items-center justify-center mb-4">
                {step.icon}
              </div>

              <h4 className="font-syne text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-cyan-default transition-colors">
                {step.title}
              </h4>
              <p className="text-textMuted text-sm font-light leading-relaxed">
                {step.desc}
              </p>

              {/* Bottom accent line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] bg-gradient-to-r from-cyan-default to-transparent mt-5 rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
