import { useEffect } from "react";
import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WelcomePopup } from "../components/WelcomePopup";

export function Root() {
  useEffect(() => {
    // ── 한국어 설정 ──
    document.documentElement.lang = "ko";
    document.documentElement.setAttribute("translate", "no");

    // 문서 제목
    if (document.title !== "플레이팜3 비공식 위키") {
      document.title = "플레이팜3 비공식 위키";
    }

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // 기본 메타태그 (한국어 SEO)
    setMeta("description",     "플레이팜3 유저가 만든 비공식 위키. 명령어 43개, 최대시세, 알바임금, 요리 수익 계산기, 낚시·채광·던전·꾸미기 정보를 한눈에 확인하세요.");
    setMeta("keywords",        "플레이팜3, 플팜3, 플레이팜, 위키, 명령어, 시세, 요리, 낚시, 채광, 던전, 섬꾸미기, 펫, 알바임금");
    setMeta("author",          "플레이팜3 유저 커뮤니티");
    setMeta("robots",          "index, follow");
    setMeta("google",          "notranslate");

    // Open Graph (SNS 공유)
    setMeta("og:type",         "website",              true);
    setMeta("og:locale",       "ko_KR",                true);
    setMeta("og:site_name",    "플레이팜3 비공식 위키", true);
    setMeta("og:title",        "플레이팜3 비공식 위키 — 명령어·시세·요리수익 총정리", true);
    setMeta("og:description",  "플레이팜3 유저가 만든 비공식 위키. 명령어, 최대시세, 상점가 계산기, 요리 수익 등 모든 정보를 한 곳에서.", true);
    setMeta("og:url",          "https://playfarm3-wiki.vercel.app", true);

    // Twitter Card
    setMeta("twitter:card",        "summary");
    setMeta("twitter:title",       "플레이팜3 비공식 위키");
    setMeta("twitter:description", "명령어·시세·요리수익·낚시·채광 등 플레이팜3 정보 총정리");
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <WelcomePopup />
      <Header />
      <main className="flex-1 pt-16 wiki-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}