import { useCurrentMinute } from '../../hooks/useCurrentMinute'
import { de } from '../../i18n/de'
import { computeRoutineStart, getTotalDuration } from '../../lib/hourLayout'
import { formatRelativeToNowInBerlin } from '../../lib/relativeTime'
import { usePlanState } from '../../hooks/usePlanState'

type RoutineStartSummaryProps = {
  className?: string
}

export function RoutineStartSummary({ className }: RoutineStartSummaryProps) {
  useCurrentMinute()

  const { goalTime, activities } = usePlanState()
  const routineStart = computeRoutineStart(goalTime, activities)
  const totalDuration = getTotalDuration(activities)
  const relativeStart = formatRelativeToNowInBerlin(routineStart)

  if (totalDuration === 0) return null

  return (
    <p className={`text-base text-slate-600${className ? ` ${className}` : ''}`}>
      {de.routineStart}:{' '}
      <span className="font-semibold text-emerald-700">{routineStart} Uhr</span>
      <span className="mx-2 text-slate-400">·</span>
      {de.routineStartRelative(relativeStart)}
    </p>
  )
}
