import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-background py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; 2023 AI Essay Writer. All rights reserved.</p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}