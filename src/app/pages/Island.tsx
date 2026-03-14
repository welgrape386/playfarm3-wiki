import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

export function Island() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/lifestyle" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-teal-600 mb-8 transition-colors" style={{ fontSize: "13px", fontWeight: 500 }}>
        <ChevronLeft className="w-4 h-4" /> 꾸미기 목록으로
      </Link>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-4">
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#0d9488" }}>🏝️ 섬 꾸미기</span>
        </div>
        <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>섬 꾸미기</h1>
        <p className="text-slate-500" style={{ fontSize: "15px", lineHeight: 1.7 }}>나만의 섬을 자유롭게 꾸미고 친구들을 초대해보세요</p>
      </div>

      {/* Island basics */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>🏝️ 섬 기본 기능</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { emoji: "🔧", title: "섬 개설", desc: "/섬 명령어로 나만의 섬을 개설해요. 개설 후 자유롭게 건축하고 꾸밀 수 있어요." },
            { emoji: "👥", title: "섬원 초대", desc: "/섬 초대 닉네임으로 최대 N명까지 섬원을 초대할 수 있어요. 섬원 권한은 /섬 권한으로 설정." },
            { emoji: "🌀", title: "워프 설정", desc: "섬 내에 워프 포인트를 설정해 빠르게 이동해요. 기본 3개, 업그레이드 시 최대 6개." },
            { emoji: "🚪", title: "방문 표지판", desc: "표지판 첫째줄에 [WELCOME]을 입력해 방문 표지판을 만들어보세요." },
            { emoji: "🔒", title: "블록 잠금", desc: "표지판에 [잠금]을 입력해 소중한 블록을 보호해요. [공용]으로 공용 설정도 가능." },
            { emoji: "🛗", title: "엘리베이터", desc: "유리를 위아래로 설치하면 점프-올라가기, 웅크리기-내려가기 엘리베이터 완성!" },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-teal-100 rounded-2xl p-5 hover:shadow-sm transition-shadow">
              <div className="text-2xl mb-2">{f.emoji}</div>
              <div className="text-slate-800 mb-1" style={{ fontSize: "14px", fontWeight: 700 }}>{f.title}</div>
              <p className="text-slate-500" style={{ fontSize: "13px", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Warp details */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>🌀 워프 명령어</h2>
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          {[
            { cmd: "/섬 워프생성 [워프이름]", desc: "현재 위치에 워프를 생성해요" },
            { cmd: "/섬 워프삭제 [워프]", desc: "워프를 삭제해요" },
            { cmd: "/섬 워프목록", desc: "본인 섬의 워프를 확인하고 상세 설정해요" },
          ].map((c, i, arr) => (
            <div key={c.cmd} className={`flex items-center gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-slate-50" : ""}`}>
              <code className="text-sky-600 bg-sky-50 rounded-lg px-3 py-1.5 flex-shrink-0" style={{ fontSize: "13px", fontWeight: 600 }}>{c.cmd}</code>
              <span className="text-slate-500" style={{ fontSize: "13px" }}>{c.desc}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-400 mt-2 ml-1" style={{ fontSize: "12px" }}>
          ℹ️ 기본 최대 3개, 업그레이드 시 최대 6개까지 생성 가능
        </p>
      </section>

      {/* Beacon */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>📡 신호기 설치 가이드</h2>
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-6">
          <p className="text-slate-600 mb-4" style={{ fontSize: "13.5px", lineHeight: 1.7 }}>
            신호기를 맨 위 중앙에 설치하고, 아래에 피라미드 형태로 블록을 쌓아요.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: "1단", size: "3×3", blocks: 9 },
              { label: "2단", size: "5×5", blocks: 25 },
              { label: "3단", size: "7×7", blocks: 49 },
              { label: "4단", size: "9×9", blocks: 81 },
            ].map((d) => (
              <div key={d.label} className="bg-white border border-sky-100 rounded-xl px-3 py-3 text-center">
                <div className="text-sky-600" style={{ fontSize: "15px", fontWeight: 800 }}>{d.label}</div>
                <div className="text-slate-700" style={{ fontSize: "13px", fontWeight: 600 }}>{d.size}</div>
                <div className="text-slate-400" style={{ fontSize: "11px" }}>{d.blocks}블록</div>
              </div>
            ))}
          </div>
          <p className="text-sky-700" style={{ fontSize: "12.5px" }}>
            💡 철, 금, 에메랄드, 다이아몬드 블록 사용 가능. 신호기 위쪽이 하늘까지 막혀 있으면 안돼요.
          </p>
        </div>
      </section>

      {/* Commands */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <h2 className="text-slate-700 mb-3" style={{ fontSize: "15px", fontWeight: 700 }}>📋 관련 명령어</h2>
        <div className="flex flex-wrap gap-2">
          {["/섬 이동", "/섬 초대 닉네임", "/섬 권한", "/섬 워프생성", "/도움말 섬", "/도움말 워프", "/도움말 잠금"].map((cmd) => (
            <code key={cmd} className="bg-white border border-slate-200 text-sky-600 rounded-lg px-3 py-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>{cmd}</code>
          ))}
        </div>
      </section>
    </div>
  );
}
