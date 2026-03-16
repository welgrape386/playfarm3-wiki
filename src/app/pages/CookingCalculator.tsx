import { useState } from "react";
import { ChefHat, TrendingUp, TrendingDown, RotateCcw, AlertCircle, ChevronDown, ChevronUp, Package } from "lucide-react";

// ─── 재료 데이터 ───────────────────────────────────────────────────────────────
// displayUnit: "개" = 1개 단위로 입력/표시, "셋" = 64개(1셋) 단위로 입력/표시
// basePrice   = displayUnit 기준 최대시세
interface Material {
  id: string;
  emoji: string;
  name: string;
  basePrice: number;   // displayUnit 기준 최대시세
  type: "drop" | "crop" | "special" | "can";
  displayUnit: "개" | "셋"; // "셋" = 64개
  note?: string;
}

const MATERIALS: Material[] = [
  // ── 드롭 재료 (1개 기준) ──
  { id: "wheat_drop",   emoji: "🌾", name: "구수한 밀",          basePrice: 385,    type: "drop",    displayUnit: "개" },
  { id: "melon_drop",   emoji: "🍉", name: "아삭한 수박",        basePrice: 390,    type: "drop",    displayUnit: "개" },
  { id: "pumpkin_drop", emoji: "🎃", name: "달달한 호박",        basePrice: 845,    type: "drop",    displayUnit: "개" },
  { id: "beet_drop",    emoji: "🫚", name: "달콤한 비트",        basePrice: 515,    type: "drop",    displayUnit: "개" },
  { id: "cocoa_drop",   emoji: "🫘", name: "향긋한 코코아콩",    basePrice: 575,    type: "drop",    displayUnit: "개" },
  { id: "nether_drop",  emoji: "🍄", name: "알싸한 네더 사마귀", basePrice: 665,    type: "drop",    displayUnit: "개" },
  { id: "carrot_drop",  emoji: "🥕", name: "아삭한 당근",        basePrice: 445,    type: "drop",    displayUnit: "개" },
  { id: "potato_drop",  emoji: "🥔", name: "포슬한 감자",        basePrice: 410,    type: "drop",    displayUnit: "개" },

  // ── 일반 작물 (1셋 = 64개 기준) ──
  { id: "carrot_crop",  emoji: "🥕", name: "당근",        basePrice: 1220,   type: "crop",    displayUnit: "셋" },
  { id: "beet_crop",    emoji: "🫚", name: "비트",        basePrice: 6300,   type: "crop",    displayUnit: "셋" },
  { id: "potato_crop",  emoji: "🥔", name: "감자",        basePrice: 1000,   type: "crop",    displayUnit: "셋" },
  { id: "pumpkin_crop", emoji: "🎃", name: "호박",        basePrice: 6920,   type: "crop",    displayUnit: "셋" },
  { id: "nether_crop",  emoji: "🍄", name: "네더 사마귀", basePrice: 1900,   type: "crop",    displayUnit: "셋" },

  // ── 특수 재료 ──
  { id: "wheat_seed",   emoji: "🌱", name: "밀 씨앗",      basePrice: 1,      type: "special", displayUnit: "개" },
  { id: "bad_potato",   emoji: "☠️", name: "독이 든 감자", basePrice: 43000,  type: "special", displayUnit: "셋" },

  // ── 통조림 (1개 기준) ──
  { id: "can_nether",   emoji: "🥫", name: "네더 사마귀 통조림", basePrice: 37050,  type: "can", displayUnit: "개" },
  { id: "can_cocoa",    emoji: "🥫", name: "코코아콩 통조림",    basePrice: 65910,  type: "can", displayUnit: "개" },
  { id: "can_sugar",    emoji: "🥫", name: "설탕 통조림",        basePrice: 67470,  type: "can", displayUnit: "개" },
  { id: "can_beet",     emoji: "🥫", name: "사탕무 통조림",      basePrice: 122850, type: "can", displayUnit: "개" },
  { id: "can_seed",     emoji: "🥫", name: "씨앗 통조림",        basePrice: 26000,  type: "can", displayUnit: "개" },
];

function getMat(id: string): Material {
  return MATERIALS.find(m => m.id === id)!;
}

// ─── 재료 1개당 단가 계산 ──────────────────────────────────────────────────────
// "셋" 단위 재료는 입력값(원/셋)을 64로 나눠 1개당 가격으로 환산
function pricePerItem(price: number, mat: Material): number {
  return mat.displayUnit === "셋" ? price / 64 : price;
}

// ─── 레시피 데이터 ─────────────────────────────────────────────────────────────
interface Ingredient { id: string; qty: number }
interface Recipe {
  id: string; emoji: string; name: string;
  tier: "하급" | "상급";
  time: string;
  sellPrice: number;
  ingredients: Ingredient[];
}

const RECIPES: Recipe[] = [
  // ── 하급 요리 (즉시 완성) — 판매가 높은 순 ──
  {
    id: "golden-cookie", emoji: "🍪", name: "황금 쿠키",
    tier: "하급", time: "즉시", sellPrice: 6440,
    ingredients: [
      { id: "wheat_drop", qty: 3 },
      { id: "cocoa_drop", qty: 3 },
    ],
  },
  {
    id: "carrot-bread", emoji: "🍞", name: "당근 빵",
    tier: "하급", time: "즉시", sellPrice: 5525,
    ingredients: [
      { id: "potato_drop", qty: 3 },
      { id: "carrot_drop", qty: 1 },
      { id: "bad_potato",  qty: 1 },
    ],
  },
  {
    id: "evil-melon", emoji: "🍉", name: "사악한 수박",
    tier: "하급", time: "즉시", sellPrice: 5460,
    ingredients: [
      { id: "melon_drop",   qty: 2 },
      { id: "pumpkin_drop", qty: 2 },
    ],
  },
  {
    id: "devil-candy", emoji: "🍬", name: "악마 사탕",
    tier: "하급", time: "즉시", sellPrice: 4585,
    ingredients: [
      { id: "wheat_drop",  qty: 2 },
      { id: "nether_drop", qty: 2 },
    ],
  },
  {
    id: "melon-bread", emoji: "🍈", name: "멜론 빵",
    tier: "하급", time: "즉시", sellPrice: 3510,
    ingredients: [
      { id: "wheat_drop",  qty: 2 },
      { id: "melon_drop",  qty: 2 },
      { id: "wheat_seed",  qty: 6 },
    ],
  },
  {
    id: "hamburger", emoji: "🍔", name: "햄버거",
    tier: "하급", time: "즉시", sellPrice: 3192,
    ingredients: [
      { id: "carrot_crop",  qty: 8 },
      { id: "beet_crop",    qty: 8 },
      { id: "potato_crop",  qty: 8 },
      { id: "pumpkin_crop", qty: 8 },
      { id: "nether_crop",  qty: 8 },
    ],
  },

  // ── 상급 요리 (2시간 제작) — 판매가 높은 순 ──
  {
    id: "love-lunchbox", emoji: "❤️", name: "사랑의 도시락",
    tier: "상급", time: "2시간", sellPrice: 1300000,
    ingredients: [
      { id: "can_nether", qty: 3 },
      { id: "can_cocoa",  qty: 3 },
      { id: "can_sugar",  qty: 3 },
      { id: "can_beet",   qty: 2 },
      { id: "can_seed",   qty: 1 },
      { id: "beet_drop",  qty: 10 },
      { id: "nether_drop",qty: 10 },
      { id: "cocoa_drop", qty: 10 },
    ],
  },
  {
    id: "touching-lunchbox", emoji: "🥺", name: "정성의 도시락",
    tier: "상급", time: "2시간", sellPrice: 403000,
    ingredients: [
      { id: "carrot_drop", qty: 15 },
      { id: "potato_drop", qty: 15 },
      { id: "pumpkin_drop",qty: 15 },
      { id: "beet_drop",   qty: 15 },
      { id: "nether_drop", qty: 15 },
      { id: "cocoa_drop",  qty: 15 },
    ],
  },
];

const TIERS = ["하급", "상급"] as const;
const TIER_COLORS = {
  하급: { badge: "bg-green-100 text-green-700", ring: "border-green-200", tab_active: "bg-green-500 text-white border-green-500", tab_inactive: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" },
  상급: { badge: "bg-orange-100 text-orange-700", ring: "border-orange-200", tab_active: "bg-orange-500 text-white border-orange-500", tab_inactive: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100" },
};

const TYPE_LABEL: Record<Material["type"], { label: string; color: string }> = {
  drop:    { label: "드롭 재료", color: "bg-amber-100 text-amber-700" },
  crop:    { label: "일반 작물", color: "bg-green-100 text-green-700" },
  special: { label: "특수 재료", color: "bg-purple-100 text-purple-700" },
  can:     { label: "통조림",   color: "bg-sky-100 text-sky-700" },
};

function fmt(n: number) { return n.toLocaleString("ko-KR"); }

// ─── 재료 단가 설정 ────────────────────────────────────────────────────────────
function getUsedMaterialIds(): Set<string> {
  const ids = new Set<string>();
  RECIPES.forEach(r => r.ingredients.forEach(ing => ids.add(ing.id)));
  return ids;
}

function MaterialPriceSetter({
  prices, setPrices,
}: {
  prices: Record<string, string>;
  setPrices: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const usedIds = getUsedMaterialIds();
  const usedMats = MATERIALS.filter(m => usedIds.has(m.id));

  const typeOrder: Material["type"][] = ["drop", "crop", "special", "can"];
  const grouped = typeOrder.map(type => ({
    type,
    mats: usedMats.filter(m => m.type === type),
  })).filter(g => g.mats.length > 0);

  const handleReset = () => {
    const init: Record<string, string> = {};
    usedMats.forEach(m => { init[m.id] = String(m.basePrice); });
    setPrices(init);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
        <span className="text-xl">🛒</span>
        <div className="flex-1">
          <div className="text-slate-800" style={{ fontSize: "15px", fontWeight: 700 }}>재료 구매 단가 설정</div>
          <div className="text-slate-500" style={{ fontSize: "12px" }}>
            ✅ <strong>최대시세</strong>에 맞춰져 있습니다 —
            드롭·통조림 재료는 <strong>1개</strong> 기준, 일반 작물·특수 재료는 <strong>1셋(64개)</strong> 기준
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 bg-white border border-amber-200 text-amber-600 hover:bg-amber-50 rounded-xl px-3 py-2 transition-colors"
          style={{ fontSize: "12px", fontWeight: 600 }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          초기화
        </button>
      </div>

      {grouped.map(({ type, mats }) => {
        const tl = TYPE_LABEL[type];
        return (
          <div key={type}>
            <div className="px-5 py-2 border-b border-slate-50 bg-slate-50/50">
              <span className={`inline-block rounded-full px-2.5 py-0.5 ${tl.color}`} style={{ fontSize: "10.5px", fontWeight: 700 }}>
                {tl.label}
              </span>
              {type === "can" && (
                <span className="ml-2 text-slate-400" style={{ fontSize: "10.5px" }}>※ 1개 단위</span>
              )}
              {type === "drop" && (
                <span className="ml-2 text-slate-400" style={{ fontSize: "10.5px" }}>※ 1개 단위</span>
              )}
              {(type === "crop" || type === "special") && (
                <span className="ml-2 text-slate-400" style={{ fontSize: "10.5px" }}>※ 1셋(64개) 단위 — 수익 계산 시 자동으로 1개 단가로 환산됩니다</span>
              )}
            </div>
            <div className="divide-y divide-slate-50">
              {mats.map((mat) => {
                const val = prices[mat.id] ?? "";
                const numVal = parseInt(val, 10);
                const hasRef = mat.basePrice > 0;
                const diff = hasRef && !isNaN(numVal) && numVal > 0 ? numVal - mat.basePrice : 0;
                const isCheaper = diff < 0;
                const isExpensive = diff > 0;
                const unitLabel = mat.displayUnit === "셋" ? "원/셋(64개)" : "원/개";

                return (
                  <div key={mat.id} className="flex items-center gap-3 px-5 py-3 hover:bg-amber-50/30 transition-colors">
                    <span style={{ fontSize: "18px" }}>{mat.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-800" style={{ fontSize: "13px", fontWeight: 600 }}>{mat.name}</div>
                      {hasRef && diff !== 0 && (
                        <div className={isCheaper ? "text-emerald-500" : "text-red-400"} style={{ fontSize: "10.5px", fontWeight: 600 }}>
                          {isCheaper ? `▼ 최대시세보다 ${fmt(-diff)}원 저렴` : `▲ 최대시세보다 ${fmt(diff)}원 비쌈`}
                        </div>
                      )}
                      {!hasRef && (
                        <div className="text-slate-400" style={{ fontSize: "10.5px" }}>구매가를 직접 입력하세요</div>
                      )}
                    </div>
                    {hasRef && (
                      <span className="bg-teal-50 text-teal-600 border border-teal-100 rounded-full px-2.5 py-1 flex-shrink-0" style={{ fontSize: "11px", fontWeight: 600 }}>
                        최대 {fmt(mat.basePrice)}{mat.displayUnit === "셋" ? "원/셋" : "원/개"}
                      </span>
                    )}
                    <div className="flex items-center" style={{ minWidth: "130px" }}>
                      <div className={`flex items-center border-2 rounded-xl overflow-hidden bg-white transition-colors ${
                        isCheaper ? "border-emerald-300 bg-emerald-50/50" :
                        isExpensive ? "border-red-200 bg-red-50/30" :
                        "border-amber-200 focus-within:border-amber-400"
                      }`}>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={8}
                          value={val}
                          onChange={(e) => {
                            const cleaned = e.target.value.replace(/[^0-9]/g, "");
                            setPrices(prev => ({ ...prev, [mat.id]: cleaned }));
                          }}
                          className="bg-transparent text-slate-800 text-right outline-none px-2 py-2"
                          style={{ fontSize: "14px", fontWeight: 700, width: "80px" }}
                          placeholder={mat.basePrice > 0 ? String(mat.basePrice) : "0"}
                        />
                        <span className={`pr-2 select-none flex-shrink-0 ${isCheaper ? "text-emerald-500" : isExpensive ? "text-red-400" : "text-amber-600"}`}
                          style={{ fontSize: "10px", fontWeight: 700 }}>{unitLabel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="px-5 py-3 bg-teal-50 border-t border-teal-100">
        <p className="text-teal-700" style={{ fontSize: "11.5px", lineHeight: 1.6 }}>
          📈 단가가 <strong>최대시세</strong>에 맞춰져 있습니다. 실제 구매 가격이 다르다면 직접 수정하세요.
          농작물·독이든 감자는 <strong>1셋(64개) 단위</strong>로 입력하면 자동으로 1개 단가로 나눠서 계산됩니다.
        </p>
      </div>
    </div>
  );
}

// ─── 요리 수익 카드 ───────────────────────────────────────────────────────────
function RecipeCard({ recipe, prices }: { recipe: Recipe; prices: Record<string, string> }) {
  const tc = TIER_COLORS[recipe.tier];
  const [expanded, setExpanded] = useState(false);
  const [stock, setStock] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    recipe.ingredients.forEach(ing => { init[ing.id] = ""; });
    return init;
  });

  const ingredientCosts = recipe.ingredients.map(ing => {
    const mat = getMat(ing.id);
    const priceStr = prices[ing.id] ?? String(mat.basePrice);
    const price = parseInt(priceStr, 10) || 0;
    const unitPrice = pricePerItem(price, mat);
    const cost = unitPrice * ing.qty;
    return { mat, ing, price, unitPrice, cost };
  });

  const totalCost = ingredientCosts.reduce((s, x) => s + x.cost, 0);
  const profit = recipe.sellPrice - totalCost;
  const profitPct = totalCost > 0 ? Math.round((profit / totalCost) * 100) : 0;
  const isProfitable = profit > 0;
  const hasZeroPrice = ingredientCosts.some(x => x.price === 0);

  // ── 최대 제작 수 계산 ──
  const maxBatch = (() => {
    const vals = recipe.ingredients.map(ing => {
      const s = parseInt(stock[ing.id] ?? "", 10);
      if (isNaN(s) || s <= 0) return null;
      return Math.floor(s / ing.qty);
    });
    if (vals.some(v => v === null)) return null;
    return Math.min(...(vals as number[]));
  })();
  const hasAnyStock = recipe.ingredients.some(ing => (parseInt(stock[ing.id] ?? "", 10) || 0) > 0);
  const totalBatchProfit = maxBatch !== null && !hasZeroPrice ? maxBatch * Math.round(profit) : null;
  const totalBatchCost   = maxBatch !== null ? maxBatch * Math.round(totalCost) : null;
  const totalBatchSell   = maxBatch !== null ? maxBatch * recipe.sellPrice : null;

  return (
    <div className={`bg-white border-2 rounded-2xl overflow-hidden transition-all hover:shadow-md ${
      hasZeroPrice ? "border-slate-200" : isProfitable ? tc.ring : "border-red-100"
    }`}>
      {/* 헤더 */}
      <div className={`flex items-center gap-3 px-5 py-4 ${
        hasZeroPrice
          ? "bg-slate-50"
          : isProfitable
          ? "bg-gradient-to-r from-emerald-50 to-green-50"
          : "bg-gradient-to-r from-red-50 to-rose-50"
      }`}>
        <span style={{ fontSize: "24px" }}>{recipe.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-800" style={{ fontSize: "15px", fontWeight: 700 }}>{recipe.name}</span>
            <span className={`${tc.badge} rounded-full px-2 py-0.5`} style={{ fontSize: "10px", fontWeight: 600 }}>
              {recipe.tier} · {recipe.time}
            </span>
          </div>
          <div className="text-slate-500 mt-0.5" style={{ fontSize: "12px" }}>
            판매가 <span className="text-slate-700" style={{ fontWeight: 700 }}>{fmt(recipe.sellPrice)}원</span>
          </div>
        </div>

        <div className={`text-right flex-shrink-0 rounded-xl px-3 py-2 ${
          hasZeroPrice ? "bg-slate-100" : isProfitable ? "bg-emerald-100" : "bg-red-100"
        }`}>
          {hasZeroPrice ? (
            <div className="text-slate-400" style={{ fontSize: "12px", fontWeight: 700 }}>단가 미입력</div>
          ) : (
            <>
              <div className={`flex items-center gap-1 justify-end ${isProfitable ? "text-emerald-700" : "text-red-600"}`}
                style={{ fontSize: "16px", fontWeight: 900 }}>
                {isProfitable ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {isProfitable ? "+" : ""}{fmt(profit)}원
              </div>
              <div className={isProfitable ? "text-emerald-500" : "text-red-400"}
                style={{ fontSize: "10px", fontWeight: 600, textAlign: "right" }}>
                {isProfitable ? "+" : ""}{profitPct}% 수익률
              </div>
            </>
          )}
        </div>
      </div>

      {/* 재료 목록 */}
      <div className="px-5 py-4">
        <div className="space-y-2">
          {ingredientCosts.map(({ mat, ing, price, unitPrice, cost }) => {
            const tl = TYPE_LABEL[mat.type];
            const isSetUnit = mat.displayUnit === "셋";
            return (
              <div key={ing.id} className="flex items-center gap-2.5">
                <span style={{ fontSize: "15px" }}>{mat.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-700" style={{ fontSize: "12.5px", fontWeight: 500 }}>{mat.name}</span>
                    <span className="text-slate-400" style={{ fontSize: "11px" }}>×{ing.qty}</span>
                    <span className={`${tl.color} rounded-full px-1.5 py-0.5`} style={{ fontSize: "9px", fontWeight: 700 }}>{tl.label}</span>
                  </div>
                  <div className="text-slate-400" style={{ fontSize: "10.5px" }}>
                    {price > 0 ? (
                      <span className="text-slate-400">
                        {isSetUnit
                          ? `${fmt(price)}원/셋 → @${fmt(Math.round(unitPrice))}원/개`
                          : `@${fmt(price)}원/개`}
                      </span>
                    ) : (
                      <span className="text-red-400">⚠️ 단가 미입력</span>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={price > 0 ? "text-slate-700" : "text-slate-300"} style={{ fontSize: "13px", fontWeight: 700 }}>
                    {price > 0 ? `${fmt(Math.round(cost))}원` : "-"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 요약 */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          {hasZeroPrice && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 mb-3">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-600" style={{ fontSize: "11px", lineHeight: 1.6 }}>
                단가가 입력되지 않은 재료가 있어요. 위 재료 단가 설정에서 가격을 입력하면 수익이 계산됩니다.
              </p>
            </div>
          )}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-slate-500" style={{ fontSize: "12px" }}>총 재료비</span>
            <span className="text-slate-700" style={{ fontSize: "14px", fontWeight: 700 }}>{fmt(Math.round(totalCost))}원</span>
          </div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-slate-500" style={{ fontSize: "12px" }}>판매가</span>
            <span className="text-slate-700" style={{ fontSize: "14px", fontWeight: 700 }}>{fmt(recipe.sellPrice)}원</span>
          </div>

          {!hasZeroPrice && (
            <div className={`flex items-center justify-between gap-2 rounded-xl px-4 py-3 ${
              isProfitable ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"
            }`}>
              <span style={{ fontSize: "12.5px", fontWeight: 700 }}
                className={isProfitable ? "text-emerald-700" : "text-red-700"}>
                {isProfitable ? "✅ 수익" : "❌ 손해"}
              </span>
              <span style={{ fontSize: "16px", fontWeight: 900 }}
                className={isProfitable ? "text-emerald-700" : "text-red-600"}>
                {isProfitable ? "+" : ""}{fmt(Math.round(profit))}원
              </span>
            </div>
          )}
        </div>

        {/* 더보기 버튼 */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
          style={{ fontSize: "12.5px", fontWeight: 600 }}
        >
          <Package className="w-3.5 h-3.5" />
          {expanded ? "재료 보유량 닫기" : "재료 보유량으로 최대 제작 수 계산"}
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 최대 제작 수 계산 패널 */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-sky-500" />
            <span className="text-slate-700" style={{ fontSize: "14px", fontWeight: 700 }}>보유 재료 입력</span>
            <span className="text-slate-400" style={{ fontSize: "11.5px" }}>— 개수를 입력하면 최대 제작 수를 알려줘요</span>
          </div>

          <div className="space-y-2 mb-4">
            {recipe.ingredients.map(ing => {
              const mat = getMat(ing.id);
              const val = stock[ing.id] ?? "";
              const numVal = parseInt(val, 10);
              const canMakeThis = !isNaN(numVal) && numVal > 0 ? Math.floor(numVal / ing.qty) : null;
              const isBottleneck = maxBatch !== null && canMakeThis !== null && canMakeThis === maxBatch;

              return (
                <div key={ing.id} className="flex items-center gap-3">
                  <span style={{ fontSize: "16px" }}>{mat.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-slate-700" style={{ fontSize: "12.5px", fontWeight: 500 }}>{mat.name}</span>
                      <span className="text-slate-400" style={{ fontSize: "11px" }}>× {ing.qty}개 필요</span>
                      {isBottleneck && (
                        <span className="bg-red-100 text-red-500 rounded-full px-1.5 py-0.5" style={{ fontSize: "9px", fontWeight: 700 }}>
                          병목
                        </span>
                      )}
                    </div>
                    {canMakeThis !== null && (
                      <div className="text-slate-400" style={{ fontSize: "10.5px" }}>
                        → 이 재료로 최대 <span className={`font-bold ${isBottleneck ? "text-red-500" : "text-sky-600"}`}>{canMakeThis}개</span> 제작 가능
                      </div>
                    )}
                  </div>
                  <div className="flex items-center border-2 border-sky-200 focus-within:border-sky-400 rounded-xl overflow-hidden bg-white" style={{ minWidth: "110px" }}>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={7}
                      value={val}
                      onChange={e => {
                        const cleaned = e.target.value.replace(/[^0-9]/g, "");
                        setStock(prev => ({ ...prev, [ing.id]: cleaned }));
                      }}
                      placeholder="0"
                      className="bg-transparent text-slate-800 text-right outline-none px-2 py-2"
                      style={{ fontSize: "14px", fontWeight: 700, width: "65px" }}
                    />
                    <span className="pr-2 text-sky-500 select-none flex-shrink-0" style={{ fontSize: "10px", fontWeight: 700 }}>개</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 결과 */}
          {hasAnyStock ? (
            maxBatch !== null ? (
              <div className="rounded-xl overflow-hidden border border-sky-200">
                <div className="bg-sky-500 px-4 py-3 flex items-center justify-between">
                  <span className="text-white" style={{ fontSize: "13px", fontWeight: 700 }}>최대 제작 수</span>
                  <span className="text-white" style={{ fontSize: "22px", fontWeight: 900 }}>{fmt(maxBatch)}개</span>
                </div>
                <div className="bg-white px-4 py-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500" style={{ fontSize: "12px" }}>총 재료비</span>
                    <span className="text-slate-700" style={{ fontSize: "13px", fontWeight: 700 }}>
                      {totalBatchCost !== null ? `${fmt(totalBatchCost)}원` : "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500" style={{ fontSize: "12px" }}>총 판매액</span>
                    <span className="text-slate-700" style={{ fontSize: "13px", fontWeight: 700 }}>
                      {totalBatchSell !== null ? `${fmt(totalBatchSell)}원` : "-"}
                    </span>
                  </div>
                  {totalBatchProfit !== null && (
                    <div className={`flex items-center justify-between rounded-xl px-3 py-2.5 mt-1 ${totalBatchProfit >= 0 ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"}`}>
                      <span className={totalBatchProfit >= 0 ? "text-emerald-700" : "text-red-700"} style={{ fontSize: "13px", fontWeight: 700 }}>
                        {totalBatchProfit >= 0 ? "✅ 예상 총 수익" : "❌ 예상 총 손해"}
                      </span>
                      <span className={totalBatchProfit >= 0 ? "text-emerald-700" : "text-red-600"} style={{ fontSize: "18px", fontWeight: 900 }}>
                        {totalBatchProfit >= 0 ? "+" : ""}{fmt(totalBatchProfit)}원
                      </span>
                    </div>
                  )}
                  {hasZeroPrice && (
                    <p className="text-amber-500" style={{ fontSize: "11px" }}>
                      ⚠️ 단가 미입력으로 수익 계산 불가 — 위 단가 설정에서 입력해주세요
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <p className="text-amber-600" style={{ fontSize: "12px" }}>
                  모든 재료의 보유량을 입력해야 최대 제작 수를 계산할 수 있어요.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-3 text-slate-400" style={{ fontSize: "12px" }}>
              위 입력칸에 보유한 재료 개수를 입력하세요
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── 수익 요약 ────────────────────────────────────────────────────────────────
function ProfitSummary({ prices }: { prices: Record<string, string> }) {
  const analysis = RECIPES.map(r => {
    const cost = r.ingredients.reduce((s, ing) => {
      const mat = getMat(ing.id);
      const val = parseInt(prices[ing.id] ?? "0", 10) || 0;
      return s + pricePerItem(val, mat) * ing.qty;
    }, 0);
    const hasZero = r.ingredients.some(ing => {
      const val = parseInt(prices[ing.id] ?? "0", 10);
      return !val || val === 0;
    });
    return { recipe: r, cost, profit: r.sellPrice - cost, hasZero };
  });

  const computable = analysis.filter(a => !a.hasZero);
  const profitable = computable.filter(a => a.profit > 0);

  if (computable.length === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-amber-700" style={{ fontSize: "13px", lineHeight: 1.6 }}>
          재료 단가를 입력하면 수익 요약이 표시됩니다. 일반 작물·통조림·특수 재료의 단가를 위에서 입력해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-emerald-100 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-emerald-600" />
        <span className="text-emerald-800" style={{ fontSize: "15px", fontWeight: 700 }}>수익 요약</span>
      </div>
      <div className="px-5 py-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white border border-emerald-100 rounded-xl p-3 text-center">
            <div className="text-emerald-700" style={{ fontSize: "20px", fontWeight: 900 }}>{profitable.length}개</div>
            <div className="text-slate-400 mt-0.5" style={{ fontSize: "11px" }}>수익 가능 요리</div>
          </div>
          <div className="bg-white border border-emerald-100 rounded-xl p-3 text-center">
            <div className="text-emerald-700" style={{ fontSize: "14px", fontWeight: 900 }}>
              {fmt(Math.round(profitable.reduce((s, a) => s + a.profit, 0)))}원
            </div>
            <div className="text-slate-400 mt-0.5" style={{ fontSize: "11px" }}>1개씩 총 수익</div>
          </div>
          <div className="bg-white border border-emerald-100 rounded-xl p-3 text-center">
            <div className="text-emerald-700" style={{ fontSize: "14px", fontWeight: 900 }}>
              {profitable.length > 0 ? fmt(Math.round(Math.max(...profitable.map(a => a.profit)))) : "-"}원
            </div>
            <div className="text-slate-400 mt-0.5" style={{ fontSize: "11px" }}>최고 수익</div>
          </div>
        </div>

        <div className="space-y-2">
          {analysis
            .filter(a => !a.hasZero)
            .sort((a, b) => b.profit - a.profit)
            .map(({ recipe, profit }, idx) => (
              <div key={recipe.id} className={`flex items-center gap-3 rounded-xl px-4 py-3 ${profit > 0 ? "bg-white border border-emerald-100" : "bg-slate-50 border border-slate-100 opacity-60"}`}>
                <span className="text-slate-400 flex-shrink-0" style={{ fontSize: "13px", fontWeight: 700 }}>#{idx + 1}</span>
                <span style={{ fontSize: "17px" }}>{recipe.emoji}</span>
                <span className="flex-1 text-slate-700" style={{ fontSize: "13px", fontWeight: 600 }}>{recipe.name}</span>
                <span className={`flex-shrink-0 rounded-full px-3 py-1 ${profit > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}
                  style={{ fontSize: "13px", fontWeight: 700 }}>
                  {profit > 0 ? "+" : ""}{fmt(Math.round(profit))}원
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function CookingCalculator() {
  const [prices, setPrices] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    MATERIALS.forEach(m => { init[m.id] = String(m.basePrice); });
    return init;
  });

  const [activeTier, setActiveTier] = useState<"하급" | "상급">("하급");
  const filteredRecipes = RECIPES.filter(r => r.tier === activeTier);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-4">
          <ChefHat className="w-3.5 h-3.5 text-orange-500" />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#ea580c" }}>요리 수익</span>
        </div>
        <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, lineHeight: 1.2 }}>
          요리 수익 계산기
        </h1>
        <p className="text-slate-500" style={{ fontSize: "15px" }}>
          재료 단가가 <strong className="text-teal-600">최대시세</strong>에 맞춰져 있습니다.
          실제 구매 가격에 맞게 수정하면 수익이 자동으로 계산됩니다.
        </p>
      </div>

      {/* 재료 단가 설정 */}
      <div className="mb-6">
        <MaterialPriceSetter prices={prices} setPrices={setPrices} />
      </div>

      {/* 수익 요약 */}
      <div className="mb-6">
        <ProfitSummary prices={prices} />
      </div>

      {/* 요리별 상세 */}
      <div className="mb-4">
        <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>요리별 상세 수익 분석</span>
      </div>

      {/* 티어 탭 */}
      <div className="flex gap-2 mb-5">
        {TIERS.map(tier => {
          const tc = TIER_COLORS[tier];
          return (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-4 py-2 rounded-xl border-2 transition-all duration-150 ${activeTier === tier ? tc.tab_active : tc.tab_inactive}`}
              style={{ fontSize: "13.5px", fontWeight: 600 }}
            >
              {tier === "하급" ? "⚡" : "⏱️"} {tier} 요리
              <span className={`ml-1.5 ${activeTier === tier ? "opacity-70" : "opacity-50"}`} style={{ fontSize: "11px" }}>
                ({RECIPES.filter(r => r.tier === tier).length}종)
              </span>
            </button>
          );
        })}
      </div>

      {/* 레시피 카드 */}
      <div className="space-y-4 mb-6">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} prices={prices} />
        ))}
      </div>

      {/* 전체 판매가 참고표 */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm mb-4">
        <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
          <span className="text-lg">📋</span>
          <span className="text-slate-700" style={{ fontSize: "15px", fontWeight: 700 }}>요리 판매가 참고표 (최대시세)</span>
        </div>
        <div className="divide-y divide-slate-50">
          {[...RECIPES].sort((a, b) => b.sellPrice - a.sellPrice).map(r => {
            const tc = TIER_COLORS[r.tier];
            const hasZero = r.ingredients.some(ing => {
              const val = parseInt(prices[ing.id] ?? "0", 10);
              return !val;
            });
            const buyProfit = hasZero ? null : Math.round(r.sellPrice - r.ingredients.reduce((s, ing) => {
              const mat = getMat(ing.id);
              return s + pricePerItem(parseInt(prices[ing.id] ?? "0", 10) || 0, mat) * ing.qty;
            }, 0));
            return (
              <div key={r.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/50 transition-colors">
                <span style={{ fontSize: "18px" }}>{r.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-800" style={{ fontSize: "13px", fontWeight: 600 }}>{r.name}</span>
                    <span className={`${tc.badge} rounded-full px-2 py-0.5`} style={{ fontSize: "10px", fontWeight: 600 }}>{r.tier}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-slate-600" style={{ fontSize: "13px", fontWeight: 700 }}>{fmt(r.sellPrice)}원</span>
                  {buyProfit !== null ? (
                    <span className={`rounded-full px-2.5 py-1 ${buyProfit > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-500"}`}
                      style={{ fontSize: "11px", fontWeight: 700 }}>
                      {buyProfit > 0 ? "+" : ""}{fmt(buyProfit)}
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-400 rounded-full px-2.5 py-1" style={{ fontSize: "11px" }}>-</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-teal-50 border border-teal-100 rounded-2xl px-5 py-4">
        <p className="text-teal-700" style={{ fontSize: "12.5px", lineHeight: 1.7 }}>
          📈 <strong>최대시세 기준 안내</strong> — 재료 단가는 대량상점 최대시세에 맞춰져 있어요.<br />
          💡 농작물·독이든 감자는 <strong>1셋(64개) 단위</strong>로 입력하면 자동으로 1개 단가로 나눠 계산됩니다.<br />
          💡 실제 구매 가격이 다르다면 위 단가 입력칸에서 수정하면 바로 반영됩니다.
        </p>
      </div>
    </div>
  );
}