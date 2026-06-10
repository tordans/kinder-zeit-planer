import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

import { StepBadge } from '../ui/StepBadge'
import { de } from '../../i18n/de'
import { usePlanState } from '../../hooks/usePlanState'
import { ActivityDraftRow } from './ActivityDraftRow'
import { ActivityRow } from './ActivityRow'

export function ActivityList() {
  const { goalTime, activities, removeActivity, updateActivity, reorderActivities } = usePlanState()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    reorderActivities(String(active.id), String(over.id))
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-start gap-2 text-xl text-slate-700">
        <StepBadge step={2} />
        <span>
          <span className="font-semibold">{de.activitiesTitle}</span>{' '}
          <span className="font-normal">{de.activitiesDetail}</span>
        </span>
      </h2>
      <div className="relative pb-2">
        <div
          className="pointer-events-none absolute top-6 right-0 bottom-2 w-0.5 rounded-full bg-red-500/80"
          aria-hidden="true"
        />
        <span className="pointer-events-none absolute top-0 right-0 text-xs font-bold text-red-600 tabular-nums">
          {de.goalTime} {goalTime}
        </span>
        <div className="flex flex-row-reverse items-end justify-start gap-2 overflow-x-auto pt-6 pr-1">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activities.map((a) => a.id)}
              strategy={horizontalListSortingStrategy}
            >
              {activities.map((activity) => (
                <ActivityRow
                  key={activity.id}
                  activity={activity}
                  onUpdate={(patch) => updateActivity(activity.id, patch)}
                  onRemove={() => removeActivity(activity.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <div className="mt-4 border-t-2 border-dashed border-slate-300/90 pt-4">
        <p className="mb-3 text-sm font-semibold text-slate-600">{de.newActivity}</p>
        <div className="flex justify-start">
          <ActivityDraftRow />
        </div>
      </div>
    </div>
  )
}
