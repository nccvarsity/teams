'use client'

import { Animation, Pin, Root } from '@bsmnt/scrollytelling'
import { useEffect, useState } from 'react'

import s from './fade.module.scss'

export const FadeInOut = ({
  children,
  disable = false,
  className
}: {
  children: React.ReactNode
  disable?: boolean
  className?: string
}) => {
  return (
    <Root defaults={{ ease: 'linear' }}>
      <Pin
        childHeight={'100vh'}
        pinSpacerHeight={'300vh'}
        pinSpacerClassName={s['pin-spacer']}
      >
        <Animation
          tween={{
            start: 0,
            end: 20,
            fromTo: [
              { opacity: disable ? 1 : 0 },
              { opacity: 1, ease: 'linear' }
            ]
          }}
        >
          <div>
            <Animation
              tween={{
                start: 80,
                end: 100,
                fromTo: [
                  { opacity: 1 },
                  { opacity: disable ? 1 : 0, ease: 'linear' }
                ]
              }}
            >
              <div className={className ?? s['pin']}>{children}</div>
            </Animation>
          </div>
        </Animation>
      </Pin>
    </Root>
  )
}

export const useResumeFadeInOut = () => {
  const [disableAnimation, setDisableAnimation] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('scroll', () => setDisableAnimation(false))
    return () => {
      window.removeEventListener('scroll', () => setDisableAnimation(false))
    }
  }, [])

  return {
    isDisable: disableAnimation,
    disableAnimation: () => setDisableAnimation(true)
  }
}
