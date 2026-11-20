import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaCodeBranch, FaGithub, FaBoxOpen } from 'react-icons/fa'
import ProjectModal from './ProjectModal'
import { githubUsername } from '../data/socials'
import { useLang } from '../context/LanguageContext'

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

function prettify(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function Projects() {
  const { t } = useLang()
  const [repos, setRepos] = useState([])
  const [state, setState] = useState('loading')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API error')
        return res.json()
      })
      .then((data) => {
        const list = Array.isArray(data) ? data.filter((r) => !r.fork) : []
        setRepos(list)
        setState(list.length ? 'ready' : 'empty')
      })
      .catch(() => setState('error'))
  }, [])

  return (
    <section id="projects" className="relative py-28 bg-paper-soft/60">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-xs tracking-widest text-accent-violet uppercase font-semibold">{t('projects.kicker')}</span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-ink">{t('projects.title')}</h2>
        <p className="mt-4 max-w-2xl text-ink-soft text-sm">
          {t('projects.introBefore')}{' '}
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="text-accent-gold hover:underline"
          >
            {t('projects.introLink')}
          </a>{' '}
          {t('projects.introAfter')}
        </p>

        {state === 'loading' && (
          <div className="mt-14 flex items-center gap-3 text-ink-faint text-sm">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
            {t('projects.loading')}
          </div>
        )}

        {state === 'error' && (
          <div className="mt-14 rounded-xl border border-border bg-card p-6 text-sm text-ink-faint shadow-sm">
            {t('projects.errorBefore')}{' '}
            <a href={`https://github.com/${githubUsername}`} className="text-accent-gold hover:underline" target="_blank" rel="noreferrer">
              {t('projects.errorLink')}
            </a>{' '}
            {t('projects.errorAfter')}
          </div>
        )}

        {state === 'ready' && (
          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.map((repo) => (
              <motion.button
                key={repo.id}
                variants={card}
                whileHover={{ y: -6 }}
                onClick={() => setSelected(repo)}
                className="text-start flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm shadow-black/5 hover:border-accent-gold-icon/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 text-accent-gold-icon">
                  <FaBoxOpen />
                  <h3 className="font-display font-semibold text-ink">{prettify(repo.name)}</h3>
                </div>
                <p className="mt-3 flex-1 text-sm text-ink-soft line-clamp-3">
                  {repo.description || t('projects.noDescription')}
                </p>
                <div className="mt-5 flex items-center gap-4 text-xs text-ink-faint">
                  {repo.language && <span className="text-accent-violet">{repo.language}</span>}
                  <span className="flex items-center gap-1">
                    <FaStar className="text-gold-500" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                  <FaGithub className="ms-auto" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal repo={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
