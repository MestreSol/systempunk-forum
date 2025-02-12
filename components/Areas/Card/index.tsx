import React from 'react'
import './styles.css'
import CardTags from '@/components/Atomic/CardTags'
import CardTitle from '@/components/Atomic/CardTitle'
import CardData from '@/components/Atomic/CardData'
import CardDescription from '@/components/Atomic/CardDescription'
import CardButton from '@/components/Atomic/CardButton'
import CardImage from '@/components/Atomic/CardImage'

const Card = () => {
  return (
    <div className="card">
      <div className="card-left">
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
