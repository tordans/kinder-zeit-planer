import { buildHourClocks, computeRoutineStart } from '../../lib/hourLayout'
import { getMinuteOnHour } from '../../lib/time'
import { usePlanState } from '../../hooks/usePlanState'
import { HourClock } from './HourClock'

type ClockPanelLayout = 'stack' | 'columns' | 'fluid'

type ClockPanelProps = {
  showLiveHand?: boolean
  currentHour?: number
  currentMinute?: number
  layout?: ClockPanelLayout
  align?: 'center' | 'end'
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
  align = 'center',
}: ClockPanelProps) {
  const { goalTime, activities } = usePlanState()
  const clocks = buildHourClocks(goalTime, activities)
  const routineStart = computeRoutineStart(goalTime, activities)
  const orderedClocks =
    layout === 'columns' || layout === 'fluid' ? [...clocks].reverse() : clocks
  const clockSize = getClockSize(clocks.length, layout)

  if (clocks.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-3xl bg-white/70 p-6 text-slate-500">
        Füge Tätigkeiten hinzu, um die Uhr zu füllen.
      </div>
    )
  }

  const layoutClass =
    layout === 'fluid'
      ? 'flex w-full flex-wrap items-stretch justify-center gap-6'
      : layout === 'columns'
        ? `flex w-full flex-row flex-wrap items-start gap-x-10 gap-y-8 ${align === 'end' ? 'justify-end' : 'justify-center'}`
        : 'flex flex-col gap-8'

  return (
    <div className={layoutClass}>
      {orderedClocks.map((clock) => (
        <HourClock
          key={clock.hour}
          clock={clock}
          size={layout === 'fluid' ? 280 : clockSize}
          fluid={layout === 'fluid'}
          showLiveHand={showLiveHand}
          showHourRange
          startMinute={getMinuteOnHour(routineStart, clock.hour)}
          startTimeLabel={
            getMinuteOnHour(routineStart, clock.hour) !== undefined ? routineStart : undefined
          }
          goalTimeLabel={clock.goalMinute !== undefined ? goalTime : undefined}
          currentHour={currentHour}
          currentMinute={currentMinute}
        />
      ))}
    </div>
  )
}
