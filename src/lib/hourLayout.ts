import type { Activity, HourClock, WedgeSegment } from '../types/plan'
import { formatTime, parseTime } from './time'

type TimeRange = {
  activity: Activity
  start: number
  end: number
}

function splitRangeByHour(start: number, end: number) {
  const parts: Array<{ hour: number; startMinute: number; endMinute: number }> = []
  let cursor = start

  while (cursor < end) {
    const hour = Math.floor(cursor / 60) % 24
    const hourStart = hour * 60
    const hourEnd = hourStart + 60
    const partEnd = Math.min(end, hourEnd)
    parts.push({
      hour,
      startMinute: cursor - hourStart,
      endMinute: partEnd - hourStart,
    })
    cursor = partEnd
  }

  return parts
}

export function buildActivityRanges(goalTime: string, activities: Activity[]): TimeRange[] {
  let cursor = parseTime(goalTime)

  return activities.map((activity) => {
    const end = cursor
    const start = cursor - activity.durationMinutes
    cursor = start
    return { activity, start, end }
  })
}

export function buildHourClocks(goalTime: string, activities: Activity[]): HourClock[] {
  const goalMinutes = parseTime(goalTime)
  const goalHour = Math.floor(goalMinutes / 60) % 24
  const goalMinute = goalMinutes % 60
  const clockMap = new Map<number, HourClock>()

  clockMap.set(goalHour, { hour: goalHour, goalMinute, wedges: [] })

  for (const range of buildActivityRanges(goalTime, activities)) {
    for (const part of splitRangeByHour(range.start, range.end)) {
      const clock = clockMap.get(part.hour) ?? { hour: part.hour, wedges: [] }
      clock.wedges.push({
        activityId: range.activity.id,
        startMinute: part.startMinute,
        endMinute: part.endMinute,
        color: range.activity.color,
        emoji: range.activity.emoji,
        label: range.activity.label,
      })
      clockMap.set(part.hour, clock)
    }
  }

  const goalClock = clockMap.get(goalHour)
  if (goalClock) {
    goalClock.goalMinute = goalMinute
  }

  return [...clockMap.values()].sort((a, b) => {
    const aIsGoal = a.goalMinute !== undefined
    const bIsGoal = b.goalMinute !== undefined
    if (aIsGoal !== bIsGoal) return aIsGoal ? -1 : 1
    return b.hour - a.hour
  })
}

export function computeRoutineStart(goalTime: string, activities: Activity[]) {
  const total = activities.reduce((sum, activity) => sum + activity.durationMinutes, 0)
  return formatTime(parseTime(goalTime) - total)
}

export function getTotalDuration(activities: Activity[]) {
  return activities.reduce((sum, activity) => sum + activity.durationMinutes, 0)
}

export function isMinuteInWedge(minute: number, wedge: WedgeSegment) {
  return minute >= wedge.startMinute && minute < wedge.endMinute
}
