import { motion } from 'framer-motion'
import { FaCode, FaFlask, FaBrain, FaGlobeAmericas } from 'react-icons/fa'
import { useLang } from '../context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export default function About() {
  const { t } = useLang()

  const stats = [
    { icon: FaCode, value: '6+', label: t('about.stats.projects') },
    { icon: FaFlask, value: '220+', label: t('about.stats.tests') },
    { icon: FaBrain, value: '43', label: t('about.stats.algorithms') },
    { icon: FaGlobeAmericas, value: 'Remote', label: t('about.stats.remote') },
  ]

  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          className="text-center lg:text-start"
        >
          <span className="text-xs tracking-widest text-accent-gold uppercase font-semibold">{t('about.kicker')}</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-ink">{t('about.title')}</h2>
          <p className="mt-6 max-w-3xl mx-auto lg:mx-0 text-ink-soft leading-relaxed">{t('about.body')}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm shadow-black/5 hover:border-accent-gold-icon/40 hover:shadow-md transition-all"
            >
              <Icon className="mx-auto text-2xl text-accent-gold-icon" />
              <div className="mt-3 font-display text-2xl font-bold text-ink">{value}</div>
              <div className="mt-1 text-xs text-ink-faint">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
