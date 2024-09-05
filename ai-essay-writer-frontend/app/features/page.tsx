'use client'
import { motion } from "framer-motion"

export default function PageName() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.main 
      className="flex min-h-screen flex-col items-center justify-center p-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-4xl font-bold mb-8" variants={itemVariants}>Page Title</motion.h1>
      <motion.p className="max-w-2xl text-center" variants={itemVariants}>
        Page content goes here.
      </motion.p>
    </motion.main>
  );
}