import { useState } from 'react'

import {
  createActivityDraft,
  type ActivityDraft,
} from '../../constants/defaultActivities'
import { DURATION_OPTIONS } from '../../constants/durations'
import { de } from '../../i18n/de'
import { usePlanStore } from '../../store/planStore'
import { ColorPicker } from '../pickers/ColorPicker'
import { EmojiPicker } from '../pickers/EmojiPicker'
import { WedgePreview } from './WedgePreview'

export function ActivityDraftRow() {
  const activities = usePlanStore((state) => state.activities)
  const addActivity = usePlanStore((state) => state.addActivity)
  const [draft, setDraft] = useState<ActivityDraft>(() => createActivityDraft(activities.length))

  function updateDraft(patch: Partial<ActivityDraft>) {
    setDraft((current) => ({ ...current, ...patch }))
  }

  function handleSave() {
    addActivity({ ...draft, label: draft.label.trim() })
    setDraft(createActivityDraft(activities.length + 1))
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 p-3">
      <span className="w-8 shrink-0" aria-hidden="true" />
      <WedgePreview color={draft.color} durationMinutes={draft.durationMinutes} />
      <EmojiPicker
        value={draft.emoji}
        onChange={(emoji) => updateDraft({ emoji })}
        label={de.emojiPicker}
      />
      <input
        type="text"
        value={draft.label}
        onChange={(event) => updateDraft({ label: event.target.value })}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleSave()
        }}
        placeholder={de.activityLabelPlaceholder}
        aria-label={de.activityLabel}
        className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-base placeholder:text-slate-400"
      />
      <select
        value={draft.durationMinutes}
        onChange={(event) => updateDraft({ durationMinutes: Number(event.target.value) })}
        aria-label={de.duration}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-base"
      >
        {DURATION_OPTIONS.map((duration) => (
          <option key={duration} value={duration}>
            {duration} Min
          </option>
        ))}
      </select>
      <ColorPicker
        value={draft.color}
        onChange={(color) => updateDraft({ color })}
        label={de.colorPicker}
      />
      <button
        type="button"
        onClick={handleSave}
        aria-label={de.saveActivity}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-lg font-bold text-white shadow-md ring-2 ring-emerald-500/30 hover:bg-emerald-600 active:scale-95"
      >
        ✓
      </button>
    </div>
  )
}
