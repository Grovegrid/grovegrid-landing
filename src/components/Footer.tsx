import { GithubIcon, LinkedinIcon, TwitterIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer className="bg-bg border-t border-borderCol pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6 sm:gap-8 mb-8 sm:mb-12">
        
        <div className="flex flex-col items-center md:items-start">
          <a href="#" className="flex items-center gap-3 mb-4">
            <img src="/favicon/favicon-96x96.png" alt="Grovegrid Logo" className="w-8 h-8 rounded-sm object-cover" />
            <span className="font-syne font-extrabold tracking-widest text-xl uppercase">Grovegrid</span>
          </a>
          <p className="text-textMuted font-mono text-xs max-w-xs text-center md:text-left">
            Architects of brutalist digital experiences and automated backend systems.
          </p>
        </div>

        <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-textMuted">
          <div className="flex flex-col gap-3 items-center md:items-start">
            <a href="#services" className="hover:text-cyan-default transition-colors">Services</a>
            <a href="#how" className="hover:text-cyan-default transition-colors">Process</a>
            <a href="#stats" className="hover:text-cyan-default transition-colors">Results</a>
          </div>
          <div className="flex flex-col gap-3 items-center md:items-start">
            <a href="#testimonials" className="hover:text-cyan-default transition-colors">Clients</a>
            <a href="#contact" className="hover:text-cyan-default transition-colors">Contact</a>
            <a href="#" className="hover:text-cyan-default transition-colors">Privacy</a>
          </div>
        </div>

        <div className="flex gap-4">
          {[
            { icon: <GithubIcon className="w-4 h-4" />, href: "#" },
            { icon: <LinkedinIcon className="w-4 h-4" />, href: "#" },
            { icon: <TwitterIcon className="w-4 h-4" />, href: "#" }
          ].map((social, i) => (
            <a 
              key={i}
              href={social.href} 
              className="w-10 h-10 border border-borderCol bg-panel flex items-center justify-center glow-card hover:border-cyan-default group"
            >
              <div className="text-textMuted group-hover:text-cyan-default transition-colors">
                {social.icon}
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-borderCol pt-8 flex flex-col md:flex-row justify-center items-center gap-2 font-mono text-[10px] text-textMuted uppercase tracking-widest text-center">
        <span>© 2026 Grovegrid. All rights reserved.</span>
        <span className="hidden md:inline">Â·</span>
        <span>Launched May 10, 2026</span>
      </div>
    </footer>
  );
};
