import { ClockModeView } from './components/clockMode/ClockModeView'
import { AppHeader } from './components/layout/AppHeader'
import { PlanningView } from './components/planning/PlanningView'
import { usePlanState } from './hooks/usePlanState'

export function App() {
  const { mode } = usePlanState()

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {mode === 'planning' ? (
        <>
          <AppHeader />
          <main className="mt-6">
            <PlanningView />
          </main>
        </>
      ) : (
        <ClockModeView />
      )}
    </div>
  )
}
