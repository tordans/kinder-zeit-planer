import { useNavigate } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'

import { buildHourClocks, computeRoutineStart, getTotalDuration } from '../lib/hourLayout'
import { buildPlanSearch, decodeActivities } from '../lib/planUrl'
import { indexRouteApi } from '../router'
import type { Activity, AppMode } from '../types/plan'

function createId() {
  return crypto.randomUUID()
}

function reorderList<T extends { id: string }>(items: T[], activeId: string, overId: string) {
  const oldIndex = items.findIndex((item) => item.id === activeId)
  const newIndex = items.findIndex((item) => item.id === overId)
  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
    return items
  }

  const next = [...items]
  const [moved] = next.splice(oldIndex, 1)
  next.splice(newIndex, 0, moved)
  return next
}

export function usePlanState() {
  const search = indexRouteApi.useSearch()
  const navigate = useNavigate({ from: '/' })

  const goalTime = search.goal
  const mode = search.mode
  const activities = useMemo(() => decodeActivities(search.plan), [search.plan])

  const commit = useCallback(
    (next: {
      goalTime?: string
      mode?: AppMode
      activities?: Activity[]
    }) => {
      const params = buildPlanSearch({
        goalTime: next.goalTime ?? goalTime,
        mode: next.mode ?? mode,
        activities: next.activities ?? activities,
      })

      navigate({
        search: {
          goal: params.goal,
          mode: params.mode,
          plan: params.plan,
        },
        replace: true,
        resetScroll: false,
      })
    },
    [activities, goalTime, mode, navigate],
  )

  return {
    goalTime,
    mode,
    activities,
    setGoalTime: (nextGoalTime: string) => commit({ goalTime: nextGoalTime }),
    setMode: (nextMode: AppMode) => commit({ mode: nextMode }),
    addActivity: (activity: Omit<Activity, 'id'>) =>
      commit({
        activities: [...activities, { ...activity, id: createId() }],
      }),
    removeActivity: (id: string) =>
      commit({
        activities: activities.filter((activity) => activity.id !== id),
      }),
    updateActivity: (id: string, patch: Partial<Activity>) =>
      commit({
        activities: activities.map((activity) =>
          activity.id === id ? { ...activity, ...patch } : activity,
        ),
      }),
    reorderActivities: (activeId: string, overId: string) =>
      commit({
        activities: reorderList(activities, activeId, overId),
      }),
    getHourClocks: () => buildHourClocks(goalTime, activities),
    getRoutineStartTime: () => computeRoutineStart(goalTime, activities),
    getTotalDuration: () => getTotalDuration(activities),
  }
}
