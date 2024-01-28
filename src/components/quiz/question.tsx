'use client'

import { Pin } from '@bsmnt/scrollytelling'
import React, { useEffect, useState } from 'react'

import { Answer, AnswerType } from './answer'
import s from './quiz.module.scss'

export interface QuestionType {
  question: string
  answers: AnswerType[]
  hasImages: boolean
  selection: number | null
}

export const Question = ({
  question,
  incrementTag
}: {
  question: QuestionType
  incrementTag: (tags: string[], isDecrement?: boolean) => void
}) => {
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null)
  const [chosenTags, setChosenTags] = useState<string[]>([])

  function onPress(ans: string, tags: string[]) {
    // Unselect itself
    if (chosenAnswer === ans) {
      setChosenAnswer(null)
      incrementTag(chosenTags, true)
      setChosenTags([])
      return
    }

    // Decrement the previous answer
    incrementTag(chosenTags, true)
    // Increment the new answer
    incrementTag(tags)

    setChosenAnswer(ans)
    setChosenTags(tags)
  }

  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  const isOdd = question.answers.length % 2 !== 0
  return (
    <Pin
      childHeight={'190vh'}
      pinSpacerHeight={'400vh'}
      pinSpacerClassName={s['pin-spacer']}
    >
      <section className={s['content']}>
        <p className={s['title']}>{question.question}</p>
        <div
          className={`${s['answerGridContainer']} ${
            isOdd ? s['single-column'] : s['auto-column']
          }`}
        >
          {question.answers.map((answer: AnswerType) => (
            <Answer
              answer={answer}
              key={answer.ans}
              onPress={onPress}
              isSelected={chosenAnswer === answer.ans}
            />
          ))}
        </div>
      </section>
    </Pin>
  )
}