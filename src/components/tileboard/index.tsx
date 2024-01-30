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
      name: 'PHO₸OGS',
      url: 'https://www.newcreation.org.sg/',
      description: `
      Hello fellow shutter-fingers! If you feel a resonance to tell stories with a camera, join us to document V life, culture, and events. Snap, don’t nap and see you soon! 
      `,
      jd: [
        '♾️ Capture God-moments 🙌🏼',
        '📸 Take photographs at V events ⚡',
        '🪄 Edit photos to be used for publicity ✨',
        '👩🏻‍💻 Collaborate with social media team 📱',
      ],
      toggleState: useToggleState()
    },
    {
      name: 'SÖCIAL',
      url: 'https://www.newcreation.org.sg/',
      description: `
      We’re seeking all with energy and heart to collaborate on our social team. If you have an eye for content and visuals, and have a passion for creating memories and messages for our V family, we would love to hear from you!
      `,
      jd: [
        '🌐 Show V off to the world! 🔥',
        '🤳🏽 Create content for IG - reels/visuals 🎨',
        '🤔 Ideate for social media content 💭'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'ƑOYER ℓXP',
      url: 'https://www.newcreation.org.sg/',
      description: `
      Pre-service is where the party begins! If you have hands available and time to sow into the pre-service experience, come and be part of our ninja team doing the creative setup and installations. Legend has it that some make a friend or two during this magic hour.
      `,
      jd: [
        '🛠️ Be part of building God’s house 🏠',
        '🏗️ Set up pre-service activities 🏓',
        '🤲🏻 Be the creative hands and feet 👟'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'L○R○',
      url: 'https://www.newcreation.org.sg/',
      description: `
      If you have a love for befriending new faces, and have a desire to grow into our hosting team here in the Fathers’ house, we can’t wait to meet you. LORO is where your warmth and love can go a long way for one person–come speak to us and we’ll tell you more!
      `,
      jd: [
        '🤗 Welcome the V fam ✌🏽',
        '🆕 Be a friend to newcomers 🤝🏼',
        '🔗 Connect with NBNCs after service ☕',
        '🙏🏼 Be a prayer warrior! ⚔️'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'FOŸER OPS',
      url: 'https://www.newcreation.org.sg/',
      description: `
      We make sure you get where you need to be, bringing you from the entrance all the way into the Father’s embrace—safely and swiftly. Wayfinding doesn’t get more meaningful than this! 
      `,
      jd: [
        '🚶🏻‍♀️ Manage and direct the flow of people 🚶🏻‍♂️',
        '🚧 Control access points 🚦',
        '🍞 Prepare Holy Communion elements 🍷',
      ],
      toggleState: useToggleState()
    },
    {
      name: 'ΔUDI OPS',
      url: 'https://www.newcreation.org.sg/',
      description: `
      V is family. We believe that every V youth has a seat at the table in the Father’s house with their name on it. We make sure that they find it—with warm smiles and even warmer hearts!
      `,
      jd: [
        '🚪 Doorkeep the Father’s house ✋🏼',
        '👉🏻 Guide lost sheep in the auditorium 🐑',
        '🚩 Direct people to unoccupied seats 🪑',
        '🙇🏻‍♀️ Support during ministering 🤲🏽'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'L●GS',
      url: 'https://www.newcreation.org.sg/',
      description: `
      First to arrive on scene, we ensure everything is up and running for a smooth Varsity experience! Whether it’s moving items on stage or anywhere else, we’re always ready—all while having the best time in His house!
      `,
      jd: [
        '📋 Account for logistics ✅',
        '📻 Distribute and collect walkies 🗣️',
        '🪧 Set up spaces/equipment 📺',
        '💪🏼 Carry props up stage 🪨'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'S℮CURĪTY',
      url: 'https://www.newcreation.org.sg/',
      description: `
      Alert and swift to respond to changes on the ground,
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
      name: 'VIÐE∅',
      url: 'https://www.newcreation.org.sg/',
      description: `
      Excited about the dazzling visuals on screen? From lyrics and verses—to videos and more, we make known the invisible God through magnifying the visible!
      `,
      jd: [
        '🎵 Lead Praise &amp; Worship through lyrics🖱️',
        '💻 Prepare slides with verses and media 🖼️',
        '📽️ Project content on screen during service 🎞️',
        '😎 Operate camera for live feed 📹'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'STΔGE',
      url: 'https://www.newcreation.org.sg/',
      description: `
      This is where behind-the-scenes fully comes alive! If you have a gift to articulate, to anticipate and would love to participate in programme and production, come and make V happen with us!
      `,
      jd: [
        '🎬 Produce amazing V services 💫',
        '📢 Liaise with showcaller and talents 🙋🏻‍♂️',
        '🎤 Manage the movement of mics ✊🏽'
      ],
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
