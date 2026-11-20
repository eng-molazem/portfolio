const SYMBOLS = ['</>', '{ }', '( )', ';', '01', '#', '=>', '[ ]', '&&', '//', '0x1A']

function seeded(i, salt) {
  const x = Math.sin(i * 999 + salt * 37.1) * 10000
  return x - Math.floor(x)
}

const ITEMS = Array.from({ length: 16 }, (_, i) => {
  const left = seeded(i, 1) * 100
  const size = 16 + seeded(i, 2) * 14
  const duration = 16 + seeded(i, 3) * 14
  const delay = -seeded(i, 4) * duration
  const drift = (seeded(i, 5) - 0.5) * 80
  const symbol = SYMBOLS[i % SYMBOLS.length]
  const gold = i % 2 === 0
  return { left, size, duration, delay, drift, symbol, gold }
})

export default function CodeBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden" aria-hidden="true">
      {ITEMS.map((it, i) => (
        <span
          key={i}
          className={`code-symbol ${it.gold ? 'text-accent-gold-icon' : 'text-accent-violet-icon'}`}
          style={{
            left: `${it.left}%`,
            fontSize: it.size,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
            '--drift': `${it.drift}px`,
          }}
        >
          {it.symbol}
        </span>
      ))}
    </div>
  )
}
