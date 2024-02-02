'use client'

import { useMemo, useState } from 'react'

import { Form } from '~/components/form/form'
import { Question, QuestionType } from '~/components/quiz/question'
import Results from '~/components/quiz/results'
import questions from '~/data/questions.json'

export interface UserData {
  name?: string
  cluster?: string
  answerTags?: Map<string, number>
  answeredQns?: Set<number>
}

export const QuizQuestions = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    cluster: '',
    answerTags: new Map(),
    answeredQns: new Set()
  })

  function setData(data: UserData) {
    const newData = { ...userData, ...data }
    setUserData(newData)
  }

  function incrementTag(id: number, tags: string[], isDecrement = false) {
    const newUserData = { ...userData }

    // Increment the tag count
    tags.forEach(function (tag) {
      const currentCount = userData.answerTags?.get(tag) ?? 0
      userData.answerTags?.set(tag, currentCount + (isDecrement ? -1 : 1))
    })

    // Add or remove the question id
    if (isDecrement) {
      newUserData.answeredQns?.delete(id)
    } else {
      newUserData.answeredQns?.add(id)
    }

    setUserData(newUserData)
  }

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
        hasImages: imagesCount > 0
      }
    })
  }, [])

  function onReset() {
    // Flush the user data for other components to flush
    setUserData({})

    // Reset to initial state
    setTimeout(() => {
      setUserData({
        name: '',
        cluster: '',
        answerTags: new Map(),
        answeredQns: new Set()
      })
    }, 500)
  }

  const wasReset = userData.name === undefined && userData.cluster === undefined

  return (
    <>
      <Form setData={setData} wasReset={wasReset} />
      {questionsData.map((question: QuestionType, index: number) => {
        return (
          <Question
            id={index}
            key={question.question}
            question={question}
            incrementTag={incrementTag}
            wasReset={wasReset}
          />
        )
      })}
      <Results id={questionsData.length} data={userData} onReset={onReset} />
    </>
  )
}
