const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const publicDir = path.join(__dirname, '../public');
fs.mkdirSync(path.join(publicDir, 'calc'), { recursive: true });

// CRC32 implementation
function makeCrcTable() {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
}
const crcTable = makeCrcTable();
function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function createPNG(width, height, pixelFn) {
  const rowBytes = width * 4 + 1; // 1 filter byte (0) + RGBA per pixel
  const rawData = Buffer.alloc(rowBytes * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a !== undefined ? a : 255;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 6; // Color type: RGBA
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crcVal = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crcVal, 8 + len);
    return buf;
  }

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

// 1. Robots.txt
fs.writeFileSync(path.join(publicDir, 'robots.txt'), 'User-agent: *\nAllow: /\n');

// 2. Manifest.json
fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify({
  short_name: 'Sumanth Portfolio',
  name: 'Sumanth - Developer & Creative Portfolio',
  icons: [
    { src: '/favicon.ico', sizes: '64x64 32x32 24x24 16x16', type: 'image/x-icon' },
    { src: '/logo192.png', type: 'image/png', sizes: '192x192' },
    { src: '/logo512.png', type: 'image/png', sizes: '512x512' }
  ],
  start_url: '/',
  display: 'standalone',
  theme_color: '#111827',
  background_color: '#111827'
}, null, 2));

// 3. Asset-manifest.json
fs.writeFileSync(path.join(publicDir, 'asset-manifest.json'), JSON.stringify({
  files: {
    'main.css': '/src/index.css',
    'main.js': '/src/main.tsx',
    'index.html': '/index.html'
  }
}, null, 2));

// 4. resume.pdf
const pdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length 260 >> stream
BT
/F1 24 Tf
50 720 Td
(Sumanth - Developer & Creative Portfolio) Tj
/F1 14 Tf
0 -40 Td
(Email: sumanth.prt@gmail.com) Tj
0 -30 Td
(Skills: Art, Film Making, Editing, Cooking, Vibe Coding, Music, Story Writing) Tj
0 -30 Td
(Projects: Modern Landing Page, Vanilla JS Calculator) Tj
ET
endstream
endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000556 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
628
%%EOF`;
fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfContent);

// 5. Generate Pp.jpeg (Profile Picture 400x400)
// Stylish portrait avatar graphic with subtle gradient, face contours, eyes for eye tracking
const ppBuffer = createPNG(400, 400, (x, y, w, h) => {
  const dx = x - w / 2;
  const dy = y - h / 2;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  // Background circular glow
  if (dist > 180) {
    const bgVal = Math.floor(18 + (x / w) * 20);
    return [bgVal, bgVal + 5, bgVal + 15, 255];
  }

  // Head/face area
  const headDist = Math.sqrt((x - 200) * (x - 200) * 0.9 + (y - 180) * (y - 180) * 1.1);
  if (headDist < 95) {
    // Skin tone with warm studio lighting
    const highlight = Math.max(0, 1 - Math.hypot(x - 170, y - 150) / 100);
    const r = Math.min(255, Math.floor(215 + highlight * 35));
    const g = Math.min(255, Math.floor(165 + highlight * 25));
    const b = Math.min(255, Math.floor(140 + highlight * 15));

    // Eye sockets / sclera area (left eye around (165, 175), right eye around (235, 175))
    const leftEyeDist = Math.hypot(x - 165, y - 175);
    const rightEyeDist = Math.hypot(x - 235, y - 175);
    if (leftEyeDist < 16 || rightEyeDist < 16) {
      return [250, 250, 252, 255]; // White sclera (pupils will track on top!)
    }

    // Eyebrows
    if ((Math.abs(y - 162) < 3 && x > 148 && x < 182) || (Math.abs(y - 162) < 3 && x > 218 && x < 252)) {
      return [35, 25, 20, 255];
    }
    // Smile
    const mouthDist = Math.hypot(x - 200, (y - 230) * 2.5);
    if (mouthDist < 25 && y >= 228 && y <= 236) {
      return [180, 70, 70, 255];
    }
    return [r, g, b, 255];
  }

  // Hair
  const hairDist = Math.hypot(x - 200, (y - 120) * 0.9);
  if (hairDist < 85 && y < 165) {
    return [30, 25, 30, 255];
  }

  // Shoulders / stylish dark jacket
  if (y > 250 && Math.abs(dx) < 170) {
    const isShirt = Math.abs(dx) < 40 && y < 330;
    if (isShirt) return [50, 60, 75, 255];
    return [25, 30, 42, 255];
  }

  return [22, 27, 34, 255];
});
fs.writeFileSync(path.join(publicDir, 'Pp.jpeg'), ppBuffer);

// 6. Generate lp.png (Landing Page screenshot 600x400)
const lpBuffer = createPNG(600, 400, (x, y, w, h) => {
  // Browser window mockup
  if (y < 35) {
    // Browser header bar
    if (x < 65) {
      // Traffic lights
      const d1 = Math.hypot(x - 20, y - 18);
      const d2 = Math.hypot(x - 35, y - 18);
      const d3 = Math.hypot(x - 50, y - 18);
      if (d1 < 5) return [239, 68, 68, 255];
      if (d2 < 5) return [245, 158, 11, 255];
      if (d3 < 5) return [16, 185, 129, 255];
    }
    return [30, 41, 59, 255];
  }

  // Website preview content
  if (y > 45 && y < 100) {
    // Hero banner in preview
    const grad = x / w;
    return [
      Math.floor(139 * (1 - grad) + 59 * grad),
      Math.floor(92 * (1 - grad) + 130 * grad),
      Math.floor(246 * (1 - grad) + 246 * grad),
      255
    ];
  }

  // Cards layout in preview
  const inCard1 = (x > 40 && x < 280 && y > 130 && y < 340);
  const inCard2 = (x > 320 && x < 560 && y > 130 && y < 340);
  if (inCard1 || inCard2) {
    return [30, 41, 59, 255];
  }

  return [15, 23, 42, 255];
});
fs.writeFileSync(path.join(publicDir, 'lp.png'), lpBuffer);

// 7. Generate logo512.png, logo192.png, and favicon.ico
const logo512Buffer = createPNG(512, 512, (x, y, w, h) => {
  const dx = x - 256;
  const dy = y - 256;
  const dist = Math.hypot(dx, dy);
  if (dist > 240) return [0, 0, 0, 0];
  
  // Vibrant indigo/cyan gradient icon with 'S' initial
  const t = (x + y) / (512 * 2);
  const r = Math.floor(99 * (1 - t) + 14 * t);
  const g = Math.floor(102 * (1 - t) + 165 * t);
  const b = Math.floor(241 * (1 - t) + 233 * t);

  // 'S' shape / core mark
  const inS = (Math.abs(dy) < 30 && Math.abs(dx) < 100) ||
              (dy < 0 && dy > -120 && dx < -50 && dx > -110) ||
              (dy > 0 && dy < 120 && dx > 50 && dx < 110) ||
              (dy < -100 && dy > -140 && Math.abs(dx) < 100) ||
              (dy > 100 && dy < 140 && Math.abs(dx) < 100);

  if (inS) {
    return [255, 255, 255, 255];
  }
  return [r, g, b, 255];
});
fs.writeFileSync(path.join(publicDir, 'logo512.png'), logo512Buffer);

const logo192Buffer = createPNG(192, 192, (x, y, w, h) => {
  const dx = x - 96;
  const dy = y - 96;
  const dist = Math.hypot(dx, dy);
  if (dist > 90) return [0, 0, 0, 0];
  return [99, 102, 241, 255];
});
fs.writeFileSync(path.join(publicDir, 'logo192.png'), logo192Buffer);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), logo192Buffer);

console.log('All static image assets generated successfully!');
