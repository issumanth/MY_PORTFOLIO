import React from 'react';
import { motion } from 'motion/react';

interface IllustrationItem {
  id: string;
  name: string;
  category: 'art' | 'cinema' | 'editing' | 'writing' | 'cooking' | 'music' | 'coding';
  top: string;
  left: string;
  size: number;
  rotation: number;
  color: string;
  duration: number;
  delay: number;
  svg: React.ReactNode;
}

export const CreativeIllustrationsBackground: React.FC = () => {
  const illustrations: IllustrationItem[] = [
    // 1. Cinema: Film Reel (Top Left)
    {
      id: 'cinema-reel-1',
      name: 'Film Reel',
      category: 'cinema',
      top: '6%',
      left: '4%',
      size: 58,
      rotation: 15,
      color: 'text-cyan-400/25',
      duration: 18,
      delay: 0,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="6" r="1.5" />
          <circle cx="12" cy="18" r="1.5" />
          <circle cx="6" cy="12" r="1.5" />
          <circle cx="18" cy="12" r="1.5" />
        </svg>
      ),
    },
    // 2. Cinema: Clapperboard (Top Right)
    {
      id: 'cinema-clapper',
      name: 'Clapperboard',
      category: 'cinema',
      top: '12%',
      left: '90%',
      size: 64,
      rotation: -12,
      color: 'text-teal-400/25',
      duration: 22,
      delay: 1.5,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="15" x="2" y="7" rx="2" />
          <path d="m4 7 3-5h4l-3 5" />
          <path d="m11 7 3-5h4l-3 5" />
          <line x1="2" x2="22" y1="12" y2="12" />
        </svg>
      ),
    },
    // 3. Art: Paint Palette & Brush
    {
      id: 'art-palette',
      name: 'Paint Palette',
      category: 'art',
      top: '28%',
      left: '3%',
      size: 66,
      rotation: 20,
      color: 'text-emerald-400/25',
      duration: 20,
      delay: 2,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="1.5" />
          <circle cx="17.5" cy="10.5" r="1.5" />
          <circle cx="8.5" cy="7.5" r="1.5" />
          <circle cx="6.5" cy="12.5" r="1.5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.4-.4-.8-.4-1.4 0-1.1.9-2 2-2h2.3c3.8 0 7-3.2 7-7 0-5-4.5-9-10-9z" />
        </svg>
      ),
    },
    // 4. Editing: Scissors
    {
      id: 'editing-scissors',
      name: 'Scissors',
      category: 'editing',
      top: '32%',
      left: '92%',
      size: 52,
      rotation: 45,
      color: 'text-cyan-400/25',
      duration: 16,
      delay: 0.5,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <path d="M8.12 8.12 12 12" />
          <path d="M20 4 8.12 15.88" />
          <circle cx="6" cy="18" r="3" />
          <path d="M14.8 14.8 20 20" />
        </svg>
      ),
    },
    // 5. Story Writing: Quill & Manuscript
    {
      id: 'writing-quill',
      name: 'Quill & Manuscript',
      category: 'writing',
      top: '48%',
      left: '5%',
      size: 56,
      rotation: -18,
      color: 'text-blue-400/25',
      duration: 24,
      delay: 3,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 11.5V21h9.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      ),
    },
    // 6. Story Writing: Open Story Book
    {
      id: 'writing-book',
      name: 'Open Story Book',
      category: 'writing',
      top: '56%',
      left: '88%',
      size: 60,
      rotation: 12,
      color: 'text-teal-400/25',
      duration: 19,
      delay: 1,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    // 7. Cooking: Culinary Skillet
    {
      id: 'cooking-skillet',
      name: 'Culinary Skillet',
      category: 'cooking',
      top: '22%',
      left: '50%',
      size: 46,
      rotation: -30,
      color: 'text-emerald-400/25',
      duration: 21,
      delay: 2.5,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="9" cy="14" rx="7" ry="5" />
          <path d="M16 14l6-5" />
          <path d="M6 7c0-2 1.5-3 3-3s3 1 3 3" />
        </svg>
      ),
    },
    // 8. Music: Studio Headphones
    {
      id: 'music-headphones',
      name: 'Headphones',
      category: 'music',
      top: '68%',
      left: '8%',
      size: 54,
      rotation: 10,
      color: 'text-cyan-400/25',
      duration: 17,
      delay: 3.5,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
        </svg>
      ),
    },
    // 9. Vibe Coding: Terminal Tags
    {
      id: 'coding-tags',
      name: 'Code Brackets',
      category: 'coding',
      top: '74%',
      left: '86%',
      size: 52,
      rotation: -15,
      color: 'text-teal-300/25',
      duration: 15,
      delay: 1.2,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
    },
    // 10. Cinema: Camera
    {
      id: 'cinema-camera',
      name: 'Camera',
      category: 'cinema',
      top: '84%',
      left: '12%',
      size: 56,
      rotation: 8,
      color: 'text-blue-400/25',
      duration: 23,
      delay: 4,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 8-6 4 6 4V8Z" />
          <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
        </svg>
      ),
    },
    // 11. Art: Canvas Easel
    {
      id: 'art-easel',
      name: 'Easel',
      category: 'art',
      top: '42%',
      left: '94%',
      size: 54,
      rotation: -8,
      color: 'text-emerald-400/25',
      duration: 25,
      delay: 2,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="11" rx="1" />
          <line x1="12" y1="1" x2="12" y2="4" />
          <line x1="6" y1="15" x2="4" y2="23" />
          <line x1="18" y1="15" x2="20" y2="23" />
          <line x1="12" y1="15" x2="12" y2="23" />
        </svg>
      ),
    },
    // 12. Editing: Audio Waveform
    {
      id: 'editing-waves',
      name: 'Waveform',
      category: 'editing',
      top: '88%',
      left: '80%',
      size: 48,
      rotation: 0,
      color: 'text-cyan-400/25',
      duration: 14,
      delay: 0.8,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 10v4" />
          <path d="M6 7v10" />
          <path d="M10 3v18" />
          <path d="M14 8v8" />
          <path d="M18 5v14" />
          <path d="M22 10v4" />
        </svg>
      ),
    },
  ];

  return (
    <div
      id="creative-illustrations-canvas"
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none"
    >
      {/* Studio Radial Cyan/Teal/Emerald Background Gradients across the ENTIRE webpage */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(6,182,212,0.18)_0%,rgba(13,148,136,0.20)_40%,transparent_80%)]" />
      <div className="absolute top-[40%] inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_80%_50%,rgba(16,185,129,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[70%] inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_20%_50%,rgba(59,130,246,0.14)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating vector illustration doodles */}
      {illustrations.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.color} filter drop-shadow-[0_0_8px_currentColor]`}
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            height: item.size,
            transform: `rotate(${item.rotation}deg)`,
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [item.rotation - 4, item.rotation + 4, item.rotation - 4],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          {item.svg}
        </motion.div>
      ))}

      {/* Subtle fine dot matrix overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
};
