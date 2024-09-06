'use client';
import Image from "next/image";
import { motion } from 'framer-motion';
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};


export default function Home() {
  return (

    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <header className="p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div className="flex items-center" {...fadeIn}>
            <Image src="/logo.svg" alt="AI Essay Writer Logo" width={40} height={40} />
            <span className="ml-2 text-3xl font-bold text-blue-400">AI Essay Writer</span>
          </motion.div>
          <motion.div className="space-x-6 text-sm" {...fadeIn}>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Log In</Link>
            <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
              Sign Up
            </Link>
          </motion.div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16">
        <motion.h1 
          className="text-6xl font-bold mb-6 leading-tight max-w-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Say Goodbye to Citation Frustration
        </motion.h1>
        <motion.p 
          className="text-xl mb-12 max-w-2xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Save hours on your research papers with AI Essay Writer's efficient writing and citation tools. Focus on what matters most.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/signup" className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors transform hover:scale-105 inline-block">
            Start writing - it's free
          </Link>
        </motion.div>
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-sm text-gray-400 mb-4">Trusted by over 3 million academics</p>
          <div className="flex justify-center">
            <Image src="/avatar1.png" alt="User Avatar" width={40} height={40} className="rounded-full -mr-2 border-2 border-gray-800" />
            <Image src="/avatar2.png" alt="User Avatar" width={40} height={40} className="rounded-full -mr-2 border-2 border-gray-800" />
            <Image src="/avatar3.png" alt="User Avatar" width={40} height={40} className="rounded-full border-2 border-gray-800" />
          </div>
        </motion.div>
      </main>
    </div>
  );
}