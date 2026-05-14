"use client";

import { useEffect, useState } from "react";

const navItems = [
  { name: "Services", id: "services" },
  { name: "Work", id: "work" },
  { name: "Process", id: "how" },
  { name: "Results", id: "stats" },
  { name: "Clients", id: "testimonials" },
  { name: "Team", id: "team" },
  { name: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-borderCol transition-all duration-300 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 sm:gap-3 group z-10">
            <img src="/favicon/favicon-96x96.png" alt="Grovegrid Logo" className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm object-cover" />
            <span className="font-syne font-extrabold tracking-widest text-base sm:text-lg uppercase">Grovegrid</span>
          </a>
          <div className="hidden md:flex gap-6 lg:gap-8 items-center font-mono text-xs lg:text-sm tracking-widest uppercase text-textMuted z-10">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link hover:text-cyan-default ${activeSection === item.id ? "text-cyan-default active" : ""
                  }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6 z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-textMuted uppercase">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Now Accepting Clients
            </div>
            <a
              href="#contact"
              className="px-5 py-2 border border-cyan-default text-cyan-default font-mono text-xs uppercase tracking-widest hover:bg-cyan-default hover:text-bg transition-colors"
            >
              Get Started
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden z-[110] relative w-10 h-10 flex flex-col items-center justify-center text-cyan-default hover:bg-white/5 transition-colors rounded-sm"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute block w-6 h-0.5 bg-cyan-default transition-all duration-300 ease-in-out ${mobileOpen ? "top-2.5 rotate-45" : "top-0"
                  }`}
              />
              <span
                className={`absolute block w-6 h-0.5 bg-cyan-default transition-all duration-300 ease-in-out top-2.5 ${mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
              />
              <span
                className={`absolute block w-6 h-0.5 bg-cyan-default transition-all duration-300 ease-in-out ${mobileOpen ? "top-2.5 -rotate-45" : "top-5"
                  }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden transition-opacity duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-bg/95 backdrop-blur-xl border-l border-borderCol z-[100] md:hidden flex flex-col transition-transform duration-500 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <img src="/favicon/favicon-96x96.png" alt="Grovegrid Logo" className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm object-cover" />
              <span className="font-syne font-bold tracking-widest text-sm uppercase">Grovegrid</span>
            </div>
            <button 
              onClick={() => setMobileOpen(false)}
              className="text-textMuted hover:text-cyan-default transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div className="flex flex-col gap-6">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavClick}
                className={`font-mono text-lg uppercase tracking-widest transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-cyan-default translate-x-2"
                    : "text-textMuted hover:text-cyan-default hover:translate-x-2"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 50}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(20px)",
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div
            className="mt-auto flex flex-col gap-6 border-t border-borderCol pt-8"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s ease ${mobileOpen ? 400 : 0}ms`,
            }}
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-textMuted uppercase tracking-tight">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              Accepting Clients
            </div>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="w-full py-4 border border-cyan-default text-cyan-default font-mono text-xs text-center uppercase tracking-[0.2em] hover:bg-cyan-default hover:text-bg transition-all duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
