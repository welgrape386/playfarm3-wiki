import { useState } from "react";

const dropMaterials = [
  { emoji: "🌾", name: "구수한 밀",          price: 295, from: "밀 수확" },
  { emoji: "🍉", name: "아삭한 수박",        price: 300, from: "수박 수확" },
  { emoji: "🎃", name: "달달한 호박",        price: 420, from: "호박 수확" },
  { emoji: "🫚", name: "달콤한 비트",        price: 397, from: "사탕무 수확" },
  { emoji: "🫘", name: "향긋한 코코아콩",    price: 442, from: "코코아콩 수확" },
  { emoji: "🍄", name: "알싸한 네더 사마귀", price: 510, from: "네더 사마귀 수확" },
  { emoji: "🥕", name: "아삭한 당근",        price: 340, from: "당근 수확" },
  { emoji: "🥔", name: "포슬한 감자",        price: 316, from: "감자 수확" },
  { emoji: "🍎", name: "상큼한 사과",        price: 340, from: "사과 수확" },
];

// 통조림: 작물 960개 압축 → 통조림 1개
const canItems = [
  { emoji: "🥫", name: "네더 사마귀 통조림", cropName: "네더 사마귀",  cropAmount: 960 },
  { emoji: "🥫", name: "코코아콩 통조림",    cropName: "코코아콩",     cropAmount: 960 },
  { emoji: "🥫", name: "설탕 통조림",        cropName: "설탕",         cropAmount: 960 },
  { emoji: "🥫", name: "사탕무 통조림",      cropName: "사탕무",       cropAmount: 960 },
  { emoji: "🥫", name: "씨앗 통조림",        cropName: "씨앗",         cropAmount: 960 },
];

const lowerRecipes = [
  {
    emoji: "🍔", name: "햄버거",
    ingredients: ["당근 ×8", "비트 ×8", "감자 ×8", "호박 ×8", "네더 사마귀 ×8"],
    time: "즉시", sellPrice: 2455,
  },
  {
    emoji: "🍉", name: "사악한 수박",
    ingredients: ["아삭한 수박 ×2", "달달한 호박 ×2"],
    time: "즉시", sellPrice: 4200,
  },
  {
    emoji: "🍈", name: "메론빵",
    ingredients: ["구수한 밀 ×2", "아삭한 수박 ×2", "밀 씨앗 ×6"],
    time: "즉시", sellPrice: 3200,
  },
  {
    emoji: "🍬", name: "악마의 사탕",
    ingredients: ["구수한 밀 ×2", "알싸한 네더 사마귀 ×2"],
    time: "즉시", sellPrice: 3526,
  },
  {
    emoji: "🍪", name: "황금 쿠키",
    ingredients: ["구수한 밀 ×3", "향긋한 코코아콩 ×3"],
    time: "즉시", sellPrice: 4952,
  },
  {
    emoji: "🍞", name: "달콤한 당근빵",
    ingredients: ["포슬한 감자 ×3", "아삭한 당근 ×1", "독이 든 감자 ×1"],
    time: "즉시", sellPrice: 2700,
  },
];

const upperRecipes = [
  {
    emoji: "🥺", name: "감동의 도시락",
    ingredients: [
      "아삭한 당근 ×15", "포슬한 감자 ×15", "달달한 호박 ×15",
      "달콤한 비트 ×15", "알싸한 네더 사마귀 ×15", "향긋한 코코아콩 ×15",
    ],
    time: "상급", sellPrice: 310000,
  },
  {
    emoji: "❤️", name: "사랑의 도시락",
    ingredients: [
      "네더 사마귀 통조림 ×3", "코코아콩 통조림 ×3", "설탕 통조림 ×3",
      "사탕무 통조림 ×2", "씨앗 통조림 ×1",
      "달콤한 비트 ×10", "알싸한 네더 사마귀 ×10", "향긋한 코코아콩 ×10",
    ],
    time: "상급", sellPrice: 1000000,
  },
];

const specialRecipes: never[] = [];

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

export function Cooking() {
  const [canTab, setCanTab] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-4">
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#ea580c" }}>🍳 요리 콘텐츠</span>
        </div>
        <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>
          요리 시스템
        </h1>
        <p className="text-slate-500" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          섬에서 재배한 작물로 재료를 모아 요리를 만들어 수익을 높여보세요
        </p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 wiki-section">
        {[
          { emoji: "⚡", title: "하급 요리", desc: "즉시 완성되는 기본 요리", color: "from-green-50 to-emerald-50 border-green-200", text: "text-green-700" },
          { emoji: "⏱️", title: "상급 요리", desc: "제작 시간 2시간 (등급 높을수록 단축)", color: "from-orange-50 to-amber-50 border-orange-200", text: "text-orange-700" },
          { emoji: "🥫", title: "통조림 제작", desc: "작물 960개 압축 → 통조림 1개 (특수 요리 재료)", color: "from-sky-50 to-blue-50 border-sky-200", text: "text-sky-700" },
        ].map((c) => (
          <div key={c.title} className={`bg-gradient-to-br ${c.color} border rounded-2xl p-5`}>
            <div className="text-2xl mb-2">{c.emoji}</div>
            <div className={`${c.text} mb-1`} style={{ fontSize: "15px", fontWeight: 700 }}>{c.title}</div>
            <p className="text-slate-500" style={{ fontSize: "13px", lineHeight: 1.6 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Drop Materials */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4 flex items-center gap-2" style={{ fontSize: "18px", fontWeight: 700 }}>
          <span>✨</span> 드롭 재료 (9종)
        </h2>
        <p className="text-slate-400 mb-4" style={{ fontSize: "13px" }}>
          각 작물을 수확할 때 <strong className="text-amber-500">1% 확률</strong>로 드롭되는 특별 재료예요. 요리 제작에 사용되며 직접 판매도 가능해요.
        </p>
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y divide-slate-50">
            {dropMaterials.map((m) => (
              <div key={m.name} className="flex items-center gap-3 px-5 py-4 hover:bg-amber-50/40 transition-colors">
                <span className="text-2xl">{m.emoji}</span>
                <div className="flex-1">
                  <div className="text-slate-800" style={{ fontSize: "14px", fontWeight: 600 }}>{m.name}</div>
                  <div className="text-slate-400" style={{ fontSize: "11.5px" }}>📍 {m.from}</div>
                </div>
                <div className="text-right">
                  <div className="text-amber-600" style={{ fontSize: "13px", fontWeight: 700 }}>{fmt(m.price)}원</div>
                  <div className="text-slate-400" style={{ fontSize: "10px" }}>개당 판매가</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 통조림 */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4 flex items-center gap-2" style={{ fontSize: "18px", fontWeight: 700 }}>
          <span>🥫</span> 통조림 ({canItems.length}종)
        </h2>
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 mb-4 flex items-start gap-3">
          <span className="text-xl">📦</span>
          <div>
            <p className="text-sky-800" style={{ fontSize: "13px", fontWeight: 600 }}>통조림 제작 방법</p>
            <p className="text-sky-600" style={{ fontSize: "12px", lineHeight: 1.6 }}>
              해당 작물 <strong>960개</strong>를 압축하면 통조림 1개가 제작돼요. 통조림은 사랑의 도시락 등 특수 요리의 핵심 재료입니다.
            </p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-50">
            {canItems.map((c) => (
              <div key={c.name} className="flex items-center gap-3 px-5 py-4 hover:bg-sky-50/40 transition-colors">
                <span className="text-2xl">{c.emoji}</span>
                <div className="flex-1">
                  <div className="text-slate-800" style={{ fontSize: "14px", fontWeight: 600 }}>{c.name}</div>
                  <div className="text-slate-400" style={{ fontSize: "11.5px" }}>
                    {c.cropName} <span className="text-sky-500 font-semibold">{c.cropAmount.toLocaleString()}개</span> → 통조림 1개
                  </div>
                </div>
                <span className="bg-sky-100 text-sky-600 rounded-full px-3 py-0.5" style={{ fontSize: "11px", fontWeight: 600 }}>압축 제작</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes */}
      <div className="space-y-8">
        {/* 하급 요리 */}
        <section>
          <h2 className="text-slate-700 mb-4 flex items-center gap-2" style={{ fontSize: "18px", fontWeight: 700 }}>
            <span className="bg-green-100 text-green-600 rounded-xl px-3 py-1" style={{ fontSize: "12px", fontWeight: 700 }}>⚡ 하급 요리</span>
            <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 400 }}>즉시 완성</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lowerRecipes.map((r) => (
              <div key={r.name} className="bg-white border border-green-100 rounded-2xl px-4 py-3.5 flex items-start gap-3 hover:shadow-sm transition-shadow">
                <span className="text-2xl flex-shrink-0">{r.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-slate-800" style={{ fontSize: "14px", fontWeight: 700 }}>{r.name}</span>
                    <span className="bg-green-100 text-green-600 rounded-full px-2 py-0.5" style={{ fontSize: "10px", fontWeight: 600 }}>즉시</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.ingredients.map((ing) => (
                      <span key={ing} className="bg-green-50 text-green-700 rounded-lg px-2 py-0.5" style={{ fontSize: "11px", fontWeight: 500 }}>{ing}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-emerald-600" style={{ fontSize: "13px", fontWeight: 700 }}>{fmt(r.sellPrice)}원</div>
                  <div className="text-slate-400" style={{ fontSize: "10px" }}>판매가</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 상급 요리 */}
        <section>
          <h2 className="text-slate-700 mb-4 flex items-center gap-2" style={{ fontSize: "18px", fontWeight: 700 }}>
            <span className="bg-orange-100 text-orange-600 rounded-xl px-3 py-1" style={{ fontSize: "12px", fontWeight: 700 }}>⏱️ 상급 요리</span>
            <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 400 }}>2시간 제작</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {upperRecipes.map((r) => (
              <div key={r.name} className="bg-white border border-orange-100 rounded-2xl px-4 py-3.5 flex items-start gap-3 hover:shadow-sm transition-shadow">
                <span className="text-2xl flex-shrink-0">{r.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-slate-800" style={{ fontSize: "14px", fontWeight: 700 }}>{r.name}</span>
                    <span className="bg-orange-100 text-orange-600 rounded-full px-2 py-0.5" style={{ fontSize: "10px", fontWeight: 600 }}>2시간</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className={`rounded-lg px-2 py-0.5 ${ing.includes("통조림") ? "bg-sky-50 text-sky-700" : "bg-orange-50 text-orange-700"}`}
                        style={{ fontSize: "11px", fontWeight: 500 }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-orange-600" style={{ fontSize: "13px", fontWeight: 700 }}>{fmt(r.sellPrice)}원</div>
                  <div className="text-slate-400" style={{ fontSize: "10px" }}>판매가</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Commands */}
      <section className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "16px", fontWeight: 700 }}>📋 관련 명령어</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { cmd: "/도움말 요리", desc: "요리 도움말 확인" },
            { cmd: "/상점이동",   desc: "재료 및 요리 판매" },
            { cmd: "/메뉴",       desc: "요리 메뉴 접근" },
            { cmd: "/도움말 재료", desc: "재료 드롭 관련 도움말" },
          ].map((c) => (
            <div key={c.cmd} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100">
              <code className="text-sky-600 bg-sky-50 rounded-lg px-2.5 py-1" style={{ fontSize: "13px", fontWeight: 600 }}>{c.cmd}</code>
              <span className="text-slate-500" style={{ fontSize: "13px" }}>{c.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}