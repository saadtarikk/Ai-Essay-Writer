'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const logos = [
  { name: 'Harvard University', src: '/logos/harvard.png' },
  { name: 'Stanford University', src: '/logos/stanford.png' },
  { name: 'MIT', src: '/logos/mit.png' },
  { name: 'Google', src: '/logos/google.png' },
  { name: 'Microsoft', src: '/logos/microsoft.png' },
  { name: 'Apple', src: '/logos/apple.png' },
  { name: 'Oxford University', src: '/logos/oxford.png' },
  { name: 'Cambridge University', src: '/logos/cambridge.png' },
  // Add more logos as needed
]

export function LogoTicker() {
  return (
    <div className="bg-secondary/30 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">
          Trusted by universities and businesses across the world
        </h2>
        <div className="relative">
          <motion.div
            className="flex space-x-12"
            animate={{
              x: ['-100%', '0%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 50,
                ease: 'linear',
              },
            }}
          >
            {logos.concat(logos).map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={100}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

