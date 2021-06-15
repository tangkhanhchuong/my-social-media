import styled from "styled-components"
import { NavLink } from "react-router-dom"

export const StWrapper = styled.nav`
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
    color: ${(props) => props.theme.accentColor} !important;
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
    color: ${(props) => props.theme.accentColor} !important;
    fill: ${(props) => props.theme.accentColor} !important;
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

export const StNavContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 50px
`

export const StNavTabList = styled.ul`
    display: flex;
    align-items: flex-start
`

export const StNavTab = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 18px !important;
    border-radius: 40px;

    &:hover{
    background-color: ${(props) => props.theme.hover};
    }
`

export const StNavTabLabel = styled.label`
    margin-left: 20px;
    cursor: pointer
`

export const StNavLink = styled(NavLink)`
    text-decoration: none !important;

    &:hover{
    color: ${(props) => props.theme.accentColor} !important;
    }
`

export const StLogo = styled.div`
    border-radius: 40px;
    width: 50px;
    height: 50px;
    padding: 10px;

    &:hover{
    background-color: ${(props) => props.theme.hover} !important;
    }
`