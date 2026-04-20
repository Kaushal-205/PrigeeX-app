"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Icon, TokenIcon } from "./icons";
import { useWallet } from "./wallet";

const HERO_STATS = [
  { label: "Total value locked", value: "$27.20M", sub: "Across all pools" },
  { label: "Active investors", value: "15,824", sub: "Wallets onboarded" },
  { label: "Lifetime volume", value: "$1.64M+", sub: "Monthly +18%" },
  { label: "Base protocol fee", value: "1.67%", sub: "Ultra-low DEX" },
];

const HERO_BULLETS = [
  "Tokenize real-world assets, onchain.",
  "Trade on an ultra-low-fee DEX built for Infinium Layer 2.",
  "Stake, claim, thrive — earn high-yield rewards.",
  "Secure · audited · funded by top investors.",
];

const Stat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div
    className="col gap-6 stat-item"
    style={{
      padding: 18,
      background: "color-mix(in oklch, var(--panel) 70%, transparent)",
      border: "1px solid var(--line)",
      borderRadius: 12,
      backdropFilter: "blur(6px)",
    }}
  >
    <div className="caps" style={{ fontSize: 10 }}>{label}</div>
    <div className="num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>
      {value}
    </div>
    {sub && <div style={{ fontSize: 12, color: "var(--text-3)" }}>{sub}</div>}
  </div>
);

const Feature = ({
  icon,
  title,
  copy,
  kpi,
  badge,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  kpi?: string;
  badge?: string;
  href?: string;
}) => {
  const content = (
    <div
      className="panel"
      style={{
        padding: 24,
        textAlign: "left",
        background: "var(--grad-panel)",
        cursor: href ? "pointer" : "default",
        transition: "border-color .15s, transform .15s",
        height: "100%",
      }}
    >
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 24 }}>
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "color-mix(in oklch, var(--accent) 14%, transparent)",
            border: "1px solid color-mix(in oklch, var(--accent) 35%, transparent)",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </span>
        {badge && <span className="chip" style={{ fontSize: 10 }}>{badge}</span>}
      </div>
      <div className="col gap-8">
        <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</div>
        <div className="muted" style={{ fontSize: 14, lineHeight: 1.55 }}>{copy}</div>
        {kpi && <div className="mono" style={{ fontSize: 12, color: "var(--accent)", marginTop: 8 }}>{kpi}</div>}
      </div>
    </div>
  );
  return href ? <Link href={href} style={{ display: "block" }}>{content}</Link> : content;
};

const Step = ({ n, title, copy }: { n: string; title: string; copy: string }) => (
  <div style={{ padding: 28, background: "var(--panel)" }}>
    <div className="mono" style={{ fontSize: 12, color: "var(--accent)", marginBottom: 16 }}>{n}</div>
    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.01em" }}>{title}</div>
    <div className="muted" style={{ fontSize: 14, lineHeight: 1.55 }}>{copy}</div>
  </div>
);

const TokenUtility = ({ label, detail, soon }: { label: string; detail: string; soon?: boolean }) => (
  <div
    className="row gap-12"
    style={{
      padding: "10px 14px",
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: 8,
    }}
  >
    <span style={{ color: soon ? "var(--text-3)" : "var(--accent)" }}>
      <Icon.Check size={14} />
    </span>
    <div className="col gap-4" style={{ flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 12, color: "var(--text-3)" }}>{detail}</div>
    </div>
    {soon && <span className="chip" style={{ fontSize: 10 }}>Soon</span>}
  </div>
);

const TokenStat = ({ label, value }: { label: string; value: string }) => (
  <div className="col gap-4">
    <div className="caps">{label}</div>
    <div className="num" style={{ fontSize: 16, fontWeight: 500 }}>{value}</div>
  </div>
);

const PriceChart = () => {
  const { path, area } = useMemo(() => {
    let y = 60;
    const pts: [number, number][] = [];
    const seed = [0.3, -0.2, 0.4, 0.1, -0.3, 0.5, 0.2, -0.1, 0.3, 0.4, 0.1, -0.2, 0.3, 0.5, 0.2, 0.6, 0.3, 0.4, 0.2, 0.5, 0.7, 0.6, 0.8, 0.5, 0.7];
    for (let i = 0; i < 48; i++) {
      y += (seed[i % seed.length] + Math.sin(i * 0.7) * 0.3) * 2;
      y = Math.max(20, Math.min(90, y));
      pts.push([i * (480 / 47), 100 - y]);
    }
    const p = "M " + pts.map((pt) => pt.join(",")).join(" L ");
    const a = p + ` L ${pts[pts.length - 1][0]},100 L 0,100 Z`;
    return { path: p, area: a };
  }, []);

  return (
    <svg width="100%" viewBox="0 0 480 100" preserveAspectRatio="none" style={{ height: 100 }}>
      <defs>
        <linearGradient id="pgx-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#pgx-gradient)" />
      <path d={path} stroke="var(--accent)" strokeWidth="1.5" fill="none" />
    </svg>
  );
};

const AllocationBar = () => {
  const allocs = [
    { label: "Liquidity & rewards", pct: 35, color: "var(--accent)" },
    { label: "Community", pct: 22, color: "oklch(0.70 0.14 200)" },
    { label: "Treasury", pct: 18, color: "oklch(0.65 0.15 265)" },
    { label: "Team (vested)", pct: 15, color: "oklch(0.60 0.12 295)" },
    { label: "Partners", pct: 10, color: "oklch(0.55 0.10 320)" },
  ];
  return (
    <>
      <div className="row" style={{ height: 8, borderRadius: 4, overflow: "hidden", border: "1px solid var(--line)" }}>
        {allocs.map((a, i) => (
          <div key={i} style={{ width: `${a.pct}%`, background: a.color }} />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, marginTop: 10 }}>
        {allocs.map((a, i) => (
          <div key={i} className="row gap-8" style={{ fontSize: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: a.color, flexShrink: 0 }} />
            <span className="muted" style={{ flex: 1 }}>{a.label}</span>
            <span className="mono">{a.pct}%</span>
          </div>
        ))}
      </div>
    </>
  );
};

/* ─── Hero visual: oversized orbiting X mark ─── */
const HeroMark = () => (
  <div
    aria-hidden
    style={{
      position: "relative",
      width: "100%",
      aspectRatio: "1 / 1",
      maxWidth: 480,
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    <div className="glow-ring" style={{ inset: "10%" }} />
    <svg
      viewBox="0 0 400 400"
      style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}
      fill="none"
    >
      <defs>
        <linearGradient id="hero-x" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7BE9F2" />
          <stop offset="50%" stopColor="#4DB4E8" />
          <stop offset="100%" stopColor="#3E7DDB" />
        </linearGradient>
        <linearGradient id="hero-x-dim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7BE9F2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3E7DDB" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4DB4E8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4DB4E8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#hero-glow)" />
      {/* outer orbit */}
      <ellipse cx="200" cy="200" rx="188" ry="58" stroke="color-mix(in oklch, var(--accent) 40%, transparent)" strokeWidth="1" strokeDasharray="2 6" transform="rotate(-18 200 200)" />
      <ellipse cx="200" cy="200" rx="160" ry="160" stroke="color-mix(in oklch, var(--accent) 20%, transparent)" strokeWidth="1" />
      <ellipse cx="200" cy="200" rx="120" ry="120" stroke="color-mix(in oklch, var(--accent) 12%, transparent)" strokeWidth="1" />
      {/* main X */}
      <g transform="translate(200,200)">
        <path d="M-90,-110 L-50,-110 L90,110 L50,110 Z" fill="url(#hero-x)" />
        <path d="M50,-110 L90,-110 L-50,110 L-90,110 Z" fill="url(#hero-x-dim)" />
      </g>
      {/* orbit dots */}
      <circle cx="200" cy="40" r="4" fill="var(--accent)" />
      <circle cx="360" cy="200" r="3" fill="color-mix(in oklch, var(--accent) 80%, transparent)" />
      <circle cx="100" cy="320" r="3" fill="color-mix(in oklch, var(--accent) 70%, transparent)" />
    </svg>
  </div>
);

/* ─── Investor partner strip ─── */
const Partners = () => (
  <div className="col gap-16" style={{ alignItems: "center" }}>
    <div className="caps" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
      Backed by leading investors
    </div>
    <div className="partner-strip" style={{ width: "100%", maxWidth: 900 }}>
      <PartnerLogo name="Arbitrum" />
      <PartnerLogo name="Coinbase" />
      <PartnerLogo name="Aptos" />
      <PartnerLogo name="Pantera" />
      <PartnerLogo name="Crossroad" />
    </div>
  </div>
);

const PartnerLogo = ({ name }: { name: string }) => (
  <div className="partner-logo" aria-label={name}>
    <span
      style={{
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        fontFamily: "var(--font)",
      }}
    >
      {name}
    </span>
  </div>
);

const MiniTokenRow = ({ symbol, amount, usd, label }: { symbol: string; amount: string; usd: string; label: string }) => (
  <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 8, padding: 12 }}>
    <div className="row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontSize: 11, color: "var(--text-3)" }}>{label}</span>
    </div>
    <div className="row" style={{ justifyContent: "space-between" }}>
      <span className="num" style={{ fontSize: 18, fontWeight: 500 }}>{amount}</span>
      <div className="row gap-6">
        <TokenIcon symbol={symbol} size="sm" />
        <span style={{ fontSize: 13, fontWeight: 500 }}>{symbol}</span>
      </div>
    </div>
    <div className="num" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 4 }}>{usd}</div>
  </div>
);

const MiniSwap = () => (
  <div style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 12, padding: 18 }}>
    <div className="row" style={{ justifyContent: "space-between", marginBottom: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 600 }}>Swap</div>
      <div className="chip" style={{ fontSize: 10 }}>Slippage 0.5%</div>
    </div>
    <div className="col gap-8">
      <MiniTokenRow symbol="ETH" amount="1.25" usd="$4,312.50" label="You pay" />
      <div style={{ alignSelf: "center" }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "var(--panel-2)",
            border: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-2)",
          }}
        >
          <Icon.Swap size={12} />
        </div>
      </div>
      <MiniTokenRow symbol="PGX" amount="10,228.4" usd="$4,312.48" label="You receive" />
    </div>
    <div className="row" style={{ justifyContent: "space-between", marginTop: 14, fontSize: 11, color: "var(--text-3)" }}>
      <span>Rate</span>
      <span className="mono">1 ETH = 8,182.7 PGX</span>
    </div>
  </div>
);

const MiniStake = () => (
  <div style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 12, padding: 18 }}>
    <div className="row" style={{ justifyContent: "space-between", marginBottom: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 600 }}>Staking</div>
      <div className="chip accent" style={{ fontSize: 10 }}>APR 28.4%</div>
    </div>
    <div className="col gap-4" style={{ marginBottom: 14 }}>
      <span style={{ fontSize: 11, color: "var(--text-3)" }} className="caps">Staked</span>
      <span className="num" style={{ fontSize: 22, fontWeight: 500 }}>48,200 PGX</span>
      <span className="num" style={{ fontSize: 12, color: "var(--text-2)" }}>≈ $20,334.76</span>
    </div>
    <div className="col gap-8">
      <div className="row" style={{ justifyContent: "space-between", fontSize: 11 }}>
        <span style={{ color: "var(--text-3)" }}>Mode</span>
        <span className="mono">Flexible</span>
      </div>
      <div style={{ height: 4, background: "var(--line)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: "72%", height: "100%", background: "var(--accent)" }} />
      </div>
      <div className="row" style={{ justifyContent: "space-between", fontSize: 10, color: "var(--text-3)" }}>
        <span>Accrued this epoch</span>
        <span>Ongoing</span>
      </div>
    </div>
    <div className="hairline" style={{ margin: "14px 0" }} />
    <div className="col gap-4">
      <span className="caps">Pending rewards</span>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="num" style={{ fontSize: 16, fontWeight: 500, color: "var(--accent)" }}>847.22 PGX</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>claim →</span>
      </div>
    </div>
  </div>
);

const AppPreview = () => (
  <div
    className="panel app-preview"
    style={{
      padding: 20,
      background: "var(--panel)",
      boxShadow: "0 40px 80px -20px rgba(0,0,0,.5), 0 0 0 1px var(--line)",
    }}
  >
    <div className="row app-preview-chrome" style={{ justifyContent: "space-between", marginBottom: 14 }}>
      <div className="row gap-8">
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "oklch(0.55 0.15 25)" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "oklch(0.70 0.15 85)" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "oklch(0.70 0.15 150)" }} />
      </div>
      <div className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>app.prigeex.xyz/swap</div>
      <div style={{ width: 40 }} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 14 }} className="app-preview-grid">
      <MiniSwap />
      <MiniStake />
    </div>
    <style>{`
      @media (max-width: 720px) {
        .app-preview-grid { grid-template-columns: 1fr !important; }
        .app-preview-chrome { display: none !important; }
      }
    `}</style>
  </div>
);

export const LandingPage = () => {
  const wallet = useWallet();

  return (
    <main>
      {/* ─── HERO ─── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div
          className="grid-bg"
          style={{
            position: "absolute",
            inset: 0,
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black 35%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black 35%, transparent 80%)",
            opacity: 0.35,
          }}
        />
        <div
          className="glow-ring"
          style={{
            top: "-15%", right: "-10%", width: "60%", height: "60%",
          }}
        />
        <div className="container-app landing-hero" style={{ position: "relative", paddingTop: 80, paddingBottom: 48, paddingLeft: 32, paddingRight: 32 }}>
          <div
            className="hero-split"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div className="col gap-20">
              <div className="chip accent hero-eyebrow" style={{ alignSelf: "flex-start" }}>
                <span className="dot pulse" style={{ background: "var(--accent)" }} />
                <span>Tokenize · Trade · Thrive</span>
              </div>
              <h1
                className="display"
                style={{
                  fontSize: "clamp(42px, 7vw, 84px)",
                  margin: 0,
                }}
              >
                Elevate <span className="display-italic text-grad">DeFi</span>
                <br />
                Investments.
              </h1>
              <p
                style={{
                  fontSize: 18,
                  color: "var(--text-2)",
                  maxWidth: 560,
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                PrigeeX is an ultra-low-fee DEX and rewards protocol for tokenized real-world
                assets — built on Infinium Layer 2. Secure, audited, and funded by top investors.
              </p>

              <div
                className="hero-bullets"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 24px",
                  maxWidth: 620,
                }}
              >
                {HERO_BULLETS.map((b) => (
                  <div key={b} className="hero-bullet">
                    <span className="mark">
                      <Icon.Check size={10} />
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="row gap-12" style={{ flexWrap: "wrap" }}>
                <Link href="/swap" className="btn btn-grad btn-lg">
                  Launch DApp <Icon.Arrow dir="right" />
                </Link>
                <a href="#litepaper" className="btn btn-ghost btn-lg">
                  Investor deck <Icon.Ext />
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <HeroMark />
            </div>
          </div>

          <div
            className="hero-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 14,
              marginTop: 56,
            }}
          >
            {HERO_STATS.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <Partners />
          </div>
        </div>
      </section>

      {/* ─── APP PREVIEW ─── */}
      <section className="container-app landing-section" style={{ paddingTop: 64, paddingBottom: 40, paddingLeft: 32, paddingRight: 32 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <AppPreview />
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="container-app landing-section" style={{ paddingTop: 64, paddingBottom: 40, paddingLeft: 32, paddingRight: 32 }}>
        <div
          className="row"
          style={{ justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}
        >
          <div className="col gap-10" style={{ maxWidth: 620 }}>
            <span className="caps">The platform</span>
            <h2 className="display" style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)" }}>
              A complete DeFi loop, <span className="display-italic text-grad">in one surface.</span>
            </h2>
          </div>
          <p className="muted" style={{ maxWidth: 360, margin: 0, lineHeight: 1.6 }}>
            Four primitives, one token. Every action routes through audited contracts and
            settles directly to the wallet you connect.
          </p>
        </div>

        <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <Feature icon={<Icon.Globe />} title="Tokenize RWA" copy="Bring real-world assets onchain with verifiable on-ledger provenance and compliant issuance rails." kpi="Issuer rails · Q3" badge="Roadmap" />
          <Feature icon={<Icon.Swap />} title="Ultra-low-fee DEX" copy="Best-route swaps on Infinium Layer 2 with slippage controls, MEV protection, and 1.67% base fee." kpi="1.67% base fee" href="/swap" />
          <Feature icon={<Icon.Bolt />} title="Stake & Earn" copy="Stake PGX into the on-chain reward pool. Rewards accrue every second, claimable anytime." kpi="Live APR · Sepolia" href="/stake" />
          <Feature icon={<Icon.Shield />} title="Secure & Audited" copy="Non-custodial architecture. ReentrancyGuard-protected contracts, independent audits, backed by top investors." kpi="Funded · audited" href="/rewards" />
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="container-app landing-section" style={{ paddingTop: 40, paddingBottom: 32, paddingLeft: 32, paddingRight: 32 }}>
        <div className="panel" style={{ padding: 40, background: "var(--grad-panel)" }}>
          <div className="row" style={{ justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div className="col gap-10">
              <span className="caps">How it works</span>
              <h2 className="display" style={{ margin: 0, fontSize: 30 }}>
                Three steps. No custody. <span className="display-italic text-grad">Your keys, always.</span>
              </h2>
            </div>
            <Link href="/swap" className="btn btn-ghost">
              Try the flow <Icon.Arrow dir="right" />
            </Link>
          </div>

          <div
            className="steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 1,
              background: "var(--line)",
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid var(--line)",
            }}
          >
            <Step n="01" title="Connect" copy="Link MetaMask, WalletConnect, Coinbase Wallet, or any EIP-1193 provider." />
            <Step n="02" title="Approve once" copy="One-time token approval per asset. Revoke anytime from the approvals panel." />
            <Step n="03" title="Swap or stake" copy="Sign the transaction in your wallet. Funds settle directly to your address." />
          </div>
        </div>
      </section>

      {/* ─── TOKEN ─── */}
      <section className="container-app landing-section" style={{ paddingTop: 40, paddingBottom: 32, paddingLeft: 32, paddingRight: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="pgx-token-grid">
          <div className="col gap-16" style={{ justifyContent: "center" }}>
            <span className="caps">The token</span>
            <h2 className="display" style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)" }}>
              PGX — utility today, <br />
              <span className="display-italic text-grad">governance tomorrow.</span>
            </h2>
            <p className="muted" style={{ fontSize: 16, maxWidth: 520, lineHeight: 1.6 }}>
              PGX powers the PrigeeX ecosystem. Stake it for yield, hold it for fee
              discounts up to 40%, earn it through trading rebates — and later, vote with
              it on protocol direction.
            </p>
            <div className="col gap-8" style={{ marginTop: 8 }}>
              <TokenUtility label="Staking rewards" detail="Variable APR, continuous emissions" />
              <TokenUtility label="Fee discounts" detail="Up to 40% off swap fees by tier" />
              <TokenUtility label="Rebates & bounties" detail="Trade-to-earn and quest rewards" />
              <TokenUtility label="Governance" detail="Vote on emissions & grants (Q3)" soon />
            </div>
          </div>

          <div className="panel" style={{ padding: 28 }}>
            <div className="row gap-12" style={{ marginBottom: 20, flexWrap: "wrap" }}>
              <TokenIcon symbol="PGX" size="lg" />
              <div className="col gap-4">
                <div style={{ fontSize: 16, fontWeight: 600 }}>PrigeeX</div>
                <div className="row gap-8 mono" style={{ fontSize: 12, color: "var(--text-3)" }}>
                  <span>PGX</span>
                  <span>·</span>
                  <span>0x828B…cf0c</span>
                </div>
              </div>
              <div className="col gap-4" style={{ marginLeft: "auto", alignItems: "flex-end" }}>
                <div className="num" style={{ fontSize: 22, fontWeight: 500 }}>$0.4218</div>
                <div className="num" style={{ fontSize: 12, color: "var(--ok)" }}>+3.42% · 24h</div>
              </div>
            </div>

            <PriceChart />

            <div className="token-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 20 }}>
              <TokenStat label="Market cap" value="$84.3M" />
              <TokenStat label="Circulating" value="200.0M" />
              <TokenStat label="Total supply" value="1.0B" />
            </div>

            <div className="hairline" style={{ margin: "20px 0" }} />

            <div className="col gap-8">
              <div className="caps">Allocation</div>
              <AllocationBar />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="container-app landing-section" style={{ paddingTop: 40, paddingBottom: 80, paddingLeft: 32, paddingRight: 32 }}>
        <div
          className="panel landing-cta"
          style={{
            padding: 56,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(160deg, color-mix(in oklch, var(--accent-2) 12%, var(--panel)) 0%, var(--panel) 55%)",
            borderColor: "color-mix(in oklch, var(--accent-2) 35%, var(--line))",
          }}
        >
          <div
            className="grid-bg"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.25,
              maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            }}
          />
          <div className="glow-ring" style={{ top: "-30%", left: "30%", width: "40%", height: "70%" }} />
          <div style={{ position: "relative" }}>
            <div className="caps" style={{ marginBottom: 16 }}>Ready when you are</div>
            <h2 className="display" style={{ fontSize: "clamp(30px, 5vw, 52px)", margin: 0 }}>
              Elevate your <span className="display-italic text-grad">finance.</span>
            </h2>
            <p className="muted" style={{ fontSize: 16, marginTop: 14, marginBottom: 32, maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              Connect a wallet and start with a swap, or stake PGX straight away.
              Your assets never leave your address.
            </p>
            <div className="row gap-12" style={{ justifyContent: "center", flexWrap: "wrap" }}>
              {!wallet.connected && (
                <button className="btn btn-grad btn-lg" onClick={wallet.open}>
                  <Icon.Wallet /> Connect wallet
                </button>
              )}
              <Link href="/swap" className="btn btn-ghost btn-lg">
                Launch DApp <Icon.Arrow dir="right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
