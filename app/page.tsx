"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { GlobalStyle } from '@/global/GlobalStyle'
import Carousel from '@/components/Carousel'

export default function Home() {
  return (
    <div className={styles.page}>
        <GlobalStyle></GlobalStyle>
        <Carousel></Carousel>
    </div>
  )
}
