<<<<<<< HEAD:components/Areas/SuperiorMenu/index.tsx
'use client'

import React, { useState } from 'react'
import './style.css'

export default function SuperiorMenu() {
  const [menuActive, setMenuActive] = useState(false)

  const toggleMenu = () => {
    setMenuActive(!menuActive)
  }

  return (
    <nav className="superior-menu">
      <div className="brand-area">
        <img src="logo.png" alt="Systempunk Logo" />
        <h1>Systempunk</h1>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <div className="menu-area">
        <ul>
          <li className="menu-item">
            <a href="#">Home</a>
          </li>
          <li className="menu-item">
            <a href="#">Universe</a>
          </li>
          <li className="menu-item">
            <a href="#">Timeline</a>
          </li>
          <li className="menu-item">
            <a href="#">Projects</a>
          </li>
          <li className="menu-item">
            <a href="#">Contribute</a>
          </li>
          <li className="menu-item">
            <a href="#">About</a>
          </li>
        </ul>
      </div>
      <div className={`side-menu ${menuActive ? 'active' : ''}`}>
        <ul>
          <li className="menu-item">
            <a href="#">Home</a>
          </li>
          <li className="menu-item">
            <a href="#">Universe</a>
          </li>
          <li className="menu-item">
            <a href="#">Timeline</a>
          </li>
          <li className="menu-item">
            <a href="#">Projects</a>
          </li>
          <li className="menu-item">
            <a href="#">Contribute</a>
          </li>
          <li className="menu-item">
            <a href="#">About</a>
          </li>
        </ul>
      </div>
      <div className="user-area">
        <a href="#">Login</a>
      </div>
    </nav>
  )
}
=======
'use client'

import React, { useState } from 'react'
import './style.css'

export default function SuperiorMenu() {
  const [menuActive, setMenuActive] = useState(false)

  const toggleMenu = () => {
    setMenuActive(!menuActive)
  }

  return (
    <nav className="superior-menu">
      <div className="brand-area">
        <img src="logo.png" alt="Systempunk Logo" />
        <h1>Systempunk</h1>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <div className="menu-area">
        <ul>
          <li className="menu-item">
            <a href="/">Home</a>
          </li>
          <li className="menu-item">
            <a href="/Universe">Universe</a>
          </li>
          <li className="menu-item">
            <a href="/timeline">Timeline</a>
          </li>
          <li className="menu-item">
            <a href="/projects">Projects</a>
          </li>
          <li className="menu-item">
            <a href="/contribute">Contribute</a>
          </li>
          <li className="menu-item">
            <a href="/about">About</a>
          </li>
        </ul>
      </div>
      <div className={`side-menu ${menuActive ? 'active' : ''}`}>
        <ul>
          <li className="menu-item">
            <a href="#">Home</a>
          </li>
          <li className="menu-item">
            <a href="#">Universe</a>
          </li>
          <li className="menu-item">
            <a href="#">Timeline</a>
          </li>
          <li className="menu-item">
            <a href="#">Projects</a>
          </li>
          <li className="menu-item">
            <a href="#">Contribute</a>
          </li>
          <li className="menu-item">
            <a href="#">About</a>
          </li>
        </ul>
      </div>
      <div className="user-area">
        <a href="#">Login</a>
      </div>
    </nav>
  )
}
>>>>>>> 605858d0075b12dd304514c1bed5bb3b884e2105:components/SuperiorMenu/index.tsx
