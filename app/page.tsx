"use client"
import styles from './page.module.css'
import { GlobalStyle } from '@/global/GlobalStyle'
import Carousel from '@/components/Carousel'
import Card from '@/components/Card'
import "./globals.css"

export default function Home() {
  return (
    <div className={styles.page}>
      <GlobalStyle />
      <Carousel />
      <div className={styles.cards}>
        <Card />
        <Card />
      </div>
    </div>
  )
}
