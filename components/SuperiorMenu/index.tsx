import React from 'react'
import './style.css'
export default function SuperiorMenu() {
  return (
    <nav className="superior-menu">
      <div className="brand-area">
        <img src="logo.png"></img>
        <h1>Systempunk</h1>
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
      <div className="user-area">
        <a href="#">Login</a>
      </div>
    </nav>
  )
}
