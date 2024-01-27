'use client'

import { Pin, Root } from '@bsmnt/scrollytelling'
import { ChangeEvent } from 'react'

import { UserData } from '~/app/sections/quiz-questions'

import s from './form.module.scss'

export const Form = ({ setData }: { setData: (data: UserData) => void }) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.toString()
    setData({ name })
  }

  const handleClusterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cluster = e.target.value.toString()
    setData({ cluster })
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
            <input
              type="text"
              placeholder={'Cluster'}
              onChange={handleClusterChange}
            />
          </div>
        </section>
      </Pin>
    </Root>
  )
}
