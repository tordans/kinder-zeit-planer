import { TZDate } from '@date-fns/tz'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { formatRelativeToNowInBerlin, timeTodayInBerlin } from './relativeTime'
import { parseTime } from './time'

describe('relativeTime', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('builds today time in Berlin from HH:mm', () => {
    const date = timeTodayInBerlin('08:15')
    expect(date.getHours()).toBe(8)
    expect(date.getMinutes()).toBe(15)
    expect(parseTime(`${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`)).toBe(
      parseTime('08:15'),
    )
  })

  it('describes a future start time as in the future', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new TZDate(2026, 5, 9, 17, 22, 0, 'Europe/Berlin'))

    expect(formatRelativeToNowInBerlin('17:30')).toMatch(/^in /)
  })
})
