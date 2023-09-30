import React from 'react'
import { Link } from 'react-router-dom'
const Menu = () => {
  return (
    <nav className="menu"
        role='navigation'
        aria-label='Main menu'
        itemScope
        itemType='https://schema.org/SiteNavigationElement'
    >
        <ul>
            {/* <!-- This is an SEO Change --> */}
            <li><Link itemProp="url" to={'/'} rel="nofollow" onclick="">Homepage</Link></li>
            <li><Link itemProp="url" to={"/about"} rel="nofollow" onclick="">About</Link></li>
            <li><Link itemProp="url" to={"/login" }rel="nofollow" onclick="">Login</Link></li>
        </ul>
    </nav>
  )
}

export default Menu