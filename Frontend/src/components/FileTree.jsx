import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFolder, FiFile, FiChevronRight } from 'react-icons/fi';

const getFileIcon = (path) => {
  const ext = path.split('.').pop()?.toLowerCase();
  const icons = {
    js: '🟨', jsx: '⚛️', ts: '🔷', tsx: '⚛️',
    json: '📋', md: '📝', css: '🎨', html: '🌐',
    py: '🐍', java: '☕', rb: '💎', go: '🐹',
    rs: '🦀', cpp: '⚙️', c: '⚙️', sh: '📜',
    yml: '⚙️', yaml: '⚙️', env: '🔐', gitignore: '🚫',
    dockerfile: '🐳', lock: '🔒',
  };
  return icons[ext] || '📄';
};

// Build a nested tree from flat paths
const buildTree = (items) => {
  const root = {};

  items.forEach(({ path, type }) => {
    const parts = path.split('/');
    let current = root;
    parts.forEach((part, idx) => {
      if (!current[part]) {
        current[part] = {
          __type: idx === parts.length - 1 ? type : 'tree',
          __children: {},
        };
      }
      current = current[part].__children;
    });
  });

  return root;
};

const TreeNode = ({ name, node, depth = 0 }) => {
  const [open, setOpen] = useState(depth < 2);
  const isDir = node.__type === 'tree';
  const hasChildren = Object.keys(node.__children).length > 0;
  const children = Object.entries(node.__children).sort(([, a], [, b]) => {
    if (a.__type === 'tree' && b.__type !== 'tree') return -1;
    if (a.__type !== 'tree' && b.__type === 'tree') return 1;
    return 0;
  });

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-0.5 px-2 rounded-md text-xs font-mono cursor-pointer
          hover:bg-white/5 transition-colors group ${isDir ? 'text-slate-300' : 'text-slate-500 hover:text-slate-400'}`}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
        onClick={() => isDir && hasChildren && setOpen(!open)}
      >
        {isDir && hasChildren && (
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.15 }}
            className="text-slate-600 group-hover:text-brand-400 transition-colors"
          >
            <FiChevronRight size={10} />
          </motion.span>
        )}
        {!isDir || !hasChildren ? <span className="w-2.5" /> : null}

        {isDir ? (
          open && hasChildren ? (
            <FiFolder size={13} className="text-brand-400 flex-shrink-0" />
          ) : (
            <FiFolder size={13} className="text-brand-600 flex-shrink-0" />
          )
        ) : (
          <span className="text-xs leading-none">{getFileIcon(name)}</span>
        )}

        <span className={isDir ? 'text-slate-300 font-medium' : ''}>{name}</span>
      </div>

      <AnimatePresence initial={false}>
        {isDir && open && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children.map(([childName, childNode]) => (
              <TreeNode key={childName} name={childName} node={childNode} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FileTree = ({ fileTree }) => {
  if (!fileTree || fileTree.length === 0) return null;

  const tree = buildTree(fileTree);
  const entries = Object.entries(tree).sort(([, a], [, b]) => {
    if (a.__type === 'tree' && b.__type !== 'tree') return -1;
    if (a.__type !== 'tree' && b.__type === 'tree') return 1;
    return 0;
  });

  return (
    <motion.div
      className="glass-card overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-brand-500/30 via-accent-cyan/20 to-transparent" />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🗂️</span>
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Repository Structure
          </h3>
          <span className="ml-auto text-xs text-slate-600 font-mono">{fileTree.length} items</span>
        </div>

        {/* Mac-style window dots */}
        <div className="flex items-center gap-1.5 mb-4 px-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/70" />
          <span className="w-3 h-3 rounded-full bg-amber-500/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-xs text-slate-600 font-mono">project-root/</span>
        </div>

        {/* Tree */}
        <div className="overflow-y-auto max-h-[480px] pr-1">
          {entries.map(([name, node]) => (
            <TreeNode key={name} name={name} node={node} depth={0} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FileTree;
