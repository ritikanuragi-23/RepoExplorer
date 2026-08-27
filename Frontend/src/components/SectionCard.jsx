import { motion } from 'framer-motion';

const SectionCard = ({ icon, title, children, delay = 0, accentColor = 'brand' }) => {
  const colorMap = {
    brand: 'from-brand-500/20 to-transparent border-brand-500/20 text-brand-400',
    cyan: 'from-cyan-500/20 to-transparent border-cyan-500/20 text-cyan-400',
    emerald: 'from-emerald-500/20 to-transparent border-emerald-500/20 text-emerald-400',
    violet: 'from-violet-500/20 to-transparent border-violet-500/20 text-violet-400',
    amber: 'from-amber-500/20 to-transparent border-amber-500/20 text-amber-400',
    rose: 'from-rose-500/20 to-transparent border-rose-500/20 text-rose-400',
  };

  const colors = colorMap[accentColor] || colorMap.brand;
  const [gradFrom, , borderColor, textColor] = colors.split(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card overflow-hidden group hover:border-white/10 transition-all duration-300 h-full"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
    >
      {/* Top gradient bar */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${colors.split(' ').slice(0, 2).join(' ')}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0
              bg-gradient-to-br ${colors.split(' ').slice(0, 2).join(' ')} border ${borderColor}`}
          >
            {icon}
          </div>
          <h3 className={`font-semibold text-slate-200 text-sm uppercase tracking-wider`}>
            {title}
          </h3>
        </div>

        {/* Content */}
        <div className="text-slate-300 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default SectionCard;
