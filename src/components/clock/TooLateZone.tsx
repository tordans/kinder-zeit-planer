import { de } from '../../i18n/de'
import { describeArc } from '../../lib/time'

type TooLateZoneProps = {
  cx: number
  cy: number
  radius: number
  goalMinute: number
  patternId: string
}

export function TooLateZone({ cx, cy, radius, goalMinute, patternId }: TooLateZoneProps) {
  if (goalMinute >= 60) return null

  const path = describeArc(cx, cy, radius, goalMinute, 60)

  return (
    <>
      <defs>
        <pattern
          id={patternId}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="6" stroke="#94a3b8" strokeWidth="1.5" />
        </pattern>
      </defs>
      <path
        d={path}
        fill={`url(#${patternId})`}
        fillOpacity="0.9"
        stroke="#cbd5e1"
        strokeWidth="1"
        aria-label={de.tooLateZone}
      />
    </>
  )
}
