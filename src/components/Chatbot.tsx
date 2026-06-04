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
    response: `**grovegrid** is a premium tech studio founded by developers from SUST, Sylhet, Bangladesh.\n\nWe architect **brutalist digital experiences** and **automated backend systems** for the next generation of industries. We transform raw potential into technical dominance.\n\nOur motto: **"Where growth meets structure."**`,
  },
  services: {
    keywords: ["service", "services", "what do you build", "offer", "capabilities", "build", "develop"],
    response: `We specialize in **6 core service areas**:\n\n“ **School Systems** ” Digitalization of results, attendance & student tracking.\n“ **Newspaper Portals** ” Ultra-fast digital news platforms optimized for mobile.\n“ **Pharma Management** ” Intelligent inventory & POS for local pharmacies.\n“ **Coaching Portals** ” Online exams, payments, CRM.\n“ **E-commerce Stores** ” Professional stores with payment gateway integrations.\n“ **Corporate Identity** ” Custom high-end websites for premium brand presence.\n\nWant to see more? I can take you to the **Services** section.`,
    actions: [{ label: "â†’ View Services", value: "navigate:services" }],
  },
  process: {
    keywords: ["process", "how do you work", "methodology", "workflow", "how it works", "steps", "approach"],
    response: `Our **4-step methodology** ensures flawless delivery:\n\n“ **01 ** ” Discovery ” We analyze your requirements and identify bottlenecks.\n\n“ **02 ** ” Scope & Plan ” Architectural blueprinting â€” data structures and tech stack.\n\n“ **03 ** ” Build & Review ” Aggressive iteration cycles with continuous collaboration.\n\n“ **04 ** ” Launch & Scale ” Production deployment with automated scaling.`,
    actions: [{ label: "â†’ See Our Process", value: "navigate:how" }],
  },
  contact: {
    keywords: ["contact", "reach", "email", "hire", "start a project", "get started", "work with", "connect", "message"],
    response: `Ready to launch your project? Here's how to reach us:\n\nðŸ“© **Fill out the contact form** on our site â€” we reply within **24 hours**.\n\nYou can select your primary need:\nâ€¢ Web Development\nâ€¢ Workflow Automation\nâ€¢ API Integration\nâ€¢ Cloud / DevOps\n\nLet me take you there!`,
    actions: [{ label: "â†’ Start a Project", value: "navigate:contact" }],
  },
  location: {
    keywords: ["location", "where", "office", "address", "city", "country", "based"],
    response: `We are based in **Sylhet, Bangladesh** ðŸ‡§ðŸ‡©, proudly founded by developers from Shahjalal University of Science and Technology (SUST). \n\nHowever, we work with clients globally to architect premium digital experiences!`,
  },
  results: {
    keywords: ["results", "stats", "numbers", "projects", "how many", "track record", "speed", "portfolio"],
    response: `Here's our track record so far:\n\nðŸš€ **50+** Projects Shipped\nâš¡ **<48h** Prototype Time\nðŸ”¥ **10x** Execution Speed\nðŸ’¯ **100%** TypeScript\n\nWe move fast and ship quality.`,
    actions: [{ label: "â†’ See Results", value: "navigate:stats" }],
  },
  pricing: {
    keywords: ["price", "pricing", "cost", "how much", "budget", "quote", "rate", "charge"],
    response: `We tailor pricing to each project's scope and complexity. There's no one-size-fits-all.\n\n**To get a custom quote:**\n1. Fill out the contact form with your project brief\n2. We'll schedule a discovery call\n3. You'll receive a detailed proposal within 48 hours\n\nNo hidden fees. No surprises.`,
    actions: [{ label: "â†’ Get a Quote", value: "navigate:contact" }],
  },
  tech: {
    keywords: ["tech", "technology", "stack", "tools", "framework", "next.js", "react", "typescript", "tailwind"],
    response: `Our **tech stack** is built for speed and scale:\n\n**Frontend:** Next.js, React, Tailwind CSS, Framer Motion\n**Backend:** Node.js, REST APIs, GraphQL\n**DevOps:** Docker, AWS / GCP, CI/CD\n**Language:** 100% TypeScript\n\nWe use the same modern tools that power top-tier startups worldwide.`,
  },
  navigation: {
    keywords: ["navigate", "go to", "take me", "show me", "where is", "find", "section"],
    response: `I can take you to any section of our site! Which one interests you?`,
    actions: [
      { label: "Services", value: "navigate:services" },
      { label: "Process", value: "navigate:how" },
      { label: "Results", value: "navigate:stats" },
      { label: "Clients", value: "navigate:testimonials" },
      { label: "Contact", value: "navigate:contact" },
    ],
  },
};

const GREETING: Message = {
  id: "greeting",
  role: "bot",
  text: `Hey there! ‘‹ I'm **GroveBot**, your guide to everything grovegrid.\n\nI can help you with:\n Learn about our **services & process**\n Explore our **location & tech stack**\n Navigate to any **section**\n Get a **project quote**\n\nWhat would you like to know?`,
  actions: [
    { label: "About Us", value: "about" },
    { label: "Services", value: "services" },
    { label: "Location", value: "location" },
    { label: "Start a Project", value: "contact" },
  ],
};

const FALLBACK_RESPONSES = [
  `Hmm, I'm not sure about that one. But I can tell you about our **services**, **location**, or help you **start a project**! What interests you?`,
  `I don't have info on that specifically, but I'm an expert on all things grovegrid! Try asking about our **capabilities**, **location**, or **tech stack**.`,
  `That's a great question! Unfortunately it's outside my knowledge. I can help with anything about **grovegrid** — our services, process, or getting in touch.`,
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
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[200] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-cyan-dim to-purple-accent text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(5,150,105,0.6)] transition-shadow"
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
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg"
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
            className="fixed bottom-[4.5rem] right-3 sm:bottom-24 sm:right-6 z-[199] w-[300px] sm:w-[380px] max-w-[calc(100vw-1.5rem)] h-[60vh] sm:h-[520px] max-h-[calc(100vh-6rem)] flex flex-col bg-[#050505]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden"
            id="chatbot-panel"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-default/20 to-purple-accent/20 border border-white/20 flex items-center justify-center shadow-inner">
                  <Sparkles className="w-5 h-5 text-cyan-default" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0B0C10]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-syne font-bold text-sm text-white">GroveBot</h3>
                <p className="font-mono text-[10px] text-green-400 uppercase tracking-widest">Online</p>
              </div>
              <button
                onClick={() => {
                  setMessages([GREETING]);
                  setInput("");
                  setIsTyping(false);
                  setIsOpen(false);
                }}
                className="text-textMuted hover:text-white transition-colors p-1"
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
                        ? "bg-gradient-to-br from-cyan-default/20 to-purple-accent/20 border border-white/10 text-white backdrop-blur-sm"
                        : "bg-white/5 border border-white/10 text-white backdrop-blur-sm"
                    } rounded-2xl px-4 py-3 shadow-lg`}
                  >
                    <div
                      className="text-[13px] leading-relaxed font-inter"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                    />

                    {/* Quick Actions */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
                        {msg.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(action.value)}
                            className="px-3 py-1.5 bg-white/5 border border-white/20 text-cyan-default font-mono text-[10px] uppercase tracking-wider hover:bg-white/10 hover:border-cyan-default hover:text-white transition-all rounded-lg"
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
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-1.5 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-cyan-default/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-purple-accent/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-cyan-default/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 border-t border-white/10 bg-black/20 backdrop-blur-md shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-default/50 text-white px-4 py-2.5 outline-none transition-colors font-mono text-xs rounded-xl placeholder:text-white/30"
                  id="chatbot-input"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-cyan-dim to-purple-accent text-white flex items-center justify-center rounded-xl hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                  aria-label="Send message"
                  id="chatbot-send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="font-mono text-[9px] text-white/30 text-center mt-2 uppercase tracking-wider">
                Powered by grovegrid
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
