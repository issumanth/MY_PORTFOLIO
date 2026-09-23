import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { getEmojiCursor } from '../utils/cursor';
import {
  Sparkles,
  TrendingUp,
  FolderGit2,
  ArrowRight,
  Palette,
  Film,
  Scissors,
  Flame,
  Code2,
  Music as MusicIcon,
  Feather,
  Sliders,
  Clock,
  Activity,
} from 'lucide-react';
import { SkillItem } from '../data/portfolioData';
import { SkillWorksModal } from './SkillWorksModal';
import { MediaViewerModal, MediaViewerState } from './MediaViewerModal';

interface SkillsProps {
  skills: SkillItem[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkillForWorks, setSelectedSkillForWorks] = useState<SkillItem | null>(null);
  const [mediaViewer, setMediaViewer] = useState<MediaViewerState | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  // Measure dynamic horizontal scroll distance based on content width vs viewport
  useEffect(() => {
    const updateMaxScroll = () => {
      if (trackRef.current) {
        const scrollWidth = trackRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        const paddingOffset = window.innerWidth < 640 ? 30 : 100;
        setMaxScroll(Math.max(0, scrollWidth - clientWidth + paddingOffset));
      }
    };

    updateMaxScroll();
    const timer = setTimeout(updateMaxScroll, 120);
    window.addEventListener('resize', updateMaxScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateMaxScroll);
    };
  }, [skills]);

  // Track vertical page scroll through this tall pinned container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll down directly to horizontal sideways movement with spring smoothing
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
  const smoothX = useSpring(rawX, { stiffness: 105, damping: 24, mass: 0.2 });

  // Custom creative accents based on skill identity
  const getSkillTheme = (id: string, name: string) => {
    const normalized = (id + ' ' + name).toLowerCase();

    if (normalized.includes('art')) {
      return {
        badgeIcon: <Palette className="w-3 h-3 text-emerald-300" />,
        badgeText: 'Fine Art & Canvas',
        accentBorder: 'border-emerald-500/40 hover:border-emerald-400',
        glowColor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        cardBg: 'from-[#032224] via-[#02181d] to-[#010e14]',
        customElement: (
          <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-black/40 border border-emerald-900/40 my-2 text-[10px] font-mono text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80" />
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-gray-400 ml-1">Oil on Linen · 300 GSM</span>
          </div>
        ),
      };
    }

    if (normalized.includes('film')) {
      return {
        badgeIcon: <Film className="w-3 h-3 text-cyan-300" />,
        badgeText: 'Cinema & Directing',
        accentBorder: 'border-cyan-500/40 hover:border-cyan-400',
        glowColor: 'from-cyan-500/25 via-blue-500/10 to-transparent',
        cardBg: 'from-[#032431] via-[#021824] to-[#010e17]',
        customElement: (
          <div className="my-2 p-1.5 rounded-lg bg-black/50 border border-cyan-900/50 flex items-center justify-between text-[10px] font-mono text-cyan-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>REC 24FPS</span>
            </div>
            <span className="text-gray-400 font-mono">2.39:1 ANAMORPHIC</span>
          </div>
        ),
      };
    }

    if (normalized.includes('edit')) {
      return {
        badgeIcon: <Scissors className="w-3 h-3 text-teal-300" />,
        badgeText: 'Timeline & Montage',
        accentBorder: 'border-teal-500/40 hover:border-teal-400',
        glowColor: 'from-teal-500/20 via-cyan-500/10 to-transparent',
        cardBg: 'from-[#032328] via-[#021a1f] to-[#011014]',
        customElement: (
          <div className="my-2 p-1.5 rounded-lg bg-black/50 border border-teal-900/50 text-[10px] font-mono text-teal-300">
            <div className="flex items-center justify-between mb-1 text-[9px] text-gray-400">
              <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5 text-teal-400" /> 00:14:28:12</span>
              <span>120 BPM SYNC</span>
            </div>
            {/* Visual timeline tracks */}
            <div className="flex gap-1 h-2 rounded bg-black/60 p-0.5 border border-teal-950">
              <div className="w-2/5 h-full rounded-xs bg-teal-500/80" />
              <div className="w-1/4 h-full rounded-xs bg-cyan-400/90" />
              <div className="w-1/3 h-full rounded-xs bg-emerald-400/70" />
            </div>
          </div>
        ),
      };
    }

    if (normalized.includes('cook')) {
      return {
        badgeIcon: <Flame className="w-3 h-3 text-amber-300" />,
        badgeText: 'Culinary Chemistry',
        accentBorder: 'border-amber-500/35 hover:border-amber-400/60',
        glowColor: 'from-amber-500/20 via-teal-500/10 to-transparent',
        cardBg: 'from-[#042426] via-[#02181d] to-[#011014]',
        customElement: (
          <div className="my-2 p-1.5 rounded-lg bg-black/50 border border-teal-900/50 flex items-center justify-between text-[10px] font-mono text-amber-300">
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400 animate-pulse" /> 185°C Slow Simmer
            </span>
            <span className="text-gray-400">UMAMI: MAX</span>
          </div>
        ),
      };
    }

    if (normalized.includes('coding') || normalized.includes('vibe')) {
      return {
        badgeIcon: <Code2 className="w-3 h-3 text-cyan-300" />,
        badgeText: 'Vibe Code & Physics',
        accentBorder: 'border-cyan-400/50 hover:border-cyan-300',
        glowColor: 'from-cyan-500/25 via-teal-500/15 to-transparent',
        cardBg: 'from-[#032634] via-[#021b25] to-[#011119]',
        customElement: (
          <div className="my-2 p-2 rounded-lg bg-black/60 border border-cyan-900/60 font-mono text-[10px] text-cyan-300">
            <div className="flex items-center gap-1.5 mb-1 text-gray-500 text-[9px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="ml-1 text-gray-400">ambient.ts</span>
            </div>
            <div className="text-gray-300">
              <span className="text-teal-400">&gt;</span> vibe.<span className="text-cyan-300">render</span>({'{'} fps: <span className="text-emerald-400">60</span> {'}'});
            </div>
          </div>
        ),
      };
    }

    if (normalized.includes('music')) {
      return {
        badgeIcon: <MusicIcon className="w-3 h-3 text-blue-300" />,
        badgeText: 'Lo-Fi Soundscapes',
        accentBorder: 'border-blue-500/40 hover:border-blue-400',
        glowColor: 'from-blue-500/25 via-cyan-500/10 to-transparent',
        cardBg: 'from-[#022133] via-[#021827] to-[#01101c]',
        customElement: (
          <div className="my-2 p-2 rounded-lg bg-black/60 border border-blue-900/50 flex items-center justify-between text-[10px] font-mono text-blue-300">
            <div className="flex items-end gap-1 h-3.5">
              <motion.span animate={{ height: ['40%', '100%', '60%'] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-cyan-400 rounded-xs" />
              <motion.span animate={{ height: ['80%', '30%', '90%'] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-blue-400 rounded-xs" />
              <motion.span animate={{ height: ['50%', '90%', '40%'] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-teal-400 rounded-xs" />
              <motion.span animate={{ height: ['90%', '50%', '100%'] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-cyan-300 rounded-xs" />
            </div>
            <span className="text-gray-400">128 BPM · 44.1 kHz</span>
          </div>
        ),
      };
    }

    if (normalized.includes('story') || normalized.includes('writing')) {
      return {
        badgeIcon: <Feather className="w-3 h-3 text-emerald-300" />,
        badgeText: 'Lore & Screenplay',
        accentBorder: 'border-emerald-500/40 hover:border-emerald-400',
        glowColor: 'from-emerald-500/20 via-blue-500/10 to-transparent',
        cardBg: 'from-[#03252a] via-[#021a20] to-[#011116]',
        customElement: (
          <div className="my-2 p-1.5 rounded-lg bg-black/50 border border-emerald-900/50 flex items-center justify-between text-[10px] font-mono text-emerald-300">
            <span className="italic font-serif text-gray-300">&ldquo;Act II: The Clockwork Sea&rdquo;</span>
            <span className="text-gray-400 text-[9px]">DRAFT #4</span>
          </div>
        ),
      };
    }

    // Default creative palette
    return {
      badgeIcon: <Sparkles className="w-3 h-3 text-cyan-300" />,
      badgeText: 'Creative Art',
      accentBorder: 'border-teal-500/40 hover:border-cyan-400',
      glowColor: 'from-teal-500/20 via-cyan-500/10 to-transparent',
      cardBg: 'from-[#041d27] via-[#031720] to-[#010e14]',
      customElement: null,
    };
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative h-[220vh] bg-transparent border-t border-teal-950/60 z-10"
    >
      {/* Pinned Sticky Viewport: User stays centered while scrolling vertically */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-8 py-4">
        
        {/* Compact Clean Header (Without Any Progress Indicators) */}
        <div className="max-w-7xl mx-auto w-full mb-5 sm:mb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-800/50 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Multidisciplinary Palette</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Skills &amp; Creative Disciplines
            </h2>
          </div>
        </div>

        {/* Sideways Moving Track Linked to Vertical Page Scroll */}
        <div className="w-full overflow-visible">
          <motion.div
            ref={trackRef}
            style={{ x: smoothX, willChange: 'transform' }}
            className="flex gap-4 sm:gap-5 pl-1 sm:pl-4 pr-12"
          >
            {skills.map((skill, index) => {
              const skillId = skill.id || `skill-${index}`;
              const isHovered = hoveredSkill === skillId;
              const emoji = skill.emoji || '✨';
              const cardCursor = getEmojiCursor(emoji, 16, 16);
              const worksCount = skill.items?.length || 0;
              const percentage = typeof skill.percentage === 'number' ? skill.percentage : 85;
              const worksDone = skill.worksDone || `${worksCount} works & accomplishments`;
              const color = skill.color || 'from-teal-400 to-cyan-500';
              const theme = getSkillTheme(skillId, skill.name);

              return (
                <motion.div
                  key={skillId}
                  id={`skill-card-${skillId}`}
                  style={{ cursor: cardCursor }}
                  onMouseEnter={() => setHoveredSkill(skillId)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                  className={`relative shrink-0 w-[275px] sm:w-[315px] md:w-[340px] rounded-2xl sm:rounded-3xl bg-gradient-to-b ${theme.cardBg} border ${theme.accentBorder} p-5 sm:p-6 transition-all duration-300 backdrop-blur-md flex flex-col justify-between overflow-hidden min-h-[310px] sm:min-h-[330px] shadow-xl shadow-teal-950/40`}
                >
                  {/* Subtle Ambient Radial Discipline Glow */}
                  <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${theme.glowColor} rounded-full blur-2xl pointer-events-none`} />

                  {/* Top Bar: Emoji & Thematic Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span
                        className="text-3xl sm:text-4xl select-none filter drop-shadow-md"
                        role="img"
                        aria-label={skill.name}
                        title={`${skill.name} cursor icon`}
                      >
                        {emoji}
                      </span>

                      <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono tracking-wide text-cyan-200 px-2.5 py-1 rounded-full bg-black/60 border border-teal-800/60 shadow-sm">
                        {theme.badgeIcon}
                        <span>{theme.badgeText}</span>
                      </div>
                    </div>

                    {/* Skill Title */}
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1.5">
                      {skill.name}
                    </h3>

                    {/* Bespoke Discipline Visual Micro-Widget */}
                    {theme.customElement}

                    {/* Proficiency Metric Details */}
                    <div className="space-y-2 mb-3 mt-2">
                      <div>
                        <div className="flex justify-between items-center text-xs font-mono mb-1">
                          <span className="text-gray-300 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                            Proficiency
                          </span>
                          <span className="text-cyan-300 font-bold">{percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 sm:h-2 rounded-full bg-black/70 overflow-hidden border border-teal-950">
                          <div
                            style={{ width: `${percentage}%` }}
                            className={`h-full rounded-full bg-gradient-to-r ${color}`}
                          />
                        </div>
                      </div>

                      {/* Summary Text */}
                      <p className="text-xs text-gray-300/90 line-clamp-2 leading-relaxed font-normal">
                        {worksDone}
                      </p>
                    </div>
                  </div>

                  {/* Option to View "Things I Did In It" */}
                  <div className="pt-3 border-t border-teal-900/50 mt-auto">
                    <button
                      id={`skill-view-works-btn-${skillId}`}
                      onClick={() => setSelectedSkillForWorks(skill)}
                      className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl sm:rounded-2xl bg-teal-950/80 hover:bg-teal-900 border border-teal-800/60 hover:border-cyan-400 text-teal-200 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 group active:scale-95 shadow-sm"
                    >
                      <span className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-cyan-400" />
                        <span>Things I Did</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-teal-900/80 text-[10px] font-mono text-cyan-300">
                          {worksCount}
                        </span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-cyan-300" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Modal for "Things I Did in Skill" with conditional Code, PDF, Pic, Vid */}
      <SkillWorksModal
        skill={selectedSkillForWorks}
        onClose={() => setSelectedSkillForWorks(null)}
        onOpenMedia={(media) => setMediaViewer(media)}
      />

      {/* Media Viewer Modal for previewing picture, video, pdf, or code */}
      <MediaViewerModal
        viewer={mediaViewer}
        onClose={() => setMediaViewer(null)}
      />
    </section>
  );
};
