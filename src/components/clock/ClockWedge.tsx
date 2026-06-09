import { describeArc, minuteToAngle, polarToCartesian } from '../../lib/time'
import type { WedgeSegment } from '../../types/plan'

type ClockWedgeProps = {
  wedge: WedgeSegment
  size: number
  active?: boolean
}

export function ClockWedge({ wedge, size, active = false }: ClockWedgeProps) {
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.42
  const path = describeArc(cx, cy, radius, wedge.startMinute, wedge.endMinute)
  const duration = wedge.endMinute - wedge.startMinute
  const midMinute = wedge.startMinute + duration / 2
  const labelPos = polarToCartesian(cx, cy, radius * 0.65, minuteToAngle(midMinute))
  const subdivisions = []

  for (let minute = wedge.startMinute + 5; minute < wedge.endMinute; minute += 5) {
    const inner = polarToCartesian(cx, cy, radius * 0.2, minuteToAngle(minute))
    const outer = polarToCartesian(cx, cy, radius, minuteToAngle(minute))
    subdivisions.push(
      <line
        key={minute}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />,
    )
  }

  return (
    <g>
      <path
        d={path}
        fill={wedge.color}
        stroke={active ? '#1e293b' : 'white'}
        strokeWidth={active ? 3 : 2}
        opacity={active ? 1 : 0.95}
      />
      {duration > 5 ? subdivisions : null}
      <text
        x={labelPos.x}
        y={labelPos.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.08}
      >
        {wedge.emoji}
      </text>
    </g>
  )
}
