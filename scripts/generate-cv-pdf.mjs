/* Prints the rendered #/cv page to public/assets as the downloadable CV PDF,
   so the file a visitor saves is exactly the CV the site shows. Run after any
   CV change: npm run cv:pdf

   Starts its own Vite dev server on a spare port, opens the page in headless
   Chromium (Playwright's cached browser, or Google Chrome as a fallback),
   waits for fonts and images, and prints to A4 with backgrounds on. */

import { spawn, execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public/assets/Nazrin_Nasirova_CV_Product_Designer.pdf");

function findBrowser() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  // any browser build already in Playwright's cache, newest first
  const caches = [
    join(homedir(), "Library/Caches/ms-playwright"),
    join(homedir(), ".cache/ms-playwright"),
  ];
  for (const cache of caches) {
    if (!existsSync(cache)) continue;
    const builds = readdirSync(cache)
      .filter((d) => d.startsWith("chromium"))
      .sort()
      .reverse();
    for (const build of builds) {
      for (const bin of [
        "chrome-headless-shell-mac-arm64/chrome-headless-shell",
        "chrome-mac/Chromium.app/Contents/MacOS/Chromium",
        "chrome-linux/chrome",
      ]) {
        const path = join(cache, build, bin);
        if (existsSync(path)) return path;
      }
    }
  }
  const chromeApp = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  if (existsSync(chromeApp)) return chromeApp;
  throw new Error("No Chromium found. Set CHROME_PATH or run: npx playwright install chromium");
}

// a dedicated server instead of any already-running one, so the PDF always
// reflects the working tree, not a stale tab's state
const server = spawn("npx", ["vite", "--port", "5199"], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
const url = await new Promise((resolve, reject) => {
  let out = "";
  const onData = (chunk) => {
    out += chunk;
    const m = out.match(/Local:\s+(http:\/\/localhost:\d+\/)/);
    if (m) resolve(m[1]);
  };
  server.stdout.on("data", onData);
  server.stderr.on("data", onData);
  server.on("exit", () => reject(new Error(`Vite exited before serving:\n${out}`)));
  setTimeout(() => reject(new Error(`Vite never reported ready:\n${out}`)), 30000);
});

try {
  const browser = await chromium.launch({ executablePath: findBrowser() });
  const page = await browser.newPage({ viewport: { width: 900, height: 1300 } });
  await page.goto(`${url}#/cv`, { waitUntil: "networkidle" });
  await page.waitForSelector("article");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (img) => img.decode().catch(() => {})));
    // in-app hash links (the Selected Projects) would print as dead text;
    // in the PDF they should walk the reader into the live portfolio
    for (const a of document.querySelectorAll('a[href^="#/"]')) {
      a.href = `https://nasrinette.github.io/${a.getAttribute("href")}`;
    }
  });
  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
  console.log("wrote", outPath);
} finally {
  // npx doesn't forward kill to vite; free the port explicitly
  try {
    execSync("lsof -ti:5199 -sTCP:LISTEN | xargs -r kill", { shell: "/bin/bash" });
  } catch {
    server.kill();
  }
}
