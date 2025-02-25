'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'
import './styles.css'
import Link from 'next/link'

interface Punk {
  id: number
  name: string
  data: string
  image: string
}

export default function TimelinePage() {
  const [punks, setPunks] = useState<Punk[]>([])
  const [menuActive, setMenuActive] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/punks')
      .then((response) => response.json())
      .then((data) => setPunks(data))
      .catch((error) => console.error('Fetch failed:', error))
  }, [])

  const handleSlideChange = (swiper: any) => {
    swiper.slides.forEach((slide: HTMLElement) => {
      const background = slide.querySelector('.background')
      if (background) {
        background.classList.remove('animation')
      }
    })
    const activeSlide = swiper.slides[swiper.activeIndex]
    if (activeSlide) {
      const background = activeSlide.querySelector('.background')
      if (background) {
        background.classList.add('animation')
      }
    }
  }

  const toggleMenu = () => {
    setMenuActive(!menuActive)
  }

  return (
    <>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <div className={`side-menu ${menuActive ? 'active' : ''}`}>
        <div className="close-btn" onClick={toggleMenu}>
          &times;
        </div>
        <ul>
          <li className="menu-item">
            <Link href="/">Home</Link>
          </li>
          <li className="menu-item">
            <Link href="/universe">Universe</Link>
          </li>
          <li className="menu-item">
            <Link href="/timeline">Timeline</Link>
          </li>
          <li className="menu-item">
            <Link href="/projects">Projects</Link>
          </li>
          <li className="menu-item">
            <Link href="/contribute">Contribute</Link>
          </li>
          <li className="menu-item">
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
      <Swiper
        direction="vertical"
        speed={1000}
        loop={true}
        pagination={{ clickable: true }}
        mousewheel={{ forceToAxis: true }}
        onSlideChange={handleSlideChange}
        modules={[Navigation, Pagination, Mousewheel]}
      >
        <div className="menu"></div>
        {punks.map((punk) => (
          <SwiperSlide key={punk.id}>
            <div className="content" data-content={punk.id}>
              <h1>{punk.name}</h1>
              <p>{punk.data}</p>
              <Link href={`/universo/eras/${punk.name}`} className="readMore">
                Read More
              </Link>
            </div>
            <div
              className="background"
              data-item={punk.id}
              style={{ backgroundImage: `url(${punk.image})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
