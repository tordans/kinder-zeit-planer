import { de } from '../../i18n/de'
import { isValidGoalTime } from '../../lib/time'
import { usePlanStore } from '../../store/planStore'

export function GoalTimeBar() {
  const goalTime = usePlanStore((state) => state.goalTime)
  const setGoalTime = usePlanStore((state) => state.setGoalTime)

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <label className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <span className="text-base font-medium text-slate-700">{de.goalTimeLabel}</span>
        <input
          type="time"
          step={300}
          min="00:00"
          max="23:55"
          value={goalTime}
          onChange={(event) => {
            const value = event.target.value
            if (isValidGoalTime(value)) {
              setGoalTime(value)
            }
          }}
          aria-label={de.goalTime}
          className="rounded-2xl border border-slate-200 px-4 py-3 text-lg font-semibold"
        />
      </label>
    </section>
  )
}
