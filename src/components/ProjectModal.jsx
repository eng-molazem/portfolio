import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FaTimes, FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa'
import { githubUsername } from '../data/socials'
import { useLang } from '../context/LanguageContext'

function decodeBase64Utf8(base64) {
  const binary = atob(base64.replace(/\n/g, ''))
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder('utf-8').decode(bytes)
}

export default function ProjectModal({ repo, onClose }) {
  const { t } = useLang()
  const [readme, setReadme] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setReadme(null)

    fetch(`https://api.github.com/repos/${githubUsername}/${repo.name}/readme`)
      .then((res) => {
        if (!res.ok) throw new Error('No README found')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setReadme(decodeBase64Utf8(data.content))
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('empty')
      })

    return () => {
      cancelled = true
    }
  }, [repo])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-overlay backdrop-blur-sm px-4 py-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-2xl border border-border bg-card shadow-2xl shadow-black/20"
      >
        <button
          onClick={onClose}
          className="absolute end-4 top-4 text-ink-faint hover:text-accent-gold text-lg"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="p-7 border-b border-border">
          <h3 className="font-display text-2xl font-bold text-ink pe-8">
            {repo.name.replace(/[-_]/g, ' ')}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-ink-faint">
            {repo.language && (
              <span className="rounded-full border border-border px-3 py-1 text-accent-gold">
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FaStar className="text-gold-500" /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <FaCodeBranch className="text-accent-violet-icon" /> {repo.forks_count}
            </span>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="ms-auto flex items-center gap-1.5 text-accent-violet hover:underline"
            >
              <FaGithub /> {t('projects.viewOnGithub')} <FaExternalLinkAlt className="text-[10px]" />
            </a>
          </div>
        </div>

        <div className="p-7 max-h-[60vh] overflow-y-auto">
          {status === 'loading' && (
            <div className="flex items-center gap-3 text-ink-faint text-sm">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
              {t('projects.loadingReadme')}
            </div>
          )}

          {status === 'empty' && (
            <p className="text-sm text-ink-faint">{repo.description || t('projects.noReadme')}</p>
          )}

          {status === 'ready' && readme && (
            <article
              dir="ltr"
              className="prose prose-sm sm:prose-base max-w-none text-start prose-headings:font-display prose-headings:text-ink prose-p:text-ink-soft prose-li:text-ink-soft prose-a:text-accent-gold prose-strong:text-ink prose-code:text-accent-violet"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
            </article>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
