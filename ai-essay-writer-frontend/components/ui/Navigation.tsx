'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/Label"

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Features', path: '/features' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Users', path: '/users' },
  { name: 'Essays', path: '/essays' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <motion.nav
      className="bg-background shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <motion.div className="flex-shrink-0 flex items-center" variants={itemVariants}>
              <Link href="/" className="text-2xl font-bold">Ai Essay Writer</Link>
            </motion.div>
            <motion.div className="hidden sm:ml-6 sm:flex sm:space-x-8" variants={containerVariants}>
              {navItems.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <Link
                    href={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === item.path
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div className="hidden sm:ml-6 sm:flex sm:items-center" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
              <Label htmlFor="dark-mode" className="sr-only">
                Dark mode
              </Label>
              {theme === 'dark' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button asChild variant="ghost" className="ml-4">
                <Link href="/login">Log in</Link>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button asChild className="ml-4">
                <Link href="/signup">Sign up</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div className="-mr-2 flex items-center sm:hidden" variants={itemVariants}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu button */}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="pt-2 pb-3 space-y-1" variants={containerVariants} initial="hidden" animate={isOpen ? "visible" : "hidden"}>
          {navItems.map((item) => (
            <motion.div key={item.path} variants={itemVariants}>
              <Link
                href={item.path}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  pathname === item.path
                    ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="pt-4 pb-3 border-t border-gray-200" variants={containerVariants} initial="hidden" animate={isOpen ? "visible" : "hidden"}>
          <motion.div className="flex items-center px-4" variants={itemVariants}>
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode-mobile"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
              <Label htmlFor="dark-mode-mobile" className="sr-only">
                Dark mode
              </Label>
              {theme === 'dark' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
            </div>
            <Button asChild variant="ghost" className="ml-4">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="ml-4">
              <Link href="/signup">Sign up</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.nav>
    
  )
}