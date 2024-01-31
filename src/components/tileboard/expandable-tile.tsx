'use client'

import { Icon } from '@iconify/react'
import clsx from 'clsx'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'

import { Typewriter } from '../typewriter'
import type { tileMetaData } from '.'
import ExpandRetract from './expand-retract'
import s from './tileboard.module.scss'

interface ExpandableTileProps {
  metaData: tileMetaData
  index: number
  zIndex: number
  children?: ReactNode
}

const ExpandableTile: FC<ExpandableTileProps> = ({
  metaData,
  zIndex,
  index
}) => {
  const tileClassName =
    index % 2 === 0
      ? metaData.toggleState.isOn
        ? clsx(s.tilePrimaryExpanded, s.tilePrimary)
        : s.tilePrimary
      : metaData.toggleState.isOn
      ? clsx(s.tileSecondaryExpanded, s.tileSecondary)
      : s.tileSecondary
  function handleClick() {
    metaData.toggleState.handleToggle()
  }
  function handleTitleClick() {
    metaData.toggleState.handleToggle()
  }
  const longName = metaData.name.length > 7
  const veryLongName = metaData.name.length > 10
  return (
    <>
      <div
        onClick={handleClick}
        style={{ zIndex: zIndex }}
        className={tileClassName}
      >
        <div className={s.jd}>
          {metaData.toggleState.isOn
            ? metaData.jd.map((text) => (
                <div key={text} className={s.jdtext}>
                  <Typewriter text={text} />
                </div>
              ))
            : null}
        </div>
        <Link href={metaData.url} target="_blank">
          <h1
            onClick={handleTitleClick}
            style={{ zIndex: zIndex + 1 }}
            className={clsx(
              metaData.toggleState.isOn
                ? clsx(s.tileExpandedTitle, s.tileTitle, s.wavyText)
                : s.tileTitle,
              veryLongName
                ? s.tileTitleReducedMore
                : longName
                ? s.tileTitleReduced
                : s.tileTitle
            )}
          >
            {metaData.name}
          </h1>
          {metaData.toggleState.isOn && (
            <div
              style={{ zIndex: zIndex + 2 }}
              className={
                veryLongName
                  ? clsx(s.arrow, s.arrowLowest)
                  : longName
                  ? clsx(s.arrow, s.arrowLower)
                  : s.arrow
              }
            >
              <Icon icon="pixelarticons:reply" height={90} />
            </div>
          )}
        </Link>
        <p style={{ zIndex: zIndex + 1 }} className={s.tileDescription}>
          {metaData.description}
        </p>
        <ExpandRetract
          zIndex={zIndex + 2}
          isExpanded={metaData.toggleState.isOn}
        />
      </div>
    </>
  )
}

export default ExpandableTile
