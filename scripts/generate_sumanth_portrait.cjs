const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32
function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    let byte = buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (-(crc & 1) & 0xedb88320);
    }
  }
  return (crc ^ (-1)) >>> 0;
}

function createPNG(width, height, pixelFn) {
  const rowBytes = width * 4 + 1;
  const rawData = Buffer.alloc(rowBytes * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0;
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
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

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

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdrData),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

// Generate Sumanth Portrait matching mypng.png (700 x 850)
const w = 700;
const h = 850;

const portraitBuf = createPNG(w, h, (x, y) => {
  // 1. Studio Magenta/Purple Radial Background (#761c5c to #4d0b3c)
  const bgDx = x - w * 0.5;
  const bgDy = y - h * 0.35;
  const bgDist = Math.hypot(bgDx, bgDy);
  const bgRatio = Math.min(1, bgDist / 500);
  
  let bgR = Math.floor(125 * (1 - bgRatio * 0.5) + 40 * (bgRatio * 0.5));
  let bgG = Math.floor(28 * (1 - bgRatio * 0.6) + 10 * (bgRatio * 0.6));
  let bgB = Math.floor(98 * (1 - bgRatio * 0.5) + 35 * (bgRatio * 0.5));

  // 2. Green Kurta / Shirt with mandarin collar
  // Shoulders and chest from y > 520
  if (y > 510) {
    const chestDx = Math.abs(x - w * 0.5);
    if (chestDx < 320) {
      // Dark emerald green
      const neckV = Math.abs(x - w * 0.5) < 35 && y < 620;
      if (neckV) {
        // Neck button placket
        const isButton = Math.abs(x - w * 0.5) < 6 && (Math.abs(y - 570) < 5 || Math.abs(y - 630) < 5 || Math.abs(y - 690) < 5);
        if (isButton) return [180, 130, 90, 255]; // Wooden button
        return [40, 75, 55, 255]; // Placket
      }
      // Fabric texture
      const fold = Math.sin(x * 0.08 + y * 0.04) * 8;
      const r = Math.max(20, Math.min(50, 38 + fold));
      const g = Math.max(65, Math.min(105, 82 + fold));
      const b = Math.max(45, Math.min(75, 58 + fold));
      return [r, g, b, 255];
    }
  }

  // 3. Neck
  const neckDist = Math.hypot((x - w * 0.5) * 1.4, (y - 500) * 0.8);
  if (neckDist < 55 && y > 420 && y <= 530) {
    return [175, 125, 95, 255]; // Warm skin tone
  }

  // 4. Head & Face
  const faceDx = (x - w * 0.52);
  const faceDy = (y - h * 0.40);
  const faceDist = Math.hypot(faceDx * 1.15, faceDy * 0.95);

  if (faceDist < 125) {
    // Skin Tone with warm rim lighting
    const highlight = Math.max(0, 1 - Math.hypot(x - 330, y - 290) / 140);
    const r = Math.min(240, Math.floor(190 + highlight * 35));
    const g = Math.min(195, Math.floor(140 + highlight * 25));
    const b = Math.min(170, Math.floor(115 + highlight * 20));

    // Beard & Mustache
    // Mustache above mouth (y ~ 385, x around 355 - 375)
    const inMustache = Math.hypot((x - 365) * 1.2, (y - 382) * 2.8) < 22;
    // Goatee on chin (y ~ 430 - 460)
    const inGoatee = Math.hypot((x - 368) * 1.8, (y - 440) * 1.2) < 22;
    if (inMustache || inGoatee) {
      return [42, 32, 28, 255];
    }

    // Lips (y ~ 400)
    const inLips = Math.hypot((x - 366) * 1.6, (y - 398) * 3.5) < 22;
    if (inLips) {
      return [160, 85, 80, 255];
    }

    // Nose bridge and tip (y ~ 340 - 370)
    const inNose = Math.abs(x - 365) < 14 && y > 330 && y < 375;
    if (inNose) {
      return [r + 10, g + 5, b + 5, 255];
    }

    // Glasses frame rings:
    // Left eye lens center: x = 335, y = 312, radius ~ 34
    // Right eye lens center: x = 405, y = 318, radius ~ 34
    const dLeftGlass = Math.hypot(x - 335, y - 312);
    const dRightGlass = Math.hypot(x - 405, y - 318);

    // Glasses wire bridge (between 362 and 378, y ~ 312)
    const inBridge = x >= 364 && x <= 376 && Math.abs(y - 312) < 2.5;

    // Metal frame wire (thin round border)
    if (Math.abs(dLeftGlass - 34) < 2.2 || Math.abs(dRightGlass - 34) < 2.2 || inBridge) {
      return [210, 215, 225, 255]; // Silver/steel frame
    }

    // Sclera / eye background inside lenses
    if (dLeftGlass < 18 || dRightGlass < 18) {
      return [245, 245, 248, 255]; // Eye whites (pupil will track on top!)
    }

    return [r, g, b, 255];
  }

  // 5. Long dark wavy hair
  const hairDx = (x - w * 0.51);
  const hairDy = (y - h * 0.35);
  const hairDist = Math.hypot(hairDx * 0.95, hairDy * 0.9);
  if (hairDist < 200 && y < 510) {
    // Rich black/dark brown hair with volume
    const rimLight = Math.max(0, 1 - Math.abs(x - 170) / 100) * (y > 200 && y < 450 ? 1 : 0);
    const hr = Math.floor(25 + rimLight * 45);
    const hg = Math.floor(18 + rimLight * 15);
    const hb = Math.floor(22 + rimLight * 35);
    return [hr, hg, hb, 255];
  }

  return [bgR, bgG, bgB, 255];
});

fs.writeFileSync(path.join(__dirname, '../public/mypng.png'), portraitBuf);
fs.writeFileSync(path.join(__dirname, '../public/Pp.jpeg'), portraitBuf);

console.log('Generated mypng.png and Pp.jpeg successfully!');
