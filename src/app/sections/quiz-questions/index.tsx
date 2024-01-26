'use client'

import * as Scrollytelling from '~/lib/scrollytelling-client'

import questions from './questions.json'
import s from './quiz.module.scss'

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

  const questionsData = Object.keys(questionsResponse).map(function (key) {
    const answers = questionsResponse[key]
    let imagesCount = 0
    answers.forEach(function (answer: any) {
      if (answer.imageurl) {
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
            imageurl: answer.imageurl
          }
        })
      ),
      hasImages: imagesCount > 0,
      option: 0,
      selection: null
    }
  })

  return (
    <Scrollytelling.Root defaults={{ ease: 'linear' }}>
      <Scrollytelling.Pin
        childHeight={'100vh'}
        pinSpacerHeight={'300vh'}
        pinSpacerClassName={s['pin-spacer']}
      >
        <section className={s['spacer']} id={'quiz-end'}>
          <div className={s['pin']}>
            <div className="wrapper">
              <div className={s['content']}>
                <p>{JSON.stringify(questionsData)}</p>
              </div>
            </div>
          </div>
        </section>
      </Scrollytelling.Pin>
    </Scrollytelling.Root>
  )
}
