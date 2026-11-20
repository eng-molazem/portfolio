import { motion } from 'framer-motion'
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiDjango, SiPython,
  SiJavascript, SiTypescript, SiTailwindcss, SiBootstrap, SiSocketdotio,
  SiGit, SiJquery, SiJest, SiVite,
} from 'react-icons/si'
import { FaBrain, FaEye, FaRobot, FaPuzzlePiece, FaClock, FaLanguage, FaUsers } from 'react-icons/fa'
import { useLang } from '../context/LanguageContext'

const technicalIcons = [
  { icon: SiReact, label: 'React' },
  { icon: SiNodedotjs, label: 'Node.js' },
  { icon: SiExpress, label: 'Express' },
  { icon: SiMongodb, label: 'MongoDB' },
  { icon: SiDjango, label: 'Django' },
  { icon: SiPython, label: 'Python' },
  { icon: SiJavascript, label: 'JavaScript' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: SiTailwindcss, label: 'Tailwind CSS' },
  { icon: SiBootstrap, label: 'Bootstrap' },
  { icon: SiSocketdotio, label: 'Socket.io' },
  { icon: SiGit, label: 'Git' },
  { icon: SiJquery, label: 'jQuery' },
  { icon: SiJest, label: 'Testing (Jest)' },
  { icon: SiVite, label: 'Vite' },
  { icon: FaBrain, label: 'Deep Learning' },
  { icon: FaEye, label: 'Computer Vision' },
  { icon: FaRobot, label: 'Machine Learning' },
]

const softIcons = [
  { icon: FaPuzzlePiece, label: 'Problem Solving' },
  { icon: FaClock, label: 'Time Management' },
  { icon: FaUsers, label: 'Teamwork' },
  { icon: FaLanguage, label: 'English' },
]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1 },
}

function SkillGrid({ items, labels }) {
  return (
    <motion.div
      variants={grid}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
    >
      {items.map(({ icon: Icon, label }) => (
        <motion.div
          key={label}
          variants={item}
          whileHover={{ y: -5, scale: 1.05 }}
          className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-5 px-3 text-center shadow-sm shadow-black/5 hover:border-accent-violet-icon/40 hover:shadow-md transition-all"
        >
          <Icon className="text-2xl text-ink-soft group-hover:text-accent-gold-icon transition-colors" />
          <span className="text-xs text-ink-faint group-hover:text-ink transition-colors">
            {(labels && labels[label]) || label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLang()
  const labels = t('skills.labels')

  return (
    <section id="skills" className="relative py-28 bg-paper-soft/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center lg:text-start">
          <span className="text-xs tracking-widest text-accent-violet uppercase font-semibold">{t('skills.kicker')}</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-ink">{t('skills.title')}</h2>
        </div>

        <div className="mt-12 space-y-10">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-ink-faint uppercase tracking-wide text-center lg:text-start">{t('skills.technical')}</h3>
            <SkillGrid items={technicalIcons} labels={labels} />
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-ink-faint uppercase tracking-wide text-center lg:text-start">{t('skills.soft')}</h3>
            <SkillGrid items={softIcons} labels={labels} />
          </div>
        </div>
      </div>
    </section>
  )
}
