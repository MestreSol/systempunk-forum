import React from 'react'
import style from './style.module.css'
import UpdateSection from '@/components/Atomic/UpdateSection'

const UpdateArea = () => {
  return (
    <div className={style.content}>
      <h2 className={style.contentTitle}>Update Area</h2>
      <h1 className={style.contentSubTitle}>
        📢 Systempunk Forum - Atualização Inicial
      </h1>
      <p className={style.updateTime}>February 11, 2025 by MestreSol</p>
      <UpdateSection />
    </div>
  )
}

export default UpdateArea
