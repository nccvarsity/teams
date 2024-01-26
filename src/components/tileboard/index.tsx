'use client'

import clsx from 'clsx'

import s from './tileboard.module.scss'
import ExpandableTile from './expandable-tile'
import { ToggleState, useToggleState } from '~/hooks/use-toggle-state'

export interface tileMetaData {
  icon?: string
  name: string
  url: string
  description: string
  jd: string[]
  toggleState: ToggleState
}

export const Tileboard = () => {
  const tileMetaData: tileMetaData[] = [
    {
      name: 'PHOTOGS',
      url: 'https://www.newcreation.org.sg/',
      description: `
      (っ◔◡◔)っ📸💥| If you've got a case of serious shutterfinger, we
      want you! As V Photogs, we document V life, culture, and events—curating
      visuals for social media and service slides. Oh snap, come join us!
      `,
      jd: ['test'],
      toggleState: useToggleState()
    },
    {
      name: 'SOCIAL',
      url: 'https://www.newcreation.org.sg/',
      description: `
      ( *･ω･)✎📜 | We give life to words, supporting the ministry by crafting
      written (& spoken) words through social media captions, e-mails,
      video scripts, and more! If you want to see what God can do through
      your story, join us!
      `,
      jd: ['test'],
      toggleState: useToggleState()
    },
    {
      name: 'FOYER EXP',
      url: 'https://www.newcreation.org.sg/',
      description: `
      (∩｀-´)⊃━☆ﾟ.*･｡ﾟ 💫☕ | Enjoy the fun and inviting atmosphere
      of V Night? Bring out the warmth within and make V Night a beloved
      place for people to return to.
      `,
      jd: ['test'],
      toggleState: useToggleState()
    },
    {
      name: 'LORO',
      url: 'https://www.newcreation.org.sg/',
      description: `
      ( ｡◕‿◕｡)🏠 | V is family. From welcoming you at the door,
      bringing you to your seats, and connecting friends—both old and
      new—our heart is to make sure everyone meets their V fam. 
      Join the Varsity Night Experience team!
      `,
      jd: [
        '🤗 Welcome the V fam to service 👋',
        '🍞 Distribute Holy Communion elements 🍷',
        '🚶🏻‍♀️ Manage the flow of people 🚶🏻‍♂️',
        '👉🏼 Usher people in the auditorium 📍'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'FOYER OPS',
      url: 'https://www.newcreation.org.sg/',
      description: `
      ( ｡◕‿◕｡)🏠 | V is family. From welcoming you at the door,
      bringing you to your seats, and connecting friends—both old and
      new—our heart is to make sure everyone meets their V fam. 
      Join the Varsity Night Experience team!
      `,
      jd: [
        'test'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'AUDI OPS',
      url: 'https://www.newcreation.org.sg/',
      description: `
      ( ｡◕‿◕｡)🏠 | V is family. From welcoming you at the door,
      bringing you to your seats, and connecting friends—both old and
      new—our heart is to make sure everyone meets their V fam. 
      Join the Varsity Night Experience team!
      `,
      jd: [
        'test'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'LOGS',
      url: 'https://www.newcreation.org.sg/',
      description: `
      ᕦ( ⏓ ͜ʖ ⏓ )ᕥ 💨⛺ | First to arrive on scene, we ensure everything is
      up and running for a smooth V Night experience! Whether it's
      moving items on stage or anywhere else, we're
      always ready—all while having the best time in His house!
      `,
      jd: [
        '📋 Account for logistics ✅',
        '📻 Distribute and collect walkies 🗣️',
        '🪧 Set up spaces/equipment 📺',
        '💪🏼 Carry heavy props on stage 🪨'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'SECURITY',
      url: 'https://www.newcreation.org.sg/',
      description: `
      🛡️( ⌐■_■)🛡️ | Alert and swift to respond to changes on the ground,
      our desire is to create a safe space for everyone to enjoy V
      freely! If you share our heart, come join us!
      `,
      jd: [
        '👀 Observe and profile attendees 🕵🏻‍♂️',
        '🎒 Oversee bag/bulky item checks 📦',
        '🙌🏼 Make V Night a safe space 🥰',
    ],
      toggleState: useToggleState()
    },
    {
      name: 'VIDEO',
      url: 'https://www.newcreation.org.sg/',
      description: `
      💻 (⌨️•‿•⌨️) 💻| Excited about the dazzling visuals on screen? From lyrics
      and verses to videos and more, we make known the invisible God 
      through magnifying the visible!
      `,
      jd: [
        '🎵 Toggle lyrics during Praise &amp; Worship 🖱️',
        '💻 Prepare slides with verses and media 🖼️',
        '📽️ Project content on screen during service 🎞️',
        '😎 Operate camera with live feed 📹'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'STAGE',
      url: 'https://www.newcreation.org.sg/',
      description: `
      Σ(▼□▼ ﾒ ) ☆🎬☆ | We operate in the shadows, overseeing the entire
      service programme by coordinating with the many other teams.
      This dynamic experience is irreplaceable
      and paramount to the success of V Night!
      `,
      jd: ['test'],
      toggleState: useToggleState()
    }
  ]

  return (
    <>
      <div className={s.tileboard}>
        {tileMetaData.map((tileMetaData, index) => (
          <div
            key={tileMetaData.name}
            className={
              tileMetaData.toggleState.isOn
                ? clsx(s.tileExpanded, s.tile)
                : clsx(s.tile)
            }
          >
            <ExpandableTile
              metaData={tileMetaData}
              zIndex={(index + 1) * 100}
              index={index}
            >
              {tileMetaData.name}
            </ExpandableTile>
          </div>
        ))}
      </div>
    </>
  )
}
