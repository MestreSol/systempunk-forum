import React from 'react'
import style from './style.module.css'

const Trends = () => {
  return (
    <div className={style.trends}>
      <h2>Trends</h2>
      <ul className={style.trendsList}>
        <li className={style.trend}>
          <img src="/vercel.svg" alt="Trend Image" />
          <div>
            <h3>Example Post</h3>
            <p>January 1, 2024</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Trends
