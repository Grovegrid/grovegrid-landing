"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "School Management & Digital Infrastructure.",
    client: "NMBHSC",
    description: "A comprehensive digital transformation for Nutan Bazar High School & College. We developed a custom platform that streamlines student analytics, automates attendance, and manages faculty workflows with zero friction.",
    image: "/projects/school.png",
    link: "https://nbmhsc.vercel.app",
    tags: ["Next.js", "PostgreSQL", "Tailwind", "Automation"],
  },
  {
    id: "02",
    title: "BanglaGo — Bangladesh Travel Portal.",
    client: "BanglaGo",
    description: "A high-performance React travel portal for discovering Bangladesh. Features a stunning Glassmorphism UI, advanced filtering by division & district, dark mode toggle, and buttery-smooth Framer Motion animations across 35+ curated destinations.",
    image: "/projects/bangla-go.png",
    link: "https://bangla-go.vercel.app",
    tags: ["React", "Framer Motion", "Glassmorphism", "Dark Mode"],
  },
];

export const RecentWork = () => {
  return (
    <section id="work" className="py-16 sm:py-24 relative overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 relative">
          <h2 className="font-syne font-extrabold text-7xl sm:text-9xl tracking-tightest leading-none mb-4 opacity-[0.03] absolute -top-12 sm:-top-20 left-0 select-none w-full text-center sm:text-left">
            PORTFOLIO
          </h2>
          <div className="relative z-10 flex flex-col items-center sm:items-start">
            <h3 className="font-syne font-extrabold text-4xl sm:text-6xl tracking-tightest mb-4">
              RECENT <span className="text-cyan-default">WORKS.</span>
            </h3>
            <div className="w-20 h-1 bg-cyan-default"></div>
          </div>
        </div>

        <div className="space-y-20 sm:space-y-32">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
            >
              {/* Image Side with Browser Mockup */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full lg:w-3/5"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-cyan-default/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Browser Window UI */}
                  <div className="relative border border-borderCol rounded-lg overflow-hidden shadow-2xl bg-panel">
                    <div className="bg-bg border-b border-borderCol px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/40 group-hover:bg-red-500 transition-colors duration-300"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500 transition-colors duration-300"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/40 group-hover:bg-green-500 transition-colors duration-300"></div>
                      </div>
                      <div className="mx-auto bg-bg/50 border border-borderCol px-3 py-1 rounded text-[8px] sm:text-[10px] font-mono text-textMuted w-1/2 text-center truncate">
                        {project.link.replace("https://", "")}
                      </div>
                    </div>
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                      />
                      {/* Scanline effect on project image */}
                      <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
                      <div className="absolute inset-0 bg-bg/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r border-b border-cyan-default/30 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full lg:w-2/5 flex flex-col items-start"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-cyan-default text-xs tracking-[0.3em] uppercase">Case Study {project.id}</span>
                  <div className="h-[1px] w-8 bg-borderCol"></div>
                </div>
                
                <h4 className="font-syne font-bold text-3xl sm:text-5xl mb-6 leading-tight text-white group-hover:text-cyan-default transition-colors">
                  {project.title}
                </h4>
                
                <p className="font-inter font-light text-textMuted text-base sm:text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-panel border border-borderCol text-[10px] font-mono text-textMuted uppercase tracking-widest hover:border-cyan-default transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-cyan-default"
                >
                  <span className="relative">
                    View Live Project
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-cyan-default transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </span>
                  <span className="w-10 h-10 rounded-full border border-cyan-default flex items-center justify-center group-hover:bg-cyan-default group-hover:text-bg transition-all duration-300 transform group-hover:translate-x-2">
                    &rarr;
                  </span>
                </a>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
