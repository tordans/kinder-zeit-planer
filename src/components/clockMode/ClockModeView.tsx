import { useEffect, useRef } from 'react'

import { useCurrentMinute } from '../../hooks/useCurrentMinute'
import { de } from '../../i18n/de'
import { usePlanStore } from '../../store/planStore'
import { ClockPanel } from '../clock/ClockPanel'

export function ClockModeView() {
  const setMode = usePlanStore((state) => state.setMode)
  const { hour, minute, time } = useCurrentMinute()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(function focusCloseOnOpen() {
    closeButtonRef.current?.focus()
  }, [])

  useEffect(
    function trapEscapeToClose() {
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          setMode('planning')
        }
      }

      window.addEventListener('keydown', onKeyDown)
      return () => window.removeEventListener('keydown', onKeyDown)
    },
    [setMode],
  )

  return (
    <div
      className="bg-sky-soft fixed inset-0 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={de.clockModeTitle}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={() => setMode('planning')}
        aria-label={de.closeClockMode}
        className="absolute top-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-md hover:bg-white active:scale-95"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M6 6l12 12M18 6L6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="flex flex-1 flex-col items-center overflow-auto p-6 pt-16">
        <p className="mb-8 text-4xl font-semibold text-slate-800 tabular-nums">
          {de.currentTimeHeader(time)}
        </p>
        <ClockPanel layout="columns" showLiveHand currentHour={hour} currentMinute={minute} />
      </div>
    </div>
  )
}
