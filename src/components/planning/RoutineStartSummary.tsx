import { useCurrentMinute } from '../../hooks/useCurrentMinute'
import { de } from '../../i18n/de'
import { computeRoutineStart, getTotalDuration } from '../../lib/hourLayout'
import { formatRelativeToNowInBerlin } from '../../lib/relativeTime'
import { usePlanStore } from '../../store/planStore'

export function RoutineStartSummary() {
  useCurrentMinute()

  const goalTime = usePlanStore((state) => state.goalTime)
  const activities = usePlanStore((state) => state.activities)
  const routineStart = computeRoutineStart(goalTime, activities)
  const totalDuration = getTotalDuration(activities)
  const relativeStart = formatRelativeToNowInBerlin(routineStart)

  if (totalDuration === 0) return null

  return (
    <section className="bg-mint rounded-3xl p-5 shadow-sm">
      <p className="text-sm text-slate-600">{de.routineStartHint}</p>
      <p className="text-2xl font-semibold text-slate-800">
        {de.routineStart}: <span className="text-emerald-700">{routineStart} Uhr</span>
      </p>
      <p className="mt-1 text-base text-slate-600">{de.routineStartRelative(relativeStart)}</p>
    </section>
  )
}
