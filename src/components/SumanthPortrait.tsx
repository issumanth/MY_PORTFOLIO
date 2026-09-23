import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SumanthPortraitProps {
  customImage?: string;
  className?: string;
}

export const SumanthPortrait: React.FC<SumanthPortraitProps> = ({
  customImage,
  className = '',
}) => {
  const baseImageUrl = `${import.meta.env.BASE_URL}Pp.png`;
  const [imgSrc, setImgSrc] = useState(customImage || baseImageUrl);
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  return (
    <div
      id="sumanth-portrait-container"
      className={`relative w-60 h-60 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 aspect-square mx-auto select-none group ${className}`}
    >
      {/* Studio Radial Cyan/Teal/Emerald Ambient Aura (Round) */}
      <div className="absolute -inset-3 sm:-inset-5 bg-gradient-to-tr from-teal-500/40 via-cyan-400/35 to-blue-600/35 rounded-full blur-2xl opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none" />

      {/* Decorative Outer Studio Frame (Round) */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-cyan-400/40 group-hover:border-cyan-300/80 shadow-[0_0_40px_rgba(6,182,212,0.35)] bg-gradient-to-b from-[#042836] via-[#031d27] to-[#010e14] transition-all duration-300">
        
        {/* High-Resolution Portrait Photo */}
        <motion.img
          id="sumanth-portrait-photo"
          src={imgSrc}
          alt="Sumanth - Creative Developer & Storyteller"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: hasImageLoaded ? 1 : 0.9 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onLoad={() => setHasImageLoaded(true)}
          onError={() => {
            if (imgSrc !== baseImageUrl) {
              setImgSrc(baseImageUrl);
            }
          }}
          className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.01] transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Vignette & Lighting Rim Overlay for Seamless Blend */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#010e14]/40 via-transparent to-transparent rounded-full" />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-cyan-300/20 rounded-full" />
      </div>

      {/* Floating Status Pill at bottom of the round photo */}
      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center pointer-events-none z-10 whitespace-nowrap">
        <div className="px-3.5 py-1 rounded-full bg-[#02131b]/95 backdrop-blur-md border border-cyan-500/40 text-white shadow-xl flex items-center gap-2">
          
          <div className="flex items-center gap-1 text-[11px] font-mono text-teal-300">
           
            
          </div>
        </div>
      </div>
    </div>
  );
};
