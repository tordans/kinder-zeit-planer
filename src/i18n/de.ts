export const de = {
  appTitle: 'Kinder Zeit Planer',
  openClockMode: 'Uhrenmodus öffnen',
  closeClockMode: 'Schließen',
  goalTimeLabel: 'Wann musst du losgehen / wo sein?',
  goalTime: 'Zielzeit',
  clocks: 'Uhren',
  activities: 'Tätigkeiten',
  activitiesHint: 'Plane zurück vom Losgehen aus…',
  addActivity: 'Tätigkeit hinzufügen',
  saveActivity: 'Speichern',
  removeActivity: 'Tätigkeit entfernen',
  duration: 'Minuten',
  routineStart: 'Loslegen um',
  routineStartHint: 'Aufstehen / Routine-Start',
  routineStartRelative: (relative: string) => `Das ist ${relative}`,
  hourLabel: (hour: number) => `${String(hour).padStart(2, '0')}:00 Uhr`,
  hourRangeLabel: (hour: number) => {
    const start = `${String(hour).padStart(2, '0')}:00`
    const end = `${String((hour + 1) % 24).padStart(2, '0')}:00`
    return `${start} – ${end} Uhr`
  },
  currentTimeHeader: (time: string) => `Jetzt: ${time} Uhr`,
  dragHandle: 'Zum Sortieren ziehen',
  emojiPicker: 'Emoji wählen',
  colorPicker: 'Farbe wählen',
  activityLabel: 'Name der Tätigkeit',
  activityLabelPlaceholder: 'Name (optional)',
  clockModeTitle: 'Uhrenmodus',
  tooLateZone: 'Zu spät',
  startMarker: 'Loslegen',
  finishLowerFirst: 'Zuerst die Zeiten im Block darunter einordnen.',
} as const
