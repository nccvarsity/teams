'use client'

import clsx from 'clsx'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'

import type { tileMetaData } from '.'
import s from './tileboard.module.scss'
import ExpandRetract from './expand-retract'
import { Icon } from '@iconify/react'
import { Typewriter } from '../typewriter'

interface ExpandableTileProps {
  metaData: tileMetaData;
  index: number;
  zIndex: number;
  children?: ReactNode;
}

const ExpandableTile: FC<ExpandableTileProps> = ({ metaData, zIndex, index }) => {
  const tileClassName = index % 2 === 0
    ? metaData.toggleState.isOn
      ? clsx(s.tilePrimaryExpanded, s.tilePrimary)
      : s.tilePrimary
    : metaData.toggleState.isOn
      ? clsx(s.tileSecondaryExpanded, s.tileSecondary)
      : s.tileSecondary
  function handleClick() {
    metaData.toggleState.handleToggle();
  }
  function handleTitleClick() {
    metaData.toggleState.handleToggle();
  }
  const longName = metaData.name.length > 6;
  return (
    <>
      <div onClick={handleClick} style={{ zIndex: zIndex }} className={tileClassName}>
        <div className={s.jd}>
          {metaData.toggleState.isOn ? metaData.jd.map((text) =>
          <div key={text} className={s.jdtext}>
            <Typewriter text={text}/>
          </div>) : null}
        </div>
        <Link href={metaData.url} target="_blank">
          <h1 onClick={handleTitleClick} style={{ zIndex: zIndex + 1 }} className={longName ? clsx((metaData.toggleState.isOn ? clsx(s.tileExpandedTitle, s.tileTitle, s.wavyText) : s.tileTitle), s.tileTitleReduced) : (metaData.toggleState.isOn ? clsx(s.tileExpandedTitle, s.tileTitle, s.wavyText) : s.tileTitle)}>
            {metaData.name}
          </h1>
          {
            metaData.toggleState.isOn && (
              <div style={{ zIndex: zIndex + 2 }} className={s.arrow}>
                <Icon icon="pixelarticons:reply" height={90}/>
              </div>
            )
          }
        </Link>
        <p style={{ zIndex: zIndex + 1 }} className={s.tileDescription}>
          {metaData.description}
        </p>
        <ExpandRetract
          zIndex={zIndex + 2}
          isExpanded={metaData.toggleState.isOn}
          ></ExpandRetract>
      </div>
    </>
  )
}

export default ExpandableTile
