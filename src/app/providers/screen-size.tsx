'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react'

export const ScreenSizeContext = createContext(null)

export const ScreenSizeProvider = ({ children }: { children: ReactNode }) => {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const handleResize = () => {
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
