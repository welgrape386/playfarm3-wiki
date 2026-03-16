import { Link } from "react-router";
import { Sprout, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white" style={{ fontSize: "15px", fontWeight: 700 }}>
                  플레이팜3 비공식 위키
                </div>
                <div className="text-slate-500" style={{ fontSize: "11px" }}>
                  유저 제작 · 비공식 팬 위키
                </div>
              </div>
            </div>
            <p className="text-slate-500 max-w-xs" style={{ fontSize: "13px", lineHeight: 1.8 }}>
              플레이팜3 서버의 모든 정보를 한 곳에서 확인하세요.
            </p>
            <div className="flex items-center gap-2 mt-4 bg-slate-800 rounded-xl px-3 py-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-slate-300" style={{ fontSize: "12px", fontWeight: 500 }}>
                서버 운영중
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex gap-12">
            <div>
              <div className="text-slate-300 mb-3" style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                페이지
              </div>
              <ul className="space-y-2">
                {[
                  { label: "홈", href: "/" },
                  { label: "콘텐츠", href: "/content" },
                  { label: "도움말", href: "/help" },
                  { label: "판매계산", href: "/calculator" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-slate-500 hover:text-sky-400 transition-colors"
                      style={{ fontSize: "13px" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-800 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-slate-600" style={{ fontSize: "12px" }}>
            © 2026 플레이팜3 비공식 위키. 팬 제작 비공식 사이트입니다.
          </span>
          <div className="flex items-center gap-1.5 text-slate-600" style={{ fontSize: "12px" }}>
            <span>플레이팜3 유저들을 위해 제작되었어요</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}