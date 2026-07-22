'use client'

import { gsap } from 'gsap'
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
  useMobileScrollNormalization()

  return gaTrackingId ? <GAScripts /> : null
}

/* APP HOOKS */

// Tames scrolling inside mobile in-app browsers (e.g. Telegram, Instagram).
//
// 1. `ignoreMobileResize`: those browsers show/hide their URL bar and bottom nav
//    as the user scrolls, firing height-only `resize` events. By default GSAP's
//    ScrollTrigger refreshes (recalculating every pin's start/end) on resize,
//    repositioning the pinned sections mid-scroll. This skips that refresh.
//
// 2. `normalizeScroll`: on the naturally-scrolling section (the teams tiles) the
//    URL bar's show/hide on every scroll-direction change hijacks the first part
//    of the gesture — the page briefly moves the wrong way before scrolling. This
//    is inherent browser behaviour that CSS can't reach, because the document
//    body is the scroller. `normalizeScroll` moves scroll handling onto the JS
//    thread and keeps iOS from toggling the URL bar mid-scroll. Scoped to touch
//    so desktop wheel/trackpad scrolling stays fully native.
const useMobileScrollNormalization = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })
    ScrollTrigger.normalizeScroll({ type: 'touch', allowNestedScroll: true })

    return () => {
      ScrollTrigger.normalizeScroll(false)
    }
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
