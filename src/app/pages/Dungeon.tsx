export function Dungeon() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-slate-500" style={{ fontSize: "13px", fontWeight: 600 }}>개발중</span>
        </div>

        <div className="text-8xl mb-6">⚔️</div>

        <h1 className="text-slate-800 mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, lineHeight: 1.2 }}>
          던전
        </h1>
        <p className="text-slate-500 mb-8" style={{ fontSize: "16px", lineHeight: 1.7 }}>
          강력한 몹과 전투하며 능력을 성장시키는 던전 콘텐츠가<br />
          곧 플레이팜3에 추가될 예정이에요!
        </p>
      </div>

      {/* Planned features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 wiki-section text-left">
        {[
          { emoji: "👹", title: "강력한 보스", desc: "플레이어의 실력을 시험하는 강력한 보스가 등장할 예정이에요." },
          { emoji: "⚔️", title: "전투 시스템", desc: "다양한 무기와 스킬로 전투를 즐길 수 있는 시스템이 준비중이에요." },
          { emoji: "🎁", title: "특별 보상", desc: "던전 클리어 시 다른 곳에서 얻을 수 없는 특별 아이템을 획득해요." },
          { emoji: "👥", title: "파티 플레이", desc: "친구들과 함께 파티를 구성해서 던전에 도전할 수 있어요." },
        ].map((f) => (
          <div key={f.title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="text-2xl mb-2">{f.emoji}</div>
            <div className="text-slate-700 mb-1" style={{ fontSize: "14px", fontWeight: 700 }}>{f.title}</div>
            <p className="text-slate-400" style={{ fontSize: "12.5px", lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <div className="text-3xl mb-3">🔔</div>
        <p className="text-amber-700" style={{ fontSize: "14px", lineHeight: 1.7 }}>
          던전 오픈 소식은 공식 카페와 디스코드에서<br />
          가장 먼저 확인하실 수 있어요!
        </p>
      </div>
    </div>
  );
}