import { z } from 'zod'

export const activitySchema = z.object({
  id: z.string(),
  label: z.string(),
  durationMinutes: z.number().multipleOf(5).min(5).max(60),
  color: z.string(),
  emoji: z.string(),
})

export const appModeSchema = z.enum(['planning', 'clock'])

export const planStateSchema = z.object({
  goalTime: z.string().regex(/^\d{2}:\d{2}$/),
  activities: z.array(activitySchema),
  mode: appModeSchema,
})

export type Activity = z.infer<typeof activitySchema>
export type AppMode = z.infer<typeof appModeSchema>
export type PlanState = z.infer<typeof planStateSchema>

export type WedgeSegment = {
  activityId: string
  startMinute: number
  endMinute: number
  color: string
  emoji: string
  label: string
}

export type HourClock = {
  hour: number
  goalMinute?: number
  wedges: WedgeSegment[]
}
