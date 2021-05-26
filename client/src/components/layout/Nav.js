import React from "react"
import styled from "styled-components"
import { Link, NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { FaHome, FaEnvelope, FaBell, FaUser, FaBookmark, FaAsterisk, FaTwitter } from 'react-icons/fa'

import Button from "styles/Button";

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

const TweetButton = styled.button`

`

const NavBar = (props) => {
  return (
    <Wrapper>
      <NavContainer>
        <NavTabList>
          <Link to="/">
            <div className="logo selected">
              <FaTwitter size={iconSize} />
              <b>{props.authInfo.username}</b>
            </div>
          </Link>
          <li>
            <NavLink exact activeClassName="selected" to="/">
              <NavTab>
                <FaHome size={iconSize} />
                <NavTabLabel>Home</NavTabLabel>
              </NavTab>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/explore">
              <NavTab>
                <FaAsterisk size={iconSize} />
                <NavTabLabel>Explore</NavTabLabel>
              </NavTab>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected " to="/messages">
              <NavTab>
                <FaEnvelope size={iconSize} />
                <NavTabLabel>Messages</NavTabLabel>
              </NavTab>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected " to="/notifications">
              <NavTab>
                <FaBell size={iconSize} />
                <NavTabLabel>Notifications</NavTabLabel>
              </NavTab>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/bookmarks">
              <NavTab>
                <FaBookmark size={iconSize} />
                <NavTabLabel>Bookmarks</NavTabLabel>
              </NavTab>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to={`/profile`}>
              <NavTab>
                <FaUser size={iconSize} />
                <NavTabLabel>Profile</NavTabLabel>
              </NavTab>
            </NavLink>
          </li>
          <li style={{marginTop: "20px"}}>
            <Button xl disabled={false}>
              Tweet
            </Button>
          </li>
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
