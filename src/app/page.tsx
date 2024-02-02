import React from 'react'

import { Marquee } from '~/app/sections/marquee'
import { TeamsTileboard } from '~/app/sections/teams-tileboard'
import { Welcome } from '~/app/sections/welcome'

import { ScreenSizeProvider } from './providers/screen-size'
import { Highlight } from './sections/highlight'
import { Outro } from './sections/outro'
import { QuizQuestions } from './sections/quiz-questions'
import { Quiz } from './sections/quiz-start'

const HomePage = () => {
  return (
    <main>
      <ScreenSizeProvider>
        <Welcome />
        <Outro />
        <Marquee />
        <TeamsTileboard />
        <Highlight />
        <Quiz />
        <QuizQuestions />
      </ScreenSizeProvider>
    </main>
  )
}

export default HomePage
