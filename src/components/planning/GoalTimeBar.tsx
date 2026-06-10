import { useEffect, useState } from 'react'

import { StepBadge } from '../ui/StepBadge'
import { de } from '../../i18n/de'
import { usePlanState } from '../../hooks/usePlanState'
import { isValidGoalTime, snapGoalTimeToFiveMinutes } from '../../lib/time'

const ARROW_TRAIL_COUNT = 40

function GoalArrowTrail() {
  return (
    <div className="hidden min-w-0 flex-1 items-center overflow-hidden px-1 sm:flex" aria-hidden="true">
      <div className="flex w-full items-center justify-between text-lg text-slate-300">
        {Array.from({ length: ARROW_TRAIL_COUNT }, (_, index) => (
          <span key={index} className="leading-none select-none">
            →
          </span>
        ))}
      </div>
    </div>
  )
}

export function GoalTimeBar() {
  const { goalTime, setGoalTime } = usePlanState()
  const [inputValue, setInputValue] = useState(goalTime)

  useEffect(
    function syncGoalTimeFromUrl() {
      setInputValue(goalTime)
    },
    [goalTime],
  )

  function commitGoalTime(value: string) {
    if (isValidGoalTime(value)) {
      setGoalTime(value)
      setInputValue(value)
      return
    }

    const snapped = snapGoalTimeToFiveMinutes(value)
    if (snapped) {
      setGoalTime(snapped)
      setInputValue(snapped)
      return
    }

    setInputValue(goalTime)
  }

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <label className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="flex shrink-0 items-center gap-2 text-xl font-semibold text-slate-700">
          <StepBadge step={1} />
          {de.goalTimeLabel}
        </span>
        <GoalArrowTrail />
        <input
          type="time"
          step={300}
          min="00:00"
          max="23:55"
          value={inputValue}
          onChange={(event) => {
            const value = event.target.value
            setInputValue(value)
            if (isValidGoalTime(value)) {
              setGoalTime(value)
            }
          }}
          onBlur={() => commitGoalTime(inputValue)}
          aria-label={de.goalTime}
          className="w-full shrink-0 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-lg font-bold text-red-600 tabular-nums sm:ml-0 sm:w-auto"
        />
      </label>
    </section>
  )
}
