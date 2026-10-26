import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteHeaderShell } from "@/components/site-header-shell"

import "./globals.css"
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  rootMetadata,
} from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata: Metadata = rootMetadata

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", "font-sans", inter.variable)}
    >
      <body>
        <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
        <SiteHeaderShell />
        {children}
      </body>
    </html>
  )
}
