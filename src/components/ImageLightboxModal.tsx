import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download, Copy, Check } from 'lucide-react';

export interface LightboxImage {
  src: string;
  title: string;
  subtitle?: string;
  caption?: string;
  quote?: string;
  fileTag?: string;
}

interface ImageLightboxModalProps {
  image: LightboxImage | null;
  onClose: () => void;
  mode: 'angel' | 'realist';
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  image,
  onClose,
  mode
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (image) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, onClose]);

  // Reset zoom on image change
  useEffect(() => {
    setIsZoomed(false);
    setCopiedQuote(false);
  }, [image]);

  if (!image) return null;

  const handleCopyQuote = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.fileTag || 'han_sea_illustration.webp';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xs border shadow-2xl overflow-hidden transition-colors ${
          mode === 'angel'
            ? 'bg-[#F6F1EA] text-[#2A2624] border-[#8A817A]/40'
            : 'bg-[#15161C] text-[#E7E2DA] border-[#7C7B85]/40'
        }`}
      >
        {/* Top Editorial Taped Bar */}
        <div className="absolute -top-2 left-10 w-24 h-4 tape-strip -rotate-1 z-20"></div>
        <div className="absolute -top-2 right-10 w-24 h-4 tape-strip rotate-2 z-20"></div>

        {/* Header Toolbar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-current/20 shrink-0 text-xs font-mono">
          <div className="flex items-center gap-3 truncate">
            <span className="text-[#E85D75] font-bold tracking-wider uppercase">
              PHOTO LOUPE // {image.fileTag || 'ARCHIVE'}
            </span>
            <span className="opacity-40">|</span>
            <span id="lightbox-title" className="truncate font-semibold opacity-90">
              {image.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsZoomed((prev) => !prev)}
              className="p-1.5 border border-current/20 hover:border-current opacity-70 hover:opacity-100 transition-colors cursor-pointer"
              title={isZoomed ? '축소 (1x)' : '확대 (1.75x)'}
              aria-label="이미지 확대/축소"
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="p-1.5 border border-current/20 hover:border-current opacity-70 hover:opacity-100 transition-colors cursor-pointer"
              title="이미지 원본 다운로드"
              aria-label="이미지 다운로드"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 border border-current/20 hover:border-[#E85D75] hover:text-[#E85D75] opacity-70 hover:opacity-100 transition-colors cursor-pointer ml-1"
              title="닫기 (ESC)"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Body: Image Stage & Editorial Caption */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Image Stage Container */}
          <div className="lg:col-span-7 flex items-center justify-center overflow-hidden bg-black/5 dark:bg-black/30 rounded-xs border border-current/15 p-2 sm:p-4">
            <div
              className={`relative transition-all duration-300 ${
                isZoomed ? 'cursor-zoom-out scale-150' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="max-h-[58vh] sm:max-h-[66vh] w-auto object-contain rounded-[1px] shadow-sm"
              />
            </div>
          </div>

          {/* Editorial Inspection Notes & Quote */}
          <div className="lg:col-span-5 space-y-5 text-left font-mono">
            <div>
              <div className="text-[10px] uppercase tracking-widest opacity-50 mb-1">
                RECORDED EVIDENCE
              </div>
              <h3
                className={`text-xl sm:text-2xl font-bold tracking-tight ${
                  mode === 'angel' ? 'font-serif-kr' : 'font-mono'
                }`}
              >
                {image.title}
              </h3>
              {image.subtitle && (
                <p className="text-xs opacity-60 mt-0.5">{image.subtitle}</p>
              )}
            </div>

            {/* Seah's Dialogue Line Box */}
            {image.quote && (
              <div className="p-4 border border-[#E85D75]/40 bg-[#E85D75]/5 rounded-xs space-y-2">
                <div className="flex items-center justify-between text-[10px] text-[#E85D75] font-bold">
                  <span>RECORDED VOICE LINE</span>
                  <button
                    type="button"
                    onClick={() => handleCopyQuote(image.quote!)}
                    className="inline-flex items-center gap-1 opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    {copiedQuote ? (
                      <>
                        <Check className="w-3 h-3 text-[#E85D75]" />
                        <span>복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>대사 복사</span>
                      </>
                    )}
                  </button>
                </div>
                <blockquote className="font-serif-kr italic text-sm leading-relaxed text-[#E85D75]">
                  "{image.quote}"
                </blockquote>
              </div>
            )}

            {/* Context Details */}
            {image.caption && (
              <div className="space-y-1.5 border-t border-current/15 pt-3">
                <span className="text-[10px] uppercase tracking-wider opacity-50 block">
                  SITUATION NOTES
                </span>
                <p className="text-xs leading-relaxed opacity-85 select-text font-sans-kr">
                  {image.caption}
                </p>
              </div>
            )}

            {/* Metadata Footer */}
            <div className="pt-3 border-t border-current/15 text-[11px] opacity-60 space-y-1">
              <div>FILE: {image.src}</div>
              <div className="flex items-center justify-between">
                <span>클릭하여 1.75x 확대 / ESC로 닫기</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="hover:text-[#E85D75] underline cursor-pointer"
                >
                  [ 닫기 ]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
