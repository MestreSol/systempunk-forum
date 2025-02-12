import React from 'react'
import Brand from '@/components/Atomic/Brand'
import FooterText from '@/components/Atomic/FooterText'
import FooterLinks from '@/components/Atomic/FooterLinks'
import './styles.css'

const Footer = () => {
  return (
    <footer className="footer">
      <Brand />
      <FooterText />
      <FooterLinks
        title="Social"
        links={[
          { href: '#', src: '/facebook.png' },
          { href: '#', src: '/instagram.png' },
          { href: '#', src: '/X.png' },
          { href: '#', src: '/linkedin.png' }
        ]}
      />
      <FooterLinks
        title="Company"
        links={[
          { href: '#', text: 'About' },
          { href: '#', text: 'Contact' },
          { href: '#', text: 'Services' },
          { href: '#', text: 'Projects' }
        ]}
      />
    </footer>
  )
}

export default Footer
