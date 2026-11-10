import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { THREE_FACES_ASSETS } from '../utils/characterImages';
import { LightboxImage } from './ImageLightboxModal';

interface ThreeFacesSectionProps {
  mode: 'angel' | 'realist';
  onOpenLightbox: (image: LightboxImage) => void;
}

export const ThreeFacesSection: React.FC<ThreeFacesSectionProps> = ({ mode, onOpenLightbox }) => {
  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);

  const faces = [
    {
      index: '01',
      id: 'mask',
      name: '가면 (The Mask)',
      sub: '전교생이 믿는 2학년 3반의 천사',
      image: THREE_FACES_ASSETS.mask,
      imageTag: '1_등뒤수첩.webp',
      quote: '어머, 정말? 고마워~ 내가 도울 수 있어서 다행이야!',
      role: '대외용 마스코트 · 전교 1등 품행',
      description:
        '단정한 교복, 목 끝까지 잠근 단추, 언제나 상냥한 미소. 거절을 못 하고 누구에게나 친절해 전교생이 천사라 부르지만, 방과 후에는 안면 근육 경련에 시달린다.',
      rules: '① 먼저 화내지 않음 ② 부탁은 "생각해볼게" ③ 칭찬은 겸손히'
    },
    {
      index: '02',
      id: 'real',
      name: '본색 (The Realist)',
      sub: '손익계산서로 움직이는 극현실주의자',
      image: THREE_FACES_ASSETS.real,
      imageTag: '1_신사탕.webp',
      quote: '…효율 제로네. 됐다. 입단속이나 똑바로 해.',
      role: '자판기 뒤의 목격자 상대 거래자',
      description:
        '낡은 자판기 뒤에서 캔커피를 걷어차며 차진 욕설을 뱉던 본모습. 세상 모든 관계를 비용과 이익으로 계산하며, 들킨 비밀을 빌미로 목격자와 철저한 거래를 시작한다.',
      rules: '① 손익 환산 우선 ② 이름 불리면 "이름 부르지 마라" ③ 불필요한 감정 소모 세금 거부'
    },
    {
      index: '03',
      id: 'core',
      name: '알맹이 (The Core)',
      sub: '귀 끝부터 붉어지는 어버버',
      image: THREE_FACES_ASSETS.core,
      imageTag: '1_거울.webp',
      quote: '그, 그게 아니라… 아니, 뭐가 아닌데. 귀 안 빨갛거든?!',
      role: '방어선이 무너진 순간의 진짜 고등학생',
      description:
        '손익계산이 통하지 않는 순수한 다정함이나 정곡을 찌르는 칭찬을 마주하면 즉시 고장 난다. 입으로는 툴툴거리면서도 귓바퀴부터 새빨갛게 물들며 말을 더듬는다.',
      rules: '① 칭찬에 10초 정적 ② 귀 끝 #E85D75 발색 ③ 츤데레적 화제 전환'
    }
  ];

  const handleSpeak = (text: string) => {
    setActiveSpeech(text);
    setTimeout(() => setActiveSpeech(null), 2500);
  };

  return (
    <section id="three-faces" className="py-24 sm:py-32 border-t border-current/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="mb-14 space-y-3 text-left">
          <div className="text-xs font-mono tracking-widest uppercase opacity-60">
            RECORD NO. 01 · THREE LAYERS
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl tracking-tight ${
              mode === 'angel' ? 'font-serif-kr font-bold' : 'font-sans-kr font-bold'
            }`}
          >
            세 개의 얼굴: 가면, 본색, 알맹이
          </h2>
          <p className="text-xs sm:text-sm font-mono opacity-60 max-w-xl">
            세아의 다층적 페르소나를 장부의 행(Row)별로 분해한 관찰 기록.
          </p>
        </div>

        {/* Editorial Rows with 1px Hairline rules (No card grid) */}
        <div className="border-t border-current/20 divide-y divide-current/15">
          {faces.map((f) => (
            <div
              key={f.id}
              className="py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start group hover:bg-current/3 transition-colors px-2 sm:px-4"
            >
              {/* Col 1: Index, Name & Taped Portrait Thumbnail */}
              <div className="md:col-span-4 space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono tracking-widest text-[#E85D75] font-bold">
                    {f.index} / {f.id.toUpperCase()}
                  </span>
                  <h3
                    className={`text-xl font-bold tracking-tight ${
                      mode === 'angel' ? 'font-serif-kr' : 'font-mono'
                    }`}
                  >
                    {f.name}
                  </h3>
                  <p className="text-xs font-mono opacity-60">{f.role}</p>
                </div>

                {/* Taped Photo Card with Zoomable Lightbox */}
                <div
                  onClick={() =>
                    onOpenLightbox({
                      src: f.image,
                      title: f.name,
                      subtitle: f.sub,
                      quote: f.quote,
                      caption: f.description,
                      fileTag: f.imageTag
                    })
                  }
                  className="relative pt-2 inline-block cursor-zoom-in group/photo"
                  title="클릭하여 고화질 확대"
                >
                  <div className="absolute top-0 left-3 w-12 h-3 tape-strip -rotate-2 z-10"></div>
                  <div className="w-24 sm:w-28 aspect-3/4 border border-current/25 rounded-[1px] overflow-hidden bg-black/5 shadow-xs group-hover/photo:border-[#E85D75] transition-colors relative">
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 right-1 text-[8px] font-mono bg-black/70 text-white px-1 rounded-xs">
                      확대 ⌕
                    </span>
                  </div>
                  <div className="text-[9px] font-mono opacity-50 mt-1 group-hover/photo:text-[#E85D75] transition-colors">
                    {f.imageTag} (클릭 시 확대)
                  </div>
                </div>
              </div>

              {/* Col 2: Representative Quote & Details */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <blockquote
                    className={`text-base sm:text-lg leading-relaxed ${
                      f.id === 'core'
                        ? 'text-[#E85D75] font-semibold'
                        : mode === 'angel'
                        ? 'font-serif-kr italic'
                        : 'font-mono'
                    }`}
                  >
                    "{f.quote}"
                  </blockquote>
                  <button
                    type="button"
                    onClick={() => handleSpeak(f.quote)}
                    title="대사 읽기"
                    aria-label={`${f.name} 대사 시뮬레이션`}
                    className="p-1.5 opacity-40 hover:opacity-100 hover:text-[#E85D75] transition-all shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed opacity-80 max-w-lg">
                  {f.description}
                </p>

                {activeSpeech === f.quote && (
                  <div className="text-[11px] font-mono text-[#E85D75] animate-pulse">
                    [AUDIO BITE PLAYING: "{f.quote}"]
                  </div>
                )}
              </div>

              {/* Col 3: Behavioral Rules & Formulas */}
              <div className="md:col-span-3 text-xs font-mono opacity-70 space-y-2 border-t md:border-t-0 md:border-l border-current/10 pt-4 md:pt-0 md:pl-6">
                <span className="text-[10px] uppercase tracking-wider block opacity-60">
                  BEHAVIORAL CONSTRAINTS
                </span>
                <p className="leading-relaxed whitespace-pre-line text-[11px]">
                  {f.rules}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
