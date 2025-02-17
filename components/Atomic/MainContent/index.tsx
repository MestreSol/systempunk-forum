import React from 'react'
import style from './style.module.css'
import UpdateSection from '@/components/Atomic/UpdateSection'

type Props = {
  update: {
    title: string
    Date: string
    MadeBy: string
    Description: string
    Content: string
  }
}

const MainContent = ({ update }: Props) => {
  return (
    <div className={style.content}>
      <h2 className={style.contentTitle}>{update.title}</h2>
      <h1 className={style.contentSubTitle}>{update.Description}</h1>
      <p className={style.updateTime}>February 11, 2025 by MestreSol</p>
      <UpdateSection content={update.Content} />
    </div>
  )
}

export default MainContent
