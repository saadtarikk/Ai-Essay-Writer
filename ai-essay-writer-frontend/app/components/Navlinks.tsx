'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function NavLinks() {
  return (
    <motion.div className="space-x-6 text-sm" {...fadeIn}>
      <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
      <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
      <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
      <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Log In</Link>
      <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
        Sign Up
      </Link>
    </motion.div>
  );
}