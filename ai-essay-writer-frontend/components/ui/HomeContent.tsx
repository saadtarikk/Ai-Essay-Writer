'use client'

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoTicker } from "@/components/ui/LogoTicker"

export function HomeContent() {
  return (
    <div className="min-h-screen">
      <motion.header 
        className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-background to-secondary/20 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          AI Essay Writer
        </motion.h1>
        <motion.div 
          className="w-full max-w-md px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Input 
            type="text" 
            placeholder="Enter your essay topic" 
            className="mb-4"
          />
          <Button className="w-full">Generate Essay</Button>
        </motion.div>
      </motion.header>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['AI-Powered Writing', 'Plagiarism-Free Content', 'Quick Turnaround'].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{feature}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'John Doe', text: 'This AI essay writer saved me hours of work!' },
              { name: 'Jane Smith', text: 'I was skeptical at first, but the results are impressive.' }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8">Sign up now and write your first AI-powered essay today!</p>
          <Button size="lg" variant="secondary">Sign Up Now</Button>
        </div>
      </section>
    </div>
  )
}

