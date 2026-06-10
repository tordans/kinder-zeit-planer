import { describeArc } from '../../lib/time'

type WedgePreviewProps = {
  color: string
  durationMinutes: number
}

const CX = 24
const CY = 24
const RING_RADIUS = 20
const WEDGE_RADIUS = 18

export function WedgePreview({ color, durationMinutes }: WedgePreviewProps) {
  const span = Math.min(durationMinutes, 60)
  const isFullHour = span >= 60
  const path = describeArc(CX, CY, WEDGE_RADIUS, 60 - span, 60)

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="shrink-0 drop-shadow-sm"
    >
      <circle
        cx={CX}
        cy={CY}
        r={RING_RADIUS}
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="1.5"
      />
      {isFullHour ? (
        <circle
          cx={CX}
          cy={CY}
          r={WEDGE_RADIUS}
          fill={color}
          stroke="white"
          strokeWidth="1.2"
        />
      ) : (
        <path d={path} fill={color} stroke="white" strokeWidth="1.2" />
      )}
    </svg>
  )
}
