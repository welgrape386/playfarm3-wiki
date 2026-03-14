import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, Star } from "lucide-react";
import { allGuideQuests, GuideQuest } from "../data/guideQuests";
import { QuestModal } from "../components/QuestModal";

export function Guide() {
  const [selectedQuest, setSelectedQuest] = useState<GuideQuest | null>(null);

  return (
    <>
      {selectedQuest && (
        <QuestModal quest={selectedQuest} onClose={() => setSelectedQuest(null)} />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-600 mb-8 transition-colors"
          style={{ fontSize: "13px", fontWeight: 500 }}
        >
          <ChevronLeft className="w-4 h-4" /> 홈으로
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-4">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-300" />
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#d97706" }}>초보자 가이드</span>
          </div>
          <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>
            가이드 퀘스트 전체 목록
          </h1>
          <p className="text-slate-500" style={{ fontSize: "15px" }}>
            총 22개의 퀘스트를 순서대로 완료하며 플레이팜3를 즐겨보세요!
          </p>

          {/* 안내 박스 */}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 space-y-2">
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-0.5">📦</span>
              <p className="text-amber-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                <span style={{ fontWeight: 700 }}>다음 퀘스트에 필요한 재료는 이전 퀘스트 클리어 시 받은 아이템으로 진행</span>합니다.
                퀘스트를 순서대로 완료하면 별도로 재료를 구하지 않아도 자연스럽게 이어져요.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-0.5">⚠️</span>
              <p className="text-amber-700" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                보상 아이템이 인벤토리에 들어오지 않은 경우,{" "}
                <code className="bg-amber-100 text-amber-800 rounded px-1.5 py-0.5" style={{ fontSize: "12px" }}>/업적</code>
                {" "}명령어를 입력해 퀘스트 달성 내역을 확인하고 수동으로 수령하세요.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-0.5">💡</span>
              <p className="text-amber-600" style={{ fontSize: "12px", lineHeight: 1.6 }}>
                퀘스트 카드를 클릭하면 진행 방법, 팁, 보상을 자세히 확인할 수 있어요.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allGuideQuests.map((q) => (
            <button
              key={q.step}
              onClick={() => setSelectedQuest(q)}
              className={`bg-white border rounded-2xl px-5 py-4 flex items-start gap-3 hover:shadow-md transition-all text-left group ${
                q.step === 22
                  ? "border-amber-200 bg-amber-50/40 hover:border-amber-400"
                  : "border-slate-100 hover:border-amber-300"
              }`}
            >
              {/* Step Badge */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                  q.step === 22
                    ? "bg-amber-400 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-600"
                }`}
                style={{ fontSize: "12px", fontWeight: 700 }}
              >
                {q.step === 22 ? "🌟" : q.step}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-slate-800 group-hover:text-amber-700 transition-colors"
                    style={{ fontSize: "14px", fontWeight: 700 }}
                  >
                    {q.emoji} {q.title}
                  </span>
                </div>
                <p className="text-slate-500 mt-0.5" style={{ fontSize: "12.5px", lineHeight: 1.5 }}>
                  {q.desc}
                </p>
                {/* Reward preview */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {q.rewards.slice(0, 2).map((r, i) => (
                    <span
                      key={i}
                      className="bg-green-50 text-green-600 rounded-full px-2 py-0.5"
                      style={{ fontSize: "10px", fontWeight: 600 }}
                    >
                      🎁 {r}
                    </span>
                  ))}
                  {q.rewards.length > 2 && (
                    <span className="text-slate-400" style={{ fontSize: "10px" }}>
                      +{q.rewards.length - 2}개
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow hint */}
              <div className="flex-shrink-0 mt-1 text-slate-300 group-hover:text-amber-400 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}