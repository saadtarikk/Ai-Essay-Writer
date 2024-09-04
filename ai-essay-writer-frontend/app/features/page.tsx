'use client'
import { motion } from "framer-motion"

export default function Features() {
  return (
    <motion.main 
      className="flex min-h-screen flex-col items-center justify-center p-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8">Features</h1>
      <p className="max-w-2xl text-center">
        We are revolutionizing essay writing with cutting-edge AI technology.
      </p>
    </motion.main>
  )
}