import React, { useState } from 'react';
import { RAW_SYSTEM_PROMPT } from '../utils/characterLogic';
import { Copy, Check, X } from 'lucide-react';

interface RawPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'angel' | 'realist';
}

export const RawPromptModal: React.FC<RawPromptModalProps> = ({ isOpen, onClose, mode }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(RAW_SYSTEM_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div
        className={`w-full max-w-2xl max-h-[85vh] flex flex-col rounded-sm border shadow-2xl overflow-hidden ${
          mode === 'angel'
            ? 'bg-[#F6F1EA] text-[#2A2624] border-[#8A817A]/40'
            : 'bg-[#15161C] text-[#E7E2DA] border-[#7C7B85]/40'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-current/15">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">
              SPECIFICATION DOCUMENT
            </span>
            <h2 id="prompt-modal-title" className="text-sm font-bold font-mono">
              한세아 (韓世雅) 메인 시스템 프롬프트 RAW
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-mono font-medium border border-current/20 hover:border-current/60 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#E85D75]" />
                  <span className="text-[#E85D75]">복사 완료</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 opacity-60" />
                  <span>프롬프트 복사</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="p-1.5 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs leading-relaxed whitespace-pre-wrap select-text opacity-90">
          {RAW_SYSTEM_PROMPT}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-current/15 text-[11px] font-mono text-right opacity-60">
          CRACK SYSTEM ENGINE · ESC 키 또는 닫기 버튼으로 종료
        </div>
      </div>
    </div>
  );
};
