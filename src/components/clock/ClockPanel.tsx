import { buildHourClocks, computeRoutineStart } from '../../lib/hourLayout'
import { getMinuteOnHour } from '../../lib/time'
import { usePlanStore } from '../../store/planStore'
import { HourClock } from './HourClock'

type ClockPanelLayout = 'stack' | 'columns'

type ClockPanelProps = {
  showLiveHand?: boolean
  currentHour?: number
  currentMinute?: number
  layout?: ClockPanelLayout
}

function getClockSize(clockCount: number, layout: ClockPanelLayout) {
  if (layout === 'stack') return 280
  if (clockCount <= 1) return 300
  if (clockCount === 2) return 260
  return 220
}

export function ClockPanel({
  showLiveHand,
  currentHour,
  currentMinute,
  layout = 'stack',
}: ClockPanelProps) {
  const goalTime = usePlanStore((state) => state.goalTime)
  const activities = usePlanStore((state) => state.activities)
  const clocks = buildHourClocks(goalTime, activities)
  const routineStart = computeRoutineStart(goalTime, activities)
  const orderedClocks = layout === 'columns' ? [...clocks].reverse() : clocks
  const clockSize = getClockSize(clocks.length, layout)

  if (clocks.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-3xl bg-white/70 p-6 text-slate-500">
        Füge Tätigkeiten hinzu, um die Uhr zu füllen.
      </div>
    )
  }

  const layoutClass =
    layout === 'columns'
      ? 'grid w-full max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2'
      : 'flex flex-col gap-8'

  return (
    <div className={layoutClass}>
      {orderedClocks.map((clock) => (
        <HourClock
          key={clock.hour}
          clock={clock}
          size={clockSize}
          showLiveHand={showLiveHand}
          showHourRange
          startMinute={getMinuteOnHour(routineStart, clock.hour)}
          currentHour={currentHour}
          currentMinute={currentMinute}
        />
      ))}
    </div>
  )
}
