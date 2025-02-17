import React from 'react'
import style from './style.module.css'
import UpdateSection from '@/components/Atomic/UpdateSection'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

type Props = {
  update: {
    title: string
    Date: string
    MadeBy: string
    Description: string
    Content: string
  }
}

const UpdateArea = ({ update }: Props) => {
  if (!update) {
    return (
      <div className={style.content}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <h2 className={style.contentTitle}>
            <Skeleton height={'10vh'} width={'100vw'} />
          </h2>
          <h1 className={style.contentSubTitle}>
            <Skeleton width={'100vw'} />
          </h1>
          <p className={style.updateTime}>
            <Skeleton height={'30vh'} width={'100vw'} />
          </p>
          <Skeleton height={'30vh'} width={'100vw'} />
        </SkeletonTheme>
      </div>
    )
  }

  return (
    <div className={style.content}>
      <h2 className={style.contentTitle}>{update.title}</h2>
      <h1 className={style.contentSubTitle}>{update.Description}</h1>
      <p className={style.updateTime}>
        {update.Date} by {update.MadeBy}
      </p>
      <UpdateSection content={update.Content} />
    </div>
  )
}

export default UpdateArea
