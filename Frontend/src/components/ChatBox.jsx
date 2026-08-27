import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiSend, FiX, FiMinimize2, FiMaximize2, FiCpu, FiAlertCircle } from 'react-icons/fi';

const ChatBox = ({ askQuestion, chatLoading, chatError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I\'ve analyzed this repository. Ask me anything!' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestions = [
    "What does this project do?",
    "Explain folder structure",
    "How can I improve this repo?"
  ];

  const handleSend = async (text = input) => {
    if (!text.trim() || chatLoading) return;

    const userMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const answer = await askQuestion(text);

    if (answer) {
      setMessages(prev => [...prev, { role: 'ai', text: answer }]);
    } else {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error. Please try again.' }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end border-green-500">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card mb-4 w-[380px] h-[500px] flex flex-col overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <FiCpu className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white">Ask RepoLens AI</h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 hover:bg-white/10 rounded-md text-slate-400 transition-colors"
                >
                  <FiMinimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-md text-slate-400 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  </div>
                </div>
              )}
              {chatError && (
                <div className="flex justify-center">
                  <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 px-3 py-2 rounded-lg border border-red-400/20">
                    <FiAlertCircle className="w-3 h-3" />
                    <span>{chatError}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-[11px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-2 py-1 rounded-full transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-4 border-t border-white/5 bg-black/20"
            >
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || chatLoading}
                  className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-lg transition-all"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`p-4 rounded-full shadow-2xl flex items-center gap-2 transition-all ${isOpen && !isMinimized
          ? 'bg-slate-800 text-slate-400 opacity-0 pointer-events-none'
          : 'bg-indigo-600 text-white'
          }`}
      >
        <FiMessageSquare className="w-6 h-6" />
        <span className="font-semibold px-1">Ask AI</span>
      </motion.button>
    </div>
  );
};

export default ChatBox;
