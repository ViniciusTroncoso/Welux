// Downloads all Algarys assets, preserving path structure under public/
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const BASE = 'https://algarys.com.br';
const OUT = new URL('../public/', import.meta.url).pathname;

const paths = [
  // brand + favicons
  '/shared/brand/algarys.svg',
  '/shared/brand/logo-algarys/black-logo.webp',
  '/shared/brand/logo-algarys/white-logo.webp',
  // fonts
  '/shared/fonts/InterDisplay-Regular.woff2',
  '/shared/fonts/InterDisplay-Medium.woff2',
  '/shared/fonts/InterDisplay-Light.woff2',
  '/shared/fonts/InterDisplay-Bold.woff2',
  '/shared/fonts/InterDisplay-SemiBold.woff2',
  // glow
  '/pages/home/glow/1.svg',
  '/pages/home/glow/2.svg',
  '/pages/home/glow/3.svg',
  // textures
  '/pages/home/textures/testura_verde.webp',
  '/pages/home/textures/testura_white.webp',
  '/pages/home/textures/testura_white_blur.webp',
  // videos
  '/pages/home/video/Timelineredred.mp4',
  '/pages/home/video/Timelinered.mp4',
  // carousel photos
  '/pages/home/carrosel_fotos/felipe.webp?v=2',
  '/pages/home/carrosel_fotos/pedro.webp?v=2',
  '/pages/home/carrosel_fotos/imagem_form.webp?v=2',
  // metodologia
  '/pages/home/metodologia/diagnostico.webp',
  '/pages/home/metodologia/priorizacao.webp',
  '/pages/home/metodologia/construcao.webp',
  '/pages/home/metodologia/medicao.webp',
  // quem somos
  '/pages/home/quem_somos/foto_1.webp',
  '/pages/home/quem_somos/foto_2.webp',
  // diferenciais icons
  '/pages/home/diferenciais/search.svg',
  '/pages/home/diferenciais/atom.svg',
  '/pages/home/diferenciais/hard-hat.svg',
  '/pages/home/diferenciais/chart-bars.svg',
  '/pages/home/diferenciais/settings.svg',
  // logos
  '/pages/home/logos/vida.svg',
  '/pages/home/logos/ilza.svg',
  '/pages/home/logos/san.svg',
  '/pages/home/logos/clinica.svg',
  '/pages/home/logos/3 [Vectorized].svg',
  '/pages/home/logos/3.svg',
  '/pages/home/logos/Group 1000001113.svg',
  '/pages/home/logos/Logotipo_da_JBS_(2023) 1 [Vectorized].svg',
  '/pages/home/logos/Group 1000001128.webp',
  '/pages/home/logos/Mask group.webp',
  '/pages/home/logos/Group 1000001129.webp',
  '/pages/home/logos/Group 1000001130.webp',
  '/pages/home/logos/ALC.svg',
  '/pages/home/logos/beegames.svg',
  '/pages/home/logos/bew.svg',
  '/pages/home/logos/blox.svg',
  '/pages/home/logos/bonapp.svg',
  '/pages/home/logos/brasil.svg',
  '/pages/home/logos/clip.svg',
  '/pages/home/logos/dou.svg',
  '/pages/home/logos/focus.svg',
  '/pages/home/logos/GOMD.svg',
  '/pages/home/logos/grow.svg',
  '/pages/home/logos/influ.svg',
  '/pages/home/logos/jexs.svg',
  '/pages/home/logos/maximeta.svg',
  '/pages/home/logos/milano.svg',
  '/pages/home/logos/oq.svg',
  '/pages/home/logos/resaltar.svg',
  '/pages/home/logos/seilf.svg',
  '/pages/home/logos/slove.svg',
  '/pages/home/logos/thar.svg',
  '/pages/home/logos/veex.svg',
  '/pages/home/logos/zou.svg',
];

async function download(p) {
  const url = BASE + encodeURI(p);
  const clean = p.split('?')[0];
  const dest = join(OUT, clean);
  try {
    const res = await fetch(url);
    if (!res.ok) { console.error('FAIL', res.status, p); return false; }
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    console.log('ok', clean, buf.length);
    return true;
  } catch (e) { console.error('ERR', p, e.message); return false; }
}

let ok = 0, fail = 0;
for (let i = 0; i < paths.length; i += 4) {
  const batch = paths.slice(i, i + 4);
  const results = await Promise.all(batch.map(download));
  results.forEach(r => r ? ok++ : fail++);
}
console.log(`\nDone: ${ok} ok, ${fail} failed`);
