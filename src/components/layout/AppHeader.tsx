import { de } from '../../i18n/de'

export function AppHeader() {
  return (
    <header>
      <h1 className="text-3xl font-semibold text-slate-800">{de.appTitle}</h1>
    </header>
  )
}
