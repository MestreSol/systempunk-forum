"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { GlobalStyle } from '@/global/GlobalStyle'

export default function Home() {
  return (
    <div className={styles.page}>
        <GlobalStyle></GlobalStyle>

    </div>
  )
}
