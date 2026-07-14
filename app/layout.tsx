import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { UserDataProvider } from "@/lib/user-data"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Pop Reference — Decode Teen Slang Daily",
  description:
    "Pop Reference is the daily cheat sheet that deconstructs trending teen slang, so you can connect with your kids without the awkwardness of misusing the words.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#dbe5f7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-muted ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <UserDataProvider>{children}</UserDataProvider>
      </body>
    </html>
  )
}
