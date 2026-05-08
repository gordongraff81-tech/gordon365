"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#security-checker", label: t("checker") },
    { href: "#results", label: t("results") },
    { href: "#about", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 2rem", background: scrolled ? "rgba(6,8,22,0.9)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none", transition:"all 0.3s ease" }}>
      <a href={"/" + locale} style={{ display:"flex", alignItems:"center", gap:"10px", fontWeight:800, fontSize:"1.125rem", color:"white", textDecoration:"none" }}>
        <div style={{ width:32, height:32, borderRadius:9, background:"linear-gradient(135deg,#2563FF,#18D5FF)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L3 6V10C3 13.87 6.08 17.47 10 18.5C13.92 17.47 17 13.87 17 10V6L10 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M7.5 10.5L9.5 12.5L13 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span>Gordon<span style={{ color:"#18D5FF" }}>365</span></span>
      </a>
      <div style={{ display:"flex", alignItems:"center", gap:"2rem" }}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} style={{ fontSize:"0.875rem", fontWeight:500, color:"#94A3B8", textDecoration:"none" }}>{link.label}</a>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        <div style={{ display:"flex", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"100px", overflow:"hidden" }}>
          <button onClick={() => { window.location.href = "/en"; }} style={{ padding:"6px 12px", fontSize:"0.75rem", fontWeight:700, textTransform:"uppercase", background: locale === "en" ? "#2563FF" : "transparent", color: locale === "en" ? "white" : "#94A3B8", border:"none", cursor:"pointer" }}>EN</button>
          <button onClick={() => { window.location.href = "/de"; }} style={{ padding:"6px 12px", fontSize:"0.75rem", fontWeight:700, textTransform:"uppercase", background: locale === "de" ? "#2563FF" : "transparent", color: locale === "de" ? "white" : "#94A3B8", border:"none", cursor:"pointer" }}>DE</button>
        </div>
        <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"#2563FF", color:"white", padding:"10px 18px", borderRadius:"6px", fontWeight:700, fontSize:"0.875rem", textDecoration:"none" }}>{t("cta")}</a>
      </div>
    </nav>
  );
}
