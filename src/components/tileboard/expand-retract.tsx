'use client'

import React, { FC } from 'react'
import { Icon } from '@iconify/react'

import s from './tileboard.module.scss'

interface ExpandProps {
  zIndex: number;
  isExpanded: boolean;
}

const ExpandRetract: FC<ExpandProps> = ({ zIndex, isExpanded }) => {
  return (
    <>
    {
      !isExpanded ?
      <div style={{ zIndex: zIndex }} className={s.expand}>
        <div className={s.expandChevron}>
          <Icon icon="pixelarticons:chevron-down" height={120}/>
        </div>
      </div>
      :
      <div style={{ zIndex: zIndex }} className={s.retract}>
        <div className={s.expandChevron}>
          <Icon icon="pixelarticons:chevron-up" height={120}/>
        </div>
      </div>
    }  
    </>
  )
}

export default ExpandRetract
