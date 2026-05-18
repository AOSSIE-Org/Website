'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Container } from '@/components/shared/Container'
import { Banner } from '@/components/shared/Banner'
import Image from 'next/image'
import projects from '@/helper/projects'
import { CardProduct } from '@/components/products/CardProduct'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Define the Cards component here
const Cards = ({ projectList }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 4 }}
      sx={{ paddingTop: '40px', justifyContent: 'center' }}
    >
      {projectList.map((project, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <MuiCard
            className="transition-transform duration-300 hover:scale-[1.02] dark:border-white dark:bg-[#2A2A2A]"
            sx={{
              height: 400,
              borderRadius: 2,
              border: '1px solid',
              borderColor: '#3c982c',
              boxShadow: '0px 4px 4px #00000040',
              backdropFilter: 'blur(4px) brightness(100%)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Image
                src={project.logo}
                alt={`${project.title} image`}
                width={80}
                height={80}
                style={{ margin: '0 auto 16px', objectFit: 'contain' }}
              />
              <Typography
                variant="h5"
                className="mt-6 font-mono text-green-600 dark:text-yellow-400"
                sx={{
                  fontFamily: 'Nunito-Bold',
                  color: '#3c982c',
                  textAlign: 'center',
                }}
              >
                {project.name}
              </Typography>

              <Typography
                variant="body1"
                className="text-center  font-mono text-lg leading-7 text-zinc-600 dark:text-zinc-400"
                sx={{
                  fontFamily: 'Nunito-Light',
                  color: 'black',
                  mt: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 4,
                }}
              >
                {project.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{ justifyContent: 'center', flexDirection: 'column', pb: 3 }}
            >
              <Link
                href={project.link.href}
                className="text-md relative z-10 mt-2 flex items-center font-mono font-semibold text-zinc-600 transition hover:text-[#00843D] dark:text-zinc-200 dark:hover:text-yellow-400"
              >
                <LinkIcon className="h-6 w-6 flex-none scale-110" />
                <span className="ml-2">{project.link.label}</span>
              </Link>
              <div className="mt-4 flex gap-6">
                <Link
                  href={project.link.href}
                  aria-label="GitHub"
                  className="text-zinc-500 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
                </Link>
                <Link
                  href="https://discord.gg/hjUhu33uAn"
                  aria-label="Discord"
                  className="text-zinc-500 transition hover:text-[#5865F2] dark:text-zinc-400 dark:hover:text-[#5865F2]"
                >
                  <FontAwesomeIcon icon={faDiscord} className="h-6 w-6" />
                </Link>
              </div>
            </CardActions>
          </MuiCard>
        </Grid>
      ))}
    </Grid>
  )
}

const ProjectSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="ideas-text relative mb-8 flex items-center justify-center"
    >
      <div
        className="absolute left-10 m-2 hidden h-[75px] w-[75px] bg-[url('/logo.png')] bg-cover bg-center dark:bg-[url('/logo.png')] md:block"
        alt="GSOC Logo"
      ></div>

      <h1 className="text-center font-mono text-6xl font-extrabold tracking-tighter text-[#32a852] dark:text-yellow-400 sm:text-6xl md:text-5xl lg:text-6xl">
        PROJECTS
      </h1>

      <div
        className="absolute right-10 m-2 hidden h-[75px] w-[75px] bg-cover bg-center md:block"
        style={{ backgroundImage: "url('/logo.png')" }}
        aria-label="Logo"
      ></div>
    </motion.div>
  )
}

const styles = {
  bannerWrapper: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
}

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('')

  const readyToDownload = projects.filter(
    (p) => p.category === 'Ready to download'
  )
  const productionReady = projects.filter(
    (p) => p.category === 'Production ready'
  )
  const ongoing = projects.filter((p) => p.category === 'Ongoing')

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) =>
      (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' })
    )
  }, [])

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return sortedProjects

    return sortedProjects.filter((project) =>
      (project.name || '').toLowerCase().includes(query)
    )
  }, [searchQuery, sortedProjects])

  return (
    <>
      <Container className="mt-20 mb-28">
        <Container.Inner>
           {/* intro text */}
          <div className="mt-20 mb-12">
            <motion.div
              className="pt-5 mb-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h5 className="font-bold text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 font-mono leading-tight mb-6 text-center">
                Projects That Create an {' '}
                <span className="text-[#00843D] dark:text-yellow-400">
                  Impact
                </span>
              </h5>
              <p className="text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-mono text-center">
                Free, open-source, and built by a global community of developers, designers, researchers, and innovators.
              </p>
            </motion.div>

            {/* Search Bar */}
            <div className="mt-8 mb-12 flex justify-center">
              <div className="relative w-full max-w-xl group">
                <label htmlFor="project-search" className="sr-only">
                  Search projects by name
                </label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-zinc-400 group-focus-within:text-[#00843D] dark:group-focus-within:text-yellow-400 transition-colors duration-300" />
                </div>
                <input
                  id="project-search"
                  type="search"
                  aria-describedby="project-search-status"
                  className="block w-full pl-11 pr-4 py-3.5 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl leading-5 bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#00843D] dark:focus:ring-yellow-400/50 focus:border-transparent sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
                  placeholder="Search for projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <p id="project-search-status" className="sr-only" aria-live="polite">
              {filteredProjects.length === 0
                ? `No projects found matching ${searchQuery.trim()}.`
                : `${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'} shown.`}
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((product) => (
                <motion.div
                  layout
                  key={product.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardProduct product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredProjects.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-xl text-zinc-500 dark:text-zinc-400 font-mono">
                  No projects found matching &quot;{searchQuery}&quot;
                </p>
              </div>
            )}
          </div>

          {/* 
          <div className="mb-20">
             <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl mb-8 text-center"
            >
              Ready to Download
            </motion.h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3 mb-16">
            {readyToDownload.map((product) => (
              <CardProduct key={product.slug} product={product} />
            ))}
            </div>
          </div>
          */}
        </Container.Inner>
      </Container>

      <div style={styles.bannerWrapper}>
        <Container.Outer className="mt-28">
          <Banner />
        </Container.Outer>
      </div>
    </>
  )
}
