'use client'

declare global {
  interface Window {
    __scrollytellingScroller?: string
  }
}

// The whole page scrolls inside #scroller (see layout.tsx / global.scss) instead
// of the document body, so mobile in-app browsers (e.g. Telegram) don't show or
// hide their URL bar + toolbar on scroll. The scrollytelling library reads this
// global when creating each ScrollTrigger — via the patched `scroller` option in
// patches/@bsmnt+scrollytelling+0.3.3.patch — and points every trigger at this
// element instead of the default window scroller. Set at module load, before any
// <Scrollytelling.Root> mounts and creates its triggers. If it is ever unset the
// library falls back to the window scroller (its original behaviour).
if (typeof window !== 'undefined') {
  window.__scrollytellingScroller = '#scroller'
}

export * from '@bsmnt/scrollytelling'
