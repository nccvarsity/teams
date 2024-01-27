'use client'

import { Animation, Pin, Root } from '@bsmnt/scrollytelling'

import { CanvasWithDoorModel } from './door-model'
import s from './quiz-start.module.scss'

export const Quiz = () => {
  return (
    <Root defaults={{ ease: 'linear' }}>
      <Pin
        childHeight={'120vh'}
        pinSpacerHeight={'300vh'}
        pinSpacerClassName={s['pin-spacer']}
      >
        <section id={'quiz'}>
          <div className={s['pin']}>
            <div className="wrapper">
              <div className={s['content']}>
                <Animation
                  tween={{
                    start: 59,
                    end: 100,
                    fromTo: [
                      { opacity: 1 },
                      { y: -200, opacity: 0, ease: 'power1' }
                    ]
                  }}
                >
                  <span className={s['title']}>
                    Not sure where to start? Let's go on a quest to find out!
                  </span>
                </Animation>
              </div>
            </div>
          </div>
          <div className={s['model-container']}>
            <CanvasWithDoorModel
              onPress={() => {
                // Scroll to the next section
                const end = document.getElementById('quiz-questions')
                end && end.scrollIntoView({ behavior: 'smooth' })
              }}
            />
          </div>
        </section>
      </Pin>
    </Root>
  )
}
