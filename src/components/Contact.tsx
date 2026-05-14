"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <section id="contact" className="py-20 sm:py-32 bg-panel relative z-10 px-4 sm:px-6 border-t border-borderCol">
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
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-textMuted uppercase tracking-widest">Service</label>
              <select 
                name="service"
                required 
                className="bg-panel border border-borderCol focus:border-cyan-default text-textMain px-4 py-3 outline-none transition-colors font-mono text-sm appearance-none cursor-pointer"
              >
                <option value="">_SELECT PRIMARY NEED...</option>
                <option value="web">Web Development</option>
                <option value="automation">Workflow Automation</option>
                <option value="api">API Integration</option>
                <option value="cloud">Cloud / DevOps</option>
                <option value="data">Data Analytics</option>
                <option value="ai">AI Integration</option>
              </select>
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
              disabled={status !== "idle"}
              className={`w-full font-mono font-bold uppercase tracking-widest py-4 transition-all flex justify-center items-center gap-2 ${
                status === "sent" 
                  ? "bg-green-500 text-white" 
                  : "bg-cyan-default text-bg hover:bg-white"
              }`}
            >
              {status === "idle" && (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
              {status === "sending" && "Processing..."}
              {status === "sent" && (
                <>Message Sent! <Check className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-center font-mono text-[10px] text-textMuted mt-4 uppercase">
              We reply within 24 hours · No spam · Ever.
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
