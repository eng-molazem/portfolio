import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaSun, FaMoon, FaGlobe } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle: toggleTheme } = useTheme()
  const { lang, toggle: toggleLang, t } = useLang()

  const links = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#education', label: t('nav.education') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ]

  const brand = t('hero.name').split(' ')[0]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/85 backdrop-blur-md border-b border-border shadow-sm shadow-black/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-violet-600 text-sm font-bold text-white font-display shadow-sm shadow-black/10 transition-transform group-hover:scale-105">
            MM
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-ink hidden sm:inline">
            {brand}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-ink-soft">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative transition-colors hover:text-accent-gold group">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-gold-500 to-violet-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold text-ink-soft hover:text-accent-violet hover:border-accent-violet/40 transition-colors"
          >
            <FaGlobe />
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center rounded-full border border-accent-gold/40 px-4 py-2 text-sm text-accent-gold hover:bg-gold-500/10 transition-colors"
          >
            {t('nav.talk')}
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden text-ink text-xl"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-paper/95 backdrop-blur-md border-b border-border"
          >
            {links.map((l) => (
              <li key={l.href} className="border-t border-border">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-4 text-ink hover:text-accent-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
