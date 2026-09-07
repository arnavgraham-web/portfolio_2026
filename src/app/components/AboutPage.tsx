import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { InteractiveHoverButton } from "./InteractiveHoverButton";
import heroPhoto from "../../imports/Frame2095585393/3314f6adf250946a8bdadfe19ec80be5d6bb71c8.png";
import customIconsCard from "../../imports/image-10.png";
import blueprintHero from "../../imports/image-9.png";
import t20MumbaiCard from "../../imports/T20_Mumbai.jpg";

const STRIP_COUNT = 12;

// Two-column layout: ~40% heading column on the left, ~60% content on the right
const LEFT_COL = "40%";

// Gentle, soft easing used across all reveal animations
const GENTLE = [0.16, 1, 0.3, 1] as const;

type Props = {
  dark: boolean;
  onBack: () => void;
  onContact: () => void;
};

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Animated number that counts up and gives a little "pop" spring on arrival
function StatNumber({ target, suffix = "+", inView, delay = 0 }: { target: number; suffix?: string; inView: boolean; delay?: number }) {
  const [val, setVal] = useState(0);
  const [pop, setPop] = useState(false);
  useEffect(() => {
    if (!inView) return;
    let frame: number;
    let started = false;
    const startTimer = setTimeout(() => {
      started = true;
      const start = Date.now();
      const dur = 1200;
      const tick = () => {
        const t = Math.min((Date.now() - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(eased * target));
        if (t < 1) frame = requestAnimationFrame(tick);
        else setPop(true);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(startTimer); if (started) cancelAnimationFrame(frame); };
  }, [inView, target, delay]);
  return (
    <motion.span
      style={{ display: "inline-block", fontVariantNumeric: "tabular-nums" }}
      animate={pop ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {val}{suffix}
    </motion.span>
  );
}

const services = [
  {
    title: "UI / UX DESIGN",
    left: ["App Design", "Website Design", "Landing Page Design"],
    right: ["Design Systems", "Wireframing", "Prototyping"],
  },
  {
    title: "BRAND IDENTITY",
    left: ["Logo Design", "Brand Guidlines", "Label Design"],
    right: ["Packaging Design", "Visual Identity", "Brand Strategy"],
  },
  {
    title: "DIGITAL DESIGN",
    left: ["Illustrations", "Animations", "Business Cards"],
    right: ["Flyers", "Banner Design", "Social Media"],
  },
];

const timeline = [
  {
    period: "2006 - 2019",
    title: "Bishop Cotton Boys School",
    sub: "Upto 10th Grade",
    body: `I spent 12 years at Bishop Cotton Boys' School, where I honed my character, charisma, and etiquette—values that continue to shape me today. The school's enduring motto, "Nec Dextrorsum, Nec Sinistrorsum" (Neither to the right nor to the left), is a principle I live by, guiding me to stay focused, steadfast, and true to my path.`,
  },
  {
    period: "2019 - 2020",
    title: "C.M.R Nation PU College",
    sub: "11th -12th Grade",
    body: `CMR National PU College helped me explore different paths and ultimately discover my strength in business and marketing. It provided the foundation for me to understand my interests and shape my future direction.`,
  },
  {
    period: "2021 - 2025",
    title: "PES University",
    sub: "Bachelors in Design",
    body: `PES University played a key role in shaping me into the designer I am today. It provided me with the skills, knowledge, and hands-on experience to refine my craft and approach design with a problem-solving mindset. The environment challenged me to think critically and push creative boundaries.`,
  },
  {
    period: "Feb 2024 - May 2024",
    title: "Crossroads NGO",
    sub: "UI/UX Designer",
    body: `A thorough study of their social media and website.\nWorked on a full website redesign to enhance user experience and increase donation flow`,
  },
  {
    period: "June 11 - August 11 2024",
    title: "Welldoc Software",
    sub: "UI/UX Designer",
    body: `Collaborated with the design team to enhance the UI of the portal, improving overall usability and aesthetic.\nConducted research and analysis of the existing Patient Management Portal to identify areas for improvement.`,
  },
  {
    period: "Feb 24 2025 - May 24 2025",
    title: "Turbostart",
    sub: "UI/UX Design Intern",
    body: `Collaborated with Senior Designers varied design projects, covering everything from branding to product and UX design. Gained practical experience working in a fast-moving startup environment, helping early-stage companies shape their design direction.`,
  },
  {
    period: "May 24 2025 - Present",
    title: "Turbostart",
    sub: "Associate Product Designer",
    body: `Shh... the pixels are still aligning.`,
  },
];

// Footer blocks — each belongs to a project (matches the homepage colors/names/images)
const footerBlocks = [
  { name: "Studio Roem", color: "#B5393A", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { name: "Meridian Blue", color: "#3D6080", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { name: "Solar Collective", color: "#F5E642", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { name: "3d Custom Icons", color: "#2E7D45", img: customIconsCard },
  { name: "OPN Festival", color: "#D03B2F", img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { name: "T20 Mumbai", color: "#B2E84A", img: t20MumbaiCard },
  { name: "Amber Works", color: "#7B5A1E", img: "https://images.unsplash.com/photo-1513346940221-6f673d962e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { name: "Teal Shift", color: "#3A8E8C", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { name: "Petal Agency", color: "#E87BB5", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { name: "Blueprint Co.", color: "#3A6EC4", img: blueprintHero },
];

export function AboutPage({ dark, onBack, onContact }: Props) {
  const [closing, setClosing] = useState(false);
  const [entering, setEntering] = useState(true);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const [showFooterImages, setShowFooterImages] = useState(false);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const blockSize = (vw / footerBlocks.length) * 0.8;

  const bg = dark ? "#111" : "#fff";
  const fg = dark ? "#ffffff" : "#111";
  const muted = dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)";
  const border = dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)";
  const stripColor = dark ? "#111" : "#fff";
  // Inputs: a subtly lighter (dark theme) / darker (light theme) shade of the page bg
  const inputBg = dark ? "#161618" : "#eae8e3";

  const footerRef = useInView(0.2);

  // Enter wipe: strips start covering the screen, then slide off to the left — revealing the page behind them as they pass
  useEffect(() => {
    const lastDone = ((STRIP_COUNT - 1) * 0.06 + 0.5) * 1000;
    const t = setTimeout(() => setEntering(false), lastDone + 40);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setClosing(true);
    const lastDone = ((STRIP_COUNT - 1) * 0.06 + 0.5) * 1000;
    setTimeout(onBack, lastDone + 40);
  };

  const handleGetInTouch = () => {
    setClosing(true);
    const lastDone = ((STRIP_COUNT - 1) * 0.06 + 0.5) * 1000;
    setTimeout(onContact, lastDone + 40);
  };

  const stats = useInView(0.3);
  const servicesRef = useInView(0.15);
  const journeyRef = useInView(0.05);
  const ctaRef = useInView(0.2);

  const label = { fontSize: 10, color: fg, letterSpacing: "0.16em", textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: 10 };
  const dot = <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: fg, display: "inline-block" }} />;

  return (
    <motion.div
      style={{
        position: "fixed", inset: 0,
        backgroundColor: bg,
        zIndex: 50,
        overflowY: "auto",
        scrollBehavior: "smooth",
        fontFamily: "sans-serif",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* Nav */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px",
        backgroundColor: bg,
        transition: "background-color 0.4s ease",
      }}>
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <rect width="14" height="28" fill={fg} />
          <rect x="14" width="14" height="14" fill={fg} />
        </svg>
        <button onClick={handleClose} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8, padding: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke={fg} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 13, color: fg }}>Back to home</span>
        </button>
      </div>

      {/* Hero photo (full-bleed) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: GENTLE }}
        style={{ height: "78vh", overflow: "hidden" }}
      >
        <img src={heroPhoto} alt="At the studio desk" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      </motion.div>

      {/* About me + bio + stats — label left, content right */}
      <div ref={stats.ref} style={{ padding: "112px 40px", borderBottom: `1px solid ${border}`, display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: `0 0 ${LEFT_COL}`, maxWidth: LEFT_COL }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={stats.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: GENTLE }}
            style={{ ...label, margin: 0 }}
          >
            {dot} About Me
          </motion.p>
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={stats.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: GENTLE }}
            style={{ fontSize: 28, fontWeight: 300, color: fg, lineHeight: 1.35, margin: "0 0 28px", letterSpacing: "-0.01em" }}
          >
            A Sneakerhead, An Audiophile, A Photographer, An Artist, A passionate collector of Hot Wheels, and of course...
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={stats.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: GENTLE }}
            style={{ fontSize: 28, fontWeight: 300, color: fg, lineHeight: 1.35, margin: 0, letterSpacing: "-0.01em" }}
          >
            An <strong style={{ fontWeight: 600 }}>Interaction designer</strong> trying to master every trade! <strong style={{ fontWeight: 600 }}>Digital</strong>, <strong style={{ fontWeight: 600 }}>physical, you name it.</strong>
          </motion.p>

          {/* Stats */}
          <div style={{ marginTop: 72, display: "flex", flexDirection: "column", gap: 56 }}>
            <div>
              <div style={{ fontSize: "clamp(56px, 8vw, 120px)", fontWeight: 400, color: fg, lineHeight: 1, letterSpacing: "-0.03em" }}>
                <StatNumber target={20} inView={stats.inView} delay={200} />
              </div>
              <div style={{ borderTop: `1px solid ${border}`, marginTop: 20, paddingTop: 14, fontSize: 14, color: muted }}>Completed Projects</div>
            </div>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 160px" }}>
                <div style={{ fontSize: "clamp(44px, 6vw, 84px)", fontWeight: 400, color: fg, lineHeight: 1, letterSpacing: "-0.03em" }}>
                  <StatNumber target={5} inView={stats.inView} delay={500} />
                </div>
                <div style={{ borderTop: `1px solid ${border}`, marginTop: 16, paddingTop: 12, fontSize: 14, color: muted }}>Team Projects</div>
              </div>
              <div style={{ flex: "1 1 160px" }}>
                <div style={{ fontSize: "clamp(44px, 6vw, 84px)", fontWeight: 400, color: fg, lineHeight: 1, letterSpacing: "-0.03em" }}>
                  <StatNumber target={4} inView={stats.inView} delay={800} />
                </div>
                <div style={{ borderTop: `1px solid ${border}`, marginTop: 16, paddingTop: 12, fontSize: 14, color: muted }}>Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT I DO — full width; heading top-left, rows with heading left + sub-texts in 2nd/3rd columns */}
      <div ref={servicesRef.ref} style={{ padding: "112px 40px", borderBottom: `1px solid ${border}` }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={servicesRef.inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: GENTLE }}
          style={{ ...label, margin: "0 0 20px" }}
        >
          {dot} Services
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={servicesRef.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: GENTLE }}
          style={{ fontSize: 60, fontWeight: 500, color: fg, letterSpacing: "-0.02em", margin: "0 0 60px", lineHeight: 1 }}
        >
          WHAT I DO
        </motion.h2>

        <div>
          {services.map((svc, i) => {
            const active = hoveredService === i;
            const anyHover = hoveredService !== null;
            const opacity = !anyHover ? 1 : active ? 1 : 0.35;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 14 }}
                animate={servicesRef.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: GENTLE }}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                style={{ borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: border, padding: "44px 0", cursor: "default", display: "grid", gridTemplateColumns: "40% 1fr 1fr", gap: 32, alignItems: "center" }}
              >
                <motion.h3
                  animate={{ opacity, x: active ? 6 : 0 }}
                  transition={{ duration: 0.35, ease: GENTLE }}
                  style={{ fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 500, color: fg, letterSpacing: "-0.01em", margin: 0, lineHeight: 1.05 }}
                >
                  {svc.title}
                </motion.h3>
                <motion.div animate={{ opacity }} transition={{ duration: 0.35, ease: GENTLE }} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {svc.left.map((item) => (
                    <span key={item} style={{ fontSize: 16, color: fg, fontWeight: 300 }}>{item}</span>
                  ))}
                </motion.div>
                <motion.div animate={{ opacity }} transition={{ duration: 0.35, ease: GENTLE }} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {svc.right.map((item) => (
                    <span key={item} style={{ fontSize: 16, color: fg, fontWeight: 300 }}>{item}</span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
          <div style={{ borderTop: `1px solid ${border}` }} />
        </div>
      </div>

      {/* MY CAREER JOURNEY — sticky left, scrolling right (kept within left column) */}
      <div ref={journeyRef.ref} style={{ padding: "112px 40px", borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Left column (sticky) */}
          <div style={{ flex: `0 0 ${LEFT_COL}`, maxWidth: LEFT_COL, minWidth: 220, position: "sticky", top: 80, alignSelf: "flex-start" }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={journeyRef.inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: GENTLE }}
              style={{ ...label, margin: "0 0 20px" }}
            >
              {dot} Experience
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={journeyRef.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: GENTLE }}
              style={{ fontSize: 60, fontWeight: 500, color: fg, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.05 }}
            >
              MY CAREER<br />JOURNEY
            </motion.h2>
          </div>

          {/* Right column (scrolls) */}
          <div style={{ flex: 1, minWidth: 240 }}>
            {timeline.map((item, i) => (
              <motion.div
                key={item.title + item.period}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: GENTLE }}
                style={{ padding: "0 0 56px", borderTopWidth: i === 0 ? 0 : 1, borderTopStyle: "solid", borderTopColor: border, paddingTop: i === 0 ? 0 : 40 }}
              >
                <p style={{ ...label, margin: "0 0 20px" }}>{dot} {item.period}</p>
                <h3 style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 500, color: fg, margin: "0 0 4px", letterSpacing: "-0.01em" }}>{item.title}</h3>
                <p style={{ fontSize: 16, color: muted, margin: "0 0 20px" }}>{item.sub}</p>
                <p style={{ fontSize: 16, color: muted, lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* LET'S WORK TOGETHER — CTA */}
      <div ref={ctaRef.ref} style={{ borderTop: `1px solid ${border}`, padding: "clamp(80px, 14vh, 160px) 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ctaRef.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: GENTLE }}
          style={{ fontSize: 13, color: fg, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 24px" }}
        >
          Have a project in mind ?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={ctaRef.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: GENTLE }}
          style={{ fontSize: "clamp(48px, 9vw, 140px)", fontWeight: 500, color: fg, letterSpacing: "-0.03em", lineHeight: 0.95, margin: "0 0 44px" }}
        >
          LET'S WORK TOGETHER
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ctaRef.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: GENTLE }}
          style={{ marginBottom: 48 }}
        >
          <InteractiveHoverButton
            onClick={handleGetInTouch}
            className="py-4 px-9 text-base"
            style={{
              // Match the About page theme
              ["--background" as string]: bg,
              ["--primary" as string]: fg,
              ["--primary-foreground" as string]: bg,
              color: fg,
              borderColor: border,
            }}
          >
            Get In Touch
          </InteractiveHoverButton>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={ctaRef.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: GENTLE }}
          style={{ display: "flex", gap: 28 }}
        >
          {[
            {
              label: "Behance", href: "https://behance.net",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill={fg} height="22" width="22">
                  <path d="M9.68 4.63998125c0 -0.3092875 0.2507125 -0.5600125 0.56 -0.56h4.48c0.4310875 0 0.70051875 0.46666875 0.484975 0.84 -0.10003125 0.17325625 -0.2849125 0.27999375 -0.484975 0.28h-4.48c-0.30928125 0 -0.56 -0.25071875 -0.56 -0.56Zm-1.68 5.46c0 1.62371875 -1.31628125 2.94 -2.94 2.94H0.72c-0.3092875 0.0000125 -0.56 -0.25070625 -0.56 -0.56v-8.96c0 -0.309275 0.25071875 -0.56 0.56 -0.56h4.06c2.04766875 0.00218125 3.3251 2.2202125 2.29938125 3.99245 -0.1351625 0.23353125 -0.3050625 0.4451375 -0.50388125 0.62755 0.884125 0.53185 1.42474375 1.4882375 1.4245 2.52Zm-6.72 -2.94h3.5c1.18549375 0 1.926425 -1.28333125 1.33368125 -2.31 -0.27509375 -0.476475 -0.78349375 -0.77 -1.33368125 -0.77h-3.5Zm5.6 2.94c0 -1.00515625 -0.81484375 -1.82 -1.82 -1.82H1.28v3.64h3.78c1.00515625 0 1.82 -0.8148375 1.82 -1.82Zm8.96 -0.42c0 0.30928125 -0.25071875 0.56 -0.56 0.56h-4.97c0.4307625 1.66968125 2.50746875 2.246925 3.738075 1.03903125 0.08074375 -0.07925 0.1553625 -0.16450625 0.223225 -0.25503125 0.258925 -0.34486875 0.79408125 -0.28011875 0.9632875 0.11655 0.07853125 0.18409375 0.05288125 0.39609375 -0.0672875 0.55615 -1.5526375 2.0686875 -4.76245 1.6808375 -5.7776625 -0.698125 -1.01521875 -2.37896875 0.925575 -4.964825 3.493425 -4.65454375 1.6876 0.20391875 2.95705625 1.6361 2.9569375 3.33596875Zm-1.19 -0.56c-0.42770625 -1.6704625 -2.50335625 -2.2515 -3.73616875 -1.0458625 -0.29323125 0.28676875 -0.5021 0.6485375 -0.60383125 1.0458625Z" strokeWidth="0.0625"></path>
                </svg>
              ),
            },
            {
              label: "LinkedIn", href: "https://linkedin.com",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill={fg} height="22" width="22">
                  <path d="M14.63384375 0.16H1.36615625C0.69999375 0.15996875 0.16 0.69999375 0.16 1.36615625v13.2676875c0 0.6661625 0.53999375 1.2061875 1.20615625 1.20615625h13.2676875c0.66611875 -0.00003125 1.20615625 -0.5400375 1.20615625 -1.20615625V1.36615625c0 -0.666125 -0.5400375 -1.206125 -1.20615625 -1.20615625Zm0 14.47384375H1.36615625V1.36615625h13.2676875v13.2676875Zm-9.04615 -7.84v4.82461875c0 0.46425 -0.5025625 0.75440625 -0.90461875 0.52228125 -0.1865875 -0.10773125 -0.3015375 -0.306825 -0.3015375 -0.52228125v-4.82461875c0 -0.46424375 0.5025625 -0.7544 0.90461875 -0.522275 0.1865875 0.107725 0.3015375 0.30681875 0.3015375 0.522275Zm6.63384375 2.11076875v2.71385c0 0.46425 -0.5025625 0.75440625 -0.9046125 0.52228125 -0.18659375 -0.10773125 -0.3015375 -0.306825 -0.3015375 -0.52228125v-2.71385c-0.00075 -1.16061875 -1.257625 -1.8852 -2.26238125 -1.30424375 -0.46570625 0.26928125 -0.7526625 0.76629375 -0.75300625 1.30424375v2.71385c0 0.46425 -0.5025625 0.75440625 -0.9046125 0.52228125 -0.18659375 -0.10773125 -0.30154375 -0.306825 -0.30154375 -0.52228125v-4.82461875c0.00235625 -0.4642375 0.50638125 -0.75185 0.90725 -0.5176875 0.14301875 0.0835375 0.2453875 0.22221875 0.283075 0.38350625 1.72885625 -1.17280625 4.07899375 -0.034275 4.23025 2.0493625 0.004725 0.06509375 0.0071 0.13033125 0.00711875 0.1955875ZM5.88923125 4.683075c0 0.696375 -0.75384375 1.13160625 -1.356925 0.78341875 -0.603075 -0.34818125 -0.603075 -1.21865 0 -1.5668375 0.13753125 -0.0794 0.2935 -0.1212 0.45230625 -0.12119375 0.49959375 0.00001875 0.90461875 0.405025 0.90461875 0.9046125Z" strokeWidth="0.0625"></path>
                </svg>
              ),
            },
            {
              label: "Instagram", href: "https://instagram.com",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill={fg} height="22" width="22">
                  <path d="M8 4.3815375c-2.78549375 0 -4.526425 3.0153875 -3.13368125 5.42769375 1.39275 2.41230625 4.8746125 2.41230625 6.2673625 0 0.31758125 -0.550075 0.48478125 -1.17405625 0.48478125 -1.80923125C11.61638125 6.0024375 9.9975625 4.38361875 8 4.3815375Zm0 6.03076875c-1.85699375 0.0000875 -3.0176 -2.01011875 -2.089175 -3.61836875 0.928425 -1.60824375 3.24966875 -1.60835 4.1782375 -0.00018125 0.2117625 0.3667375 0.32324375 0.78275625 0.32324375 1.20624375 0 1.332325 -1.07998125 2.41236875 -2.41230625 2.41230625ZM11.6184625 0.16H4.3815375C2.05108125 0.16249375 0.16249375 2.05108125 0.16 4.3815375v7.236925c0.00249375 2.33045625 1.89108125 4.21904375 4.2215375 4.2215375h7.236925c2.33045625 -0.00249375 4.21904375 -1.89108125 4.2215375 -4.2215375V4.3815375c-0.00249375 -2.33045625 -1.89108125 -4.21904375 -4.2215375 -4.2215375Zm3.01538125 11.4584625c0 1.66535 -1.35003125 3.01538125 -3.01538125 3.01538125H4.3815375c-1.66535 0 -3.01538125 -1.35003125 -3.01538125 -3.01538125V4.3815375c0 -1.66535 1.35003125 -3.01538125 3.01538125 -3.01538125h7.236925c1.66535 0 3.01538125 1.35003125 3.01538125 3.01538125ZM12.8246125 4.08c0 0.696375 -0.75384375 1.13160625 -1.35691875 0.78341875 -0.60308125 -0.3481875 -0.60308125 -1.21865 0 -1.5668375 0.13753125 -0.07940625 0.2935 -0.12120625 0.45230625 -0.1212 0.4995875 0.000025 0.9046125 0.40503125 0.9046125 0.90461875Z" strokeWidth="0.0625"></path>
                </svg>
              ),
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 12, border: `1px solid ${border}`, color: fg, opacity: 0.8, transition: "opacity 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer color blocks — square blocks, homepage wave entry + upward hover extension */}
      <div ref={footerRef.ref} style={{ paddingTop: 112 }}>
        {/* Header row: subtle view toggle (project name now appears above the hovered block) */}
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: "0 40px 20px", minHeight: 34 }}>
          {/* Subtle view toggle — solid colors <-> project images */}
          <button
            onClick={() => setShowFooterImages((v) => !v)}
            aria-label={showFooterImages ? "Show colors" : "Show project images"}
            style={{ position: "absolute", right: 40, bottom: 20, background: "none", border: "none", cursor: "pointer", padding: 6, opacity: 0.35, transition: "opacity 0.25s", color: fg, display: "flex", alignItems: "center" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
          >
            {showFooterImages ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 5.1A9.8 9.8 0 0112 5c5 0 9 4.5 9 7 0 1-.7 2.3-1.9 3.5M6.1 6.1C3.9 7.4 3 9.4 3 12c0 0 4 7 9 7 1.5 0 2.9-.4 4.1-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
            )}
          </button>
        </div>

        {/* Blocks row — centered squares, bottoms aligned so hovered/adjacent blocks extend upward */}
        <div style={{ display: "flex", width: "100%", alignItems: "flex-end", height: blockSize, overflow: "visible" }}>
          {footerBlocks.map((b, i) => {
            // Homepage hover: hovered block extends most, immediate neighbors extend slightly less — upward
            const isHovered = hoveredBlock === i;
            const isNeighbor = hoveredBlock !== null && Math.abs(hoveredBlock - i) === 1;
            const extend = isHovered ? 90 : isNeighbor ? 54 : 0;
            return (
              <motion.div
                key={b.name}
                // Entry wave (same easing/stagger as homepage) + upward height extension on hover
                initial={{ scaleX: 0 }}
                animate={{ scaleX: footerRef.inView ? 1 : 0, height: blockSize + extend }}
                transition={{
                  scaleX: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
                  height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
                onMouseEnter={() => setHoveredBlock(i)}
                onMouseLeave={() => setHoveredBlock(null)}
                style={{ flex: 1, position: "relative", overflow: "visible", backgroundColor: b.color, transformOrigin: "left center", cursor: "pointer" }}
              >
                {/* Clip layer — holds the image + color curtain */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                  <img src={b.img} alt={b.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  {/* Color curtain — slides up to reveal the project image */}
                  <motion.div
                    animate={{ y: showFooterImages ? "-100%" : "0%" }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: [0.77, 0, 0.175, 1] }}
                    style={{ position: "absolute", inset: 0, backgroundColor: b.color }}
                  />
                </div>
                {/* Project name — appears above the hovered block */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: "-50%", y: 8 }}
                      animate={{ opacity: 1, x: "-50%", y: 0 }}
                      exit={{ opacity: 0, x: "-50%", y: 8 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ position: "absolute", bottom: "calc(100% + 14px)", left: "50%", whiteSpace: "nowrap", fontSize: 15, fontWeight: 500, color: fg, letterSpacing: "-0.01em", backgroundColor: inputBg, padding: "6px 12px", borderRadius: 6, pointerEvents: "none" }}
                    >
                      {b.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Strip wipe on close — strips slide in from the right to cover, then page unmounts */}
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
                style={{ position: "absolute", left: 0, top: i * stripH, width: "100%", height: stripH + 1, backgroundColor: stripColor }}
              />
            );
          })}
        </div>
      )}

      {/* Strip wipe on enter — strips start covering the screen, then slide off to the left, revealing the page as they pass */}
      {entering && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none" }}>
          {Array.from({ length: STRIP_COUNT }).map((_, i) => {
            const stripH = window.innerHeight / STRIP_COUNT;
            return (
              <motion.div
                key={i}
                initial={{ x: 0 }}
                animate={{ x: "-100vw" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", left: 0, top: i * stripH, width: "100%", height: stripH + 1, backgroundColor: stripColor }}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
