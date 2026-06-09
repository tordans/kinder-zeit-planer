import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { DURATION_OPTIONS } from '../../constants/durations'
import { de } from '../../i18n/de'
import type { Activity } from '../../types/plan'
import { ColorPicker } from '../pickers/ColorPicker'
import { EmojiPicker } from '../pickers/EmojiPicker'
import { WedgePreview } from './WedgePreview'

type ActivityRowProps = {
  activity: Activity
  onUpdate: (patch: Partial<Activity>) => void
  onRemove: () => void
}

export function ActivityRow({ activity, onUpdate, onRemove }: ActivityRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex flex-wrap items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ${isDragging ? 'opacity-70' : ''}`}
    >
      <button
        type="button"
        className="cursor-grab touch-none px-2 text-2xl text-slate-400 active:cursor-grabbing"
        aria-label={de.dragHandle}
        {...attributes}
        {...listeners}
      >
        ≡
      </button>
      <WedgePreview color={activity.color} durationMinutes={activity.durationMinutes} />
      <EmojiPicker
        value={activity.emoji}
        onChange={(emoji) => onUpdate({ emoji })}
        label={de.emojiPicker}
      />
      <input
        type="text"
        value={activity.label}
        onChange={(event) => onUpdate({ label: event.target.value })}
        placeholder={de.activityLabelPlaceholder}
        aria-label={de.activityLabel}
        className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-base placeholder:text-slate-400"
      />
      <select
        value={activity.durationMinutes}
        onChange={(event) => onUpdate({ durationMinutes: Number(event.target.value) })}
        aria-label={de.duration}
        className="rounded-xl border border-slate-200 px-3 py-2 text-base"
      >
        {DURATION_OPTIONS.map((duration) => (
          <option key={duration} value={duration}>
            {duration} Min
          </option>
        ))}
      </select>
      <ColorPicker
        value={activity.color}
        onChange={(color) => onUpdate({ color })}
        label={de.colorPicker}
      />
      <button
        type="button"
        onClick={onRemove}
        className="rounded-xl px-3 py-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
        aria-label={de.removeActivity}
      >
        🗑
      </button>
    </div>
  )
}
