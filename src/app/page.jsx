'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { Container } from '@/components/shared/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faDiscord,
  faGithub,
  faXTwitter,
  faYoutube,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'
import { CardEffect } from '@/components/home/CardEffect'
import { Banner } from '@/components/shared/Banner'
import { Stats } from '@/components/home/Stats'
import { CardProject } from '@/components/home/CardProject'
import projects from '@/helper/projects'

export default function Home() {
  const [randomProjects, setRandomProjects] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])

  useEffect(() => {
    // Select specific projects as featured
    //const featuredNames = ['Agora Blockchain', 'Djed', 'PictoPy'];
    const featuredNames = [];
    const featured = projects.filter(p => featuredNames.includes(p.name));
    setFeaturedProjects(featured);

    // Random projects excluding featured ones
    const others = projects.filter(p => !featuredNames.includes(p.name));
    setRandomProjects(others.sort(() => 0.5 - Math.random()).slice(0, 3));
  }, [])
  return (
    <>
      <Container.Outer className="mt-16 relative">
        <div className="relative">

          {/* Background Image */}
          <div className="hidden absolute lg:block z-0 bg-[url('../images/background.png')] dark:bg-[url('../images/background-dark.png')] right-0 top-[-230px] w-full h-[-webkit-fill-available] bg-cover bg-center mb-20 pointer-events-none"></div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row relative z-10 mb-16 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full flex justify-center lg:justify-end lg:pr-12"
            >
              <Image
                src="./logo1.png"
                width={380}
                height={350}
                className="scale-110 drop-shadow-xl lg:-translate-x-[60px] lg:-translate-y-[100px]"
                alt="AOSSIE Logo"
                priority
              />
            </motion.div>
            <div className="flex-1 w-full lg:pl-4">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <motion.h1 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-mono text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#00843d] md:text-[#FED41E] dark:text-[#FED41E] lg:dark:text-black leading-tight relative lg:-top-[30px] text-center pb-8 lg:text-left"
                >
                  We Innovate <br /> We Educate
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-8 font-mono text-xl leading-8 text-zinc-500 lg:text-zinc-800 dark:text-zinc-300 lg:dark:text-[#FED41E]/90 bg-white/50 md:bg-transparent dark:bg-zinc-900/50 md:dark:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-xl p-4 md:p-0 text-center lg:text-left"
                >
                  We are an Australian not-for-profit umbrella organization for
                  open-source projects. We believe the open-source philosophy
                  provides a resource-efficient channel to transfer knowledge and
                  achieve innovation and education.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-8 flex flex-wrap gap-8 justify-center lg:justify-start"
                >
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact by Mail"
                    className="text-zinc-500 lg:text-zinc-800 transition hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400"
                    href="mailto:aossie.oss@gmail.com"
                  >
                    <FontAwesomeIcon icon={faEnvelope} size="2xl" />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow on GitHub"
                    className="text-zinc-500 lg:text-zinc-800 transition hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400"
                    href="https://github.com/AOSSIE-Org"
                  >
                    <FontAwesomeIcon icon={faGithub} size="2xl" />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join on Discord"
                    className="text-zinc-500 lg:text-zinc-800 transition hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400"
                    href="https://discord.gg/hjUhu33uAn"
                  >
                    <FontAwesomeIcon icon={faDiscord} size="2xl" />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow on LinkedIn"
                    className="text-zinc-500 lg:text-zinc-800 transition hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400"
                    href="https://www.linkedin.com/company/aossie/"
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow on X (Twitter)"
                    className="text-zinc-500 lg:text-zinc-800 transition hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400"
                    href="https://x.com/aossie_org"
                  >
                    <FontAwesomeIcon icon={faXTwitter} size="2xl" />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Subscribe on YouTube"
                    className="text-zinc-500 lg:text-zinc-800 transition hover:text-[#00843D] dark:text-zinc-400 dark:hover:text-yellow-400"
                    href="https://www.youtube.com/@AOSSIE-Org"
                  >
                    <FontAwesomeIcon icon={faYoutube} size="2xl" />
                  </Link>
                
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-12 mx-4 md:mx-0 md:mt-8 text-center lg:text-left relative lg:top-[20px]"
                >
                  <Link href="/about" className="group relative inline-block text-lg">
                    <span className="relative z-10 block overflow-hidden rounded-lg border-2 border-gray-900 px-5 py-3 transition-colors duration-300 ease-in-out group-hover:text-white dark:group-hover:text-black">
                      <span className="absolute inset-0 h-full w-full rounded-lg bg-white px-5 py-3"></span>
                      <span className="absolute left-0 -ml-2 h-48 w-72 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-[#00843D] transition-all duration-300 ease-in-out group-hover:-rotate-180 dark:bg-yellow-400"></span>
                      <span className="relative font-mono text-xl font-black tracking-tighter">
                        Learn More About Us
                      </span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 mb-3 mr-2 h-14 w-full rounded-lg bg-[#00843D] transition-all duration-200 ease-linear group-hover:m-0 dark:bg-yellow-400"
                      data-rounded="rounded-lg"
                    ></span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Container.Outer>
        
        <Stats />

        {/* Projects Section */}
        <Container className="mt-24 mb-20">
          <div className="space-y-10 ">
            <div className="flex text-center items-center justify-center">
              <div className=" relative top-2 hidden h-12 w-12 translate-x-px transform items-center justify-center rounded-full bg-[#00843D] p-2 dark:bg-yellow-400 md:flex">
                <svg
                  aria-hidden="true"
                  role="img"
                  className="scale-125 font-extrabold text-white dark:text-black"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M7.25 6a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5A.75.75 0 007.25 6zM12 6a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0012 6zm4 .75a.75.75 0 011.5 0v9.5a.75.75 0 01-1.5 0v-9.5z"></path>
                  <path
                    fillRule="evenodd"
                    d="M3.75 2A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h16.5A1.75 1.75 0 0022 20.25V3.75A1.75 1.75 0 0020.25 2H3.75zM3.5 3.75a.25.25 0 01.25-.25h16.5a.25.25 0 01.25.25v16.5a.25.25 0 01-.25.25H3.75a.25.25 0 01-.25-.25V3.75z"
                  ></path>
                </svg>
              </div>
              <div className="col-span-8 mt-3 self-center lg:col-start-2">
                <h1 className="font-mono pl-3 text-5xl font-black capitalize tracking-tighter text-zinc-500 lg:text-zinc-800 dark:text-white">
                  Our Projects
                </h1>
              </div>
            </div>

            <p className=" font-mono text-lg text-zinc-500 lg:text-zinc-800 dark:text-zinc-400 text-center ">
              Our Projects span a wide range of themes, such as: 
              open money; decentralized economic and financial stability; 
              trust; education; sustainability; communication; governance and management; 
              and user-empowering sunny tools.
            </p>
          </div>
          <div className="mt-10">
            <Container.Inner>
              <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {randomProjects.map((project) => (
                  <div key={project.name} className="w-full max-w-[18rem] sm:max-w-none">
                    <CardEffect
                      heading={project.name}
                      logo={project.logo}
                      content={project.description}
                    />
                  </div>
                ))}
              </div>
            </Container.Inner>
          </div>
          <div className="mt-12 text-center">
            <Link
              target="_blank"
              className="group relative inline-flex items-center overflow-hidden rounded-lg bg-[#00843D] px-8 py-3 text-white focus:outline-none active:bg-[#00843D] dark:bg-yellow-400 dark:text-zinc-900"
              href="/projects"
            >
              <span className="absolute right-0 flex-shrink-0 translate-x-full rounded-full border border-current bg-white p-1 text-black transition-transform group-hover:-translate-x-4">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <span className="font-mono font-semibold transition-all group-hover:mr-6">
                View All Projects
              </span>
            </Link>
          </div>
        </Container>


      <Container.Outer className="mt-28">
        <Banner />
      </Container.Outer>
    </>
  )
}
