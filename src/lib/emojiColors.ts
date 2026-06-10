const CANVAS_SIZE = 72
const FONT_SIZE = 56

export function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}

export function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '')
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  }
}

export function colorDistance(hex1: string, hex2: string) {
  const a = hexToRgb(hex1)
  const b = hexToRgb(hex2)
  return Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b)
}

export function isNearNeutral(r: number, g: number, b: number) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  if (max - min < 25 && max > 200) return true
  if (max < 40) return true
  return false
}

export function softenForBackground(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const mix = (channel: number) => Math.round(channel + (255 - channel) * 0.5)
  return rgbToHex(mix(r), mix(g), mix(b))
}

export function pickDominantColorsFromImageData(
  data: Uint8ClampedArray,
  maxColors = 3,
): string[] {
  const buckets = new Map<string, number>()

  for (let index = 0; index < data.length; index += 4) {
    const r = data[index]
    const g = data[index + 1]
    const b = data[index + 2]
    const alpha = data[index + 3]
    if (alpha < 128) continue
    if (isNearNeutral(r, g, b)) continue

    const qr = Math.round(r / 32) * 32
    const qg = Math.round(g / 32) * 32
    const qb = Math.round(b / 32) * 32
    const key = `${qr},${qg},${qb}`
    buckets.set(key, (buckets.get(key) ?? 0) + 1)
  }

  const ranked = [...buckets.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([key]) => {
      const [r, g, b] = key.split(',').map(Number)
      return rgbToHex(r, g, b)
    })

  const result: string[] = []
  for (const color of ranked) {
    if (result.length >= maxColors) break
    if (result.every((existing) => colorDistance(existing, color) > 60)) {
      result.push(color)
    }
  }

  return result
}

export function extractEmojiColors(emoji: string, maxColors = 3): string[] {
  if (typeof document === 'undefined' || !emoji) return []

  const canvas = document.createElement('canvas')
  canvas.width = CANVAS_SIZE
  canvas.height = CANVAS_SIZE
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return []

  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = `${FONT_SIZE}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`
  context.fillText(emoji, CANVAS_SIZE / 2, CANVAS_SIZE / 2)

  const { data } = context.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  return pickDominantColorsFromImageData(data, maxColors).map(softenForBackground)
}

export function nextPaletteColor(palette: string[], currentColor: string) {
  if (palette.length === 0) return currentColor
  const currentIndex = palette.findIndex(
    (color) => color.toLowerCase() === currentColor.toLowerCase(),
  )
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % palette.length
  return palette[nextIndex]
}
