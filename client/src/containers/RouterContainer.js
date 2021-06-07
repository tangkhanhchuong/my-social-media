import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import styled from 'styled-components'

import Nav from "components/layout/Nav"
import Home from "pages/Home"
import Bookmarks from "pages/Bookmarks"
import Notifications from "pages/Notifications"
import Explore from "pages/Explore"

import Messages from "features/messages"
import { SignOut } from "features/auth/SignOutPage"
import Profile from "features/profile/Profile"

const MainPageContainer = styled.div`
  margin-left: 26%;
`

const RouterContainer = () => {
  return (
    <Router>
      <Nav />
      <MainPageContainer>  
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/logout" component={SignOut} />
          <Route path="/messages/:id" component={Messages} />
          <Route path="/messages" component={Messages} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/bookmarks" component={Bookmarks} />
        </Switch>
      </MainPageContainer>
    </Router>
  )
}

export default RouterContainer
