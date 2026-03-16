import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Briefcase, Pickaxe, Sprout, Info } from "lucide-react";

function fmt(n: number) { return n.toLocaleString("ko-KR"); }

// ─── 앵커 스크롤 훅 ────────────────────────────────────────────────────────────
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

// ─── 작업 유형 데이터 ─────────────────────────────────────────────────────────
// 1상자 = 54셋 = 3,456칸
const BOX_TO_SETS = 54;
const SET_TO_ITEMS = 64;
const BOX_TO_ITEMS = BOX_TO_SETS * SET_TO_ITEMS; // 3,456

const ALL_JOBS = [
  { id: "block-break",        emoji: "⛏️", name: "블럭 캐기",            minWage: 70,  color: "sky" },
  { id: "block-place",        emoji: "🧱", name: "블럭 설치하기",         minWage: 80,  color: "blue" },
  { id: "farm-plant",         emoji: "🌱", name: "작물 심기 / 밭 갈기",   minWage: 40,  color: "green" },
  { id: "farm-harvest",       emoji: "🌾", name: "작물 캐기",             minWage: 60,  color: "amber" },
  { id: "farm-harvest-plant", emoji: "🔄", name: "작물 캐고 심기 (세트)", minWage: 70,  color: "emerald" },
] as const;

type JobColor = "sky" | "blue" | "green" | "amber" | "emerald";

const colorMap: Record<JobColor, { header: string; badge: string; card: string; text: string; border: string }> = {
  sky:     { header: "from-sky-50 to-blue-50",      badge: "bg-sky-100 text-sky-700",          card: "bg-sky-50",     text: "text-sky-700",     border: "border-sky-200" },
  blue:    { header: "from-blue-50 to-indigo-50",   badge: "bg-blue-100 text-blue-700",        card: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200" },
  green:   { header: "from-green-50 to-emerald-50", badge: "bg-green-100 text-green-700",      card: "bg-green-50",   text: "text-green-700",   border: "border-green-200" },
  amber:   { header: "from-amber-50 to-yellow-50",  badge: "bg-amber-100 text-amber-700",      card: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200" },
  emerald: { header: "from-emerald-50 to-teal-50",  badge: "bg-emerald-100 text-emerald-700",  card: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
};

function JobCard({ job }: { job: typeof ALL_JOBS[number] }) {
  const c = colorMap[job.color as JobColor];
  // 예시: 1셋, 1상자, 5상자, 10상자
  const examples = [
    { label: "1셋",   qty: SET_TO_ITEMS },
    { label: "1상자", qty: BOX_TO_ITEMS },
    { label: "5상자", qty: BOX_TO_ITEMS * 5 },
    { label: "10상자",qty: BOX_TO_ITEMS * 10 },
  ];

  return (
    <div id={job.id} className={`bg-white border-2 ${c.border} rounded-2xl overflow-hidden shadow-sm`}>
      <div className={`flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${c.header} border-b ${c.border}`}>
        <span style={{ fontSize: "22px" }}>{job.emoji}</span>
        <div className="flex-1">
          <span className="text-slate-800" style={{ fontSize: "15px", fontWeight: 700 }}>{job.name}</span>
        </div>
        <div className={`${c.badge} rounded-xl px-3 py-2 text-right flex-shrink-0`}>
          <div style={{ fontSize: "10px", fontWeight: 600, opacity: 0.8 }}>칸당 최소</div>
          <div style={{ fontSize: "18px", fontWeight: 900 }}>{fmt(job.minWage)}원</div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {examples.map((ex) => (
            <div key={ex.label} className={`${c.card} border ${c.border} rounded-xl px-3 py-3 text-center`}>
              <div className="text-slate-500 mb-1" style={{ fontSize: "11px", fontWeight: 600 }}>{ex.label}</div>
              <div className={c.text} style={{ fontSize: "14px", fontWeight: 800 }}>
                {fmt(ex.qty * job.minWage)}원
              </div>
              <div className="text-slate-400 mt-0.5" style={{ fontSize: "10px" }}>
                {fmt(ex.qty)}칸
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-slate-400 text-right" style={{ fontSize: "10.5px" }}>
          1셋 = 64칸 · 1상자 = 54셋 = 3,456칸
        </div>
      </div>
    </div>
  );
}

// ─── 임금 계산기 ──────────────────────────────────────────────────────────────
function WageCalculator() {
  const [selected, setSelected] = useState<string>("block-break");
  const [boxes, setBoxes]   = useState("");
  const [sets, setSets]     = useState("");
  const [singles, setSingles] = useState("");

  const job = ALL_JOBS.find(j => j.id === selected)!;

  const numBoxes   = parseInt(boxes.replace(/[^0-9]/g, ""),   10) || 0;
  const numSets    = parseInt(sets.replace(/[^0-9]/g, ""),    10) || 0;
  const numSingles = parseInt(singles.replace(/[^0-9]/g, ""), 10) || 0;

  // 총 칸 수 계산
  const totalCans = numBoxes * BOX_TO_ITEMS + numSets * SET_TO_ITEMS + numSingles;
  const total     = totalCans * job.minWage;
  const hasInput  = totalCans > 0;

  const handleInput = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-violet-100 flex items-center gap-2">
        <span className="text-lg">🧮</span>
        <span className="text-violet-800" style={{ fontSize: "15px", fontWeight: 700 }}>임금 계산기</span>
        <span className="text-violet-400 ml-1" style={{ fontSize: "12px" }}>상자·셋·칸 입력 → 최저 임금 자동 계산</span>
      </div>
      <div className="px-5 py-5 space-y-4">

        {/* 작업 선택 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ALL_JOBS.map(j => (
            <button
              key={j.id}
              onClick={() => setSelected(j.id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all text-left ${
                selected === j.id
                  ? "border-violet-400 bg-violet-100 text-violet-800"
                  : "border-violet-100 bg-white text-slate-600 hover:border-violet-300"
              }`}
              style={{ fontSize: "12.5px", fontWeight: selected === j.id ? 700 : 500 }}
            >
              <span style={{ fontSize: "16px" }}>{j.emoji}</span>
              <span>{j.name}</span>
            </button>
          ))}
        </div>

        {/* 수량 입력 - 상자 / 셋 / 낱칸 */}
        <div className="bg-white border border-violet-100 rounded-2xl overflow-hidden">
          {/* 헤더 */}
          <div className="grid grid-cols-3 border-b border-violet-100">
            {[
              { label: "상자", sub: "1상자 = 3,456칸" },
              { label: "셋",   sub: "1셋 = 64칸" },
              { label: "낱칸", sub: "1칸" },
            ].map(h => (
              <div key={h.label} className="px-3 py-2 text-center border-r border-violet-50 last:border-0">
                <div className="text-violet-700" style={{ fontSize: "12px", fontWeight: 700 }}>{h.label}</div>
                <div className="text-slate-400" style={{ fontSize: "10px" }}>{h.sub}</div>
              </div>
            ))}
          </div>

          {/* 입력 */}
          <div className="grid grid-cols-3">
            {[
              { value: boxes,   setter: setBoxes,   placeholder: "0" },
              { value: sets,    setter: setSets,    placeholder: "0" },
              { value: singles, setter: setSingles, placeholder: "0" },
            ].map((inp, i) => (
              <div
                key={i}
                className="flex items-center justify-center border-r border-violet-50 last:border-0 focus-within:bg-violet-50/40 transition-colors"
              >
                <input
                  type="text"
                  inputMode="numeric"
                  value={inp.value}
                  onChange={handleInput(inp.setter)}
                  placeholder={inp.placeholder}
                  className="w-full px-3 py-3 bg-transparent text-slate-800 outline-none text-center"
                  style={{ fontSize: "22px", fontWeight: 700 }}
                />
              </div>
            ))}
          </div>

          {/* 칸 합계 */}
          {hasInput && (
            <div className="border-t border-violet-100 px-4 py-2 flex items-center justify-between bg-violet-50/50">
              <span className="text-slate-400" style={{ fontSize: "11.5px" }}>총 칸 수</span>
              <span className="text-violet-700" style={{ fontSize: "13px", fontWeight: 700 }}>
                {numBoxes > 0 && <span className="text-slate-400 mr-1" style={{ fontSize: "11px" }}>{numBoxes}상자</span>}
                {numSets > 0  && <span className="text-slate-400 mr-1" style={{ fontSize: "11px" }}>{numSets}셋</span>}
                {numSingles > 0 && <span className="text-slate-400 mr-1" style={{ fontSize: "11px" }}>{numSingles}칸</span>}
                = {fmt(totalCans)}칸
              </span>
            </div>
          )}
        </div>

        {/* 단가 표시 */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-violet-100/60 rounded-xl">
          <span style={{ fontSize: "15px" }}>{job.emoji}</span>
          <span className="text-violet-700" style={{ fontSize: "13px", fontWeight: 600 }}>{job.name}</span>
          <span className="text-violet-400 ml-auto" style={{ fontSize: "12px" }}>칸당 최소</span>
          <span className="text-violet-800" style={{ fontSize: "14px", fontWeight: 800 }}>{fmt(job.minWage)}원</span>
        </div>

        {/* 결과 */}
        <div className={`border-2 rounded-2xl px-5 py-4 transition-all ${
          hasInput ? "bg-white border-violet-300" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="text-slate-400 mb-1" style={{ fontSize: "12px" }}>
            {hasInput
              ? `${job.emoji} ${job.name} ${fmt(totalCans)}칸 최저 임금`
              : "위에 수량을 입력하면 임금이 계산됩니다"}
          </div>
          <div className={`tabular-nums ${hasInput ? "text-violet-700" : "text-slate-300"}`}
            style={{ fontSize: "30px", fontWeight: 900 }}>
            {hasInput ? `${fmt(total)}원` : "—"}
          </div>
          {hasInput && (
            <div className="text-slate-400 mt-1" style={{ fontSize: "11.5px" }}>
              {fmt(totalCans)}칸 × {fmt(job.minWage)}원/칸
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function MinimumWage() {
  useScrollToHash();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 mb-4">
          <Briefcase className="w-3.5 h-3.5 text-violet-500" />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#7c3aed" }}>알바 가이드</span>
        </div>
        <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, lineHeight: 1.2 }}>
          알바 최저임금 기준
        </h1>
        <p className="text-slate-500" style={{ fontSize: "15px" }}>
          플레이팜3 서버에서 다른 유저를 고용하거나 알바를 할 때 참고할 최저임금 기준이에요.
        </p>
      </div>

      {/* 안내 박스 */}
      <div
        id="mw-overview"
        className="flex items-start gap-3 rounded-2xl px-5 py-4 mb-8"
        style={{ background: "#f5f3ff", border: "1.5px solid #ddd6fe" }}
      >
        <Info className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-violet-800 mb-1.5" style={{ fontSize: "14px", fontWeight: 700 }}>
            최저임금 기준 안내
          </div>
          <p className="text-violet-700" style={{ fontSize: "13px", lineHeight: 1.7 }}>
            아래 금액은 <strong>최소 기준</strong>이에요. 서로 협의하여 더 높은 금액으로 계약할 수 있어요.<br />
            고용자와 피고용자 모두 서로 존중하며 공정한 거래를 해주세요! 😊
          </p>
        </div>
      </div>

      {/* 요약 표 */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm mb-8">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-gray-50">
          <span className="text-lg">📋</span>
          <span className="text-slate-800" style={{ fontSize: "15px", fontWeight: 700 }}>최저임금 한눈에 보기</span>
        </div>
        <div className="divide-y divide-slate-50">
          {[
            { emoji: "⛏️", name: "블럭 캐기",            wage: 70, color: "text-sky-600" },
            { emoji: "🧱", name: "블럭 설치하기",         wage: 80, color: "text-blue-600" },
            { emoji: "🌱", name: "작물 심기 / 밭 갈기",   wage: 40, color: "text-green-600" },
            { emoji: "🌾", name: "작물 캐기",             wage: 60, color: "text-amber-600" },
            { emoji: "🔄", name: "작물 캐고 심기 (세트)", wage: 70, color: "text-emerald-600" },
          ].map((row) => (
            <div key={row.name} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/60 transition-colors">
              <span style={{ fontSize: "18px" }}>{row.emoji}</span>
              <span className="flex-1 text-slate-800" style={{ fontSize: "14px", fontWeight: 500 }}>{row.name}</span>
              <span className="text-slate-400 mr-2" style={{ fontSize: "12px" }}>칸당 최소</span>
              <span className={`${row.color} tabular-nums`} style={{ fontSize: "16px", fontWeight: 800 }}>
                {fmt(row.wage)}원
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 임금 계산기 */}
      <div className="mb-8">
        <WageCalculator />
      </div>

      {/* 블럭 작업 */}
      <div id="mw-mining" className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Pickaxe className="w-5 h-5 text-sky-500" />
          <span className="text-slate-800" style={{ fontSize: "17px", fontWeight: 700 }}>블럭 작업 — 참고 예시</span>
        </div>
        <div className="space-y-4">
          {ALL_JOBS.filter(j => j.id.startsWith("block")).map(job => <JobCard key={job.id} job={job} />)}
        </div>
      </div>

      {/* 농사 작업 */}
      <div id="mw-farming" className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sprout className="w-5 h-5 text-green-500" />
          <span className="text-slate-800" style={{ fontSize: "17px", fontWeight: 700 }}>농사 작업 — 참고 예시</span>
        </div>
        <div className="space-y-4">
          {ALL_JOBS.filter(j => j.id.startsWith("farm")).map(job => <JobCard key={job.id} job={job} />)}
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
        <p className="text-slate-500" style={{ fontSize: "12.5px", lineHeight: 1.8 }}>
          📌 위 기준은 <strong className="text-slate-700">유저 커뮤니티 자체 기준</strong>으로, 공식 서버 정책이 아닙니다.<br />
          💬 분쟁을 예방하기 위해 고용 전 <strong className="text-slate-700">칸 수, 단가, 총 금액을 명확히 합의</strong>하고 시작하세요.<br />
          🤝 서로 존중하는 플레이팜3 커뮤니티를 만들어 주세요!
        </p>
      </div>
    </div>
  );
}