import { motion } from 'framer-motion'
import { FaGraduationCap, FaLaptopCode, FaBriefcase } from 'react-icons/fa'
import { useLang } from '../context/LanguageContext'

const icons = [FaGraduationCap, FaLaptopCode, FaBriefcase]

export default function Education() {
  const { t } = useLang()
  const items = t('education.items')

  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center lg:text-start">
          <span className="text-xs tracking-widest text-accent-gold uppercase font-semibold">{t('education.kicker')}</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-ink">{t('education.title')}</h2>
        </div>

        <div className="mt-14 relative border-s border-border ps-8 space-y-12">
          {Array.isArray(items) &&
            items.map(({ title, place, period, desc }, i) => {
              const Icon = icons[i] || FaBriefcase
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <span className="absolute -start-[2.65rem] flex h-10 w-10 items-center justify-center rounded-full bg-card border border-accent-gold-icon/50 text-accent-gold-icon shadow-sm shadow-black/5">
                    <Icon />
                  </span>
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm shadow-black/5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                      <span className="text-xs text-accent-violet">{period}</span>
                    </div>
                    <p className="mt-1 text-sm text-accent-gold">{place}</p>
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
