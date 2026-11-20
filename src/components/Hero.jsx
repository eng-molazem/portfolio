import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaDownload } from 'react-icons/fa'
import { socials } from '../data/socials'
import { useLang } from '../context/LanguageContext'
import { useTypewriter } from '../hooks/useTypewriter'
import DotGrid from './DotGrid'

export default function Hero() {
  const { t } = useLang()
  const roles = t('hero.roles')
  const name = t('hero.name')
  const roleList = Array.isArray(roles) ? roles : []
  const longestRole = roleList.reduce((a, b) => (b.length > a.length ? b : a), '')

  const typedName = useTypewriter([name], { typingSpeed: 90, loop: false })
  const nameDone = typedName.length === name.length
  const typedRole = useTypewriter(roleList, {
    typingSpeed: 65,
    deletingSpeed: 35,
    pause: 1600,
  })

  return (
    <section id="home" className="relative flex items-center overflow-hidden pt-24 pb-10 md:min-h-screen">
      <div className="mx-auto max-w-6xl w-full px-6 grid md:grid-cols-[1.25fr_0.75fr] gap-10 md:gap-8 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center md:items-start md:text-start"
        >
          <span className="inline-block rounded-full border border-accent-gold/40 bg-card/70 px-4 py-1 text-xs tracking-widest text-accent-gold uppercase mb-6 shadow-sm shadow-black/5">
            {t('hero.badge')}
          </span>

          <h1 className="relative w-full overflow-hidden font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-ink">
            <span className="invisible" aria-hidden="true">
              {t('hero.greeting')} {name}
            </span>
            <span className="absolute inset-0 md:start-0">
              {t('hero.greeting')}{' '}
              <span className="bg-gradient-to-r from-gold-600 via-gold-500 to-violet-600 dark:from-gold-300 dark:via-gold-400 dark:to-violet-300 bg-clip-text text-transparent">
                {typedName}
                <span className="typewriter-cursor text-accent-violet-icon">|</span>
              </span>
            </span>
          </h1>

          <div className="relative mt-3 w-full overflow-hidden text-lg sm:text-xl font-medium">
            <span className="invisible" aria-hidden="true">{longestRole}</span>
            <span className="absolute inset-0 md:start-0 text-accent-violet">
              {nameDone ? typedRole : ' '}
              {nameDone && <span className="typewriter-cursor">|</span>}
            </span>
          </div>

          <p className="mt-6 max-w-xl text-ink-soft leading-relaxed">{t('hero.tagline')}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-gold-600 to-gold-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 transition-shadow"
            >
              {t('hero.viewProjects')}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-ink/15 bg-card/70 px-6 py-3 text-sm font-semibold text-ink hover:border-accent-violet/50 hover:text-accent-violet transition-colors"
            >
              {t('hero.getInTouch')}
            </a>
            <a
              href="/cv/Mohammad-Molazem-CV.pdf"
              download
              className="flex items-center gap-2 rounded-full border border-accent-violet-icon/40 bg-card/70 px-6 py-3 text-sm font-semibold text-accent-violet hover:bg-violet-500/10 transition-colors"
            >
              <FaDownload /> {t('hero.downloadCV')}
            </a>
          </div>

          <div className="mt-5 flex items-center justify-center md:justify-start gap-5 text-xl text-ink-faint">
            <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-accent-gold transition-colors" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-violet transition-colors" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={`mailto:${socials.email}`} className="hover:text-accent-gold transition-colors" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto"
          style={{ perspective: '1200px' }}
        >
          <DotGrid className="-inset-16 opacity-70" />

          <motion.div
            animate={{ y: [0, -14, 0], rotateY: [0, 4, 0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-56 sm:w-72 lg:w-80 aspect-[4/5] overflow-hidden rounded-[2rem] bg-card"
            style={{
              boxShadow: '0 0 0 1px rgba(205,167,102,0.4), 0 25px 60px -15px rgba(124,58,237,0.25), 0 15px 35px -10px rgba(180,135,63,0.25)',
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src="/images/profile.jpg"
              alt="Mohammad Molazem"
              className="h-full w-full object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/40" />
          </motion.div>

          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold-300/30 via-transparent to-violet-300/30 blur-2xl" />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-faint text-xl"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <FaArrowDown />
      </motion.a>
    </section>
  )
}
