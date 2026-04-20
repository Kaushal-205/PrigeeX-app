"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";
import { useWallet } from "./wallet";
import { useToast } from "./toast";
import { shortAddr } from "@/lib/format";

const links = [
  { href: "/", label: "Home" },
  { href: "/swap", label: "Swap" },
  { href: "/stake", label: "Stake" },
  { href: "/rewards", label: "Rewards" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

const pageTitle = (pathname: string) => {
  if (pathname === "/") return "PrigeeX";
  if (pathname.startsWith("/swap")) return "Swap";
  if (pathname.startsWith("/stake")) return "Stake & Earn";
  if (pathname.startsWith("/rewards")) return "Rewards";
  return "PrigeeX";
};

export const Nav = () => {
  const pathname = usePathname();
  const wallet = useWallet();
  const toast = useToast();
  const [profileOpen, setProfileOpen] = useState(false);

  const copyAddr = () => {
    if (wallet.address) {
      navigator.clipboard?.writeText(wallet.address).catch(() => {});
      toast({ title: "Address copied" });
    }
  };

  return (
    <header
      className="app-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in oklch, var(--bg) 85%, transparent)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container-app row nav-header" style={{ height: 64, gap: 16, justifyContent: "space-between" }}>
        {/* Mobile title (replaces logo at small widths) */}
        <div className="app-mobile-title" aria-hidden>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {pageTitle(pathname)}
          </span>
        </div>

        <Link href="/" className="row nav-logo" style={{ padding: 0, alignItems: "center", flexShrink: 0, gap: 10 }}>
          <Icon.Logo size={28} />
          <span className="nav-wordmark" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
            PrigeeX
          </span>
          <span
            className="mono mvp-badge"
            style={{
              fontSize: 10,
              padding: "2px 7px",
              borderRadius: 999,
              border: "1px solid color-mix(in oklch, var(--accent) 35%, transparent)",
              color: "var(--accent)",
              background: "color-mix(in oklch, var(--accent) 10%, transparent)",
              marginLeft: 2,
              letterSpacing: "0.06em",
            }}
          >
            BETA
          </span>
        </Link>

        <nav className="row gap-4 md-hide" style={{ flex: 1 }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link ${isActive(pathname, l.href) ? "active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="row gap-8" style={{ flexShrink: 0 }}>
          <div className="chip sm-hide">
            <span className="dot pulse" />
            <span className="mono">PGX</span>
            <span>$0.4218</span>
            <span style={{ color: "var(--ok)" }} className="mono">+3.42%</span>
          </div>

          {wallet.connected && wallet.address ? (
            <div style={{ position: "relative" }}>
              <button className="btn btn-panel app-wallet-btn" onClick={() => setProfileOpen(!profileOpen)}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: `conic-gradient(from ${parseInt(wallet.address.slice(2, 4), 16)}deg, var(--accent), oklch(0.70 0.15 240), var(--accent))`,
                    display: "inline-block",
                  }}
                />
                <span className="mono sm-hide">{shortAddr(wallet.address)}</span>
                <Icon.Arrow dir="down" size={12} />
              </button>
              {profileOpen && (
                <>
                  <div
                    style={{ position: "fixed", inset: 0, zIndex: 10 }}
                    onClick={() => setProfileOpen(false)}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      width: 280,
                      maxWidth: "calc(100vw - 32px)",
                      zIndex: 20,
                      background: "var(--panel)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius-lg)",
                      padding: 8,
                      boxShadow: "0 12px 32px -8px rgba(0,0,0,.4)",
                    }}
                  >
                    <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--line)", marginBottom: 6 }}>
                      <div className="row gap-8" style={{ justifyContent: "space-between" }}>
                        <span className="caps">Connected · {wallet.providerName}</span>
                        <span className="dot" />
                      </div>
                      <div className="row gap-8" style={{ marginTop: 6 }}>
                        <span className="mono" style={{ fontSize: 13 }}>{shortAddr(wallet.address)}</span>
                        <button onClick={copyAddr} style={{ color: "var(--text-3)" }}>
                          <Icon.Copy />
                        </button>
                      </div>
                    </div>
                    <div style={{ padding: "6px 12px" }}>
                      <div className="caps" style={{ marginBottom: 6 }}>Network</div>
                      <div className="row gap-8" style={{ padding: "6px 0", fontSize: 13 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(0.70 0.15 260)" }} />
                        Sepolia
                      </div>
                    </div>
                    <div className="hairline" style={{ margin: "6px 0" }} />
                    <button
                      onClick={() => {
                        wallet.disconnect();
                        setProfileOpen(false);
                      }}
                      className="row gap-8"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: 6,
                        fontSize: 13,
                        color: "var(--danger)",
                      }}
                    >
                      <Icon.Close size={14} /> Disconnect
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button className="btn btn-grad app-wallet-btn" onClick={wallet.open}>
              <Icon.Wallet />
              <span className="sm-hide">Connect wallet</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export const MobileTabBar = () => {
  const pathname = usePathname();
  const tabs: { href: string; label: string; icon: React.ReactNode }[] = [
    { href: "/", label: "Home", icon: <TabIcon.Home /> },
    { href: "/swap", label: "Swap", icon: <Icon.Swap size={20} /> },
    { href: "/stake", label: "Stake", icon: <Icon.Bolt size={20} /> },
    { href: "/rewards", label: "Rewards", icon: <Icon.Gift size={20} /> },
  ];

  return (
    <nav className="app-tabbar" aria-label="Primary">
      <div className="app-tabbar-inner">
        {tabs.map((t) => {
          const active = isActive(pathname, t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`app-tab${active ? " active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="app-tab-icon">{t.icon}</span>
              <span className="app-tab-label">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

const TabIcon = {
  Home: ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M3 10l7-6 7 6v7a1 1 0 01-1 1h-4v-5H8v5H4a1 1 0 01-1-1v-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
};

export const Footer = () => (
  <footer className="app-footer" style={{ borderTop: "1px solid var(--line)", marginTop: 80, padding: "32px 0" }}>
    <div
      className="container-app row footer-inner"
      style={{ justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}
    >
      <div className="row gap-10" style={{ alignItems: "center" }}>
        <Icon.Logo size={22} />
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1 }}>PrigeeX</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>Tokenize · Trade · Thrive</span>
      </div>
      <div className="row gap-16 footer-links" style={{ fontSize: 13, color: "var(--text-2)" }}>
        <a href="#docs">Docs</a>
        <a href="#gov">Governance</a>
        <a href="#audit">Audit</a>
        <a href="#github">
          GitHub <Icon.Ext />
        </a>
      </div>
    </div>
  </footer>
);
