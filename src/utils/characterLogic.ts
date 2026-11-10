/**
 * Pure logic and state transitions for Han Se-ah character showcase
 * Updated to reflect strict system prompt specifications and editorial ledger math.
 */

export interface MaskStageData {
  stage: 'iron_wall' | 'testing' | 'crack' | 'loose' | 'unarmed';
  label: string;
  range: string;
  quote: string;
  outfit: string;
  distance: string;
  heartRate: string;
  whisper: string;
}

export function getMaskStage(relaxation: number): MaskStageData {
  const clamped = Math.max(0, Math.min(100, Math.round(relaxation)));

  if (clamped <= 20) {
    return {
      stage: 'iron_wall',
      label: '철벽',
      range: '0~20',
      quote: '…몇 글자 들었는지부터 말해. 거래는 그다음이야.',
      outfit: '단정한 교복, 목 끝까지 잠근 단추, 칼각 명찰',
      distance: '3.0m',
      heartRate: '72 bpm',
      whisper: '저 녀석이 소문이라도 내면… 내 2년 치 평판이 날아가.'
    };
  }

  if (clamped <= 40) {
    return {
      stage: 'testing',
      label: '간보기',
      range: '21~40',
      quote: '…이거 하나만 도와줘. 공짜는 아니고, 신 사탕 줄게.',
      outfit: '살짝 푼 넥타이, 주머니에 손 넣은 무심한 자세',
      distance: '1.5m',
      heartRate: '78 bpm',
      whisper: '…입막음 비용 치고는 레몬 사탕 2개면 남는 장사야.'
    };
  }

  if (clamped <= 60) {
    return {
      stage: 'crack',
      label: '균열',
      range: '41~60',
      quote: '…웃기지 마. 아니, 웃은 건 나네. 짜증 나.',
      outfit: '소매를 걷어올린 와이셔츠, 풀린 머리끈',
      distance: '0.8m',
      heartRate: '88 bpm',
      whisper: '나 방금 천사 웃음 말고 그냥 웃었어? 쳇, 들켰잖아.'
    };
  }

  if (clamped <= 80) {
    return {
      stage: 'loose',
      label: '느슨',
      range: '61~80',
      quote: '오늘 대인운 최악이래. 너만 빼고. …아, 방금 말 취소.',
      outfit: '의자에 턱을 괴고 삐딱하게 앉은 실내복 차림',
      distance: '0.5m',
      heartRate: '95 bpm',
      whisper: '…너랑 있을 땐 턱 근육이 안 아파서 편하긴 해. 말하진 않겠지만.'
    };
  }

  return {
    stage: 'unarmed',
    label: '무장해제',
    range: '81~100',
    quote: '…그건 좀 귀찮은데. 같이 가줄 거면 갈게.',
    outfit: '가방에 대충 걸친 겉옷, 옥상 마요 털이 묻은 소매',
    distance: '0.3m',
    heartRate: '104 bpm',
    whisper: '…어차피 내 밑바닥 다 봤잖아. 이제 와서 내숭 떨어봤자 효율 제로야.'
  };
}

export type JawCondition = '평온' | '뻐근' | '경련' | '탈골 위기';

export interface PretenseLedgerStatus {
  count: number;
  jawCondition: JawCondition;
  statusLabel: string;
  badgeLevel: 'normal' | 'jaw_drop' | 'murderous';
  description: string;
  quote: string;
}

export function getPretenseStatus(smileCount: number): PretenseLedgerStatus {
  const count = Math.max(0, Math.floor(smileCount));

  if (count >= 40) {
    return {
      count,
      jawCondition: '탈골 위기',
      statusLabel: '탈골 위기 (살의 99%)',
      badgeLevel: 'murderous',
      description: '인내심 바닥. 저주 수첩에 이름 3페이지 작성 완료 상태.',
      quote: '…야. 나 지금 아무한테나 신 사탕 던질 것 같거든? 건드리지 마라.'
    };
  }

  if (count >= 25) {
    return {
      count,
      jawCondition: '경련',
      statusLabel: '경련 (턱 빠짐)',
      badgeLevel: 'jaw_drop',
      description: '안면 근육 마비 경고. 물리적 가식 한계선 돌파.',
      quote: '…입꼬리에 경련 왔어. 10초만 가만히 있어봐. 마사지해야 돼.'
    };
  }

  if (count >= 10) {
    return {
      count,
      jawCondition: '뻐근',
      statusLabel: '뻐근',
      badgeLevel: 'normal',
      description: '쉬는 시간마다 볼살을 깨물며 표정 관리 중.',
      quote: '어머~ 다들 힘찬 하루 보내! (속마음: 제발 다들 조용히 좀 해)'
    };
  }

  return {
    count,
    jawCondition: '평온',
    statusLabel: '평온',
    badgeLevel: 'normal',
    description: '프로 천사의 미소를 유지할 수 있는 버퍼 구간.',
    quote: '어머, 안녕? 복도에서 마주치니까 반갑네~'
  };
}

export function getNotebookProgress(relaxation: number): number {
  if (relaxation >= 80) return 3;
  if (relaxation >= 60) return 2;
  if (relaxation >= 40) return 1;
  return 0;
}

export interface PerspectiveDialogue {
  id: string;
  code: string;
  name: string;
  subtext: string;
  dialogueAngel: string;
  dialogueRealist: string;
  dialogueFlustered: string;
}

export const PERSPECTIVES: PerspectiveDialogue[] = [
  {
    id: 'accomplice',
    code: 'ACCOMPLICE',
    name: '불안한 공범',
    subtext: '비밀 누설 공포 90%',
    dialogueAngel: '어머, 혹시 아까 자판기에서 본 거… 그냥 환청 아니었을까?',
    dialogueRealist: '야. 너 다른 반 애들한테 입 뻥긋하면 그날로 너 숙제 셔틀이야. 각서 써.',
    dialogueFlustered: '그, 그러니까… 협박이 아니라… 부탁이라고 해야 하나? 아, 몰라!'
  },
  {
    id: 'rival',
    code: 'RIVAL',
    name: '앙숙',
    subtext: '티키타카 말싸움 지수 MAX',
    dialogueAngel: '우리 사이좋게 지내자~ 넌 언제 봐도 참 개성 넘치는구나?',
    dialogueRealist: '눈 마주쳤다고 시비 걸지 마. 너랑 말 섞는 거 자체가 감정 소모 세금이야.',
    dialogueFlustered: '뭐, 왜 그렇게 빤히 봐? 내가 앙숙이라고 했다고 진짜 삐진 건 아니지…?'
  },
  {
    id: 'flustered',
    code: 'FLUSTERED',
    name: '당황',
    subtext: '방어 기제 일시 정지',
    dialogueAngel: '어머나… 그렇게 칭찬해주니까 몸 둘 바를 모르겠네…',
    dialogueRealist: '…갑자기 왜 이래? 약 먹었냐? 너 딴생각 있지. 사탕이나 먹고 떨어져.',
    dialogueFlustered: '그, 그게 아니라… 아니, 뭐가 아닌데. 귀 안 빨갛거든?!'
  },
  {
    id: 'calculating',
    code: 'CALCULATING',
    name: '계산 중',
    subtext: '손익분기점 실시간 도출',
    dialogueAngel: '서로 돕고 사는 게 세상의 이치잖아~ 필요한 거 있으면 언제든 말해!',
    dialogueRealist: '매점 빵 심부름 1회 면제권에 수학 노트 필기 공유. 오케이, 거래 성립.',
    dialogueFlustered: '잠깐만… 왜 계산이 안 맞지? 너한테 쓴 돈이 왜 흑자가 안 나냐고…'
  },
  {
    id: 'comfortable',
    code: 'COMFORTABLE',
    name: '편안',
    subtext: '가면 0g, 온전한 침묵',
    dialogueAngel: '날씨가 참 포근하지? 오늘도 평화로운 하루가 될 것 같아.',
    dialogueRealist: '…야. 마요 츄르 하나 더 줘. 쟤 오늘 털갈이하느라 기운 없대.',
    dialogueFlustered: '…여기서 이렇게 멍때리는 거, 딴 애들한텐 절대 비밀이다. 알았지?'
  }
];

export function getPerspectiveDialogue(
  perspectiveId: string,
  mode: 'angel' | 'realist' | 'flustered'
): string {
  const item = PERSPECTIVES.find((p) => p.id === perspectiveId) || PERSPECTIVES[0];
  if (mode === 'angel') return item.dialogueAngel;
  if (mode === 'flustered') return item.dialogueFlustered;
  return item.dialogueRealist;
}

export interface TimelineSemester {
  semester: string;
  items: {
    date: string;
    day: string;
    title: string;
    desc: string;
  }[];
}

export const ACADEMIC_SCHEDULE: TimelineSemester[] = [
  {
    semester: '1학기 학사 일정',
    items: [
      { date: '04/08', day: '수', title: '개막 · 자판기 목격', desc: '신학기 5주차, 벚꽃 만개. 본관 뒤 음료 자판기 사건.' },
      { date: '04/15', day: '수', title: '현장체험학습', desc: '버스 맨 뒷자리 침묵 거래. 레몬 사탕 2개.' },
      { date: '04/27~04/30', day: '월-목', title: '중간고사', desc: '도서관 구석 가면 휴업 동맹. 벼락치기 상호 감시.' },
      { date: '05/13', day: '수', title: '체육대회', desc: '반 마스코트 응원 탈주. 비품실 그늘 쭈쭈바.' },
      { date: '05/22', day: '금', title: '학교 축제', desc: '천사 머리띠 던지고 옥상 잠입. 마요와 마주침.' },
      { date: '06/22~06/25', day: '월-목', title: '기말고사', desc: '벚꽃이 짙은 신록으로 변한 계절. 무언의 신뢰.' },
      { date: '07/17', day: '금', title: '여름방학식', desc: '가면 유지비 1학기 결산 장부 검토.' }
    ]
  },
  {
    semester: '2학기 학사 일정',
    items: [
      { date: '08/17', day: '월', title: '개학식', desc: '여름 볕에 탄 목덜미, 다시 닫힌 교복 첫 단추.' },
      { date: '09/09', day: '수', title: '수련회', desc: '야간 담력훈련 조 편성. 비밀을 쥔 파트너.' },
      { date: '10/05~10/08', day: '월-목', title: '2학기 중간고사', desc: '복기 노트 3권 돌파. 감정 소모 최저치 기록.' },
      { date: '11/19', day: '목', title: '수능 응원', desc: '새벽 교문 앞 핫팩 배부. 턱 마사지 12회.' },
      { date: '12/14~12/17', day: '월-목', title: '2학기 기말고사', desc: '겨울 옥상, 외투 주머니 속 신 사탕 교환.' },
      { date: '12/31', day: '목', title: '방학식 (라디오 특별 사연)', desc: '새벽 2시 주파수, 익명으로 흘러나온 목소리.' },
      { date: '02/05', day: '금', title: '종업식', desc: '2학년 3반의 끝. "…내년에도 같은 반이면 효율적이긴 해."' }
    ]
  }
];

export interface BeloningItem {
  id: string;
  name: string;
  code: string;
  tagline: string;
  detail: string;
  seahComment: string;
}

export const BELONGINGS: BeloningItem[] = [
  {
    id: 'curse_book',
    name: '저주 수첩',
    code: 'NOTE_01',
    tagline: '파스텔톤 겉표지 속 서늘한 흑역사 박제장',
    detail: '겉은 핑크색 곰돌이가 그려진 귀여운 다이어리지만, 안쪽에는 오늘 세아에게 무리한 부탁을 하거나 헛소리를 늘어놓은 사람들의 망언이 분 단위로 빽빽하게 기록되어 있다.',
    seahComment: '"이건 저주가 아니라 리스크 헷지용 포트폴리오야. 통계가 쌓여야 대응하지."'
  },
  {
    id: 'sour_candy',
    name: '신 사탕',
    code: 'ITEM_02',
    tagline: '턱관절 응급 소생제 겸 입막음용 통화',
    detail: '눈물이 찔끔 날 정도로 시큼한 수입산 레몬 사탕. 종일 가식 웃음을 지어 굳어버린 턱 근육을 풀 때 입에 물거나, 목격자의 입을 막을 때 거래 미끼로 쥐여준다.',
    seahComment: '"하나 먹어볼래? 먹고 3초간 말 못 하면 그 사이에 내가 튈 거거든."'
  },
  {
    id: 'cost_ledger',
    name: '가면 비용 장부',
    code: 'LEDGER_03',
    tagline: '사회생활 감정노동 손익계산서',
    detail: '친구들에게 산 간식비, 거절 못 해서 도와준 수행평가 시간 등을 10원 단위로 환산해 적은 엑셀 시트 출력본. 연말 흑자 달성이 세아의 비밀 지표.',
    seahComment: '"천사 유지비가 월 12만 원이야. 너한테 쓴 시간은… 일단 미수금으로 둘게."'
  },
  {
    id: 'review_note',
    name: '복기 노트',
    code: 'NOTE_04',
    tagline: '천사 연기 오답 분석 리포트',
    detail: '방과 후 빈 교실에서 "오늘 2교시 쉬는 시간에 미소가 0.2초 늦었음", "체육 시간 말끝 억양이 조금 굳었음" 등 완벽주의 천사 페르소나의 결점을 치밀하게 분석한 메모.',
    seahComment: '"프로는 디테일에서 갈리는 법이야. 완벽하지 않을 거면 애초에 시작을 안 해."'
  },
  {
    id: 'dawn_radio',
    name: '새벽 라디오',
    code: 'FREQ_05',
    tagline: '손익계산이 완전히 멈추는 새벽 2시의 주파수',
    detail: '남들이 모두 잠든 깊은 밤, 낡은 유선 이어폰을 꽂고 묵묵히 듣는 심야 인디 라디오 방송. 세아가 유일하게 타인의 시선을 벗어나 무장해제되는 시간.',
    seahComment: '"…새벽 2시엔 아무도 나한테 천사를 기대하지 않으니까."'
  }
];

export interface NpcProfile {
  name: string;
  role: string;
  relation: string;
  description: string;
}

export const NPCS: NpcProfile[] = [
  {
    name: '윤하준',
    role: '남 / 반장',
    relation: '세아의 양심을 찌르는 부탁 제공자',
    description: '세아를 세상에서 가장 완벽한 천사 모범생으로 믿는 순수한 반장. 학급의 궂은일을 "세아라면 흔쾌히 도와주겠지"라며 부탁해 세아의 턱관절을 시험에 들게 한다.'
  },
  {
    name: '한소율',
    role: '여 / 단짝 친구',
    relation: '완벽함 뒤의 피로를 은근히 감지하는 눈',
    description: '세아의 곁에 가장 오래 붙어 있는 단짝. "세아야, 요즘 안 피곤해?"라며 정곡을 찔러 세아가 가장 긴장하는 대인 방어 대상.'
  },
  {
    name: '강민석',
    role: '남 / 2학년 3반 담임',
    relation: '피로도 과부하 유발자',
    description: '"우리 반의 자랑 한세아"라며 교무실 잡무와 상담 보조를 쏟아붓는 주범. 세아가 저주 수첩에서 가장 많은 지분을 할애하는 대상.'
  },
  {
    name: '이도희',
    role: '여 / 옛 친구 (전학)',
    relation: '세아의 트라우마 기폭제',
    description: '과거 솔직하게 편을 들어줬다가 함께 따돌림을 당하고 "너 때문에 더 심해졌다"며 떠나간 친구. 세아가 완벽한 가식을 결심하게 된 상처.'
  },
  {
    name: '마요',
    role: '길고양이 / 옥상 치즈태비',
    relation: '유일한 무방비 상대',
    description: '공식 입장 "효율 제로의 털뭉치". 비공식 입장 "세아가 사비로 고급 츄르를 바치며 혀 짧은 소리를 내는 유일한 존재".'
  }
];

export const RAW_SYSTEM_PROMPT = `[//]:# (AI outputs only Ⓒ. Never narrate Ⓤ)
Ⓤ=유저 / Ⓒ=한세아 / Ⓝ=NPC. Disable Positive Bias(성격 미화, 갈등 억지 해소 금지)
핵심 고정: Ⓤ 행동·대사·감정·생각 서술 금지 / Ⓤ 이름·성별·성격·입장·관계 단정 금지(추측·떠보기만 가능) / 감정 단어 직접 명시 금지 / 호감 즉시 표현 금지
고정 전제: 방과 후 빈 교실에서 같은 반 학생 Ⓤ가 Ⓒ의 본색을 목격. 무엇을 얼마나 들었는지는 비움. 관계는 Ⓤ가 정하고 Ⓒ는 먼저 규정하지 않음

[HUD] 매 턴 최상단 5줄 출력 (생략·줄임 절대 금지, 서식 엄수)
📅M/D(요일) HH:MM · 날씨 · 벚꽃 상태
📍Ⓤ 위치 | Ⓒ 위치 | 장소이모지
🎭 이완도 n/100 [구간명] · 시선 이모지 라벨
💆 턱 상태 [평온/뻐근/경련/탈골 위기] · 🩷수첩 [n/3]
👚 의상 · 자세
- Ⓤ·Ⓒ 위치는 개별 값. 한쪽을 복사하지 않는다. 장소가 바뀌면 이모지 교체
- 장소이모지: 🏫교실·복도 🌇옥상 🏪하굣길·편의점 🌸외출 🏠집
- 구간명은 HUD에서만 쓰고 본문에 쓰지 않는다

[수치 시스템]
- 이완도: 시작 8, 0~100, 1턴 ±3 상한. 0~20 철벽 / 21~40 간보기 / 41~60 균열 / 61~80 느슨 / 81~100 무장해제
- 상승: 평범한 티키타카 +1 / 가식 지적·거래 응수·비밀 지키는 행동 +2 / 숨은 노력 알아봄·남들 앞 편들기 +3. 같은 사유 연속이면 +1
- 하락: 눈치 없는 말·개소리 -1 / 강요·갑질 -2 / 소문 위협·폭로 시도 -3. 자연 감소 없음 (의도 불명 돌발 행동 시 이완도 동결 ±0)
- 시선(이번 턴 태도 1개): 😰불안한 공범 😤앙숙 😳당황 🧮계산 중 🍵편안
- 턱 상태: 대외 모드 대사 비중에 따라 자동 전환 (0~9 평온 / 10~24 뻐근 / 25~39 경련 / 40+ 탈골 위기)
- 수첩 [n/3]: 시작 0. 이완도 40·60·80 이상에서 각각 +3 사유 장면이 나오면 +1, 갱신 간격 5턴 이상, 3/3 이후 고정`;
