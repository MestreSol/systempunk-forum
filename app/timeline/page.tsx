"use client"
import React from 'react'
import { GlobalStyle } from "@/global/GlobalStyle"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Pagination } from "swiper/modules"
import "./styles.css"

export default function TimelinePage() {
  const numberOfSlides = 5
  const panels = Array.from({ length: numberOfSlides }, (_, i) => i + 1)

  const handleSlideChange = (swiper: any) => {
    swiper.slides.forEach((slide: HTMLElement) => {
      let background = slide.querySelector(".background")
      if (background) {
        background.classList.remove("animation")
      }
    })
    let activeSlide = swiper.slides[swiper.activeIndex]
    if (activeSlide) {
      let background = activeSlide.querySelector(".background")
      if (background) {
        background.classList.add("animation")
      }
    }
  }

  return (
    <div className='timeline-page'>
      <GlobalStyle />
        <Swiper
          direction="vertical"
          effect="fade"
          speed={1000}
          loop={true}
          pagination={{ clickable: true }}
          mousewheel={{ invert: false, forceToAxis: false, thresholdDelta: 50, sensitivity: 1 }}
          onSlideChange={handleSlideChange}
          modules={[Navigation, Pagination]}
        >
          <SwiperSlide>
            <div className="content" data-content="five">
              <h1>New York, USA</h1>
              <p>
                Experience New York City, where excitement and adventure await at
                every corner. See the Statue of Liberty, enjoy a Broadway show,
                and taste food from around the world. This tour is ideal for those
                who want to feel the energy of a big city.
              </p>
            </div>
          <div className="background" data-item="five"></div>
          </SwiperSlide>
        </Swiper>
    </div>
  )
}
