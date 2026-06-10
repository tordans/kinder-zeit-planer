import { describe, expect, it } from 'vitest'

import {
  describeArc,
  formatTime,
  isValidGoalTime,
  snapGoalTimeToFiveMinutes,
  minuteToAngle,
  parseTime,
  subtractMinutes,
} from './time'

describe('time', () => {
  it('parses and formats time', () => {
    expect(parseTime('07:20')).toBe(440)
    expect(formatTime(440)).toBe('07:20')
  })

  it('subtracts minutes', () => {
    expect(subtractMinutes('07:20', 5)).toBe('07:15')
    expect(subtractMinutes('08:00', 10)).toBe('07:50')
  })

  it('converts minute to angle with 12 o clock at top', () => {
    expect(minuteToAngle(0)).toBe(-90)
    expect(minuteToAngle(15)).toBe(0)
    expect(minuteToAngle(30)).toBe(90)
  })

  it('describes an arc path', () => {
    const path = describeArc(100, 100, 80, 5, 15)
    expect(path.startsWith('M 100 100 L')).toBe(true)
    expect(path.includes('A 80 80')).toBe(true)
  })

  it('describes an arc ending on the hour boundary', () => {
    const path = describeArc(100, 100, 80, 40, 60)
    expect(path.includes('A 80 80')).toBe(true)
  })

  it('describes a full hour arc', () => {
    const path = describeArc(100, 100, 80, 0, 60)
    expect(path.match(/A 80 80/g)?.length).toBe(2)
  })

  it('validates goal times in five minute steps', () => {
    expect(isValidGoalTime('08:15')).toBe(true)
    expect(isValidGoalTime('00:00')).toBe(true)
    expect(isValidGoalTime('23:55')).toBe(true)
    expect(isValidGoalTime('08:17')).toBe(false)
    expect(isValidGoalTime('24:00')).toBe(false)
  })

  it('snaps goal times to five minute steps', () => {
    expect(snapGoalTimeToFiveMinutes('08:17')).toBe('08:15')
    expect(snapGoalTimeToFiveMinutes('08:01')).toBe('08:00')
    expect(snapGoalTimeToFiveMinutes('08:15')).toBe('08:15')
  })
})
