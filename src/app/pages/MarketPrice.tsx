import { Gem, ChefHat, Pickaxe, Fish, Package, Tag, ShoppingBag, Sprout, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function fmt(n: number) { return n.toLocaleString("ko-KR"); }

// ─── 데이터 ──────────────────────────────────────────────────────────────────

const OTHER_ITEMS = [
  { name: "광물 주머니", price: 2562, unit: "1개", unitType: "개", note: "64개 = 163,968원" },
  { name: "이벤트 선물상자", price: 350000, unit: "1개", unitType: "개", note: "" },
  { name: "핫타임 선물상자", price: 450000, unit: "1개", unitType: "개", note: "" },
  { name: "추천 코인 조각", price: 50000, unit: "1개", unitType: "개", note: "" },
  { name: "추천 코인", price: 500000, unit: "1개", unitType: "개", note: "" },
];

const CROPS = [
  { name: "밀", price: 6370, emoji: "🌾", unitType: "셋" },
  { name: "건초더미", price: 58350, emoji: "🌿", unitType: "셋" },
  { name: "수박", price: 850, emoji: "🍉", unitType: "셋" },
  { name: "수박 블럭", price: 7060, emoji: "🍉", unitType: "셋" },
  { name: "호박", price: 6920, emoji: "🎃", unitType: "셋" },
  { name: "감자", price: 1000, emoji: "🥔", unitType: "셋" },
  { name: "구운 감자", price: 1100, emoji: "🥔", unitType: "셋" },
  { name: "독 감자", price: 43000, emoji: "☠️", unitType: "셋" },
  { name: "당근", price: 1220, emoji: "🥕", unitType: "셋" },
  { name: "사탕무", price: 6300, emoji: "🫚", unitType: "셋" },
  { name: "네더 사마귀", price: 1900, emoji: "🍄", unitType: "셋" },
  { name: "사과", price: 96000, emoji: "🍎", unitType: "셋" },
  { name: "사탕수수", price: 3460, emoji: "🎋", unitType: "셋" },
  { name: "코코아콩", price: 3380, emoji: "🫘", unitType: "셋" },
];

const CRYSTALS_MINING = [
  { name: "에메랄드", price: 17550, emoji: "💚", unitType: "개" },
  { name: "다이아몬드", price: 11700, emoji: "💎", unitType: "개" },
  { name: "철 결정", price: 1560, emoji: "🔩", unitType: "개" },
  { name: "돌 결정", price: 585, emoji: "🪨", unitType: "개" },
];

const CRYSTALS_FISHING = [
  { name: "파도의 결정", price: 50000, emoji: "🌊", unitType: "개" },
];

const MINERAL_BLOCKS = [
  { name: "석탄 블록", price: 3745, emoji: "⬛", unitType: "셋" },
  { name: "청금석 블록", price: 2995, emoji: "🔷", unitType: "셋" },
  { name: "구리 블록", price: 14227, emoji: "🟤", unitType: "셋" },
  { name: "철 블록", price: 23215, emoji: "🔲", unitType: "셋" },
  { name: "금 블록", price: 31450, emoji: "🟡", unitType: "셋" },
  { name: "에메랄드 블록", price: 58410, emoji: "🟩", unitType: "셋" },
  { name: "네더라이트 블록", price: 1347840, emoji: "🖤", unitType: "셋" },
];

const COOKING_PREMIUM = [
  { name: "사랑의 도시락", price: 1300000, emoji: "❤️", unitType: "개" },
  { name: "정성의 도시락", price: 403000, emoji: "🥺", unitType: "개" },
];

const COOKING_NORMAL = [
  { name: "고기 반찬", price: 54000, emoji: "🍖", unitType: "개" },
  { name: "황금 쿠키", price: 6440, emoji: "🍪", unitType: "개" },
  { name: "당근 빵", price: 5525, emoji: "🍞", unitType: "개" },
  { name: "사악한 수박", price: 5460, emoji: "🍉", unitType: "개" },
  { name: "악마 사탕", price: 4585, emoji: "🍬", unitType: "개" },
  { name: "멜론 빵", price: 3510, emoji: "🍈", unitType: "개" },
  { name: "햄버거", price: 3192, emoji: "🍔", unitType: "개" },
];

const COOKING_MATS_CAN = [
  { name: "사탕무 통조림", price: 122850, emoji: "🥫", unitType: "개" },
  { name: "설탕 통조림", price: 67470, emoji: "🥫", unitType: "개" },
  { name: "코코아콩 통조림", price: 65910, emoji: "🥫", unitType: "개" },
  { name: "네더 사마귀 통조림", price: 37050, emoji: "🥫", unitType: "개" },
];

const COOKING_MATS_DROP = [
  { name: "달달한 호박", price: 845, emoji: "🎃", unitType: "개" },
  { name: "달콤한 비트", price: 515, emoji: "🫚", unitType: "개" },
  { name: "향긋한 코코아콩", price: 575, emoji: "🫘", unitType: "개" },
  { name: "알싸한 네더 사마귀", price: 665, emoji: "🍄", unitType: "개" },
  { name: "아삭한 당근", price: 445, emoji: "🥕", unitType: "개" },
  { name: "포슬한 감자", price: 410, emoji: "🥔", unitType: "개" },
  { name: "구수한 밀", price: 385, emoji: "🌾", unitType: "개" },
  { name: "아삭한 수박", price: 390, emoji: "🍉", unitType: "개" },
  { name: "상큼한 사과", price: 390, emoji: "🍎", unitType: "개" },
];

// ─── 아이템 행 (수량 입력 포함) ───────────────────────────────────────────────

interface PriceRow {
  name: string;
  price: number;
  emoji?: string;
  note?: string;
  unit?: string;
  unitType: string;
}

function PriceRowItem({
  row,
  accent,
  inputBorder,
  resultColor,
}: {
  row: PriceRow;
  accent: string;
  inputBorder: string;
  resultColor: string;
}) {
  const [qty, setQty] = useState<string>("");
  const parsed = Number(qty);
  const total = qty !== "" && !isNaN(parsed) && parsed > 0 ? parsed * row.price : null;

  return (
    <div className="flex flex-col px-5 py-3 hover:bg-slate-50/60 transition-colors border-b border-slate-50 last:border-b-0">
      {/* 상단: 이모지 + 아이템명 + 단가 */}
      <div className="flex items-center gap-3">
        {row.emoji && (
          <span style={{ fontSize: "17px", minWidth: "22px", lineHeight: 1, flexShrink: 0 }}>
            {row.emoji}
          </span>
        )}
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
        <div className="flex flex-col items-end gap-1 flex-shrink-0" style={{ minWidth: "220px" }}>
          {/* 단가 */}
          <div className="flex items-center gap-1.5">
            <span
              className={`${accent} rounded-full px-2 py-0.5`}
              style={{ fontSize: "10px", fontWeight: 600, whiteSpace: "nowrap" }}
            >
              {row.unit ?? `1${row.unitType}`}
            </span>
            <span
              className="text-slate-700 tabular-nums"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              {fmt(row.price)}원
            </span>
          </div>
          {/* 수량 입력 + 계산 결과 (단가 바로 아래, 오른쪽 정렬) */}
          <div className="flex items-center gap-1.5 w-full justify-end">
            <div
              className="flex items-center gap-1 rounded-lg px-2 py-0.5 bg-white"
              style={{ border: `1.5px solid ${inputBorder}` }}
            >
              <input
                type="number"
                min={0}
                placeholder="0"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-12 text-right bg-transparent focus:outline-none tabular-nums"
                style={{
                  fontSize: "12px",
                  color: "#334155",
                  MozAppearance: "textfield",
                } as React.CSSProperties}
              />
              <span className="text-slate-400" style={{ fontSize: "10.5px", fontWeight: 500, whiteSpace: "nowrap" }}>
                {row.unitType}
              </span>
            </div>
            <span className="text-slate-300" style={{ fontSize: "11px" }}>→</span>
            <span
              className={`tabular-nums ${total !== null ? resultColor : "text-slate-300"}`}
              style={{ fontSize: "12.5px", fontWeight: total !== null ? 700 : 400, minWidth: "90px", textAlign: "right" }}
            >
              {total !== null ? `${fmt(total)}원` : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 공통 테이블 컴포넌트 ────────────────────────────────────────────────────

function PriceTable({
  rows,
  accent,
  inputBorder,
  resultColor,
}: {
  rows: PriceRow[];
  accent: string;
  inputBorder: string;
  resultColor: string;
}) {
  return (
    <div>
      {rows.map((row, i) => (
        <PriceRowItem
          key={i}
          row={row}
          accent={accent}
          inputBorder={inputBorder}
          resultColor={resultColor}
        />
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
  defaultOpen?: boolean;
}

function SectionCard({
  icon,
  title,
  unitLabel,
  unitDesc,
  accentClass,
  headerGradient,
  children,
  defaultOpen = true,
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-5 py-4 border-b border-slate-100 ${headerGradient} transition-colors hover:brightness-95`}
      >
        <span className="text-xl">{icon}</span>
        <div className="flex-1 text-left">
          <span className="text-slate-800" style={{ fontSize: "15px", fontWeight: 700 }}>
            {title}
          </span>
          <span
            className={`ml-2 rounded-full px-2.5 py-0.5 ${accentClass}`}
            style={{ fontSize: "10.5px", fontWeight: 700 }}
          >
            {unitLabel}
          </span>
        </div>
        <span className="text-slate-400 mr-2" style={{ fontSize: "11px" }}>
          {unitDesc}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.22s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── 서브 그룹 헤더 ──────────────────────────────────────────────────────────

function SubHeader({ label, color }: { label: string; color: string }) {
  return (
    <div className={`px-5 py-2 border-b border-slate-50 ${color}`}>
      <span className="text-slate-600" style={{ fontSize: "11px", fontWeight: 700 }}>
        {label}
      </span>
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
        <h1
          className="text-slate-800 mb-2"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          아이템 최대 시세
        </h1>
        <p className="text-slate-500" style={{ fontSize: "15px" }}>
          플레이팜3 서버에서 공식으로 설정한 아이템별 최대 시세입니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* 농작물 — 기본 펼침 */}
        <div id="mp-crops">
          <SectionCard
            icon={<Sprout className="w-5 h-5 text-green-500" />}
            title="농작물"
            unitLabel="셋 기준"
            unitDesc="64개 = 1셋"
            accentClass="bg-green-100 text-green-700"
            headerGradient="bg-gradient-to-r from-green-50 to-emerald-50"
            defaultOpen={true}
          >
            <PriceTable
              rows={CROPS.map((c) => ({ ...c, unit: "1셋(64개)" }))}
              accent="bg-green-100 text-green-700"
              inputBorder="#86efac"
              resultColor="text-green-700"
            />
          </SectionCard>
        </div>

        {/* 결정석 — 기본 접힘 */}
        <div id="mp-crystals">
          <SectionCard
            icon={<Gem className="w-5 h-5 text-sky-500" />}
            title="결정석"
            unitLabel="개 기준"
            unitDesc="1개 단위"
            accentClass="bg-sky-100 text-sky-700"
            headerGradient="bg-gradient-to-r from-sky-50 to-cyan-50"
            defaultOpen={false}
          >
            <SubHeader label="⛏️ 채광장" color="bg-slate-50/80" />
            <PriceTable
              rows={CRYSTALS_MINING.map((c) => ({ ...c, unit: "1개" }))}
              accent="bg-sky-100 text-sky-700"
              inputBorder="#7dd3fc"
              resultColor="text-sky-700"
            />
            <SubHeader label="🎣 낚시터" color="bg-slate-50/80" />
            <PriceTable
              rows={CRYSTALS_FISHING.map((c) => ({ ...c, unit: "1개" }))}
              accent="bg-sky-100 text-sky-700"
              inputBorder="#7dd3fc"
              resultColor="text-sky-700"
            />
          </SectionCard>
        </div>

        {/* 광물 블록 — 기본 접힘 */}
        <div id="mp-blocks">
          <SectionCard
            icon={<Pickaxe className="w-5 h-5 text-amber-500" />}
            title="광물 블록"
            unitLabel="셋 기준"
            unitDesc="64개 = 1셋"
            accentClass="bg-amber-100 text-amber-700"
            headerGradient="bg-gradient-to-r from-amber-50 to-yellow-50"
            defaultOpen={false}
          >
            <PriceTable
              rows={MINERAL_BLOCKS.map((b) => ({ ...b, unit: "1셋(64개)" }))}
              accent="bg-amber-100 text-amber-700"
              inputBorder="#fcd34d"
              resultColor="text-amber-700"
            />
          </SectionCard>
        </div>

        {/* 요리 — 기본 접힘 */}
        <div id="mp-cooking">
          <SectionCard
            icon={<ChefHat className="w-5 h-5 text-orange-500" />}
            title="요리"
            unitLabel="개 기준"
            unitDesc="1개 단위"
            accentClass="bg-orange-100 text-orange-700"
            headerGradient="bg-gradient-to-r from-orange-50 to-red-50"
            defaultOpen={false}
          >
            <SubHeader label="⭐ 고급 요리 (2시간 제작)" color="bg-orange-50/60" />
            <PriceTable
              rows={COOKING_PREMIUM.map((c) => ({ ...c, unit: "1개" }))}
              accent="bg-orange-100 text-orange-700"
              inputBorder="#fdba74"
              resultColor="text-orange-700"
            />
            <SubHeader label="⚡ 일반 요리 (즉시)" color="bg-slate-50/80" />
            <PriceTable
              rows={COOKING_NORMAL.map((c) => ({ ...c, unit: "1개" }))}
              accent="bg-orange-100 text-orange-700"
              inputBorder="#fdba74"
              resultColor="text-orange-700"
            />
          </SectionCard>
        </div>

        {/* 요리 재료 — 기본 접힘 */}
        <div id="mp-mats">
          <SectionCard
            icon={<Package className="w-5 h-5 text-rose-500" />}
            title="요리 재료"
            unitLabel="개 기준"
            unitDesc="1개 단위"
            accentClass="bg-rose-100 text-rose-700"
            headerGradient="bg-gradient-to-r from-rose-50 to-pink-50"
            defaultOpen={false}
          >
            <SubHeader label="🥫 가공 재료 (통조림)" color="bg-sky-50/60" />
            <PriceTable
              rows={COOKING_MATS_CAN.map((c) => ({ ...c, unit: "1개" }))}
              accent="bg-sky-100 text-sky-700"
              inputBorder="#7dd3fc"
              resultColor="text-sky-700"
            />
            <SubHeader label="✨ 드롭 재료 (수확 드롭)" color="bg-amber-50/60" />
            <PriceTable
              rows={COOKING_MATS_DROP.map((c) => ({ ...c, unit: "1개" }))}
              accent="bg-amber-100 text-amber-700"
              inputBorder="#fcd34d"
              resultColor="text-amber-700"
            />
          </SectionCard>
        </div>

        {/* 기타 아이템 — 맨 아래, 기본 접힘 */}
        <div id="mp-other">
          <SectionCard
            icon={<ShoppingBag className="w-5 h-5 text-violet-500" />}
            title="기타 아이템"
            unitLabel="개 기준"
            unitDesc="1개 단위"
            accentClass="bg-violet-100 text-violet-700"
            headerGradient="bg-gradient-to-r from-violet-50 to-purple-50"
            defaultOpen={false}
          >
            <PriceTable
              rows={OTHER_ITEMS}
              accent="bg-violet-100 text-violet-700"
              inputBorder="#c4b5fd"
              resultColor="text-violet-700"
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}