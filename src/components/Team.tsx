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
      url: "https://ridoy-baidya.vercel.app",
      label: "PORTFOLIO",
    },
  },
  {
    name: "Priom Chakraborty",
    role: "Co-Founder & COO of grovegrid",
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
        <span className="font-mono text-xs text-cyan-default uppercase tracking-widest border border-cyan-default/30 bg-cyan-default/10 px-3 py-1 mb-4 inline-block">
          Leadership
        </span>
        <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest text-textMain">
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
            className="group relative"
          >
            {/* Decorative Background Element */}
            <div className="absolute -inset-4 bg-cyan-default/5 border border-cyan-default/10 -z-10 blur-xl group-hover:bg-cyan-default/10 transition-all duration-500"></div>
            
            <div className="bg-panel border border-borderCol p-6 sm:p-8 relative overflow-hidden h-full">
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-default/5 flex items-center justify-center border-l border-b border-borderCol">
                <span className="font-mono text-[8px] sm:text-[10px] text-cyan-default rotate-45">{member.cornerLabel}</span>
              </div>

              <div className="flex flex-col items-center gap-6 sm:gap-8">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 shrink-0">
                  <div className="absolute inset-0 border-2 border-cyan-default translate-x-2 translate-y-2 z-0"></div>
                  <div className="relative z-10 w-full h-full bg-bg border border-borderCol overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-textMain mb-1">{member.name}</h3>
                  <p className="font-mono text-[10px] sm:text-xs text-cyan-default uppercase tracking-widest mb-4">{member.role}</p>
                  
                  <p className="text-textMuted text-xs sm:text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-6 font-mono text-[10px] text-cyan-default/80">
                    <div className="w-1.5 h-1.5 bg-cyan-default rounded-full"></div>
                    <span>{member.badge}</span>
                  </div>

                  <div className="flex justify-center gap-4 flex-wrap">
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-cyan-default transition-colors">
                      <GithubIcon className="w-5 h-5" />
                    </a>
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-cyan-default transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                    <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-cyan-default transition-colors">
                      <FacebookIcon className="w-5 h-5" />
                    </a>
                    {member.portfolio && (
                      <a href={member.portfolio.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-cyan-default hover:text-white transition-colors border-l border-borderCol pl-4 ml-2">
                        {member.portfolio.label} <ExternalLink className="w-3 h-3" />
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
