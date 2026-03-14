import { useState } from "react";

const fishingTabs = ["잠수 낚시 (꿈나라)", "커스텀 낚시"];

const customFishGrades = [
  { grade: "일반", color: "bg-slate-100 text-slate-600", desc: "가장 흔한 등급", minigame: false },
  { grade: "고급", color: "bg-green-100 text-green-700", desc: "기본 이상의 물고기", minigame: false },
  { grade: "희귀", color: "bg-blue-100 text-blue-700", desc: "미니게임 발동!", minigame: true },
  { grade: "영웅", color: "bg-purple-100 text-purple-700", desc: "미니게임 발동!", minigame: true },
  { grade: "전설", color: "bg-amber-100 text-amber-700", desc: "미니게임 발동!", minigame: true },
  { grade: "신화", color: "bg-rose-100 text-rose-700", desc: "최고 등급!", minigame: true },
];

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

export function Fishing() {
  const [tab, setTab] = useState(0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-1.5 mb-4">
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#0891b2" }}>🎣 낚시 콘텐츠</span>
        </div>
        <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>
          낚시 시스템
        </h1>
        <p className="text-slate-500" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          잠수 낚시로 자동 수익을 얻거나, 커스텀 낚시로 63종의 물고기를 낚아보세요
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {fishingTabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-5 py-2.5 rounded-xl transition-all duration-150 ${
              tab === i
                ? "bg-cyan-500 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            {i === 0 ? "💤" : "🎣"} {t}
          </button>
        ))}
      </div>

      {/* Tab 0: 잠수 낚시 */}
      {tab === 0 && (
        <div>
          {/* Hero card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute right-6 top-6 text-7xl opacity-20">💤</div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span style={{ fontSize: "12px", fontWeight: 500 }}>자동 진행</span>
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>꿈나라 잠수 낚시</h2>
              <p style={{ fontSize: "14px", lineHeight: 1.7, opacity: 0.9 }}>
                자리를 비워도 OK! 꿈나라 의자에 앉기만 하면<br />
                자동으로 별이 우편함에 쌓여요.
              </p>
            </div>
          </div>

          {/* How to */}
          <section className="mb-8">
            <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>📋 이용 방법</h2>
            <div className="space-y-3">
              {[
                { step: 1, emoji: "🪑", title: "꿈나라 의자에 앉기", desc: "꿈나라 구역에 있는 의자에 앉아요." },
                { step: 2, emoji: "🎣", title: "꿈나라 낚싯대 장착", desc: "꿈나라 낚싯대를 주손에 들면 자동으로 활성화돼요." },
                { step: 3, emoji: "⭐", title: "별 자동 수집", desc: "시간이 지나면 별이 /우편함에 자동으로 저장돼요. (보관 7일)" },
                { step: 4, emoji: "💰", title: "별 판매", desc: "/별판매 명령어로 모은 별을 판매해요." },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 bg-white border border-indigo-100 rounded-2xl px-5 py-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0" style={{ fontSize: "13px", fontWeight: 700 }}>
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-800" style={{ fontSize: "14px", fontWeight: 700 }}>{s.emoji} {s.title}</div>
                    <p className="text-slate-500 mt-0.5" style={{ fontSize: "13px" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="mb-8">
            <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>💡 꿈나라 팁</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { emoji: "📈", title: "드롭 확률 증가", desc: "서버를 추천(/추천)하면 별 드롭 확률이 증가해요!" },
                { emoji: "📬", title: "우편함 확인", desc: "별은 /우편함에 저장되며 7일 후 만료돼요. 주기적으로 확인하세요." },
                { emoji: "🎣", title: "대회 참여 불가", desc: "잠수 낚시로는 낚시대회에 참여할 수 없어요." },
                { emoji: "🪑", title: "자리 비워도 OK", desc: "게임 접속 중이라면 자리를 비워도 자동으로 별이 쌓여요." },
              ].map((t) => (
                <div key={t.title} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                  <div className="text-xl mb-1.5">{t.emoji}</div>
                  <div className="text-slate-800 mb-1" style={{ fontSize: "14px", fontWeight: 700 }}>{t.title}</div>
                  <p className="text-slate-500" style={{ fontSize: "12.5px", lineHeight: 1.6 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Commands */}
          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h2 className="text-slate-700 mb-3" style={{ fontSize: "15px", fontWeight: 700 }}>📋 관련 명령어</h2>
            <div className="flex flex-wrap gap-2">
              {["/별판매", "/우편함", "/추천", "/도움말 꿈나라"].map((cmd) => (
                <code key={cmd} className="bg-white border border-slate-200 text-sky-600 rounded-lg px-3 py-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>{cmd}</code>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Tab 1: 커스텀 낚시 */}
      {tab === 1 && (
        <div>
          {/* Hero card */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute right-6 top-6 text-7xl opacity-20">🎣</div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-3">
                <span style={{ fontSize: "12px", fontWeight: 500 }}>총 63종의 물고기</span>
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>커스텀 낚시</h2>
              <p style={{ fontSize: "14px", lineHeight: 1.7, opacity: 0.9 }}>
                미니게임 방식으로 진행되는 낚시 콘텐츠.<br />
                물고기 길이와 등급에 따라 판매 가격이 달라져요!
              </p>
            </div>
          </div>

          {/* Basic info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { emoji: "🐟", title: "물고기 종류", value: "63종", desc: "길이와 등급에 따라 가격 차이" },
              { emoji: "🎮", title: "미니게임", value: "희귀 이상", desc: "일정 등급부터 미니게임 발동" },
              { emoji: "💰", title: "판매처", value: "/낚시터", desc: "물고기 상인에게 판매" },
            ].map((c) => (
              <div key={c.title} className="bg-white border border-cyan-100 rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">{c.emoji}</div>
                <div className="text-slate-800" style={{ fontSize: "16px", fontWeight: 800 }}>{c.value}</div>
                <div className="text-slate-700 mb-1" style={{ fontSize: "13px", fontWeight: 600 }}>{c.title}</div>
                <div className="text-slate-400" style={{ fontSize: "12px" }}>{c.desc}</div>
              </div>
            ))}
          </div>

          {/* Grade table */}
          <section className="mb-8">
            <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>🏆 물고기 등급</h2>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              {fishGrades.map((g, i) => (
                <div key={g.grade} className={`flex items-center gap-4 px-5 py-4 ${i < fishGrades.length - 1 ? "border-b border-slate-50" : ""}`}>
                  <span className={`rounded-full px-3 py-1 flex-shrink-0 ${g.color}`} style={{ fontSize: "12px", fontWeight: 700 }}>{g.grade}</span>
                  <div className="flex-1">
                    <span className="text-slate-600" style={{ fontSize: "13.5px" }}>{g.desc}</span>
                  </div>
                  {g.minigame && (
                    <span className="bg-blue-50 text-blue-500 rounded-full px-2.5 py-0.5" style={{ fontSize: "11px", fontWeight: 600 }}>🎮 미니게임</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Sea shell */}
          <section className="mb-8">
            <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>🐚 바다 조개</h2>
            <div className="bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl p-6">
              <p className="text-slate-600 mb-4" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                낚시 중 일정 확률로 바다 조개가 등장해요.<br />
                바다 조개를 열면 <strong className="text-cyan-600">파도의 결정</strong>을 획득할 수 있어요!
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((lv) => (
                  <div key={lv} className="bg-white rounded-xl px-4 py-3 flex items-center gap-2 border border-sky-100">
                    <span className="text-sky-400" style={{ fontSize: "13px" }}>🌊</span>
                    <div>
                      <div className="text-slate-700" style={{ fontSize: "13px", fontWeight: 600 }}>{lv}단계 돌파</div>
                      <div className="text-sky-600" style={{ fontSize: "12px", fontWeight: 700 }}>결정 ×{lv}개</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 mt-3" style={{ fontSize: "12px" }}>
                💡 파도의 결정 최대 판매가: <strong className="text-cyan-600">{fmt(50000)}원</strong> / 개
              </p>
            </div>
          </section>

          {/* 낚시대회 */}
          <section className="mb-8">
            <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>🏅 낚시대회</h2>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-slate-700 mb-2" style={{ fontSize: "15px", fontWeight: 700 }}>🎯 참가 방법</h3>
                  <ul className="space-y-1.5 text-slate-600" style={{ fontSize: "13px" }}>
                    <li>1. 낚시대회 시작 안내를 확인해요</li>
                    <li>2. 진행 중 가장 비싼 물고기를 낚아요</li>
                    <li>3. 대회 종료 후 순위를 확인해요</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-slate-700 mb-2" style={{ fontSize: "15px", fontWeight: 700 }}>🏆 보상</h3>
                  <div className="space-y-1.5">
                    {["🥇 1등", "🥈 2등", "🥉 3등"].map((rank) => (
                      <div key={rank} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-amber-100">
                        <span className="text-slate-700" style={{ fontSize: "13px", fontWeight: 600 }}>{rank}</span>
                        <span className="text-amber-600" style={{ fontSize: "13px", fontWeight: 700 }}>5,000 크리스탈 쿠폰</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-400 mt-3" style={{ fontSize: "12px" }}>⚠️ 잠수 낚시로는 낚시대회에 참여되지 않아요</p>
            </div>
          </section>

          {/* Commands */}
          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h2 className="text-slate-700 mb-3" style={{ fontSize: "15px", fontWeight: 700 }}>📋 관련 명령어</h2>
            <div className="flex flex-wrap gap-2">
              {["/낚시터", "/낚시함", "/도움말 낚시", "/도움말 낚시대회"].map((cmd) => (
                <code key={cmd} className="bg-white border border-slate-200 text-sky-600 rounded-lg px-3 py-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>{cmd}</code>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

const fishGrades = customFishGrades;
