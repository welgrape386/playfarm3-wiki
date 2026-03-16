import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Search, X, ChevronRight, Clock, Bell, Star, ChevronDown,
  MessageSquare,
} from "lucide-react";
import { wikiContent, WikiItem } from "../data/wikiContent";
import { allGuideQuests, GuideQuest } from "../data/guideQuests";
import { QuestModal } from "../components/QuestModal";

// ─── Search ───────────────────────────────────────────────────────────────────
function useSearch(query: string): WikiItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return wikiContent.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );
}

// 검색어 주변 텍스트 스니펫 추출
function getSnippet(text: string, query: string, pad = 30): string {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return text.slice(0, 80) + (text.length > 80 ? "…" : "");
  const start = Math.max(0, idx - pad);
  const end = Math.min(text.length, idx + query.length + pad);
  return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}

// 검색어 하이라이트
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark style={{ background: "#fef08a", color: "#78350f", borderRadius: "3px", padding: "0 2px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const results = useSearch(query);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSelect = (item: WikiItem) => {
    const path = item.anchor ? `${item.route}#${item.anchor}` : item.route;
    navigate(path);
    setQuery("");
    setFocused(false);
  };

  const showResults = focused && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div
        className={`flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 transition-all duration-200 ${
          focused
            ? "border-2 border-sky-400 shadow-lg shadow-sky-100"
            : "border-2 border-slate-200 shadow-md hover:border-slate-300"
        }`}
      >
        <Search className={`w-5 h-5 flex-shrink-0 transition-colors ${focused ? "text-sky-500" : "text-slate-400"}`} />
        <input
          ref={inputRef}
          type="text"
          placeholder="명령어, 시세, 요리, 낚시, 알바 등 전체 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 outline-none"
          style={{ fontSize: "15px" }}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-40 max-h-[420px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <div className="text-2xl mb-2">🔍</div>
              <p className="text-slate-400" style={{ fontSize: "14px" }}>
                "<span className="text-slate-600">{query}</span>"에 대한 결과가 없어요
              </p>
            </div>
          ) : (
            <div>
              <div className="px-4 py-2.5 border-b border-slate-50 flex items-center justify-between">
                <span className="text-slate-400" style={{ fontSize: "12px", fontWeight: 500 }}>
                  검색 결과
                </span>
                <span className="bg-sky-100 text-sky-600 rounded-full px-2 py-0.5" style={{ fontSize: "11px", fontWeight: 700 }}>
                  {results.length}개
                </span>
              </div>
              {results.map((item) => {
                const snippet = getSnippet(item.content, query);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-sky-50 transition-colors text-left border-b border-slate-50 last:border-0"
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{item.categoryEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-slate-800" style={{ fontSize: "14px", fontWeight: 600 }}>
                          <Highlight text={item.title} query={query} />
                        </span>
                        <span className="bg-sky-100 text-sky-600 rounded-full px-2 py-0.5 flex-shrink-0" style={{ fontSize: "10px", fontWeight: 600 }}>
                          {item.category}
                        </span>
                        {item.anchor && (
                          <span className="bg-amber-50 text-amber-600 rounded-full px-2 py-0.5 flex-shrink-0" style={{ fontSize: "10px", fontWeight: 600 }}>
                            해당 위치로 이동
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400" style={{ fontSize: "12px", lineHeight: 1.5 }}>
                        <Highlight text={snippet} query={query} />
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Guide Quest ──────────────────────────────────────────────────────────────
function GuideSection() {
  const navigate = useNavigate();
  const shown = allGuideQuests.slice(0, 5);
  const [selectedQuest, setSelectedQuest] = useState<GuideQuest | null>(null);

  return (
    <>
      {selectedQuest && (
        <QuestModal quest={selectedQuest} onClose={() => setSelectedQuest(null)} />
      )}
      <section className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-300" />
            <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>초보자 가이드 퀘스트</span>
            <span className="bg-amber-200 text-amber-700 rounded-full px-2.5 py-0.5" style={{ fontSize: "11px", fontWeight: 600 }}>총 22개</span>
          </div>
          <span className="text-amber-500" style={{ fontSize: "11px" }}>클릭해서 상세 보기</span>
        </div>
        <div className="px-5 pb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {shown.map((q) => (
              <button
                key={q.step}
                onClick={() => setSelectedQuest(q)}
                className="bg-white/70 hover:bg-white rounded-xl px-3 py-3 flex items-start gap-2.5 border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all text-left group"
              >
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-200 transition-colors" style={{ fontSize: "10px", fontWeight: 700 }}>
                  {q.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-slate-700 group-hover:text-amber-700 transition-colors" style={{ fontSize: "13px", fontWeight: 600 }}>{q.emoji} {q.title}</div>
                  <p className="text-slate-400 mt-0.5" style={{ fontSize: "11px", lineHeight: 1.5 }}>{q.desc}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="bg-green-50 text-green-600 rounded-full px-1.5 py-0.5" style={{ fontSize: "10px", fontWeight: 600 }}>🎁 {q.rewards[0]}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => navigate("/guide")}
          className="w-full flex items-center justify-center gap-2 py-3.5 border-t border-amber-200 text-amber-600 hover:bg-amber-100/50 transition-colors"
          style={{ fontSize: "13px", fontWeight: 600 }}
        >
          <ChevronDown className="w-4 h-4" />
          전체 22개 가이드 퀘스트 보기
        </button>
      </section>
    </>
  );
}

// ─── Events ───────────────────────────────────────────────────────────────────
function pad(n: number) { return String(n).padStart(2, "0"); }

type EventEntry = {
  name: string;
  emoji: string;
  hour: number;
  minute: number;
  duration: number;
  desc: string;
  tip: string;
  color: "blue" | "green" | "purple" | "amber" | "rose";
  weekendOnly?: boolean;
};

const allEvents: EventEntry[] = [
  {
    name: "낚시 대회", emoji: "🎣", hour: 20, minute: 0, duration: 60,
    desc: "가장 비싼 물고기를 낚아 상위 입상자에게 보상!", tip: "잠수 낚시는 대회 미참여예요",
    color: "blue",
  },
  {
    name: "전체지급", emoji: "🎁", hour: 21, minute: 0, duration: 5,
    desc: "우편함으로 보상이 즉시 지급돼요!", tip: "로그인 상태라면 자동 수령",
    color: "amber",
  },
  {
    name: "신의 축복", emoji: "✨", hour: 21, minute: 0, duration: 60,
    desc: "21:00~22:00 신의 축복 버프가 적용돼요!", tip: "작물 성장 속도 · 낚시 확률 UP",
    color: "purple",
  },
  {
    name: "생존자 이벤트", emoji: "🛡️", hour: 1, minute: 0, duration: 10,
    desc: "전체채팅에 '살아있다'를 입력하면 보상!", tip: "우편함에서 보상 확인",
    color: "green",
  },
  {
    name: "신호기 추첨", emoji: "🎰", hour: 1, minute: 0, duration: 5,
    desc: "자동 추첨으로 당첨자에게 보상 지급!", tip: "/신호기 명령어로 참여",
    color: "rose",
  },
  {
    name: "생존자 이벤트", emoji: "🛡️", hour: 13, minute: 0, duration: 10,
    desc: "전체채팅에 '살아있다'를 입력하면 보상!", tip: "주말에만 진행돼요",
    color: "green",
    weekendOnly: true,
  },
  {
    name: "신호기 추첨 (주말)", emoji: "🎰", hour: 21, minute: 0, duration: 5,
    desc: "주말 신호기 추첨! 당첨되면 특별 보상!", tip: "주말 추가 추첨이에요",
    color: "rose",
    weekendOnly: true,
  },
];

const colorMap: Record<string, { live: string; badge: string; upcoming: string; dot: string }> = {
  blue:   { live: "bg-blue-50 border-blue-200",   badge: "bg-blue-100 text-blue-700",   upcoming: "bg-blue-50/50 border-blue-100",   dot: "bg-blue-400" },
  green:  { live: "bg-green-50 border-green-200", badge: "bg-green-100 text-green-700", upcoming: "bg-green-50/50 border-green-100", dot: "bg-green-400" },
  purple: { live: "bg-purple-50 border-purple-200", badge: "bg-purple-100 text-purple-700", upcoming: "bg-purple-50/50 border-purple-100", dot: "bg-purple-400" },
  amber:  { live: "bg-amber-50 border-amber-200", badge: "bg-amber-100 text-amber-700", upcoming: "bg-amber-50/50 border-amber-100",  dot: "bg-amber-400" },
  rose:   { live: "bg-rose-50 border-rose-200",   badge: "bg-rose-100 text-rose-700",   upcoming: "bg-rose-50/50 border-rose-100",   dot: "bg-rose-400" },
};

function EventsSection() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const cur = now.getHours() * 60 + now.getMinutes();
  const dayOfWeek = now.getDay(); // 0=Sun, 6=Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const events = allEvents
    .filter((ev) => !ev.weekendOnly || isWeekend)
    .map((ev) => {
      const startMin = ev.hour * 60 + ev.minute;
      const endMin = startMin + ev.duration;
      // 새벽 이벤트(01:00)는 자정 넘어 cur 기준 조정
      const adjustedCur = ev.hour < 6 && cur > 18 * 60 ? cur - 24 * 60 : cur;
      const isLive = adjustedCur >= startMin && adjustedCur < endMin;
      const minutesUntil = startMin - adjustedCur;
      const isUpcoming = !isLive && minutesUntil > 0 && minutesUntil <= 60;
      return { ...ev, isLive, isUpcoming, startMin, endMin, minutesUntil };
    })
    .sort((a, b) => a.startMin - b.startMin);

  return (
    <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-50">
        <Clock className="w-4 h-4 text-sky-500" />
        <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>이벤트 일정</span>
        {isWeekend && (
          <span className="bg-rose-100 text-rose-600 rounded-full px-2.5 py-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>
            🎉 주말
          </span>
        )}
        <span className="ml-auto text-slate-400" style={{ fontSize: "12px" }}>
          현재 {pad(now.getHours())}:{pad(now.getMinutes())}
        </span>
      </div>

      {/* 매일 / 주말 구분 헤더 */}
      <div className="px-5 pt-3 pb-1">
        <span className="text-slate-400 uppercase" style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.8px" }}>
          매일 고정 이벤트
        </span>
      </div>

      <div className="divide-y divide-slate-50">
        {events.filter(ev => !ev.weekendOnly).map((ev, i) => {
          const c = colorMap[ev.color];
          return (
            <div
              key={i}
              className={`flex items-start gap-4 px-5 py-3.5 ${ev.isLive ? c.live + " border-l-4" : ev.isUpcoming ? c.upcoming : ""}`}
            >
              <span className="text-xl flex-shrink-0 mt-0.5">{ev.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-800" style={{ fontSize: "14px", fontWeight: 600 }}>{ev.name}</span>
                  {ev.isLive && (
                    <span className="flex items-center gap-1 bg-red-100 text-red-600 rounded-full px-2 py-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" /> 진행중
                    </span>
                  )}
                  {ev.isUpcoming && (
                    <span className={`${c.badge} rounded-full px-2 py-0.5`} style={{ fontSize: "10px", fontWeight: 600 }}>
                      {ev.minutesUntil}분 후
                    </span>
                  )}
                </div>
                <p className="text-slate-500 mt-0.5" style={{ fontSize: "12px" }}>{ev.desc}</p>
                <p className="text-slate-400" style={{ fontSize: "11px" }}>💡 {ev.tip}</p>
              </div>
              <span className="text-slate-400 flex-shrink-0 text-right" style={{ fontSize: "12px" }}>
                {pad(ev.hour)}:{pad(ev.minute)}
                <br />
                <span style={{ fontSize: "10px" }}>~ {pad(Math.floor(ev.endMin / 60) % 24)}:{pad(ev.endMin % 60)}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* 주말 추가 */}
      {events.some(ev => ev.weekendOnly) && (
        <>
          <div className="px-5 pt-3 pb-1 bg-rose-50/50 border-t border-rose-100">
            <span className="text-rose-400 uppercase" style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.8px" }}>
              🎉 주말 추가 이벤트
            </span>
          </div>
          <div className="divide-y divide-slate-50">
            {events.filter(ev => ev.weekendOnly).map((ev, i) => {
              const c = colorMap[ev.color];
              return (
                <div
                  key={`we-${i}`}
                  className={`flex items-start gap-4 px-5 py-3.5 ${ev.isLive ? c.live + " border-l-4" : ev.isUpcoming ? c.upcoming : "bg-rose-50/20"}`}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{ev.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-800" style={{ fontSize: "14px", fontWeight: 600 }}>{ev.name}</span>
                      {ev.isLive && (
                        <span className="flex items-center gap-1 bg-red-100 text-red-600 rounded-full px-2 py-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" /> 진행중
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 mt-0.5" style={{ fontSize: "12px" }}>{ev.desc}</p>
                    <p className="text-slate-400" style={{ fontSize: "11px" }}>💡 {ev.tip}</p>
                  </div>
                  <span className="text-slate-400 flex-shrink-0 text-right" style={{ fontSize: "12px" }}>
                    {pad(ev.hour)}:{pad(ev.minute)}
                    <br />
                    <span style={{ fontSize: "10px" }}>~ {pad(Math.floor(ev.endMin / 60) % 24)}:{pad(ev.endMin % 60)}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

// ─── 인게임 게시판 LIVE ────────────────────────────────────────────────────────
function InGameBoardSection() {
  return (
    <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
        <MessageSquare className="w-4 h-4 text-sky-500" />
        <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>인게임 게시판</span>
        <span className="flex items-center gap-1 bg-red-100 text-red-600 rounded-full px-2 py-0.5 ml-1" style={{ fontSize: "10px", fontWeight: 700 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" /> LIVE
        </span>
      </div>

      {/* 본문 */}
      <div className="px-5 py-12 flex flex-col items-center gap-4 text-center">
        <p className="text-slate-400" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          playfarm.kr 게시판을 불러오지 못했어요.<br />
          직접 방문하려면 아래 버튼을 눌러주세요.
        </p>
        <a
          href="https://playfarm.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-5 py-2.5 transition-colors"
          style={{ fontSize: "13px", fontWeight: 600 }}
        >
          playfarm.kr 바로가기 →
        </a>
      </div>
    </section>
  );
}

// ─── Notices ──────────────────────────────────────────────────────────────────
// 파싱 대상: https://cafe.naver.com/f-e/cafes/28615937/menus/58?viewType=L
// 셀렉터: a.article → href(이동URL) + textContent(제목)
//         부모 tr > em.board-tag span.inner → 태그(필독/공지 등)
//         부모 tr > td.td_normal.type_date → 날짜

type NaverNotice = {
  title: string;
  link: string;
  tag: string;
  tagColor: string;
  date: string;
  pinned: boolean;
};

const TAG_STYLE: Record<string, string> = {
  "필독": "bg-red-100 text-red-600",
  "공지": "bg-sky-100 text-sky-700",
  "이벤트": "bg-rose-100 text-rose-600",
  "업데이트": "bg-green-100 text-green-600",
  "안내": "bg-slate-100 text-slate-600",
};

async function fetchNoticeList(): Promise<NaverNotice[]> {
  const targetUrl = "https://cafe.naver.com/f-e/cafes/28615937/menus/58?viewType=L";
  const res = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) throw new Error("fetch failed");
  const { contents } = await res.json();
  if (!contents) throw new Error("empty response");

  const doc = new DOMParser().parseFromString(contents, "text/html");
  const items: NaverNotice[] = [];

  doc.querySelectorAll("a.article").forEach((el) => {
    const title = el.textContent?.trim();
    const href = el.getAttribute("href");
    if (!title || !href) return;

    const link = href.startsWith("http") ? href : `https://cafe.naver.com${href}`;

    // 부모 tr에서 태그·날짜 추출
    const row = el.closest("tr");
    const tagText = row?.querySelector("em.board-tag span.inner, em.board-tag .inner")?.textContent?.trim() || "공지";
    const date = row?.querySelector("td.type_date, td.td_normal.type_date")?.textContent?.trim() || "";
    const pinned = tagText === "필독";
    const tagColor = TAG_STYLE[tagText] ?? "bg-slate-100 text-slate-600";

    items.push({ title, link, tag: tagText, tagColor, date, pinned });
  });

  if (items.length === 0) throw new Error("no articles found");
  return items;
}

function NoticesSection() {
  const [notices, setNotices] = useState<NaverNotice[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    fetchNoticeList()
      .then((items) => { setNotices(items); setStatus("loaded"); })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-50">
        <Bell className="w-4 h-4 text-sky-500" />
        <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>공지사항</span>
        {status === "loaded" && (
          <span className="flex items-center gap-1 bg-green-100 text-green-600 rounded-full px-2 py-0.5 ml-1" style={{ fontSize: "10px", fontWeight: 700 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> 연동됨
          </span>
        )}
        {status === "error" && (
          <span className="bg-slate-100 text-slate-400 rounded-full px-2 py-0.5 ml-1" style={{ fontSize: "10px" }}>
            연동 실패
          </span>
        )}
        <a
          href="https://cafe.naver.com/f-e/cafes/28615937/menus/58?viewType=L"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-sky-500 hover:text-sky-700 transition-colors"
          style={{ fontSize: "12px", fontWeight: 500 }}
        >
          네이버 카페 →
        </a>
      </div>

      {/* 목록 */}
      <div className="divide-y divide-slate-50">
        {/* 로딩 */}
        {status === "loading" && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3.5 animate-pulse">
            <div className="w-9 h-4 bg-slate-100 rounded-full flex-shrink-0" />
            <div className="flex-1 h-4 bg-slate-100 rounded" />
            <div className="w-16 h-3 bg-slate-100 rounded flex-shrink-0" />
          </div>
        ))}

        {/* 연동 실패 — 가짜 데이터 없음 */}
        {status === "error" && (
          <div className="px-5 py-10 flex flex-col items-center gap-4">
            <p className="text-slate-400 text-center" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              네이버 카페 공지사항을 불러오지 못했어요.<br />
              직접 확인하려면 아래 버튼을 눌러주세요.
            </p>
            <a
              href="https://cafe.naver.com/f-e/cafes/28615937/menus/58?viewType=L"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-5 py-2.5 transition-colors"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              네이버 카페 공지사항 보기 →
            </a>
          </div>
        )}

        {/* 공지 목록 — 클릭 시 해당 URL로 바로 이동 */}
        {status === "loaded" && notices.map((notice, i) => (
          <a
            key={i}
            href={notice.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors group ${notice.pinned ? "bg-sky-50/30" : ""}`}
          >
            <span className={`${notice.tagColor} rounded-full px-2.5 py-0.5 flex-shrink-0`} style={{ fontSize: "10px", fontWeight: 700 }}>
              {notice.tag}
            </span>
            <p
              className="flex-1 text-slate-700 truncate group-hover:text-sky-600 transition-colors"
              style={{ fontSize: "13.5px", fontWeight: notice.pinned ? 600 : 500 }}
            >
              {notice.pinned && <span className="text-red-400 mr-1">📌</span>}
              {notice.title}
            </p>
            {notice.date && (
              <span className="text-slate-400 flex-shrink-0" style={{ fontSize: "11px" }}>{notice.date}</span>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-400 transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>

      {status === "loaded" && (
        <div className="px-5 py-2.5 border-t border-slate-100 bg-slate-50/50">
          <p className="text-slate-400 text-center" style={{ fontSize: "11px" }}>
            네이버 카페 공지사항 실시간 연동 · 클릭하면 해당 공지 페이지로 이동
          </p>
        </div>
      )}
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export function Home() {
  return (
    <div style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 250px)" }}>
      {/* Hero + Search */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 border border-sky-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sky-700" style={{ fontSize: "12px", fontWeight: 500 }}>플레이팜3 서버 운영중</span>
        </div>
        <h1 className="text-slate-800 mb-5" style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.5px", lineHeight: 1.15 }}>
          🌾 플레이팜3 위키
        </h1>
        <p className="text-slate-500 mb-8" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          명령어, 도움말, 콘텐츠, 판매계산까지 — 모든 정보를 한눈에
        </p>
        <SearchBar />
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 space-y-14">
        <GuideSection />
        <EventsSection />
        <InGameBoardSection />
        <NoticesSection />
      </div>
    </div>
  );
}