import type { Activity } from '../types/plan'

export const DEFAULT_GOAL_TIME = '08:15'

export const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: '5',
    label: 'Losgehen',
    durationMinutes: 10,
    color: '#c4b5fd',
    emoji: '🚪',
  },
  {
    id: '4',
    label: 'Zähneputzen',
    durationMinutes: 5,
    color: '#86efac',
    emoji: '🦷',
  },
  {
    id: '3',
    label: 'Frühstück',
    durationMinutes: 20,
    color: '#fcd34d',
    emoji: '🥣',
  },
  {
    id: '2',
    label: 'Anziehen',
    durationMinutes: 15,
    color: '#93c5fd',
    emoji: '👕',
  },
  {
    id: '1',
    label: 'Aufstehen',
    durationMinutes: 5,
    color: '#f9a8d4',
    emoji: '🛏️',
  },
]

export const ACTIVITY_COLORS = [
  '#f9a8d4',
  '#93c5fd',
  '#fcd34d',
  '#86efac',
  '#c4b5fd',
  '#fda4af',
  '#fdba74',
] as const

export type ActivityDraft = Omit<Activity, 'id'>

export function createActivityDraft(activityCount: number): ActivityDraft {
  return {
    label: '',
    durationMinutes: 5,
    color: ACTIVITY_COLORS[activityCount % ACTIVITY_COLORS.length],
    emoji: '⭐',
  }
}
