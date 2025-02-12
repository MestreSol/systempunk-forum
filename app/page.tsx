'use client'
import styles from './page.module.css'
import { GlobalStyle } from '@/global/GlobalStyle'
import Carousel from '@/components/Areas/Carousel'
import './globals.css'
import MainHub from '@/components/Areas/MainHub'
import Footer from '@/components/Areas/Footer'
import MostRecent from '@/components/Areas/MostRecent'
function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
      <h1>Loading...</h1>
    </div>
  )
}

export default function Home() {
  return (
    <div className={styles.page}>
      <GlobalStyle />
      <Carousel />
      <MostRecent></MostRecent>
      <MainHub></MainHub>
      <Footer></Footer>
    </div>
  )
}
