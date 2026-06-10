import { describe, expect, it } from 'vitest'

import { durationToBarWidth, durationToBarWidthPx } from './activityBar'

describe('durationToBarWidthPx', () => {
  it('uses a wide minimum for 5 min columns', () => {
    expect(durationToBarWidthPx(5)).toBe(148)
  })

  it('reaches the maximum visual width at 30 min', () => {
    expect(durationToBarWidthPx(30)).toBe(288)
  })

  it('caps durations above 30 min at the maximum visual width', () => {
    expect(durationToBarWidthPx(60)).toBe(288)
  })

  it('grows sub-linearly between 5 and 30 min', () => {
    const mid = durationToBarWidthPx(15)
    expect(mid).toBeGreaterThan(148)
    expect(mid).toBeLessThan(288)
    expect(mid).toBeLessThan(durationToBarWidthPx(25))
  })
})

describe('durationToBarWidth', () => {
  it('returns a pixel string', () => {
    expect(durationToBarWidth(5)).toBe('148px')
    expect(durationToBarWidth(30)).toBe('288px')
  })
})
