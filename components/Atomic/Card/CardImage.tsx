import React from 'react'
import style from './style.module.css'
import Image from 'next/image'

const CardImage = () => {
  return (
    <div className={style.cardImage}>
      <Image
        src="https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg"
        alt="Card Image"
        width={100}
        height={100}
      />
    </div>
  )
}

export default CardImage
