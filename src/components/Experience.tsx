import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Award,
  FileText,
  Download,
  Eye,
  ExternalLink,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  X,
  FileCheck,
  ChevronRight,
} from 'lucide-react';
import { ExperienceItem, CertificateItem, ResumeData } from '../data/portfolioData';
import { MediaViewerModal, MediaViewerState } from './MediaViewerModal';

interface ExperienceProps {
  experience: ExperienceItem[];
  resume: ResumeData;
}

export const Experience: React.FC<ExperienceProps> = ({ experience, resume }) => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [mediaViewer, setMediaViewer] = useState<MediaViewerState | null>(null);

  const openCertificate = (cert: CertificateItem) => {
    if (cert.pdfUrl) {
      setMediaViewer({
        isOpen: true,
        title: `${cert.title} — ${cert.issuer}`,
        type: 'pdf',
        url: cert.pdfUrl,
      });
    } else if (cert.picUrl) {
      setMediaViewer({
        isOpen: true,
        title: `${cert.title} — ${cert.issuer}`,
        type: 'pic',
        url: cert.picUrl,
      });
    } else if (cert.verifyUrl) {
      window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="experience"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-teal-950/60 z-10 overflow-hidden"
    >
      {/* Ambient background studio lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-800/50 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2.5 shadow-sm">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Milestones &amp; Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            Experience &amp; Certifications
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Professional trajectory, creative production, verified credentials, and official curriculum vitae.
          </p>
        </div>

        {/* Resume Control Bar Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#03232f]/90 via-[#042838]/90 to-[#021d28]/90 border border-teal-800/60 shadow-xl shadow-teal-950/40 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
                <h3 className="text-base sm:text-lg font-bold text-white">Curriculum Vitae</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-teal-300 bg-teal-950/90 border border-teal-800/60">
                  {resume.lastUpdated}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md">
                {resume.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* View Resume Button (Opens Modal) */}
            <button
              id="experience-view-resume-btn"
              onClick={() => setIsResumeModalOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm shadow-md shadow-teal-900/40 hover:shadow-cyan-500/30 transition-all duration-200 active:scale-95"
            >
              <Eye className="w-4 h-4" />
              <span>View Resume</span>
            </button>

            {/* Direct Download Button */}
            <a
              id="experience-download-resume-btn"
              href={resume.url}
              download={resume.downloadName}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#02131b] hover:bg-[#072d3d] border border-teal-800/70 hover:border-cyan-400 text-gray-200 hover:text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-95"
            >
              <Download className="w-4 h-4 text-cyan-300" />
              <span>PDF</span>
            </a>
          </div>
        </motion.div>

        {/* Kinetic Timeline with Laser Beam & Milestone Pulsing Cores */}
        <div className="relative pl-6 sm:pl-8">
          {/* Vertical Glowing Laser Line */}
          <div className="absolute top-2 bottom-6 left-2.5 sm:left-3.5 w-[2px] bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]" />

          <div className="space-y-8">
            {experience.map((item, index) => {
              const expId = item.id || `exp-${index}`;
              const certs = item.certificates || [];

              return (
                <motion.div
                  key={expId}
                  id={`experience-node-${expId}`}
                  initial={{ opacity: 0, x: -24, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.1, 0.25),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ willChange: 'transform, opacity' }}
                  className="relative group"
                >
                  {/* Glowing Milestone Core Pulse Node */}
                  <div className="absolute -left-[27px] sm:-left-[31px] top-6 w-5 h-5 rounded-full bg-[#02131b] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.8)] group-hover:scale-125 transition-transform duration-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                  </div>

                  {/* Experience Card Container */}
                  <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#041d27]/90 border border-teal-900/60 hover:border-cyan-400/80 transition-all duration-300 shadow-xl shadow-teal-950/40 hover:shadow-2xl hover:shadow-cyan-500/15 backdrop-blur-md">
                    {/* Header: Role, Period, and Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                            {item.role}
                          </h3>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 shadow-xs">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-bold text-teal-300 flex items-center gap-2">
                          <span>{item.company}</span>
                          {item.location && (
                            <>
                              <span className="text-gray-500 text-xs">·</span>
                              <span className="text-xs font-normal text-gray-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-teal-400" />
                                {item.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-300 px-3 py-1 rounded-xl bg-black/40 border border-teal-900/60 self-start sm:self-center">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Summary Description */}
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-4 font-normal">
                      {item.description}
                    </p>

                    {/* Key Highlights */}
                    {item.achievements?.length > 0 && (
                      <div className="mb-4 space-y-2">
                        {item.achievements.map((ach, achIndex) => (
                          <div key={achIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skills Used Badges */}
                    {item.skillsUsed?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {item.skillsUsed.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono text-cyan-200 bg-black/50 border border-teal-900/60"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Certificates Sub-Shelf */}
                    {certs.length > 0 && (
                      <div className="pt-4 border-t border-teal-900/50">
                        <div className="flex items-center gap-2 mb-3 text-xs font-mono font-semibold text-cyan-300">
                          <Award className="w-4 h-4 text-amber-400" />
                          <span>Credentials &amp; Certificates ({certs.length})</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {certs.map((cert) => (
                            <div
                              key={cert.id}
                              id={`cert-badge-${cert.id}`}
                              className="p-3 rounded-xl bg-black/40 border border-teal-800/50 hover:border-amber-400/70 transition-all duration-200 flex flex-col justify-between group/cert"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1">
                                    <Sparkles className="w-2.5 h-2.5" />
                                    {cert.issuer}
                                  </span>
                                  <span className="text-[10px] font-mono text-gray-400">{cert.date}</span>
                                </div>
                                <h4 className="text-xs font-bold text-white leading-snug mb-1 group-hover/cert:text-cyan-300 transition-colors">
                                  {cert.title}
                                </h4>
                                {cert.credentialId && (
                                  <p className="text-[10px] font-mono text-gray-500">ID: {cert.credentialId}</p>
                                )}
                              </div>

                              <div className="mt-2.5 pt-2 border-t border-teal-950 flex items-center justify-between">
                                <button
                                  onClick={() => openCertificate(cert)}
                                  className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-300 hover:text-cyan-100 transition-colors"
                                >
                                  <span>Inspect Certificate</span>
                                  <ChevronRight className="w-3 h-3 group-hover/cert:translate-x-0.5 transition-transform" />
                                </button>

                                {cert.verifyUrl && (
                                  <a
                                    href={cert.verifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-cyan-300 transition-colors"
                                    title="Verify online"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Embedded High-Fidelity Resume Viewer Modal */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setIsResumeModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[85vh] rounded-3xl bg-[#02131b] border border-cyan-400/50 flex flex-col shadow-2xl shadow-cyan-500/20 overflow-hidden"
            >
              {/* Modal Top Header */}
              <div className="px-5 py-4 border-b border-teal-900/70 bg-[#041d27] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-900/60 border border-teal-700/60 flex items-center justify-center text-cyan-300">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">Curriculum Vitae Preview</h3>
                    <p className="text-[11px] font-mono text-teal-400">{resume.downloadName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={resume.url}
                    download={resume.downloadName}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-950 border border-teal-800 text-teal-200 hover:text-white text-xs font-mono transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  <button
                    onClick={() => setIsResumeModalOpen(false)}
                    className="p-1.5 rounded-xl bg-teal-950/80 hover:bg-red-950/60 text-gray-400 hover:text-white border border-teal-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Embedded Document Frame */}
              <div className="flex-1 w-full bg-[#08151c] relative overflow-hidden">
                <iframe
                  src={`${resume.url}#view=FitH`}
                  title="Resume PDF Document"
                  className="w-full h-full border-none"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Viewer Modal for Certificate inspection */}
      <MediaViewerModal
        viewer={mediaViewer}
        onClose={() => setMediaViewer(null)}
      />
    </section>
  );
};
