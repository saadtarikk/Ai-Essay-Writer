"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/Label"
import { Icons } from "@/components/ui/icons"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from '@/lib/api'





export function LoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const response = await login(email, password)
      localStorage.setItem('token', response.access_token)
      router.push('/essays')
    } catch (error) {
      console.error('Login failed:', error)
      setError('Login failed. Please check your credentials and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
  {isLoading ? 'Logging in...' : 'Log In'}
</Button>            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="relative my-6 w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => signIn('google')}
            >
              <Icons.google className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => signIn('facebook')}
            >
              <Icons.facebook className="mr-2 h-4 w-4" /> Facebook
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => signIn('outlook')}
            >
              <Icons.outlook className="mr-2 h-4 w-4" /> Outlook
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
