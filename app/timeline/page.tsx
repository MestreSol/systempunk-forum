'use client'
import React, { useEffect, useState } from 'react'
import { GlobalStyle } from '@/global/GlobalStyle'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'
import './styles.css'

interface Punk {
  id: number
  name: string
  data: string
  image: string
}
export default function TimelinePage() {
  const [punks, setPunks] = useState<Punk[]>([])
  const numberOfSlides = 5
  const panels = Array.from({ length: numberOfSlides }, (_, i) => i + 1)

  useEffect(() => {
    fetch('http://localhost:3001/punks')
      .then((response) => response.json())
      .then((data) => setPunks(data))
  }, [])

  const handleSlideChange = (swiper: any) => {
    swiper.slides.forEach((slide: HTMLElement) => {
      let background = slide.querySelector('.background')
      if (background) {
        background.classList.remove('animation')
      }
    })
    let activeSlide = swiper.slides[swiper.activeIndex]
    if (activeSlide) {
      let background = activeSlide.querySelector('.background')
      if (background) {
        background.classList.add('animation')
      }
    }
  }

  return (
    <Swiper
      direction="vertical"
      effect="fade"
      speed={1000}
      loop={true}
      pagination={{ clickable: true }}
      mousewheel={{
        invert: false,
        forceToAxis: false,
        thresholdDelta: 50,
        sensitivity: 1
      }}
      onSlideChange={handleSlideChange}
      modules={[Navigation, Pagination]}
    >
      <GlobalStyle />

      <SwiperSlide key="1">
        <div className="content" data-content="1">
          <h1>Apunk</h1>
          <p>
            As três [[Supra-Singularidade]], criadas pelo [[Desconhecido]],
            vagaram pelo vazio, cada uma com um fragmento de seu poder. Unidas,
            deram origem à chama da existência, moldando-a e criando os 12
            aspectos, artefatos que moldam a realidade. Espalhados pelo
            universo, esses artefatos convergiram na Terra, dando origem à
            [[Profecia do Fim]]. Na [[Grande Queda]], as [[Divindades]]
            realizaram um sacrifício final, criando os [[Abismos da sombra]]
            para aprisionar a [[Quimera]], encerrando a era com a batalha
            decisiva.
          </p>
        </div>
        <div
          className="background"
          data-item="1"
          style={{ backgroundImage: `url(/punks/Apunk.png)` }}
        ></div>
      </SwiperSlide>
      <SwiperSlide key="2">
        <div className="content" data-content="2">
          <h1>Stonepunk</h1>
          <p>
            As três [[Supra-Singularidade]], criadas pelo [[Desconhecido]],
            vagaram pelo vazio, cada uma com um fragmento de seu poder. Unidas,
            deram origem à chama da existência, moldando-a e criando os 12
            aspectos, artefatos que moldam a realidade. Espalhados pelo
            universo, esses artefatos convergiram na Terra, dando origem à
            [[Profecia do Fim]]. Na [[Grande Queda]], as [[Divindades]]
            realizaram um sacrifício final, criando os [[Abismos da sombra]]
            para aprisionar a [[Quimera]], encerrando a era com a batalha
            decisiva.
          </p>
        </div>
        <div
          className="background"
          data-item="2"
          style={{ backgroundImage: `url(/punks/Stonepunk.png)` }}
        ></div>
      </SwiperSlide>
      {punks.map((punk) => (
        <SwiperSlide key={punk.id}>
          <div className="content" data-content={punk.id}>
            <h1>{punk.name}</h1>
            <p>{punk.data}</p>
            <img src={punk.image} alt={punk.name} />
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
