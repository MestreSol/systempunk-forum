import React from 'react'
import style from './style.module.css'
import About from '@/components/Atomic/SideBar/About'
import Trends from '@/components/Atomic/SideBar/Trends'

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <About />
      <Trends />
    </div>
  )
}

export default Sidebar
