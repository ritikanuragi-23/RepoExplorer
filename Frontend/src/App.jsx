import './index.css';
import { AnimatePresence, motion } from 'framer-motion';
import HeroInput from './components/HeroInput';
import LoadingState from './components/LoadingState';
import ResultsDashboard from './components/ResultsDashboard';
import FileTree from './components/FileTree';
import ChatBox from './components/ChatBox';
import DemoShowcase from './components/DemoShowcase';
import Footer from './components/Footer';
import useRepoAnalysis from './hooks/useRepoAnalysis';
import OrbitalBackground from './components/OrbitalBackground';

function App() {
  const {
    analyze,
    askChatQuestion,
    loading,
    error,
    repoData,
    loadingStep,
    chatLoading,
    chatError,
    reset
  } = useRepoAnalysis();

  const showResults = repoData && !loading;

  return (
    <div className="min-h-screen bg-dark-900 relative">
      <OrbitalBackground />

      {/* Top Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-dark-900/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="RepoExplorer Logo" className="w-8 h-8 rounded-lg object-contain" />
          <span className="font-bold text-slate-100 tracking-tight">
            Repo<span className="text-brand-400">Explorer</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          {showResults && (
            <button
              onClick={reset}
              className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-slate-200 hover:border-brand-500/30 transition-all"
            >
              ← New analysis
            </button>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {!showResults && !loading && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <HeroInput onAnalyze={analyze} loading={loading} error={error} />
              <DemoShowcase />
              <Footer />
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center px-4"
            >
              <LoadingState currentStep={loadingStep} />
            </motion.div>
          )}

          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8"
            >
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">
                {/* Left: AI Results */}
                <ResultsDashboard
                  repoInfo={repoData.repoInfo}
                  aiAnalysis={repoData.aiAnalysis}
                  onReset={reset}
                />
                {/* Right: File Tree */}
                <div className="xl:sticky xl:top-24">
                  <FileTree fileTree={repoData.fileTree} />
                </div>
              </div>
              <ChatBox
                askQuestion={askChatQuestion}
                chatLoading={chatLoading}
                chatError={chatError}
              />
              <div className="mt-20">
                <Footer />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
