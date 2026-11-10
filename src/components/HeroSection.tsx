import React, { useState, useEffect, useRef } from 'react';
import { HERO_ASSETS } from '../utils/characterImages';
import { LightboxImage } from './ImageLightboxModal';
import { Share2, ZoomIn } from 'lucide-react';

interface HeroSectionProps {
  mode: 'angel' | 'realist';
  isFlustered: boolean;
  onTriggerFlustered: () => void;
  onOpenLightbox: (image: LightboxImage) => void;
  onOpenShare: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  mode,
  isFlustered,
  onTriggerFlustered,
  onOpenLightbox,
  onOpenShare
}) => {
  const [imageError, setImageError] = useState(false);
  const [gazeProgress, setGazeProgress] = useState(0);
  const gazeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    setImageError(false);
  }, [mode, isFlustered]);

  const startGaze = () => {
    if (isFlustered) return;
    setGazeProgress(0);
    const start = Date.now();
    const duration = 3000;

    gazeIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setGazeProgress(progress);

      if (elapsed >= duration) {
        clearInterval(gazeIntervalRef.current!);
        gazeIntervalRef.current = null;
        setGazeProgress(0);
        onTriggerFlustered();
      }
    }, 50);
  };

  const cancelGaze = () => {
    if (gazeIntervalRef.current) {
      clearInterval(gazeIntervalRef.current);
      gazeIntervalRef.current = null;
    }
    setGazeProgress(0);
  };

  // Select the appropriate official illustration
  const imageSrc = isFlustered
    ? HERO_ASSETS.flustered
    : mode === 'angel'
    ? HERO_ASSETS.angel
    : HERO_ASSETS.realist;

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Editorial Top Kicker */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase mb-6 opacity-60">
          <span>00 / PROLOGUE</span>
          <span className="w-8 h-px bg-current"></span>
          <span>4월 방과 후 빈 교실</span>
        </div>

        {/* Asymmetrical 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold Typography & Story */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              {/* Refined Literary Stamp Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono tracking-wider border border-[#E85D75]/40 bg-[#E85D75]/5 text-[#E85D75] rounded-xs">
                <span>CLASSROOM FILE #001</span>
                <span>·</span>
                <span>2학년 3반 방과 후</span>
              </div>

              {/* Prettier Editorial Title Typography */}
              <h1 className="text-[2.75rem] sm:text-6xl lg:text-[5.5rem] tracking-[-0.03em] leading-[1.08]">
                <span
                  className={`block font-bold transition-colors ${
                    mode === 'angel'
                      ? 'font-serif-kr text-[#2A2624]'
                      : 'font-sans-kr text-[#E7E2DA]'
                  }`}
                >
                  우리 반 천사가
                </span>
                <span className="relative inline-block font-serif-kr font-extrabold text-[#E85D75] mt-1 sm:mt-2">
                  욕하는 걸 봐버렸다
                  <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#E85D75]/40 rounded-full" />
                </span>
              </h1>
            </div>

            {/* Editorial Column Prose matching exact Prologue scene */}
            <div className="space-y-3 max-w-md text-sm sm:text-base leading-[1.85] opacity-85">
              <p>
                나른한 주황빛 노을이 가라앉은 4월의 빈 교실. 머리를 집게핀으로 틀어 올린 세아가 칠판 앞에서 뻐근해진 턱을 주무르며 본색을 뱉던 순간— <em>“씨발, 지겨워 죽겠네.”</em>
              </p>
              <p className="text-xs sm:text-sm font-mono opacity-80 border-l-2 border-[#E85D75] pl-3 py-0.5">
                슬리퍼 스치는 소리에 고개가 꺾이는 0.5초의 찰나, 차갑던 눈동자 위로 소름 돋을 만큼 청초한 반달눈웃음이 완벽하게 덧씌워진다.
              </p>
            </div>

            {/* Post-it Taped Memo Note for Real-Time Speech */}
            <div className="relative pt-3 max-w-md">
              {/* Tape Strip */}
              <div className="absolute top-0 left-6 w-24 h-5 tape-strip -rotate-1 z-10"></div>

              <div
                className={`p-5 rounded-xs border transition-all duration-300 ${
                  isFlustered
                    ? 'border-[#E85D75] bg-[#E85D75]/5 text-[#E85D75]'
                    : mode === 'angel'
                    ? 'border-[#8A817A]/30 bg-white/70 text-[#2A2624]'
                    : 'border-[#7C7B85]/30 bg-[#1D1E26] text-[#E7E2DA]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono tracking-wider opacity-60 mb-2">
                  <span>
                    {isFlustered
                      ? 'MEMO: 알맹이 고장 반응'
                      : mode === 'angel'
                      ? 'MEMO: 대외 모드 발화 (0.5초 스냅 전환)'
                      : 'MEMO: 본색 혼잣말 발화'}
                  </span>
                  <span>PROLOGUE RECORDED</span>
                </div>

                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    mode === 'angel' ? 'font-serif-kr italic' : 'font-mono text-xs sm:text-sm'
                  }`}
                >
                  {isFlustered ? (
                    <span className="text-[#E85D75] font-semibold">
                      "그, 그게 아니라… 어디까지 들었는데?! 문 열 때부터야, 아님 혼잣말부터냐고?!"
                    </span>
                  ) : mode === 'angel' ? (
                    '"……어머. 거기에 계속 있었어? 혹시 지금 막 학교에 온 거야? 응? 너, 방금 내 말… 다 들은 건 아니지?"'
                  ) : (
                    '"…아 진짜 하루 종일 실실거렸더니 턱 관절 나갈 것 같네. 내 18년 이미지 값이 얼만데, 이걸 또 가성비 최악으로 쓰고 앉았어. 씨발, 지겨워 죽겠네."'
                  )}
                </p>
              </div>
            </div>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#hud-ledger"
                className={`inline-flex items-center justify-center px-6 py-3 text-xs font-mono tracking-wider transition-all border ${
                  mode === 'angel'
                    ? 'bg-[#2A2624] text-[#F6F1EA] border-[#2A2624] hover:bg-black'
                    : 'bg-[#E7E2DA] text-[#15161C] border-[#E7E2DA] hover:bg-white'
                }`}
              >
                [ 크랙(Crack) 대화 장부 열기 → ]
              </a>

              <button
                type="button"
                onClick={onTriggerFlustered}
                className="inline-flex items-center justify-center px-5 py-3 text-xs font-mono tracking-wider border border-current/30 hover:border-[#E85D75] hover:text-[#E85D75] transition-colors"
              >
                [ 칭찬해보기 (알맹이 소환) ]
              </button>

              <button
                type="button"
                onClick={onOpenShare}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-mono tracking-wider border border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75]/10 transition-colors cursor-pointer"
                title="친구 및 커뮤니티에 링크 공유하기"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>[ 링크 공유하기 ]</span>
              </button>
            </div>

            <div className="text-[11px] font-mono opacity-50">
              * 친구, 공범, 앙숙, 거래 상대. 어디로 갈지는 당신이 정한다.
            </div>
          </div>

          {/* Right Column: Taped Photo Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end pt-4 lg:pt-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Tape Strips on Photo Frame */}
              <div className="absolute -top-3 left-8 w-20 h-5 tape-strip -rotate-3 z-20"></div>
              <div className="absolute -top-3 right-8 w-20 h-5 tape-strip rotate-2 z-20"></div>

              {/* Tilted Photo Container */}
              <div
                onMouseEnter={startGaze}
                onMouseLeave={cancelGaze}
                onTouchStart={startGaze}
                onTouchEnd={cancelGaze}
                className={`relative aspect-3/4 w-full rounded-[2px] border transition-transform duration-500 overflow-hidden select-none cursor-pointer group ${
                  mode === 'angel'
                    ? 'bg-white border-[#8A817A]/35 shadow-xs -rotate-1'
                    : 'bg-[#1A1C24] border-[#7C7B85]/35 shadow-xs rotate-1'
                }`}
              >
                {/* Floating Zoom Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLightbox({
                      src: imageSrc,
                      title: isFlustered
                        ? '알맹이 고장 (거울 속 빨개진 귀 끝)'
                        : mode === 'angel'
                        ? '전교생의 천사 (대외 모드)'
                        : '극현실주의자 (본색 모드)',
                      subtitle: isFlustered
                        ? '칭찬에 10초간 정적 후 귀 끝 발색'
                        : mode === 'angel'
                        ? '2학년 3반 청초한 마스코트'
                        : '자판기 뒤 손익계산 거래자',
                      quote: isFlustered
                        ? '그, 그게 아니라… 아니, 뭐가 아닌데. 귀 안 빨갛거든?!'
                        : mode === 'angel'
                        ? '어머, 안녕? 복도에서 마주치니까 반갑네~ 오늘 날씨 정말 포근하다.'
                        : '…뭘 봐. 안경 흘렸냐? 1분 안에 볼일 없으면 사라져. 너랑 말 섞는 거 효율 제로니까.',
                      caption: isFlustered
                        ? '정곡을 찌르는 칭찬에 귀 끝부터 #E85D75로 물들며 말을 더듬는 세아의 본체.'
                        : mode === 'angel'
                        ? '단정한 교복, 목 끝까지 잠근 단추, 칼각 명찰. 전교생이 믿는 완벽한 천사.'
                        : '세상 모든 인간관계를 비용과 이익으로 계산하는 낡은 자판기 뒤의 본모습.',
                      fileTag: isFlustered
                        ? '1_거울.webp'
                        : mode === 'angel'
                        ? '1_흥미.webp'
                        : '1_경멸.webp'
                    });
                  }}
                  className="absolute top-2 right-2 z-30 p-1.5 bg-black/60 hover:bg-black/90 text-white rounded-xs transition-colors flex items-center gap-1 font-mono text-[10px] cursor-pointer shadow-xs"
                  title="클릭하여 고화질 확대 (1.75x 돋보기)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>확대</span>
                </button>

                {/* 3s Gaze Thin Progress Hairline */}
                {gazeProgress > 0 && (
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-[#E85D75] z-30 transition-all duration-75"
                    style={{ width: `${gazeProgress}%` }}
                  />
                )}

                {/* Ear Blushing Glow Effect (#E85D75 point color) */}
                {isFlustered && (
                  <div
                    className="absolute top-[28%] right-[26%] z-30 pointer-events-none flex items-center justify-center"
                    title="세아의 붉어진 귀 끝"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#E85D75] opacity-80 blur-[2px] animate-ear-glow"></div>
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-90"></div>
                  </div>
                )}

                {/* Image or Minimalist Paper Fallback */}
                {!imageError ? (
                  <img
                    src={imageSrc}
                    alt={`한세아 ${mode === 'angel' ? '대외 모드' : '본색 모드'}`}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full p-8 flex flex-col justify-between text-left">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">
                        {mode === 'angel' ? 'PORTRAIT NO. 01 / ANGEL' : 'PORTRAIT NO. 02 / REALIST'}
                      </span>
                      <h4
                        className={`text-lg font-bold ${
                          mode === 'angel' ? 'font-serif-kr' : 'font-mono'
                        }`}
                      >
                        {mode === 'angel' ? '대외 천사 일러스트' : '본색 극현실주의자'}
                      </h4>
                      <p className="text-xs font-mono opacity-60">
                        PATH: {imageSrc}
                      </p>
                    </div>

                    <div className="space-y-3 py-6 border-y border-current/15">
                      <p className="text-xs leading-relaxed opacity-75">
                        프로젝트 폴더 내 <code>{imageSrc}</code> 파일을 배치하면 자동으로 인화지 위에 렌더링됩니다.
                      </p>
                      <div className="text-[11px] font-mono text-[#E85D75]">
                        * 사진을 3초간 응시하면 알맹이 발동
                      </div>
                    </div>

                    <div className="text-[10px] font-mono opacity-40">
                      FILE SPEC: 3:4 PORTRAIT RATIO
                    </div>
                  </div>
                )}

                {/* Minimal Corner Photo Note */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white font-mono text-[10px] tracking-wider rounded-[1px]">
                  {mode === 'angel' ? 'MASK_PUBLIC' : 'REAL_PRIVATE'}
                </div>
              </div>

              {/* Caption Under Photo */}
              <div className="mt-3 text-center text-[11px] font-mono opacity-50">
                {isFlustered
                  ? '(!) 알맹이 모드 활성화됨 · 귀 끝 붉어짐 상태'
                  : 'FIG 01. 방과 후 교실의 기록 · 3초 응시 시 알맹이 발동'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
