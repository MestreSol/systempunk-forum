import React from 'react'
import style from './style.module.css'
import About from '@/components/Atomic/SideBar/About'
import Trends from '@/components/Atomic/SideBar/Trends'

type Props = {
  trends: {
    title: string
    Date: string
    MadeBy: string
    Description: string
    image: string
    link: string
  }[]
}
const Sidebar = ({ trends }: Props) => {
  return (
    <div className={style.sidebar}>
      <About />
      <Trends trends={trends} />
    </div>
  )
}

export default Sidebar
