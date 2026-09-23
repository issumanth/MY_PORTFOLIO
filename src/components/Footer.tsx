import React from 'react';
import { ArrowUp, Github, Linkedin, MessageCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#020f16]/95 border-t border-teal-950/70 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-xs font-black text-white shadow-md shadow-cyan-500/30">
              S
            </span>
            <span>Sumanth</span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Sumanth. Multidisciplinary Creative &amp; Developer Portfolio.
          </p>
        </div>

        {/* Social & Contact Links */}
        <div className="flex items-center gap-4">
          <a
            id="footer-github-link"
            href="https://github.com/issumanth"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#041d27] border border-teal-900/50 text-gray-300 hover:text-white hover:border-cyan-400/50 transition-colors shadow-sm"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            id="footer-linkedin-link"
            href="https://www.linkedin.com/in/sumanth-g-0a5501306/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#041d27] border border-teal-900/50 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors shadow-sm"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            id="footer-whatsapp-link"
            href="https://wa.me/918121171446?text=Hi%20Sumanth,%20loved%20your%20portfolio!"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#041d27] border border-teal-900/50 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors shadow-sm"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Back to top button */}
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#041d27] border border-teal-900/50 text-gray-300 hover:text-cyan-200 hover:border-cyan-400/50 transition-colors shadow-sm ml-2"
            aria-label="Scroll back to top"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
