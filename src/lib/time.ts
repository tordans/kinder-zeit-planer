const MINUTES_PER_DAY = 24 * 60

export function parseTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function formatTime(totalMinutes: number) {
  const normalized = ((totalMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY
  const hours = Math.floor(normalized / 60)
  const minutes = normalized % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function subtractMinutes(time: string, minutes: number) {
  return formatTime(parseTime(time) - minutes)
}

export function minuteToAngle(minute: number) {
  return (minute / 60) * 360 - 90
}

export function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  }
}

export function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startMinute: number,
  endMinute: number,
) {
  const startAngle = minuteToAngle(startMinute)
  const endAngle = minuteToAngle(endMinute >= 60 ? 0 : endMinute)
  const start = polarToCartesian(cx, cy, radius, startAngle)
  const end = polarToCartesian(cx, cy, radius, endAngle)
  const span = endMinute - startMinute
  const largeArc = span > 30 ? 1 : 0
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`
}

export function getMinuteOnHour(time: string, hour: number) {
  const totalMinutes = parseTime(time)
  const timeHour = Math.floor(totalMinutes / 60) % 24
  if (timeHour !== hour) return undefined
  return totalMinutes % 60
}

export function isValidGoalTime(time: string) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time)
  if (!match) return false
  return Number(match[2]) % 5 === 0
}

export function generateGoalTimeOptions() {
  const options: string[] = []
  for (let hour = 0; hour < 24; hour += 1) {
    for (let minute = 0; minute < 60; minute += 5) {
      options.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)
    }
  }
  return options
}
