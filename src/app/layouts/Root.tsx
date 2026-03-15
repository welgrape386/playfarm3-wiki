import { useEffect } from "react";
import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WelcomePopup } from "../components/WelcomePopup";

export function Root() {
  useEffect(() => {
    // 브라우저 자동번역 차단 — HTML lang을 ko로 설정
    document.documentElement.lang = "ko";
    document.documentElement.setAttribute("translate", "no");

    // <meta name="google" content="notranslate"> 동적 추가
    if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
      const meta = document.createElement("meta");
      meta.name = "google";
      meta.content = "notranslate";
      document.head.appendChild(meta);
    }
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