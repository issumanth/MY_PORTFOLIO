import React from 'react';
import { Linkedin, Github, MessageCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-[#02131b]/85 backdrop-blur-xl border-b border-teal-950/60 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Simple Brand: Name only as requested */}
        <a
          href="#hero"
          id="nav-brand-name"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white hover:text-cyan-300 transition-colors flex items-center gap-2"
        >
          <span>Sumanth</span>
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse" />
        </a>

        {/* Right side: Navigation Links & Social Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden md:flex items-center gap-4 text-xs font-mono tracking-wider mr-2">
            <a href="#skills" className="text-gray-300 hover:text-cyan-300 transition-colors">
              Skills
            </a>
            <a href="#projects" className="text-gray-300 hover:text-cyan-300 transition-colors">
              Projects
            </a>
            <a href="#experience" className="text-gray-300 hover:text-cyan-300 transition-colors">
              Experience
            </a>
          </nav>

          {/* LinkedIn Icon */}
          <a
            id="nav-linkedin-link"
            href="https://www.linkedin.com/in/sumanth-g-0a5501306/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#041d27]/80 text-cyan-200 hover:text-white hover:bg-cyan-900/60 border border-teal-900/60 hover:border-cyan-400/70 transition-all shadow-sm active:scale-95"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          {/* WhatsApp Icon */}
          <a
            id="nav-whatsapp-link"
            href="https://wa.me/918121171446?text=Hi%20Sumanth,%20loved%20your%20portfolio!"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#041d27]/80 text-emerald-300 hover:text-white hover:bg-emerald-950/70 border border-emerald-900/50 hover:border-emerald-400/70 transition-all shadow-sm active:scale-95"
            aria-label="Chat on WhatsApp"
            title="WhatsApp Chat"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* GitHub Icon */}
          <a
            id="nav-github-link"
            href="https://github.com/issumanth"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#041d27]/80 text-teal-200 hover:text-white hover:bg-teal-950/70 border border-teal-900/60 hover:border-teal-400/70 transition-all shadow-sm active:scale-95"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};
