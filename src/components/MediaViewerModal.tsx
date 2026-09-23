import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Download, FileText, Image as ImageIcon, Video, Code2 } from 'lucide-react';

export interface MediaViewerState {
  isOpen: boolean;
  type: 'pic' | 'vid' | 'pdf' | 'code';
  title: string;
  url: string;
}

interface MediaViewerModalProps {
  viewer: MediaViewerState | null;
  onClose: () => void;
}

export const MediaViewerModal: React.FC<MediaViewerModalProps> = ({ viewer, onClose }) => {
  if (!viewer || !viewer.isOpen) return null;

  // Helper to format YouTube URLs for embedding
  const getEmbedUrl = (rawUrl: string): string => {
    try {
      if (rawUrl.includes('youtube.com/watch?v=')) {
        const videoId = rawUrl.split('watch?v=')[1]?.split('&')[0];
        return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
      }
      if (rawUrl.includes('youtu.be/')) {
        const videoId = rawUrl.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
      }
      if (rawUrl.includes('vimeo.com/')) {
        const videoId = rawUrl.split('vimeo.com/')[1]?.split('?')[0];
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      }
    } catch {
      // Fallback
    }
    return rawUrl;
  };

  const getHeaderIcon = () => {
    switch (viewer.type) {
      case 'pic':
        return <ImageIcon className="w-5 h-5 text-teal-400" />;
      case 'vid':
        return <Video className="w-5 h-5 text-blue-400" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-emerald-400" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getTypeName = () => {
    switch (viewer.type) {
      case 'pic':
        return 'Picture / Artwork';
      case 'vid':
        return 'Video Playback';
      case 'pdf':
        return 'PDF Document';
      case 'code':
        return 'Source Code';
    }
  };

  const isEmbeddableVideo =
    viewer.type === 'vid' &&
    (viewer.url.includes('youtube') || viewer.url.includes('youtu.be') || viewer.url.includes('vimeo'));

  return (
    <AnimatePresence>
      <div
        id="media-viewer-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="media-viewer-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#02131b] border border-teal-600/60 shadow-2xl shadow-teal-950/80 overflow-hidden text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-teal-900/50 bg-[#04202d]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-950/80 border border-teal-800/50">
                {getHeaderIcon()}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-cyan-300">
                  {getTypeName()}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white truncate max-w-md sm:max-w-xl">
                  {viewer.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={viewer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-teal-950/80 hover:bg-teal-900 text-gray-300 hover:text-white border border-teal-800/50 transition-colors"
                title="Open in new window"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                id="media-viewer-close-btn"
                onClick={onClose}
                className="p-2.5 rounded-xl bg-teal-950/80 hover:bg-teal-900 text-gray-300 hover:text-white border border-teal-800/50 transition-colors"
                title="Close Viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Media Body */}
          <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-black/60 min-h-[350px]">
            {/* 1. Picture / Image */}
            {viewer.type === 'pic' && (
              <div className="max-w-full max-h-[70vh] flex flex-col items-center justify-center">
                <img
                  src={viewer.url}
                  alt={viewer.title}
                  className="max-w-full max-h-[65vh] object-contain rounded-xl border border-teal-900/40 shadow-2xl"
                />
              </div>
            )}

            {/* 2. Video */}
            {viewer.type === 'vid' && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-teal-900/40 shadow-2xl">
                {isEmbeddableVideo ? (
                  <iframe
                    src={getEmbedUrl(viewer.url)}
                    title={viewer.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={viewer.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support HTML5 video.
                  </video>
                )}
              </div>
            )}

            {/* 3. PDF Document */}
            {viewer.type === 'pdf' && (
              <div className="w-full h-[65vh] flex flex-col rounded-xl overflow-hidden border border-teal-900/40 bg-zinc-900">
                <iframe
                  src={`${viewer.url}#toolbar=1`}
                  title={viewer.title}
                  className="w-full flex-1 border-0"
                />
              </div>
            )}

            {/* 4. Code Snippet or Repo */}
            {viewer.type === 'code' && (
              <div className="w-full p-6 rounded-2xl bg-[#02131b] border border-teal-900/50 text-left font-mono text-sm">
                <p className="text-gray-300 mb-4">
                  This work item is linked to a source code repository:
                </p>
                <div className="p-4 rounded-xl bg-black/70 border border-teal-900/40 text-cyan-300 break-all mb-6">
                  {viewer.url}
                </div>
                <a
                  href={viewer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-400 hover:to-cyan-400 text-white font-bold transition-all shadow-lg active:scale-95"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Launch GitHub Code Repository</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Footer Info & Download */}
          <div className="px-6 py-3.5 bg-[#010d13] border-t border-teal-900/50 flex items-center justify-between text-xs text-gray-400">
            <span className="truncate max-w-sm">{viewer.url}</span>
            <a
              href={viewer.url}
              target="_blank"
              download
              className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Direct Link / Download</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
