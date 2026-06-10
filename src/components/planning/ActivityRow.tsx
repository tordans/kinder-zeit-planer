import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { de } from '../../i18n/de'
import { durationToBarWidth } from '../../lib/activityBar'
import { extractEmojiColors } from '../../lib/emojiColors'
import type { Activity } from '../../types/plan'
import { ColorPicker } from '../pickers/ColorPicker'
import { EmojiPicker } from '../pickers/EmojiPicker'
import { DurationStepper } from './DurationStepper'
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
    width: durationToBarWidth(activity.durationMinutes),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex shrink-0 flex-col gap-1.5 ${isDragging ? 'opacity-70' : ''}`}
    >
      <div className="flex items-center justify-center gap-1">
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 cursor-grab touch-none items-center justify-center rounded-xl bg-white text-xl text-slate-400 shadow-sm ring-1 ring-slate-200 active:cursor-grabbing"
          aria-label={de.dragHandle}
          {...attributes}
          {...listeners}
        >
          ≡
        </button>
        <WedgePreview color={activity.color} durationMinutes={activity.durationMinutes} />
      </div>
      <div
        className="flex flex-col gap-1.5 rounded-2xl p-2 shadow-sm"
        style={{ backgroundColor: activity.color }}
      >
        <div className="flex h-10 items-stretch gap-1.5">
          <EmojiPicker
            value={activity.emoji}
            onChange={(emoji) => {
              const palette = extractEmojiColors(emoji)
              onUpdate({
                emoji,
                color: palette[0] ?? activity.color,
              })
            }}
            label={de.emojiPicker}
          />
          <input
            type="text"
            value={activity.label}
            onChange={(event) => onUpdate({ label: event.target.value })}
            placeholder={de.activityLabelPlaceholder}
            aria-label={de.activityLabel}
            className="h-10 min-w-0 flex-1 rounded-xl border border-white/40 bg-white/90 px-2 text-sm placeholder:text-slate-400"
          />
        </div>
        <DurationStepper
          value={activity.durationMinutes}
          onChange={(durationMinutes) => onUpdate({ durationMinutes })}
        />
        <div className="flex h-10 items-center justify-between gap-1">
          <ColorPicker
            emoji={activity.emoji}
            value={activity.color}
            onChange={(color) => onUpdate({ color })}
            label={de.colorPicker}
          />
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg bg-white/90 px-2 py-1 text-sm text-slate-500 hover:text-red-600"
            aria-label={de.removeActivity}
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  )
}
