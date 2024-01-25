import s from './teams-tileboard.module.css'

import { Tileboard } from "~/components/tileboard"

export const TeamsTileboard = () => {
  return (
    <div className={s.home}>
      <Tileboard />
    </div>
  )
}