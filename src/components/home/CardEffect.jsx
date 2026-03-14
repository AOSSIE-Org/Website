'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function CardEffect({ heading, content, logo }) {

    const wrappedHeading = (heading ?? '')
        .replace(/([a-z])([A-Z])/g, '$1\u200B$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1\u200B$2')

    return (
        <motion.a
            initial={{ opacity: 0, rotateY: -90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative block h-[22rem] w-full cursor-pointer overflow-hidden [perspective:1000px]"
        >
            <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* Front Face */}
                <div className="absolute inset-0 h-full w-full shadow-xl flex flex-col items-center justify-center rounded-3xl border-2 border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 [backface-visibility:hidden]">
                    <div className="px-8 pb-4 w-full flex flex-col items-center justify-center">
                        <Image
                            src={logo}
                            width={130}
                            unoptimized
                            className="mx-auto"
                            alt="Project Logo"
                        />

                        <h2
                            className="mt-4 w-full leading-snug text-[clamp(1.15rem,2.5vw,1.5rem)] text-center break-words whitespace-normal font-extrabold font-mono text-[#00843D] dark:text-yellow-400"
                            title={heading}
                        >
                            {wrappedHeading}
                        </h2>
                    </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 h-full w-full shadow-xl flex items-center justify-center rounded-3xl border-2 border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="p-6 flex items-center justify-center h-full">
                        <p className="font-mono text-center text-zinc-600 dark:text-zinc-300 break-words">
                            {content}
                        </p>
                    </div>
                </div>

            </div>
        </motion.a>
    )
}