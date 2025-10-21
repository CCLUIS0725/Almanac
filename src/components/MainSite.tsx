import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import React, { forwardRef } from 'react'

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const projects = [
  {
    title: 'Interactive Styleguide',
    description: 'A motion-first design system with live tokens.',
    tags: ['React', 'Framer Motion', 'Design Tokens'],
    imageSrc: 'https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=1600&auto=format&fit=crop',
    href: 'https://example.com',
  },
  {
    title: '3D Configurator',
    description: 'Product customizer with silky interactions.',
    tags: ['Three.js', 'UX', 'Optimization'],
    imageSrc: 'https://images.unsplash.com/photo-1526481280698-8fcc13fd1bfb?q=80&w=1600&auto=format&fit=crop',
    href: 'https://example.com',
  },
  {
    title: 'Case Study: Almanac',
    description: 'This portfolio’s micro-interactions and flow.',
    tags: ['Case Study', 'Accessibility', 'Performance'],
    imageSrc: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop',
    href: '#',
  },
]

type MainSiteProps = React.HTMLAttributes<HTMLDivElement>

const MainSite = forwardRef<HTMLDivElement, MainSiteProps>(function MainSite(props, ref) {
  return (
    <div ref={ref} className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-gradient-to-b from-bg to-bg-subtle">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Intro */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="min-h-[50vh] flex flex-col justify-center"
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-zinc-100">Luis Cabrera</h1>
          <p className="mt-3 text-zinc-400 text-lg">UX/UI Designer • Frontend Engineer</p>
          <p className="mt-4 max-w-prose text-zinc-400">
            I design delightful, performant interfaces and ship them with a strong focus on motion and accessibility.
          </p>
        </motion.section>

        {/* Projects */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold text-zinc-100">Projects</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-16 mb-24"
        >
          <h2 className="text-2xl font-semibold text-zinc-100">Contact</h2>
          <p className="mt-3 text-zinc-400">Let’s collaborate. Reach out via:</p>
          <ul className="mt-4 space-y-2 text-zinc-300">
            <li><a className="hover:underline" href="mailto:hello@example.com">hello@example.com</a></li>
            <li><a className="hover:underline" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a className="hover:underline" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </motion.section>
      </div>
    </div>
  )
})

export default MainSite

