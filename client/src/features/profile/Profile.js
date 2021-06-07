import React from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import Header from "components/Header"

import ProfileInfo from "./ProfileInfo"
// import Tweet from "../Tweet/Tweet";
// import Loader from "../Loader";
// import { PROFILE } from "../../queries/profile";

const Wrapper = styled.div`
	padding-bottom: 5rem;

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
`;

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
  );
};

export default Profile;
