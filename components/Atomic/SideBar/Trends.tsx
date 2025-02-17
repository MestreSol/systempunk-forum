import React from 'react'
import style from './style.module.css'
import Image from 'next/image'

type Props = {
  trends: {
    title: string
    Date: string
    MadeBy: string
    Description: string
    image: string
    link: string
  }[]
}

const Trends = ({ trends }: Props) => {
  return (
    <>
      <div className={style.trends}>
        <h2>Trends</h2>
        <ul className={style.trendsList}>
          {trends.map((trend, index) => (
            <li className={style.trend} key={index}>
              <Image
                src={trend.image}
                alt="Trend Image"
                width={100}
                height={100}
              />
              <div>
                <h3>{trend.title}</h3>
                <p>{trend.Date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Trends
