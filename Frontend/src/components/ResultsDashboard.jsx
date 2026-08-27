import { motion } from 'framer-motion';
import { FiStar, FiGitBranch, FiEye, FiAlertCircle, FiExternalLink, FiBook, FiCalendar } from 'react-icons/fi';
import SectionCard from './SectionCard';

const StatBadge = ({ icon, value, label }) => (
  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs">
    <span className="text-slate-400">{icon}</span>
    <span className="text-slate-200 font-semibold">{value?.toLocaleString() ?? '–'}</span>
    <span className="text-slate-600">{label}</span>
  </div>
);

const TagBadge = ({ text, color = 'brand' }) => {
  const colorMap = {
    brand: 'bg-brand-500/15 text-brand-300 border-brand-500/25',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    violet: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  };
  const colors = ['brand', 'cyan', 'emerald', 'violet', 'amber'];
  const idx = text.length % colors.length;
  const c = colorMap[colors[idx]] || colorMap.brand;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border font-mono ${c}`}>
      {text}
    </span>
  );
};

const BulletList = ({ items }) => (
  <ul className="space-y-2">
    {items?.map((item, i) => (
      <li key={i} className="flex items-start gap-2.5">
        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
        <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

const StepList = ({ steps }) => (
  <ol className="space-y-2.5">
    {steps?.map((step, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="w-5 h-5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
          {i + 1}
        </span>
        <span className="text-slate-300 text-sm leading-relaxed font-mono">{step}</span>
      </li>
    ))}
  </ol>
);

const ResultsDashboard = ({ repoInfo, aiAnalysis, onReset }) => {
  const {
    summary, technologies, folderStructure,
    keyFeatures, setup, audience, category,
  } = aiAnalysis;

  const updatedDate = repoInfo?.updatedAt
    ? new Date(repoInfo.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  return (
    <div className="w-full">
      {/* Repo Header */}
      <motion.div
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {category && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-mono border border-brand-500/25 uppercase tracking-wider">
                  {category}
                </span>
              )}
              {repoInfo?.language && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-mono border border-white/8">
                  {repoInfo.language}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mt-2 break-all">
              {repoInfo?.fullName || repoInfo?.name}
            </h2>
            {repoInfo?.description && (
              <p className="text-slate-400 text-sm mt-1.5 leading-relaxed max-w-2xl">
                {repoInfo.description}
              </p>
            )}
            {/* Topics */}
            {repoInfo?.topics?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {repoInfo.topics.map((t) => <TagBadge key={t} text={t} />)}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start sm:items-end">
            <a
              href={repoInfo?.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-brand-500/30 bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 transition-colors font-medium"
            >
              <FiExternalLink size={12} />
              View on GitHub
            </a>
            {updatedDate && (
              <span className="flex items-center gap-1 text-xs text-slate-600">
                <FiCalendar size={11} />
                Updated {updatedDate}
              </span>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
          <StatBadge icon={<FiStar size={12} />} value={repoInfo?.stars} label="stars" />
          <StatBadge icon={<FiGitBranch size={12} />} value={repoInfo?.forks} label="forks" />
          <StatBadge icon={<FiEye size={12} />} value={repoInfo?.watchers} label="watchers" />
          <StatBadge icon={<FiAlertCircle size={12} />} value={repoInfo?.openIssues} label="issues" />
          {repoInfo?.license && (
            <StatBadge icon={<FiBook size={12} />} value={repoInfo.license} label="" />
          )}
        </div>
      </motion.div>

      {/* AI Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Project Summary */}
        <SectionCard icon="📋" title="Project Summary" accentColor="brand" delay={0.05}>
          <p className="text-slate-300 leading-relaxed">{summary}</p>
        </SectionCard>

        {/* Technologies */}
        <SectionCard icon="⚡" title="Technologies Used" accentColor="cyan" delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {technologies?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </SectionCard>

        {/* Folder Structure */}
        <SectionCard icon="📁" title="Folder Structure Overview" accentColor="violet" delay={0.15}>
          <p className="text-slate-300 leading-relaxed">{folderStructure}</p>
        </SectionCard>

        {/* Key Features */}
        <SectionCard icon="🚀" title="Key Features" accentColor="emerald" delay={0.2}>
          <BulletList items={keyFeatures} />
        </SectionCard>

        {/* Setup Instructions */}
        <SectionCard icon="⚙️" title="Setup Instructions" accentColor="amber" delay={0.25}>
          <StepList steps={setup} />
        </SectionCard>

        {/* Audience */}
        <SectionCard icon="👥" title="Who Benefits" accentColor="rose" delay={0.3}>
          <p className="text-slate-300 leading-relaxed">{audience}</p>
        </SectionCard>
      </div>

      {/* Reset button */}
      <motion.div
        className="flex justify-center mt-10 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-slate-200 hover:border-brand-500/30 hover:bg-brand-500/10 transition-all duration-200"
        >
          ← Analyze another repository
        </button>
      </motion.div>
    </div>
  );
};

export default ResultsDashboard;
