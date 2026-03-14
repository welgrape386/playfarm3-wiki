import { useNavigate } from "react-router";

const lifestyleCards = [
  {
    emoji: "🏝️",
    title: "섬 꾸미기",
    desc: "나만의 섬을 자유롭게 꾸며보세요. 가구, 워프, 방문 표지판 등 다양한 기능으로 개성있는 섬을 만들어보세요.",
    href: "/lifestyle/island",
    color: "from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-300",
    badge: "bg-teal-100 text-teal-700",
    tags: ["가구", "워프", "섬원 초대"],
  },
  {
    emoji: "👗",
    title: "치장 아이템",
    desc: "다양한 치장 아이템으로 캐릭터를 꾸며보세요. 염색 시스템과 합성으로 더 희귀한 치장을 획득할 수 있어요.",
    href: "/lifestyle/costume",
    color: "from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300",
    badge: "bg-purple-100 text-purple-700",
    tags: ["염색", "합성", "등급"],
  },
  {
    emoji: "🐾",
    title: "펫 시스템",
    desc: "귀여운 펫을 수집하고 소환하여 함께 모험해요. 먹이를 주면 성장하고 새로운 기능이 해금돼요.",
    href: "/lifestyle/pet",
    color: "from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300",
    badge: "bg-amber-100 text-amber-700",
    tags: ["수집", "성장", "동반자"],
  },
];

export function Lifestyle() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 mb-4">
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#7c3aed" }}>✨ 꾸미기 콘텐츠</span>
        </div>
        <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>
          섬 · 치장 · 펫
        </h1>
        <p className="text-slate-500" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          나만의 개성을 표현하는 다양한 꾸미기 콘텐츠를 즐겨보세요
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {lifestyleCards.map((card) => (
          <button
            key={card.title}
            onClick={() => navigate(card.href)}
            className={`bg-gradient-to-br ${card.color} border rounded-3xl p-7 text-left hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group w-full`}
          >
            <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-200">
              {card.emoji}
            </div>
            <h2 className="text-slate-800 mb-2" style={{ fontSize: "20px", fontWeight: 800 }}>
              {card.title}
            </h2>
            <p className="text-slate-500 mb-5" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              {card.desc}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {card.tags.map((tag) => (
                <span key={tag} className={`${card.badge} rounded-full px-2.5 py-0.5`} style={{ fontSize: "11px", fontWeight: 600 }}>
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-600 transition-colors" style={{ fontSize: "13px", fontWeight: 600 }}>
              자세히 보기 →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
