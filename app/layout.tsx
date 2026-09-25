import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteHeader } from "@/components/site-header"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  rootMetadata,
} from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata: Metadata = rootMetadata

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
        <ThemeProvider forcedTheme="light">
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
