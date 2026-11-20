import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaSun, FaMoon, FaGlobe } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'

export default function Navbar() {
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

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="relative flex w-full max-w-[880px] items-center gap-1 rounded-full border border-border bg-card/85 backdrop-blur-md px-2.5 py-2 shadow-lg shadow-black/10 sm:gap-2">
        <a href="#home" className="group flex shrink-0 items-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-violet-600 font-display text-xs font-bold text-white shadow-sm shadow-black/10 transition-transform group-hover:scale-105">
            MM
          </span>
        </a>

        <ul className="hidden flex-1 items-center justify-center gap-5 text-sm text-ink-soft md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative transition-colors hover:text-accent-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ms-auto flex items-center gap-1.5 md:ms-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:text-accent-gold hover:bg-paper-soft transition-colors"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-ink-soft hover:text-accent-violet hover:bg-paper-soft transition-colors"
          >
            <FaGlobe />
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-gold-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-black/10 hover:shadow-md transition-shadow"
          >
            {t('nav.talk')}
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-lg shadow-black/10 md:hidden"
            >
              {links.map((l) => (
                <li key={l.href} className="border-t border-border first:border-t-0">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-3 text-ink hover:text-accent-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
