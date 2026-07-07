"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { label: "Projects Shipped", value: 50, suffix: "+", prefix: "" },
  { label: "Prototype Time", value: 48, suffix: "h", prefix: "<" },
  { label: "Execution Speed", value: 10, suffix: "x", prefix: "" },
  { label: "TypeScript", value: 100, suffix: "%", prefix: "" },
];

function AnimatedNumber({
  value,
  suffix,
  prefix,
  inView,
}: {
  value: number;
  suffix: string;
  prefix: string;
  inView: boolean;
}) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18, mass: 0.8 });
  const display = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  return (
    <div className="stat-value font-mono text-4xl sm:text-6xl md:text-7xl font-bold tabular-nums">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </div>
  );
}

export const Stats = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stats" ref={ref} className="py-14 sm:py-20 relative overflow-hidden z-10">

      <div className="section-separator mb-8 sm:mb-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="font-mono text-xs text-cyan-default uppercase tracking-widest border border-cyan-default/30 bg-cyan-default/8 px-4 py-1.5 rounded-full inline-block">
            Results
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center relative z-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
              }}
              className="relative group flex flex-col items-center"
            >
              {/* Glow behind number */}
              <div className="absolute -inset-4 bg-cyan-default/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              <AnimatedNumber
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                inView={isInView}
              />
              <div className="font-syne uppercase tracking-widest text-textMuted text-[10px] sm:text-xs font-semibold mt-3">
                {stat.label}
              </div>
              {/* Underline accent */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 + 0.5 }}
                className="h-[1.5px] bg-gradient-to-r from-cyan-default to-transparent mt-3 rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="section-separator mt-8 sm:mt-12" />
    </section>
  );
};
