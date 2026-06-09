import { de } from '../../i18n/de'
import { ClockPanel } from '../clock/ClockPanel'
import { ActivityList } from './ActivityList'
import { GoalTimeBar } from './GoalTimeBar'
import { RoutineStartSummary } from './RoutineStartSummary'

export function PlanningView() {
  return (
    <div className="flex flex-col gap-6">
      <GoalTimeBar />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <section className="rounded-3xl bg-white/80 p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-700">{de.clocks}</h2>
          <ClockPanel />
        </section>
        <section className="flex flex-col gap-4 rounded-3xl bg-white/80 p-5 shadow-sm">
          <ActivityList />
          <RoutineStartSummary />
        </section>
      </div>
    </div>
  )
}
