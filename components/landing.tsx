"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Icon, TokenIcon } from "./icons";
import { useWallet } from "./wallet";

const Stat = ({ label, value, delta }: { label: string; value: string; delta?: string }) => (
  <div className="col gap-4" style={{ alignItems: "center" }}>
    <div className="caps">{label}</div>
    <div className="row gap-6" style={{ alignItems: "baseline" }}>
      <span className="num" style={{ fontSize: 20, fontWeight: 500 }}>{value}</span>
      {delta && <span className="num" style={{ fontSize: 12, color: "var(--ok)" }}>{delta}</span>}
    </div>
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
        background: "var(--panel)",
        cursor: href ? "pointer" : "default",
        transition: "border-color .15s, transform .15s",
        height: "100%",
      }}
    >
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 24 }}>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "color-mix(in oklch, var(--accent) 14%, transparent)",
            border: "1px solid color-mix(in oklch, var(--accent) 30%, transparent)",
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
        <div style={{ fontSize: 18, fontWeight: 600 }}>{title}</div>
        <div className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>{copy}</div>
        {kpi && <div className="mono" style={{ fontSize: 12, color: "var(--accent)", marginTop: 8 }}>{kpi}</div>}
      </div>
    </div>
  );
  return href ? <Link href={href} style={{ display: "block" }}>{content}</Link> : content;
};

const Step = ({ n, title, copy }: { n: string; title: string; copy: string }) => (
  <div style={{ padding: 28, background: "var(--panel)" }}>
    <div className="mono" style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 16 }}>{n}</div>
    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{title}</div>
    <div className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>{copy}</div>
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
    { label: "Treasury", pct: 18, color: "oklch(0.65 0.13 270)" },
    { label: "Team (vested)", pct: 15, color: "oklch(0.60 0.10 30)" },
    { label: "Partners", pct: 10, color: "oklch(0.55 0.08 320)" },
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
    className="panel"
    style={{
      padding: 20,
      background: "var(--panel)",
      boxShadow: "0 40px 80px -20px rgba(0,0,0,.5), 0 0 0 1px var(--line)",
    }}
  >
    <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
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
    <style>{`@media (max-width: 720px) { .app-preview-grid { grid-template-columns: 1fr !important; } }`}</style>
  </div>
);

export const LandingPage = () => {
  const wallet = useWallet();

  return (
    <main>
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div
          className="grid-bg"
          style={{
            position: "absolute",
            inset: 0,
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)",
            opacity: 0.5,
          }}
        />
        <div className="container-app" style={{ position: "relative", padding: "80px 32px 40px" }}>
          <div className="col gap-16" style={{ alignItems: "center", textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
            <div className="chip accent">
              <span className="dot pulse" style={{ background: "var(--accent)" }} />
              <span>Sepolia beta · Staking live</span>
            </div>
            <h1
              style={{
                fontSize: "clamp(38px, 6.5vw, 76px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                margin: 0,
                lineHeight: 1.02,
              }}
            >
              Swap, stake, and earn,{" "}
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "var(--accent)",
                }}
              >
                without giving up your keys.
              </span>
            </h1>
            <p style={{ fontSize: 18, color: "var(--text-2)", maxWidth: 620, margin: 0, lineHeight: 1.5 }}>
              PrigeeX is a non-custodial exchange and rewards layer for the PGX ecosystem.
              Connect any wallet. Your assets never leave your address.
            </p>
            <div className="row gap-12" style={{ marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/swap" className="btn btn-primary btn-lg">
                Launch app <Icon.Arrow dir="right" />
              </Link>
              <a href="#litepaper" className="btn btn-ghost btn-lg">
                Read litepaper <Icon.Ext />
              </a>
            </div>
            <div className="row gap-24" style={{ marginTop: 20, flexWrap: "wrap", justifyContent: "center" }}>
              <Stat label="Total value locked" value="$148.2M" delta="+4.8%" />
              <div style={{ width: 1, height: 32, background: "var(--line)" }} className="sm-hide" />
              <Stat label="24h volume" value="$12.4M" />
              <div style={{ width: 1, height: 32, background: "var(--line)" }} className="sm-hide" />
              <Stat label="Wallets connected" value="38,214" />
              <div style={{ width: 1, height: 32, background: "var(--line)" }} className="sm-hide" />
              <Stat label="Stakers earning" value="9,807" />
            </div>
          </div>
          <div style={{ position: "relative", marginTop: 64, maxWidth: 960, marginLeft: "auto", marginRight: "auto" }}>
            <AppPreview />
          </div>
        </div>
      </section>

      <section className="container-app" style={{ padding: "80px 32px 40px" }}>
        <div
          className="row"
          style={{ justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}
        >
          <div className="col gap-8" style={{ maxWidth: 560 }}>
            <span className="caps">What you can do</span>
            <h2 style={{ margin: 0, fontSize: 40, letterSpacing: "-0.02em", fontWeight: 600 }}>
              A complete DeFi loop, in one surface.
            </h2>
          </div>
          <p className="muted" style={{ maxWidth: 360, margin: 0 }}>
            Four primitives, one token. Every action routes through audited contracts and
            settles directly to the wallet you connect.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <Feature icon={<Icon.Swap />} title="Swap" copy="Best-route swaps across liquidity pools with slippage controls and MEV protection." kpi="0.30% fee" href="/swap" />
          <Feature icon={<Icon.Bolt />} title="Stake" copy="Stake PGX for flexible yield paid out continuously from the on-chain reward pool." kpi="Live APR on Sepolia" href="/stake" />
          <Feature icon={<Icon.Gift />} title="Rewards" copy="Claim staking emissions, trading rebates, and ecosystem bounties in one view." kpi="Weekly epochs" href="/rewards" />
          <Feature icon={<Icon.Globe />} title="Govern" copy="PGX grants voice on fee tiers, emissions, and ecosystem grants. Vote on-chain." kpi="Coming Q3" badge="Soon" />
        </div>
      </section>

      <section className="container-app" style={{ padding: "60px 32px" }}>
        <div className="panel" style={{ padding: 40 }}>
          <div className="row" style={{ justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div className="col gap-8">
              <span className="caps">How it works</span>
              <h2 style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em" }}>
                Three steps. No custody. No seed phrases shared.
              </h2>
            </div>
            <Link href="/swap" className="btn btn-ghost">
              Try the flow <Icon.Arrow dir="right" />
            </Link>
          </div>

          <div
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

      <section className="container-app" style={{ padding: "60px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="pgx-token-grid">
          <div className="col gap-16" style={{ justifyContent: "center" }}>
            <span className="caps">The token</span>
            <h2 style={{ margin: 0, fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em" }}>
              PGX, utility today. <br />
              <span style={{ color: "var(--text-2)" }}>governance tomorrow.</span>
            </h2>
            <p className="muted" style={{ fontSize: 16, maxWidth: 520 }}>
              PGX powers the PrigeeX ecosystem. Stake it for yield, hold it for fee
              discounts up to 40%, earn it through trading rebates, and later, vote with it on protocol direction.
            </p>
            <div className="col gap-8" style={{ marginTop: 8 }}>
              <TokenUtility label="Staking rewards" detail="Variable APR, weekly emissions" />
              <TokenUtility label="Fee discounts" detail="Up to 40% off swap fees by tier" />
              <TokenUtility label="Rebates & bounties" detail="Trade-to-earn and quest rewards" />
              <TokenUtility label="Governance" detail="Vote on emissions & grants (Q3)" soon />
            </div>
          </div>

          <div className="panel" style={{ padding: 28 }}>
            <div className="row gap-12" style={{ marginBottom: 20 }}>
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 20 }}>
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

      <section className="container-app" style={{ padding: "40px 32px 80px" }}>
        <div className="panel" style={{ padding: 48, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div
            className="grid-bg"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.3,
              maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            }}
          />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontSize: 36, margin: 0, fontWeight: 600, letterSpacing: "-0.02em" }}>Ready to move?</h2>
            <p className="muted" style={{ fontSize: 16, marginTop: 10, marginBottom: 28 }}>
              Connect a wallet and start with a swap, or stake PGX straight away.
            </p>
            <div className="row gap-12" style={{ justifyContent: "center", flexWrap: "wrap" }}>
              {!wallet.connected && (
                <button className="btn btn-primary btn-lg" onClick={wallet.open}>
                  <Icon.Wallet /> Connect wallet
                </button>
              )}
              <Link href="/swap" className="btn btn-ghost btn-lg">
                Open swap <Icon.Arrow dir="right" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .pgx-token-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};
