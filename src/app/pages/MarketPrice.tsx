import { Gem, ChefHat, Pickaxe, Fish, Package, Tag, ShoppingBag, Sprout } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router";

function fmt(n: number) { return n.toLocaleString("ko-KR"); }

// ─── 데이터 ──────────────────────────────────────────────────────────────────

const OTHER_ITEMS = [
  { name: "광물 주머니", price: 2562, unit: "1개", note: "64개 = 163,968원" },
  { name: "이벤트 선물상자", price: 350000, unit: "1개", note: "" },
  { name: "핫타임 선물상자", price: 450000, unit: "1개", note: "" },
  { name: "추천 코인 조각", price: 50000, unit: "1개", note: "" },
  { name: "추천 코인", price: 500000, unit: "1개", note: "" },
];

const CROPS = [
  { name: "밀", price: 6370, emoji: "🌾" },
  { name: "건초더미", price: 58350, emoji: "🌿" },
  { name: "수박", price: 850, emoji: "🍉" },
  { name: "수박 블럭", price: 7060, emoji: "🍉" },
  { name: "호박", price: 6920, emoji: "🎃" },
  { name: "감자", price: 1000, emoji: "🥔" },
  { name: "구운 감자", price: 1100, emoji: "🥔" },
  { name: "독 감자", price: 43000, emoji: "☠️" },
  { name: "당근", price: 1220, emoji: "🥕" },
  { name: "사탕무", price: 6300, emoji: "🫚" },
  { name: "네더 사마귀", price: 1900, emoji: "🍄" },
  { name: "사과", price: 96000, emoji: "🍎" },
  { name: "사탕수수", price: 3460, emoji: "🎋" },
  { name: "코코아콩", price: 3380, emoji: "🫘" },
];

const CRYSTALS_MINING = [
  { name: "에메랄드", price: 17550, emoji: "💚" },
  { name: "다이아몬드", price: 11700, emoji: "💎" },
  { name: "철 결정", price: 1560, emoji: "🔩" },
  { name: "돌 결정", price: 585, emoji: "🪨" },
];

const CRYSTALS_FISHING = [
  { name: "파도의 결정", price: 50000, emoji: "🌊" },
];

const MINERAL_BLOCKS = [
  { name: "석탄 블록", price: 3745, emoji: "⬛" },
  { name: "청금석 블록", price: 2995, emoji: "🔷" },
  { name: "구리 블록", price: 14227, emoji: "🟤" },
  { name: "철 블록", price: 23215, emoji: "⬜" },
  { name: "금 블록", price: 31450, emoji: "🟡" },
  { name: "에메랄드 블록", price: 58410, emoji: "🟩" },
  { name: "네더라이트 블록", price: 1347840, emoji: "🖤" },
];

const COOKING_PREMIUM = [
  { name: "사랑의 도시락", price: 1300000, emoji: "❤️" },
  { name: "정성의 도시락", price: 403000, emoji: "🥺" },
];

const COOKING_NORMAL = [
  { name: "고기 반찬", price: 54000, emoji: "🍖" },
  { name: "황금 쿠키", price: 6440, emoji: "🍪" },
  { name: "당근 빵", price: 5525, emoji: "🍞" },
  { name: "사악한 수박", price: 5460, emoji: "🍉" },
  { name: "악마 사탕", price: 4585, emoji: "🍬" },
  { name: "멜론 빵", price: 3510, emoji: "🍈" },
  { name: "햄버거", price: 3192, emoji: "🍔" },
];

const COOKING_MATS_CAN = [
  { name: "사탕무 통조림", price: 122850, emoji: "🥫" },
  { name: "설탕 통조림", price: 67470, emoji: "🥫" },
  { name: "코코아콩 통조림", price: 65910, emoji: "🥫" },
  { name: "네더 사마귀 통조림", price: 37050, emoji: "🥫" },
];

const COOKING_MATS_DROP = [
  { name: "달달한 호박", price: 845, emoji: "🎃" },
  { name: "달콤한 비트", price: 515, emoji: "🫚" },
  { name: "향긋한 코코아콩", price: 575, emoji: "🫘" },
  { name: "알싸한 네더 사마귀", price: 665, emoji: "🍄" },
  { name: "아삭한 당근", price: 445, emoji: "🥕" },
  { name: "포슬한 감자", price: 410, emoji: "🥔" },
  { name: "구수한 밀", price: 385, emoji: "🌾" },
  { name: "아삭한 수박", price: 390, emoji: "🍉" },
  { name: "상큼한 사과", price: 390, emoji: "🍎" },
];

// ─── 공통 테이블 컴포넌트 ────────────────────────────────────────────────────

interface PriceRow {
  name: string;
  price: number;
  emoji?: string;
  note?: string;
  unit?: string;
}

function PriceTable({ rows, unitLabel, accent }: { rows: PriceRow[]; unitLabel: string; accent: string }) {
  return (
    <div className="divide-y divide-slate-50">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors"
        >
          {row.emoji && <span style={{ fontSize: "17px", minWidth: "22px" }}>{row.emoji}</span>}
          <div className="flex-1 min-w-0">
            <span className="text-slate-800" style={{ fontSize: "13.5px", fontWeight: 600 }}>
              {row.name}
            </span>
            {row.note && (
              <span className="ml-2 text-slate-400" style={{ fontSize: "11px" }}>
                ({row.note})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`${accent} rounded-full px-2 py-0.5`} style={{ fontSize: "10px", fontWeight: 600 }}>
              {row.unit ?? unitLabel}
            </span>
            <span className="text-slate-800 tabular-nums" style={{ fontSize: "14px", fontWeight: 700 }}>
              {fmt(row.price)}원
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 섹션 카드 컴포넌트 ──────────────────────────────────────────────────────

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  unitLabel: string;
  unitDesc: string;
  accentClass: string;
  headerGradient: string;
  children: React.ReactNode;
}

function SectionCard({ icon, title, unitLabel, unitDesc, accentClass, headerGradient, children }: SectionCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className={`flex items-center gap-3 px-5 py-4 border-b border-slate-100 ${headerGradient}`}>
        <span className="text-xl">{icon}</span>
        <div className="flex-1">
          <span className="text-slate-800" style={{ fontSize: "15px", fontWeight: 700 }}>{title}</span>
          <span
            className={`ml-2 rounded-full px-2.5 py-0.5 ${accentClass}`}
            style={{ fontSize: "10.5px", fontWeight: 700 }}
          >
            {unitLabel}
          </span>
        </div>
        <span className="text-slate-400" style={{ fontSize: "11px" }}>{unitDesc}</span>
      </div>
      {children}
    </div>
  );
}

// ─── 서브 그룹 헤더 ──────────────────────────────────────────────────────────

function SubHeader({ label, color }: { label: string; color: string }) {
  return (
    <div className={`px-5 py-2 border-b border-slate-50 ${color}`}>
      <span className="text-slate-600" style={{ fontSize: "11px", fontWeight: 700 }}>{label}</span>
    </div>
  );
}

// ─── 앵커 스크롤 처리 ────────────────────────────────────────────────────────
function useScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("wiki-highlight-flash");
        setTimeout(() => el.classList.remove("wiki-highlight-flash"), 2200);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [location.hash]);
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function MarketPrice() {
  useScrollToHash();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-4">
          <Tag className="w-3.5 h-3.5 text-teal-500" />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#0d9488" }}>시세 정보</span>
        </div>
        <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, lineHeight: 1.2 }}>
          아이템 최대 시세
        </h1>
        <p className="text-slate-500" style={{ fontSize: "15px" }}>
          플레이팜3 대량상점 기준 최대 시세입니다. 실제 시장 상황에 따라 달라질 수 있어요.
        </p>
        <div
          className="inline-flex items-center gap-2 mt-3 rounded-xl px-3 py-2"
          style={{ background: "#fef3c7", border: "1px solid #fde68a" }}
        >
          <span style={{ fontSize: "13px" }}>⚠️</span>
          <span className="text-amber-700" style={{ fontSize: "12px", fontWeight: 500 }}>
            시세는 서버 상황에 따라 변동될 수 있으니 참고용으로만 이용해 주세요.
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* 기타 아이템 */}
        <div id="mp-other">
        <SectionCard
          icon={<ShoppingBag className="w-5 h-5 text-violet-500" />}
          title="기타 아이템"
          unitLabel="개 기준"
          unitDesc="1개 단위"
          accentClass="bg-violet-100 text-violet-700"
          headerGradient="bg-gradient-to-r from-violet-50 to-purple-50"
        >
          <PriceTable
            rows={OTHER_ITEMS}
            unitLabel="1개"
            accent="bg-violet-100 text-violet-700"
          />
        </SectionCard>
        </div>

        {/* 농작물 */}
        <div id="mp-crops">
        <SectionCard
          icon={<Sprout className="w-5 h-5 text-green-500" />}
          title="농작물"
          unitLabel="셋 기준"
          unitDesc="64개 = 1셋"
          accentClass="bg-green-100 text-green-700"
          headerGradient="bg-gradient-to-r from-green-50 to-emerald-50"
        >
          <PriceTable
            rows={CROPS.map(c => ({ ...c, unit: "1셋(64개)" }))}
            unitLabel="1셋(64개)"
            accent="bg-green-100 text-green-700"
          />
        </SectionCard>
        </div>

        {/* 결정석 */}
        <div id="mp-crystals">
        <SectionCard
          icon={<Gem className="w-5 h-5 text-sky-500" />}
          title="결정석"
          unitLabel="개 기준"
          unitDesc="1개 단위"
          accentClass="bg-sky-100 text-sky-700"
          headerGradient="bg-gradient-to-r from-sky-50 to-cyan-50"
        >
          <SubHeader label="⛏️ 채광장" color="bg-slate-50/80" />
          <PriceTable
            rows={CRYSTALS_MINING.map(c => ({ ...c, unit: "1개" }))}
            unitLabel="1개"
            accent="bg-sky-100 text-sky-700"
          />
          <SubHeader label="🎣 낚시터" color="bg-slate-50/80" />
          <PriceTable
            rows={CRYSTALS_FISHING.map(c => ({ ...c, unit: "1개" }))}
            unitLabel="1개"
            accent="bg-sky-100 text-sky-700"
          />
        </SectionCard>
        </div>

        {/* 광물 블록 */}
        <div id="mp-blocks">
        <SectionCard
          icon={<Pickaxe className="w-5 h-5 text-amber-500" />}
          title="광물 블록"
          unitLabel="셋 기준"
          unitDesc="64개 = 1셋"
          accentClass="bg-amber-100 text-amber-700"
          headerGradient="bg-gradient-to-r from-amber-50 to-yellow-50"
        >
          <PriceTable
            rows={MINERAL_BLOCKS.map(b => ({ ...b, unit: "1셋(64개)" }))}
            unitLabel="1셋(64개)"
            accent="bg-amber-100 text-amber-700"
          />
        </SectionCard>
        </div>

        {/* 요리 */}
        <div id="mp-cooking">
        <SectionCard
          icon={<ChefHat className="w-5 h-5 text-orange-500" />}
          title="요리"
          unitLabel="개 기준"
          unitDesc="1개 단위"
          accentClass="bg-orange-100 text-orange-700"
          headerGradient="bg-gradient-to-r from-orange-50 to-red-50"
        >
          <SubHeader label="⭐ 고급 요리 (2시간 제작)" color="bg-orange-50/60" />
          <PriceTable
            rows={COOKING_PREMIUM.map(c => ({ ...c, unit: "1개" }))}
            unitLabel="1개"
            accent="bg-orange-100 text-orange-700"
          />
          <SubHeader label="⚡ 일반 요리 (즉시)" color="bg-slate-50/80" />
          <PriceTable
            rows={COOKING_NORMAL.map(c => ({ ...c, unit: "1개" }))}
            unitLabel="1개"
            accent="bg-orange-100 text-orange-700"
          />
        </SectionCard>
        </div>

        {/* 요리 재료 */}
        <div id="mp-mats">
        <SectionCard
          icon={<Package className="w-5 h-5 text-rose-500" />}
          title="요리 재료"
          unitLabel="개 기준"
          unitDesc="1개 단위"
          accentClass="bg-rose-100 text-rose-700"
          headerGradient="bg-gradient-to-r from-rose-50 to-pink-50"
        >
          <SubHeader label="🥫 가공 재료 (통조림)" color="bg-sky-50/60" />
          <PriceTable
            rows={COOKING_MATS_CAN.map(c => ({ ...c, unit: "1개" }))}
            unitLabel="1개"
            accent="bg-sky-100 text-sky-700"
          />
          <SubHeader label="✨ 드롭 재료 (수확 드롭)" color="bg-amber-50/60" />
          <PriceTable
            rows={COOKING_MATS_DROP.map(c => ({ ...c, unit: "1개" }))}
            unitLabel="1개"
            accent="bg-amber-100 text-amber-700"
          />
        </SectionCard>
        </div>

        {/* 안내 */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
          <p className="text-slate-500" style={{ fontSize: "12.5px", lineHeight: 1.8 }}>
            📌 <strong className="text-slate-700">최대 시세 기준 안내</strong><br />
            위 시세는 플레이팜3 대량상점(벌크 거래)에서 형성된 최대 시세 기준입니다.<br />
            실제 거래 시에는 대량상점 보너스(+1~30%) 여부에 따라 수익이 달라질 수 있어요.<br />
            💰 <strong className="text-slate-700">상점가 계산기</strong>에서 대량상점 보너스를 포함한 정확한 판매금액을 계산해 보세요.
          </p>
        </div>
      </div>
    </div>
  );
}