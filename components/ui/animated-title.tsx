import * as React from "react";

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
];

function getRandomFont(excludeFont) {
  let font;
  do {
    font = FONTS[Math.floor(Math.random() * FONTS.length)];
  } while (font === excludeFont);
  return font;
}

export default function AnimatedTitle({ text, interval = 2000 }) {
  const [fonts, setFonts] = React.useState(() =>
    Array.from({ length: text.length }, () => FONTS[Math.floor(Math.random() * FONTS.length)])
  );

  React.useEffect(() => {
    const id = setInterval(() => {
      setFonts((prev) =>
        prev.map((font, i) => (Math.random() < 0.5 ? getRandomFont(font) : font))
      );
    }, interval);
    return () => clearInterval(id);
  }, [interval, text.length]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {text.split("").map((char, i) => (
        <span key={i} style={{ fontFamily: fonts[i], transition: "font-family 0.3s" }}>{char}</span>
      ))}
    </span>
  );
}
