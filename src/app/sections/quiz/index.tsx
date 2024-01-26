'use client'

import * as Scrollytelling from '~/lib/scrollytelling-client'

import { CanvasWithDoorModel } from './door-model'
import s from './quiz.module.scss'

export const Quiz = () => {
  return (
    <Scrollytelling.Root defaults={{ ease: 'linear' }}>
      <Scrollytelling.Pin
        childHeight={'100vh'}
        pinSpacerHeight={'300vh'}
        pinSpacerClassName={s['pin-spacer']}
      >
        <section className={s['spacer']}>
          <div className={s['pin']}>
            <div className="wrapper">
              <div className={s['content']}>
                <p className={s['title']}>
                  Not sure where to start? Let's go on a quest to find out!
                </p>
              </div>
            </div>
          </div>
          <div className={s['model-container']}>
            <CanvasWithDoorModel />
          </div>
        </section>
      </Scrollytelling.Pin>
    </Scrollytelling.Root>
  )
}
