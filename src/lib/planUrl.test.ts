import { describe, expect, it } from 'vitest'

import { DEFAULT_ACTIVITIES } from '../constants/defaultActivities'
import { buildPlanSearch, decodeActivities, encodeActivities } from './planUrl'

describe('planUrl', () => {
  it('round-trips activities through base64url', () => {
    const encoded = encodeActivities(DEFAULT_ACTIVITIES)
    expect(decodeActivities(encoded)).toEqual(DEFAULT_ACTIVITIES)
  })

  it('omits plan param for default activities', () => {
    const search = buildPlanSearch({
      goalTime: '08:15',
      mode: 'planning',
      activities: DEFAULT_ACTIVITIES,
    })

    expect(search).toEqual({})
  })

  it('includes plan param when activities differ from defaults', () => {
    const activities = [
      ...DEFAULT_ACTIVITIES,
      {
        id: 'new',
        label: 'Test',
        durationMinutes: 10,
        color: '#ffffff',
        emoji: '⭐',
      },
    ]

    const search = buildPlanSearch({
      goalTime: '08:15',
      mode: 'clock',
      activities,
    })

    expect(search.plan).toBeDefined()
    expect(decodeActivities(search.plan)).toEqual(activities)
  })
})
