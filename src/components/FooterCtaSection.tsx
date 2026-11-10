import React from 'react';
import { generateStandaloneHtml } from '../utils/standaloneHtmlGenerator';
import { Share2 } from 'lucide-react';

interface FooterCtaSectionProps {
  mode: 'angel' | 'realist';
  onOpenPrompt: () => void;
  onOpenShare: () => void;
}

export const FooterCtaSection: React.FC<FooterCtaSectionProps> = ({
  mode,
  onOpenPrompt,
  onOpenShare
}) => {
  const handleDownload = () => {
    const htmlContent = generateStandaloneHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'han_sea_editorial.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <footer id="crack-chat" className="py-24 sm:py-32 border-t border-current/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-10">
        <div className="space-y-4">
          <div className="text-xs font-mono tracking-widest uppercase opacity-60">
            06 / EPILOGUE & INVITATION
          </div>
          <h2
            className={`text-3xl sm:text-5xl tracking-tight ${
              mode === 'angel' ? 'font-serif-kr font-bold' : 'font-sans-kr font-bold'
            }`}
          >
            세아는 지금 당신을 계산하는 중입니다
          </h2>
          <p className="text-sm sm:text-base opacity-75 max-w-md mx-auto leading-relaxed">
            친구, 공범, 앙숙, 거래 상대.
            <br />
            어디로 갈지는 당신이 정한다.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="#hud-ledger"
            className={`w-full sm:w-auto px-6 py-3.5 text-xs font-mono tracking-wider border transition-all ${
              mode === 'angel'
                ? 'bg-[#2A2624] text-[#F6F1EA] border-[#2A2624] hover:bg-black'
                : 'bg-[#E7E2DA] text-[#15161C] border-[#E7E2DA] hover:bg-white'
            }`}
          >
            [ 크랙(Crack)에서 한세아와 대화하기 → ]
          </a>

          <button
            type="button"
            onClick={onOpenPrompt}
            className="w-full sm:w-auto px-5 py-3.5 text-xs font-mono tracking-wider border border-current/30 hover:border-current transition-colors"
          >
            [ RAW 프롬프트 열람 ]
          </button>

          <button
            type="button"
            onClick={onOpenShare}
            className="w-full sm:w-auto px-5 py-3.5 text-xs font-mono tracking-wider border border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75]/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>[ 링크 공유하기 ]</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-3.5 text-xs font-mono tracking-wider border border-current/30 hover:border-current transition-colors"
          >
            [ 단일 HTML 파일 다운로드 ]
          </button>
        </div>

        <div className="pt-8 text-[11px] font-mono opacity-40 space-y-1">
          <p>우리 반 천사가 욕하는 걸 봐버렸다 · 고2 한세아 에디토리얼 쇼케이스</p>
          <p>© 2026 Han Se-ah Character Showcase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
