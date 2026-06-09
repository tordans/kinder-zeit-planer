import { useEffect, useState } from 'react'

import { formatTime } from '../lib/time'

export function useCurrentMinute() {
  const [now, setNow] = useState(() => new Date())

  useEffect(function syncCurrentMinute() {
    const update = () => setNow(new Date())
    update()

    const nowDate = new Date()
    const msUntilNextMinute = (60 - nowDate.getSeconds()) * 1000 - nowDate.getMilliseconds()

    let interval: number | undefined

    const timeout = window.setTimeout(() => {
      update()
      interval = window.setInterval(update, 60_000)
    }, msUntilNextMinute)

    return () => {
      window.clearTimeout(timeout)
      if (interval !== undefined) {
        window.clearInterval(interval)
      }
    }
  }, [])

  const hours = now.getHours()
  const minutes = now.getMinutes()

  return {
    now,
    time: formatTime(hours * 60 + minutes),
    hour: hours,
    minute: minutes,
  }
}
