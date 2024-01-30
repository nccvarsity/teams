import '~/css/global.scss'

import type { Metadata } from 'next'
import localFont from "next/font/local";
import { Inter } from 'next/font/google'

// import { Header } from '~/components/header'
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
  src: [
    { path: "./fonts/PPRader-Bold.otf", weight: "900" }
  ],
  fallback: ["var(--font-system)"],
  preload: true,
});

const ppMori = localFont({
  src: [
    { path: "./fonts/PPMori-Regular.otf", weight: "400" },
    { path: "./fonts/PPMori-SemiBold.otf", weight: "600" }
  ],
  fallback: ["var(--font-system)"],
  preload: true,
});

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
  manifest: '/manifest.webmanifest',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      style={{
        ["--font-pp-rader" as string]: `${ppRader.style.fontFamily}, var(--font-system), sans-serif`,
        ["--font-pp-mori" as string]: `${ppMori.style.fontFamily}, var(--font-system), sans-serif`
      }}
      >
      <body style={{ opacity: 0 }} className={inter.variable}>
        <Providers>
          {/* <Header /> */}
          {children}
          <AppHooks />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
