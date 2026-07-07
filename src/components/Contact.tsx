"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check } from "lucide-react";
import { sendEmail } from "@/app/actions/contact";

export const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setStatus("sent");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Submission failed:", result.error, result.details);
        setStatus("idle");
        if (result.error?.toLowerCase().includes("timeout") || result.error?.toLowerCase().includes("connection")) {
          alert("The email service is taking too long to respond. Please check your internet connection or try again in a few minutes.");
        } else {
          alert(result.error || "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setStatus("idle");
      alert("A system error occurred. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-panel relative z-10 px-4 sm:px-6 border-t border-borderCol">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-cyan-default uppercase tracking-widest border border-cyan-default/30 bg-cyan-default/10 px-3 py-1 mb-4 inline-block">
            Initiate
          </span>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest text-textMain">
            Start a Project
          </h2>
        </div>

        <div className="bg-bg border border-borderCol p-5 sm:p-8 glow-card rounded">
          <ContactForm status={status} onSubmit={handleSubmit} />
        </div>
      </motion.div>
    </section>
  );
};

/* ── Extracted form with custom dropdown ── */
const SERVICE_OPTIONS = [
  { value: "web",        label: "Web Development" },
  { value: "automation", label: "Workflow Automation" },
  { value: "api",        label: "API Integration" },
  { value: "cloud",      label: "Cloud / DevOps" },
  { value: "data",       label: "Data Analytics" },
  { value: "ai",         label: "AI Integration" },
];

function ContactForm({
  status,
  onSubmit,
}: {
  status: "idle" | "sending" | "sent";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Hidden input carries the real value */}
      <input type="hidden" name="service" value={selectedService} required />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs text-textMuted uppercase tracking-widest">Name</label>
          <input
            type="text"
            name="name"
            required
            className="bg-panel border border-borderCol focus:border-cyan-default text-textMain px-4 py-3 outline-none transition-colors font-mono text-sm"
            placeholder="_JOHN DOE"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs text-textMuted uppercase tracking-widest">Email</label>
          <input
            type="email"
            name="email"
            required
            className="bg-panel border border-borderCol focus:border-cyan-default text-textMain px-4 py-3 outline-none transition-colors font-mono text-sm"
            placeholder="_J.DOE@COMPANY.COM"
          />
        </div>
      </div>

      {/* Custom dark dropdown */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs text-textMuted uppercase tracking-widest">Service</label>
        <div className="relative" ref={dropdownRef}>
          {/* Trigger */}
          <button
            type="button"
            id="service-dropdown-trigger"
            onClick={() => setDropdownOpen((o) => !o)}
            className={`w-full bg-panel border ${
              dropdownOpen ? "border-cyan-default" : "border-borderCol"
            } text-left px-4 py-3 outline-none transition-colors font-mono text-sm flex items-center justify-between cursor-pointer`}
          >
            <span className={selectedService ? "text-textMain" : "text-textMuted"}>
              {selectedService
                ? SERVICE_OPTIONS.find((o) => o.value === selectedService)?.label
                : "_SELECT PRIMARY NEED..."}
            </span>
            <svg
              className={`w-4 h-4 text-textMuted transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Options panel — floats over content via absolute positioning */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, scaleY: 0.95, y: -4 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                exit={{ opacity: 0, scaleY: 0.95, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute top-full left-0 z-[100] w-full mt-1 bg-[#0a0a0a] border border-cyan-default/40 shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden"
                id="service-dropdown-list"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedService(opt.value);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 font-mono text-sm transition-colors cursor-pointer ${
                        selectedService === opt.value
                          ? "bg-cyan-default/20 text-cyan-default"
                          : "text-textMain hover:bg-white/5 hover:text-cyan-default"
                      }`}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs text-textMuted uppercase tracking-widest">Project Brief</label>
        <textarea
          name="message"
          required
          rows={4}
          className="bg-panel border border-borderCol focus:border-cyan-default text-textMain px-4 py-3 outline-none transition-colors font-mono text-sm resize-none"
          placeholder="_DESCRIBE YOUR GOALS..."
        />
      </div>

      <button
        type="submit"
        disabled={status !== "idle" || !selectedService}
        className={`w-full font-mono font-bold uppercase tracking-widest py-4 transition-all flex justify-center items-center gap-2 ${
          status === "sent"
            ? "bg-green-500 text-white"
            : "bg-cyan-default text-bg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        }`}
      >
        {status === "idle" && (<>Send Message <Send className="w-4 h-4" /></>)}
        {status === "sending" && "Processing..."}
        {status === "sent" && (<>Message Sent! <Check className="w-4 h-4" /></>)}
      </button>

      <p className="text-center font-mono text-[10px] text-textMuted mt-4 uppercase">
        We reply within 24 hours · No spam · Ever.
      </p>
    </form>
  );
}
