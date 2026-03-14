import { useState, useCallback } from "react";
import {
  Calculator as CalculatorIcon,
  RotateCcw,
  ChevronDown,
  TrendingUp,
  Info,
  Minus,
  Plus,
} from "lucide-react";
import { priceCategories, PriceItem } from "../data/priceData";

// ─── 대량상점 가능 카테고리: crops 전체 ────────────────────────────────────
const BULK_ELIGIBLE_CAT = "crops";

// ─── Types ────────────────────────────────────────────────────────────────────
type ItemQty = { boxes: string; sets: string; units: string };
type Quantities = Record<string, ItemQty>;

// 큰상자 1개 = 54셋 = 54 × 64 = 3,456개
const SETS_PER_BOX = 54;
const ITEMS_PER_SET = 64;
const ITEMS_PER_BOX = SETS_PER_BOX * ITEMS_PER_SET; // 3,456

function getQty(q: ItemQty | undefined): number {
  const b = parseInt(q?.boxes || "0", 10) || 0;
  const s = parseInt(q?.sets  || "0", 10) || 0;
  const u = parseInt(q?.units || "0", 10) || 0;
  return b * ITEMS_PER_BOX + s * ITEMS_PER_SET + u;
}

// ─── Color map ─────────────────────────────────────────────────────────────────
const colorMap: Record<string, {
  tab: string; tabActive: string; header: string;
  unitBg: string; unitText: string;
  inputBorder: string; inputFocus: string;
  priceBg: string; priceText: string;
}> = {
  crops: {
    tab: "bg-green-50 text-green-700 border-green-200",
    tabActive: "bg-green-500 text-white shadow-sm",
    header: "from-green-50 to-emerald-50 border-green-200",
    unitBg: "bg-green-100", unitText: "text-green-700",
    inputBorder: "border-green-200", inputFocus: "focus-within:border-green-400",
    priceBg: "bg-green-50", priceText: "text-green-700",
  },
  drops: {
    tab: "bg-amber-50 text-amber-700 border-amber-200",
    tabActive: "bg-amber-500 text-white shadow-sm",
    header: "from-amber-50 to-yellow-50 border-amber-200",
    unitBg: "bg-amber-100", unitText: "text-amber-700",
    inputBorder: "border-amber-200", inputFocus: "focus-within:border-amber-400",
    priceBg: "bg-amber-50", priceText: "text-amber-700",
  },
  crystals: {
    tab: "bg-sky-50 text-sky-700 border-sky-200",
    tabActive: "bg-sky-500 text-white shadow-sm",
    header: "from-sky-50 to-blue-50 border-sky-200",
    unitBg: "bg-sky-100", unitText: "text-sky-700",
    inputBorder: "border-sky-200", inputFocus: "focus-within:border-sky-400",
    priceBg: "bg-sky-50", priceText: "text-sky-700",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function perItemPrice(item: PriceItem): number {
  return item.pricePerStack / item.unitSize;
}
function calcBase(item: PriceItem, qty: number): number {
  if (qty <= 0) return 0;
  return Math.floor(perItemPrice(item) * qty);
}
function applyBulk(base: number, pct: number): number {
  return Math.floor(base * (100 + pct) / 100);
}
function fmt(n: number) { return n.toLocaleString("ko-KR"); }

// ─── BulkPercentSelector ──────────────────────────────────────────────────────
function BulkPercentSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [mode, setMode] = useState<"shop" | "bulk">(value === 0 ? "shop" : "bulk");
  const [inputStr, setInputStr] = useState(value > 0 ? String(value) : "");

  const handleModeToggle = (m: "shop" | "bulk") => {
    setMode(m);
    if (m === "shop") {
      onChange(0);
    } else {
      const parsed = parseInt(inputStr, 10);
      const v = parsed >= 1 && parsed <= 30 ? parsed : 1;
      onChange(v);
      if (!inputStr || parseInt(inputStr, 10) < 1) setInputStr("1");
    }
  };

  const handleInput = (raw: string) => {
    const cleaned = raw.replace(/[^0-9]/g, "").slice(0, 2);
    setInputStr(cleaned);
    const n = parseInt(cleaned, 10);
    if (!isNaN(n) && n >= 1 && n <= 30) onChange(n);
  };

  const step = (delta: number) => {
    const cur = value > 0 ? value : 1;
    const next = Math.min(30, Math.max(1, cur + delta));
    setInputStr(String(next));
    onChange(next);
    if (mode !== "bulk") setMode("bulk");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-violet-500" />
        <span className="text-slate-700" style={{ fontSize: "15px", fontWeight: 700 }}>상점 모드 선택</span>
        <div className="ml-auto bg-violet-50 text-violet-600 rounded-full px-2.5 py-0.5 border border-violet-200" style={{ fontSize: "11px", fontWeight: 600 }}>
          현재 {value === 0 ? "100%" : `+${value}% = ${100 + value}%`}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleModeToggle("shop")}
          className={`flex-1 py-3 rounded-xl border-2 transition-all duration-150 ${
            mode === "shop"
              ? "border-sky-400 bg-sky-50 text-sky-700"
              : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"
          }`}
          style={{ fontSize: "13.5px", fontWeight: 700 }}
        >
          🏪 기본 상점
          <div style={{ fontSize: "11px", fontWeight: 400, marginTop: "2px", opacity: 0.7 }}>상점가 100%</div>
        </button>
        <button
          onClick={() => handleModeToggle("bulk")}
          className={`flex-1 py-3 rounded-xl border-2 transition-all duration-150 ${
            mode === "bulk"
              ? "border-violet-400 bg-violet-50 text-violet-700"
              : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"
          }`}
          style={{ fontSize: "13.5px", fontWeight: 700 }}
        >
          🏬 대량 상점
          <div style={{ fontSize: "11px", fontWeight: 400, marginTop: "2px", opacity: 0.7 }}>전체 농작물 +1~30%</div>
        </button>
      </div>

      {mode === "bulk" && (
        <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="text-slate-600" style={{ fontSize: "13px", fontWeight: 600 }}>대량상점 보너스</span>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => step(-1)} className="w-9 h-9 rounded-xl bg-white border border-violet-200 flex items-center justify-center hover:bg-violet-100 active:scale-95 transition-all">
                <Minus className="w-3.5 h-3.5 text-violet-600" />
              </button>
              <div className="flex items-center gap-1 bg-white border-2 border-violet-300 rounded-xl px-3 py-1.5">
                <span className="text-violet-400" style={{ fontSize: "14px", fontWeight: 600 }}>+</span>
                <input
                  type="text" inputMode="numeric" maxLength={2}
                  value={inputStr} onChange={(e) => handleInput(e.target.value)}
                  className="w-10 text-center bg-transparent text-violet-800 outline-none"
                  style={{ fontSize: "18px", fontWeight: 900 }} placeholder="1"
                />
                <span className="text-violet-500" style={{ fontSize: "14px", fontWeight: 700 }}>%</span>
              </div>
              <button onClick={() => step(1)} className="w-9 h-9 rounded-xl bg-white border border-violet-200 flex items-center justify-center hover:bg-violet-100 active:scale-95 transition-all">
                <Plus className="w-3.5 h-3.5 text-violet-600" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {[5, 10, 15, 20, 25, 30].map((pct) => (
              <button
                key={pct}
                onClick={() => { setInputStr(String(pct)); onChange(pct); }}
                className={`px-3 py-1 rounded-lg border text-center transition-all ${
                  value === pct ? "bg-violet-500 text-white border-violet-500" : "bg-white text-violet-600 border-violet-200 hover:bg-violet-100"
                }`}
                style={{ fontSize: "12px", fontWeight: 700 }}
              >
                +{pct}%
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-start gap-2 bg-white/70 rounded-lg px-3 py-2 border border-violet-100">
            <Info className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
            <span className="text-violet-600" style={{ fontSize: "12px" }}>
              대량상점은 <strong>모든 농작물</strong>을 판매 가능해요 (결정석 제외).<br />
              농작물 전체에 <strong>×{100 + value}%</strong> 가격으로 계산됩니다.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ItemRow ──────────────────────────────────────────────────────────────────
function ItemRow({
  item, qty, onChangeBoxes, onChangeSets, onChangeUnits, colors, bulkPct, isBulkCat,
}: {
  item: PriceItem;
  qty: ItemQty;
  onChangeBoxes: (val: string) => void;
  onChangeSets: (val: string) => void;
  onChangeUnits: (val: string) => void;
  colors: (typeof colorMap)[string];
  bulkPct: number;
  isBulkCat: boolean;
}) {
  const totalQty = getQty(qty);
  const base = calcBase(item, totalQty);
  const bulked = isBulkCat ? applyBulk(base, bulkPct) : base;
  const displayTotal = bulkPct > 0 && isBulkCat ? bulked : base;
  const diff = bulked - base;
  const pricePerOne = perItemPrice(item);

  const boxesVal  = qty.boxes === "" ? "" : String(parseInt(qty.boxes, 10) || 0);
  const setsVal   = qty.sets  === "" ? "" : String(parseInt(qty.sets,  10) || 0);
  const unitsVal  = qty.units === "" ? "" : String(parseInt(qty.units, 10) || 0);
  const totalQtyDisplay = getQty(qty);

  return (
    <div className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50/80 rounded-xl transition-colors">
      <span className="text-lg w-7 text-center flex-shrink-0">{item.emoji}</span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-800 truncate" style={{ fontSize: "13px", fontWeight: 600 }}>{item.name}</span>
          {item.note && <span className="text-slate-400 flex-shrink-0" style={{ fontSize: "10px" }}>({item.note})</span>}
          {isBulkCat && bulkPct > 0 && (
            <span className="bg-violet-100 text-violet-600 rounded-full px-1.5 py-0.5 flex-shrink-0" style={{ fontSize: "9px", fontWeight: 700 }}>대량</span>
          )}
        </div>
        <span className="text-slate-400" style={{ fontSize: "10.5px" }}>
          {fmt(Math.floor(pricePerOne))}원/개
          {isBulkCat && bulkPct > 0 && (
            <span className="text-violet-500 ml-1">→ {fmt(Math.floor(pricePerOne * (100 + bulkPct) / 100))}원</span>
          )}
        </span>
      </div>

      {/* 상자 + 셋 + 개 입력 */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* 상자 */}
        <div className={`flex items-center border-2 rounded-lg overflow-hidden ${colors.inputBorder} ${colors.inputFocus} bg-white`}>
          <input
            type="text" inputMode="numeric" maxLength={4}
            value={qty.boxes === "" ? "" : boxesVal} placeholder="0"
            onChange={(e) => onChangeBoxes(e.target.value.replace(/[^0-9]/g, ""))}
            className="bg-transparent text-slate-800 text-right outline-none px-1.5 py-1.5"
            style={{ fontSize: "13px", fontWeight: 700, width: "36px" }}
          />
          <span className={`${colors.unitText} pr-1.5 flex-shrink-0 select-none`} style={{ fontSize: "10.5px", fontWeight: 700 }}>상자</span>
        </div>
        <span className="text-slate-300" style={{ fontSize: "11px" }}>+</span>
        {/* 셋 */}
        <div className={`flex items-center border-2 rounded-lg overflow-hidden ${colors.inputBorder} ${colors.inputFocus} bg-white`}>
          <input
            type="text" inputMode="numeric" maxLength={4}
            value={qty.sets === "" ? "" : setsVal} placeholder="0"
            onChange={(e) => onChangeSets(e.target.value.replace(/[^0-9]/g, ""))}
            className="bg-transparent text-slate-800 text-right outline-none px-1.5 py-1.5"
            style={{ fontSize: "13px", fontWeight: 700, width: "36px" }}
          />
          <span className={`${colors.unitText} pr-1.5 flex-shrink-0 select-none`} style={{ fontSize: "10.5px", fontWeight: 700 }}>셋</span>
        </div>
        <span className="text-slate-300" style={{ fontSize: "11px" }}>+</span>
        {/* 개 */}
        <div className={`flex items-center border-2 rounded-lg overflow-hidden ${colors.inputBorder} ${colors.inputFocus} bg-white`}>
          <input
            type="text" inputMode="numeric" maxLength={3}
            value={qty.units === "" ? "" : unitsVal} placeholder="0"
            onChange={(e) => onChangeUnits(e.target.value.replace(/[^0-9]/g, ""))}
            className="bg-transparent text-slate-800 text-right outline-none px-1.5 py-1.5"
            style={{ fontSize: "13px", fontWeight: 700, width: "36px" }}
          />
          <span className={`${colors.unitText} pr-1.5 flex-shrink-0 select-none`} style={{ fontSize: "10.5px", fontWeight: 700 }}>개</span>
        </div>
        <span className="text-slate-300 flex-shrink-0 text-right" style={{ fontSize: "10.5px", minWidth: "44px" }}>
          {totalQtyDisplay > 0 ? `=${fmt(totalQtyDisplay)}` : "=0"}
        </span>
      </div>

      {/* 금액 */}
      <div
        className={`text-right px-2.5 py-1.5 rounded-lg flex-shrink-0 ${
          displayTotal > 0 ? (isBulkCat && bulkPct > 0 ? "bg-violet-50" : colors.priceBg) : "bg-slate-50"
        }`}
        style={{ minWidth: "96px" }}
      >
        {displayTotal > 0 ? (
          <>
            <div className={isBulkCat && bulkPct > 0 ? "text-violet-700" : colors.priceText} style={{ fontSize: "13px", fontWeight: 700 }}>
              {fmt(displayTotal)}원
            </div>
            {isBulkCat && diff > 0 && (
              <div className="text-violet-400" style={{ fontSize: "9.5px" }}>+{fmt(diff)}원↑</div>
            )}
          </>
        ) : (
          <span className="text-slate-300" style={{ fontSize: "13px" }}>—</span>
        )}
      </div>
    </div>
  );
}

// ─── CategorySection ──────────────────────────────────────────────────────────
function CategorySection({
  catId, quantities, onChange, bulkPct,
}: {
  catId: string;
  quantities: Quantities;
  onChange: (id: string, field: "boxes" | "sets" | "units", val: string) => void;
  bulkPct: number;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const cat = priceCategories.find((c) => c.id === catId)!;
  const colors = colorMap[catId] ?? colorMap.crops;
  const isBulkCat = catId === BULK_ELIGIBLE_CAT;

  const catBase = cat.items.reduce((sum, item) => sum + calcBase(item, getQty(quantities[item.id])), 0);
  const catTotal = isBulkCat ? applyBulk(catBase, bulkPct) : catBase;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${colors.header} border-b border-slate-100`}
      >
        <span className="text-2xl">{cat.emoji}</span>
        <span className="flex-1 text-left text-slate-800" style={{ fontSize: "16px", fontWeight: 700 }}>{cat.label}</span>
        {catTotal > 0 && (
          <div className="flex items-center gap-1.5">
            {isBulkCat && bulkPct > 0 && catBase !== catTotal && (
              <span className="text-slate-400 line-through" style={{ fontSize: "12px" }}>{fmt(catBase)}</span>
            )}
            <span
              className={`${isBulkCat && bulkPct > 0 ? "bg-violet-100 text-violet-700" : `${colors.priceBg} ${colors.priceText}`} rounded-full px-3 py-1`}
              style={{ fontSize: "13px", fontWeight: 700 }}
            >
              {fmt(catTotal)}원
            </span>
          </div>
        )}
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`} />
      </button>

      {!collapsed && (
        <div className="py-1.5">
          <div className="flex items-center gap-2 px-4 pb-2 border-b border-slate-50">
            <div className="w-7 flex-shrink-0" />
            <div className="flex-1 text-slate-400" style={{ fontSize: "10px", fontWeight: 600 }}>아이템</div>
            <div className="flex-shrink-0 flex items-center gap-1 mr-1">
              <span className="text-slate-400" style={{ fontSize: "10px", fontWeight: 600 }}>상자</span>
              <span className="text-slate-300 mx-0.5" style={{ fontSize: "10px" }}>+</span>
              <span className="text-slate-400" style={{ fontSize: "10px", fontWeight: 600 }}>셋(×64)</span>
              <span className="text-slate-300 mx-0.5" style={{ fontSize: "10px" }}>+</span>
              <span className="text-slate-400" style={{ fontSize: "10px", fontWeight: 600 }}>낱개</span>
              <span className="text-slate-300 mx-0.5" style={{ fontSize: "10px" }}>=합계</span>
            </div>
            <div className="text-right text-slate-400 flex-shrink-0" style={{ fontSize: "10px", fontWeight: 600, minWidth: "96px" }}>
              {isBulkCat && bulkPct > 0 ? "대량상점가" : "예상 금액"}
            </div>
          </div>
          {cat.items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              qty={quantities[item.id] ?? { boxes: "", sets: "", units: "" }}
              onChangeBoxes={(val) => onChange(item.id, "boxes", val)}
              onChangeSets={(val) => onChange(item.id, "sets", val)}
              onChangeUnits={(val) => onChange(item.id, "units", val)}
              colors={colors}
              bulkPct={bulkPct}
              isBulkCat={isBulkCat}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Profit Analysis ──────────────────────────────────────────────────────────
function ProfitAnalysis({ bulkPct }: { bulkPct: number }) {
  const [open, setOpen] = useState(true);

  const cropItems = priceCategories.find(c => c.id === "crops")?.items ?? [];

  if (bulkPct === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 flex items-center gap-3">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <p className="text-slate-500" style={{ fontSize: "13px" }}>
          대량상점 보너스를 설정하면 <strong className="text-violet-600">수익 분석</strong> 및 <strong className="text-violet-600">작물 매입 기준가</strong>가 자동으로 계산돼요.
        </p>
      </div>
    );
  }

  const marginItems = cropItems.map(item => {
    const base = perItemPrice(item);
    const bulk = base * (100 + bulkPct) / 100;
    return { item, base, bulk, margin: bulk - base };
  }).sort((a, b) => b.margin - a.margin);

  return (
    <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-5 py-4">
        <TrendingUp className="w-4 h-4 text-violet-500" />
        <span className="text-violet-800" style={{ fontSize: "15px", fontWeight: 700 }}>수익 분석 — 대량상점 +{bulkPct}% 기준</span>
        <ChevronDown className={`w-4 h-4 text-violet-400 ml-auto transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "대량상점 보너스", value: `+${bulkPct}%`, color: "text-violet-600" },
              { label: "기본 상점 대비", value: `${100 + bulkPct}%`, color: "text-emerald-600" },
              { label: "판매 가능 품목", value: `농작물 전체`, color: "text-amber-600" },
            ].map(c => (
              <div key={c.label} className="bg-white border border-violet-100 rounded-xl p-3 text-center">
                <div className={`${c.color} mb-0.5`} style={{ fontSize: "15px", fontWeight: 900 }}>{c.value}</div>
                <div className="text-slate-400" style={{ fontSize: "11px" }}>{c.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-violet-800 mb-1.5" style={{ fontSize: "14px", fontWeight: 700 }}>
              💰 작물별 개당 수익 (매입 기준가 — 이 가격 이하로 사야 이득)
            </h3>
            <div className="bg-white border border-violet-100 rounded-xl overflow-hidden">
              <div className="grid grid-cols-4 px-4 py-2 border-b border-slate-50 gap-2">
                {["아이템", "기본 상점가/개", `대량상점가/개`, "개당 수익"].map(h => (
                  <span key={h} className="text-slate-400" style={{ fontSize: "10.5px", fontWeight: 600 }}>{h}</span>
                ))}
              </div>
              {marginItems.slice(0, 8).map(({ item, base, bulk, margin }) => (
                <div key={item.id} className="grid grid-cols-4 px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-violet-50/40 transition-colors gap-2 items-center">
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontSize: "14px" }}>{item.emoji}</span>
                    <span className="text-slate-700 truncate" style={{ fontSize: "12px", fontWeight: 500 }}>{item.name}</span>
                  </div>
                  <div className="text-slate-500" style={{ fontSize: "12px" }}>{fmt(Math.floor(base))}원</div>
                  <div className="text-violet-700" style={{ fontSize: "12px", fontWeight: 700 }}>{fmt(Math.floor(bulk))}원</div>
                  <div>
                    <span className="bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5" style={{ fontSize: "11px", fontWeight: 700 }}>
                      +{fmt(Math.floor(margin))}원
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-violet-100 rounded-xl p-4 space-y-1.5">
            <h3 className="text-violet-800 mb-2" style={{ fontSize: "14px", fontWeight: 700 }}>💡 수익 극대화 팁</h3>
            <div className="space-y-1.5 text-slate-600" style={{ fontSize: "12.5px", lineHeight: 1.7 }}>
              <p>🌾 <strong>되팔기 전략:</strong> 기본 상점가보다 낮게 매입 → 대량상점에서 <strong className="text-violet-600">+{bulkPct}% 이득</strong>으로 판매!</p>
              <p>☠️ <strong>독 감자</strong>와 🍎 <strong>사과</strong>는 개당 단가가 높아 되팔기 마진이 가장 커요.</p>
              {bulkPct >= 15 && (
                <p className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-amber-700">
                  ⭐ <strong>+{bulkPct}% 이상이면</strong> 대량 매입 되팔기가 충분히 수익성이 나와요!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Calculator ───────────────────────────────────────────────────────────
export function Calculator() {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [activeTab, setActiveTab] = useState<string>("all");
  const [bulkPct, setBulkPct] = useState<number>(0);

  const handleChange = useCallback((id: string, field: "boxes" | "sets" | "units", val: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? { boxes: "", sets: "", units: "" }), [field]: val },
    }));
  }, []);

  const handleReset = () => setQuantities({});

  const grandBase = priceCategories.reduce((sum, cat) =>
    sum + cat.items.reduce((s, item) => s + calcBase(item, getQty(quantities[item.id])), 0), 0);

  const grandTotal = priceCategories.reduce((sum, cat) =>
    sum + cat.items.reduce((s, item) => {
      const base = calcBase(item, getQty(quantities[item.id]));
      return s + (cat.id === BULK_ELIGIBLE_CAT ? applyBulk(base, bulkPct) : base);
    }, 0), 0);

  const totalDiff = grandTotal - grandBase;

  const displayCats = activeTab === "all" ? priceCategories.map((c) => c.id) : [activeTab];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-4">
          <CalculatorIcon className="w-3.5 h-3.5 text-amber-500" />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#d97706" }}>상점가 계산</span>
        </div>
        <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, lineHeight: 1.2 }}>
          상점가 계산
        </h1>
        <p className="text-slate-500" style={{ fontSize: "15px" }}>
          상자 + 셋(×64개) + 낱개 수량 입력 · 대량상점 모드에서 전체 농작물에 보너스 적용
        </p>
      </div>

      {/* Bulk selector */}
      <div className="mb-5">
        <BulkPercentSelector value={bulkPct} onChange={setBulkPct} />
      </div>

      {/* Total card */}
      <div className={`rounded-2xl p-5 mb-6 text-white shadow-lg ${
        bulkPct > 0 ? "bg-gradient-to-r from-violet-500 to-indigo-500" : "bg-gradient-to-r from-amber-400 to-orange-400"
      }`}>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p style={{ fontSize: "13px", fontWeight: 500, opacity: 0.85 }}>
              {bulkPct > 0 ? `총 예상 판매 금액 (대량상점 +${bulkPct}% 적용)` : "총 예상 판매 금액 (기본 상점가)"}
            </p>
            <p style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 900, letterSpacing: "-0.5px" }}>
              {fmt(grandTotal)}<span style={{ fontSize: "1rem", fontWeight: 600, opacity: 0.8 }}> 원</span>
            </p>
            {bulkPct > 0 && totalDiff > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <span className="line-through opacity-60" style={{ fontSize: "13px" }}>{fmt(grandBase)}원</span>
                <span className="bg-white/25 rounded-full px-2.5 py-0.5" style={{ fontSize: "12px", fontWeight: 700 }}>
                  +{fmt(totalDiff)}원 추가 수익!
                </span>
              </div>
            )}
            <p style={{ fontSize: "11px", opacity: 0.65, marginTop: "4px" }}>1상자 = 54셋 = 3,456개 · 1셋 = 64개</p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-4 py-2.5 flex-shrink-0"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl border transition-all duration-150 ${
            activeTab === "all" ? "bg-slate-700 text-white border-slate-700 shadow-sm" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
          }`}
          style={{ fontSize: "13.5px", fontWeight: 600 }}
        >
          전체
        </button>
        {priceCategories.map((cat) => {
          const c = colorMap[cat.id];
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl border transition-all duration-150 ${isActive ? c.tabActive : c.tab}`}
              style={{ fontSize: "13.5px", fontWeight: 600 }}
            >
              {cat.emoji} {cat.label}
            </button>
          );
        })}
      </div>

      {/* Sections */}
      <div className="space-y-4 mb-6">
        {displayCats.map((catId) => (
          <CategorySection key={catId} catId={catId} quantities={quantities} onChange={handleChange} bulkPct={bulkPct} />
        ))}
      </div>

      <ProfitAnalysis bulkPct={bulkPct} />

      <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
        <p className="text-slate-500" style={{ fontSize: "12.5px", lineHeight: 1.7 }}>
          💡 <strong>1상자 = 54셋 = 3,456개</strong> · <strong>1셋 = 64개</strong>. 예) 1상자 2셋 5개 → 3,456+128+5 = 3,589개로 계산돼요.<br />
          💡 <strong>대량상점</strong>은 모든 농작물에 보너스가 적용됩니다 (결정석 제외).<br />
          💡 <strong>개당 단가</strong>를 기준으로 계산하므로 농작물도 1개 단위로 표시돼요.
        </p>
      </div>
    </div>
  );
}