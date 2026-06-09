type ColorPickerProps = {
  value: string
  onChange: (color: string) => void
  label: string
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  return (
    <label className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center">
      <span className="sr-only">{label}</span>
      <span
        className="h-8 w-8 rounded-full border-2 border-white shadow-md"
        style={{ backgroundColor: value }}
      />
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label={label}
      />
    </label>
  )
}
