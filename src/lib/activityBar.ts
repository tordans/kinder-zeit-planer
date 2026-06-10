const MIN_MINUTES = 5
const MAX_VISUAL_MINUTES = 30
const MIN_WIDTH_PX = 148
const MAX_WIDTH_PX = 288
const WIDTH_CURVE = 0.55

/** Non-linear pixel width: roomy minimum for controls, wider columns for longer durations. */
export function durationToBarWidthPx(durationMinutes: number): number {
  const clamped = Math.max(MIN_MINUTES, Math.min(durationMinutes, MAX_VISUAL_MINUTES))
  const t = (clamped - MIN_MINUTES) / (MAX_VISUAL_MINUTES - MIN_MINUTES)
  const scaled = Math.pow(t, WIDTH_CURVE)
  return Math.round(MIN_WIDTH_PX + scaled * (MAX_WIDTH_PX - MIN_WIDTH_PX))
}

export function durationToBarWidth(durationMinutes: number): string {
  return `${durationToBarWidthPx(durationMinutes)}px`
}
