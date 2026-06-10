type StepBadgeProps = {
  step: 1 | 2 | 3 | 4
}

export function StepBadge({ step }: StepBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500 text-sm font-semibold text-white shadow-sm"
    >
      {step}
    </span>
  )
}
