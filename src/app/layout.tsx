import '~/css/global.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

import { siteURL } from '~/lib/constants'

import { AppHooks } from './app-hooks'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

// const basementGrotesque = localFont({
//   src: [
//     { path: "./fonts/BasementGrotesque-Regular.woff2", weight: "400" },
//     { path: "./fonts/BasementGrotesque-BlackExpanded.woff2", weight: "800" },
//     {
//       path: "./fonts/BasementGrotesqueDisplay-UltraBlackExtraExpanded.woff2",
//       weight: "900",
//     },
//   ],
//   fallback: ["var(--font-system)"],
//   preload: true,
// });

const ppRader = localFont({
  src: [{ path: './fonts/PPRader-Bold.otf', weight: '900' }],
  fallback: ['var(--font-system)'],
  preload: true
})

const ppMori = localFont({
  src: [
    { path: './fonts/PPMori-Regular.otf', weight: '400' },
    { path: './fonts/PPMori-SemiBold.otf', weight: '600' }
  ],
  fallback: ['var(--font-system)'],
  preload: true
})

export const metadata: Metadata = {
  title: {
    default: 'V Dream Team',
    template: '%s | V Teams'
  },
  metadataBase: siteURL,
  description: `Welcome to V Teams.`,
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    }
  ],
  manifest: '/manifest.webmanifest'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      style={{
        ['--font-pp-rader' as string]: `${ppRader.style.fontFamily}, var(--font-system), sans-serif`,
        ['--font-pp-mori' as string]: `${ppMori.style.fontFamily}, var(--font-system), sans-serif`
      }}
    >
      <body style={{ opacity: 0 }} className={inter.variable}>
        <Providers>
          {/* All page content scrolls inside this element instead of the
              document body, so mobile in-app browsers (e.g. Telegram) stop
              showing/hiding their URL bar + toolbar on scroll. See #scroller in
              global.scss; the scrollytelling ScrollTriggers are pointed here via
              window.__scrollytellingScroller in lib/scrollytelling-client.tsx. */}
          <div id="scroller">{children}</div>
          <AppHooks />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
