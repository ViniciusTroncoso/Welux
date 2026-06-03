import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.argv[2] || "http://localhost:3000";
const out = process.argv[3] || "shot";
const width = parseInt(process.argv[4] || "1440", 10);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1"],
  defaultViewport: { width, height: 900 },
});
const page = await browser.newPage();
await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log("saved", out);
