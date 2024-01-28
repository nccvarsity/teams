'use client'

import { Animation, Pin, Root } from '@bsmnt/scrollytelling'

import s from './fade.module.scss'

export const FadeInOut = ({
  children,
  className
}: {
  children: React.ReactNode
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
            fromTo: [{ opacity: 0 }, { opacity: 1, ease: 'linear' }]
          }}
        >
          <div>
            <Animation
              tween={{
                start: 80,
                end: 100,
                fromTo: [{ opacity: 1 }, { opacity: 0, ease: 'linear' }]
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
