import { usePathname } from 'next/navigation'
import Script from 'next/script'
import * as React from 'react'

import { gaTrackingId } from './constants'

declare global {
  interface Window {
    gtag: undefined | ((...args: any[]) => void)
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!window.gtag) {
    console.warn('window.gtag is not defined')
    return
  }
  window.gtag('config', gaTrackingId, {
    page_path: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value
}: {
  action: string
  category: string
  label: string
  value: string
}) => {
  if (!window.gtag) {
    console.warn('window.gtag is not defined')
    return
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

// Put this in _document.tsx
export const GAScripts = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaTrackingId}', {
              page_path: window.location.pathname,
            });
            // you can add more gtags here like:
            // gtag('config', '<another-tracking-code>', {
            //   page_path: window.location.pathname,
            // });
          `
        }}
      />
    </>
  )
}

// Tracks client-side navigations in the App Router. The initial pageview is
// already sent by the inline gtag-init script, so the first render is skipped
// to avoid double-counting.
export const useAppGA = () => {
  const pathname = usePathname()
  const isInitial = React.useRef(true)

  React.useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false
      return
    }
    if (pathname) pageview(pathname)
  }, [pathname])
}
