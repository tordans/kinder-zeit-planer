import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DEFAULT_ACTIVITIES, DEFAULT_GOAL_TIME } from '../constants/defaultActivities'
import { buildHourClocks, computeRoutineStart, getTotalDuration } from '../lib/hourLayout'
import type { Activity, AppMode } from '../types/plan'

type PlanStore = {
  goalTime: string
  activities: Activity[]
  mode: AppMode
  setGoalTime: (goalTime: string) => void
  addActivity: (activity: Omit<Activity, 'id'>) => void
  removeActivity: (id: string) => void
  updateActivity: (id: string, patch: Partial<Activity>) => void
  reorderActivities: (activeId: string, overId: string) => void
  setMode: (mode: AppMode) => void
  getHourClocks: () => ReturnType<typeof buildHourClocks>
  getRoutineStartTime: () => string
  getTotalDuration: () => number
}

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

export const usePlanStore = create<PlanStore>()(
  persist(
    (set, get) => ({
      goalTime: DEFAULT_GOAL_TIME,
      activities: DEFAULT_ACTIVITIES,
      mode: 'planning',
      setGoalTime: (goalTime) => set({ goalTime }),
      addActivity: (activity) =>
        set((state) => ({
          activities: [...state.activities, { ...activity, id: createId() }],
        })),
      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id),
        })),
      updateActivity: (id, patch) =>
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, ...patch } : activity,
          ),
        })),
      reorderActivities: (activeId, overId) =>
        set((state) => ({
          activities: reorderList(state.activities, activeId, overId),
        })),
      setMode: (mode) => set({ mode }),
      getHourClocks: () => buildHourClocks(get().goalTime, get().activities),
      getRoutineStartTime: () => computeRoutineStart(get().goalTime, get().activities),
      getTotalDuration: () => getTotalDuration(get().activities),
    }),
    {
      name: 'kinder-zeit-planer',
      partialize: (state) => ({
        goalTime: state.goalTime,
        activities: state.activities,
      }),
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<PlanStore>),
        mode: 'planning',
      }),
    },
  ),
)
