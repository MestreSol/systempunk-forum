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
