import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiZap, FiLayout, FiMessageSquare, FiList } from 'react-icons/fi';

const DemoShowcase = () => {
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See it in <span className="animate-gradient">Action</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience how RepoExplorer transforms raw GitHub data into structured, actionable insights in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Animated Feature List */}
          <div className="space-y-6">
            {[
              { 
                icon: <FiZap className="text-brand-400" />, 
                title: "Instant Analysis", 
                desc: "Deep-dive into any repository with a single URL." 
              },
              { 
                icon: <FiLayout className="text-accent-cyan" />, 
                title: "Structured Interface", 
                desc: "Clean, developer-focused dashboard for easy reading." 
              },
              { 
                icon: <FiList className="text-accent-emerald" />, 
                title: "File Tree Exploration", 
                desc: "Navigate complex folder structures with ease." 
              },
              { 
                icon: <FiMessageSquare className="text-brand-300" />, 
                title: "AI Chat Assistant", 
                desc: "Ask specific questions about the codebase directly." 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="mt-1 p-2 rounded-lg bg-dark-600 border border-white/5">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Mock UI Animation */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square sm:aspect-video lg:aspect-square bg-dark-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden group"
            >
              {/* Mock Nav */}
              <div className="h-8 border-b border-white/5 bg-dark-700/50 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </div>
                <div className="ml-4 h-4 w-32 bg-white/5 rounded" />
              </div>

              {/* Mock Content */}
              <div className="p-4 grid grid-cols-3 gap-3 h-full">
                {/* File Tree Mock */}
                <div className="space-y-2 border-r border-white/5 pr-4">
                  {[40, 60, 30, 80, 50].map((w, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      style={{ width: `${w}%` }}
                      className="h-2 bg-white/5 rounded"
                    />
                  ))}
                </div>

                {/* Analysis Cards Mock */}
                <div className="col-span-2 space-y-4 pt-2">
                  {[1, 2].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + (i * 0.3), duration: 0.8 }}
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.03] space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-brand-500/30" />
                        <div className="h-3 w-24 bg-white/10 rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-white/5 rounded" />
                        <div className="h-2 w-4/5 bg-white/5 rounded" />
                        <div className="h-2 w-3/4 bg-white/5 rounded" />
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Animation Mock */}
                  <motion.div 
                    className="flex items-center gap-2 mt-4 ml-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="text-xs text-brand-400/60 ml-2 font-mono">Analyzing codebase...</span>
                  </motion.div>
                </div>
              </div>

              {/* Float code icons over the mock */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5"
              >
                <FiCode size={200} />
              </motion.div>
            </motion.div>

            {/* Decorative background glow for mock */}
            <div className="absolute -inset-4 bg-brand-500/10 blur-2xl rounded-3xl -z-10 group-hover:bg-brand-500/20 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoShowcase;
