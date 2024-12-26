'use client'
import styles from './page.module.css'
import { GlobalStyle } from '@/global/GlobalStyle'
import Carousel from '@/components/Carousel'
import './globals.css'
import MainHub from '@/containers/MainHub'
import Footer from '@/containers/Footer'
import MoustRecent from '@/containers/MoustRecent'

export default function Home() {
  return (
    <div className={styles.page}>
      <GlobalStyle />
      <Carousel />
      <MoustRecent></MoustRecent>
      <MainHub></MainHub>
      <Footer></Footer>
    </div>
  )
}
