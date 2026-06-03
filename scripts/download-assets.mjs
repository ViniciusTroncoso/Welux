// Downloads all speedmvps assets into public/. Batched (4 at a time).
import fs from "node:fs";
import path from "node:path";

const BASE = "https://speedmvps.com";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36";
const urls = JSON.parse(fs.readFileSync("docs/research/asset-urls.json", "utf8"));
const PUB = "public";

// External icons8 social icons -> store under public/social/<name>.png
function localPathFor(u) {
  if (u.startsWith("http")) {
    const url = new URL(u);
    const base = url.pathname.split("/").filter(Boolean).pop();
    return path.join(PUB, "social", base);
  }
  return path.join(PUB, u.replace(/^\//, ""));
}

async function download(u) {
  const dest = localPathFor(u);
  const full = u.startsWith("http") ? u : BASE + u;
  try {
    const res = await fetch(full, { headers: { "User-Agent": UA } });
    if (!res.ok) return `FAIL ${res.status} ${u}`;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, buf);
    return `OK   ${dest} (${buf.length}b)`;
  } catch (e) {
    return `ERR  ${u} ${e.message}`;
  }
}

const batchSize = 4;
const results = [];
for (let i = 0; i < urls.length; i += batchSize) {
  const batch = urls.slice(i, i + batchSize);
  const r = await Promise.all(batch.map(download));
  r.forEach((x) => { console.log(x); results.push(x); });
}
const fails = results.filter((r) => !r.startsWith("OK"));
console.log(`\nDone. ${results.length - fails.length}/${results.length} ok, ${fails.length} failed.`);
if (fails.length) fails.forEach((f) => console.log("  " + f));
