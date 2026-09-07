import image_232 from '@/imports/232.png'
import image_3D_ICON_2 from '@/imports/3D_ICON_2.png'
import image_3D_ICON1_1 from '@/imports/3D_ICON1-1.png'
import image_3D_ICON_3 from '@/imports/3D_ICON_3.png'
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";


const creditsList = [
  { role: "Creative Director", names: ["James Alderton"] },
  { role: "Executive Producer", names: ["Sara Linden", "Tom Bright"] },
  { role: "Producer", names: ["Ella Cummings"] },
  { role: "Art Direction", names: ["Chris Cousins", "Alex Fernandez"] },
  { role: "Graphic Designer", names: ["David Davies"] },
  { role: "Storyboard Artist", names: ["Sylvie Minois"] },
  { role: "Director of Photography", names: ["Menno Fokma"] },
  { role: "Production Manager", names: ["Charlotte Sinden"] },
  { role: "Post Production", names: ["Joe Coleman", "Aung Thant Kyaw"] },
];

// Animated donut chart
function CircleChart({ value, label, inView, dark }: { value: number; label: string; inView: boolean; dark: boolean }) {
  const r = 62;
  const circ = 2 * Math.PI * r;
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = Date.now();
    const duration = 1300;
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  const offset = circ * (1 - displayed / 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ position: "relative", width: 138, height: 138 }}>
        <svg width="138" height="138" viewBox="0 0 138 138" fill="none">
          <circle cx="69" cy="69" r={r} stroke={dark ? "#333" : "#E0E0E0"} strokeWidth="7" fill="none" />
          <circle
            cx="69" cy="69" r={r}
            stroke={dark ? "#e8e8e8" : "#212121"} strokeWidth="7" fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transform: "rotate(-90deg)", transformOrigin: "69px 69px", transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: dark ? "#e8e8e8" : "#222", fontVariantNumeric: "tabular-nums" }}>{displayed}%</span>
        </div>
      </div>
      <span style={{ fontSize: 10, color: dark ? "#555" : "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

type Project = {
  id: number;
  color: string;
  name: string;
  category: string;
  description: string;
  year: string;
  tags: string[];
  image: string;
  gallery: string[];
};

type Props = {
  project: Project;
  dark: boolean;
  onBack: () => void;
  projects: Project[];
};

const STRIP_COUNT = 12;

export function DetailPage({ project, dark, onBack, projects }: Props) {
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const chartsRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);
  const [chartsInView, setChartsInView] = useState(false);

  const handleClose = () => {
    setClosing(true);
    const lastDone = ((STRIP_COUNT - 1) * 0.06 + 0.5) * 1000;
    setTimeout(onBack, lastDone + 40);
  };
  const nextProject = projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length];

  // Chart values vary by project
  const metrics = [
    { label: "Audience Reach", value: 60 + (project.id * 7) % 35 },
    { label: "Brand Recall", value: 55 + (project.id * 11) % 40 },
    { label: "Client Score", value: 70 + (project.id * 5) % 28 },
  ];

  useEffect(() => {
    const el = chartsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setChartsInView(true);
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bg = dark ? "#111" : "#f5f4f0";
  const fg = dark ? "#e8e8e8" : "#111";
  const muted = dark ? "#555" : "#aaa";
  const bodyText = dark ? "#999" : "#5a5a5a";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const stripColor = dark ? "#111" : "#fff";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "fixed", inset: 0, backgroundColor: bg,
        zIndex: 50, overflowY: "auto", fontFamily: "sans-serif",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* ── Sticky nav ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 32px", backgroundColor: bg,
      }}>
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
          <rect width="14" height="28" fill={fg} />
          <rect x="14" width="14" height="14" fill={fg} />
        </svg>
        <button onClick={handleClose} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8, padding: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke={fg} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 11, color: fg, letterSpacing: "0.06em" }}>CLOSE</span>
        </button>
      </div>

      {/* ── Title (full width, 2 lines) ── */}
      <div style={{ padding: "40px 32px 0" }}>
        <h1 style={{
          fontSize: "clamp(32px, 5.5vw, 75px)", fontWeight: 300,
          color: fg, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {project.description}.
        </h1>
      </div>

      {/* ── Tags (left) + Credits button (right) ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "28px 32px 0",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 10, color: muted, letterSpacing: "0.1em" }}>{tag.toUpperCase()}</span>
          ))}
        </div>
        <button onClick={() => {
          setCreditsOpen((v) => !v);
          setTimeout(() => {
            creditsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 80);
        }} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 10, color: muted, letterSpacing: "0.1em", padding: 0,
        }}>
          CREDITS
        </button>
      </div>

      {/* ── Hero image (full width) ── */}
      <div style={{ margin: "16px 32px 0", height: "clamp(360px, 50vw, 668px)", overflow: "hidden" }}>
        <img src={image_232} alt={project.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/* ── Two-column: left image + right text + charts ── */}
      <div style={{ display: "flex", margin: "6px 32px 0", gap: 6, alignItems: "flex-start" }}>
        {/* Left image */}
        <div style={{ flex: "0 0 55%", height: "clamp(280px, 35vw, 471px)", overflow: "hidden" }}>
          <img src={image_3D_ICON1_1} alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        {/* Right: body text + charts */}
        <div style={{ flex: 1, padding: "48px 0 48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "clamp(280px, 35vw, 471px)" }}>
          <div>
            <p style={{ fontSize: 10, color: muted, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 10px" }}>The Challenge</p>
            <p style={{ fontSize: 14, color: bodyText, lineHeight: "22px", letterSpacing: "0.07em", margin: "0 0 22px", textTransform: "capitalize" }}>
              {project.description}. A project that challenges the boundaries of its discipline and reframes what audiences expect from creative work.
            </p>
            <p style={{ fontSize: 14, color: bodyText, lineHeight: "22px", letterSpacing: "0.07em", margin: 0, textTransform: "capitalize" }}>
              Built with precision and intent — every detail considered, every decision purposeful. The result is a body of work that resonates long after the first impression.
            </p>
          </div>
          {/* Animated charts */}
          <div ref={chartsRef} style={{ display: "flex", gap: 32, marginTop: 16 }}>
            {metrics.map((m) => (
              <CircleChart key={m.label} value={m.value} label={m.label} inView={chartsInView} dark={dark} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-width second image ── */}
      <div style={{ margin: "6px 32px 0", height: "clamp(300px, 40vw, 540px)", overflow: "hidden" }}>
        <img src={image_3D_ICON_3} alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/* ── Bottom section: text left + right image ── */}
      <div style={{ position: "relative", margin: "6px 32px 0", height: "clamp(300px, 35vw, 471px)", overflow: "hidden" }}>
        {/* Text left */}
        <div style={{ position: "absolute", left: 0, top: 0, width: "42%", padding: "32px 0", boxSizing: "border-box" }}>
          <p style={{ fontSize: 10, color: muted, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 10px" }}>The Solution</p>
          <p style={{ fontSize: 14, color: bodyText, lineHeight: "22px", letterSpacing: "0.07em", margin: "0 0 22px", textTransform: "capitalize" }}>
            The process behind the work is as important as the outcome. Collaboration, iteration, and an unwillingness to settle — these are the values that drive every project.
          </p>
          <p style={{ fontSize: 14, color: bodyText, lineHeight: "22px", letterSpacing: "0.07em", margin: 0, textTransform: "capitalize" }}>
            From concept to delivery, the studio brings a singular focus to each brief — ensuring the work stands apart in both craft and conviction.
          </p>
        </div>
        {/* Right image */}
        <div style={{ position: "absolute", right: 0, top: 0, width: "55%", height: "100%", overflow: "hidden" }}>
          <img src={image_3D_ICON_2} alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </div>

      {/* ── Credits collapsible ── */}
      <div ref={creditsRef} style={{ margin: "0 32px", borderTop: `1px solid ${border}` }}>
        {/* Toggle row */}
        <button
          onClick={() => setCreditsOpen((v) => !v)}
          style={{
            width: "100%", background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 0", color: fg,
          }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.1em" }}>CREDITS</span>
          <motion.svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            animate={{ rotate: creditsOpen ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <path d="M2 4L6 8L10 4" stroke={fg} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>

        {/* Expandable list */}
        <AnimatePresence initial={false}>
          {creditsOpen && (
            <motion.div
              key="credits-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingBottom: 32 }}>
                {creditsList.map(({ role, names }, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    paddingTop: 12, paddingBottom: 12,
                    borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: border,
                  }}>
                    <div style={{ flex: "0 0 260px", fontSize: 12, color: fg }}>{role}</div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                      {names.map((n) => <span key={n} style={{ fontSize: 12, color: muted }}>{n}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ── */}
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        padding: "65px 32px 48px",
        borderTop: `1px solid ${border}`,
        marginTop: 48,
      }}>
        <div>
          <p style={{ fontSize: 10, color: muted, letterSpacing: "0.1em", margin: "0 0 10px" }}>NEXT PROJECT</p>
          <p style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: fg, margin: 0, lineHeight: 1 }}>
            {nextProject.name}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, color: muted }}>{nextProject.category}</span>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14H22M16 8L22 14L16 20" stroke={fg} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ── White strip wipe-in on close ── */}
      {closing && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none" }}>
          {Array.from({ length: STRIP_COUNT }).map((_, i) => {
            const stripH = window.innerHeight / STRIP_COUNT;
            return (
              <motion.div
                key={i}
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: i * stripH,
                  width: "100%",
                  height: stripH + 1,
                  backgroundColor: stripColor,
                }}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
