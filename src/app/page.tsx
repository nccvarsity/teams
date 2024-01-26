import React from 'react'

import { TeamsTileboard } from '~/app/sections/teams-tileboard'
import { Marquee } from '~/app/sections/marquee'
import { Welcome } from '~/app/sections/welcome'
import { Highlight } from './sections/highlight'
import { Outro } from './sections/outro'

const HomePage = () => {
  return (
    <main>
      <Outro />
      <Marquee />
      <TeamsTileboard />
      <Highlight />
      <Welcome />
    </main>
  )
}

export default HomePage
