import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Sparkles, Globe, Terminal } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectsProps {
  projects: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section
      id="projects"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-teal-950/60 relative z-10"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header with Tight Clean Spacing */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-800/50 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Live deployed applications and open-source GitHub repositories.
          </p>
        </div>

        {/* Project Cards: Hardware-Accelerated Snappy & Smooth Entrance */}
        <div className="flex flex-col gap-5 max-w-2xl mx-auto">
          {projects.map((project, index) => {
            const projectId = project.id || `project-${index}`;
            const liveUrl = project.live || project.link;
            const codeUrl = project.code || project.github;
            const tags = project.tags || [];
            const projectNumber = String(index + 1).padStart(2, '0');

            return (
              <motion.article
                key={projectId}
                id={`project-card-${projectId}`}
                initial={{ opacity: 0, scale: 0.88, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15, margin: '0px 0px -40px 0px' }}
                transition={{
                  duration: 0.42,
                  delay: Math.min(index * 0.08, 0.24),
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                style={{
                  transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                }}
                className="group relative w-full rounded-2xl sm:rounded-3xl bg-[#041d27]/90 border border-teal-900/60 hover:border-cyan-400/80 p-5 sm:p-6 flex flex-col justify-between transition-colors duration-200 shadow-xl shadow-teal-950/40 hover:shadow-2xl hover:shadow-cyan-500/15 backdrop-blur-md overflow-hidden"
              >
                {/* Subtle Ambient Radial Pulse Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-cyan-400/5 group-hover:bg-cyan-400/10 rounded-full blur-2xl pointer-events-none transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Top Bar: Sequential Number, Category badge and icon */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-teal-400/80 tracking-wider">
                        {projectNumber}
                      </span>
                      <span className="text-gray-500 text-xs font-mono">/</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#02131b] border border-teal-800/80 text-cyan-300 shadow-sm">
                        {project.category || 'Project'}
                      </span>
                    </div>

                    <Terminal className="w-4 h-4 text-teal-400/60 group-hover:text-cyan-300 transition-colors" />
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 group-hover:text-cyan-300 transition-colors tracking-tight">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags with tight gap */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-medium bg-black/50 text-cyan-200 border border-teal-900/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Direct Action Options: Code & Live */}
                <div className="relative z-10 pt-4 border-t border-teal-900/60 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    {/* Live Demo Button */}
                    {liveUrl ? (
                      <a
                        id={`project-live-btn-${projectId}`}
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold text-xs shadow-md shadow-teal-900/40 hover:shadow-cyan-500/25 transition-all duration-200 active:scale-95"
                        title="Open Live Deployment"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    ) : (
                      <span className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/30 border border-teal-950 text-gray-500 font-medium text-xs cursor-not-allowed">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo (Coming Soon)</span>
                      </span>
                    )}

                    {/* GitHub Code Button */}
                    {codeUrl ? (
                      <a
                        id={`project-code-btn-${projectId}`}
                        href={codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#02131b] hover:bg-[#072d3d] border border-teal-800/70 hover:border-cyan-400 text-gray-200 hover:text-white font-semibold text-xs shadow-sm transition-all duration-200 active:scale-95"
                        title="View GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Code</span>
                      </a>
                    ) : (
                      <span className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/30 border border-teal-950 text-gray-500 font-medium text-xs cursor-not-allowed">
                        <Github className="w-3.5 h-3.5" />
                        <span>Code (Private)</span>
                      </span>
                    )}
                  </div>

                  {/* GitHub Repo Quick Hint */}
                  {codeUrl && (
                    <a
                      href={codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-cyan-300 font-mono transition-colors flex items-center gap-1"
                    >
                      <span>github repo &rarr;</span>
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
