import { useEffect, useState } from 'react'

import { UserData } from '~/app/sections/quiz-questions'
import navigateToElementId from '~/lib/utils/navigate'

import tags from '../../app/sections/quiz-questions/tags.json'
import teams from '../../app/sections/quiz-questions/team_attributes.json'
import { FadeInOut } from '../fade/fadeInOut'
import s from './quiz.module.scss'

const Results = ({ id, data }: { id: number; data: UserData }) => {
  const { name } = data

  const [topTagDescriptions, setTopTagDescriptions] = useState<string>('')
  const [topTeams, setTopTeams] = useState<string[]>([])
  const [otherTeams, setOtherTeams] = useState<string[]>([])

  useEffect(() => {
    // Tabulate the highest tags
    const sortedTags = Array.from(data.answerTags?.entries() ?? [])
      .sort((a, b) => b[1] - a[1])
      .filter((tag) => tag[1] > 0)

    // Randomly select tag description
    const isAlternativeText = Math.floor(Math.random() * 100) % 2 === 0
    const topTagDescriptions = sortedTags.slice(0, 4).map((topTag) => {
      const tagDetails = tags.data.find((tag) => tag.tag === topTag[0])

      if (!tagDetails) return ''

      const description = isAlternativeText
        ? tagDetails['you']
        : tagDetails['or']
      return `You ${description}. `
    })
    setTopTagDescriptions(topTagDescriptions.join(''))

    // Tabulate the highest teams
    const teamsScore = new Map<string, number>()
    teams.data.forEach((team) => {
      team.tags.forEach((tag) => {
        const currentCount = data.answerTags?.get(tag) ?? 0
        teamsScore.set(
          team.team,
          (teamsScore?.get(team.team) ?? 0) + currentCount
        )
      })
    })

    // Select top teams, and other teams
    const sortedTeams = Array.from(teamsScore?.entries() ?? [])
      .sort((a, b) => b[1] - a[1])
      .filter((team) => team[1] > 0)

    const topTeams = sortedTeams.slice(0, 3).map((team) => team[0])
    const otherTeams = teams.data
      .map((team) => team.team)
      .filter((team) => !topTeams.includes(team))

    setTopTeams(topTeams)
    setOtherTeams(otherTeams)
  }, [data])

  return (
    <FadeInOut disable={true}>
      <section className={s['content']} id={`question-${id}`}>
        <p className={s['title']}>{`Hey there ${name}!`}</p>
        <div className={s['answerGridContainer']}>
          <p>Based on your answers, here's what we think describes you:</p>
          <p>{topTagDescriptions}</p>
          <p>We believe these teams will be most blessed if you join them:</p>
          <p>{topTeams.join(', ')}</p>
          <p>Check out the other teams in Varsity:</p>
          <p>{otherTeams.join(', ')}</p>
          <button onClick={() => navigateToElementId('quiz')}>
            Try again?
          </button>
        </div>
      </section>
    </FadeInOut>
  )
}

export default Results
