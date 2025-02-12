import React from 'react'

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
              <img src={link.src} alt={title} />
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
