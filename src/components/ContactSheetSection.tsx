import React, { useState } from 'react';
import { CHARACTER_IMAGES, CharacterImageItem } from '../utils/characterImages';
import { X, Volume2, Check, Copy, ZoomIn } from 'lucide-react';
import { LightboxImage } from './ImageLightboxModal';

interface ContactSheetSectionProps {
  mode: 'angel' | 'realist';
  onOpenLightbox: (image: LightboxImage) => void;
}

export const ContactSheetSection: React.FC<ContactSheetSectionProps> = ({ mode, onOpenLightbox }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hero' | 'face' | 'status' | 'item' | 'archive'>('all');
  const [activeItem, setActiveItem] = useState<CharacterImageItem | null>(null);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const filteredItems = selectedCategory === 'all'
    ? CHARACTER_IMAGES
    : CHARACTER_IMAGES.filter((item) => item.category === selectedCategory);

  const handleCopyQuote = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2000);
    } catch {
      // Fallback
    }
  };

  const categories = [
    { id: 'all', label: '전체 인화 (ALL 35)' },
    { id: 'hero', label: '핵심 페르소나 (HERO)' },
    { id: 'face', label: '3개의 가면 (LAYERS)' },
    { id: 'status', label: '이완도 & 턱 상태 (HUD)' },
    { id: 'item', label: '소지품 & 거래 (ITEMS)' },
    { id: 'archive', label: '주변 인물 & 과거 (ARCHIVE)' }
  ];

  return (
    <section id="contact-sheet" className="py-24 sm:py-32 border-t border-current/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="mb-12 space-y-3 text-left">
          <div className="text-xs font-mono tracking-widest uppercase opacity-60">
            RECORD NO. 06 · DARKROOM CONTACT SHEET
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl tracking-tight ${
              mode === 'angel' ? 'font-serif-kr font-bold' : 'font-sans-kr font-bold'
            }`}
          >
            필름 밀착 인화지 아카이브
          </h2>
          <p className="text-xs sm:text-sm font-mono opacity-60 max-w-xl">
            방과 후 교실과 자판기 뒤편에서 포착된 한세아의 35가지 표정과 찰나의 기록.
          </p>
        </div>

        {/* Editorial Filter Strip */}
        <div className="flex flex-wrap items-center gap-2 border-b border-current/15 pb-4 mb-8 font-mono text-xs">
          <span className="text-[10px] uppercase opacity-50 mr-2">FILTER:</span>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id as any)}
              className={`px-3 py-1 border transition-colors cursor-pointer text-[11px] ${
                selectedCategory === c.id
                  ? 'border-[#E85D75] text-[#E85D75] font-bold bg-[#E85D75]/5'
                  : 'border-current/20 hover:border-current/60 opacity-70'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Contact Sheet Grid (Strict darkroom borders, 1px rules, film-strip numbers) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredItems.map((item, index) => {
            const isSelected = activeItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group relative p-2 border transition-all cursor-pointer rounded-[1px] ${
                  isSelected
                    ? 'border-[#E85D75] ring-1 ring-[#E85D75]'
                    : 'border-current/20 hover:border-current/60 bg-current/3'
                }`}
              >
                {/* Film Edge Numbering */}
                <div className="flex items-center justify-between font-mono text-[9px] opacity-50 mb-1">
                  <span>#{String(index + 1).padStart(2, '0')}</span>
                  <span className="truncate max-w-[80px]">{item.fileTag}</span>
                </div>

                {/* Aspect 3/4 Image Slot */}
                <div className="aspect-3/4 w-full overflow-hidden bg-black/10 relative rounded-[1px]">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.mood === 'flustered' && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E85D75]" title="알맹이 고장 반응" />
                  )}
                </div>

                {/* Caption Strip */}
                <div className="mt-2 text-left space-y-0.5">
                  <div className="text-[11px] font-mono font-bold truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] font-mono opacity-50 truncate">
                    {item.quote}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Proof Loupe Modal (Detail Inspection) */}
        {activeItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="proof-loupe-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-text"
          >
            <div
              className={`relative max-w-2xl w-full border p-6 sm:p-8 rounded-xs shadow-2xl overflow-hidden ${
                mode === 'angel'
                  ? 'bg-[#F6F1EA] text-[#2A2624] border-[#8A817A]/40'
                  : 'bg-[#15161C] text-[#E7E2DA] border-[#7C7B85]/40'
              }`}
            >
              {/* Tape Strips */}
              <div className="absolute -top-2 left-10 w-24 h-4 tape-strip -rotate-1 z-10"></div>
              <div className="absolute -top-2 right-10 w-24 h-4 tape-strip rotate-2 z-10"></div>

              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-current/20 pb-3 mb-6 text-xs font-mono">
                <span id="proof-loupe-title" className="text-[#E85D75] font-bold tracking-wider">
                  PROOF LOUPE // {activeItem.fileTag}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="p-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="닫기"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start text-left">
                {/* Enlarged Photo with Full Zoom Lightbox */}
                <div className="sm:col-span-5 flex justify-center">
                  <div
                    onClick={() => {
                      onOpenLightbox({
                        src: activeItem.src,
                        title: activeItem.title,
                        quote: activeItem.quote,
                        caption: activeItem.context,
                        fileTag: activeItem.fileTag
                      });
                      setActiveItem(null);
                    }}
                    className="w-full max-w-[240px] aspect-3/4 border border-current/25 rounded-[1px] overflow-hidden bg-black/10 shadow-sm cursor-zoom-in group relative"
                    title="클릭하여 1.75x 전면 확대"
                  >
                    <img
                      src={activeItem.src}
                      alt={activeItem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-xs flex items-center gap-1">
                      <ZoomIn className="w-3 h-3" />
                      <span>전체 확대</span>
                    </div>
                  </div>
                </div>

                {/* Story Memo */}
                <div className="sm:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 block">
                      SCENE OBSERVATION
                    </span>
                    <h3
                      className={`text-xl font-bold tracking-tight ${
                        mode === 'angel' ? 'font-serif-kr' : 'font-mono'
                      }`}
                    >
                      {activeItem.title}
                    </h3>
                  </div>

                  {/* Representative Speech Quote */}
                  <div
                    className={`p-4 border rounded-xs ${
                      activeItem.mood === 'flustered'
                        ? 'border-[#E85D75] bg-[#E85D75]/5 text-[#E85D75]'
                        : 'border-current/15 bg-current/3'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono opacity-60 uppercase">
                        RECORDED LINE
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyQuote(activeItem.quote)}
                        className="inline-flex items-center gap-1 text-[10px] font-mono opacity-60 hover:opacity-100 transition-opacity"
                        title="대사 복사"
                      >
                        {copiedQuote ? (
                          <>
                            <Check className="w-3 h-3 text-[#E85D75]" />
                            <span className="text-[#E85D75]">복사됨</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>복사</span>
                          </>
                        )}
                      </button>
                    </div>
                    <blockquote className="font-serif-kr italic text-sm leading-relaxed">
                      "{activeItem.quote}"
                    </blockquote>
                  </div>

                  {/* Context Narrative */}
                  <p className="text-xs leading-relaxed opacity-80">
                    {activeItem.context}
                  </p>

                  <div className="pt-3 border-t border-current/10 flex items-center justify-between text-[11px] font-mono opacity-60">
                    <span>PATH: {activeItem.src}</span>
                    <button
                      type="button"
                      onClick={() => setActiveItem(null)}
                      className="hover:text-[#E85D75] underline cursor-pointer"
                    >
                      [ 닫기 ESC ]
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
