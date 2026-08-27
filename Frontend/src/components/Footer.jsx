import React from 'react';
import { FiGithub, FiTwitter, FiLink, FiCpu, FiLayout, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="relative z-10 pt-20 pb-10 border-t border-white/5 bg-dark-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <img src="/logo.png" alt="RepoExplorer" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-slate-100 tracking-tight text-xl">
                Repo<span className="text-brand-400">Explorer</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering developers to understand complex repositories instantly through the power of advanced Gemini AI analysis.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-brand-400 transition-colors">
                <FiGithub size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-brand-400 transition-colors">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-brand-400 transition-colors">
                <FiMail size={18} />
              </a>
            </div>
          </div>

          {/* Features Column */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Features</h4>
            <ul className="space-y-4">
              {[
                { label: 'Repo Analysis', icon: <FiCpu size={14} /> },
                { label: 'File Structure', icon: <FiLayout size={14} /> },
                { label: 'AI Chat', icon: <FiLink size={14} /> }
              ].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="text-brand-500/50 group-hover:text-brand-400">{link.icon}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Column */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Powered By</h4>
            <ul className="space-y-4">
              {[
                { label: 'Google Gemini AI', href: 'https://ai.google.dev/' },
                { label: 'GitHub REST API', href: 'https://docs.github.com/rest' },
                { label: 'React / Vite', href: 'https://vitejs.dev/' }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4 text-center">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} RepoExplorer · Built by Ritik
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
