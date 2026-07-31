'use client'

import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'

import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'

import { Typewriter } from '../typewriter'
import type { tileMetaData } from '.'
import ExpandRetract from './expand-retract'
import s from './tileboard.module.scss'

interface ExpandableTileProps {
  metaData: tileMetaData
  index: number
  zIndex: number
}

// Breathing room left below the description when the tile is expanded.
const BOTTOM_GAP_REM = 2.5

const ExpandableTile: FC<ExpandableTileProps> = ({
  metaData,
  zIndex,
  index
}) => {
  const isOn = metaData.toggleState.isOn
  const wrapperRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const [expandedHeight, setExpandedHeight] = useState<number>()

  // Measure the content so the tile can stretch to fit it. The title and
  // description are absolutely positioned, so we derive the required height
  // from the description's rendered bottom edge rather than from flow height.
  // Driving the wrapper's height with a concrete pixel value keeps the
  // expand/collapse animation (the `transition` on `.tile`).
  useIsomorphicLayoutEffect(() => {
    if (!isOn) {
      setExpandedHeight(undefined)
      return
    }

    const measure = () => {
      const wrapper = wrapperRef.current
      const description = descriptionRef.current
      if (!wrapper || !description) return
      const remInPx = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      )
      const wrapperTop = wrapper.getBoundingClientRect().top
      const descriptionBottom = description.getBoundingClientRect().bottom
      setExpandedHeight(
        descriptionBottom - wrapperTop + BOTTOM_GAP_REM * remInPx
      )
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isOn])

  // Expanding a tile moves everything below the tileboard further down the
  // page. ScrollTrigger caches the scroll positions each section starts and
  // ends at, and only recomputes them on a refresh — so without this the
  // sections below keep the offsets they had before the tile opened, and their
  // animations run early. Wait for the height transition to settle first, so
  // the positions are measured where they finally land.
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== wrapper || event.propertyName !== 'height') return
      ScrollTrigger.refresh()
    }

    wrapper.addEventListener('transitionend', handleTransitionEnd)
    return () =>
      wrapper.removeEventListener('transitionend', handleTransitionEnd)
  }, [])

  const isPrimary = index % 2 === 0
  const tileClassName = clsx(
    isPrimary ? s.tilePrimary : s.tileSecondary,
    isOn && (isPrimary ? s.tilePrimaryExpanded : s.tileSecondaryExpanded),
    isOn && s.expanded
  )

  function handleClick() {
    metaData.toggleState.handleToggle()
  }
  function handleTitleClick() {
    metaData.toggleState.handleToggle()
  }
  const longName = metaData.name.length > 7
  const veryLongName = metaData.name.length > 10

  const title = (
    // Only linked titles swallow the click (the link handles it); otherwise let
    // it bubble to the tile so tapping the name expands it like anywhere else.
    <h1
      onClick={metaData.url ? handleTitleClick : undefined}
      style={{ zIndex: zIndex + 1 }}
      className={clsx(
        isOn ? clsx(s.tileExpandedTitle, s.tileTitle, s.wavyText) : s.tileTitle,
        veryLongName
          ? s.tileTitleReducedMore
          : longName
            ? s.tileTitleReduced
            : s.tileTitle
      )}
    >
      {metaData.name}
    </h1>
  )

  return (
    <div
      ref={wrapperRef}
      className={isOn ? clsx(s.tileExpanded, s.tile) : s.tile}
      style={isOn && expandedHeight ? { height: expandedHeight } : undefined}
    >
      <div
        onClick={handleClick}
        style={{ zIndex: zIndex }}
        className={tileClassName}
      >
        <div className={s.jd}>
          {isOn
            ? metaData.jd.map((text) => (
                <div key={text} className={s.jdtext}>
                  <Typewriter text={text} />
                </div>
              ))
            : null}
        </div>
        {metaData.url ? (
          <Link className={s.tileLink} href={metaData.url} target="_blank">
            {title}
            {isOn && (
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
        ) : (
          // Teams without a sign-up form get no link, and no arrow pointing at
          // one — their note says how to join instead.
          <div className={s.tileLink}>{title}</div>
        )}
        <div
          ref={descriptionRef}
          style={{ zIndex: zIndex + 1 }}
          className={s.tileDescription}
        >
          <p>{metaData.description}</p>
          {metaData.note && <p className={s.tileNote}>{metaData.note}</p>}
        </div>
        <ExpandRetract zIndex={zIndex + 2} isExpanded={isOn} />
      </div>
    </div>
  )
}

export default ExpandableTile
