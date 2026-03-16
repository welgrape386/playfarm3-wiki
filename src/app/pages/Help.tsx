import { useState, useEffect } from "react";
import { BookOpen, Search, X, ChevronDown } from "lucide-react";
import { useLocation } from "react-router";
import { commandSections, CommandItem } from "../data/commandData";

const categoryGroups = [
  { label: "명령어", ids: ["misc1", "quick", "move", "auto-plant", "stack", "warp", "menu"] },
  { label: "시스템", ids: ["awaken", "enhance", "bulk-shop", "synthesis", "lock", "elevator", "beacon"] },
  { label: "생활", ids: ["fishing", "dream-fishing", "cooking", "mining", "costume", "pet"] },
  { label: "서버", ids: ["verify", "island-invite", "grade", "title-system", "login-reward", "fatigue"] },
  { label: "이벤트", ids: ["events"] },
];

function ItemRow({ item, index }: { item: CommandItem; index: number }) {
  // ── note: 💡 amber box ──
  if (item.type === "note") {
    return (
      <div className="flex items-start gap-3 py-2 px-4 bg-amber-50 rounded-xl">
        <span className="flex-shrink-0 mt-0.5" style={{ fontSize: "14px" }}>💡</span>
        <div className="flex-1 min-w-0">
          <span className="text-amber-800" style={{ fontSize: "13.5px", fontWeight: 500 }}>
            {item.text}
          </span>
          {item.sub && (
            <span className="text-amber-600 ml-2" style={{ fontSize: "12.5px" }}>
              {item.sub}
            </span>
          )}
        </div>
      </div>
    );
  }

  // ── step: numbered amber circle ──
  if (item.type === "step") {
    return (
      <div className="flex items-start gap-3 py-2.5 px-4 rounded-xl hover:bg-amber-50/50 transition-colors">
        <span
          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"
          style={{ fontSize: "10px", fontWeight: 700 }}
        >
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <span className="text-slate-700" style={{ fontSize: "13.5px", fontWeight: 500 }}>
            {item.text}
          </span>
          {item.sub && (
            <span className="text-slate-400 ml-2" style={{ fontSize: "12.5px" }}>
              {item.sub}
            </span>
          )}
        </div>
      </div>
    );
  }

  // ── command: "i" circle in sky-blue, command text in sky-700 mono ──
  if (item.type === "command") {
    return (
      <div className="flex items-start gap-3 py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors">
        <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center" style={{ fontSize: "10px", fontWeight: 700 }}>
          i
        </span>
        <div className="flex-1 min-w-0">
          <span className="text-sky-700 font-mono" style={{ fontSize: "13.5px", fontWeight: 600 }}>
            {item.text}
          </span>
          {item.sub && (
            <span className="text-slate-400 ml-2" style={{ fontSize: "12.5px" }}>
              {item.sub}
            </span>
          )}
        </div>
      </div>
    );
  }

  // ── info: "i" circle in slate, plain text ──
  return (
    <div className="flex items-start gap-3 py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors">
      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center" style={{ fontSize: "10px", fontWeight: 700 }}>
        i
      </span>
      <div className="flex-1 min-w-0">
        <span className="text-slate-700" style={{ fontSize: "13.5px", fontWeight: 500 }}>
          {item.text}
        </span>
        {item.sub && (
          <span className="text-slate-400 ml-2" style={{ fontSize: "12.5px" }}>
            {item.sub}
          </span>
        )}
      </div>
    </div>
  );
}

export function Help() {
  const [openId, setOpenId] = useState<string | null>("misc1");
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("명령어");
  const location = useLocation();

  // 검색 결과에서 앵커로 이동 시 해당 섹션 자동 열기 + 스크롤
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) return;

    // 1) 해당 hash가 속한 탭(그룹) 찾기
    const targetGroup = categoryGroups.find((g) => g.ids.includes(hash));
    if (targetGroup) {
      setActiveGroup(targetGroup.label); // 탭 전환
    }

    // 2) 아코디언 열기
    const section = commandSections.find(s => s.id === hash);
    if (section) {
      setOpenId(hash);
      setQuery("");
    }

    // 3) 탭 전환 + 렌더링 후 스크롤 (타이밍 여유 증가)
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("wiki-highlight-flash");
        setTimeout(() => el.classList.remove("wiki-highlight-flash"), 2200);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [location.hash]);

  const groupIds = categoryGroups.find((g) => g.label === activeGroup)?.ids ?? [];

  const filtered = commandSections.filter((sec) => {
    const inGroup = groupIds.includes(sec.id);
    if (!inGroup) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      sec.title.toLowerCase().includes(q) ||
      sec.category.toLowerCase().includes(q) ||
      sec.items.some((i) => i.text.toLowerCase().includes(q) || (i.sub?.toLowerCase().includes(q) ?? false))
    );
  });

  // Global search (across all sections)
  const globalFiltered = query.trim()
    ? commandSections.filter((sec) => {
        const q = query.toLowerCase();
        return (
          sec.title.toLowerCase().includes(q) ||
          sec.category.toLowerCase().includes(q) ||
          sec.items.some((i) => i.text.toLowerCase().includes(q) || (i.sub?.toLowerCase().includes(q) ?? false))
        );
      })
    : null;

  const displaySections = globalFiltered ?? filtered;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-full px-4 py-1.5 mb-4">
          <BookOpen className="w-3.5 h-3.5 text-sky-500" />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#0284c7" }}>도움말 · 명령어</span>
        </div>
        <h1
          className="text-slate-800 mb-2"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, lineHeight: 1.2 }}
        >
          도움말 & 명령어
        </h1>
        <p className="text-slate-500" style={{ fontSize: "15px" }}>
          서버의 모든 명령어와 시스템 가이드를 확인하세요
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="명령어, 기능 검색... (예: 낚시, /귓, 강화)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl border-2 border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-0 transition-all"
            style={{ fontSize: "14px" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category tabs (hidden when searching globally) */}
      {!query.trim() && (
        <div className="flex gap-2 flex-wrap mb-6">
          {categoryGroups.map((g) => (
            <button
              key={g.label}
              onClick={() => setActiveGroup(g.label)}
              className={`px-4 py-2 rounded-xl transition-all duration-150 ${
                activeGroup === g.label
                  ? "bg-sky-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              style={{ fontSize: "13.5px", fontWeight: 600 }}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      {query.trim() && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-slate-500" style={{ fontSize: "13px" }}>
            전체 검색 결과
          </span>
          <span className="bg-sky-100 text-sky-600 rounded-full px-2.5 py-0.5" style={{ fontSize: "11px", fontWeight: 600 }}>
            {displaySections.length}개
          </span>
        </div>
      )}

      {/* Accordion sections */}
      <div className="space-y-3">
        {displaySections.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400" style={{ fontSize: "14px" }}>
              "{query}"에 해당하는 항목이 없어요
            </p>
          </div>
        ) : (
          displaySections.map((sec) => {
            const isOpen = openId === sec.id;
            let stepIndex = 0;
            return (
              <div
                key={sec.id}
                id={sec.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen ? "border-sky-200 shadow-md" : "border-slate-100 hover:border-slate-200 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : sec.id)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left"
                >
                  <span className="text-xl flex-shrink-0">{sec.emoji}</span>
                  <span className="text-slate-800 flex-1" style={{ fontSize: "15px", fontWeight: 700 }}>
                    {sec.title}
                  </span>
                  <span
                    className="bg-slate-100 text-slate-500 rounded-full px-2.5 py-0.5 flex-shrink-0"
                    style={{ fontSize: "10.5px", fontWeight: 600 }}
                  >
                    {sec.category}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-2 pb-4">
                    <div className="h-px bg-slate-100 mx-3 mb-3" />
                    <div className="space-y-0.5">
                      {sec.items.map((item, idx) => {
                        if (item.type === "step") {
                          const stepI = stepIndex;
                          stepIndex++;
                          return <ItemRow key={idx} item={item} index={stepI} />;
                        }
                        return <ItemRow key={idx} item={item} index={idx} />;
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}