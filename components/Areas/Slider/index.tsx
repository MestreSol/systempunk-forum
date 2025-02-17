import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SliderButtons from '@/components/Atomic/SliderButtons'
import './styles.css'
import { GlobalStyle } from '@/global/GlobalStyle'
export interface Slide {
  id: number
  title: string
  tagline: string
  image: string
  buttons: ButtonProps[]
}

interface ButtonProps {
  id: number
  text: string
  link: string
  type: string
}

interface Props {
  data: Slide[]
}

const Slider: React.FC<Props> = ({ data }) => {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <div className="container">
        <div className="timeline">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            navigation
            pagination={{ clickable: true }}
          >
            {data.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="slide">
                  <div className="slideContent">
                    <h2>{slide.title}</h2>
                    <p>{slide.tagline}</p>
                    <SliderButtons buttons={slide.buttons} />
                  </div>
                  <img src={slide.image} alt={slide.title} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default Slider
