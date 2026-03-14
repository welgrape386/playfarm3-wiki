export interface PriceItem {
  id: string;
  name: string;
  emoji: string;
  pricePerStack: number; // 개당 판매가 (unitSize = 1)
  unitSize: 1;
  note?: string;
}

export interface PriceCategory {
  id: string;
  label: string;
  emoji: string;
  color: string;
  items: PriceItem[];
}

export const priceCategories: PriceCategory[] = [
  {
    id: "crops",
    label: "농작물",
    emoji: "🌾",
    color: "green",
    items: [
      { id: "wheat",         name: "밀",            emoji: "🌾", pricePerStack: 83,  unitSize: 1 },
      { id: "hay",           name: "건초더미",       emoji: "🌿", pricePerStack: 760, unitSize: 1 },
      { id: "melon-slice",   name: "수박 조각",      emoji: "🍉", pricePerStack: 11,  unitSize: 1 },
      { id: "melon-block",   name: "수박 블럭",      emoji: "🟩", pricePerStack: 92,  unitSize: 1 },
      { id: "pumpkin",       name: "호박",           emoji: "🎃", pricePerStack: 90,  unitSize: 1 },
      { id: "potato",        name: "감자",           emoji: "🥔", pricePerStack: 13,  unitSize: 1 },
      { id: "baked-potato",  name: "구운 감자",      emoji: "🔥", pricePerStack: 14,  unitSize: 1 },
      { id: "poison-potato", name: "독이 있는 감자", emoji: "☠️", pricePerStack: 560, unitSize: 1 },
      { id: "carrot",        name: "당근",           emoji: "🥕", pricePerStack: 16,  unitSize: 1 },
      { id: "beetroot",      name: "사탕무",         emoji: "🫚", pricePerStack: 82,  unitSize: 1 },
      { id: "nether-wart",   name: "네더 사마귀",    emoji: "🍄", pricePerStack: 23,  unitSize: 1 },
      { id: "cocoa-bean",    name: "코코아콩",       emoji: "🫘", pricePerStack: 44,  unitSize: 1 },
      { id: "sugar-cane",    name: "사탕수수",       emoji: "🎋", pricePerStack: 45,  unitSize: 1 },
    ],
  },
  {
    id: "drops",
    label: "드롭 재료",
    emoji: "✨",
    color: "amber",
    items: [
      { id: "drop-wheat",       name: "구수한 밀",         emoji: "🌾", pricePerStack: 295, unitSize: 1, note: "밀 수확" },
      { id: "drop-melon",       name: "아삭한 수박",       emoji: "🍉", pricePerStack: 300, unitSize: 1, note: "수박 수확" },
      { id: "drop-sweet-melon", name: "달달한 수박",       emoji: "🍈", pricePerStack: 650, unitSize: 1, note: "수박 수확" },
      { id: "drop-beet",        name: "달콤한 비트",       emoji: "🫚", pricePerStack: 397, unitSize: 1, note: "사탕무 수확" },
      { id: "drop-cocoa",       name: "향긋한 코코아콩",   emoji: "🫘", pricePerStack: 442, unitSize: 1, note: "코코아 수확" },
      { id: "drop-nether",      name: "알싸한 네더 사마귀",emoji: "🍄", pricePerStack: 510, unitSize: 1, note: "네더 사마귀 수확" },
      { id: "drop-carrot",      name: "아삭한 당근",       emoji: "🥕", pricePerStack: 340, unitSize: 1, note: "당근 수확" },
      { id: "drop-potato",      name: "포슬한 감자",       emoji: "🥔", pricePerStack: 316, unitSize: 1, note: "감자 수확" },
      { id: "drop-apple",       name: "상큼한 사과",       emoji: "🍎", pricePerStack: 340, unitSize: 1, note: "사과 수확" },
    ],
  },
  {
    id: "crystals",
    label: "결정석",
    emoji: "💎",
    color: "sky",
    items: [
      { id: "crystal-emerald", name: "에메랄드 결정",   emoji: "💚", pricePerStack: 17550, unitSize: 1, note: "채광장" },
      { id: "crystal-diamond", name: "다이아몬드 결정", emoji: "💎", pricePerStack: 11700, unitSize: 1, note: "채광장" },
      { id: "crystal-gold",    name: "황금 결정",       emoji: "🟡", pricePerStack: 2710,  unitSize: 1, note: "채광장" },
      { id: "crystal-iron",    name: "철 결정",         emoji: "⬜", pricePerStack: 1560,  unitSize: 1, note: "채광장" },
      { id: "crystal-stone",   name: "돌 결정",         emoji: "🪨", pricePerStack: 585,   unitSize: 1, note: "채광장" },
      { id: "crystal-wave",    name: "파도의 결정",     emoji: "🌊", pricePerStack: 50000, unitSize: 1, note: "낚시터" },
    ],
  },
];
