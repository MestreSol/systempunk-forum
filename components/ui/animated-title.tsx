import * as React from 'react'

const FONTS = [
  "'Arial', sans-serif",
  "'Courier New', monospace",
  "'Times New Roman', serif",
  "'Comic Sans MS', cursive",
  "'Georgia', serif",
  "'Impact', fantasy",
  "'Lucida Console', monospace",
  "'Verdana', sans-serif",
  "'Trebuchet MS', sans-serif",
  "'Brush Script MT', cursive"
]

function getRandomFont(excludeFont?: string): string {
  let font: string
  do {
    font = FONTS[Math.floor(Math.random() * FONTS.length)]
  } while (font === excludeFont)
  return font
}

interface AnimatedTitleProps {
  text: string
  interval?: number
}

export default function AnimatedTitle({
  text,
  interval = 2000
}: AnimatedTitleProps) {
  const [fonts, setFonts] = React.useState<string[] | null>(null)

  // Only animate on client to avoid hydration mismatch
  React.useEffect(() => {
    setFonts(
      Array.from(
        { length: text.length },
        () => FONTS[Math.floor(Math.random() * FONTS.length)]
      )
    )
  }, [text.length])

  React.useEffect(() => {
    if (!fonts) return
    const id = setInterval(() => {
      setFonts((prev) =>
        prev
          ? prev.map((font) =>
              Math.random() < 0.5 ? getRandomFont(font) : font
            )
          : null
      )
    }, interval)
    return () => clearInterval(id)
  }, [interval, text.length, fonts])

  // Render plain text on SSR, animated on client
  if (!fonts) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        {text}
      </span>
    )
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            fontFamily: fonts[i] || FONTS[0],
            transition: 'font-family 0.3s'
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
