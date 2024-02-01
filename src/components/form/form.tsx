'use client'

import { ChangeEvent, createRef, useEffect, useState } from 'react'

import { UserData } from '~/app/sections/quiz-questions'
import clusters from '~/data/clusters.json'
import navigateToElementId from '~/lib/utils/navigate'

import { FadeInOut, useResumeFadeInOut } from '../fade/fadeInOut'
import s from './form.module.scss'

export const Form = ({
  setData,
  wasReset
}: {
  setData: (data: UserData) => void
  wasReset: boolean
}) => {
  const [selectedCluster, setSelectedCluster] = useState<string>('')

  const { isDisable, disableAnimation } = useResumeFadeInOut()

  const handleClusterSelection = (cluster: string) => {
    disableAnimation()

    setSelectedCluster(cluster)
    setData({ cluster })
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    disableAnimation()

    const name = e.target.value.toString()
    setData({ name })
  }

  const nameRef = createRef<HTMLInputElement>()

  useEffect(() => {
    if (wasReset && (selectedCluster !== '' || nameRef.current?.value !== '')) {
      disableAnimation()
      setSelectedCluster('')
      if (nameRef.current) {
        nameRef.current.value = ''
      }
    }
  }, [wasReset])

  return (
    <FadeInOut disable={isDisable}>
      <section id={'form'}>
        <div className={s.content}>
          <h2 className={s.formQuestion}>What is your name?</h2>
          <input
            ref={nameRef}
            placeholder={'Name'}
            onChange={handleNameChange}
          />
        </div>
        <div className={s.content}>
          <h2 className={s.formQuestion}>Which cluster are you in?</h2>
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

          <button onClick={() => navigateToElementId('quiz')}>Prev</button>
          <button onClick={() => navigateToElementId('question-0')}>
            Next
          </button>
        </div>
      </section>
      <div className={s.content}>
        <p className={s.disclaimer}>
          Provide your details above for a more personalized experience. Your
          personal information will not be saved. Otherwise, skip by clicking
          'Next'.
        </p>
      </div>
    </FadeInOut>
  )
}
