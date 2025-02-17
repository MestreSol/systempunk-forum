import React from 'react'
import style from './style.module.css'

type Props = {
  tags: {
    name: string
    type: string
  }[]
}

function switchCase(tag: { name: string; type: string }, id: number) {
  switch (tag.type) {
    case 'primary':
      return (
        <span className={style.typePrimary} key={id}>
          {tag.name}
        </span>
      )
    case 'secondary':
      return (
        <span className={style.typeSecondary} key={id}>
          {tag.name}
        </span>
      )
    default:
      return (
        <span className={style.type} key={id}>
          {tag.name}
        </span>
      )
  }
}
const CardTags = ({ tags }: Props) => {
  return (
    <>
      {tags && (
        <div className={style.tags}>
          {tags.map((tag, index) => switchCase(tag, index))}
        </div>
      )}
    </>
  )
}

export default CardTags
