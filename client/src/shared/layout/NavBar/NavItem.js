import React from 'react'
import { StNavTab, StNavTabLabel, StNavLink } from './NavBar.styled'

const iconSize = 30

const NavItem = ({item}) => {
    const { to, exact, label, NavIcon } = item
    return (
      <li>
        <StNavLink exact={exact} activeClassName="selected" to={to}>
          <StNavTab>
            <NavIcon size={iconSize}/>
            <StNavTabLabel>{label}</StNavTabLabel>
          </StNavTab>
        </StNavLink>
      </li>
    )
  }

export default NavItem
