import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { socials } from '../data/socials'
import { useLang } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLang()

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-widest text-accent-gold uppercase font-semibold">{t('contact.kicker')}</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-ink">{t('contact.title')}</h2>
          <p className="mt-5 text-ink-soft">{t('contact.body')}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${socials.email}`}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gold-500/25"
            >
              <FaEnvelope /> {t('contact.email')}
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-ink/15 bg-card px-6 py-3 text-sm font-semibold text-ink hover:border-accent-violet-icon/50 hover:text-accent-violet transition-colors"
            >
              <FaLinkedin /> {t('contact.linkedin')}
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-ink/15 bg-card px-6 py-3 text-sm font-semibold text-ink hover:border-accent-gold-icon/50 hover:text-accent-gold transition-colors"
            >
              <FaGithub /> {t('contact.github')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
