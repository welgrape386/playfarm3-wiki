const miningImageUrl = "https://images.unsplash.com/photo-1766934697089-d69cd41a44b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyb3VuZCUyMG1pbmluZyUyMGNhdmUlMjBkYXJrJTIwZ2Vtc3xlbnwxfHx8fDE3NzMzODU5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080";
const npcImageUrl = "https://images.unsplash.com/photo-1546949268-4d54c6adf6cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMGZhbnRhc3klMjBtZXJjaGFudCUyMHNob3AlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzMzODU5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080";

const crystals = [
  { emoji: "💚", name: "에메랄드 결정", price: 17550, color: "from-emerald-50 to-green-50 border-emerald-200", text: "text-emerald-600", rarity: "희귀" },
  { emoji: "💎", name: "다이아몬드 결정", price: 11700, color: "from-cyan-50 to-sky-50 border-cyan-200", text: "text-cyan-600", rarity: "희귀" },
  { emoji: "🟡", name: "황금 결정", price: 2710, color: "from-yellow-50 to-amber-50 border-yellow-200", text: "text-yellow-600", rarity: "보통" },
  { emoji: "⬜", name: "철 결정", price: 1560, color: "from-slate-50 to-gray-50 border-slate-200", text: "text-slate-600", rarity: "보통" },
  { emoji: "🪨", name: "돌 결정", price: 585, color: "from-stone-50 to-gray-50 border-stone-200", text: "text-stone-600", rarity: "흔함" },
];

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

export function Mining() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-full px-4 py-1.5 mb-4">
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#78716c" }}>⛏️ 채광 콘텐츠</span>
        </div>
        <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>
          채광장
        </h1>
        <p className="text-slate-500" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          광물과 결정석을 채취하고, 곡괭이를 강화하여 더 높은 수익을 만들어보세요
        </p>
      </div>

      {/* Image section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {/* Mining area image */}
        <div className="relative rounded-2xl overflow-hidden shadow-md group" style={{ height: "220px" }}>
          <img src={miningImageUrl} alt="채광장" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-white" style={{ fontSize: "16px", fontWeight: 700 }}>⛏️ 채광장</div>
            <div className="text-white/80" style={{ fontSize: "12px" }}>광물과 결정석이 드롭되는 구역</div>
          </div>
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1">
            <span className="text-white" style={{ fontSize: "11px", fontWeight: 600 }}>📍 /광산</span>
          </div>
        </div>

        {/* NPC shop image */}
        <div className="relative rounded-2xl overflow-hidden shadow-md group" style={{ height: "220px" }}>
          <img src={npcImageUrl} alt="결정석 상점 NPC" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-white" style={{ fontSize: "16px", fontWeight: 700 }}>🏪 결정석 상점 NPC</div>
            <div className="text-white/80" style={{ fontSize: "12px" }}>결정석을 최대 시세로 판매하세요</div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 wiki-section">
        {[
          { emoji: "💎", title: "결정석 드롭", desc: "일반 광물 채광 시 추가로 결정석 획득 가능", color: "from-sky-50 to-blue-50 border-sky-200" },
          { emoji: "🔧", title: "강화 재료", desc: "결정석은 곡괭이 강화 재료로 사용 가능", color: "from-slate-50 to-gray-50 border-slate-200" },
          { emoji: "💰", title: "판매 수익", desc: "결정석을 상점 NPC에게 최대 시세로 판매", color: "from-amber-50 to-yellow-50 border-amber-200" },
        ].map((c) => (
          <div key={c.title} className={`bg-gradient-to-br ${c.color} border rounded-2xl p-5`}>
            <div className="text-2xl mb-2">{c.emoji}</div>
            <div className="text-slate-800 mb-1" style={{ fontSize: "14px", fontWeight: 700 }}>{c.title}</div>
            <p className="text-slate-500" style={{ fontSize: "12.5px", lineHeight: 1.6 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Crystal prices */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>💎 결정석 최대 시세 (1개 기준)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {crystals.map((c) => (
            <div key={c.name} className={`bg-gradient-to-br ${c.color} border rounded-2xl px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow`}>
              <span className="text-3xl">{c.emoji}</span>
              <div className="flex-1">
                <div className="text-slate-800" style={{ fontSize: "14px", fontWeight: 700 }}>{c.name}</div>
                <div className={`${c.text} mt-0.5`} style={{ fontSize: "18px", fontWeight: 900 }}>{fmt(c.price)}원</div>
              </div>
              <span className="bg-white/60 text-slate-500 rounded-full px-2 py-0.5 text-right" style={{ fontSize: "10px", fontWeight: 600 }}>
                {c.rarity}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-cyan-50 border border-cyan-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌊</span>
            <div className="flex-1">
              <div className="text-slate-800" style={{ fontSize: "14px", fontWeight: 700 }}>파도의 결정</div>
              <div className="text-slate-500" style={{ fontSize: "12px" }}>낚시터 — 바다 조개 개봉 시 획득</div>
            </div>
            <div className="text-cyan-600" style={{ fontSize: "20px", fontWeight: 900 }}>{fmt(50000)}원</div>
          </div>
        </div>
      </section>

      {/* Pickaxe info */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>⚒️ 곡괭이 강화 & 각성</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Enhancement */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-slate-700 mb-4 flex items-center gap-2" style={{ fontSize: "16px", fontWeight: 700 }}>
              <span className="text-xl">🔨</span> 강화 방법
            </h3>
            <div className="space-y-2 mb-4">
              {[
                "아이템과 주문서를 /강화 메뉴에 올려놓아요",
                "강화 시작 버튼을 눌러요",
                "도구에 동일한 인첸트가 이미 부여되어 있어야 해요",
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>{i + 1}</span>
                  <span className="text-slate-600" style={{ fontSize: "13px" }}>{s}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { result: "성공", desc: "인첸트 +1 상승", color: "bg-green-50 text-green-700 border-green-200" },
                { result: "유지", desc: "변화 없음", color: "bg-slate-50 text-slate-600 border-slate-200" },
                { result: "하락", desc: "인첸트 -1 하락", color: "bg-amber-50 text-amber-700 border-amber-200" },
                { result: "파괴", desc: "도구가 파괴됨", color: "bg-red-50 text-red-700 border-red-200" },
              ].map((r) => (
                <div key={r.result} className={`${r.color} border rounded-xl px-3 py-2.5`}>
                  <div style={{ fontSize: "13px", fontWeight: 700 }}>{r.result}</div>
                  <div style={{ fontSize: "11.5px", opacity: 0.8 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Awakening */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-slate-700 mb-4 flex items-center gap-2" style={{ fontSize: "16px", fontWeight: 700 }}>
              <span className="text-xl">✨</span> 각성 조건 & 효과
            </h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
                <div className="text-slate-800 mb-1.5" style={{ fontSize: "14px", fontWeight: 700 }}>⛏️ 곡괭이 각성</div>
                <div className="text-slate-600 mb-2" style={{ fontSize: "12.5px" }}>
                  조건: 효율 7 · 행운 8 · 태양열 5
                </div>
                <div className="text-purple-700 bg-purple-50 rounded-lg px-3 py-2" style={{ fontSize: "12.5px", fontWeight: 500 }}>
                  효과: 도구 크기 증가 · 행운 9 · 태양열 10 (100%)
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-slate-600" style={{ fontSize: "12.5px", lineHeight: 1.7 }}>
                  📍 각성 절차: <strong>/각성소</strong>로 이동 후 아이템 교환
                </div>
                <div className="text-slate-500 mt-1" style={{ fontSize: "11.5px" }}>
                  아이템 설명에 아이콘이 있는 도구만 각성 가능해요
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commands */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "16px", fontWeight: 700 }}>📋 관련 명령어</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { cmd: "/광산", desc: "채광장으로 이동" },
            { cmd: "/강화", desc: "도구 강화 메뉴 열기" },
            { cmd: "/각성소", desc: "도구 각성소로 이동" },
            { cmd: "/중첩", desc: "광물을 블록으로 조합" },
            { cmd: "/도움말 채광", desc: "채광장 관련 도움말" },
            { cmd: "/도움말 강화", desc: "강화 관련 도움말" },
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