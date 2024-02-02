'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { isSafari } from 'react-device-detect'

export const ScreenSizeContext = createContext(null)

export const ScreenSizeProvider = ({ children }: { children: ReactNode }) => {
  const [hide, setHide] = useState(false)

  let width = 0

  useEffect(() => {
    width = window.innerWidth

    // Safari has a bug where it triggers a resize event on zoom or scroll
    // Skip resize event for Safari on mobile
    if (isSafari && width <= 768) {
      return
    }

    const handleResize = () => {
      if (width === window.innerWidth) {
        return
      }
      width = window.innerWidth
      setHide(true)
      setTimeout(() => {
        setHide(false)
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ScreenSizeContext.Provider value={null}>
      {hide ? null : children}
    </ScreenSizeContext.Provider>
  )
}
