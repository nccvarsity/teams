'use client'

import { Animation, Pin, Root } from '@bsmnt/scrollytelling'
import Image from 'next/image'
import React from 'react'

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
  return (
    <Root defaults={{ ease: 'linear' }}>
      <Pin
        childHeight={'200vh'}
        pinSpacerHeight={'300vh'}
        pinSpacerClassName={s['pin-spacer']}
      >
        <section className={s['spacer']}>
          <span className={s['title']}>{question.question}</span>
          <div className={s['answer']}>
            {question.answers.map((answer: Answer, answerIndex: number) => {
              return (
                <div key={answerIndex}>
                  <div className={s['answer-text']}>{answer.ans}</div>
                  {answer.imageUrl && (
                    <div className={s['answer-image']}>
                      <Image
                        src={answer.imageUrl}
                        width={500}
                        height={500}
                        alt={answer.ans}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </Pin>
    </Root>
  )
}
