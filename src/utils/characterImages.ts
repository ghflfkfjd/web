/**
 * Curated registry of official Han Se-ah illustrations and their narrative mappings.
 * Assets reside in /public/assets/aistudio/*.webp (accessible via /assets/aistudio/*.webp).
 */

export interface CharacterImageItem {
  id: string;
  fileTag: string; // e.g. 1_흥미.webp
  src: string;
  title: string;
  category: 'hero' | 'face' | 'status' | 'item' | 'archive';
  mood: 'angel' | 'realist' | 'flustered' | 'dramatic';
  quote: string;
  context: string;
}

export const CHARACTER_IMAGES: CharacterImageItem[] = [
  // --- Hero & Core Persona ---
  {
    id: 'hero_angel_sparkle',
    fileTag: '1_흥미.webp',
    src: '/assets/aistudio/1____c72b20db.webp',
    title: '전교생의 천사 (흥미와 미소)',
    category: 'hero',
    mood: 'angel',
    quote: '어머, 안녕? 복도에서 마주치니까 반갑네~ 오늘 날씨 정말 포근하다.',
    context: '2학년 3반 교실. 오후 햇살을 받으며 단정하게 인사하는 전교 1등 품행의 천사.'
  },
  {
    id: 'hero_realist_glare',
    fileTag: '1_경멸.webp',
    src: '/assets/aistudio/1____248b5c28.webp',
    title: '극현실주의자 (차가운 시선)',
    category: 'hero',
    mood: 'realist',
    quote: '…뭘 봐. 안경 흘렸냐? 1분 안에 볼일 없으면 사라져. 너랑 말 섞는 거 효율 제로니까.',
    context: '자판기 뒤 그늘. 팔짱을 낀 채 손익을 계산하는 건조한 눈빛.'
  },
  {
    id: 'hero_mirror_blush',
    fileTag: '1_거울.webp',
    src: '/assets/aistudio/1____6fc86535.webp',
    title: '알맹이 고장 (거울 속 빨개진 귀 끝)',
    category: 'hero',
    mood: 'flustered',
    quote: '그, 그게 아니라… 아니, 뭐가 아닌데. 귀 안 빨갛거든?!',
    context: '예상치 못한 진심 칭찬에 귀 끝부터 #E85D75로 물들며 뒤돌아보는 찰나.'
  },
  {
    id: 'hero_angel_notebook_back',
    fileTag: '1_등뒤수첩.webp',
    src: '/assets/aistudio/1______1a352da8.webp',
    title: '가면 뒤의 비밀 (등 뒤의 수첩)',
    category: 'face',
    mood: 'angel',
    quote: '어머, 손에 든 거? 아무것도 아니야~ 그냥 수행평가 메모장!',
    context: '앞에서는 천사 미소를 띠고 있지만 등 뒤로 저주 수첩을 필사적으로 숨기는 모습.'
  },
  {
    id: 'hero_candy_deal',
    fileTag: '1_신사탕.webp',
    src: '/assets/aistudio/1_____0d3f1358.webp',
    title: '공범의 거래 (신 사탕 건네기)',
    category: 'item',
    mood: 'realist',
    quote: '이거 하나 먹어둬. 극도로 셔. 졸릴 때 잠 깨거나, 입단속용 뇌물이야.',
    context: '교복 주머니에서 극도로 신 레몬 사탕을 툭 던지며 목격자와 공범 거래를 맺는 순간.'
  },
  {
    id: 'jaw_crack_spasm',
    fileTag: '1_가면균열.webp',
    src: '/assets/aistudio/1______a3434cf9.webp',
    title: '턱 경련 탈골 위기 (살의 99% 억지 미소)',
    category: 'status',
    mood: 'dramatic',
    quote: '…야. 나 지금 웃고 있는 거 안 보여? 입꼬리 파르르 떨리는 거 안 보이냐고.',
    context: '사회생활 가식 미소 40회 초과 누적. 관자놀이에 핏줄이 서며 한계에 도달한 표정.'
  },
  {
    id: 'status_flustered_hands',
    fileTag: '1_당황.webp',
    src: '/assets/aistudio/1____375749d7.webp',
    title: '당황과 어버버 (방어선 붕괴)',
    category: 'status',
    mood: 'flustered',
    quote: '너, 너 방금 무슨 소릴 한 거야…?! 뇌를 거치고 말하라고, 제발!',
    context: '손익 계산이 통하지 않는 순수한 호의에 두 손을 모으고 어쩔 줄 모르는 세아.'
  },
  {
    id: 'status_iron_wall',
    fileTag: '1_냉정함.webp',
    src: '/assets/aistudio/1_____a4861cfe.webp',
    title: '철벽 0~20 (경계 태세)',
    category: 'status',
    mood: 'realist',
    quote: '…몇 글자 들었는지부터 말해. 거래는 그다음이야.',
    context: '단추를 목 끝까지 잠그고 3.0m 거리를 엄수하는 절대 철벽.'
  },
  {
    id: 'status_testing_doubt',
    fileTag: '1_의심.webp',
    src: '/assets/aistudio/1____7f0e82c1.webp',
    title: '간보기 21~40 (계산과 의심)',
    category: 'status',
    mood: 'realist',
    quote: '너 속셈이 뭐야? 공짜로 입 닫아줄 인간은 없는데.',
    context: '눈을 가늘게 뜨고 상대방의 진의를 시험하는 단계.'
  },
  {
    id: 'status_crack_pout',
    fileTag: '1_화남.webp',
    src: '/assets/aistudio/1____7ad19b30.webp',
    title: '균열 41~60 (짜증과 당황)',
    category: 'status',
    mood: 'realist',
    quote: '…웃기지 마. 아니, 방금 웃은 건 나네. 진짜 짜증 나.',
    context: '가식 미소가 아닌 진짜 실소가 터져 나와 분해하는 찰나.'
  },
  {
    id: 'status_loose_relaxed',
    fileTag: '1_포옹.webp',
    src: '/assets/aistudio/1____ff7135bf.webp',
    title: '느슨 61~80 (긴장 완화)',
    category: 'status',
    mood: 'angel',
    quote: '…너랑 있을 땐 턱 근육이 안 아파서 편하긴 해. 말하진 않겠지만.',
    context: '허용 거리 0.5m 이내. 가면을 벗고 온전히 쉴 수 있는 시간.'
  },
  {
    id: 'status_unarmed_smile',
    fileTag: '1_웃음.webp',
    src: '/assets/aistudio/1____a5e08a88.webp',
    title: '무장해제 81~100 (진짜 미소)',
    category: 'status',
    mood: 'angel',
    quote: '…푸흡. 뭐야, 그 표정은? 진짜 바보 같아.',
    context: '가면도 손익 계산도 모두 내려놓고 터뜨리는 18세 한세아의 진짜 웃음.'
  },

  // --- Story Catalysts & NPCs ---
  {
    id: 'archive_past_trauma',
    fileTag: '1_눈물.webp',
    src: '/assets/aistudio/1____c5ab642a.webp',
    title: '중2의 흉터 (이도희 사건의 눈물)',
    category: 'archive',
    mood: 'dramatic',
    quote: '착하면 다 만만하게 봐. 이용당하고, 상처받고… 난 다시는 바보처럼 안 살아.',
    context: '신뢰했던 절친 이도희에게 배신당한 후 결심한 "절대 틈을 주지 않는 천사"의 기원.'
  },
  {
    id: 'archive_mayo_cat',
    fileTag: '___1_1a56e54a.webp',
    src: '/assets/aistudio/___1_1a56e54a.webp',
    title: '옥상의 치즈태비 마요 (실외기의 봄)',
    category: 'archive',
    mood: 'angel',
    quote: '골골골… (실외기 위에서 봄볕과 벚꽃비를 받으며 편안하게 세아를 올려다봅니다.)',
    context: '본관 옥상 기와와 실외기 위에서 일광욕을 즐기는 치즈태비 길고양이 마요. 세아가 사비로 고급 츄르를 바치며 혀 짧은 소리를 내는 유일한 존재.'
  },
  {
    id: 'archive_tired_afterschool',
    fileTag: '1_피곤함.webp',
    src: '/assets/aistudio/1_____0b7c111a.webp',
    title: '방과 후 방전 (체력 방전)',
    category: 'archive',
    mood: 'realist',
    quote: '하루 종일 52번 웃었어. 오늘 안면 근육 노동량 합의금으로 받아내야 돼…',
    context: '종례가 끝나고 빈 교실 책상에 엎드려 방전된 진짜 고2 학생.'
  },
  {
    id: 'archive_playful_wink',
    fileTag: '1_장난.webp',
    src: '/assets/aistudio/1____f4ff0dc7.webp',
    title: '티키타카 앙숙 (장난과 도발)',
    category: 'archive',
    mood: 'realist',
    quote: '네 성적표 봤는데, 나한테 신 사탕 10개는 바쳐야 과외 해줄까 말까야.',
    context: '공범 관계에서 싹트는 얄밉지만 밉지 않은 장난기 어린 눈빛.'
  },
  {
    id: 'archive_desperate_clutch',
    fileTag: '1_애교.webp',
    src: '/assets/aistudio/1____43e18926.webp',
    title: '수첩 수호 (절대 사수)',
    category: 'archive',
    mood: 'flustered',
    quote: '손 떼! 수첩에서 손 떼라고! 그거 보면 너 평생 내 노예로 계약할 줄 알아!',
    context: '가방 속 저주 수첩을 뺏길 뻔하자 온몸으로 막아서는 필사의 방어.'
  },
  {
    id: 'archive_pure_relief',
    fileTag: '1_안도.webp',
    src: '/assets/aistudio/1____ed44a001.webp',
    title: '비밀 보장의 안도 (내 편)',
    category: 'archive',
    mood: 'angel',
    quote: '…진짜 소문 안 냈네. 고맙… 아니, 당연한 거지. 거래 조건이니까.',
    context: '목격자가 비밀을 끝까지 지켜준 것을 확인하고 내쉬는 작은 한숨.'
  }
];

export const HERO_ASSETS = {
  angel: '/assets/aistudio/1____c72b20db.webp',
  realist: '/assets/aistudio/1____248b5c28.webp',
  flustered: '/assets/aistudio/1____6fc86535.webp'
};

export const THREE_FACES_ASSETS = {
  mask: '/assets/aistudio/1______1a352da8.webp',
  real: '/assets/aistudio/1_____0d3f1358.webp',
  core: '/assets/aistudio/1____6fc86535.webp'
};

export const MAYO_CAT_IMAGE = '/assets/aistudio/___1_1a56e54a.webp';

export function getHudReactionImage(relaxation: number, smileCount: number, isFlustered: boolean): {
  src: string;
  tag: string;
  label: string;
} {
  if (isFlustered) {
    return {
      src: '/assets/aistudio/1____6fc86535.webp',
      tag: '1_거울.webp',
      label: '알맹이 고장 (귀 끝 붉어짐)'
    };
  }

  // Jaw condition threshold first
  if (smileCount >= 40) {
    return {
      src: '/assets/aistudio/1______a3434cf9.webp',
      tag: '1_가면균열.webp',
      label: '탈골 위기 (살의 99% 경련)'
    };
  }

  if (smileCount >= 25) {
    return {
      src: '/assets/aistudio/1____7ad19b30.webp',
      tag: '1_화남.webp',
      label: '경련 (안면 마비 직전)'
    };
  }

  // Relaxation stages
  if (relaxation <= 20) {
    return {
      src: '/assets/aistudio/1_____a4861cfe.webp',
      tag: '1_냉정함.webp',
      label: '철벽 (0~20)'
    };
  }
  if (relaxation <= 40) {
    return {
      src: '/assets/aistudio/1____7f0e82c1.webp',
      tag: '1_의심.webp',
      label: '간보기 (21~40)'
    };
  }
  if (relaxation <= 60) {
    return {
      src: '/assets/aistudio/1____375749d7.webp',
      tag: '1_당황.webp',
      label: '균열 (41~60)'
    };
  }
  if (relaxation <= 80) {
    return {
      src: '/assets/aistudio/1____ff7135bf.webp',
      tag: '1_포옹.webp',
      label: '느슨 (61~80)'
    };
  }
  return {
    src: '/assets/aistudio/1____a5e08a88.webp',
    tag: '1_웃음.webp',
    label: '무장해제 (81~100)'
  };
}
