'use client'

import Link from 'next/link'
import Grid from '@mui/material/Grid'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { motion } from 'framer-motion'

export function IdeaCard({ article, year }) {
  const MotionMuiCard = motion(MuiCard)
  return (
    <Grid item xs={12} sm={6} md={4} component={motion.div} 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
      <MotionMuiCard
        className="dark:bg-[#2A2A2A] dark:border-white"
        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
        sx={{
          height: 270,
          borderRadius: 2,
          border: '1px solid',
          borderColor: '#3c982c', // Hardcoded color from original
          boxShadow: '0px 4px 4px #00000040',
          backdropFilter: 'blur(4px) brightness(100%)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'background-color 0.3s ease',
        }}
      >
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography
            variant="h5"
            className="font-bold mt-6 text-2xl font-mono text-green-600 dark:text-yellow-400 text-center"
            // sx={{color: '#3c982c', textAlign: 'center' }}
          >
            {article.title}
          </Typography>

          <Typography
            variant="body1"
            className="text-zinc-600 text-base dark:text-zinc-400 text-lg font-mono leading-6 text-center"
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
            {article.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center' }}>
          <Link href={`/ideas/${year}/${article.slug}`} passHref legacyBehavior>
             <Button
                component={motion.a}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // sx={{
                //     color: '#3c982c',
                //     textTransform: 'none',
                // }}
                className="font-bold font-mono text-green-600 dark:text-yellow-400 text-lg leading-7 text-center normal-case"
            >
                Know more <ArrowForwardIcon sx={{ width: 20, height: 20 }} />
            </Button>
          </Link>
        </CardActions>
      </MotionMuiCard>
    </Grid>
  )
}
