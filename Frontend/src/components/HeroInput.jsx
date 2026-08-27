import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiSearch, FiArrowRight } from 'react-icons/fi';

const EXAMPLE_REPOS = [
  'https://github.com/facebook/react',
  'https://github.com/vercel/next.js',
  'https://github.com/microsoft/vscode',
  'https://github.com/tailwindlabs/tailwindcss',
];

const HeroInput = ({ onAnalyze, loading, error }) => {
  const [url, setUrl] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(url);
  };

  const handleExample = (repo) => {
    setUrl(repo);
    inputRef.current?.focus();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-cyan/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-medium mb-8"
        >
          <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
          Powered by Google Gemini AI
        </motion.div>
        
        {/* Main Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <img src="/logo.png" alt="RepoExplorer Official Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain shadow-2xl rounded-2xl" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-slate-100">AI GitHub</span>
          <br />
          <span className="animate-gradient">Project Explainer</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Understand any GitHub repository instantly using AI.
          Drop a URL and get a structured breakdown in seconds.
        </motion.p>

        {/* Input form */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={`flex gap-3 p-2 rounded-2xl border transition-all duration-300 ${
            focused
              ? 'border-brand-500/60 bg-dark-600/80 shadow-brand'
              : 'border-white/8 bg-dark-700/60'
          }`}>
            <div className="flex items-center pl-3 text-slate-500">
              <FiGithub size={20} />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="https://github.com/owner/repository"
              className="flex-1 bg-transparent py-3 px-2 text-slate-100 placeholder-slate-600 font-mono text-sm outline-none min-w-0"
              disabled={loading}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading || !url.trim()}
              className="btn-primary flex items-center gap-2 whitespace-nowrap text-sm"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <FiSearch size={15} />
                  Analyze Repository
                </>
              )}
            </motion.button>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-center gap-2 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 text-left"
              >
                <span className="text-rose-500">⚠</span>
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Example repos */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-slate-600 mb-3 uppercase tracking-widest">Try an example</p>
          <div className="flex flex-wrap justify-center gap-2">
            {EXAMPLE_REPOS.map((repo) => {
              const name = repo.replace('https://github.com/', '');
              return (
                <button
                  key={repo}
                  onClick={() => handleExample(repo)}
                  disabled={loading}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/8 bg-dark-600/50 text-slate-400 hover:text-slate-200 hover:border-brand-500/40 hover:bg-brand-500/10 transition-all duration-200 font-mono disabled:opacity-50"
                >
                  <FiArrowRight size={11} className="text-brand-400" />
                  {name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-8 sm:gap-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { label: 'AI-Powered', value: 'Gemini' },
            { label: 'GitHub API', value: 'v3 REST' },
            { label: 'Response Time', value: '< 10s' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-lg font-bold text-brand-400">{stat.value}</span>
              <span className="text-xs text-slate-600 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroInput;
