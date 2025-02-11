import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import './styles.css'

export default function Carousel() {
  useEffect(() => {
    const slider = document.querySelector('.slider')

    function activate(e: Event) {
      const items = document.querySelectorAll('.item')
      if (!slider) return
      if ((e.target as Element).matches('.next')) {
        slider.append(items[0])
      }
      if ((e.target as Element).matches('.prev')) {
        slider.prepend(items[items.length - 1])
      }
    }

    document.addEventListener('click', activate, false)
  }, [])
  return (
    <main>
      <ul className="slider">
        <li
          className="item"
          style={{
            backgroundImage: `url('https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg')`
          }}
        >
          <div className="content">
            <h2 className="title">Lossless Youths</h2>
            <p className="description">
              {' '}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.{' '}
            </p>
            <button>Read More</button>
          </div>
        </li>
        <li
          className="item"
          style={{
            backgroundImage: `url('https://i.redd.it/tc0aqpv92pn21.jpg')`
          }}
        >
          <div className="content">
            <h2 className="title">Estrange Bond</h2>
            <p className="description">
              {' '}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.{' '}
            </p>
            <button>Read More</button>
          </div>
        </li>
        <li
          className="item"
          style={{
            backgroundImage: `url('https://wharferj.files.wordpress.com/2015/11/bio_north.jpg')`
          }}
        >
          <div className="content">
            <h2 className="title">The Gate Keeper</h2>
            <p className="description">
              {' '}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.{' '}
            </p>
            <button>Read More</button>
          </div>
        </li>
        <li
          className="item"
          style={{
            backgroundImage: `url('https://images7.alphacoders.com/878/878663.jpg')`
          }}
        >
          <div className="content">
            <h2 className="title">Last Trace Of Us</h2>
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.
            </p>
            <button>Read More</button>
          </div>
        </li>
        <li
          className="item"
          style={{
            backgroundImage: `url('https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg')`
          }}
        >
          <div className="content">
            <h2 className="title">Urban Decay</h2>
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.
            </p>
            <button>Read More</button>
          </div>
        </li>
        <li
          className="item"
          style={{
            backgroundImage: `url('https://da.se/app/uploads/2015/09/simon-december1994.jpg')`
          }}
        >
          <div className="content">
            <h2 className="title">The Migration</h2>
            <p className="description">
              {' '}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.{' '}
            </p>
            <button>Read More</button>
          </div>
        </li>
      </ul>
      <nav className="nav">
        <div className="btn prev" data-name="arrow-back-outline">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="btn next" data-name="arrow-forward-outline">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </nav>
      <script
        type="module"
        async
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        async
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </main>
  )
}
