import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import customIconsCard from "../../imports/image-10.png";
import blueprintHero from "../../imports/image-9.png";
import t20MumbaiCard from "../../imports/T20_Mumbai.jpg";

const STRIP_COUNT = 12;
const GENTLE = [0.16, 1, 0.3, 1] as const;

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

const FAQ_ITEMS = [
  {
    q: "How do I start a project with you ?",
    a: "You can reach out to me through the contact form or email me directly, and we can go from there.",
  },
  {
    q: "How much time is typically needed to finish a project ?",
    a: "The timeline for project completion also varies depending on its complexity. I try to establish a realistic work schedule during the planning phase of my projects.",
  },
  {
    q: "Are you currently open to work ?",
    a: "Yes! I am currently open to work. Please do email, and so we can get in contact.",
  },
  {
    q: "How can I contact you to initiate a project ?",
    a: "You can reach me through the contact form on my website or by sending an email to the address listed on the contact page.",
  },
];

function useInView(threshold = 0.2) {
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

type Props = {
  dark: boolean;
  onBack: () => void;
};

export function ContactPage({ dark, onBack }: Props) {
  const [closing, setClosing] = useState(false);
  const [entering, setEntering] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const [showFooterImages, setShowFooterImages] = useState(false);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const lastDone = ((STRIP_COUNT - 1) * 0.06 + 0.5) * 1000;
    const t = setTimeout(() => setEntering(false), lastDone + 40);
    return () => clearTimeout(t);
  }, []);

  const bg = dark ? "#111" : "#fff";
  const fg = dark ? "#ffffff" : "#111";
  const border = dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)";
  const stripColor = dark ? "#111" : "#fff";
  const cardBg = dark ? "#1a1a1c" : "#eef0f2";
  const inputBg = dark ? "#242426" : "#e1e4e8";
  const blockSize = (vw / footerBlocks.length) * 0.8;

  const footerRef = useInView(0.2);

  const handleClose = () => {
    setClosing(true);
    const lastDone = ((STRIP_COUNT - 1) * 0.06 + 0.5) * 1000;
    setTimeout(onBack, lastDone + 40);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2600);
    setForm({ name: "", email: "", message: "" });
  };

  const label = {
    fontSize: 11,
    color: fg,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    display: "flex",
    alignItems: "center",
    gap: 10,
  };
  const dot = (
    <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: fg, display: "inline-block" }} />
  );

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: bg,
        zIndex: 50,
        overflowY: "auto",
        fontFamily: "sans-serif",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* Nav */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          backgroundColor: bg,
          transition: "background-color 0.4s ease",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <rect width="14" height="28" fill={fg} />
          <rect x="14" width="14" height="14" fill={fg} />
        </svg>
        <button
          onClick={handleClose}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: 0 }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke={fg} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 13, color: fg }}>Back to home</span>
        </button>
      </div>

      {/* ── SECTION 1: GET IN TOUCH ── */}
      <div
        style={{
          display: "flex",
          gap: 48,
          alignItems: "flex-start",
          padding: "72px 48px 100px",
          flexWrap: "wrap",
        }}
      >
        {/* Left col */}
        <div style={{ flex: "0 0 38%", minWidth: 260 }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: GENTLE }}
            style={{ ...label, margin: "0 0 18px" }}
          >
            {dot} Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: GENTLE }}
            style={{ fontSize: "clamp(44px, 5.5vw, 72px)", fontWeight: 500, color: fg, letterSpacing: "-0.02em", lineHeight: 1, margin: "0 0 52px" }}
          >
            GET IN<br />TOUCH
          </motion.h1>

          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="1.5" stroke={fg} strokeWidth="1.4" />
                  <path d="M4 7l8 6 8-6" stroke={fg} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              text: "arnavgraham.des@gmail.com",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 12l5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" stroke={fg} strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              ),
              text: "+91 7760082808",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" stroke={fg} strokeWidth="1.4" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.4" stroke={fg} strokeWidth="1.4" />
                </svg>
              ),
              text: "Banaglore, Karnataka. India",
            },
          ].map((row, i) => (
            <motion.div
              key={row.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.18 + i * 0.1, ease: GENTLE }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 0",
                borderBottom: `1px solid ${border}`,
              }}
            >
              <span style={{ color: fg, display: "flex", flexShrink: 0 }}>{row.icon}</span>
              <span style={{ fontSize: 16, color: fg, fontWeight: 300 }}>{row.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Right col — form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: GENTLE }}
          style={{ flex: 1, minWidth: 300, backgroundColor: cardBg, borderRadius: 14, padding: "32px 28px" }}
        >
          <h3 style={{ fontSize: 20, fontWeight: 500, color: fg, margin: "0 0 26px" }}>Send Message</h3>
          <form onSubmit={handleSubmit}>
            {(["name", "email"] as const).map((key) => (
              <div key={key} style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 13, color: fg, marginBottom: 8, opacity: 0.85 }}>
                  {key === "name" ? "Name" : "Email"}
                </label>
                <input
                  type={key === "email" ? "email" : "text"}
                  required
                  value={form[key]}
                  onChange={(e) => setForm((s) => ({ ...s, [key]: e.target.value }))}
                  placeholder={key === "name" ? "Your Name" : "example@gmail.com"}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: inputBg,
                    border: "none",
                    borderRadius: 8,
                    padding: "13px 15px",
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "block", fontSize: 13, color: fg, marginBottom: 8, opacity: 0.85 }}>Message</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                placeholder="Type Your Message"
                rows={7}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: inputBg,
                  border: "none",
                  borderRadius: 8,
                  padding: "13px 15px",
                  color: fg,
                  fontSize: 14,
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                background: inputBg,
                border: "none",
                borderRadius: 8,
                padding: "15px",
                color: fg,
                fontSize: 14,
                cursor: "pointer",
                transition: "background 0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = dark ? "#2e2e32" : "#d6d4ce")}
              onMouseLeave={(e) => (e.currentTarget.style.background = inputBg)}
            >
              {sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${border}`, margin: "0 48px" }} />

      {/* ── SECTION 2: QUICK ANSWERS ── */}
      <div
        style={{
          display: "flex",
          gap: 48,
          alignItems: "flex-start",
          padding: "90px 48px 100px",
          flexWrap: "wrap",
        }}
      >
        {/* Left col */}
        <div style={{ flex: "0 0 38%", minWidth: 240 }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: GENTLE }}
            style={{ ...label, margin: "0 0 20px" }}
          >
            {dot} FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08, ease: GENTLE }}
            style={{ fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 700, color: fg, letterSpacing: "-0.02em", lineHeight: 0.95, margin: 0 }}
          >
            QUICK<br />ANSWERS
          </motion.h2>
        </div>

        {/* Right col — accordion */}
        <div style={{ flex: 1, minWidth: 300 }}>
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: GENTLE }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  borderTop: `1px solid ${border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "26px 0",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 16,
                }}
              >
                <span style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: fg, fontWeight: 400 }}>{item.q}</span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", flexShrink: 0, color: fg }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke={fg} strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{ fontSize: 15, color: fg, opacity: 0.65, lineHeight: 1.65, margin: "0 0 24px", paddingRight: 36 }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Bottom border on last item */}
              {i === FAQ_ITEMS.length - 1 && (
                <div style={{ borderTop: `1px solid ${border}` }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── FOOTER: color blocks ── */}
      <div ref={footerRef.ref} style={{ paddingTop: 60 }}>
        {/* Eye toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 40px 20px" }}>
          <button
            onClick={() => setShowFooterImages((v) => !v)}
            aria-label={showFooterImages ? "Show colors" : "Show project images"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6, opacity: 0.35, transition: "opacity 0.25s", color: fg, display: "flex", alignItems: "center" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
          >
            {showFooterImages ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 5.1A9.8 9.8 0 0112 5c5 0 9 4.5 9 7 0 1-.7 2.3-1.9 3.5M6.1 6.1C3.9 7.4 3 9.4 3 12c0 0 4 7 9 7 1.5 0 2.9-.4 4.1-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            )}
          </button>
        </div>

        <div style={{ display: "flex", width: "100%", alignItems: "flex-end", height: blockSize, overflow: "visible" }}>
          {footerBlocks.map((b, i) => {
            const isHovered = hoveredBlock === i;
            const isNeighbor = hoveredBlock !== null && Math.abs(hoveredBlock - i) === 1;
            const extend = isHovered ? 90 : isNeighbor ? 54 : 0;
            return (
              <motion.div
                key={b.name}
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
                <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                  <img src={b.img} alt={b.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <motion.div
                    animate={{ y: showFooterImages ? "-100%" : "0%" }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: [0.77, 0, 0.175, 1] }}
                    style={{ position: "absolute", inset: 0, backgroundColor: b.color }}
                  />
                </div>
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: "-50%", y: 8 }}
                      animate={{ opacity: 1, x: "-50%", y: 0 }}
                      exit={{ opacity: 0, x: "-50%", y: 8 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ position: "absolute", bottom: "calc(100% + 14px)", left: "50%", whiteSpace: "nowrap", fontSize: 14, fontWeight: 500, color: fg, backgroundColor: cardBg, padding: "6px 12px", borderRadius: 6, pointerEvents: "none" }}
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

      {/* Strip wipe on close */}
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

      {/* Strip wipe on enter */}
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
