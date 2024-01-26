'use client'

import { Animation, Pin, Root } from '@bsmnt/scrollytelling'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import s from './quiz.module.scss'

interface Answer {
  ans: string
  tags: string[]
  imageUrl: string
}

interface Question {
  question: string
  answers: Answer[]
  hasImages: boolean
  selection: number | null
}

export const Question = ({ question }: { question: Question }) => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  return (
    <Pin
      childHeight={'200vh'}
      pinSpacerHeight={'300vh'}
      pinSpacerClassName={s['pin-spacer']}
    >
      <section className={s['content']}>
        <p className={s['title']}>{question.question}</p>
        <div className={s['answer']}>
          {question.answers.map((answer: Answer, answerIndex: number) => {
            return (
              <div key={answerIndex}>
                <p className={s['non']}>{answer.ans}</p>
                {answer.imageUrl && (
                  <div className={s['answer-image']}>
                    <Image
                      src={answer.imageUrl}
                      width={500}
                      height={500}
                      alt={''}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </Pin>
  )
}
