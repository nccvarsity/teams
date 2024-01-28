'use client'

import { Pin, Root } from '@bsmnt/scrollytelling'
import { ChangeEvent, useState } from 'react'

import { UserData } from '~/app/sections/quiz-questions'

import clusters from './clusters.json'
import s from './form.module.scss'

export const Form = ({ setData }: { setData: (data: UserData) => void }) => {
  const [selectedCluster, setSelectedCluster] = useState<string>('')

  const handleClusterSelection = (cluster: string) => {
    setSelectedCluster(cluster)
    setData({ cluster })
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.toString()
    setData({ name })
  }

  return (
    <Root defaults={{ ease: 'linear' }}>
      <Pin
        childHeight={'100vh'}
        pinSpacerHeight={'300vh'}
        pinSpacerClassName={s['pin-spacer']}
      >
        <section id={'form'} className={s['pin']}>
          <div className={s.content}>
            <h2>What's your name?</h2>
            <input
              type="text"
              placeholder={'Name'}
              onChange={handleNameChange}
            />
          </div>

          <div className={s.content}>
            <h2>Which varsity cluster are you in?</h2>
            <div className={s.gridContainer}>
              {clusters.data.map((cluster, index) => (
                <div
                  key={index}
                  className={`${s.clusterButton} ${
                    selectedCluster === cluster ? s.selected : ''
                  }`}
                  onClick={() => handleClusterSelection(cluster)}
                >
                  {cluster}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Pin>
    </Root>
  )
}
