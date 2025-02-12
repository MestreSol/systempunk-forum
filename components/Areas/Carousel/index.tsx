import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import style from './style.module.css'

type Props = {
  slides: {
    title: string
    description: string
    image: string
  }[]
}

export default function Carousel({ slides }: Props) {
  useEffect(() => {
    const slider = document.querySelector('#slider')

    function activate(e: Event) {
      const items = document.querySelectorAll('#item')
      if (!slider) return
      if ((e.target as Element).matches('#next')) {
        slider.appendChild(items[0])
      }
      if ((e.target as Element).matches('#prev')) {
        slider.insertBefore(items[items.length - 1], items[0])
      }
    }

    document.addEventListener('click', activate, false)
  }, [])

  return (
    <main className={style.container}>
      <ul className={style.slider} id={'slider'}>
        {slides.map((slide, index) => (
          <li
            key={index}
            className={style.item}
            style={{
              backgroundImage: `url(${slide.image})`
            }}
            id={'item'}
          >
            <div className={style.content}>
              <h2 className={style.title}>{slide.title}</h2>
              <p className={style.description}> {slide.description} </p>
              <a href={'article?id=1'}>Read More</a>
            </div>
          </li>
        ))}
      </ul>
      <nav className={style.nav}>
        <div className={style.btn} data-name="arrow-back-outline" id={'prev'}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div
          className={style.btn}
          data-name="arrow-forward-outline"
          id={'next'}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </nav>
      <script
        type="module"
        async
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        async
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </main>
  )
}
