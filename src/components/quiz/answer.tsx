'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import s from './quiz.module.scss'

export interface AnswerType {
  ans: string
  tags: string[]
  imageUrl?: string
}

export const Answer = ({
  answer,
  onPress,
  isSelected
}: {
  answer: AnswerType
  onPress: (ans: string, tags: string[]) => void
  isSelected: boolean
}) => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  function handleClick() {
    onPress(answer.ans, answer.tags)
  }

  return (
    <div
      className={s['answerContainer']}
      key={answer.ans}
      onClick={handleClick}
      style={{ backgroundColor: isSelected ? '#e54602' : undefined }}
    >
      <p className={s.answerContainerDescription}>{answer.ans}</p>
      {answer.imageUrl && (
        <div className={s['imageContainer']}>
          <Image src={answer.imageUrl} width={500} height={500} alt={''} />
        </div>
      )}
    </div>
  )
}
