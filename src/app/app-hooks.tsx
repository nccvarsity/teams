'use client'

import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useEffect } from 'react'

import { useAppStore } from '~/context/use-app-store'
import {
  gaTrackingId,
  isClient,
  isDev,
  isProd,
  teamsLog
} from '~/lib/constants'
import { GAScripts, useAppGA } from '~/lib/ga'

export const AppHooks = () => {
  if (isClient) {
    if (isProd) {
      // eslint-disable-next-line no-console
      console.log(teamsLog)
    } else {
      console.log(teamsLog)
    }
  }

  if (gaTrackingId) useAppGA()

  useOverflowDebuggerInDev()
  useUserIsTabbing()
  useFontsLoaded()
  useIgnoreMobileResize()

  return gaTrackingId ? <GAScripts /> : null
}

/* APP HOOKS */

// Mobile in-app browsers (e.g. Telegram, Instagram) show/hide their URL bar and
// bottom nav as the user scrolls, firing height-only `resize` events. By default
// GSAP's ScrollTrigger refreshes (recalculating every pin's start/end) on those
// events, repositioning the pinned sections mid-scroll. This skips that refresh.
const useIgnoreMobileResize = () => {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })
  }, [])
}

const useOverflowDebuggerInDev = () => {
  useEffect(() => {
    if (!isDev) return
    let mousetrapRef: Mousetrap.MousetrapInstance | undefined = undefined
    import('mousetrap').then(({ default: mousetrap }) => {
      mousetrapRef = mousetrap.bind(['command+i', 'ctrl+i', 'alt+i'], () => {
        document.body.classList.toggle('inspect')
      })
    })

    return () => {
      mousetrapRef?.unbind(['command+i', 'ctrl+i', 'alt+i'])
    }
  }, [])
}

const useUserIsTabbing = () => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === `Tab`) {
        document.body.classList.add('user-is-tabbing')
      }
    }

    function handleMouseDown() {
      document.body.classList.remove('user-is-tabbing')
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])
}

const useFontsLoaded = () => {
  useEffect(() => {
    const maxWaitTime = 1500 // tweak this as needed.

    const timeout = window.setTimeout(() => {
      onReady()
    }, maxWaitTime)

    function onReady() {
      window.clearTimeout(timeout)
      useAppStore.setState({ fontsLoaded: true })
      document.documentElement.classList.add('fonts-loaded')
    }

    try {
      document.fonts.ready
        .then(() => {
          onReady()
        })
        .catch((error: unknown) => {
          console.error(error)
          onReady()
        })
    } catch (error) {
      console.error(error)
      onReady()
    }
  }, [])
}
