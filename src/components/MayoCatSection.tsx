import React, { useState } from 'react';
import { MAYO_CAT_IMAGE } from '../utils/characterImages';
import { LightboxImage } from './ImageLightboxModal';

interface MayoCatSectionProps {
  mode: 'angel' | 'realist';
  onOpenLightbox: (image: LightboxImage) => void;
}

export const MayoCatSection: React.FC<MayoCatSectionProps> = ({ mode, onOpenLightbox }) => {
  const [petCount, setPetCount] = useState(0);

  const handlePet = () => {
    setPetCount((prev) => prev + 1);
  };

  const getDialogue = () => {
    if (petCount >= 8) {
      return {
        speaker: '세아 (당황도 100%)',
        text: '"…야! 너 언제부터 옥상 문 뒤에 서 있었냐?! 못 본 걸로 해. 마요야, 일단 츄르 먹고 있어… 아니, 쟨 쳐다보지 말고!"'
      };
    }
    if (petCount >= 4) {
      return {
        speaker: '세아 (독백)',
        text: '"우리 마요~ 오늘도 귀엽네? 넌 시험도 없고 가식 미소도 안 지어도 돼서 부럽다. 자, 닭가슴살 간식."'
      };
    }
    return {
      speaker: '마요 (고양이)',
      text: '"골골골… (실외기 위에서 봄볕을 받으며 기분 좋게 그루밍을 하고 있습니다.)"'
    };
  };

  const dialogue = getDialogue();

  return (
    <section className="py-24 sm:py-32 border-t border-current/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-14 space-y-3 text-left">
          <div className="text-xs font-mono tracking-widest uppercase opacity-60">
            RECORD NO. 04 · ROOFTOP RESIDENT
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl tracking-tight ${
              mode === 'angel' ? 'font-serif-kr font-bold' : 'font-sans-kr font-bold'
            }`}
          >
            옥상의 치즈태비, 마요
          </h2>
          <p className="text-xs sm:text-sm font-mono opacity-60 max-w-xl">
            세아가 유일하게 가식 계산을 멈추고 혀 짧은 소리를 내는 무방비의 대상.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start border-t border-current/20 pt-8">
          {/* Story Column */}
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#E85D75] tracking-wider uppercase font-bold">
                OFFICIAL POSITION VS HIDDEN REALITY
              </span>
              <p className="text-sm sm:text-base leading-[1.8] opacity-85">
                본관 옥상 고장 난 철문 열쇠를 몰래 복사해둔 세아의 유일한 피난처.
                남들 앞에서는 <strong>"단백질과 털로 이루어진 효율 제로의 털뭉치"</strong>라며 차갑게 선을 긋지만,
                둘만 남으면 <strong>"마요야~ 배고팠지? 우리 마요 일루 와~"</strong> 하며 옥타브가 한껏 높아집니다.
              </p>
            </div>

            {/* Live Observation Log Box */}
            <div
              className={`p-5 rounded-xs border text-left font-mono text-xs space-y-2 ${
                mode === 'angel'
                  ? 'bg-white/70 border-[#8A817A]/30 text-[#2A2624]'
                  : 'bg-[#1C1E27] border-[#7C7B85]/30 text-[#E7E2DA]'
              }`}
            >
              <div className="flex items-center justify-between opacity-50 text-[10px] pb-1 border-b border-current/10">
                <span>LOG // {dialogue.speaker}</span>
                <span>PET_COUNT: {petCount}</span>
              </div>
              <p className="font-serif-kr italic text-sm leading-relaxed opacity-90">
                {dialogue.text}
              </p>
            </div>
          </div>

          {/* Action Column with Taped Rooftop Proof Photo */}
          <div className="md:col-span-4 p-6 border border-current/15 rounded-xs space-y-4 font-mono text-xs">
            <span className="text-[10px] tracking-wider uppercase opacity-50 block">
              ROOFTOP INTERACTION
            </span>

            {/* Taped Photo Card with Zoomable Lightbox */}
            <div
              onClick={() =>
                onOpenLightbox({
                  src: MAYO_CAT_IMAGE,
                  title: '옥상의 치즈태비 마요',
                  subtitle: '실외기 위에서 벚꽃비를 즐기는 상주 묘',
                  quote: dialogue.text,
                  caption:
                    '본관 옥상 기와와 실외기 위에서 봄볕을 즐기는 치즈태비 길고양이 마요. 세아가 유일하게 가식 계산을 멈추고 혀 짧은 소리를 내는 무방비의 대상.',
                  fileTag: '___1_1a56e54a.webp'
                })
              }
              className="relative pt-2 flex flex-col items-center cursor-zoom-in group select-none"
              title="클릭하여 확대 (1.75x 돋보기)"
            >
              <div className="absolute top-0 w-16 h-3.5 tape-strip -rotate-1 z-10"></div>
              <div className="w-36 aspect-3/4 border border-current/25 rounded-[1px] overflow-hidden bg-black/10 shadow-xs group-hover:border-[#E85D75] transition-colors relative">
                <img
                  src={MAYO_CAT_IMAGE}
                  alt="옥상의 치즈태비 마요"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/70 text-white px-1.5 py-0.5 rounded-xs flex items-center gap-0.5">
                  확대 ⌕
                </span>
              </div>
              <div className="text-[9px] font-mono opacity-60 text-center mt-1.5 group-hover:text-[#E85D75] transition-colors">
                PROOF: ___1_1a56e54a.webp (클릭 시 확대)
              </div>
            </div>

            <div className="space-y-1 text-center">
              <div className="text-sm font-bold">마요 (치즈태비)</div>
              <div className="text-[11px] opacity-60">옥상 실외기 상주 묘</div>
            </div>

            <button
              type="button"
              onClick={handlePet}
              className="w-full py-2.5 px-4 text-xs font-mono tracking-wider border border-current hover:bg-current hover:text-[#F6F1EA] dark:hover:text-[#15161C] transition-colors cursor-pointer"
            >
              [ 쓰다듬기 (+{petCount}) ]
            </button>

            <p className="text-[10px] opacity-50 leading-relaxed text-center">
              * 쓰다듬기 4회 / 8회 도달 시 세아의 당황 대사가 해금됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
