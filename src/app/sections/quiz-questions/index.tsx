'use client'

import { useEffect, useMemo, useState } from 'react'

import { Form } from '~/components/form/form'

import { Question, QuestionType } from '../../../components/quiz/question'
import questions from './questions.json'
import s from './quiz-questions.module.scss'

export interface UserData {
  name?: string
  cluster?: string
  answerTags?: Map<string, number>
}

export const QuizQuestions = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    cluster: '',
    answerTags: new Map()
  })

  function setData(data: UserData) {
    const newData = { ...userData, ...data }
    setUserData(newData)
  }

  function incrementTag(tags: string[], isDecrement = false) {
    const newUserData = { ...userData }
    tags.forEach(function (tag) {
      const currentCount = userData.answerTags?.get(tag) ?? 0
      userData.answerTags?.set(tag, currentCount + (isDecrement ? -1 : 1))
    })
    setUserData(newUserData)
  }

  useEffect(() => {
    console.log(userData)
  }, [userData])

  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  function groupBy(array: any[], key: string) {
    const grouped: any = {}
    array.forEach(function (item) {
      if (item[key] in grouped) {
        grouped[item[key]].push(item)
      } else {
        grouped[item[key]] = [item]
      }
    })

    return grouped
  }

  function shuffle(array: any[]) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  const questionsData: QuestionType[] = useMemo(() => {
    const questionsResponse = groupBy(questions.data, 'question')

    return Object.keys(questionsResponse).map(function (key) {
      const answers = questionsResponse[key]
      let imagesCount = 0
      answers.forEach(function (answer: any) {
        if (answer.imageUrl) {
          imagesCount++
        }
      })

      return {
        question: key,
        answers: shuffle(
          answers.map(function (answer: any) {
            return {
              ans: answer.answer,
              tags: answer.tags,
              imageUrl: answer.imageUrl
            }
          })
        ),
        hasImages: imagesCount > 0,
        selection: null
      }
    })
  }, [])

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  // TODO: calculation of answers' tags

  return (
    <div className={s.home} id={'quiz-questions'}>
      <Form setData={setData} />
      {questionsData.map((question: QuestionType) => {
        return (
          <Question
            question={question}
            key={question.question}
            incrementTag={incrementTag}
          />
        )
      })}
    </div>
  )
}
