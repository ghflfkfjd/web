import React, { useState } from 'react';
import { X, Copy, Check, Share2, ExternalLink } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'angel' | 'realist';
  onShowToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  mode,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Real live share URL (uses current origin or production Cloud Run URL)
  const shareUrl = typeof window !== 'undefined'
    ? (window.location.origin.includes('localhost')
        ? 'https://ais-pre-sqeostgtsxscjz2asdzkq4-424935075428.asia-east1.run.app'
        : window.location.origin + window.location.pathname)
    : 'https://ais-pre-sqeostgtsxscjz2asdzkq4-424935075428.asia-east1.run.app';

  const shareTitle = '우리 반 천사가 욕하는 걸 봐버렸다 - 한세아 쇼케이스';
  const shareText = '방과 후 빈 교실에서 시작되는 비밀. 전교생이 믿는 천사 고2 한세아의 진짜 얼굴을 만나보세요.';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      onShowToast('링크가 클립보드에 복사되었습니다! 친구나 커뮤니티에 공유해보세요.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        onShowToast('공유 창이 열렸습니다.');
      } catch (err) {
        // User cancelled or unsupported
      }
    } else {
      handleCopy();
    }
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${shareTitle}\n${shareText}`);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-xs border p-6 sm:p-8 shadow-2xl overflow-hidden ${
          mode === 'angel'
            ? 'bg-[#F6F1EA] text-[#2A2624] border-[#8A817A]/40'
            : 'bg-[#15161C] text-[#E7E2DA] border-[#7C7B85]/40'
        }`}
      >
        {/* Tape strips */}
        <div className="absolute -top-2 left-8 w-24 h-4 tape-strip -rotate-1 z-10"></div>
        <div className="absolute -top-2 right-8 w-24 h-4 tape-strip rotate-2 z-10"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-current/20 pb-3 mb-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#E85D75]" />
            <span id="share-modal-title" className="text-[#E85D75] font-bold tracking-wider uppercase">
              SHARE LINK // 링크 공유하기
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Story Intro */}
        <div className="space-y-4 text-left font-mono">
          <div className="space-y-1">
            <h3
              className={`text-xl font-bold tracking-tight ${
                mode === 'angel' ? 'font-serif-kr' : 'font-mono'
              }`}
            >
              "…너만 알고 있으라고 했잖아. 다른 애들한테 소문내려고?"
            </h3>
            <p className="text-xs opacity-60">
              세아의 비밀을 함께 지켜줄 공범이나 친구들에게 이 쇼케이스를 공유하세요.
            </p>
          </div>

          {/* Share Link Box with 1-click Copy */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] uppercase opacity-50 block font-bold">
              PUBLIC WEB LINK (누구나 바로 접속 가능)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                aria-label="공유 웹 링크"
                className={`flex-1 px-3 py-2.5 text-xs font-mono rounded-xs border select-all ${
                  mode === 'angel'
                    ? 'bg-white/90 border-[#8A817A]/40 text-[#2A2624]'
                    : 'bg-[#181922] border-[#7C7B85]/40 text-[#E7E2DA]'
                }`}
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 text-xs font-mono tracking-wider font-bold border border-[#E85D75] bg-[#E85D75] text-white hover:bg-[#d64a62] transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>복사됨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>링크 복사</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Share Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              type="button"
              onClick={handleNativeShare}
              className="py-2.5 px-3 border border-current/30 hover:border-current text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>모바일 공유 창</span>
            </button>
            <button
              type="button"
              onClick={handleTwitterShare}
              className="py-2.5 px-3 border border-current/30 hover:border-[#1DA1F2] hover:text-[#1DA1F2] text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>X (트위터) 공유</span>
            </button>
          </div>

          {/* Social Preview Note */}
          <div className="pt-4 border-t border-current/15 text-[11px] opacity-60 leading-relaxed">
            * 카카오톡, 디스코드, 슬랙 등에 링크를 붙여넣으면 한세아의 공식 일러스트와 요약 소개 카드가 자동으로 표시됩니다.
          </div>
        </div>
      </div>
    </div>
  );
};
