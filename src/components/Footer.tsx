import { FacebookIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "./Icons";

const footerLinks = [
  {
    heading: "Navigate",
    links: [
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#how" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Results", href: "#stats" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy", href: "#" },
    ],
  },
];

const socials = [
  { icon: <GithubIcon className="w-4 h-4" />, href: "https://github.com/Grovegrid", label: "GitHub" },
  { icon: <LinkedinIcon className="w-4 h-4" />, href: "#", label: "LinkedIn" },
  { icon: <FacebookIcon className="w-4 h-4" />, href: "https://www.facebook.com/share/1BmG6zZqZg", label: "Facebook" },
];

export const Footer = () => {
  return (
    <footer className="bg-bg border-t border-borderCol relative z-10 overflow-hidden">
      {/* Top gradient separator */}
      <div className="footer-brand-line" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-cyan-default/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
        {/* Main footer body */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-14">
          {/* Brand col — full width on mobile */}
          <div className="flex flex-col items-center md:items-start">
            <a href="#" className="flex items-center gap-3 mb-5 group">
              <div className="relative">
                <img
                  src="/favicon/favicon-96x96.png"
                  alt="Grovegrid Logo"
                  className="w-8 h-8 rounded-sm object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-cyan-default/20 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </div>
              <span className="font-syne font-extrabold tracking-widest text-lg uppercase text-white/90 group-hover:text-white transition-colors">
                Grovegrid
              </span>
            </a>
            <p className="text-textMuted font-mono text-xs max-w-[240px] text-center md:text-left leading-relaxed mb-6">
              Architects of premium digital experiences and zero-friction automated workflows.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 border border-borderCol bg-panel flex items-center justify-center rounded-lg glow-card hover:border-cyan-default/50 group transition-all duration-300"
                >
                  <div className="text-textMuted group-hover:text-cyan-default transition-colors duration-300">
                    {s.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — 2-col grid on mobile, each in its own col on desktop */}
          <div className="grid grid-cols-2 md:contents gap-6">
            {footerLinks.map((col, ci) => (
              <div key={ci} className="flex flex-col items-start">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-default mb-5">
                  {col.heading}
                </div>
                <div className="flex flex-col gap-3">
                  {col.links.map((link, li) => (
                    <a
                      key={li}
                      href={link.href}
                      className="group font-mono text-xs uppercase tracking-widest text-textMuted hover:text-white transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-0 h-[1px] bg-cyan-default group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status badge */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-borderCol/60">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] text-textMuted uppercase tracking-widest">
              Available · Rapid Delivery · Quality First
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[9px] sm:text-[10px] text-textMuted uppercase tracking-widest text-center sm:text-right">
            <span>© 2026 Grovegrid</span>
            <span className="text-borderCol hidden sm:inline">·</span>
            <span className="hidden sm:inline">Sylhet, Bangladesh</span>
            <span className="text-borderCol hidden sm:inline">·</span>
            <span className="hidden sm:inline">Since May 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
