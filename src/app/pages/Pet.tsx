import { Link } from "react-router";
import { ChevronLeft, Clock } from "lucide-react";

export function Pet() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to="/lifestyle"
        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-600 mb-8 transition-colors"
        style={{ fontSize: "13px", fontWeight: 500 }}
      >
        <ChevronLeft className="w-4 h-4" /> 꾸미기 목록으로
      </Link>

      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-6">🐾</div>
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-5">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#d97706" }}>준비중</span>
        </div>
        <h1
          className="text-slate-800 mb-3"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}
        >
          펫 시스템
        </h1>
        <p className="text-slate-400" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          아직 준비중이에요.<br />
          조금만 기다려 주세요! 🌱
        </p>
      </div>
    </div>
  );
}
