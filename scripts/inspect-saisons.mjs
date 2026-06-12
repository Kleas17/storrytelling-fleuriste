// Diagnostic visuel de la section Saisons : screenshots à travers la zone
// épinglée + mesure des positions pour repérer sauts et zones blanches.
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = "scripts/shots";
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--window-size=1440,900", "--use-gl=swiftshader"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
// Laisse passer le loader + premiers refresh ScrollTrigger
await new Promise((r) => setTimeout(r, 4500));

const info = await page.evaluate(() => {
  const saisons = document.querySelectorAll("section[data-pinned]")[1];
  const spacer = saisons?.closest(".pin-spacer") ?? saisons;
  const rect = spacer.getBoundingClientRect();
  return {
    docHeight: document.documentElement.scrollHeight,
    spacerTop: rect.top + window.scrollY,
    spacerHeight: rect.height,
    sectionHeight: saisons?.getBoundingClientRect().height,
    trackWidth: document.querySelector(".saisons-track")?.scrollWidth,
    innerWidth: window.innerWidth,
  };
});
console.log("INFO:", JSON.stringify(info, null, 2));

const start = Math.max(0, info.spacerTop - 900);
const end = info.spacerTop + info.spacerHeight + 1400;
const step = 700;
let i = 0;
for (let y = start; y <= end; y += step) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 700));
  const state = await page.evaluate(() => {
    const el = document.elementFromPoint(720, 450);
    const track = document.querySelector(".saisons-track");
    const m = track ? getComputedStyle(track).transform : "none";
    return {
      scrollY: Math.round(window.scrollY),
      centerEl: el ? `${el.tagName}.${(el.className || "").toString().slice(0, 60)}` : "none",
      trackTransform: m,
    };
  });
  const name = `${OUT}/s${String(i).padStart(2, "0")}-y${Math.round(y)}.png`;
  await page.screenshot({ path: name });
  console.log(name, JSON.stringify(state));
  i++;
}

await browser.close();
console.log("DONE");
