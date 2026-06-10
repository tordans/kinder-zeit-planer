import { describe, expect, it } from 'vitest'

import {
  nextPaletteColor,
  pickDominantColorsFromImageData,
  rgbToHex,
  softenForBackground,
} from './emojiColors'

describe('pickDominantColorsFromImageData', () => {
  it('returns the most common non-neutral colors', () => {
    const data = new Uint8ClampedArray(4 * 4)
    for (let index = 0; index < data.length; index += 4) {
      data[index] = 220
      data[index + 1] = 40
      data[index + 2] = 40
      data[index + 3] = 255
    }

    expect(pickDominantColorsFromImageData(data, 1)).toEqual([rgbToHex(224, 32, 32)])
  })
})

describe('softenForBackground', () => {
  it('lightens a color for activity backgrounds', () => {
    expect(softenForBackground('#000000')).toBe('#808080')
  })
})

describe('nextPaletteColor', () => {
  it('cycles through palette colors', () => {
    const palette = ['#f9a8d4', '#93c5fd', '#fcd34d']
    expect(nextPaletteColor(palette, '#f9a8d4')).toBe('#93c5fd')
    expect(nextPaletteColor(palette, '#fcd34d')).toBe('#f9a8d4')
  })
})
