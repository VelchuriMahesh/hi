import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// --- Updated Shrusara Knowledge Base ---
const SHRUSARA_DATA = {
  welcome: "Namaste! I'm your Shrusara Assistant. Our founder & chief designer Shruthi Ajith specializes in customized bridal and designer wear. How can we help you look your best today?",
  founder: "Shruthi Ajith is the founder and chief designer at Shrusara. With deep expertise in fashion design, she personally works with every client to understand their body type and style preferences. From first sketch to final fitting, she ensures every outfit has a premium finish.",
  services: "We specialize in: \n✦ Bridal Blouses (Maggam & Aari)\n✦ Customized Gowns & Lehengas\n✦ Indo-Western Sets\n✦ Kids Festive Wear\n\nEvery piece is personally guided by Shruthi Ajith.",
  process: "Our Boutique Flow: \n1. Consultation with Shruthi Ajith \n2. Design & Fabric Selection \n3. Personal Fitting & Trials.",
  location: "📍 Shrusara Fashion Boutique\n106, 6th Main Road, Mahalakshmipuram,\nBangalore - 560086.",
  contact: "📞 Phone: 9741827558\n✉️ Email: help@shrusara.com",
  maps: "https://www.google.com/maps/search/?api=1&query=Shrusara%20Fashion%20Boutique%2C%20106%2C%206th%20Main%20Road%2C%20Mahalakshmipuram%2C%20Bangalore%20-%20560086",
};

const FashionLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-stone-300">
    <path d="M12 2L12 18M12 18C10 18 8 16 8 14C8 12 12 8 12 8C12 8 16 12 16 14C16 16 14 18 12 18Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 4C4 6 3 10 4 14C5 18 9 21 12 21C15 21 19 18 20 14C21 10 20 6 17 4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2"/>
    <circle cx="12" cy="18" r="1" fill="currentColor"/>
  </svg>
);

export default function ShrusaraAssistantPro() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: SHRUSARA_DATA.welcome }
  ]);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (userInput) => {
    const text = userInput || input;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "That sounds lovely! Shruthi Ajith can guide you personally on this. Would you like to book a consultation?";
      const lowerText = text.toLowerCase();

      if (lowerText.includes('bridal') || lowerText.includes('blouse') || lowerText.includes('maggam')) {
        reply = "Shrusara is famous for Bridal Blouses. Shruthi Ajith personally supervises all Maggam and Aari work to ensure perfect detailing.";
      } else if (lowerText.includes('who') || lowerText.includes('founder') || lowerText.includes('designer') || lowerText.includes('shruthi')) {
        reply = SHRUSARA_DATA.founder;
      } else if (lowerText.includes('location') || lowerText.includes('where') || lowerText.includes('address')) {
        reply = `${SHRUSARA_DATA.location}\n\nWould you like to view it on Google Maps?`;
      } else if (lowerText.includes('map') || lowerText.includes('direction')) {
        reply = `You can find our boutique here: ${SHRUSARA_DATA.maps}`;
      } else if (lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('email')) {
        reply = `${SHRUSARA_DATA.contact}\n\nYou can also visit us at Mahalakshmipuram.`;
      } else if (lowerText.includes('kids')) {
        reply = "For kids, we design comfort-first festive outfits. Shruthi ensures the fabrics are skin-friendly while looking grand.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="mb-4 flex h-[600px] w-[380px] max-w-[90vw] flex-col overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-stone-800 p-2 border border-stone-700">
                    <FashionLogo />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-stone-200">Shrusara</h3>
                    <p className="text-[10px] text-stone-500">By Designer Shruthi Ajith</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-stone-500 hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#fdfcfb] p-6 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
                    msg.role === 'user' ? 'bg-stone-900 text-white rounded-tr-none' : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
                  }`}>
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>{line}<br/></span>
                    ))}
                    {msg.text.includes('Google Maps') && (
                      <a href={SHRUSARA_DATA.maps} target="_blank" rel="noreferrer" className="mt-2 inline-block text-amber-600 font-bold underline">Open Maps →</a>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-[#fdfcfb]">
              {['Bridal Work', 'About the Designer', 'Location', 'Contact Details'].map((label) => (
                <button
                  key={label}
                  onClick={() => handleSend(label)}
                  className="whitespace-nowrap rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] text-stone-600 hover:bg-stone-900 hover:text-white transition-all"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="border-t border-stone-100 p-4 bg-white">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Shruthi about your design..."
                  className="w-full rounded-full border border-stone-200 bg-stone-50 py-3 pl-5 pr-12 text-sm focus:border-stone-400 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 h-9 w-9 flex items-center justify-center rounded-full bg-stone-900 text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </form>
              <p className="mt-3 text-center text-[9px] uppercase tracking-widest text-stone-400 font-bold">
                Mahalakshmipuram • Bangalore
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-900 text-white shadow-xl"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="c" initial={{ rotate: -90 }} animate={{ rotate: 0 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></motion.svg>
          ) : (
            <motion.div key="i" initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative">
              <FashionLogo />
              <span className="absolute -right-2 -top-2 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-stone-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 bg-white border border-stone-100 rounded-2xl px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          className="h-1.5 w-1.5 rounded-full bg-stone-400"
        />
      ))}
    </div>
  );
}