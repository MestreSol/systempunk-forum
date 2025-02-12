import React from 'react'
import style from './style.module.css'
import MainContent from '@/components/Areas/UpdateArea'
import Sidebar from '@/components/Atomic/SideBar'
const MainHub = () => {
  return (
    <div className={style.mainHub}>
      <MainContent />
      <Sidebar />
    </div>
  )
}

export default MainHub
