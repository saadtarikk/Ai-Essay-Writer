'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoTicker } from "@/components/ui/LogoTicker"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { createEssay } from '@/lib/api';

export function HomeContent() {
  const [topic, setTopic] = useState('');
  const [essay, setEssay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [showEssayCard, setShowEssayCard] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleGenerateEssay = async () => {
    console.log('Generating essay for topic:', topic);
    setIsLoading(true);
    setError('');
    try {
      console.log('Sending request to /api/generate-essay');
      const response = await fetch('/api/generate-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      console.log('Response received:', response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate essay');
      }
      const data = await response.json();
      console.log('Essay data:', data);
      setEssay(data.essay);
      setShowEssayCard(true);

      // Save the generated essay
      await createEssay({ title: topic, content: data.essay, topic });
    } catch (err) {
      console.error('Error generating essay:', err);
      setError('Failed to generate essay. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header 
        className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-background to-secondary/20 relative"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center"
          variants={itemVariants}
        >
          AI Essay Writer
        </motion.h1>
        <motion.div 
          className="w-full max-w-md px-4"
          variants={itemVariants}
        >
          <Input 
            type="text" 
            placeholder="Enter your essay topic" 
            className="mb-4"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button 
            className="w-full" 
            onClick={handleGenerateEssay}
            disabled={isLoading || !topic}
          > Generate Essay
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {showEssayCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Generated Essay</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEssayCard(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="prose max-w-none">
                {essay.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {essay && (
        <motion.section 
          className="py-16 bg-secondary/30"
          variants={itemVariants}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Generated Essay</h2>
            <Card>
              <CardContent className="prose max-w-none">
                {essay.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.section>
      )}

      <motion.section 
        className="py-16 bg-secondary/30"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {['AI-Powered Writing', 'Plagiarism-Free Content', 'Quick Turnaround'].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>{feature}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="py-16"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {[
              { name: 'John Doe', text: 'This AI essay writer saved me hours of work!' },
              { name: 'Jane Smith', text: 'I was skeptical at first, but the results are impressive.' }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4">"{testimonial.text}"</p>
                    <p className="font-semibold">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="py-16 bg-primary text-primary-foreground"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8">Sign up now and write your first AI-powered essay today!</p>
          <Button size="lg" variant="secondary">Sign Up Now</Button>
        </div>
      </motion.section>
    </motion.div>
  )
}