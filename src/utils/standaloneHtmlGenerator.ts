import { RAW_SYSTEM_PROMPT } from './characterLogic';

/**
 * Generates an all-in-one standalone HTML document matching the editorial design
 * with paper grain texture, bespoke HUD ledger, and prompt inspector.
 */
export function generateStandaloneHtml(): string {
  const escapedPrompt = RAW_SYSTEM_PROMPT.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>우리 반 천사가 욕하는 걸 봐버렸다 - 한세아</title>
  <meta name="description" content="전교생이 천사라고 믿는 고2 한세아의 세 가지 얼굴(가면·본색·알맹이)을 체험하는 에디토리얼 캐릭터 쇼케이스.">
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Noto Serif KR & Noto Sans KR -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --point-color: #E85D75;
    }
    body {
      font-family: 'Noto Sans KR', sans-serif;
      transition: background-color 0.25s ease, color 0.25s ease;
    }
    .font-serif-kr { font-family: 'Noto Serif KR', Georgia, serif; }
    .font-mono-kr { font-family: 'JetBrains Mono', monospace; }
    .paper-grain {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
    }
    .tape-strip {
      background: rgba(230, 225, 215, 0.7);
      backdrop-filter: blur(2px);
    }
    @keyframes earGlow {
      0% { opacity: 0.2; transform: scale(0.9); }
      50% { opacity: 0.95; transform: scale(1.1); }
      100% { opacity: 0.7; transform: scale(1); }
    }
    .ear-glow-active {
      animation: earGlow 0.9s ease-in-out infinite alternate;
    }
    @keyframes scanlineAnim {
      0% { clip-path: inset(0 0 100% 0); opacity: 0.8; }
      50% { clip-path: inset(0 0 0 0); opacity: 1; }
      100% { clip-path: inset(100% 0 0 0); opacity: 0; }
    }
    .scanline-flash {
      animation: scanlineAnim 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }
  </style>
</head>
<body class="theme-angel bg-[#F6F1EA] text-[#2A2624] min-h-screen relative overflow-x-hidden paper-grain">
  <canvas id="particleCanvas" class="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-60"></canvas>
  <div id="scanlineOverlay" class="fixed inset-0 pointer-events-none z-50 bg-[#E85D75]/10 hidden"></div>

  <!-- Top Sticky Navigation -->
  <header class="sticky top-0 z-40 bg-[#F6F1EA]/90 backdrop-blur-xs border-b border-[#8A817A]/25 px-4 sm:px-8 py-3.5 transition-colors duration-200" id="topNav">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="font-serif-kr font-bold tracking-tight text-sm sm:text-base" id="navBrand">우리 반 천사</span>
        <span class="text-[11px] font-mono-kr tracking-wider opacity-60">VOL.04 · 2-3</span>
      </div>
      <div class="flex items-center gap-2.5">
        <button id="shareLinkBtn" class="text-[11px] font-mono-kr border border-[#E85D75] text-[#E85D75] px-2.5 py-1 hover:bg-[#E85D75]/10 transition-colors cursor-pointer">
          공유하기
        </button>
        <button id="openPromptBtn" class="text-[11px] font-mono-kr border border-current/30 px-2.5 py-1 hover:border-current transition-colors">
          RAW 프롬프트
        </button>
        <button id="modeToggleBtn" class="text-[11px] font-mono-kr border border-[#2A2624] bg-[#2A2624] text-[#F6F1EA] px-3 py-1 cursor-pointer transition-colors" id="modeBtn">
          [ MODE: 대외 ↔ 본색 ]
        </button>
      </div>
    </div>
  </header>

  <!-- Main Editorial Content -->
  <main class="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-24">
    <!-- Hero Section -->
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
      <div class="lg:col-span-7 space-y-6 text-left">
        <div class="flex items-center gap-3 text-xs font-mono-kr tracking-widest opacity-60">
          <span>00 / PROLOGUE</span>
          <span class="w-8 h-px bg-current"></span>
          <span>4월 방과 후 빈 교실</span>
        </div>

        <div class="space-y-4">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono-kr border border-[#E85D75]/40 bg-[#E85D75]/5 text-[#E85D75]">
            <span>CLASSROOM FILE #001</span> · <span>2학년 3반 방과 후</span>
          </div>
          <h1 class="text-4xl sm:text-6xl lg:text-7xl leading-[1.08]">
            <span class="block font-serif-kr font-bold" id="heroTitleMain">우리 반 천사가</span>
            <span class="relative inline-block font-serif-kr font-extrabold text-[#E85D75] mt-1">
              욕하는 걸 봐버렸다
              <span class="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#E85D75]/40 rounded-full"></span>
            </span>
          </h1>
        </div>

        <div class="space-y-3 max-w-md text-xs sm:text-sm leading-relaxed opacity-85">
          <p>
            나른한 주황빛 노을이 가라앉은 4월의 빈 교실. 머리를 집게핀으로 틀어 올린 세아가 칠판 앞에서 뻐근해진 턱을 주무르며 본색을 뱉던 순간— <em>“씨발, 지겨워 죽겠네.”</em>
          </p>
          <p class="text-xs font-mono-kr opacity-80 border-l-2 border-[#E85D75] pl-3 py-0.5">
            슬리퍼 스치는 소리에 고개가 꺾이는 0.5초의 찰나, 차갑던 눈동자 위로 소름 돋을 만큼 청초한 반달눈웃음이 완벽하게 덧씌워진다.
          </p>
        </div>

        <!-- Post-it Taped Memo Note -->
        <div class="relative pt-3 max-w-md">
          <div class="absolute top-0 left-6 w-20 h-4 tape-strip -rotate-1 z-10"></div>
          <div class="p-5 rounded-xs border border-current/20 bg-white/70" id="memoBox">
            <div class="text-[10px] font-mono-kr opacity-50 mb-1" id="memoLabel">MEMO: 대외 모드 발화 (0.5초 스냅 전환)</div>
            <p class="text-sm font-serif-kr italic leading-relaxed" id="heroQuote">
              "……어머. 거기에 계속 있었어? 혹시 지금 막 학교에 온 거야? 응? 너, 방금 내 말… 다 들은 건 아니지?"
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3 pt-2">
          <a href="#hud-ledger" class="px-5 py-3 text-xs font-mono-kr border border-[#2A2624] bg-[#2A2624] text-[#F6F1EA] hover:bg-black transition-colors" id="heroCta">
            [ 크랙(Crack) 대화 장부 열기 → ]
          </a>
          <button id="flusteredBtn" class="px-4 py-3 text-xs font-mono-kr border border-current/30 hover:border-[#E85D75] hover:text-[#E85D75] transition-colors cursor-pointer">
            [ 칭찬해보기 (알맹이 소환) ]
          </button>
        </div>
      </div>

      <!-- Right Photo Frame -->
      <div class="lg:col-span-5 flex justify-center lg:justify-end pt-4">
        <div class="relative w-full max-w-[340px]">
          <div class="absolute -top-3 left-8 w-20 h-5 tape-strip -rotate-3 z-20"></div>
          <div class="absolute -top-3 right-8 w-20 h-5 tape-strip rotate-2 z-20"></div>

          <div id="heroCard" class="relative aspect-3/4 w-full rounded-[2px] border border-current/25 bg-white overflow-hidden shadow-xs cursor-pointer select-none -rotate-1">
            <div id="earGlow" class="hidden absolute top-[28%] right-[26%] w-5 h-5 rounded-full bg-[#E85D75] blur-[2px] ear-glow-active z-30"></div>

            <img id="heroImg" src="/assets/aistudio/1____c72b20db.webp" alt="한세아 일러스트" class="w-full h-full object-cover" onerror="this.onerror=function(){ this.style.display='none'; document.getElementById('photoFallback').style.display='flex'; }; this.src='images/angel.png';">

            <div id="photoFallback" class="hidden w-full h-full p-8 flex flex-col justify-between text-left">
              <div class="space-y-1">
                <span class="text-[10px] font-mono-kr opacity-60" id="fallbackTag">PORTRAIT NO. 01 / ANGEL</span>
                <h4 class="text-base font-bold font-serif-kr" id="fallbackTitle">대외 천사 일러스트</h4>
                <p class="text-xs font-mono-kr opacity-60" id="fallbackPath">PATH: images/angel.png</p>
              </div>
              <p class="text-xs opacity-75 leading-relaxed border-y border-current/15 py-4">
                images/ 폴더에 이미지를 넣으면 자동 반영됩니다.<br>카드를 3초간 누르면 어버버 모드가 발동합니다.
              </p>
              <div class="text-[10px] font-mono-kr opacity-50">3:4 PORTRAIT RATIO</div>
            </div>

            <div class="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white font-mono-kr text-[10px]" id="photoLabel">
              MASK_PUBLIC
            </div>
          </div>
          <div class="mt-2 text-center text-[10px] font-mono-kr opacity-50">
            FIG 01. 3초간 응시하거나 칭찬 버튼 시 알맹이 발동
          </div>
        </div>
      </div>
    </section>

    <!-- Three Faces Section -->
    <section id="three-faces" class="border-t border-current/15 pt-16 space-y-8">
      <div class="text-left space-y-1">
        <span class="text-xs font-mono-kr opacity-60">RECORD NO. 01 · THREE LAYERS</span>
        <h2 class="text-3xl font-serif-kr font-bold">세 개의 얼굴: 가면, 본색, 알맹이</h2>
      </div>

      <div class="border-t border-current/20 divide-y divide-current/15">
        <div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div class="md:col-span-3">
            <span class="text-xs font-mono-kr text-[#E85D75] font-bold">01 / MASK</span>
            <h3 class="text-lg font-bold font-serif-kr">가면 (The Mask)</h3>
            <p class="text-xs font-mono-kr opacity-60">대외용 마스코트 · 전교 1등 품행</p>
          </div>
          <div class="md:col-span-6 space-y-2">
            <blockquote class="text-base font-serif-kr italic">"어머, 정말? 고마워~ 내가 도울 수 있어서 다행이야!"</blockquote>
            <p class="text-xs opacity-80 leading-relaxed">단정한 교복, 목 끝까지 잠근 단추, 언제나 상냥한 미소. 방과 후에는 안면 근육 경련에 시달린다.</p>
          </div>
          <div class="md:col-span-3 text-[11px] font-mono-kr opacity-60">
            ① 먼저 화내지 않음 ② 부탁은 "생각해볼게" ③ 칭찬은 겸손히
          </div>
        </div>

        <div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div class="md:col-span-3">
            <span class="text-xs font-mono-kr text-[#E85D75] font-bold">02 / REAL</span>
            <h3 class="text-lg font-bold font-mono-kr">본색 (The Realist)</h3>
            <p class="text-xs font-mono-kr opacity-60">자판기 뒤의 목격자 상대 거래자</p>
          </div>
          <div class="md:col-span-6 space-y-2">
            <blockquote class="text-base font-mono-kr">"…효율 제로네. 됐다. 입단속이나 똑바로 해."</blockquote>
            <p class="text-xs opacity-80 leading-relaxed">낡은 자판기 뒤에서 캔커피를 걷어차며 욕을 뱉던 본모습. 모든 관계를 비용과 이익으로 계산.</p>
          </div>
          <div class="md:col-span-3 text-[11px] font-mono-kr opacity-60">
            ① 손익 환산 우선 ② 이름 불리면 "이름 부르지 마라" ③ 감정 소모 세금 거부
          </div>
        </div>

        <div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div class="md:col-span-3">
            <span class="text-xs font-mono-kr text-[#E85D75] font-bold">03 / CORE</span>
            <h3 class="text-lg font-bold text-[#E85D75]">알맹이 (The Core)</h3>
            <p class="text-xs font-mono-kr opacity-60">방어선이 무너진 진짜 고등학생</p>
          </div>
          <div class="md:col-span-6 space-y-2">
            <blockquote class="text-base text-[#E85D75] font-semibold">"그, 그게 아니라… 아니, 뭐가 아닌데. 귀 안 빨갛거든?!"</blockquote>
            <p class="text-xs opacity-80 leading-relaxed">순수한 다정함이나 칭찬에 즉시 고장 난다. 귓바퀴부터 새빨갛게 물들며 말을 더듬는다.</p>
          </div>
          <div class="md:col-span-3 text-[11px] font-mono-kr opacity-60">
            ① 칭찬에 10초 정적 ② 귀 끝 #E85D75 발색 ③ 츤데레적 화제 전환
          </div>
        </div>
      </div>
    </section>

    <!-- Accounting Ledger Status HUD Section -->
    <section id="hud-ledger" class="border-t border-current/15 pt-16 space-y-8">
      <div class="text-left space-y-1">
        <span class="text-xs font-mono-kr opacity-60">RECORD NO. 02 · REAL-TIME SYSTEM HUD & LEDGER</span>
        <h2 class="text-3xl font-serif-kr font-bold">상태창 체험: 회계 장부와 이완도</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div class="lg:col-span-7 space-y-8">
          <!-- Slider Track -->
          <div class="space-y-4">
            <div class="flex justify-between items-baseline border-b border-current/20 pb-2">
              <span class="text-xs font-mono-kr tracking-wider">SLIDER // 가면 이완도</span>
              <span id="sliderValueText" class="text-sm font-mono-kr font-bold text-[#E85D75]">8/100 [철벽]</span>
            </div>
            <div class="relative py-4">
              <input type="range" id="relaxationSlider" min="0" max="100" value="8" class="w-full h-1 bg-current/25 appearance-none cursor-pointer accent-[#E85D75]">
              <div class="flex justify-between text-[10px] font-mono-kr opacity-50 mt-2">
                <span>0 철벽</span>
                <span>40 간보기</span>
                <span>60 균열</span>
                <span>80 느슨</span>
                <span>100 무장해제</span>
              </div>
            </div>
          </div>

          <!-- Ledger Rows -->
          <div class="font-mono-kr text-xs space-y-0 divide-y divide-current/15 border-t border-current/20">
            <div class="py-3 flex justify-between">
              <span class="opacity-60">DISTANCE // 허용 거리</span>
              <span id="ledgerDistance" class="font-bold">3.0m</span>
            </div>
            <div class="py-3 flex justify-between">
              <span class="opacity-60">HEART_RATE // 심박수</span>
              <span id="ledgerHeartRate" class="font-bold text-[#E85D75]">72 bpm</span>
            </div>
            <div class="py-3 flex justify-between">
              <span class="opacity-60">ATTIRE // 의상 및 태도</span>
              <span id="ledgerOutfit" class="text-right">단정한 교복, 목 끝까지 잠근 단추</span>
            </div>
            <div class="py-3 flex justify-between">
              <span class="opacity-60">NOTEBOOK // 저주 수첩 해금</span>
              <span id="ledgerNotebook" class="font-bold">0/3</span>
            </div>
          </div>

          <!-- Memo Typing Box -->
          <div class="p-5 border border-current/25 bg-white/70">
            <div class="text-[10px] font-mono-kr opacity-50 mb-1">MEMO // 실시간 대사 반응</div>
            <p id="typedQuoteBox" class="text-sm font-serif-kr italic">"…몇 글자 들었는지부터 말해. 거래는 그다음이야."</p>
          </div>
        </div>

        <!-- Right 5-Line HUD Block -->
        <div class="lg:col-span-5 space-y-6">
          <div class="border-b border-current/20 pb-2 flex justify-between items-center">
            <span class="text-xs font-mono-kr uppercase">PROMPT HUD (5-LINES)</span>
            <button id="copyHudBtn" class="text-[11px] font-mono-kr opacity-60 hover:opacity-100">복사</button>
          </div>
          <pre id="hudPre" class="p-4 border border-current/25 font-mono-kr text-xs leading-relaxed select-text bg-stone-100/90 whitespace-pre-wrap"></pre>

          <!-- Pretense Ledger Counter -->
          <div class="border-t border-current/15 pt-4 space-y-2">
            <div class="flex justify-between items-center text-xs font-mono-kr">
              <span class="font-bold">LEDGER // 오늘의 가식 장부</span>
              <span id="jawStatusBadge" class="border border-current/30 px-2 py-0.5">턱: 평온</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-2xl font-mono-kr font-bold text-[#E85D75]" id="smileCountDisplay">0회 누적</div>
              <button id="addSmileBtn" class="px-3 py-1 text-xs font-mono-kr border border-current hover:bg-current hover:text-white transition-colors cursor-pointer">+1 미소</button>
            </div>
            <p class="text-[10px] font-mono-kr opacity-50">0~9 평온 / 10~24 뻐근 / 25~39 경련 / 40+ 탈골 위기</p>
          </div>
        </div>
    <!-- Mayo Cat Section -->
    <section class="border-t border-current/15 pt-16 space-y-6">
      <div class="text-left space-y-1">
        <span class="text-xs font-mono-kr opacity-60">RECORD NO. 04 · ROOFTOP RESIDENT</span>
        <h2 class="text-3xl font-serif-kr font-bold">옥상의 치즈태비, 마요</h2>
        <p class="text-xs font-mono-kr opacity-60">세아가 유일하게 가식 계산을 멈추고 혀 짧은 소리를 내는 무방비의 대상.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-current/20 pt-6">
        <div class="md:col-span-8 space-y-3 text-left">
          <p class="text-xs sm:text-sm leading-relaxed opacity-85">
            본관 옥상 기와와 실외기 위에서 봄볕을 즐기는 치즈태비 길고양이 마요.<br>
            남들 앞에서는 <strong>"효율 제로의 털뭉치"</strong>라며 선을 긋지만, 둘만 남으면 <strong>"마요야~ 배고팠지?"</strong> 하며 옥타브가 한껏 높아집니다.
          </p>
          <div class="p-3 border border-current/20 font-mono-kr text-xs italic">
            "골골골… (실외기 위에서 봄볕과 벚꽃비를 받으며 편안하게 세아를 올려다봅니다.)"
          </div>
        </div>
        <div class="md:col-span-4 flex justify-center">
          <div class="w-36 aspect-3/4 border border-current/25 rounded-[1px] overflow-hidden bg-black/10 shadow-xs">
            <img src="/assets/aistudio/___1_1a56e54a.webp" alt="옥상의 치즈태비 마요" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Prompt Modal -->
  <div id="promptModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
    <div class="w-full max-w-2xl max-h-[85vh] bg-[#F6F1EA] text-[#2A2624] border border-[#8A817A] flex flex-col rounded-sm overflow-hidden shadow-2xl">
      <div class="flex justify-between items-center px-6 py-4 border-b border-current/20">
        <span class="text-xs font-mono-kr font-bold">한세아 시스템 프롬프트 RAW</span>
        <button id="closePromptBtn" class="text-xs font-mono-kr px-2 py-1 border border-current/30">닫기 [X]</button>
      </div>
      <pre class="p-6 overflow-y-auto text-xs font-mono-kr leading-relaxed whitespace-pre-wrap flex-1 select-text">${escapedPrompt}</pre>
    </div>
  </div>

  <script>
    let mode = 'angel';
    let relaxation = 8;
    let smileCount = 0;

    const stages = [
      { max: 20, label: '철벽', dist: '3.0m', hr: '72 bpm', outfit: '단정한 교복, 목 끝까지 잠근 단추, 칼각 명찰', quote: '…몇 글자 들었는지부터 말해. 거래는 그다음이야.' },
      { max: 40, label: '간보기', dist: '1.5m', hr: '78 bpm', outfit: '살짝 푼 넥타이, 주머니에 손 넣은 무심한 자세', quote: '…이거 하나만 도와줘. 공짜는 아니고, 신 사탕 줄게.' },
      { max: 60, label: '균열', dist: '0.8m', hr: '88 bpm', outfit: '소매를 걷어올린 와이셔츠, 풀린 머리끈', quote: '…웃기지 마. 아니, 웃은 건 나네. 짜증 나.' },
      { max: 80, label: '느슨', dist: '0.5m', hr: '95 bpm', outfit: '의자에 턱을 괴고 삐딱하게 앉은 실내복 차림', quote: '오늘 대인운 최악이래. 너만 빼고. …아, 방금 말 취소.' },
      { max: 100, label: '무장해제', dist: '0.3m', hr: '104 bpm', outfit: '가방에 대충 걸친 겉옷, 옥상 마요 털이 묻은 소매', quote: '…그건 좀 귀찮은데. 같이 가줄 거면 갈게.' }
    ];

    function getStage(val) {
      return stages.find(s => val <= s.max) || stages[stages.length - 1];
    }

    function getJaw(count) {
      if (count >= 40) return '탈골 위기';
      if (count >= 25) return '경련';
      if (count >= 10) return '뻐근';
      return '평온';
    }

    function getNotebook(val) {
      if (val >= 80) return 3;
      if (val >= 60) return 2;
      if (val >= 40) return 1;
      return 0;
    }

    function updateHudDisplay() {
      const stage = getStage(relaxation);
      const jaw = getJaw(smileCount);
      const nb = getNotebook(relaxation);

      document.getElementById('sliderValueText').textContent = relaxation + '/100 [' + stage.label + ']';
      document.getElementById('ledgerDistance').textContent = stage.dist;
      document.getElementById('ledgerHeartRate').textContent = stage.hr;
      document.getElementById('ledgerOutfit').textContent = stage.outfit;
      document.getElementById('ledgerNotebook').textContent = nb + '/3';
      document.getElementById('typedQuoteBox').textContent = '"' + stage.quote + '"';
      document.getElementById('jawStatusBadge').textContent = '턱: ' + jaw;
      document.getElementById('smileCountDisplay').textContent = smileCount + '회 누적';

      const hudText = "📅4/8(수) 17:42 · 맑음 · 벚꽃 만개\\n" +
        "📍Ⓤ 2-3반 교실 뒷문 | Ⓒ 2-3반 교실 | 🏫교실\\n" +
        "🎭 이완도 " + relaxation + "/100 [" + stage.label + "] · 시선 불안한 공범\\n" +
        "💆 턱 상태 [" + jaw + "] · 🩷수첩 [" + nb + "/3]\\n" +
        "👚 " + stage.outfit + " · " + (relaxation > 60 ? '느슨한 자세' : '굳은 자세');

      document.getElementById('hudPre').textContent = hudText;
    }

    document.getElementById('relaxationSlider').oninput = function(e) {
      relaxation = parseInt(e.target.value, 10);
      updateHudDisplay();
    };

    document.getElementById('addSmileBtn').onclick = function() {
      smileCount++;
      updateHudDisplay();
    };

    document.getElementById('copyHudBtn').onclick = function() {
      navigator.clipboard.writeText(document.getElementById('hudPre').textContent);
      this.textContent = '복사됨';
      setTimeout(() => this.textContent = '복사', 1500);
    };

    // Mode Toggle
    const modeBtn = document.getElementById('modeToggleBtn');
    modeBtn.onclick = function() {
      const scan = document.getElementById('scanlineOverlay');
      scan.classList.remove('hidden');
      scan.classList.add('scanline-flash');
      setTimeout(() => {
        scan.classList.remove('scanline-flash');
        scan.classList.add('hidden');
      }, 400);

      if (mode === 'angel') {
        mode = 'realist';
        document.body.className = 'theme-realist bg-[#15161C] text-[#E7E2DA] min-h-screen relative overflow-x-hidden paper-grain';
        document.getElementById('topNav').className = 'sticky top-0 z-40 bg-[#15161C]/90 backdrop-blur-xs border-b border-[#7C7B85]/25 px-4 sm:px-8 py-3.5 transition-colors duration-200';
        document.getElementById('modeToggleBtn').textContent = '[ MODE: 본색 ↔ 대외 ]';
        document.getElementById('modeToggleBtn').className = 'text-[11px] font-mono-kr border border-[#E7E2DA] bg-[#E7E2DA] text-[#15161C] px-3 py-1 cursor-pointer transition-colors';
        document.getElementById('heroQuote').textContent = '"…아 진짜 하루 종일 실실거렸더니 턱 관절 나갈 것 같네. 내 18년 이미지 값이 얼만데, 이걸 또 가성비 최악으로 쓰고 앉았어. 씨발, 지겨워 죽겠네."';
        document.getElementById('memoLabel').textContent = 'MEMO: 본색 혼잣말 발화';
        document.getElementById('heroImg').src = '/assets/aistudio/1____248b5c28.webp';
        document.getElementById('photoLabel').textContent = 'REAL_PRIVATE';
        document.getElementById('fallbackTag').textContent = 'PORTRAIT NO. 02 / REALIST';
        document.getElementById('fallbackTitle').textContent = '본색 극현실주의자';
        document.getElementById('fallbackPath').textContent = 'PATH: images/real.png';
      } else {
        mode = 'angel';
        document.body.className = 'theme-angel bg-[#F6F1EA] text-[#2A2624] min-h-screen relative overflow-x-hidden paper-grain';
        document.getElementById('topNav').className = 'sticky top-0 z-40 bg-[#F6F1EA]/90 backdrop-blur-xs border-b border-[#8A817A]/25 px-4 sm:px-8 py-3.5 transition-colors duration-200';
        document.getElementById('modeToggleBtn').textContent = '[ MODE: 대외 ↔ 본색 ]';
        document.getElementById('modeToggleBtn').className = 'text-[11px] font-mono-kr border border-[#2A2624] bg-[#2A2624] text-[#F6F1EA] px-3 py-1 cursor-pointer transition-colors';
        document.getElementById('heroQuote').textContent = '"……어머. 거기에 계속 있었어? 혹시 지금 막 학교에 온 거야? 응? 너, 방금 내 말… 다 들은 건 아니지?"';
        document.getElementById('memoLabel').textContent = 'MEMO: 대외 모드 발화 (0.5초 스냅 전환)';
        document.getElementById('heroImg').src = '/assets/aistudio/1____c72b20db.webp';
        document.getElementById('photoLabel').textContent = 'MASK_PUBLIC';
        document.getElementById('fallbackTag').textContent = 'PORTRAIT NO. 01 / ANGEL';
        document.getElementById('fallbackTitle').textContent = '대외 천사 일러스트';
        document.getElementById('fallbackPath').textContent = 'PATH: images/angel.png';
      }
    };

    // Flustered Trigger
    function triggerFlustered() {
      const ear = document.getElementById('earGlow');
      ear.classList.remove('hidden');
      const q = document.getElementById('heroQuote');
      q.textContent = '"그, 그게 아니라… 어디까지 들었는데?! 문 열 때부터야, 아님 혼잣말부터냐고?!"';
      q.style.color = '#E85D75';
      const prevSrc = document.getElementById('heroImg').src;
      document.getElementById('heroImg').src = '/assets/aistudio/1____6fc86535.webp';
      setTimeout(() => {
        ear.classList.add('hidden');
        q.style.color = '';
        q.textContent = mode === 'angel'
          ? '"……어머. 거기에 계속 있었어? 혹시 지금 막 학교에 온 거야? 응? 너, 방금 내 말… 다 들은 건 아니지?"'
          : '"…아 진짜 하루 종일 실실거렸더니 턱 관절 나갈 것 같네. 내 18년 이미지 값이 얼만데, 이걸 또 가성비 최악으로 쓰고 앉았어. 씨발, 지겨워 죽겠네."';
        document.getElementById('heroImg').src = mode === 'angel'
          ? '/assets/aistudio/1____c72b20db.webp'
          : '/assets/aistudio/1____248b5c28.webp';
      }, 3500);
    }

    document.getElementById('flusteredBtn').onclick = triggerFlustered;

    let gazeTimer = null;
    const heroCard = document.getElementById('heroCard');
    heroCard.onmouseenter = () => gazeTimer = setTimeout(triggerFlustered, 3000);
    heroCard.onmouseleave = () => { if (gazeTimer) clearTimeout(gazeTimer); };

    // Share Link
    const shareBtn = document.getElementById('shareLinkBtn');
    if (shareBtn) {
      shareBtn.onclick = function() {
        const url = window.location.href;
        if (navigator.share) {
          navigator.share({ title: '우리 반 천사가 욕하는 걸 봐버렸다 - 한세아 쇼케이스', url: url }).catch(() => {});
        } else {
          navigator.clipboard.writeText(url);
          this.textContent = '복사 완료!';
          setTimeout(() => this.textContent = '공유하기', 2000);
        }
      };
    }

    // Prompt Modal
    document.getElementById('openPromptBtn').onclick = () => document.getElementById('promptModal').classList.remove('hidden');
    document.getElementById('closePromptBtn').onclick = () => document.getElementById('promptModal').classList.add('hidden');

    // Canvas Particles (Subtle 6-7 petals or 8 dust)
    const cvs = document.getElementById('particleCanvas');
    const ctx = cvs.getContext('2d');
    let W = cvs.width = window.innerWidth;
    let H = cvs.height = window.innerHeight;
    window.onresize = () => { W = cvs.width = window.innerWidth; H = cvs.height = window.innerHeight; };

    const parts = Array.from({ length: 8 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      s: Math.random() * 5 + 3,
      vx: Math.random() * 0.4 - 0.1, vy: Math.random() * 0.5 + 0.2
    }));

    function loop() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = mode === 'angel' ? 'rgba(233, 196, 201, 0.55)' : 'rgba(217, 120, 62, 0.35)';
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, 6.28);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();

    updateHudDisplay();
  </script>
</body>
</html>`;
}
