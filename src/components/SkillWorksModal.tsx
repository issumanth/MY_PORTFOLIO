import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Image as ImageIcon, Video, Code2, Sparkles, FolderOpen } from 'lucide-react';
import { SkillItem, SkillWorkItem } from '../data/portfolioData';
import { MediaViewerState } from './MediaViewerModal';

interface SkillWorksModalProps {
  skill: SkillItem | null;
  onClose: () => void;
  onOpenMedia: (media: MediaViewerState) => void;
}

export const SkillWorksModal: React.FC<SkillWorksModalProps> = ({ skill, onClose, onOpenMedia }) => {
  if (!skill) return null;

  const items: SkillWorkItem[] = skill.items || [];

  return (
    <AnimatePresence>
      <div
        id="skill-works-modal-backdrop"
        className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="skill-works-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-[#02131b] border border-teal-600/60 shadow-2xl shadow-teal-950/80 overflow-hidden text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-teal-900/50 bg-[#04202d]">
            <div className="flex items-center gap-3.5">
              <span className="text-3xl p-2 rounded-2xl bg-teal-950/80 border border-teal-800/60 select-none">
                {skill.emoji}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-mono tracking-wider text-teal-300 px-2 py-0.5 rounded-full bg-teal-950 border border-teal-800">
                    {skill.category || 'Skill Works'}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {items.length} {items.length === 1 ? 'project' : 'projects / works'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Things I Did in {skill.name}
                </h3>
              </div>
            </div>

            <button
              id="skill-works-close-btn"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-teal-950/80 hover:bg-teal-900 text-gray-300 hover:text-white border border-teal-800/60 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subtitle / summary */}
          <div className="px-6 py-3.5 bg-[#010e14] border-b border-teal-950/70 text-xs sm:text-sm text-gray-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Overall: {skill.worksDone}</span>
            </span>
            <span className="text-cyan-300 font-bold font-mono">{skill.percentage}% Mastery</span>
          </div>

          {/* List of Things Done */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <FolderOpen className="w-12 h-12 mx-auto text-teal-900/60 mb-3" />
                <p className="text-base text-gray-300 font-medium">No work items entered yet.</p>
                <p className="text-xs text-gray-500 mt-1">
                  Add things you did in <code className="text-cyan-300 font-mono">src/data/portfolioData.ts</code> in the code!
                </p>
              </div>
            ) : (
              items.map((item, index) => {
                const hasCode = Boolean(item.codeUrl && item.codeUrl.trim());
                const hasPdf = Boolean(item.pdfUrl && item.pdfUrl.trim());
                const hasPic = Boolean(item.picUrl && item.picUrl.trim());
                const hasVid = Boolean(item.vidUrl && item.vidUrl.trim());
                const hasAnyMedia = hasCode || hasPdf || hasPic || hasVid;

                return (
                  <div
                    key={item.id || index}
                    className="p-5 rounded-2xl bg-[#041d27]/70 border border-teal-900/40 hover:border-cyan-500/50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-lg font-bold text-white leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-xs font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-black/40 border border-teal-900/30">
                        #{index + 1}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-sm text-gray-300 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    )}

                    {/* Conditional Uploaded Media Options */}
                    {hasAnyMedia ? (
                      <div className="pt-3 border-t border-teal-900/30 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-gray-400 mr-1">
                          Uploaded attachments:
                        </span>

                        {/* 1. Code Option - Only if uploaded */}
                        {hasCode && (
                          <button
                            id={`view-code-${item.id}`}
                            onClick={() =>
                              onOpenMedia({
                                isOpen: true,
                                type: 'code',
                                title: item.title,
                                url: item.codeUrl!,
                              })
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/60 hover:border-cyan-400 text-cyan-200 text-xs font-medium transition-all active:scale-95 shadow-sm"
                            title="View Uploaded Code"
                          >
                            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Code</span>
                          </button>
                        )}

                        {/* 2. PDF Option - Only if uploaded */}
                        {hasPdf && (
                          <button
                            id={`view-pdf-${item.id}`}
                            onClick={() =>
                              onOpenMedia({
                                isOpen: true,
                                type: 'pdf',
                                title: item.title,
                                url: item.pdfUrl!,
                              })
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/60 hover:border-emerald-400 text-emerald-200 text-xs font-medium transition-all active:scale-95 shadow-sm"
                            title="View Uploaded PDF"
                          >
                            <FileText className="w-3.5 h-3.5 text-emerald-400" />
                            <span>PDF</span>
                          </button>
                        )}

                        {/* 3. Picture Option - Only if uploaded */}
                        {hasPic && (
                          <button
                            id={`view-pic-${item.id}`}
                            onClick={() =>
                              onOpenMedia({
                                isOpen: true,
                                type: 'pic',
                                title: item.title,
                                url: item.picUrl!,
                              })
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-950/80 hover:bg-teal-900 border border-teal-800/60 hover:border-teal-400 text-teal-200 text-xs font-medium transition-all active:scale-95 shadow-sm"
                            title="View Uploaded Picture"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
                            <span>Picture</span>
                          </button>
                        )}

                        {/* 4. Video Option - Only if uploaded */}
                        {hasVid && (
                          <button
                            id={`view-vid-${item.id}`}
                            onClick={() =>
                              onOpenMedia({
                                isOpen: true,
                                type: 'vid',
                                title: item.title,
                                url: item.vidUrl!,
                              })
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-800/60 hover:border-blue-400 text-blue-200 text-xs font-medium transition-all active:scale-95 shadow-sm"
                            title="Watch Uploaded Video"
                          >
                            <Video className="w-3.5 h-3.5 text-blue-400" />
                            <span>Video</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="pt-2 text-xs text-gray-500 font-mono">
                        (No attachments uploaded for this item)
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
