import React, { useState, useEffect } from 'react';
import {
  getMaskStage,
  getPretenseStatus,
  getNotebookProgress,
  PERSPECTIVES,
  getPerspectiveDialogue
} from '../utils/characterLogic';
import { Copy, Check, RotateCcw } from 'lucide-react';
import { getHudReactionImage } from '../utils/characterImages';
import { LightboxImage } from './ImageLightboxModal';

interface StatusHudSectionProps {
  mode: 'angel' | 'realist';
  isFlustered: boolean;
  onOpenLightbox: (image: LightboxImage) => void;
}

export const StatusHudSection: React.FC<StatusHudSectionProps> = ({
  mode,
  isFlustered,
  onOpenLightbox
}) => {
  const [relaxation, setRelaxation] = useState(0); // Prologue starting relaxation = 0
  const [smileCount, setSmileCount] = useState(12); // Initial jaw condition = 뻐근
  const [selectedGazeId, setSelectedGazeId] = useState('accomplice');
  const [typedDialogue, setTypedDialogue] = useState('');
  const [hudCopied, setHudCopied] = useState(false);

  const stageData = getMaskStage(relaxation);
  const pretenseData = getPretenseStatus(smileCount);
  const notebookCount = getNotebookProgress(relaxation);
  const reactionPortrait = getHudReactionImage(relaxation, smileCount, isFlustered);

  const currentGazeObj = PERSPECTIVES.find((p) => p.id === selectedGazeId) || PERSPECTIVES[0];
  const activeModeKey = isFlustered ? 'flustered' : mode;
  const targetQuote = isFlustered
    ? '그, 그게 아니라… 어디까지 들었는데?! 문 열 때부터야, 아님 혼잣말부터냐고?!'
    : selectedGazeId === 'accomplice'
    ? mode === 'angel'
      ? '……어머. 거기에 계속 있었어? 혹시 지금 막 학교에 온 거야? 응? 너, 방금 내 말… 다 들은 건 아니지?'
      : '…아 진짜 하루 종일 실실거렸더니 턱 관절 나갈 것 같네. 내 18년 이미지 값이 얼만데, 이걸 또 가성비 최악으로 쓰고 앉았어. 씨발, 지겨워 죽겠네.'
    : getPerspectiveDialogue(selectedGazeId, activeModeKey);

  // Typing effect when quote changes
  useEffect(() => {
    let index = 0;
    setTypedDialogue('');
    const timer = setInterval(() => {
      index++;
      if (index <= targetQuote.length) {
        setTypedDialogue(targetQuote.slice(0, index));
      } else {
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [targetQuote]);

  // Exact 5-Line HUD Text formatted per system prompt & user prologue
  const hud5Lines = `📅4/8(수) 17:42 · 맑음 · 벚꽃 만개
📍Ⓤ 2-3반 교실 뒷문 | Ⓒ 2-3반 교실 | 🏫교실
🎭 이완도 ${relaxation}/100 [${stageData.label}] · 시선 ${currentGazeObj.name}
💆 턱 상태 [${pretenseData.jawCondition}] · 🩷수첩 [${notebookCount}/3]
👚 교복(본색) · 집게핀, 풀린 넥타이 · ${relaxation > 60 ? '느슨한 자세' : '굳은 자세'}`;

  const handleCopyHud = async () => {
    try {
      await navigator.clipboard.writeText(hud5Lines);
      setHudCopied(true);
      setTimeout(() => setHudCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const tickPositions = [
    { val: 0, label: '0 철벽' },
    { val: 20, label: '20' },
    { val: 40, label: '40 간보기' },
    { val: 60, label: '60 균열' },
    { val: 80, label: '80 느슨' },
    { val: 100, label: '100 무장해제' }
  ];

  return (
    <section id="hud-ledger" className="py-24 sm:py-32 border-t border-current/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="mb-14 space-y-3 text-left">
          <div className="text-xs font-mono tracking-widest uppercase opacity-60">
            RECORD NO. 02 · REAL-TIME SYSTEM HUD & LEDGER
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl tracking-tight ${
              mode === 'angel' ? 'font-serif-kr font-bold' : 'font-sans-kr font-bold'
            }`}
          >
            상태창 체험: 회계 장부와 이완도
          </h2>
          <p className="text-xs sm:text-sm font-mono opacity-60 max-w-xl">
            세아의 감정 소모와 방어선 붕괴도를 회계 장부의 괘선과 행으로 기록하는 인터랙티브 HUD.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Authentic Accounting Ledger UI */}
          <div className="lg:col-span-7 space-y-10">
            {/* Custom Minimalist 1px Hairline Slider */}
            <div className="space-y-6 pt-2">
              <div className="flex items-baseline justify-between border-b border-current/20 pb-2">
                <span className="text-xs font-mono tracking-widest uppercase">
                  SLIDER // 가면 이완도 (0~100)
                </span>
                <span className="text-sm font-mono font-bold text-[#E85D75]">
                  {relaxation}/100 [{stageData.label}]
                </span>
              </div>

              {/* Bespoke Line & Dot Slider */}
              <div className="relative pt-6 pb-4">
                {/* Tick labels */}
                <div className="relative w-full h-4 mb-2">
                  {tickPositions.map((t) => (
                    <button
                      key={t.val}
                      type="button"
                      onClick={() => setRelaxation(t.val)}
                      className="absolute -translate-x-1/2 text-[10px] font-mono opacity-50 hover:opacity-100 hover:text-[#E85D75] transition-opacity cursor-pointer"
                      style={{ left: `${t.val}%` }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* 1px Track Line */}
                <div className="relative h-px w-full bg-current/25 my-3">
                  {/* Active highlight segment */}
                  <div
                    className="absolute top-0 left-0 h-px bg-[#E85D75]"
                    style={{ width: `${relaxation}%` }}
                  />

                  {/* Discrete tick marks */}
                  {[0, 20, 40, 60, 80, 100].map((val) => (
                    <div
                      key={val}
                      className="absolute -top-1 w-px h-2 bg-current/30"
                      style={{ left: `${val}%` }}
                    />
                  ))}

                  {/* Draggable Indicator Dot */}
                  <div
                    className="absolute -top-1.5 w-3 h-3 rounded-full bg-[#E85D75] -translate-x-1/2 cursor-pointer shadow-xs"
                    style={{ left: `${relaxation}%` }}
                  />
                </div>

                {/* Invisible native range input for accessibility */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={relaxation}
                  onChange={(e) => setRelaxation(Number(e.target.value))}
                  aria-label="가면 이완도 슬라이더"
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-full z-10"
                />
              </div>

              {/* Step Presets */}
              <div className="flex items-center gap-2 pt-1 font-mono text-[11px] opacity-75">
                <span className="text-[10px] uppercase opacity-50 mr-1">PRESET:</span>
                {[
                  { val: 8, label: '시작 8' },
                  { val: 25, label: '간보기 25' },
                  { val: 50, label: '균열 50' },
                  { val: 75, label: '느슨 75' },
                  { val: 95, label: '무장해제 95' }
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => setRelaxation(s.val)}
                    className={`px-2 py-0.5 border text-[10px] transition-colors ${
                      relaxation === s.val
                        ? 'border-[#E85D75] text-[#E85D75] font-bold'
                        : 'border-current/20 hover:border-current/50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accounting Rows (Left label column, Right value column, 1px hairlines) */}
            <div className="space-y-0 text-xs font-mono">
              <div className="py-2.5 border-b border-current/20 flex justify-between items-center opacity-60 text-[10px] uppercase tracking-wider">
                <span>METRIC ITEM</span>
                <span>CURRENT VALUE / LOG</span>
              </div>

              <div className="py-3.5 border-b border-current/15 flex justify-between items-center">
                <span className="opacity-60">DISTANCE // 허용 거리</span>
                <span className="font-bold">{stageData.distance}</span>
              </div>

              <div className="py-3.5 border-b border-current/15 flex justify-between items-center">
                <span className="opacity-60">HEART_RATE // 심박수</span>
                <span className="font-bold text-[#E85D75]">{stageData.heartRate}</span>
              </div>

              <div className="py-3.5 border-b border-current/15 flex justify-between items-center">
                <span className="opacity-60">ATTIRE // 의상 및 태도</span>
                <span className="text-right max-w-xs">{stageData.outfit}</span>
              </div>

              <div className="py-3.5 border-b border-current/15 flex justify-between items-center">
                <span className="opacity-60">NOTEBOOK // 저주 수첩 해금</span>
                <span className="font-bold">
                  {notebookCount}/3 {notebookCount >= 3 ? '(완전 해금)' : '(이완도 40·60·80 조건)'}
                </span>
              </div>

              <div className="py-3.5 border-b border-current/15 flex justify-between items-center">
                <span className="opacity-60">WHISPER // 내부 독백</span>
                <span className="italic opacity-85 text-right font-serif-kr">
                  "{stageData.whisper}"
                </span>
              </div>
            </div>

            {/* Handwritten Memo Box for Live Typed Dialogue */}
            <div className="relative pt-4">
              <div className="absolute top-0 left-6 w-20 h-4 tape-strip rotate-1 z-10"></div>
              <div
                className={`p-5 rounded-xs border text-left ${
                  mode === 'angel'
                    ? 'bg-white/80 border-[#8A817A]/30 text-[#2A2624]'
                    : 'bg-[#1C1E27] border-[#7C7B85]/30 text-[#E7E2DA]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono opacity-50 mb-2">
                  <span>POST-IT MEMO // 세아의 실시간 메모</span>
                  <span>LIVE TYPING</span>
                </div>
                <p className="text-sm sm:text-base font-serif-kr italic leading-relaxed min-h-[48px]">
                  "{typedDialogue}"
                  <span className="inline-block w-1.5 h-4 bg-[#E85D75] ml-1 animate-pulse align-middle" />
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Exact 5-Line HUD & Pretense Ledger */}
          <div className="lg:col-span-5 space-y-8">
            {/* Live Facial Reaction Portrait */}
            <div className="relative pt-3">
              <div className="absolute top-0 left-6 w-20 h-4 tape-strip -rotate-1 z-10"></div>
              <div
                className={`p-4 rounded-xs border flex items-center gap-4 ${
                  mode === 'angel'
                    ? 'bg-white/90 border-[#8A817A]/30 text-[#2A2624]'
                    : 'bg-[#181922] border-[#7C7B85]/30 text-[#E7E2DA]'
                }`}
              >
                <div
                  onClick={() =>
                    onOpenLightbox({
                      src: reactionPortrait.src,
                      title: `상태창 실시간 표정: ${reactionPortrait.label}`,
                      subtitle: `가면 이완도 ${relaxation}/100 · 턱 상태 [${pretenseData.jawCondition}]`,
                      quote: targetQuote,
                      caption:
                        pretenseData.badgeLevel === 'murderous'
                          ? '가식 미소 40회 누적 한계 돌파. 안면 근육 경련 및 살의 99% 억지 미소 상태.'
                          : `현재 이완도 ${relaxation}/100 [${stageData.label}] 구간의 세아 관찰 기록.`,
                      fileTag: reactionPortrait.tag
                    })
                  }
                  className="w-20 sm:w-24 aspect-3/4 shrink-0 rounded-[1px] border border-current/20 overflow-hidden bg-black/10 shadow-xs cursor-zoom-in group hover:border-[#E85D75] transition-colors relative"
                  title="클릭하여 고화질 확대"
                >
                  <img
                    src={reactionPortrait.src}
                    alt={reactionPortrait.label}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-0.5 right-0.5 text-[8px] font-mono bg-black/70 text-white px-1 rounded-xs">
                    확대 ⌕
                  </span>
                </div>
                <div className="space-y-1 text-left min-w-0">
                  <span className="text-[10px] font-mono tracking-wider text-[#E85D75] font-bold block">
                    LIVE REACTION // {reactionPortrait.tag}
                  </span>
                  <div className="text-sm font-bold font-mono truncate">
                    {reactionPortrait.label}
                  </div>
                  <p className="text-[11px] font-mono opacity-60 leading-relaxed">
                    {pretenseData.badgeLevel === 'murderous'
                      ? '미소 40회 누적. 저주 수첩 작성 임계치 돌파.'
                      : `이완도 ${relaxation}/100 구간의 실시간 관찰 기록.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Exact 5-Line HUD Output per System Prompt */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-current/20 pb-2">
                <span className="text-xs font-mono tracking-widest uppercase">
                  PROMPT HUD OUTPUT (TOP 5 LINES)
                </span>
                <button
                  type="button"
                  onClick={handleCopyHud}
                  className="inline-flex items-center gap-1 text-[11px] font-mono opacity-60 hover:opacity-100 hover:text-[#E85D75] transition-colors"
                >
                  {hudCopied ? (
                    <>
                      <Check className="w-3 h-3 text-[#E85D75]" />
                      <span className="text-[#E85D75]">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>HUD 복사</span>
                    </>
                  )}
                </button>
              </div>

              {/* Exact 5 lines block */}
              <div
                className={`p-4 rounded-xs border font-mono text-xs leading-relaxed select-text ${
                  mode === 'angel'
                    ? 'bg-stone-100/90 border-[#8A817A]/30 text-[#2A2624]'
                    : 'bg-[#121318] border-[#7C7B85]/30 text-[#E7E2DA]'
                }`}
              >
                <pre className="whitespace-pre-wrap font-mono text-[11px] sm:text-xs">
                  {hud5Lines}
                </pre>
              </div>
              <p className="text-[10px] font-mono opacity-50">
                * 매 턴 최상단 5줄 출력 규격을 100% 재현한 라이브 데이터입니다.
              </p>
            </div>

            {/* Pretense Ledger (가식 장부 & 턱 상태) */}
            <div className="space-y-4 border-t border-current/15 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono tracking-wider uppercase font-bold">
                    LEDGER // 오늘의 가식 장부
                  </h4>
                  <p className="text-[11px] font-mono opacity-50">
                    사회생활용 가식 미소 누적 카운트
                  </p>
                </div>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 border ${
                    pretenseData.badgeLevel === 'murderous'
                      ? 'border-[#E85D75] text-[#E85D75] font-bold'
                      : pretenseData.badgeLevel === 'jaw_drop'
                      ? 'border-amber-500 text-amber-500'
                      : 'border-current/30 opacity-70'
                  }`}
                >
                  턱: {pretenseData.jawCondition}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-2">
                <div className="space-y-0.5">
                  <div className="text-3xl font-mono font-bold tracking-tight text-[#E85D75]">
                    {smileCount}
                    <span className="text-xs font-normal opacity-60 ml-1">회 누적</span>
                  </div>
                  <div className="text-[10px] font-mono opacity-50">
                    0~9 평온 / 10~24 뻐근 / 25~39 경련 / 40+ 탈골 위기
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSmileCount((c) => c + 1)}
                    className="px-3 py-1.5 text-xs font-mono tracking-wider border border-current hover:bg-current hover:text-[#F6F1EA] dark:hover:text-[#15161C] transition-colors"
                  >
                    +1 미소
                  </button>
                  <button
                    type="button"
                    onClick={() => setSmileCount(0)}
                    title="초기화"
                    aria-label="가식 장부 0회로 초기화"
                    className="p-1.5 border border-current/25 hover:border-current opacity-60 hover:opacity-100 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs font-mono opacity-70 border-t border-current/10 pt-2 leading-relaxed">
                {pretenseData.description}
              </p>
            </div>

            {/* Gaze Attitude Selector (시선 선택) */}
            <div className="space-y-3 border-t border-current/15 pt-6">
              <span className="text-xs font-mono tracking-wider uppercase block opacity-60">
                ATTITUDE // 이번 턴의 시선 선택
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {PERSPECTIVES.map((p) => {
                  const isSelected = selectedGazeId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedGazeId(p.id)}
                      className={`p-2 text-left border transition-colors ${
                        isSelected
                          ? 'border-[#E85D75] text-[#E85D75] font-bold'
                          : 'border-current/20 hover:border-current/60 opacity-70'
                      }`}
                    >
                      <div className="text-[10px] opacity-60">[{p.code}]</div>
                      <div className="mt-0.5">{p.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
