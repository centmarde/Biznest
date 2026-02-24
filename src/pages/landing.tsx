import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/utils/mobile";

const features = [
  {
    title: "AI-Powered Location Scouting",
    desc: "Instantly analyze zoning maps and foot-traffic data to find the best spot for your business.",
  },
  {
    title: "Business Permit Tracking",
    desc: "Monitor permit renewals and compliance deadlines from a single, unified dashboard.",
  },
  {
    title: "Smart Market Insights",
    desc: "Get real-time analytics on local competitors, demographics, and market demand.",
  },
  {
    title: "Supplier & Partner Matching",
    desc: "Connect with verified local suppliers and partners that fit your business needs.",
  },
  {
    title: "Lot & Space Search",
    desc: "Browse available commercial lots, lease spaces, and properties inside your target zone.",
  },
  {
    title: "Expansion Planning",
    desc: "Use AI-guided recommendations to scale your business into new areas confidently.",
  },
];

const Landing = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col">
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/landing.png')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#0d1b3e",
        }}
      />

      {/* ── Dark navy overlay ── */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10, 22, 58, 0.72)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-start text-center">
        {/* Subtitle at very top */}
        <p
          className={`mt-6 tracking-wide ${isMobile ? "text-xs px-4" : "text-sm"}`}
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          An AI-powered system that helps choose business locations and connects
          local businesses in your city
        </p>

        {/* Logo */}
        <div className={`flex items-center gap-3 ${isMobile ? "mt-6" : "mt-8"}`}>
          <img
            src="/icons/biznest.png"
            alt="Biznest"
            className={isMobile ? "w-16 h-16 object-contain" : "w-24 h-24 object-contain"}
          />
          <div className="flex flex-col leading-tight">
            <span
              className={`font-bold ${isMobile ? "text-3xl" : "text-5xl"}`}
              style={{ color: "#ffffff", fontFamily: "'Funnel Sans', sans-serif" }}
            >
              Biznest
            </span>
            <span
              className={`tracking-wider ${isMobile ? "text-sm" : "text-lg"}`}
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              City Planner
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div className={`flex flex-col items-center ${isMobile ? "mt-6 gap-1" : "mt-8 gap-2"}`}>
          <h1
            className={`font-black tracking-tight leading-none ${
              isMobile ? "text-4xl" : "text-7xl"
            }`}
            style={{ color: "#ffffff" }}
          >
            CHOOSE IDEAL
          </h1>
          <h2
            className={`font-bold tracking-widest ${
              isMobile ? "text-2xl" : "text-5xl"
            }`}
            style={{ color: "#ffffff", letterSpacing: "0.15em" }}
          >
            LOCATION{" "}
            <span style={{ color: "#f97316" }}>INSTANTLY</span>
          </h2>
        </div>

        {/* CTA buttons */}
        <div
          className={`mt-10 flex gap-4 ${isMobile ? "flex-col w-64" : "flex-row"}`}
        >
          <button
            onClick={() => navigate("/auth")}
            className="rounded-lg px-10 py-3 font-semibold text-sm tracking-wider uppercase transition-opacity hover:opacity-90 active:opacity-75"
            style={{
              backgroundColor: "#205781",
              color: "#ffffff",
              border: "2px solid #4F959D",
            }}
          >
            Get Started
          </button>
          <button
            onClick={scrollToFeatures}
            className="rounded-lg px-10 py-3 font-semibold text-sm tracking-wider uppercase transition-opacity hover:opacity-90 active:opacity-75"
            style={{
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "2px solid rgba(255,255,255,0.5)",
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* ── Scroll-down chevron ── */}
      <div className="relative z-10 flex justify-center pb-6 pt-4">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      </div>
      {/* ═══════════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════════ */}
      <div ref={featuresRef} className="w-full" style={{ backgroundColor: "#0d1b3e" }}>
        {/* Dark navy heading bar */}
        <div className="flex items-center justify-center py-12 px-6 text-center">
          <h2
            className={`font-black tracking-widest uppercase ${
              isMobile ? "text-2xl" : "text-4xl"
            }`}
            style={{ color: "#ffffff" }}
          >
            Come See Our Features
          </h2>
        </div>

        {/* White card container */}
        <div
          className={`mx-auto rounded-2xl overflow-hidden ${
            isMobile ? "mx-4 mb-8" : "mb-12"
          }`}
          style={{ backgroundColor: "#ffffff", maxWidth: 1100, width: "calc(100% - 80px)" }}
        >
          <div
            className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-0`}
          >
            {/* ── Left: text content ── */}
            <div className={`flex flex-col justify-center ${isMobile ? "p-8" : "flex-1 p-12"}`}>
              {/* Eyebrow */}
              <p
                className="text-sm font-semibold mb-2"
                style={{ color: "#4F959D" }}
              >
                Improve your workflow
              </p>
              {/* Section title */}
              <h3
                className={`font-bold mb-8 ${isMobile ? "text-2xl" : "text-3xl"}`}
                style={{ color: "#0d1b3e" }}
              >
                Biznest Features
              </h3>

              {/* Feature grid — 2 columns */}
              <div
                className={`grid gap-x-10 gap-y-7 ${
                  isMobile ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {features.map((f) => (
                  <div key={f.title} className="flex flex-col gap-1">
                    {/* Check icon + title */}
                    <div className="flex items-center gap-3">
                      <span
                        className="flex items-center justify-center rounded-full w-6 h-6 flex-shrink-0"
                        style={{ backgroundColor: "#e8f4f8" }}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#205781"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span
                        className="font-semibold text-sm"
                        style={{ color: "#0d1b3e" }}
                      >
                        {f.title}
                      </span>
                    </div>
                    {/* Description */}
                    <p
                      className="text-xs leading-relaxed pl-9"
                      style={{ color: "#6b7280" }}
                    >
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: feature image ── */}
            {!isMobile && (
              <div
                className="relative flex-shrink-0"
                style={{ width: "42%" }}
              >
                <img
                  src="/images/landingfeatures.png"
                  alt="Biznest features preview"
                  className="w-full h-full object-cover object-center"
                  style={{ minHeight: 480 }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
