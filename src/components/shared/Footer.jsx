'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { Container } from '@/components/shared/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub, faXTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-[#00843D] dark:hover:text-yellow-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <motion.footer
      className="mt-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-12 pt-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
              
              {/* Brand and Description */}
              <div className="md:col-span-2">
                <h3 className="font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">AOSSIE</h3> 
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-mono max-w-md leading-relaxed">
                  AOSSIE is a not-for-profit organization dedicated to project-based innovation-focused and research-intensive education.
                </p>
              </div>

              {/* Navigation Links */}
              <div>
                 <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase mb-4">Navigation</h3>
                 <div className="flex flex-col gap-3 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                    <NavLink href="/about">About Us</NavLink>
                    <NavLink href="/projects">Our Projects</NavLink>
                    <NavLink href="/ideas">Project Ideas</NavLink>
                    <NavLink href="/apply">How to Apply</NavLink>
                 </div>
              </div>

               {/* Social Links */}
              <div>
                <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase mb-4">Connect</h3>
                <div className="flex flex-wrap gap-6">
                  <Link aria-label="Contact by Mail" className='text-zinc-500 hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400 transition' href='mailto:aossie.oss@gmail.com' target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} size='xl' />
                  </Link>
                  <Link aria-label="Follow on GitHub" className='text-zinc-500 hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400 transition' href='https://github.com/AOSSIE-Org' target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} size='xl' />
                  </Link>
                  <Link aria-label="Join on Discord" className='text-zinc-500 hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400 transition' href='https://discord.gg/hjUhu33uAn' target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faDiscord} size='xl' />
                  </Link>
                  <Link aria-label="Follow on LinkedIn" className='text-zinc-500 hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400 transition' href='https://www.linkedin.com/company/aossie/' target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size='xl' />
                  </Link>
                  <Link aria-label="Follow on X (Twitter)" className='text-zinc-500 hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400 transition' href='https://x.com/aossie_org' target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} size='xl' />
                  </Link>
                  <Link aria-label="Subscribe on YouTube" className='text-zinc-500 hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400 transition' href='https://www.youtube.com/@AOSSIE-Org' target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faYoutube} size='xl' />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-col items-center justify-between gap-6 sm:flex-row border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
              <p className="text-sm text-zinc-400 dark:text-zinc-500 font-mono sm:ml-auto">
                &copy; 2016-{new Date().getFullYear()} AOSSIE. All rights reserved.
              </p>
              {/*
              <div className="flex gap-4 text-sm font-mono text-zinc-500 dark:text-zinc-400">
                  <span>Code of Conduct</span>
                  <span>Privacy Policy</span>
              </div>
              */}
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </motion.footer>
  )
}