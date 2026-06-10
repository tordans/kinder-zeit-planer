import { useRef } from 'react'

import { useEmojiPalette } from '../../hooks/useEmojiPalette'
import { nextPaletteColor } from '../../lib/emojiColors'

type ColorPickerProps = {
  value: string
  onChange: (color: string) => void
  label: string
  emoji?: string
}

export function ColorPicker({ value, onChange, label, emoji }: ColorPickerProps) {
  const palette = useEmojiPalette(emoji ?? '')
  const inputRef = useRef<HTMLInputElement>(null)

  function handlePickColor() {
    if (palette.length > 0) {
      onChange(nextPaletteColor(palette, value))
      return
    }
    inputRef.current?.click()
  }

  return (
    <div className="relative inline-flex h-10 w-10 items-center justify-center">
      <button
        type="button"
        onClick={handlePickColor}
        className="relative flex h-10 w-10 items-center justify-center rounded-full"
        aria-label={label}
      >
        <span
          className="h-8 w-8 rounded-full border-2 border-white shadow-md"
          style={{ backgroundColor: value }}
        />
      </button>
      <input
        ref={inputRef}
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="sr-only"
        aria-label={label}
        tabIndex={-1}
      />
    </div>
  )
}
