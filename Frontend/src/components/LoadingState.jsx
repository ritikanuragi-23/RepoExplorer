import { motion } from 'framer-motion';
import { FiCheckCircle, FiLoader } from 'react-icons/fi';

const STEPS = [
  { label: 'Connecting to GitHub API...', icon: '🔗' },
  { label: 'Fetching repository metadata...', icon: '📦' },
  { label: 'Reading README and file structure...', icon: '📄' },
  { label: 'Generating AI explanation with Gemini...', icon: '🤖' },
  { label: 'Analysis complete!', icon: '✅' },
];

const LoadingState = ({ currentStep }) => {
  return (
    <motion.div
      className="w-full max-w-xl mx-auto my-16 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8">
        {/* Animated spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-brand-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-brand-400 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
            {/* Ring pulse */}
            <div className="absolute inset-0 rounded-full border border-brand-500/30 animate-ping" />
          </div>
        </div>

        <h3 className="text-center text-slate-200 font-semibold text-lg mb-1">
          Analyzing Repository
        </h3>
        <p className="text-center text-slate-500 text-sm mb-8">
          This usually takes 5–15 seconds
        </p>

        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;
            const isPending = index > currentStep;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                  isActive
                    ? 'bg-brand-500/10 border border-brand-500/30'
                    : isDone
                    ? 'bg-accent-emerald/5 border border-accent-emerald/15'
                    : 'border border-transparent'
                }`}
              >
                <span className="text-lg leading-none">
                  {isDone ? '✅' : isActive ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="inline-block"
                    >
                      ⚙️
                    </motion.span>
                  ) : step.icon}
                </span>
                <span
                  className={`text-sm font-medium ${
                    isDone
                      ? 'text-accent-emerald'
                      : isActive
                      ? 'text-slate-200'
                      : 'text-slate-600'
                  }`}
                >
                  {step.label}
                </span>
                {isActive && (
                  <motion.div
                    className="ml-auto flex gap-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1 h-1 rounded-full bg-brand-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingState;
