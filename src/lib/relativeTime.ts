import { TZDate } from '@date-fns/tz'
import { formatDistance } from 'date-fns'
import { de as deLocale } from 'date-fns/locale/de'

import { parseTime } from './time'

const BERLIN_TZ = 'Europe/Berlin'

export function getBerlinNow() {
  return new TZDate(Date.now(), BERLIN_TZ)
}

export function timeTodayInBerlin(time: string) {
  const totalMinutes = parseTime(time)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const now = getBerlinNow()

  return new TZDate(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    BERLIN_TZ,
  )
}

export function formatRelativeToNowInBerlin(targetTime: string) {
  const now = getBerlinNow()
  const target = timeTodayInBerlin(targetTime)

  return formatDistance(target, now, { locale: deLocale, addSuffix: true })
}
