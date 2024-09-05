'use client'

import { ThemeProvider } from "@/components/ui/theme-provider"
import Navigation from "@/components/ui/Navigation"
import { Providers } from "./providers"
import "./globals.css"
import { Footer } from "@/components/ui/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { metadata } from './seo/metadata'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <AnimatePresence mode="wait" initial={false}>
                <motion.main
                  className="flex-grow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.main>
              </AnimatePresence>
              <Footer />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}