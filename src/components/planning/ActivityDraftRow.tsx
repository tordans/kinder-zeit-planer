import { useState } from 'react'

import {
  createActivityDraft,
  type ActivityDraft,
} from '../../constants/defaultActivities'
import { DURATION_OPTIONS } from '../../constants/durations'
import { de } from '../../i18n/de'
import { durationToBarWidth } from '../../lib/activityBar'
import { extractEmojiColors } from '../../lib/emojiColors'
import { usePlanState } from '../../hooks/usePlanState'
import { ColorPicker } from '../pickers/ColorPicker'
import { EmojiPicker } from '../pickers/EmojiPicker'
import { WedgePreview } from './WedgePreview'

export function ActivityDraftRow() {
  const { activities, addActivity } = usePlanState()
  const [draft, setDraft] = useState<ActivityDraft>(() => createActivityDraft(activities.length))

  function updateDraft(patch: Partial<ActivityDraft>) {
    setDraft((current) => ({ ...current, ...patch }))
  }

  function handleSave() {
    addActivity({ ...draft, label: draft.label.trim() })
    setDraft(createActivityDraft(activities.length + 1))
  }

  return (
    <div
      className="flex shrink-0 flex-col gap-1.5"
      style={{ width: durationToBarWidth(draft.durationMinutes) }}
    >
      <div className="flex items-center justify-center gap-1">
        <span className="w-5 shrink-0" aria-hidden="true" />
        <WedgePreview color={draft.color} durationMinutes={draft.durationMinutes} />
      </div>
      <div
        className="flex flex-col gap-1.5 rounded-2xl border-2 border-dashed border-violet-300 p-2"
        style={{ backgroundColor: `${draft.color}cc` }}
      >
        <div className="flex h-10 items-stretch gap-1.5">
          <EmojiPicker
            value={draft.emoji}
            onChange={(emoji) => {
              const palette = extractEmojiColors(emoji)
              updateDraft({
                emoji,
                color: palette[0] ?? draft.color,
              })
            }}
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
            className="h-10 min-w-0 flex-1 rounded-xl border border-white/40 bg-white px-2 text-sm placeholder:text-slate-400"
          />
        </div>
        <select
          value={draft.durationMinutes}
          onChange={(event) => updateDraft({ durationMinutes: Number(event.target.value) })}
          aria-label={de.duration}
          className="h-10 w-full rounded-xl border border-white/40 bg-white px-2 text-sm"
        >
          {DURATION_OPTIONS.map((duration) => (
            <option key={duration} value={duration}>
              {duration} Min
            </option>
          ))}
        </select>
        <div className="flex h-10 items-center justify-between gap-1">
          <ColorPicker
            emoji={draft.emoji}
            value={draft.color}
            onChange={(color) => updateDraft({ color })}
            label={de.colorPicker}
          />
          <button
            type="button"
            onClick={handleSave}
            aria-label={de.saveActivity}
            className="flex h-8 min-w-[4.5rem] flex-1 items-center justify-center rounded-lg bg-emerald-500 text-xl leading-none font-semibold text-white shadow-sm hover:bg-emerald-600 active:scale-95"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
