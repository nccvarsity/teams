'use client'

import { FC, useEffect, useMemo, useState } from 'react'

import s from './typewriter.module.scss'

// Milliseconds between characters. The longer role lines run past 90
// characters, so keep this brisk or a tile takes several seconds to fill in.
const MS_PER_CHARACTER = 18

/**
 * Split into user-perceived characters ("grapheme clusters") rather than
 * UTF-16 code units. The role lines end in emoji, and stepping through those
 * with `charAt` reveals half a surrogate pair at a time — a stray � on every
 * other frame. `Intl.Segmenter` also keeps skin-tone modifiers and
 * zero-width-joiner sequences (🙋🏻‍♂️) together as one glyph.
 */
const splitGraphemes = (text: string): string[] => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text), (segment) => segment.segment)
  }
  // Code-point split: keeps surrogate pairs intact, which covers most emoji.
  return Array.from(text)
}

interface TypewriterProps {
  text: string
}

export const Typewriter: FC<TypewriterProps> = ({ text }) => {
  const graphemes = useMemo(() => splitGraphemes(text), [text])
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(graphemes.length)
      return
    }

    // Derive the character count from elapsed time rather than counting
    // timeouts, so the animation runs at the same speed regardless of frame
    // rate and cannot drift if a frame is dropped.
    const start = performance.now()
    let frame = requestAnimationFrame(function tick(now) {
      const count = Math.min(
        graphemes.length,
        Math.floor((now - start) / MS_PER_CHARACTER)
      )
      setRevealed(count)
      if (count < graphemes.length) frame = requestAnimationFrame(tick)
    })

    return () => cancelAnimationFrame(frame)
  }, [graphemes])

  const isTyping = revealed < graphemes.length

  return (
    <p className={s.typewriter}>
      {/* The full line is laid out (invisibly) from the first frame so the
          tile reserves its final wrapped height up front. The revealed text
          is painted on top of it, which keeps the surrounding layout — and
          the measured expanded height of the tile — stable while typing.
          Being in the DOM in full, it is also what screen readers announce. */}
      <span className={s.reserved}>{text}</span>
      <span className={s.revealed} aria-hidden="true">
        {graphemes.slice(0, revealed).join('')}
        {isTyping && <span className={s.caret} />}
      </span>
    </p>
  )
}
