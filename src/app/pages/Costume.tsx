import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

const grades = [
  { name: "일반", color: "bg-slate-100 text-slate-600 border-slate-200" },
  { name: "고급", color: "bg-green-100 text-green-700 border-green-200" },
  { name: "희귀", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { name: "영웅", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { name: "전설", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { name: "레전드+", color: "bg-rose-100 text-rose-700 border-rose-200" },
];

export function Costume() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/lifestyle" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-purple-600 mb-8 transition-colors" style={{ fontSize: "13px", fontWeight: 500 }}>
        <ChevronLeft className="w-4 h-4" /> 꾸미기 목록으로
      </Link>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-4 py-1.5 mb-4">
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#7c3aed" }}>👗 치장 시스템</span>
        </div>
        <h1 className="text-slate-800 mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>치장 아이템</h1>
        <p className="text-slate-500" style={{ fontSize: "15px", lineHeight: 1.7 }}>다양한 치장 아이템으로 나만의 스타일을 표현해보세요</p>
      </div>

      {/* How to equip */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>👗 치장 아이템 장착 방법</h2>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="space-y-3">
            {[
              { step: 1, text: "치장 아이템을 손에 들고 우클릭하면 치장으로 등록돼요" },
              { step: 2, text: "/치장 명령어를 입력해 등록된 치장 아이템을 장착해요" },
              { step: 3, text: "형상의 가위를 들고 쉬프트+우클릭으로 아이템화할 수 있어요" },
              { step: 4, text: "형상의 가위는 /교환상점에서 추천 코인으로 구매 가능해요" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center flex-shrink-0" style={{ fontSize: "12px", fontWeight: 700 }}>{s.step}</span>
                <span className="text-slate-600" style={{ fontSize: "13.5px" }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dye system */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>🎨 염색 시스템</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-purple-100 rounded-2xl p-5">
            <h3 className="text-slate-700 mb-3" style={{ fontSize: "15px", fontWeight: 700 }}>염색 방법</h3>
            <ul className="space-y-2 text-slate-600" style={{ fontSize: "13px" }}>
              <li>• 아이템마다 염색 가능 여부가 달라요</li>
              <li>• 미염색 시 기본 색상으로 표시돼요</li>
              <li>• 염색약을 사용해 색상 변경 가능</li>
              <li>• 각 치장 아이템마다 염색약을 개별 사용해야 해요</li>
            </ul>
          </div>
          <div className="bg-white border border-purple-100 rounded-2xl p-5">
            <h3 className="text-slate-700 mb-3" style={{ fontSize: "15px", fontWeight: 700 }}>색상 종류</h3>
            <ul className="space-y-2 text-slate-600" style={{ fontSize: "13px" }}>
              <li>• 기본 색상 1종</li>
              <li>• 보조 색상 12종 선택 가능</li>
              <li>• 9종 색상 모두 개방 시 <strong className="text-purple-600">글린트(반짝임 효과)</strong> 적용!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Synthesis */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>🔮 치장 합성</h2>
        <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6">
          <p className="text-slate-600 mb-4" style={{ fontSize: "13.5px", lineHeight: 1.7 }}>
            같은 등급의 치장 아이템 2개를 합성하여 새로운 치장 아이템을 획득해요.<br />
            <code className="text-violet-600 bg-violet-100 rounded px-1.5 py-0.5">/합성</code> 명령어로 시작, <code className="text-violet-600 bg-violet-100 rounded px-1.5 py-0.5">/합성 보상</code>으로 확률 확인!
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { result: "등급 상승", desc: "더 높은 등급 획득", color: "bg-green-50 border-green-200 text-green-700" },
              { result: "등급 유지", desc: "같은 등급 다른 아이템", color: "bg-slate-50 border-slate-200 text-slate-600" },
              { result: "등급 하락", desc: "한 단계 낮은 등급", color: "bg-red-50 border-red-200 text-red-600" },
            ].map((r) => (
              <div key={r.result} className={`${r.color} border rounded-xl px-3 py-3 text-center`}>
                <div style={{ fontSize: "13px", fontWeight: 700 }}>{r.result}</div>
                <div style={{ fontSize: "11px", opacity: 0.8, marginTop: "2px" }}>{r.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-violet-700" style={{ fontSize: "12px" }}>
            ⚠️ 일반 등급은 하락하지 않으며, 레전드+ 등급은 상승하거나 하락하지 않아요
          </p>
        </div>
      </section>

      {/* Grades */}
      <section className="mb-10">
        <h2 className="text-slate-700 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>📊 치장 등급</h2>
        <div className="flex flex-wrap gap-2">
          {grades.map((g) => (
            <span key={g.name} className={`${g.color} border rounded-full px-4 py-1.5`} style={{ fontSize: "13px", fontWeight: 600 }}>
              {g.name}
            </span>
          ))}
        </div>
      </section>

      {/* Commands */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <h2 className="text-slate-700 mb-3" style={{ fontSize: "15px", fontWeight: 700 }}>📋 관련 명령어</h2>
        <div className="flex flex-wrap gap-2">
          {["/치장", "/합성", "/합성 보상", "/교환상점", "/도움말 치장", "/도움말 합성"].map((cmd) => (
            <code key={cmd} className="bg-white border border-slate-200 text-sky-600 rounded-lg px-3 py-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>{cmd}</code>
          ))}
        </div>
      </section>
    </div>
  );
}
