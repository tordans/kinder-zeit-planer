export const MIN_DURATION_MINUTES = 5
export const MAX_DURATION_MINUTES = 60
export const DURATION_STEP_MINUTES = 5

export const DURATION_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60] as const

export function stepDurationMinutes(minutes: number, delta: number) {
  const next = minutes + delta
  return Math.min(MAX_DURATION_MINUTES, Math.max(MIN_DURATION_MINUTES, next))
}
