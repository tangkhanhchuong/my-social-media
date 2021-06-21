import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import styled from "styled-components"

import UnderDeveloped from "shared/pages/UnderDeveloped"
import { NavBar } from "shared/layout/NavBar"
import Home from "features/posts/Home"
import Messages from "features/messages"
import { SignOut } from "features/auth/SignOutPage"
import Profile from "features/profile/Profile"
// import VideoCallContainer from 'containers/VideoCallContainer'

const MainPageContainer = styled.div`
  margin-left: 26%;
`

const RouterContainer = () => {
  return (
    <Router>
      <NavBar />
      <MainPageContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/logout" component={SignOut} />
          <Route path="/messages/:id" component={Messages} />
          <Route path="/messages" component={Messages} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/explore" component={UnderDeveloped} />
          <Route exact path="/notifications" component={UnderDeveloped} />
          <Route exact path="/bookmarks" component={UnderDeveloped} />
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </MainPageContainer>
      {/* <VideoCallContainer /> */}
    </Router>
  )
}

export default RouterContainer
