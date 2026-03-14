import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Sprout } from "lucide-react";

const navItems = [
  { label: "홈", href: "/" },
  { label: "요리", href: "/cooking" },
  { label: "낚시", href: "/fishing" },
  { label: "채광", href: "/mining" },
  { label: "던전", href: "/dungeon" },
  { label: "꾸미기", href: "/lifestyle" },
  { label: "도움말", href: "/help" },
  { label: "상점가 계산", href: "/calculator", highlight: true },
  {
    label: "요리 수익",
    href: "/cooking-calc",
    highlight: true,
    highlightColor: "orange",
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/96 backdrop-blur-sm shadow-sm border-b border-sky-100"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Sprout className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-sky-600"
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "-0.3px",
                }}
              >
                플레이팜3
              </span>
              <span
                className="text-slate-400"
                style={{ fontSize: "9px", fontWeight: 400 }}
              >
                비공식 위키
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const isOrange = item.highlightColor === "orange";
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-3 py-1.5 rounded-xl transition-all duration-150 whitespace-nowrap ${
                    item.highlight
                      ? isOrange
                        ? active
                          ? "bg-orange-400 text-white shadow-sm"
                          : "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200"
                        : active
                          ? "bg-amber-400 text-white shadow-sm"
                          : "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200"
                      : active
                        ? "bg-sky-100 text-sky-700"
                        : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                  style={{
                    fontSize: "13px",
                    fontWeight: item.highlight ? 700 : 500,
                  }}
                >
                  {item.highlight && (
                    <span className="mr-1">{isOrange ? "🍳" : "💰"}</span>
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-sky-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-sky-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-left px-4 py-3 rounded-xl transition-all ${
                  item.highlight
                    ? "bg-amber-50 text-amber-600 border border-amber-200"
                    : isActive(item.href)
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-600 hover:bg-slate-50"
                }`}
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                {item.highlight && <span className="mr-1">💰</span>}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
