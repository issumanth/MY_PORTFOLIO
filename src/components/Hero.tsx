import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { SumanthPortrait } from './SumanthPortrait';

interface HeroProps {
  customImage?: string;
}

export const Hero: React.FC<HeroProps> = ({ customImage }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] w-full flex items-center justify-center overflow-hidden py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 text-white"
    >
      <div className="max-w-3xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/70 backdrop-blur-md border border-teal-700/50 text-xs font-mono text-cyan-300 mb-4 shadow-md"
        >
         
          
        </motion.div>

        {/* Hero Heading: Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5"
        >
          <span className="block text-gray-300 text-base sm:text-xl font-light tracking-widest uppercase mb-0.3">
            Hi, I'm
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-2">
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(6,182,212,0.4)]">
              Sumanth
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-teal-300 tracking-wider uppercase">
            Multidisciplinary Creator · Filmmaker · Vibe Coder
          </p>
        </motion.div>

        {/* Round Photo Directly Below The Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
          className="mb-6 sm:mb-7 w-full flex justify-center items-center"
        >
          <SumanthPortrait customImage={customImage} />
        </motion.div>

        {/* Bio Description with Tighter Padding */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-xl mx-auto mb-6 backdrop-blur-sm bg-[#041d27]/60 p-4 sm:p-5 rounded-2xl border border-teal-800/40 shadow-xl shadow-teal-950/30"
        >
          Creative developer, film director, and multidisciplinary storyteller. Blending vibe
          coding, interactive web physics, cinematic pacing, and expressive digital art into
          living, breathing web experiences.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3.5"
        >
          

          <a
            href="https://wa.me/918121171446?text=Hi%20Sumanth,%20loved%20your%20portfolio!"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-contact-btn"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#041d27] hover:bg-[#072d3d] text-teal-200 hover:text-white border border-teal-700/60 hover:border-cyan-400 font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Get in Touch</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
