import React from "react"
import styled from "styled-components"

import Header from "shared/layout/Header"

import ProfileInfo from "./ProfileInfo"

const Wrapper = styled.div`
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;

  .profile-top {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;

    span.tweetsCount {
      margin-top: 0.1rem;
      color: ${(props) => props.theme.secondaryColor};
      font-size: 0.9rem;
    }
  }
`

const Profile = () => {
  return (
    <Wrapper>
      <Header>
        <div className="profile-top">
          <span>Profile</span>
        </div>
      </Header>
      <ProfileInfo />
      {/* {data && data.profile && data.profile.tweets && data.profile.tweets.length
        ? data.profile.tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))
        : null} */}
    </Wrapper>
  )
}

export default Profile
