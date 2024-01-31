'use client'

import { useEffect, useState } from 'react'

import { CanvasWithHouseModel } from './house-model'
import s from './outro.module.scss'

export const Outro = () => {
  const [opacityValue, setOpacityValue] = useState(0)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setOpacityValue(1)
    }, 800)

    return () => clearTimeout(timerId)
  }, [])

  return (
    <section>
      <div
        className={s['loader']}
        style={{
          opacity: 1 - opacityValue,
          transition: '1.5s'
        }}
      />
      <div
        className={s['model-container']}
        style={{ opacity: opacityValue, transition: '1.5s' }}
      >
        <CanvasWithHouseModel />
      </div>
      <div style={{ opacity: opacityValue, transition: '1.5s' }}>
        <div className={s['content']}>
          <div className={s['footer']}>
            <p>
              Welcome home to V.
              <br />
              Where we build God's house together
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
