import { Tileboard } from '~/components/tileboard'

import s from './teams-tileboard.module.css'

export const TeamsTileboard = () => {
  return (
    <div className={s.home}>
      <Tileboard />
    </div>
  )
}
