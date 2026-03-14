import { useState, useEffect } from "react";
import { X } from "lucide-react";
import islandImg from "figma:asset/8bb957ea6efb20ba9ce11fc56982193b938c42b2.png";

type Step = "notice" | "island";

export function WelcomePopup() {
  const [step, setStep] = useState<Step | null>(null);
  const [dontShowToday, setDontShowToday] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("popup_hidden_until");
    if (stored) {
      const hiddenUntil = new Date(stored);
      if (new Date() < hiddenUntil) return;
    }
    const timer = setTimeout(() => setStep("notice"), 400);
    return () => clearTimeout(timer);
  }, []);

  const saveDontShowToday = () => {
    if (dontShowToday) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      localStorage.setItem("popup_hidden_until", tomorrow.toISOString());
    }
  };

  const handleNoticeNext = () => {
    setStep("island");
  };

  const handleClose = () => {
    saveDontShowToday();
    setStep(null);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText("/섬 추천 청포도").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!step) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* ── 팝업 1: 비공식 위키 안내 ── */}
      {step === "notice" && (
        <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-white">
          {/* 닫기 */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>

          {/* 헤더 */}
          <div className="px-6 pt-7 pb-4 text-center">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-slate-800" style={{ fontSize: "17px", fontWeight: 700 }}>
              비공식 위키 안내
            </p>
          </div>

          {/* 본문 */}
          <div className="px-6 pb-5">
            <div
              className="rounded-xl p-4 mb-4"
              style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
            >
              <p className="text-slate-600 leading-relaxed" style={{ fontSize: "13px" }}>
                이 사이트는 플레이팜3의{" "}
                <strong className="text-slate-800">공식 위키가 아닌 비공식 팬 위키</strong>
                입니다.
                <br />
                <br />
                공식 서버 운영진과 무관하며, 유저가 자체적으로 제작한 정보 안내 사이트입니다.
                정보의 정확성은 보장되지 않을 수 있으니 참고용으로 이용해 주세요.
              </p>
            </div>

            {/* 오늘 보지 않기 */}
            <label className="flex items-center gap-2 cursor-pointer select-none mb-4">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-500"
              />
              <span className="text-slate-400" style={{ fontSize: "12px" }}>
                오늘 하루 보지 않기
              </span>
            </label>

            {/* 버튼 */}
            <button
              onClick={handleNoticeNext}
              className="w-full py-2.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
                fontSize: "14px",
                fontWeight: 700,
                boxShadow: "0 2px 10px rgba(59,130,246,0.35)",
              }}
            >
              확인했어요 →
            </button>
          </div>
        </div>
      )}

      {/* ── 팝업 2: 청포도 섬 홍보 ── */}
      {step === "island" && (
        <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-white">
          {/* 닫기 */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>

          {/* 이미지 */}
          <div>
            <img
              src={islandImg}
              alt="청포도 섬"
              className="w-full object-cover"
              style={{ maxHeight: "280px", objectPosition: "center" }}
            />
          </div>

          {/* 본문 */}
          <div className="px-6 py-5">
            <p className="text-slate-800 mb-1" style={{ fontSize: "16px", fontWeight: 700 }}>
              🍇 청포도 섬을 추천해 주세요!
            </p>
            <p className="text-slate-500 leading-relaxed mb-4" style={{ fontSize: "13px" }}>
              이 위키가 유용하셨다면, 게임 내에서{" "}
              <strong className="text-slate-700">/섬 추천 청포도</strong> 명령어로
              청포도 섬을 추천해 주세요! 😊
              <br />
              여러분의 추천이 큰 힘이 됩니다 🙏
            </p>

            {/* 명령어 박스 */}
            <div
              className="flex items-center justify-between rounded-xl px-4 py-3 mb-4"
              style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
            >
              <code className="text-green-700" style={{ fontSize: "14px", fontWeight: 700 }}>
                /섬 추천 청포도
              </code>
              <button
                onClick={handleCopy}
                className="text-green-600 hover:text-green-800 transition-colors"
                style={{ fontSize: "12px", fontWeight: 600 }}
              >
                {copied ? "✅ 복사됨!" : "복사"}
              </button>
            </div>

            {/* 오늘 보지 않기 */}
            <label className="flex items-center gap-2 cursor-pointer select-none mb-4">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="w-4 h-4 rounded accent-green-500"
              />
              <span className="text-slate-400" style={{ fontSize: "12px" }}>
                오늘 하루 보지 않기
              </span>
            </label>

            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #5a9e3a 0%, #7bc95a 100%)",
                fontSize: "14px",
                fontWeight: 700,
                color: "#fff",
                boxShadow: "0 2px 10px rgba(90,158,58,0.35)",
              }}
            >
              🍇 알겠어요, 추천할게요!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
