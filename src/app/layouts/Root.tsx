import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WelcomePopup } from "../components/WelcomePopup";

export function Root() {
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