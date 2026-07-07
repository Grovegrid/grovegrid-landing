"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const WORDS = ["structure", "purpose", "precision", "velocity"];

export const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const word = WORDS[wordIndex];
    let t: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < word.length) t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      else t = setTimeout(() => setTyping(false), 1800);
    } else {
      if (displayed.length > 0) t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      else { setWordIndex((i) => (i + 1) % WORDS.length); setTyping(true); }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, wordIndex]);

  return (
    <header
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden z-10 px-4 sm:px-6 text-center"
    >
      {/* Ambient glow — sits on top of global grid */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-default/5 blur-[130px] pointer-events-none z-0" />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-default/25 bg-cyan-default/5 backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-cyan-default">
            Now Accepting New Clients
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tightest leading-[1.06] mb-5"
        >
          <span className="hero-gradient-text">Where growth</span>
          <br />
          <span className="text-white">meets </span>
          <span className="text-gradient">{displayed}</span>
          <span className="cursor-blink text-cyan-default">|</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          className="font-inter font-light text-sm sm:text-base md:text-lg text-textMuted max-w-xl mb-8 leading-relaxed"
        >
          Premium web systems & intelligent automation — engineered to scale.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-16"
        >
          <a
            href="#contact"
            className="btn-glow px-7 py-3.5 bg-gradient-to-r from-cyan-dim to-purple-accent text-white font-mono font-bold text-xs uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_36px_rgba(5,150,105,0.5)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">Launch Your Project →</span>
          </a>
          <a
            href="#services"
            className="group px-7 py-3.5 glass-panel rounded-lg text-textMuted font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:text-cyan-default flex items-center justify-center gap-2"
          >
            Explore Services
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">↓</span>
          </a>
        </motion.div>

        {/* Minimal dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.46 }}
          className="relative w-full max-w-2xl mx-auto"
        >
          {/* Glow behind */}
          <div className="absolute -inset-4 bg-cyan-default/5 rounded-3xl blur-2xl pointer-events-none" />

          <div className="relative glass-panel rounded-2xl border border-cyan-default/20 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.08)]">
            {/* Window bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-white/2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              </div>
              <div className="font-mono text-[9px] text-cyan-default/60">performance_metrics.ts</div>
              <div className="font-mono text-[9px] text-textMuted/40">● live</div>
            </div>

            {/* Chart bars */}
            <div className="flex gap-3 p-5 h-36">
              {[
                { anim: ["25%", "80%", "45%", "90%"] as string[], dur: 3.8, color: "from-cyan-default to-cyan-default/10", label: "Traffic" },
                { anim: ["55%", "35%", "70%", "55%"] as string[], dur: 4.8, color: "from-purple-accent to-purple-accent/10", label: "Revenue" },
                { anim: ["35%", "90%", "55%", "100%"] as string[], dur: 5.5, color: "from-white/70 to-white/5", label: "Growth" },
                { anim: ["65%", "48%", "82%", "68%"] as string[], dur: 5, color: "from-cyan-dim to-cyan-dim/10", label: "Retention" },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end gap-1.5 bg-white/3 border border-white/6 rounded-lg p-2">
                  <motion.div
                    initial={{ height: "10%" }}
                    animate={{ height: bar.anim }}
                    transition={{ duration: bar.dur, repeat: Infinity, ease: "easeInOut" }}
                    className={`w-full bg-gradient-to-t ${bar.color} rounded-sm`}
                  />
                  <div className="font-mono text-[8px] text-textMuted/50 uppercase text-center tracking-wide">{bar.label}</div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 border-t border-white/6">
              {[
                { v: "50+", l: "Projects" },
                { v: "<48h", l: "Prototype" },
                { v: "10x", l: "Speed" },
              ].map((s, i) => (
                <div key={i} className={`py-3 text-center ${i < 2 ? "border-r border-white/6" : ""}`}>
                  <div className="font-mono text-sm font-bold text-cyan-default">{s.v}</div>
                  <div className="font-mono text-[8px] text-textMuted/60 uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 sm:-right-8 -top-4 glass-panel rounded-xl border border-cyan-default/25 bg-cyan-default/5 px-4 py-3 z-20 text-center min-w-[80px]"
          >
            <div className="text-lg sm:text-2xl font-syne font-bold text-gradient">+400%</div>
            <div className="font-mono text-[7px] text-textMuted uppercase tracking-widest">Growth</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
      >
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-cyan-default/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-cyan-default/50 to-transparent"
        />
      </motion.div>
    </header>
  );
};
