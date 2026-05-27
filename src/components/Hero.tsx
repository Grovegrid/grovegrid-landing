"use client";

import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-32 pb-16 overflow-hidden z-10 px-4 sm:px-6 text-center">
      <div className="grid-overlay" />
      <div className="grid-dots" />
      <div className="grid-perspective" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 mb-8 font-mono text-[10px] sm:text-xs text-cyan-default uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        >
          v1.0 &mdash; Launch Day, May 10 2026
        </motion.div>

        <h1 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tightest leading-[1.05] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-default to-purple-accent drop-shadow-lg pb-2">
          Where growth <br className="hidden sm:block" /> meets structure
        </h1>

        <p className="font-inter font-light text-sm sm:text-lg md:text-xl text-textMuted max-w-2xl mb-10 sm:mb-12 leading-relaxed">
          Grovegrid architects premium digital experiences and automated systems for the next generation of industries. We transform raw potential into technical dominance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16 w-full sm:w-auto">
          <a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-cyan-dim to-purple-accent text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(5,150,105,0.5)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Launch Your Project <span>&rarr;</span>
          </a>
          <a
            href="#services"
            className="px-8 py-4 glass-panel rounded-lg text-textMain font-mono text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 hover:text-cyan-default"
          >
            Explore Services
          </a>
        </div>

        {/* Abstract 3D/Glass Element */}
        <div className="relative w-full max-w-3xl h-64 sm:h-80 mx-auto mt-4 perspective-[1000px]">
          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              rotateX: [10, -5, 10],
              rotateY: [-10, 5, -10]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 flex items-center justify-center transform-style-3d"
          >
            {/* Back Panel */}
            <div className="absolute w-[80%] h-[120%] sm:w-[60%] sm:h-[140%] glass-panel rounded-2xl border border-white/5 bg-gradient-to-br from-purple-accent/10 to-transparent transform -translate-z-12 blur-sm opacity-50"></div>
            
            {/* Main Panel */}
            <div className="relative w-full h-full glass-panel rounded-2xl border border-cyan-default/30 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col p-6 sm:p-8 overflow-hidden z-10">
              
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-accent/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-default/30 rounded-full blur-3xl"></div>

              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4 relative z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                </div>
                <div className="font-mono text-[10px] text-cyan-default/80">performance_metrics.ts</div>
              </div>
              
              <div className="flex-1 flex gap-4 sm:gap-6 relative z-10">
                <div className="w-1/3 h-full rounded-lg bg-white/5 border border-white/10 flex flex-col justify-end p-2 sm:p-4 gap-2">
                  <motion.div 
                    initial={{ height: "20%" }}
                    animate={{ height: ["20%", "80%", "40%", "90%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full bg-gradient-to-t from-cyan-default to-cyan-default/20 rounded-sm"
                  ></motion.div>
                </div>
                <div className="w-1/3 h-full rounded-lg bg-white/5 border border-white/10 flex flex-col justify-end p-2 sm:p-4 gap-2">
                  <motion.div 
                    initial={{ height: "50%" }}
                    animate={{ height: ["50%", "30%", "70%", "60%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full bg-gradient-to-t from-purple-accent to-purple-accent/20 rounded-sm"
                  ></motion.div>
                </div>
                <div className="w-1/3 h-full rounded-lg bg-white/5 border border-white/10 flex flex-col justify-end p-2 sm:p-4 gap-2">
                  <motion.div 
                    initial={{ height: "30%" }}
                    animate={{ height: ["30%", "90%", "50%", "100%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full bg-gradient-to-t from-white/80 to-white/20 rounded-sm"
                  ></motion.div>
                </div>
              </div>
            </div>

            {/* Front Floating Element */}
            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 sm:-right-12 -bottom-8 sm:-bottom-12 w-32 h-32 sm:w-48 sm:h-48 glass-panel rounded-xl border border-purple-accent/40 bg-purple-accent/10 backdrop-blur-md transform translate-z-12 flex items-center justify-center shadow-[0_0_30px_rgba(5,150,105,0.2)] z-20"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-5xl font-syne font-bold text-white mb-1">+400%</div>
                <div className="text-[8px] sm:text-[10px] font-mono text-purple-accent uppercase tracking-widest">Growth Scaled</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10">
        <span className="font-mono text-[10px] tracking-widest uppercase text-cyan-default">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-default to-transparent"></div>
      </div>
    </header>
  );
};
