import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import remarkGfm from 'remark-gfm-4';

import { Container } from '@/components/shared/Container';
import { Prose } from '@/components/shared/Prose';
import projects from '@/helper/projects';

export async function generateStaticParams() {
  return projects
    .filter((p) => p.slug)
    .map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const product = projects.find((p) => p.slug === params.slug);
  if (!product) {
    return {
      title: 'Project Not Found',
    };
  }
  return {
    title: `${product.name} - AOSSIE`,
    description: product.description,
  };
}


export default function ProductPage({ params }) {
  // Unwrapping params for Next.js 15+ if needed, but in 14 it's usually direct.
  // We'll treat it as synchronous access since it's an object in generateStaticParams context usually
  const product = projects.find((p) => p.slug === params.slug);

  if (!product) {
    return (
        <Container className="mt-32">
            <h1>Project not found</h1>
        </Container>
    )
  }

  return (
    <Container className="mt-16 sm:mt-32 mb-20">
        {/* Header Section */}
        <div className='flex flex-col md:flex-row gap-8 items-center mb-16'>
             <div className="relative w-40 h-40 flex-shrink-0">
                <Image
                src={product.logo}
                alt={product.name}
                fill
                className="object-contain"
                unoptimized
                />
            </div>
            <div>
                 <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl font-mono mb-4">
                    {product.name}
                </h1>
                <p className='text-lg text-zinc-600 dark:text-zinc-400 font-mono mb-6 max-w-2xl'>
                    {product.description}
                </p>
                <div className="flex gap-4 flex-wrap">
                    {product.downloadLink && (
                        <a
                        href={product.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#00843D] text-white font-mono font-semibold hover:bg-[#006e32] transition-colors"
                        >
                        <FontAwesomeIcon icon={faDownload} />
                        Download
                        </a>
                    )}
                     {product.githubLink && (
                        <a
                        href={product.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-zinc-800 dark:bg-zinc-700 text-white font-mono font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
                        >
                        <FontAwesomeIcon icon={faGithub} />
                        Source Code
                        </a>
                    )}
                     {product.discordLink && (
                        <a
                        href={product.discordLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#5865F2] text-white font-mono font-semibold hover:bg-[#4752c4] transition-colors"
                        >
                        <FontAwesomeIcon icon={faDiscord} />
                        Join Community
                        </a>
                    )}
                </div>
            </div>
        </div>

        {/* Video Section */}
        {product.videoUrl && (
             <div className="mb-16">
                 <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl font-mono mb-8 border-b border-zinc-200 dark:border-zinc-700 pb-4">
                    Video Tutorial
                </h2>
                 <div className="rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700">
                    <div className="relative pt-[56.25%] bg-black">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={product.videoUrl}
                            title="Product Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                 </div>
             </div>
        )}

        {/* Setup Guide */}
        <div className="mb-16">
             <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl font-mono mb-8 border-b border-zinc-200 dark:border-zinc-700 pb-4">
                Installation & Setup
            </h2>
            <Prose className="font-mono">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />
                    }}
                >
                    {product.setupGuide}
                </ReactMarkdown>
            </Prose>
        </div>
         
    </Container>
  );
}
