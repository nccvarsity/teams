'use client'

import { Pin, Root } from '@bsmnt/scrollytelling'
import { SetStateAction, useState } from 'react'

import s from './form.module.scss'

export const Form = () => {
  const [name, setName] = useState('')
  const [cluster, setCluster] = useState('')

  const handleNameChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setName(e.target.value)
  }

  const handleClusterChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setCluster(e.target.value)
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
            <input type="text" value={name} onChange={handleNameChange} />
          </div>

          <div className={s.content}>
            <h2>Which varsity cluster are you in?</h2>
            <input type="text" value={cluster} onChange={handleClusterChange} />
          </div>
        </section>
      </Pin>
    </Root>
  )
}
