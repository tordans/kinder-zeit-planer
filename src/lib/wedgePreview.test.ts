import { describe, expect, it } from 'vitest'

import { describeArc } from './time'

describe('wedge preview arc', () => {
  it('draws a full hour wedge from minute 0 to 60', () => {
    const path = describeArc(24, 24, 18, 0, 60)
    expect(path.match(/A 18 18/g)?.length).toBe(2)
  })

  it('draws a 50 minute wedge ending at the hour', () => {
    const path = describeArc(24, 24, 18, 10, 60)
    expect(path.includes('A 18 18')).toBe(true)
    expect(path.startsWith('M 24 24 L')).toBe(true)
  })
})
