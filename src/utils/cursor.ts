/**
 * Utility to generate inline SVG emoji cursor CSS string
 */
export function getEmojiCursor(emoji: string, hotspotX = 16, hotspotY = 16): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><text y="28" font-size="28">${emoji}</text></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") ${hotspotX} ${hotspotY}, auto`;
}
