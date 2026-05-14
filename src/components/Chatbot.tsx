"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* â”€â”€ Types â”€â”€ */
interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  actions?: QuickAction[];
}

interface QuickAction {
  label: string;
  value: string;
}

/* â”€â”€ Knowledge Base â”€â”€ */
const KNOWLEDGE = {
  about: {
    keywords: ["about", "who", "what is grovegrid", "company", "grovegrid", "tell me about", "what do you do", "introduce"],
    response: `**grovegrid** is a premium tech studio founded in **May 2026** by two 3rd-year CSE students from SUST, Sylhet, Bangladesh.\n\nWe architect **brutalist digital experiences** and **automated backend systems** for the next generation of Bangladeshi industries â€” from schools to e-commerce.\n\nOur motto: **"We Build the Web. We Automate the Rest."**`,
  },
  services: {
    keywords: ["service", "services", "what do you build", "offer", "capabilities", "build", "develop"],
    response: `We specialize in **6 core service areas**:\n\n“ **School Systems** ” LMS, attendance, result portals\n“ **Newspaper Portals** ” SEO-optimized news platforms\n“ **Pharma Management** ” Inventory & POS for pharmacies\n“ **Coaching Portals** ” Online exams, payments, CRM\n“ **E-commerce Stores** ” Professional stores with payment gateways\n“ **Corporate Identity** ” Premium brand websites\n\nWant to see more? I can take you to the **Services** section.`,
    actions: [{ label: "â†’ View Services", value: "navigate:services" }],
  },
  process: {
    keywords: ["process", "how do you work", "methodology", "workflow", "how it works", "steps", "approach"],
    response: `Our **4-step methodology** ensures flawless delivery:\n\n“ **01 ** ” Discovery ” We strip your idea down to the studs, identify bottlenecks, and set brutal goals.\n\n“ **02 ** ” Scope & Plan ” Architectural blueprinting â€” data structures, tech stack, API endpoints.\n\n“ **03 ** ” Build & Review ” Aggressive iteration cycles with continuous collaboration.\n\n“ **04 ** ” Launch & Scale ” Production deployment with automated scaling.`,
    actions: [{ label: "â†’ See Our Process", value: "navigate:how" }],
  },
  team: {
    keywords: ["team", "founder", "who runs", "leadership", "ridoy", "priom", "ceo", "coo", "members"],
    response: `**The minds behind grovegrid:**\n\nðŸ‘¤ **Ridoy Baidya** â€” *Founder & CEO*\nFull-Stack Web Developer from Sylhet. 3rd Year CSE @ SUST. Specializes in building robust and scalable web applications.\n\nðŸ‘¤ **Priom Chakraborty** â€” *Founder & COO*\nPassionate developer and strategic thinker. Drives operational excellence and product strategy at grovegrid.`,
    actions: [{ label: "â†’ Meet the Team", value: "navigate:team" }],
  },
  contact: {
    keywords: ["contact", "reach", "email", "hire", "start a project", "get started", "work with", "connect", "message"],
    response: `Ready to launch your project? Here's how to reach us:\n\nðŸ“© **Fill out the contact form** on our site â€” we reply within **24 hours**.\n\nYou can select your primary need:\nâ€¢ Web Development\nâ€¢ Workflow Automation\nâ€¢ API Integration\nâ€¢ Cloud / DevOps\nâ€¢ Data Analytics\nâ€¢ AI Integration\n\nLet me take you there!`,
    actions: [{ label: "â†’ Start a Project", value: "navigate:contact" }],
  },
  results: {
    keywords: ["results", "stats", "numbers", "projects", "how many", "track record", "speed", "portfolio"],
    response: `Here's our track record so far:\n\nðŸš€ **50+** Projects Shipped\nâš¡ **<48h** Prototype Time\nðŸ”¥ **10x** Execution Speed\nðŸ’¯ **100%** TypeScript\n\nWe move fast and ship quality.`,
    actions: [{ label: "â†’ See Results", value: "navigate:stats" }],
  },
  testimonials: {
    keywords: ["testimonial", "review", "client", "feedback", "what clients say", "proof", "customers"],
    response: `Our clients love what we build:\n\nâ­ *"grovegrid automated our entire lead qualification pipeline. We reduced manual overhead by 80%."*\nâ€” **Marcus Reed**, Founder, NovaFlow\n\nâ­ *"The UI is incredibly sharp, and the backend is rock solid."*\nâ€” **Sarah Lin**, CTO, DataSyndicate\n\nâ­ *"They integrated OpenAI into our portal in under two weeks. Pure technical execution."*\nâ€” **James Vance**, VP Engineering, Aethos`,
    actions: [{ label: "â†’ Read Reviews", value: "navigate:testimonials" }],
  },
  pricing: {
    keywords: ["price", "pricing", "cost", "how much", "budget", "quote", "rate", "charge"],
    response: `We tailor pricing to each project's scope and complexity. There's no one-size-fits-all.\n\n**To get a custom quote:**\n1. Fill out the contact form with your project brief\n2. We'll schedule a discovery call\n3. You'll receive a detailed proposal within 48 hours\n\nNo hidden fees. No surprises.`,
    actions: [{ label: "â†’ Get a Quote", value: "navigate:contact" }],
  },
  tech: {
    keywords: ["tech", "technology", "stack", "tools", "framework", "next.js", "react", "typescript", "tailwind"],
    response: `Our **tech stack** is built for speed and scale:\n\n**Frontend:** Next.js, React, Tailwind CSS, Framer Motion\n**Backend:** Node.js, REST APIs, GraphQL\n**DevOps:** Docker, AWS / GCP, CI/CD\n**Automation:** Zapier, Make.com\n**Language:** 100% TypeScript\n\nWe use the same modern tools that power top-tier startups worldwide.`,
  },
  navigation: {
    keywords: ["navigate", "go to", "take me", "show me", "where is", "find", "section"],
    response: `I can take you to any section of our site! Which one interests you?`,
    actions: [
      { label: "Services", value: "navigate:services" },
      { label: "Process", value: "navigate:how" },
      { label: "Results", value: "navigate:stats" },
      { label: "Clients", value: "navigate:testimonials" },
      { label: "Team", value: "navigate:team" },
      { label: "Contact", value: "navigate:contact" },
    ],
  },
};

const GREETING: Message = {
  id: "greeting",
  role: "bot",
  text: `Hey there! ‘‹ I'm **GroveBot**, your guide to everything grovegrid.\n\nI can help you with:\n Learn about our **services & process**\n Meet the **team**\n Navigate to any **section**\n Get a **project quote**\n\nWhat would you like to know?`,
  actions: [
    { label: "About Us", value: "about" },
    { label: "Services", value: "services" },
    { label: "Meet the Team", value: "team" },
    { label: "Start a Project", value: "contact" },
  ],
};

const FALLBACK_RESPONSES = [
  `Hmm, I'm not sure about that one. But I can tell you about our **services**, **team**, **process**, or help you **start a project**! What interests you?`,
  `I don't have info on that specifically, but I'm an expert on all things grovegrid! Try asking about our **capabilities**, **pricing**, or **tech stack**.`,
  `That's a great question! Unfortunately it's outside my knowledge. I can help with anything about **grovegrid** our services, team, process, or getting in touch.`,
];

/* â”€â”€ Intent Matching â”€â”€ */
function matchIntent(input: string): { response: string; actions?: QuickAction[] } | null {
  const lower = input.toLowerCase().trim();

  for (const [, entry] of Object.entries(KNOWLEDGE)) {
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        return { response: entry.response, actions: (entry as { actions?: QuickAction[] }).actions };
      }
    }
  }
  return null;
}

/* â”€â”€ Simple Markdown Renderer â”€â”€ */
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
}

/* â”€â”€ Chatbot Component â”€â”€ */
export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setMessages([GREETING]);
      setInput("");
      setIsTyping(false);
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Show unread indicator after 5 seconds if chat hasn't been opened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setHasUnread(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setIsOpen(false), 600);
    }
  }, []);

  const addBotMessage = useCallback((text: string, actions?: QuickAction[]) => {
    setIsTyping(true);
    const delay = Math.min(text.length * 8, 1500);
    setTimeout(() => {
      setIsTyping(false);
      const msg: Message = {
        id: Date.now().toString(),
        role: "bot",
        text,
        actions,
      };
      setMessages((prev) => [...prev, msg]);
      if (!isOpen) setHasUnread(true);
    }, delay);
  }, [isOpen]);

  const handleSend = useCallback((text?: string) => {
    const content = (text || input).trim();
    if (!content) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Match intent
    const match = matchIntent(content);
    if (match) {
      addBotMessage(match.response, match.actions);
    } else {
      const fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
      addBotMessage(fallback, [
        { label: "About Us", value: "about" },
        { label: "Services", value: "services" },
        { label: "Contact", value: "contact" },
      ]);
    }
  }, [input, addBotMessage]);

  const handleActionClick = useCallback((value: string) => {
    if (value.startsWith("navigate:")) {
      const sectionId = value.replace("navigate:", "");
      handleNavigate(sectionId);
    } else {
      handleSend(value);
    }
  }, [handleNavigate, handleSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* â”€â”€ FAB Button â”€â”€ */}
      <motion.button
        onClick={() => {
          if (isOpen) {
            setMessages([GREETING]);
            setInput("");
            setIsTyping(false);
          }
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[200] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-default text-bg flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chatbot"
        id="chatbot-toggle"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
          >
            1
          </motion.div>
        )}
      </motion.button>

      {/* â”€â”€ Chat Panel â”€â”€ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-[4.5rem] right-3 sm:bottom-24 sm:right-6 z-[199] w-[300px] sm:w-[380px] max-w-[calc(100vw-1.5rem)] h-[60vh] sm:h-[520px] max-h-[calc(100vh-6rem)] flex flex-col bg-bg border border-borderCol rounded-lg shadow-[0_0_60px_rgba(34,211,238,0.08)] overflow-hidden"
            id="chatbot-panel"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-borderCol bg-panel/80 backdrop-blur-sm shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-cyan-default/15 border border-cyan-default/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-default" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-panel" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-syne font-bold text-sm text-textMain">GroveBot</h3>
                <p className="font-mono text-[10px] text-green-400 uppercase tracking-widest">Online</p>
              </div>
              <button
                onClick={() => {
                  setMessages([GREETING]);
                  setInput("");
                  setIsTyping(false);
                  setIsOpen(false);
                }}
                className="text-textMuted hover:text-cyan-default transition-colors p-1"
                aria-label="Minimize chat"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-cyan-default/15 border border-cyan-default/25 text-textMain"
                        : "bg-panel border border-borderCol text-textMain"
                    } rounded-lg px-4 py-3`}
                  >
                    <div
                      className="text-[13px] leading-relaxed font-inter"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                    />

                    {/* Quick Actions */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-borderCol/50">
                        {msg.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(action.value)}
                            className="px-3 py-1.5 bg-bg border border-cyan-default/30 text-cyan-default font-mono text-[10px] uppercase tracking-wider hover:bg-cyan-default/10 hover:border-cyan-default transition-all rounded"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-panel border border-borderCol rounded-lg px-4 py-3 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-cyan-default/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-cyan-default/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-cyan-default/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 border-t border-borderCol bg-panel/50 shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-bg border border-borderCol focus:border-cyan-default text-textMain px-4 py-2.5 outline-none transition-colors font-mono text-xs rounded placeholder:text-textMuted/50"
                  id="chatbot-input"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-cyan-default text-bg flex items-center justify-center rounded hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                  aria-label="Send message"
                  id="chatbot-send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="font-mono text-[9px] text-textMuted/50 text-center mt-2 uppercase tracking-wider">
                Powered by grovegrid
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
