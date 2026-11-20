import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { socials } from '../data/socials'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="relative border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-faint">
        <p>© {new Date().getFullYear()} {t('hero.name')}. {t('footer.built')}</p>
        <div className="flex items-center gap-5 text-base">
          <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-accent-gold transition-colors">
            <FaGithub />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-violet transition-colors">
            <FaLinkedin />
          </a>
          <a href={`mailto:${socials.email}`} className="hover:text-accent-gold transition-colors">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  )
}
