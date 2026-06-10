import { z } from 'zod'

import { DEFAULT_ACTIVITIES, DEFAULT_GOAL_TIME } from '../constants/defaultActivities'
import { activitySchema, appModeSchema, type Activity } from '../types/plan'

export const planSearchSchema = z.object({
  goal: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional()
    .default(DEFAULT_GOAL_TIME),
  mode: appModeSchema.optional().default('planning'),
  plan: z.string().optional(),
})

export type PlanSearch = z.infer<typeof planSearchSchema>

export type PlanSearchParams = {
  goal?: string
  mode?: PlanSearch['mode']
  plan?: string
}

function toBase64Url(value: string) {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/u, '')
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeActivities(activities: Activity[]) {
  return toBase64Url(JSON.stringify(activities))
}

export function decodeActivities(encoded?: string) {
  if (!encoded) return DEFAULT_ACTIVITIES

  try {
    return z.array(activitySchema).parse(JSON.parse(fromBase64Url(encoded)))
  } catch {
    return DEFAULT_ACTIVITIES
  }
}

export function activitiesEqual(left: Activity[], right: Activity[]) {
  return encodeActivities(left) === encodeActivities(right)
}

export function buildPlanSearch({
  goalTime,
  mode,
  activities,
}: {
  goalTime: string
  mode: PlanSearch['mode']
  activities: Activity[]
}): PlanSearchParams {
  const search: PlanSearchParams = {}

  if (goalTime !== DEFAULT_GOAL_TIME) {
    search.goal = goalTime
  }

  if (mode !== 'planning') {
    search.mode = mode
  }

  if (!activitiesEqual(activities, DEFAULT_ACTIVITIES)) {
    search.plan = encodeActivities(activities)
  }

  return search
}
