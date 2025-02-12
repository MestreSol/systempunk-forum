import React from 'react'
import style from './style.module.css'

const CardTags = () => {
  return (
    <div className={style.tags}>
      <span className={style.tag}>Tag1</span>
      <span className={style.tag}>Tag2</span>
      <span className={style.tag}>Tag3</span>
    </div>
  )
}

export default CardTags
