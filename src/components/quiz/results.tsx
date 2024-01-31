import { useEffect, useState } from 'react'

import { UserData } from '~/app/sections/quiz-questions'
import navigateToElementId from '~/lib/utils/navigate'

import archetypes from '~/app/sections/quiz-questions/archetypes.json'
import { FadeInOut } from '../fade/fadeInOut'
import s from './quiz.module.scss'
import { createLinkFromTeamClusterName } from '~/lib/utils/signuplink'
import clsx from 'clsx'

const Results = ({ id, data }: { id: number; data: UserData }) => {
  const { name, cluster } = data
  const [displayedArchetype, setDisplayedArchetype] = useState<string>('')
  const [servingTraits, setServingTraits] = useState<string[]>([]);
  const [seesYou, setSeesYou] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
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
    // choose 1 out of top 3 tied archetypes randomly
    const sortedArchetype = Array.from(archetypeScore?.entries() ?? [])
      .sort((a, b) => b[1] - a[1])
      .filter((team) => team[1] > 0)

    const topArchetypesIfTied = new Set<string>([sortedArchetype[0]?.[0] as string]);
    for (let i = 1; i < 3; i++) {
      if (sortedArchetype[i]?.[1] == sortedArchetype[0]?.[1]) {
        topArchetypesIfTied.add(sortedArchetype[i]?.[0]!)
      }
    }
    setDisplayedArchetype(Array.from(topArchetypesIfTied)[Math.floor(Math.random() * topArchetypesIfTied.size)]!)
    const archetypeData = archetypes.data.find(type => type.type === displayedArchetype);
    setServingTraits(archetypeData?.serving_traits || []);
    setSeesYou(archetypeData?.sees_you || []);
    setTeams(archetypeData?.teams || []);
  }, [data])

  return (
    <FadeInOut disable={true}>
      <section className={s.content} id={`question-${id}`}>
        <p className={s.name}>HEY {name ? name.toUpperCase() : 'THERE'}!</p>
        <div className={s.resultsGridContainer}>
          <p>Your serving type is...</p>
          <p className={clsx(s.archetype, s.wavyText)}>{displayedArchetype?.toUpperCase()}</p>
          <br />
          <p>How Jesus sees you:</p>
          <p>{seesYou.join(', ')}</p>
          <br />
          <p>Your serving traits:</p>
          <p>{servingTraits.join(', ')}</p>
          <br />
          <p>We believe that you will be a blessing to one of these teams: {teams.join(', ')}.</p>
          <button onClick={() => navigateToElementId('quiz')}>
            <a href={createLinkFromTeamClusterName(teams, cluster, name)} target="_blank" rel="noreferrer noopener">Sign Up</a>
          </button>
          <button onClick={() => navigateToElementId('quiz')}>
            Back
          </button>
        </div>
      </section>
    </FadeInOut>
  )
}

export default Results
