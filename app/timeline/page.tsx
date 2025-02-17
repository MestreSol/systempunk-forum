'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'
import './styles.css'

interface Punk {
  id: number
  name: string
  data: string
  image: string
}

export default function TimelinePage() {
  const [punks, setPunks] = useState<Punk[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/punks')
      .then((response) => response.json())
      .then((data) => setPunks(data))
      .catch((error) => console.error('Fetch failed:', error))
  }, [])

  const handleSlideChange = (swiper: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  return (
    <Swiper
      direction="vertical"
      speed={1000}
      loop={true}
      pagination={{ clickable: true }}
      mousewheel={{ forceToAxis: true }}
      onSlideChange={handleSlideChange}
      modules={[Navigation, Pagination, Mousewheel]}
    >
      {punks.map((punk) => (
        <SwiperSlide key={punk.id}>
          <div className="content" data-content={punk.id}>
            <h1>{punk.name}</h1>
            <p>{punk.data}</p>
          </div>
          <div
            className="background"
            data-item={punk.id}
            style={{ backgroundImage: `url(${punk.image})` }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
