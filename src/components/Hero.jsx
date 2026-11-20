import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaDownload } from 'react-icons/fa'
import { socials } from '../data/socials'
import { useLang } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLang()
  const roles = t('hero.roles')

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
      <div className="mx-auto max-w-6xl w-full px-6 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block rounded-full border border-accent-gold/40 bg-card/70 px-4 py-1 text-xs tracking-widest text-accent-gold uppercase mb-6 shadow-sm shadow-black/5">
            {t('hero.badge')}
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-gold-600 via-gold-500 to-violet-600 dark:from-gold-300 dark:via-gold-400 dark:to-violet-300 bg-clip-text text-transparent">
            {t('hero.name')}
          </h1>

          <div className="mt-4 h-8 overflow-hidden">
            <motion.div
              animate={{ y: [0, -32, -64, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.33, 0.66, 1] }}
            >
              {Array.isArray(roles) &&
                roles.map((r) => (
                  <p key={r} className="h-8 flex items-center text-lg sm:text-xl text-accent-violet font-medium">
                    {r}
                  </p>
                ))}
            </motion.div>
          </div>

          <p className="mt-6 max-w-xl text-ink-soft leading-relaxed">{t('hero.tagline')}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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

          <div className="mt-8 flex items-center gap-5 text-xl text-ink-faint">
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
          <motion.div
            animate={{ y: [0, -14, 0], rotateY: [0, 4, 0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-64 sm:w-80 aspect-[4/5] overflow-hidden rounded-[2rem] bg-card"
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
