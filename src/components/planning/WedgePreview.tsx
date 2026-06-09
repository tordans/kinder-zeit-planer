import { describeArc } from '../../lib/time'

type WedgePreviewProps = {
  color: string
  durationMinutes: number
}

export function WedgePreview({ color, durationMinutes }: WedgePreviewProps) {
  const span = Math.min(durationMinutes, 30)
  const path = describeArc(24, 24, 18, 60 - span, 60)

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="#f8fafc" />
      <path d={path} fill={color} stroke="white" strokeWidth="1" />
    </svg>
  )
}
