'use client'

import { Animation, Pin, Root } from '@bsmnt/scrollytelling'

import navigateToElementId from '~/lib/utils/navigate'

import s from './quiz-start.module.scss'
import { CanvasWithStairsModel } from './stairs-model'

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
            <div className={s['content']}>
              <Animation
                tween={{
                  start: 50,
                  end: 100,
                  fromTo: [{ opacity: 1 }, { opacity: 0, ease: 'power1' }]
                }}
              >
                <span className={s['title']}>
                  Not sure where to start?
                  <br />
                  Head to the{' '}
                  <span
                    className={s['highlight']}
                    onClick={() => navigateToElementId('form')}
                  >
                    Upper Room
                  </span>{' '}
                  to find out!
                </span>
              </Animation>
            </div>
          </div>
          <div className={s['model-container']}>
            <CanvasWithStairsModel
              onPress={() => navigateToElementId('form')}
            />
          </div>
        </section>
      </Pin>
    </Root>
  )
}
