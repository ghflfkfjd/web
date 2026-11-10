import React from 'react';
import { generateStandaloneHtml } from '../utils/standaloneHtmlGenerator';
import { Share2 } from 'lucide-react';

interface TopNavProps {
  mode: 'angel' | 'realist';
  onToggleMode: () => void;
  onOpenPrompt: () => void;
  onOpenShare: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  mode,
  onToggleMode,
  onOpenPrompt,
  onOpenShare
}) => {
  const handleDownloadStandalone = () => {
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
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 border-b ${
        mode === 'angel'
          ? 'bg-[#F6F1EA]/92 border-[#8A817A]/25 text-[#2A2624]'
          : 'bg-[#15161C]/92 border-[#7C7B85]/25 text-[#E7E2DA]'
      } backdrop-blur-xs`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-6">
        {/* Zone 1: Wordmark & Issue Number */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <a
            href="#"
            className={`text-sm sm:text-base font-bold tracking-tight hover:opacity-80 transition-opacity ${
              mode === 'angel' ? 'font-serif-kr' : 'font-mono'
            }`}
          >
            우리 반 천사
          </a>
          <span className="text-[11px] font-mono tracking-wider opacity-60">
            VOL.04 · 2-3
          </span>
        </div>

        {/* Zone 2: Editorial Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider opacity-75">
          <a
            href="#three-faces"
            className="hover:opacity-100 hover:text-[#E85D75] transition-colors whitespace-nowrap shrink-0"
          >
            01 / 세 개의 얼굴
          </a>
          <a
            href="#hud-ledger"
            className="hover:opacity-100 hover:text-[#E85D75] transition-colors whitespace-nowrap shrink-0"
          >
            02 / 상태창 장부
          </a>
          <a
            href="#belongings"
            className="hover:opacity-100 hover:text-[#E85D75] transition-colors whitespace-nowrap shrink-0"
          >
            03 / 소지품과 마요
          </a>
          <a
            href="#contact-sheet"
            className="hover:opacity-100 hover:text-[#E85D75] transition-colors whitespace-nowrap shrink-0"
          >
            04 / 35컷 인화지
          </a>
          <a
            href="#timeline"
            className="hover:opacity-100 hover:text-[#E85D75] transition-colors whitespace-nowrap shrink-0"
          >
            05 / 학사 일정
          </a>
        </nav>

        {/* Zone 3: Editorial Mode Toggle & Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenPrompt}
            title="시스템 프롬프트 원문 열람"
            className="hidden sm:inline-flex items-center px-2.5 py-1 text-[11px] font-mono tracking-wider border border-current/25 hover:border-current/70 transition-colors"
          >
            RAW 프롬프트
          </button>

          <button
            type="button"
            onClick={handleDownloadStandalone}
            title="독립 실행 단일 HTML 다운로드"
            className="hidden lg:inline-flex items-center px-2.5 py-1 text-[11px] font-mono tracking-wider border border-current/25 hover:border-current/70 transition-colors"
          >
            단일 HTML
          </button>

          <button
            type="button"
            onClick={onOpenShare}
            title="친구에게 링크 공유하기"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono tracking-wider border border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75]/10 transition-colors cursor-pointer"
          >
            <Share2 className="w-3 h-3" />
            <span>공유하기</span>
          </button>

          <button
            type="button"
            onClick={onToggleMode}
            aria-label={`모드 전환: 현재 ${mode === 'angel' ? '대외 천사 모드' : '본색 모드'}. 클릭 시 ${
              mode === 'angel' ? '본색 모드' : '대외 모드'
            }로 전환`}
            className={`px-3 py-1 text-[11px] font-mono tracking-wider border transition-all cursor-pointer ${
              mode === 'angel'
                ? 'border-[#2A2624]/60 bg-[#2A2624] text-[#F6F1EA] hover:bg-black'
                : 'border-[#E7E2DA]/60 bg-[#E7E2DA] text-[#15161C] hover:bg-white'
            }`}
          >
            {mode === 'angel' ? '[ MODE: 대외 ↔ 본색 ]' : '[ MODE: 본색 ↔ 대외 ]'}
          </button>
        </div>
      </div>
    </header>
  );
};
