import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const nirmalaUI = localFont({
  src: "../public/fonts/nirmala-ui.ttf",
  variable: "--font-nirmala",
  display: "swap",
  fallback: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Dynagrowth Schools - We Learn and Grow Together",
  description:
    "Dynagrowth Schools provides quality education from nursery to secondary level. Educating the total child with skills for today, values for life.",
  generator: "v0.app",
  icons: {
    icon: '/icon.ico',
    shortcut: '/icon.ico',
    apple: '/icon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/itc-eras-ultra" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${nirmalaUI.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
