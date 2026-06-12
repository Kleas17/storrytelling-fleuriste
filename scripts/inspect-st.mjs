// Inspecte l'état interne des ScrollTriggers liés à la section Saisons.
import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--window-size=1440,900", "--use-gl=swiftshader"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4500));

const sts = await page.evaluate(() => {
  // ScrollTrigger n'est pas exposé globalement : on le retrouve via gsap
  const triggers = [];
  const st = window.gsap?.core?.globals?.()?.ScrollTrigger;
  if (!st) return ["pas de gsap global"];
  st.getAll().forEach((t) => {
    const trg = t.trigger;
    triggers.push({
      trigger: trg ? `${trg.tagName}.${(trg.className || "").toString().slice(0, 40)}` : "?",
      start: Math.round(t.start),
      end: Math.round(t.end),
      pin: !!t.pin,
      progress: +t.progress.toFixed(3),
    });
  });
  return triggers;
});
console.log(JSON.stringify(sts, null, 1));
await browser.close();
