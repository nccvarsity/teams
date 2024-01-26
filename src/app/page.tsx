import React from 'react'

import { Marquee } from '~/app/sections/marquee'
import { TeamsTileboard } from '~/app/sections/teams-tileboard'
import { Welcome } from '~/app/sections/welcome'

import { Highlight } from './sections/highlight'
import { Outro } from './sections/outro'
import { Quiz } from './sections/quiz'

const HomePage = () => {
  return (
    <main>
      <Outro />
      <Marquee />
      <TeamsTileboard />
      <Highlight />
      <Welcome />
      <Quiz />
    </main>
  )
}

export default HomePage
