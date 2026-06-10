import { useMemo } from 'react'

import { extractEmojiColors } from '../lib/emojiColors'

export function useEmojiPalette(emoji: string) {
  return useMemo(() => extractEmojiColors(emoji), [emoji])
}
