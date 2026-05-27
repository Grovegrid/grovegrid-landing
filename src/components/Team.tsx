"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, FacebookIcon } from "@/components/Icons";
import Image from "next/image";

const teamMembers = [
  {
    name: "Ridoy Baidya",
    role: "Founder & CEO of grovegrid",
    cornerLabel: "FOUNDER",
    image: "/profile_ridoy.jpg",
    bio: "I am a Full-Stack Web Developer from Sylhet, Bangladesh. I specialize in building robust and scalable web applications using modern technologies. My focus is on creating seamless user experiences with clean, efficient code.",
    badge: "3RD YEAR CSE @ SUST",
    socials: {
      github: "https://github.com/rid-coder-70",
      linkedin: "https://www.linkedin.com/in/ridoy-baidya",
      facebook: "https://www.facebook.com/ridoy.baiday.5",
    },
    portfolio: {
      url: "https://ridoybaidya.vercel.app",
      label: "PORTFOLIO",
    },
  },
  {
    name: "Priom Chakraborty",
    role: "Founder & COO of grovegrid",
    cornerLabel: "FOUNDER",
    image: "/profile_priom.jpeg",
    bio: "I am a passionate developer and strategic thinker from Sylhet, Bangladesh. I drive operational excellence and product strategy at grovegrid, ensuring every project we deliver exceeds expectations with precision and innovation.",
    badge: "3RD YEAR CSE @ SUST",
    socials: {
      github: "https://github.com/chkpriom",
      linkedin: "https://bd.linkedin.com/in/priom-chakraborty-b5007435b",
      facebook: "https://www.facebook.com/priom.chakraborty.31",
    },
    portfolio: null,
  },
];

export const Team = () => {
  return (
    <section id="team" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 sm:mb-16 text-center"
      >
        <span className="font-mono text-xs text-purple-accent uppercase tracking-widest border border-purple-accent/30 bg-purple-accent/10 px-4 py-1.5 rounded-full mb-6 inline-block shadow-[0_0_10px_rgba(168,85,247,0.2)]">
          Leadership
        </span>
        <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-default drop-shadow-md">
          The Minds Behind grovegrid
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="group relative h-full"
          >
            {/* Decorative Background Element */}
            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-default/10 to-purple-accent/10 rounded-3xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden h-full flex flex-col transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_-15px_rgba(0,242,254,0.3)] group-hover:border-cyan-default/30">
              
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-accent/20 to-transparent flex items-start justify-end p-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-[9px] sm:text-[10px] text-white/80 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-bl-lg">{member.cornerLabel}</span>
              </div>

              <div className="flex flex-col items-center gap-6 sm:gap-8 flex-1">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 shrink-0 mt-4">
                  {/* Glowing rings */}
                  <div className="absolute inset-0 rounded-full border border-cyan-default/30 scale-[1.1] group-hover:scale-[1.15] group-hover:border-cyan-default/70 transition-all duration-500 animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-0 rounded-full border border-purple-accent/30 scale-[1.2] group-hover:scale-[1.25] group-hover:border-purple-accent/70 transition-all duration-500 animate-[spin_15s_linear_infinite_reverse]"></div>
                  
                  <div className="relative z-10 w-full h-full rounded-full border-2 border-white/10 overflow-hidden shadow-2xl">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={400}
                      height={400}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                <div className="text-center flex-1 flex flex-col">
                  <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-white mb-2">{member.name}</h3>
                  <p className="font-mono text-[10px] sm:text-xs text-cyan-default uppercase tracking-widest mb-6">{member.role}</p>
                  
                  <p className="text-textMuted text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                    {member.bio}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-8 font-mono text-[10px] text-purple-accent/90 bg-purple-accent/10 w-max mx-auto px-3 py-1.5 rounded-full border border-purple-accent/20">
                    <div className="w-1.5 h-1.5 bg-purple-accent rounded-full animate-pulse"></div>
                    <span>{member.badge}</span>
                  </div>

                  <div className="flex justify-center gap-5 flex-wrap">
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-white transform hover:scale-110 transition-all duration-300">
                      <GithubIcon className="w-5 h-5" />
                    </a>
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-cyan-default transform hover:scale-110 transition-all duration-300">
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                    <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-[#1877F2] transform hover:scale-110 transition-all duration-300">
                      <FacebookIcon className="w-5 h-5" />
                    </a>
                    {member.portfolio && (
                      <a href={member.portfolio.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-cyan-default hover:text-white transition-colors border-l border-white/10 pl-5 ml-1">
                        {member.portfolio.label} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
