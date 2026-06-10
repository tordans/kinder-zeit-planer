import { de } from '../../i18n/de'
import { isMinuteInWedge } from '../../lib/hourLayout'
import { minuteToAngle, polarToCartesian } from '../../lib/time'
import type { HourClock as HourClockType } from '../../types/plan'
import { ClockWedge } from './ClockWedge'
import { MinuteHand } from './MinuteHand'
import { TooLateZone } from './TooLateZone'

type HourClockProps = {
  clock: HourClockType
  size?: number
  fluid?: boolean
  showLiveHand?: boolean
  showHourRange?: boolean
  startMinute?: number
  startTimeLabel?: string
  goalTimeLabel?: string
  currentHour?: number
  currentMinute?: number
}

export function HourClock({
  clock,
  size = 280,
  fluid = false,
  showLiveHand = false,
  showHourRange = false,
  startMinute,
  startTimeLabel,
  goalTimeLabel,
  currentHour,
  currentMinute,
}: HourClockProps) {
  const pad = 24
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.42
  const labelRadius = radius * 1.18
  const ticks = []

  for (let minute = 0; minute < 60; minute += 5) {
    const outer = polarToCartesian(cx, cy, radius, minuteToAngle(minute))
    const inner = polarToCartesian(
      cx,
      cy,
      radius * (minute % 15 === 0 ? 0.82 : 0.9),
      minuteToAngle(minute),
    )
    ticks.push(
      <line
        key={minute}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        stroke="#94a3b8"
        strokeWidth={minute % 15 === 0 ? 2.5 : 1.5}
      />,
    )
  }

  const startLabelPos =
    startMinute !== undefined
      ? polarToCartesian(cx, cy, labelRadius * 1.1, minuteToAngle(startMinute))
      : null

  const goalLabelPos =
    clock.goalMinute !== undefined
      ? polarToCartesian(cx, cy, labelRadius * 1.12, minuteToAngle(clock.goalMinute))
      : null

  const showHand = showLiveHand && currentHour === clock.hour && currentMinute !== undefined

  return (
    <div
      className={
        fluid
          ? 'flex min-w-[220px] flex-[1_1_280px] flex-col items-center gap-3'
          : 'flex flex-col items-center gap-3'
      }
    >
      <h3
        className={
          fluid
            ? 'text-center text-xl font-semibold text-slate-700 sm:text-2xl'
            : 'text-center text-lg font-semibold text-slate-700'
        }
      >
        {showHourRange ? de.hourRangeLabel(clock.hour) : de.hourLabel(clock.hour)}
      </h3>
      <svg
        width={fluid ? undefined : size}
        height={fluid ? undefined : size}
        viewBox={`${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`}
        className={
          fluid
            ? 'aspect-square w-full max-w-full drop-shadow-md overflow-visible'
            : 'drop-shadow-md overflow-visible'
        }
      >
        <circle cx={cx} cy={cy} r={radius} fill="white" stroke="#cbd5e1" strokeWidth="4" />
        {ticks}
        {clock.goalMinute !== undefined ? (
          <TooLateZone
            cx={cx}
            cy={cy}
            radius={radius}
            goalMinute={clock.goalMinute}
            patternId={`too-late-${clock.hour}`}
          />
        ) : null}
        {clock.wedges.map((wedge, index) => (
          <ClockWedge
            key={`${wedge.activityId}-${wedge.startMinute}-${index}`}
            wedge={wedge}
            size={size}
            active={
              showHand && currentMinute !== undefined
                ? isMinuteInWedge(currentMinute, wedge)
                : false
            }
          />
        ))}
        <MinuteHand minute={currentMinute ?? 0} size={size} visible={showHand} />
        {[0, 15, 30, 45].map((minute) => {
          const pos = polarToCartesian(cx, cy, labelRadius, minuteToAngle(minute))
          return (
            <text
              key={minute}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="13"
              fontWeight="500"
              fill="#64748b"
            >
              {minute}
            </text>
          )
        })}
        {goalLabelPos ? (
          <g aria-label={de.goalTime}>
            <line
              x1={cx}
              y1={cy}
              x2={goalLabelPos.x}
              y2={goalLabelPos.y}
              stroke="#dc2626"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {goalTimeLabel ? (
              <text
                x={goalLabelPos.x}
                y={goalLabelPos.y - 18}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="13"
                fill="#dc2626"
                fontWeight="700"
              >
                {goalTimeLabel}
              </text>
            ) : null}
            <text
              x={goalLabelPos.x}
              y={goalLabelPos.y - (goalTimeLabel ? 4 : 14)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fill="#dc2626"
              fontWeight="600"
            >
              {de.goalTime}
            </text>
          </g>
        ) : null}
        {startLabelPos ? (
          <g aria-label={de.startMarker}>
            <line
              x1={cx}
              y1={cy}
              x2={startLabelPos.x}
              y2={startLabelPos.y}
              stroke="#059669"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {startTimeLabel ? (
              <text
                x={startLabelPos.x}
                y={startLabelPos.y + 8}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="13"
                fill="#059669"
                fontWeight="700"
              >
                {startTimeLabel}
              </text>
            ) : null}
            <text
              x={startLabelPos.x}
              y={startLabelPos.y + (startTimeLabel ? 22 : 14)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fill="#059669"
              fontWeight="600"
            >
              {de.startMarker}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  )
}
