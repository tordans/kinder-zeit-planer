import { ClockModeView } from './components/clockMode/ClockModeView'
import { AppHeader } from './components/layout/AppHeader'
import { PlanningView } from './components/planning/PlanningView'
import { usePlanStore } from './store/planStore'

export function App() {
  const mode = usePlanStore((state) => state.mode)

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
