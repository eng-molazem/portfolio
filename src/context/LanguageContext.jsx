import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const toggle = () => setLang((l) => (l === 'en' ? 'ar' : 'en'))

  const t = useMemo(() => {
    const dict = translations[lang] || translations.en
    return (path) => {
      const value = getNested(dict, path)
      return value !== undefined ? value : path
    }
  }, [lang])

  return <LanguageContext.Provider value={{ lang, toggle, t }}>{children}</LanguageContext.Provider>
}

export function useLang() {
  return useContext(LanguageContext)
}
