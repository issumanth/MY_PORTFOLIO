import React from 'react';
import { motion } from 'motion/react';
import { Heart, Compass, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-teal-950/60 bg-transparent transition-colors z-10"
    >
      {/* Ambient background studio glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-700/40 text-teal-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>About Me</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5"
        >
          Crafting Digital Worlds with{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
            Artistic Soul &amp; Code
          </span>
        </motion.h2>

        {/* Centered Story Block with Reduced Gaps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed text-center font-normal max-w-3xl mx-auto"
        >
          <p>
            I am a multi-hyphenate creator who views software engineering not merely as logic and
            syntax, but as an expressive artistic canvas. My creative journey began with traditional
            fine art and cinematic storytelling, which naturally evolved into designing responsive,
            playful, and immersive digital products.
          </p>

          <p>
            Whether I am directing a narrative film, cutting dynamic visual sequences, crafting
            original music soundscapes, or vibe-coding interactive web applications, my philosophy
            remains constant: every single interaction should evoke wonder, delight, and effortless utility.
          </p>
        </motion.div>

        {/* Core Pillars with Tighter Gaps */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 sm:mt-10 text-left"
        >
          <div className="p-5 rounded-2xl bg-[#041d27]/70 border border-teal-900/50 backdrop-blur-md hover:border-cyan-400/60 transition-colors shadow-lg shadow-teal-950/20">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-2.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-white font-semibold text-sm sm:text-base mb-1">Intuitive Aesthetics</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-normal">
              Harmonious typography, mathematical spacing, and organic fluid animations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#041d27]/70 border border-teal-900/50 backdrop-blur-md hover:border-emerald-400/60 transition-colors shadow-lg shadow-teal-950/20">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-2.5">
              <Heart className="w-4 h-4" />
            </div>
            <h3 className="text-white font-semibold text-sm sm:text-base mb-1">Passionate Craft</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-normal">
              Merging cinema, music, cuisine, and design into memorable digital narratives.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#041d27]/70 border border-teal-900/50 backdrop-blur-md hover:border-blue-400/60 transition-colors shadow-lg shadow-teal-950/20">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center mb-2.5">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-white font-semibold text-sm sm:text-base mb-1">Creative Direction</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-normal">
              Pacing, rhythm, and visual choreography applied to modern web engineering.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
