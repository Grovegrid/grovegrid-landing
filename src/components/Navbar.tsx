"use client";

import { useEffect, useState } from "react";

const navItems = [
  { name: "Services", id: "services" },
  { name: "Work", id: "work" },
  { name: "Process", id: "how" },
  { name: "Results", id: "stats" },
  { name: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";
      const scrollY = window.pageYOffset;
      setScrolled(scrollY > 20);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/90 backdrop-blur-xl border-b border-borderCol shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-b border-transparent"
        } py-3 sm:py-4`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group z-10">
            <div className="relative">
              <img
                src="/favicon/favicon-96x96.png"
                alt="Grovegrid Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-cyan-default/20 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </div>
            <span className="font-syne font-extrabold tracking-widest text-sm sm:text-base uppercase text-white/90 group-hover:text-white transition-colors">
              Grovegrid
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center font-mono text-[11px] lg:text-xs tracking-widest uppercase text-textMuted z-10">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link hover:text-cyan-default transition-colors duration-200 ${
                  activeSection === item.id ? "text-cyan-default active" : ""
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5 z-10">
            <div className="flex items-center gap-2 text-[10px] font-mono text-textMuted uppercase tracking-tight">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              Accepting Clients
            </div>
            <a
              href="#contact"
              className="px-5 py-2.5 border border-cyan-default text-cyan-default font-mono text-[10px] uppercase tracking-widest hover:bg-cyan-default hover:text-bg transition-all duration-300 rounded-sm relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-cyan-default translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden z-[110] relative w-10 h-10 flex flex-col items-center justify-center text-cyan-default hover:bg-white/5 transition-colors rounded-sm"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute block w-5 h-0.5 bg-cyan-default transition-all duration-300 ease-in-out ${
                  mobileOpen ? "top-2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute block w-5 h-0.5 bg-cyan-default transition-all duration-300 ease-in-out top-2 ${
                  mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block w-5 h-0.5 bg-cyan-default transition-all duration-300 ease-in-out ${
                  mobileOpen ? "top-2 -rotate-45" : "top-4"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] md:hidden transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-bg/97 backdrop-blur-2xl border-l border-borderCol z-[100] md:hidden flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-default/50 to-transparent" />

        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <img src="/favicon/favicon-96x96.png" alt="Grovegrid Logo" className="w-5 h-5 rounded-sm object-cover" />
              <span className="font-syne font-bold tracking-widest text-sm uppercase">Grovegrid</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-textMuted hover:text-cyan-default transition-colors w-8 h-8 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavClick}
                className={`font-mono text-base uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${
                  activeSection === item.id
                    ? "text-cyan-default"
                    : "text-textMuted hover:text-cyan-default"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 60}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(16px)",
                }}
              >
                <span className="text-[9px] text-cyan-default/40 font-mono">0{index + 1}</span>
                {item.name}
              </a>
            ))}
          </div>

          <div
            className="mt-auto flex flex-col gap-5 border-t border-borderCol pt-8"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.5s ease ${mobileOpen ? 380 : 0}ms`,
            }}
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-textMuted uppercase tracking-tight">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Accepting Clients
            </div>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="w-full py-4 border border-cyan-default text-cyan-default font-mono text-xs text-center uppercase tracking-[0.2em] hover:bg-cyan-default hover:text-bg transition-all duration-300 rounded-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
