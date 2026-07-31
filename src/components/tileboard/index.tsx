'use client'

import { ToggleState, useToggleState } from '~/hooks/use-toggle-state'
import { createLinkFromTeamClusterName, Teams } from '~/lib/utils/signuplink'

import ExpandableTile from './expandable-tile'
import s from './tileboard.module.scss'

export interface tileMetaData {
  icon?: string
  name: string
  /** Sign-up form link. Omitted for teams that don't take sign-ups this way. */
  url?: string
  description: string
  /** Optional line below the description, e.g. how to join without the form. */
  note?: string
  jd: string[]
  toggleState: ToggleState
}

export const Tileboard = () => {
  const tileMetaData: tileMetaData[] = [
    {
      name: 'LOGS',
      url: createLinkFromTeamClusterName([Teams.LOGS]),
      description: `
      As V Logs, we help to provide the V serving teams with what they need to carry out the Father’s business. Every item we account for and distribute to the teams is a means of blessing the people, be it the servers who carry out their roles or the newcomers that come for our services. We move things around with the sole purpose of making room for Him to move! 📦
      `,
      jd: [
        '📤 Account for and distribute logistics to the various teams pre-service',
        '🏗️ Assist in setting up and tearing down of spaces/equipment',
        '🚛 Collect and account for logistics post-service and bring them to be transported'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'SECURITY',
      url: createLinkFromTeamClusterName([Teams.SECURITY]),
      description: `
      The V Security Team is here to create a safe and welcoming space for every youth and server—we look out for their well-being so that they can be on the look out for what the Lord is doing 🙌🏼 if you share our heart, come join us!
      `,
      jd: ['🥰 Create a safe and welcoming space for V events'],
      toggleState: useToggleState()
    },
    {
      name: 'FOYER OPS',
      url: createLinkFromTeamClusterName([Teams.FOYER_OPS]),
      description: `
      The Foyer Ops team are like the doorkeepers of the Father’s house, preparing the way for His people. By helping them navigate safely to the right place, we serve so that every individual is ready to meet with Him. Every smile, every direction, and every welcome is but a set up for someone to encounter God face-to-face 🌞
      `,
      jd: [
        '😌 Make the Ops-y things feel more like family',
        '🚧 Guide the V youths to the right place, safely and orderly',
        '🍞 Prepare and serve Holy Communion elements'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'FOYER EXP',
      url: createLinkFromTeamClusterName([Teams.FOYER_EXP]),
      description: `
      Ever wondered who arranges the snacks outside or gives the stage that fresh yet familiar look? That’s us, the Foyer Experience Team! We transform the foyer space into one that’s fun and welcoming for everyone. It’s all about making a first impression of the One who first made an impression on our hearts, and to get you excited for what’s to come!
      `,
      jd: [
        '✨ Beautify the service venue and set up stage props',
        '🥨 Set up pre-service snackies and activities',
        '🍜 Manage post-service supper booth'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'COFFEE',
      url: createLinkFromTeamClusterName([Teams.COFFEE]),
      description: `
      More than placing a cup into your hand, we’re crafting a warm experience for everyone in V—right from the very first step into the venue! Every cup has a name on it, just like every seat at the table in the Father’s house 😌 come have a cuppa on us!
      `,
      jd: [
        '☕ Set up coffee/drinks booth for services',
        '♨️ Craft and serve beverages to create a warm experience',
        '🧼 Tear down and clean up post-service'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'AMBS',
      // No sign-up form for Ambs — the note below points people to their VGL.
      description: `
      The V Ambassadors are the first friendly faces that newcomers meet. We welcome and host the V family as well as new friends with the love of Jesus—creating a warm space to connect with, encourage, pray for, and celebrate every youth who walks through our doors 🫶🏼
      `,
      note: '*Have a conversation to your VGL if you are interested to serve in the Ambs team!',
      jd: [
        '🤗 Welcome the V family and friends with the warmth of His embrace',
        '🤝🏻 Host newcomers and be a friend to them',
        '🔗 Connect newcomers and new believers to VG',
        '🙏🏻 Pray for people and encourage them'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'PHOTOGS',
      url: createLinkFromTeamClusterName([Teams.PHOTOGS]),
      description: `
      Every photograph tells a story. As V Photographers, we get front row seats to the stories God is writing! We trust Him to place us where He is moving—to capture moments that reveal His goodness, and to invite others to come taste and see that the LORD is good 🙂‍↕️
      `,
      jd: [
        '📸 Capture stories of grace, through His lens of grace',
        '🪄 Post-edit to post edifying photos',
        '👩🏻‍💻 Collaborate with the Social team to tell V’s story',
        '🎯 Hone our photography through friendships'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'SOCIAL',
      url: createLinkFromTeamClusterName([Teams.SOCIAL]),
      description: `
      We are the team that captures God moments, even in the smallest of details that no one sees—but God does! If you love taking pics and short clips for the keeps, you’re at the right place. Come join us to write on the pages of V’s story for the world to see!
      `,
      jd: [
        '🔍 Capture God moments, big or small',
        '📱 Ideate for social media campaigns',
        '📸 Collaborate with the Photogs team!',
        '💭 Write sermon recaps to recount His goodness',
        '🕊️ Create windows for a glimpse of heaven on earth!'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'AUDI OPS',
      url: createLinkFromTeamClusterName([Teams.AUDI_OPS]),
      description: `
      We serve as being Jesus’ hands and feet—ready to warmly welcome and serve anyone who steps into the Father’s house. As the Lord moves during service, the Audi Ops team moves to support and ensure that every V youth is in the best place to experience His embrace, and receive from all that He is doing! 🤲🏼
      `,
      jd: [
        '😊 Welcome every son & daughter home with a smile',
        '🐑 Guide the lost sheep and fill the front row seats',
        '👀 Look out for newcomers and connect them with V Ambs',
        '🙋🏻‍♂️ Support service programme (e.g. handing out HC elements or other items, ministering ops)'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'VIDEO',
      url: createLinkFromTeamClusterName([Teams.VIDEO]),
      description: `
      We’re about pointing people to Jesus! With every Bible verse, lyric, graphic and media we project on screen, we’re saying—Look at Him! He is altogether lovely. It doesn’t take much but our little hands to make His hands known to all who come and meet a loving and gracious Saviour ☺️
      `,
      jd: [
        '💻 Prepare and project lyrics, Bible verses and other media',
        '🎞️ Flow with the worship team and speakers with audiovisual content',
        '📹 Operate live camera feed',
        '🖼️ Curate and cue graphics during praise and worship'
      ],
      toggleState: useToggleState()
    },
    {
      name: 'STAGE',
      url: createLinkFromTeamClusterName([Teams.STAGE]),
      description: `
      The stage team are the ninjas that manage everything that happens on stage! 🥷🏿 we ensure that all who come for service are able to enjoy a smooth programme, and that those who take the stage can flow with God’s heart without distractions 🙌🏼
      `,
      jd: [
        '🎬 Produce smooth V service programmes through tech rehearsals and stage preparation',
        '📢 Ensure the safety and confidence of all who go on stage',
        '🎤 Manage the movement of people, mics, stage props or illustrations'
      ],
      toggleState: useToggleState()
    }
  ]

  return (
    <div className={s.tileboard}>
      {tileMetaData.map((tile, index) => (
        <ExpandableTile
          key={tile.name}
          metaData={tile}
          zIndex={(index + 1) * 100}
          index={index}
        />
      ))}
    </div>
  )
}
