import { useEffect, useState } from 'react'

export function useTypewriter(words, { typingSpeed = 80, deletingSpeed = 40, pause = 1600, loop = true } = {}) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!words.length || done) return
    const current = words[index % words.length]

    if (!deleting && subIndex === current.length) {
      if (!loop && index === words.length - 1) {
        setDone(true)
        return
      }
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((i) => i + 1)
      return
    }

    const t = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    )
    return () => clearTimeout(t)
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pause, loop, done])

  const current = words.length ? words[index % words.length] : ''
  return current.substring(0, subIndex)
}
