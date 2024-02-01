'use client'

import React, { useEffect, useState } from 'react'

import navigateToElementId from '~/lib/utils/navigate'

import { FadeInOut, useResumeFadeInOut } from '../fade/fadeInOut'
import { Answer, AnswerType } from './answer'
import s from './quiz.module.scss'

export interface QuestionType {
  question: string
  answers: AnswerType[]
  hasImages: boolean
}

export const Question = ({
  id,
  question,
  incrementTag,
  wasReset
}: {
  id: number
  question: QuestionType
  incrementTag: (id: number, tags: string[], isDecrement?: boolean) => void
  wasReset: boolean
}) => {
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null)
  const [chosenTags, setChosenTags] = useState<string[]>([])

  const { isDisable, disableAnimation } = useResumeFadeInOut()

  function onPress(ans: string, tags: string[]) {
    disableAnimation()

    // Unselect itself
    if (chosenAnswer === ans) {
      setChosenAnswer(null)
      incrementTag(id, chosenTags, true)
      setChosenTags([])
      return
    }

    // Decrement the previous answer
    incrementTag(id, chosenTags, true)
    // Increment the new answer
    incrementTag(id, tags)

    setChosenAnswer(ans)
    setChosenTags(tags)
  }

  const isOdd = question.answers.length % 2 !== 0

  useEffect(() => {
    if (wasReset && chosenAnswer !== null) {
      disableAnimation()
      setChosenAnswer(null)
      setChosenTags([])
    }
  }, [wasReset])

  return (
    <FadeInOut disable={isDisable}>
      <section className={s['content']} id={`question-${id}`}>
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

        {id !== 0 ? (
          <button onClick={() => navigateToElementId(`question-${id - 1}`)}>
            Prev
          </button>
        ) : (
          <button onClick={() => navigateToElementId(`form`)}>Prev</button>
        )}

        <button onClick={() => navigateToElementId(`question-${id + 1}`)}>
          Next
        </button>
      </section>
    </FadeInOut>
  )
}
