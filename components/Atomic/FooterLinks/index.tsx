import React from 'react'
import Image from 'next/image'

interface FooterLinksProps {
  title: string
  links: { href: string; src?: string; text?: string }[]
}

const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => {
  return (
    <div className="footer-links footer-area">
      <h2>{title}</h2>
      <div className="links">
        {links.map((link, index) =>
          link.src ? (
            <a key={index} href={link.href}>
              <Image src={link.src} alt={title} width={100} height={100} />
            </a>
          ) : (
            <ul key={index}>
              <li>
                <a href={link.href}>{link.text}</a>
              </li>
            </ul>
          )
        )}
      </div>
    </div>
  )
}

export default FooterLinks
