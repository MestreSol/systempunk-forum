import React from 'react'
import Image from 'next/image'

const Brand = () => {
  return (
    <div className="footer-area footer-text">
      <div className="brand-area">
        <Image src="/logo.png" alt="Systempunk Logo" width={100} height={100} />
        <h1>Systempunk</h1>
      </div>
    </div>
  )
}

export default Brand
