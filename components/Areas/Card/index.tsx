import React from 'react'
import CardTags from '@/components/Atomic/Card/CardTags'
import CardTitle from '@/components/Atomic/Card/CardTitle'
import CardData from '@/components/Atomic/Card/CardData'
import CardDescription from '@/components/Atomic/Card/CardDescription'
import CardButton from '@/components/Atomic/Card/CardButton'
import CardImage from '@/components/Atomic/Card/CardImage'
import style from './styles.module.css'
const Card = () => {
  return (
    <div className={style.card}>
      <div className={style.cardContent}>
        <CardTags />
        <CardTitle />
        <CardData />
        <CardDescription />
        <CardButton />
      </div>
      <CardImage />
    </div>
  )
}

export default Card
