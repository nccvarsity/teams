'use client'

import { Question } from './question'
import questions from './questions.json'
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

export const QuizQuestions = () => {
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

  const questionsResponse = groupBy(questions.data, 'question')

  const questionsData: Question[] = Object.keys(questionsResponse).map(
    function (key) {
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
    }
  )

  return (
    <div className={s.home} id={'quiz-end'}>
      {questionsData.map((question: Question, questionIndex: number) => {
        return <Question question={question} key={questionIndex} />
      })}
    </div>
  )
}
