import React from "react"
import { FaTwitter } from 'react-icons/fa'
import { FaHome, FaEnvelope, FaBell, FaUser, FaBookmark, FaAsterisk, FaSignOutAlt } from 'react-icons/fa'
import { v4 } from 'uuid'

import NavItem from './NavItem'
import { StWrapper, StNavContainer, StNavTabList, StNavLink, StLogo } from './NavBar.styled'

const iconSize = 30

const navItems = [
    {
    label: 'Home',
    exact: true,
    NavIcon: FaHome,
    to: '/'
    },
    {
    label: 'Explore',
    exact: false,
    NavIcon: FaAsterisk,
    to: '/explore'
    },
    {
    label: 'Messages',
    exact: false,
    NavIcon: FaEnvelope,
    to: '/messages'
    },
    {
    label: 'Notifications',
    exact: false,
    NavIcon: FaBell,
    to: '/notifications'
    },
    {
    label: 'Bookmarks',
    exact: false,
    NavIcon: FaBookmark,
    to: '/bookmarks'
    },
    {
    label: 'Profile',
    exact: false,
    NavIcon: FaUser,
    to: '/profile'
    },
    {
    label: 'Logout',
    exact: false,
    NavIcon: FaSignOutAlt,
    to: '/logout'
    }
]

const NavBar = () => {
  return (
    <StWrapper>
      <StNavContainer>
        <StNavTabList>
          <StNavLink to="/">
            <div className="logo selected">
              <StLogo>
                <FaTwitter size={iconSize} />
              </StLogo>  
            </div>
          </StNavLink>
            {
              navItems.map(item => <NavItem key={v4()} item={item} /> )
            }
        </StNavTabList>
      </StNavContainer>
    </StWrapper>
  )
}

export default NavBar
