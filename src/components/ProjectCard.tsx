import { motion } from 'framer-motion'

type Props = {
  title: string
  description: string
  tags: string[]
  imageSrc: string
  href: string
}

export default function ProjectCard({ title, description, tags, imageSrc, href }: Props) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-xl bg-zinc-900/60 hover:bg-zinc-900/80 border border-zinc-800 overflow-hidden shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      whileHover={{ scale: 1.01, rotate: -0.2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ willChange: 'transform' }}
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt=""
          loading="lazy"
          width="800"
          height="450"
          className="h-full w-full object-cover transition-opacity duration-300 opacity-90 group-hover:opacity-100"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
        <p className="mt-1 text-sm text-zinc-400">{description}</p>
        <ul className="mt-3 flex flex-wrap gap-2 text-[11px] text-zinc-300">
          {tags.map((t) => (
            <li key={t} className="px-2 py-1 rounded bg-zinc-800/80 border border-zinc-700">{t}</li>
          ))}
        </ul>
      </div>
    </motion.a>
  )
}

