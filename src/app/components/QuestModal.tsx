import { useEffect } from "react";
import { X } from "lucide-react";
import { GuideQuest } from "../data/guideQuests";

export function QuestModal({ quest, onClose }: { quest: GuideQuest; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200 px-6 py-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0 text-xl">
            {quest.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="bg-amber-200 text-amber-700 rounded-full px-2 py-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>
                STEP {quest.step}
              </span>
            </div>
            <h3 className="text-slate-800" style={{ fontSize: "18px", fontWeight: 800 }}>{quest.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white transition-all flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Steps */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-slate-800" style={{ fontSize: "13px", fontWeight: 700 }}>📋 진행 방법</span>
            </div>
            <ol className="space-y-2">
              {quest.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>
                    {i + 1}
                  </span>
                  <span className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.6 }}>
                    {step.startsWith("/") ? (
                      <code className="bg-slate-100 text-sky-600 rounded px-1.5 py-0.5" style={{ fontSize: "12px" }}>{step}</code>
                    ) : step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {quest.tips.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <span style={{ fontSize: "12px" }}>💡</span>
                <span className="text-amber-700" style={{ fontSize: "12px", fontWeight: 700 }}>팁</span>
              </div>
              <ul className="space-y-1.5">
                {quest.tips.map((tip, i) => (
                  <li key={i} className="text-amber-800 flex items-start gap-2" style={{ fontSize: "12px", lineHeight: 1.6 }}>
                    <span className="text-amber-400 flex-shrink-0 mt-0.5">·</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rewards */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-slate-800" style={{ fontSize: "13px", fontWeight: 700 }}>🎁 보상</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quest.rewards.map((r, i) => (
                <span key={i} className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-3 py-1.5" style={{ fontSize: "12px", fontWeight: 600 }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
