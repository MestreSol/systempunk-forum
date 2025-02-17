import React from 'react'
import style from './style.module.css'
import MainContent from '@/components/Areas/UpdateArea'
import Sidebar from '@/components/Atomic/SideBar'
type Props = {
  update: {
    title: string
    Date: string
    MadeBy: string
    Description: string
    Content: string
  }
  trends: {
    title: string
    Date: string
    MadeBy: string
    Description: string
    image: string
    link: string
  }[]
}
const MainHub = (props: Props) => {
  return (
    <div className={style.mainHub}>
      <MainContent update={props.update} />
      <Sidebar trends={props.trends} />
    </div>
  )
}

export default MainHub
