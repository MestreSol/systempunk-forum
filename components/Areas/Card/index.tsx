import React from 'react'
import CardTags from '@/components/Atomic/Card/CardTags'
import CardTitle from '@/components/Atomic/Card/CardTitle'
import CardData from '@/components/Atomic/Card/CardData'
import CardDescription from '@/components/Atomic/Card/CardDescription'
import CardButton from '@/components/Atomic/Card/CardButton'
import CardImage from '@/components/Atomic/Card/CardImage'
import style from './styles.module.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

type Props = {
  tags: {
    name: string
    type: string
  }[]
  title: string
  description: string
  image: string
  link: string
}
const Card = (props: Props) => {
  return (
    <>
      {props ? (
        <div className={style.card}>
          <div className={style.cardContent}>
            <CardTags tags={[]} />
            <CardTitle />
            <CardData />
            <CardDescription />
            <CardButton />
          </div>
          <CardImage />
        </div>
      ) : (
        <div className={style.card}>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p>
              <Skeleton height={'30vh'} width={'100vw'} />
            </p>
          </SkeletonTheme>
        </div>
      )}
    </>
  )
}

export default Card
