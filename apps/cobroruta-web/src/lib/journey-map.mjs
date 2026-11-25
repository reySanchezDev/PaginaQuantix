// Browser map math and anonymous visit positions. No customer data or backend calls.
export const TILE_SIZE = 256;
export const DEFAULT_CENTER = Object.freeze({ lat: 12.1263760777, lng: -86.2662276527 });
export const INITIAL_ZOOM = 15;

export function project(lat, lng, zoom) {
  const clampedLat = Math.max(-85.05112878, Math.min(85.05112878, lat));
  const size = TILE_SIZE * 2 ** zoom;
  const sin = Math.sin(clampedLat * Math.PI / 180);
  return {
    x: (lng + 180) / 360 * size,
    y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * size,
  };
}

export function unproject(x, y, zoom) {
  const size = TILE_SIZE * 2 ** zoom;
  const lng = x / size * 360 - 180;
  const n = Math.PI - 2 * Math.PI * y / size;
  return { lat: 180 / Math.PI * Math.atan(Math.sinh(n)), lng };
}

// Positions are anonymous, illustrative stops; they do not represent actual customers.
export function makeStops(center, width, height, zoom = INITIAL_ZOOM) {
  const c = project(center.lat, center.lng, zoom);
  const spreadX = Math.min(Math.max(width * 0.26, 82), 145);
  const spreadY = Math.min(Math.max(height * 0.24, 84), 132);
  const offsets = [[-0.96, -0.8], [0.84, -0.88], [0.96, 0.86], [-0.72, 0.75]];
  return offsets.map(([x, y], i) => ({
    id: i + 1,
    ...unproject(c.x + x * spreadX, c.y + y * spreadY, zoom),
  }));
}

export function visibleTiles(center, zoom, width, height) {
  if (width <= 0 || height <= 0) return [];
  const c = project(center.lat, center.lng, zoom);
  const left = c.x - width / 2;
  const top = c.y - height / 2;
  const minX = Math.floor(left / TILE_SIZE);
  const maxX = Math.floor((left + width - 1) / TILE_SIZE);
  const minY = Math.floor(top / TILE_SIZE);
  const maxY = Math.floor((top + height - 1) / TILE_SIZE);
  const count = 2 ** zoom;
  const tiles = [];
  for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) {
    if (y < 0 || y >= count) continue;
    tiles.push({
      x: ((x % count) + count) % count,
      y,
      z: zoom,
      left: x * TILE_SIZE - left,
      top: y * TILE_SIZE - top,
    });
  }
  return tiles;
}
