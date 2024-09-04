

import { ThemeProvider } from "@/components/ui/theme-provider"
import Navigation from "@/components/ui/Navigation"
import { Providers } from "./providers"
import "./globals.css"
import { Footer } from "@/components/ui/Footer"


export const metadata = {
  title: 'AI Essay Writer',
  description: 'Write high-quality essays with the help of AI',
}
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
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  </Providers>
</body>
    </html>
  )
}

