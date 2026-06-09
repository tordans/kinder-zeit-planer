import { describe, expect, it } from 'vitest'

import type { Activity } from '../types/plan'
import { buildActivityRanges, buildHourClocks, computeRoutineStart } from './hourLayout'

const activity = (id: string, label: string, durationMinutes: number): Activity => ({
  id,
  label,
  durationMinutes,
  color: '#93c5fd',
  emoji: '⭐',
})

describe('hourLayout', () => {
  it('places a single activity backward from goal within one hour', () => {
    const clocks = buildHourClocks('08:15', [activity('1', 'Losgehen', 10)])
    expect(clocks).toHaveLength(1)
    expect(clocks[0]?.hour).toBe(8)
    expect(clocks[0]?.goalMinute).toBe(15)
    expect(clocks[0]?.wedges[0]).toMatchObject({ startMinute: 5, endMinute: 15 })
  })

  it('splits activities across two hour circles', () => {
    const clocks = buildHourClocks('08:15', [
      activity('2', 'Losgehen', 30),
      activity('1', 'Frühstück', 30),
    ])

    expect(clocks).toHaveLength(2)
    expect(clocks[0]?.hour).toBe(8)
    expect(clocks[0]?.goalMinute).toBe(15)
    expect(clocks[1]?.hour).toBe(7)
  })

  it('computes routine start from total duration', () => {
    const activities = [
      activity('3', 'Losgehen', 10),
      activity('2', 'Anziehen', 15),
      activity('1', 'Aufstehen', 5),
    ]
    expect(computeRoutineStart('08:15', activities)).toBe('07:45')
  })

  it('updates ranges when list order changes', () => {
    const first = buildActivityRanges('08:15', [activity('1', 'A', 10), activity('2', 'B', 10)])
    const second = buildActivityRanges('08:15', [activity('2', 'B', 10), activity('1', 'A', 10)])

    expect(first[0]?.activity.id).toBe('1')
    expect(second[0]?.activity.id).toBe('2')
  })
})
