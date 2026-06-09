import { de } from '../../i18n/de'
import { usePlanStore } from '../../store/planStore'

export function AppHeader() {
  const setMode = usePlanStore((state) => state.setMode)

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-3xl font-semibold text-slate-800">{de.appTitle}</h1>
      <button
        type="button"
        onClick={() => setMode('clock')}
        className="bg-peach rounded-2xl px-5 py-3 text-base font-semibold text-slate-800 shadow-sm hover:bg-orange-200"
      >
        {de.openClockMode}
      </button>
    </header>
  )
}
