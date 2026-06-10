import {
  DURATION_STEP_MINUTES,
  MAX_DURATION_MINUTES,
  MIN_DURATION_MINUTES,
  stepDurationMinutes,
} from '../../constants/durations'
import { de } from '../../i18n/de'

type DurationStepperProps = {
  value: number
  onChange: (minutes: number) => void
}

export function DurationStepper({ value, onChange }: DurationStepperProps) {
  const canDecrease = value > MIN_DURATION_MINUTES
  const canIncrease = value < MAX_DURATION_MINUTES

  return (
    <div className="flex h-10 items-stretch gap-1.5">
      <button
        type="button"
        onClick={() => onChange(stepDurationMinutes(value, -DURATION_STEP_MINUTES))}
        disabled={!canDecrease}
        aria-label={de.decreaseDuration}
        className="flex w-10 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-white/90 text-lg font-semibold text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>
      <span
        aria-label={de.durationLabel(value)}
        className="@container flex min-w-0 flex-1 items-center justify-center rounded-xl border border-white/40 bg-white/90 px-2 text-sm font-semibold text-slate-700 tabular-nums"
      >
        <span className="@min-[3rem]:hidden">{value}</span>
        <span className="hidden @min-[3rem]:inline">{de.durationLabel(value)}</span>
      </span>
      <button
        type="button"
        onClick={() => onChange(stepDurationMinutes(value, DURATION_STEP_MINUTES))}
        disabled={!canIncrease}
        aria-label={de.increaseDuration}
        className="flex w-10 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-white/90 text-lg font-semibold text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  )
}
