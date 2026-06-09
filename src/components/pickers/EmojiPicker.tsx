import { useEffect, useRef, useState } from 'react'

const EMOJI_OPTIONS = [
  '🛏️',
  '👕',
  '🥣',
  '🦷',
  '🚪',
  '⭐',
  '🧸',
  '🎒',
  '🧼',
  '🍎',
  '👟',
  '🪥',
] as const

type EmojiPickerProps = {
  value: string
  onChange: (emoji: string) => void
  label: string
}

export function EmojiPicker({ value, onChange, label }: EmojiPickerProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(
    function closeOnOutsideClick() {
      if (!open) return

      function handlePointerDown(event: PointerEvent) {
        if (rootRef.current?.contains(event.target as Node)) return
        setOpen(false)
      }

      document.addEventListener('pointerdown', handlePointerDown)
      return () => document.removeEventListener('pointerdown', handlePointerDown)
    },
    [open],
  )

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white text-2xl shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {value}
      </button>
      {open ? (
        <div
          role="listbox"
          aria-label={label}
          className="absolute top-full left-0 z-30 mt-2 grid w-52 grid-cols-4 gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
        >
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              role="option"
              aria-selected={emoji === value}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl hover:bg-slate-100"
              onClick={() => {
                onChange(emoji)
                setOpen(false)
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
