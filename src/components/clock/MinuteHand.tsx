import { minuteToAngle, polarToCartesian } from '../../lib/time'

type MinuteHandProps = {
  minute: number
  size: number
  visible: boolean
}

export function MinuteHand({ minute, size, visible }: MinuteHandProps) {
  if (!visible) return null

  const cx = size / 2
  const cy = size / 2
  const tip = polarToCartesian(cx, cy, size * 0.36, minuteToAngle(minute))

  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={tip.x}
        y2={tip.y}
        stroke="#1e293b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={size * 0.04} fill="#1e293b" />
    </g>
  )
}
