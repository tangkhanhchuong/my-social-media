import React from "react"
import styled from "styled-components"
import { Link, NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { FaHome, FaEnvelope, FaBell, FaUser, FaBookmark, FaAsterisk, FaTwitter , FaSignOutAlt } from 'react-icons/fa'
import { v4 } from 'uuid'

const iconSize = 30

const Wrapper = styled.nav`
  width: 26%;
  padding: 1rem;
  border-right: 1px solid ${(props) => props.theme.tertiaryColor};
  height: 100vh;
  position: fixed;
  font-weight: 500

  svg {
    width: 28px;
    height: 28px;
    margin-right: 0.5rem;
    position: relative;
    color: ${(props) => props.theme.accentColor};
    top: 7px
  }

  .logo {
    padding-left: 10px;
    margin-bottom: 10px
  }

  ul {
    display: flex;
    flex-direction: column;
    height: 100%
  }

  li {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .selected,
  .selected svg {
    color: ${(props) => props.theme.accentColor};
    fill: ${(props) => props.theme.accentColor}
  }

  @media screen and (max-width: 1100px) {
    width: 10%

    span {
      display: none
    }

    svg {
      margin-right: 0
    }

    li {
      margin: none
    }

    button {
      display: none
    }
  }

  @media screen and (max-width: 530px) {
    bottom: 0;
    width: 100vw;
    border-right: none;
    height: 4rem;
    border-top: 1px solid ${(props) => props.theme.tertiaryColor};
    z-index: 2;
    background: ${(props) => props.theme.background};

    ul {
      flex-direction: row;
      justify-content: space-between
    }

    li {
    }

    svg {
      width: 22px;
      height: 22px
    }
  }
`

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 50px
`

const NavTabList = styled.ul`
  display: flex;
  align-items: flex-start
`

const NavTab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  border-radius: 40px;

  &:hover{
    background-color: ${(props) => props.theme.hover};
  }
`

const NavTabLabel = styled.label`
  margin-left: 20px;
  cursor: pointer
`

const Logo = styled.div`
  border-radius: 40px;
  width: 50px;
  height: 50px;
  padding: 10px;

  &:hover{
    background-color: ${(props) => props.theme.hover};
  }
`

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

const NavItem = ({item}) => {
  const { to, exact, label, NavIcon } = item
  return (
    <li>
      <NavLink exact={exact} activeClassName="selected" to={to}>
        <NavTab>
          <NavIcon size={iconSize} />
          <NavTabLabel>{label}</NavTabLabel>
        </NavTab>
      </NavLink>
    </li>
  )
}

const NavBar = (props) => {
  const onLogout = () => {
    alert('Logout')
    localStorage.removeItem('authInfo')
  }

  return (
    <Wrapper>
      <NavContainer>
        <NavTabList>
          <Link to="/">
            <div className="logo selected">
              <Logo>
                <FaTwitter size={iconSize} />
              </Logo>  
            </div>
          </Link>
          {
            navItems.map(item => <NavItem key={v4()} item={item} /> )
          }
        </NavTabList>
      </NavContainer>
    </Wrapper>
  )
}

const mapStateToProps = state => {
    return {
        authInfo: state.auth
    }
}

export default connect(mapStateToProps)(NavBar)
