import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DetailPage } from "./components/DetailPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import customIconsHero from "../imports/image-6.png";
import blueprintHero from "../imports/image-9.png";
import customIconsCard from "../imports/image-10.png";
import t20MumbaiCard from "../imports/T20_Mumbai.jpg";
import t20MumbaiHero from "../imports/T20_Mumbai.png";

const projects = [
  { id: 1,  color: "#B5393A", name: "Studio Roem",    category: "Campaign",    description: "Redefining creative studio presence",                          year: "2024", tags: ["Identity", "Print", "Digital"],          image: "https://images.unsplash.com/photo-1775510984733-8748e90a985e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", gallery: ["https://images.unsplash.com/photo-1675726205553-4e348f24da2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1536303158031-c868b371399f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1779911915373-ebeed44faff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1743119638006-a01d4625745d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"] },
  { id: 2,  color: "#3D6080", name: "Meridian Blue",  category: "Branding",    description: "A navigational identity for the modern age",                   year: "2024", tags: ["Branding", "Motion", "Web"],             image: "https://images.unsplash.com/photo-1532170579297-281918c8ae72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", gallery: ["https://images.unsplash.com/photo-1720022785516-9653ead7180c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1643320477860-e903e4af260b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1573770012830-7cf1777db19c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1545987796-b199d6abb1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1689067697201-24e5cc75b730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"] },
  { id: 3,  color: "#F5E642", name: "Solar Collective",category: "Strategy",   description: "Energising communities through bold design",                   year: "2023", tags: ["Strategy", "Campaign", "OOH"],          image: "https://images.unsplash.com/photo-1622915895300-b091980ef0c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", gallery: ["https://images.unsplash.com/photo-1541665234574-8e72eb7cd028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1675726205553-4e348f24da2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1510179510324-77418b788861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1712273119968-84533ec59de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"] },
  { id: 4,  color: "#2E7D45", name: "3d Custom Icons", category: "Design",      description: "Crafting three-dimensional icon systems for modern brands",    year: "2024", tags: ["Design", "Branding"],                    image: customIconsCard, gallery: [customIconsHero,"https://images.unsplash.com/photo-1492741428243-892c600f7dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1527698500164-35f561ab70ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1762279388952-85187155e48d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1501270067467-8298cce1babb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"] },
  { id: 5,  color: "#D03B2F", name: "OPN Festival",   category: "Motion",      description: "Blurring the boundary between education and industry",         year: "2023", tags: ["Motion", "Identity", "Experience"],      image: "https://images.unsplash.com/photo-1619229725920-ac8b63b0631a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", gallery: ["https://images.unsplash.com/photo-1563841930606-67e2bce48b78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1619229667032-e8700319c3c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1630547362584-b56f402eebed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1536303158031-c868b371399f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1779911915373-ebeed44faff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"] },
  { id: 6,  color: "#B2E84A", name: "T20 Mumbai",     category: "Live Action", description: "Fresh perspectives in motion picture",                         year: "2024", tags: ["Film", "Direction", "Post"],             image: t20MumbaiCard, gallery: [t20MumbaiHero,"https://images.unsplash.com/photo-1506863530036-1efeddceb993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1643320477860-e903e4af260b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1563170446-9c3c0622d8a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1675726205553-4e348f24da2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"] },
  { id: 7,  color: "#7B5A1E", name: "Amber Works",    category: "Experience",  description: "Crafting warmth into interactive spaces",                      year: "2023", tags: ["Spatial", "Interactive", "Installation"],image: "https://images.unsplash.com/photo-1705909772639-69d68969ab00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", gallery: ["https://images.unsplash.com/photo-1648870283315-430ed67f817a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1622915895300-b091980ef0c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1541665234574-8e72eb7cd028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1689067697201-24e5cc75b730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1712273119968-84533ec59de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"] },
  { id: 8,  color: "#3A8E8C", name: "Teal Shift",     category: "Campaign",    description: "Colour-led campaigns for bold brands",                         year: "2024", tags: ["Campaign", "Art Direction"],             image: "https://images.unsplash.com/photo-1633098096956-afdc8bcc8552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", gallery: ["https://images.unsplash.com/photo-1746470427686-4c3551f3d689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1762279388952-85187155e48d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1720022785516-9653ead7180c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1536303158031-c868b371399f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1743119638006-a01d4625745d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"] },
  { id: 9,  color: "#E87BB5", name: "Petal Agency",   category: "Branding",    description: "Soft power in brand communication",                            year: "2023", tags: ["Branding", "Print", "Digital"],          image: "https://images.unsplash.com/photo-1563170446-9c3c0622d8a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", gallery: ["https://images.unsplash.com/photo-1675726205553-4e348f24da2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1779911915373-ebeed44faff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1506863530036-1efeddceb993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"] },
  { id: 10, color: "#3A6EC4", name: "Blueprint Co.",  category: "Design",      description: "Architectural thinking meets graphic design",                  year: "2024", tags: ["Design", "Web", "Strategy"],             image: blueprintHero, gallery: ["https://images.unsplash.com/photo-1705909772639-69d68969ab00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1648870283315-430ed67f817a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1501270067467-8298cce1babb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1545987796-b199d6abb1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200","https://images.unsplash.com/photo-1510179510324-77418b788861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"] },
];

const categories = ["Campaign", "Branding", "Strategy", "Design", "Motion", "Live Action", "Experience"];

const BASE_W = 90;
const EXPAND_MAIN = 160;
const EXPAND_SECONDARY = Math.round(EXPAND_MAIN * 0.6 * 0.8);

type Phase = "idle" | "exiting" | "detail";

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{ width: 32, height: 32, borderRadius: "50%", background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
      aria-label="Toggle dark mode"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke={dark ? "#fff" : "#000"} strokeWidth="2" />
        <path d="M14 2 A12 12 0 0 0 14 26 Z" fill={dark ? "#fff" : "#000"} />
      </svg>
    </button>
  );
}

export default function App() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [count, setCount] = useState(0);
  const [blocksVisible, setBlocksVisible] = useState(false);
  const [uiVisible, setUiVisible] = useState(false);
  const [blocksKey, setBlocksKey] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [dark, setDark] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [showImages, setShowImages] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [viewportW, setViewportW] = useState(typeof window !== "undefined" ? window.innerWidth : 1400);

  useEffect(() => {
    const onResize = () => setViewportW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let current = 0;
    const iv = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          setLoadingDone(true);
          setTimeout(() => { setUiVisible(true); }, 100);
          setTimeout(() => setBlocksVisible(true), 500);
        }, 300);
      }
    }, 18);
    return () => clearInterval(iv);
  }, []);

  const bg = dark ? "#111" : "#fff";
  const fg = dark ? "#fff" : "#000";
  const mutedFg = dark ? "#555" : "#bbb";

  const n = projects.length;
  const hoveredIndex = hoveredId !== null ? projects.findIndex((p) => p.id === hoveredId) : -1;
  const clickedIndex = clickedId !== null ? projects.findIndex((p) => p.id === clickedId) : -1;
  const clickedProject = clickedId !== null ? projects.find((p) => p.id === clickedId) ?? null : null;
  const hoveredProject = hoveredId !== null ? projects.find((p) => p.id === hoveredId) ?? null : null;

  // How far each block expands leftward during the click sweep
  const sweepTarget = Math.round(viewportW * 0.55);

  const handleBlockClick = (id: number) => {
    if (phase !== "idle") return;
    setHoveredId(null);
    setClickedId(id);
    setUiVisible(false); // fade out nav/icons immediately as blocks begin exiting
    setPhase("exiting"); // set once — no mid-animation phase switch

    // Each block: expand delay = dist*0.07, expand duration = 0.45
    //             exit delay   = dist*0.07 + 0.42 (starts as expansion finishes)
    //             exit duration = 0.55
    // Last block done at: (n-1)*0.07 + 0.42 + 0.55
    const lastDone = ((n - 1) * 0.07 + 0.42 + 0.55) * 1000;
    setTimeout(() => setPhase("detail"), lastDone + 60);
  };

  const handleBack = () => {
    setPhase("idle");
    setClickedId(null);
    setBlocksVisible(false);
    setUiVisible(false);
    setBlocksKey((k) => k + 1); // remount blocks fresh at x:0 — prevents snap from off-screen
    setTimeout(() => setUiVisible(true), 80);
    setTimeout(() => setBlocksVisible(true), 480);
  };

  return (
    <div
      className="size-full overflow-hidden relative"
      style={{ fontFamily: "sans-serif", backgroundColor: bg, transition: "background-color 0.4s ease" }}
    >
      {/* Loading screen */}
      <AnimatePresence>
        {!loadingDone && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: bg, transition: "background-color 0.4s ease" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <span style={{ color: fg, fontSize: "clamp(19px, 4vw, 48px)", fontWeight: 300, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>
              {count}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout */}
      {loadingDone && (
        <div className="size-full flex flex-col">
          {/* Nav */}
          <motion.div
            animate={{ opacity: uiVisible ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="14" height="28" fill={fg} />
              <rect x="14" width="14" height="14" fill={fg} />
            </svg>
            <div style={{ display: "flex", gap: 24 }}>
              <button onClick={() => setShowAbout(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: fg, padding: 0 }}>About</button>
              <button onClick={() => setShowContact(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: fg, padding: 0 }}>Contact</button>
            </div>
          </motion.div>

          {/* Body */}
          <div style={{ flex: 1, position: "relative" }}>
            {/* Left sidebar categories — behind blocks */}
            <motion.div
              animate={{ opacity: uiVisible ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 2, zIndex: 5 }}
            >
              {categories.map((cat) => (
                <span key={cat} style={{ fontSize: 12, transition: "all 0.2s", color: hoveredProject?.category === cat ? fg : mutedFg, fontWeight: hoveredProject?.category === cat ? 500 : 400, transform: hoveredProject?.category === cat ? "translateX(20px)" : "translateX(0)", display: "inline-block" }}>
                  {cat}
                </span>
              ))}
            </motion.div>

            {/* Bottom-left theme toggle */}
            <motion.div
              animate={{ opacity: uiVisible ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ position: "absolute", left: 20, bottom: 24, zIndex: 30 }}
            >
              <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
            </motion.div>

            {/* Eye icon — toggle images */}
            <motion.button
              animate={{ opacity: uiVisible ? (showImages ? 1 : 0.5) : 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onClick={() => setShowImages((v) => !v)}
              style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", zIndex: 25, background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              {showImages ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 5.1A9.8 9.8 0 0112 5c5 0 9 4.5 9 7 0 1-.7 2.3-1.9 3.5M6.1 6.1C3.9 7.4 3 9.4 3 12c0 0 4 7 9 7 1.5 0 2.9-.4 4.1-1" stroke={fg} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="-0.5 -0.5 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                  <path d="M0.7153750000000001 8.253875c2.713875 -6.0308125 10.855375 -6.0308125 13.56925 0" stroke={fg} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                  <path d="M7.5 11.26925c-1.2490625 0 -2.2615625 -1.0125000000000002 -2.2615625 -2.2615625s1.0125000000000002 -2.2615 2.2615625 -2.2615 2.2615625 1.0124374999999999 2.2615625 2.2615 -1.0125000000000002 2.2615625 -2.2615625 2.2615625Z" stroke={fg} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                </svg>
              )}
            </motion.button>

            {/* Hover info — positioned next to the hovered block */}
            <AnimatePresence>
              {hoveredProject && phase === "idle" && (
                <motion.div
                  key={hoveredProject.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "fixed",
                    left: "calc(50% + 55px)",
                    top: `${(hoveredIndex + 0.5) * (100 / projects.length)}vh`,
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    zIndex: 5,
                  }}
                >
                  <div style={{ padding: "4px 8px", backgroundColor: "rgba(160,160,160,0.5)" }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: fg }}>{hoveredProject.name}</div>
                  </div>
                  <div style={{ padding: "4px 8px", marginTop: 2, backgroundColor: "rgba(160,160,160,0.5)", maxWidth: 260 }}>
                    <div style={{ fontSize: 11, color: fg }}>{hoveredProject.description}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Blocks column — z:20, above labels */}
            <div
              style={{
                position: "absolute",
                right: "calc(50% - 45px)",
                top: 0,
                bottom: 0,
                overflow: "visible",
                zIndex: 20,
              }}
            >
              <div key={blocksKey} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                {projects.map((project, i) => {
                  const isExiting = phase === "exiting" || phase === "detail";
                  const distFromClick = clickedIndex === -1 ? 0 : Math.abs(i - clickedIndex);

                  // Hover expand
                  const isHovered = hoveredIndex !== -1 && i === hoveredIndex;
                  const isBelow = hoveredIndex !== -1 && i === hoveredIndex + 1;
                  const isAbove = hoveredIndex !== -1 && i === hoveredIndex - 1;
                  let hoverExpand = 0;
                  if (isHovered) hoverExpand = EXPAND_MAIN;
                  else if (isAbove || isBelow) hoverExpand = EXPAND_SECONDARY;

                  // Staircase click expansion — clicked block widest
                  const clickExpand = Math.round(sweepTarget * Math.pow(0.82, distFromClick));
                  const targetExpand = isExiting ? clickExpand : hoverExpand;

                  // Expansion pad: staggered by distance, fires as soon as exiting begins
                  const expandDelay = isExiting ? distFromClick * 0.07 : (isBelow ? 0.07 : isAbove ? 0.05 : 0);

                  // Exit slide: fires AFTER this block's expansion finishes (expand delay + expand duration)
                  const exitDelay = isExiting ? distFromClick * 0.07 + 0.42 : 0;
                  const exitX = isExiting ? -(viewportW + 200) : 0;

                  const blockH = `calc(100vh / ${n})`;

                  return (
                    <motion.div
                      key={project.id}
                      // Entry wave animation
                      initial={{ scaleY: 0 }}
                      animate={blocksVisible ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "top center", width: viewportW, position: "relative" }}
                    >
                      {/* Exit slide wrapper */}
                      <motion.div
                        animate={{ x: exitX }}
                        transition={{ duration: 0.55, delay: exitDelay, ease: [0.55, 0, 1, 0.45] }}
                        style={{ display: "flex", justifyContent: "flex-end", height: blockH }}
                      >
                        {/* Single unified block — expands as one, image fills it */}
                        <motion.div
                          animate={{ width: BASE_W + targetExpand }}
                          transition={{ duration: phase === "idle" ? 0.35 : 0.45, delay: expandDelay, ease: [0.22, 1, 0.36, 1] }}
                          style={{ position: "relative", overflow: "hidden", flexShrink: 0, cursor: phase === "idle" ? "pointer" : "default" }}
                          onMouseEnter={() => phase === "idle" && setHoveredId(project.id)}
                          onMouseLeave={() => phase === "idle" && setHoveredId(null)}
                          onClick={() => phase === "idle" && handleBlockClick(project.id)}
                        >
                          {/* Image — single, fills entire block */}
                          <img
                            src={project.image}
                            alt={project.name}
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                          />
                          {/* Color curtain — slides right to unveil image */}
                          <motion.div
                            animate={{ x: showImages ? "100%" : "0%" }}
                            transition={{ duration: 0.75, delay: i * 0.07, ease: [0.77, 0, 0.175, 1] }}
                            style={{ position: "absolute", inset: 0, backgroundColor: project.color }}
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail page */}
      {phase === "detail" && clickedProject && (
        <DetailPage key={clickedProject.id} project={clickedProject} dark={dark} onBack={handleBack} projects={projects} />
      )}

      {/* About page */}
      {showAbout && (
        <AboutPage
          dark={dark}
          onBack={() => setShowAbout(false)}
          onContact={() => { setShowAbout(false); setShowContact(true); }}
        />
      )}

      {/* Contact page */}
      {showContact && (
        <ContactPage dark={dark} onBack={() => setShowContact(false)} />
      )}
    </div>
  );
}
