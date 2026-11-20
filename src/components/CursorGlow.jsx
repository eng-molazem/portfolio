import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 10
const EASE = 0.22

export default function CursorGlow() {
  const containerRef = useRef(null)
  const dotsRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const points = Array.from({ length: TRAIL_LENGTH }, () => ({ x: mouse.x, y: mouse.y }))

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    let raf
    const tick = () => {
      points[0].x += (mouse.x - points[0].x) * EASE
      points[0].y += (mouse.y - points[0].y) * EASE
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * EASE
        points[i].y += (points[i - 1].y - points[i].y) * EASE
      }
      points.forEach((p, i) => {
        const el = dotsRef.current[i]
        if (el) el.style.transform = `translate(${p.x}px, ${p.y}px)`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="cursor-echo"
          style={{
            '--size': `${120 - i * 9}px`,
            '--fade': 1 - i / TRAIL_LENGTH,
          }}
        />
      ))}
    </div>
  )
}
