'use client'

import React, { useState } from 'react'
import './style.css'
import Image from 'next/image'
type MenuProps = {
  type: 'superior' | 'lateral'
  hidden: boolean
}
export default function SuperiorMenu(MenuProps: MenuProps) {
  const [menuActive, setMenuActive] = useState(false)

  const toggleMenu = () => {
    setMenuActive(!menuActive)
  }

  if (MenuProps.hidden) {
    return null
  }
  return (
    <nav className="superior-menu">
      <div className="brand-area">
        <Image src="logo.png" alt="Systempunk Logo" width={100} height={100} />
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
