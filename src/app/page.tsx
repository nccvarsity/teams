import { Marquee } from '~/app/sections/marquee'
import { TeamsTileboard } from '~/app/sections/teams-tileboard'
import { Welcome } from '~/app/sections/welcome'

import { ScreenSizeProvider } from './providers/screen-size'
import { Highlight } from './sections/highlight'
import { Outro } from './sections/outro'

const HomePage = () => {
  return (
    <main>
      <ScreenSizeProvider>
        <Outro />
        <Marquee />
        <TeamsTileboard />
        <Highlight />
        <Welcome />
      </ScreenSizeProvider>
    </main>
  )
}

export default HomePage
