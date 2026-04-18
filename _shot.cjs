const { spawn } = require("child_process");
const WebSocket = require("ws");
const fs = require("fs");

async function main() {
  const proc = spawn("google-chrome", [
    "--headless", "--disable-gpu", "--no-sandbox",
    "--remote-debugging-port=9223", "about:blank",
  ], { stdio: "pipe" });
  await new Promise(r => setTimeout(r, 1500));

  const tabs = await fetch("http://localhost:9223/json").then(r => r.json());
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
  await new Promise(r => ws.once("open", r));

  let id = 0;
  const send = (m, p) => new Promise(res => {
    const myId = ++id;
    const h = (msg) => {
      const d = JSON.parse(msg.toString());
      if (d.id === myId) { ws.off("message", h); res(d.result); }
    };
    ws.on("message", h);
    ws.send(JSON.stringify({ id: myId, method: m, params: p }));
  });

  const url = process.argv[2] || "http://localhost:3000/stake";
  const out = process.argv[3] || "/tmp/shot.png";
  const height = parseInt(process.argv[4] || "2200", 10);

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 425, height, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url });
  await new Promise(r => setTimeout(r, 2500));

  const r = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  fs.writeFileSync(out, Buffer.from(r.data, "base64"));
  console.log("wrote", out);
  proc.kill();
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
