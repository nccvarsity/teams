import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { UserData } from '~/app/sections/quiz-questions'
import archetypes from '~/data/archetypes.json'
import navigateToElementId from '~/lib/utils/navigate'
import { createLinkFromTeamClusterName } from '~/lib/utils/signuplink'

import { FadeInOut } from '../fade/fadeInOut'
import s from './quiz.module.scss'

const MINIMUM_ANSWERED_QNS = 5

const Results = ({ id, data }: { id: number; data: UserData }) => {
  const { name, cluster } = data

  const [displayedArchetype, setDisplayedArchetype] = useState<string>('')
  const [servingTraits, setServingTraits] = useState<string[]>([])
  const [seesYou, setSeesYou] = useState<string[]>([])
  const [teams, setTeams] = useState<string[]>([])

  useEffect(() => {
    // Tabulate the highest archetype
    const archetypeScore = new Map<string, number>()
    archetypes.data.forEach((team) => {
      team.tags.forEach((tag) => {
        const currentCount = data.answerTags?.get(tag) ?? 0
        archetypeScore.set(
          team.type,
          (archetypeScore?.get(team.type) ?? 0) + currentCount
        )
      })
    })

    // Choose 1 out of top 3 tied archetypes randomly
    const sortedArchetype = Array.from(archetypeScore?.entries() ?? [])
      .sort((a, b) => b[1] - a[1])
      .filter((team) => team[1] > 0)

    const topArchetypesIfTied = new Set<string>([
      sortedArchetype[0]?.[0] as string
    ])
    for (let i = 1; i < 3; i++) {
      if (sortedArchetype[i]?.[1] == sortedArchetype[0]?.[1]) {
        topArchetypesIfTied.add(sortedArchetype[i]?.[0] || '')
      }
    }
    const archetype: string =
      Array.from(topArchetypesIfTied)[
        Math.floor(Math.random() * topArchetypesIfTied.size)
      ]!
    setDisplayedArchetype(archetype)

    // Extract archetype's serving traits, sees you, and teams
    const archetypeData = archetypes.data.find(
      (type) => type.type === archetype
    )
    setServingTraits(archetypeData?.serving_traits || [])
    setSeesYou(archetypeData?.sees_you || [])
    setTeams(archetypeData?.teams || [])
  }, [data])

  const notEnoughAnsweredQns = data.answeredQns
    ? data.answeredQns.size < MINIMUM_ANSWERED_QNS
    : true

  return (
    <FadeInOut disable={true}>
      <section className={s.content} id={`question-${id}`}>
        <p className={s.name}>Hey {name ? name : 'there'}!</p>
        <div className={s.resultsGridContainer}>
          {notEnoughAnsweredQns ? (
            <>
              <p>Sorry 😔 We'd love to serve you better. </p>
              <p style={{ paddingTop: 10 }}>
                Do complete MORE questions before viewing for your results!
              </p>
            </>
          ) : (
            <>
              <p>Your serving type is...</p>
              <p className={clsx(s.archetype, s.wavyText)}>
                {displayedArchetype?.toUpperCase()}
              </p>
              <p>How Jesus sees you:</p>
              <div className={clsx(s.commonContainer, s.seesYou)}>
                {seesYou.map((item) => {
                  return (
                    <span key={item} className={s.common}>
                      {item}
                    </span>
                  )
                })}
              </div>
              <p>Your serving traits:</p>
              <div className={clsx(s.commonContainer, s.servingTraits)}>
                {servingTraits.map((item) => {
                  return (
                    <span key={item} className={s.common}>
                      {item}
                    </span>
                  )
                })}
              </div>
              <p>
                We believe that you will be a huge blessing in these teams:{' '}
                {teams.join(', ')}.
              </p>
            </>
          )}
        </div>

        <div className={s.center}>
          <button>
            <a
              href={createLinkFromTeamClusterName(teams, cluster, name)}
              target="_blank"
              rel="noreferrer noopener"
              className={s.wavyText}
            >
              Sign Up Now!
            </a>
          </button>
          <button onClick={() => navigateToElementId('form')}>Restart</button>
        </div>
      </section>
    </FadeInOut>
  )
}

export default Results
