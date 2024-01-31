'use client'

import * as Scrollytelling from '@bsmnt/scrollytelling'
import { useMemo } from 'react'

import s from './highlight.module.scss'

const splitTextFormat = (text: string, wordClass?: string) => {
  const wordsArray = text.split(' ')

  const htmlWords = wordsArray.map((word, i) => {
    const hasLineBreak = word.includes('\n')

    return (
      <span className={wordClass} key={i}>
        {word}
        {i < wordsArray.length - 1 && ' '}
        {hasLineBreak && <br />}
      </span>
    )
  })

  return htmlWords
}

const lines = ['Welcome home', 'to V. where we build', 'God’s house together.']

export const Highlight = () => {
  const splitText = useMemo(
    () =>
      lines
        .map((line, lineIdx) => {
          const isLast = lineIdx === lines.length - 1
          const wordElements = splitTextFormat(
            line + '\n',
            isLast ? s['highlight'] : undefined
          )

          return wordElements
        })
        .flat(),
    []
  )

  return (
    <Scrollytelling.Root end="bottom bottom">
      <section className={s['spacer']}>
        <div className={s['pin']}>
          <p className={s['paragraph']}>
            <Scrollytelling.Stagger
              overlap={0}
              tween={{
                start: 0,
                end: 50,
                fromTo: [
                  {
                    opacity: 0.2
                  },
                  {
                    opacity: 1,
                    ease: 'power2.out'
                  }
                ]
              }}
            >
              {splitText}
            </Scrollytelling.Stagger>
          </p>
        </div>
      </section>
    </Scrollytelling.Root>
  )
}
