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
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { de } from '../../i18n/de'
import { usePlanStore } from '../../store/planStore'
import { ActivityDraftRow } from './ActivityDraftRow'
import { ActivityRow } from './ActivityRow'

export function ActivityList() {
  const activities = usePlanStore((state) => state.activities)
  const removeActivity = usePlanStore((state) => state.removeActivity)
  const updateActivity = usePlanStore((state) => state.updateActivity)
  const reorderActivities = usePlanStore((state) => state.reorderActivities)

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
      <div>
        <h2 className="text-xl font-semibold text-slate-700">{de.activities}</h2>
        <p className="text-sm text-slate-500">{de.activitiesHint}</p>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={activities.map((a) => a.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3">
            {activities.map((activity) => (
              <ActivityRow
                key={activity.id}
                activity={activity}
                onUpdate={(patch) => updateActivity(activity.id, patch)}
                onRemove={() => removeActivity(activity.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <ActivityDraftRow />
    </div>
  )
}
