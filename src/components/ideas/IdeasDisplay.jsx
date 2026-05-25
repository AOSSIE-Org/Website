'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IdeasList } from '@/components/ideas/IdeasList'

export function IdeasDisplay({ ideasData }) {
  const [showAll, setShowAll] = useState(false)
  
  // Show last 3 years initially
  const initialCount = 3
  const displayedData = showAll ? ideasData : ideasData.slice(0, initialCount)
  const hasMore = ideasData.length > initialCount && !showAll

  return (
    <div className="space-y-20">
      {displayedData.map(({ year, articles }, index) => (
        <motion.div 
          key={year} 
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <h2 className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100 mb-10 text-left border-l-4 pl-4 border-[#32a852] dark:border-yellow-400">
            {year} Ideas
          </h2>
          <IdeasList articles={articles} year={year} />
        </motion.div>
      ))}
      
      {hasMore && (
        <div className="flex justify-center mt-12">
          <motion.button
            onClick={() => setShowAll(true)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group order-2 mx-auto items-center overflow-hidden rounded-lg bg-[#00843D] px-8 py-3 text-white transition-all duration-200 hover:bg-[#006e32] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00843D] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-yellow-400 dark:text-zinc-900 dark:hover:bg-yellow-500 dark:focus-visible:ring-yellow-400 dark:focus-visible:ring-offset-zinc-950 font-mono font-semibold"
          >
            Show All Ideas
          </motion.button>
        </div>
      )}
    </div>
  )
}
