import { StepBadge } from '../ui/StepBadge'
import { de } from '../../i18n/de'
import { usePlanState } from '../../hooks/usePlanState'
import { ClockPanel } from '../clock/ClockPanel'
import { ActivityList } from './ActivityList'
import { GoalTimeBar } from './GoalTimeBar'
import { RoutineStartSummary } from './RoutineStartSummary'

export function PlanningView() {
  const { setMode } = usePlanState()

  return (
    <div className="flex flex-col gap-6">
      <GoalTimeBar />
      <section className="rounded-3xl border border-slate-200/40 bg-white/20 p-5 shadow-sm">
        <div className="mb-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h2 className="flex items-start gap-2 text-xl text-slate-700">
                <StepBadge step={3} />
                <span>
                  <span className="font-semibold">{de.clocksTitle}</span>{' '}
                  <span className="font-normal">{de.clocksDetail}</span>
                </span>
              </h2>
              <RoutineStartSummary className="pl-9" />
            </div>
            <button
              type="button"
              onClick={() => setMode('clock')}
              className="bg-peach flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold text-slate-800 shadow-sm hover:bg-orange-200"
            >
              <StepBadge step={4} />
              {de.openClockMode}
            </button>
          </div>
        </div>
        <ClockPanel layout="columns" align="end" />
      </section>
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <ActivityList />
      </section>
    </div>
  )
}
