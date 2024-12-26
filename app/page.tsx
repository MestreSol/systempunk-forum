'use client'
import styles from './page.module.css'
import { GlobalStyle } from '@/global/GlobalStyle'
import Carousel from '@/components/Carousel'
import Card from '@/components/Card'
import './globals.css'
import MainHub from '@/containers/MainHub'
import Footer from '@/containers/Footer'

export default function Home() {
  return (
    <div className={styles.page}>
      <GlobalStyle />
      <Carousel />
      <div className={styles.cards}>
        <Card />
        <Card />
      </div>
      <MainHub></MainHub>
      <Footer></Footer>
    </div>
  )
}
