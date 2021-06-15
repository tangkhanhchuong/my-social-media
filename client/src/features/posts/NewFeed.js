import React, { useState } from "react"
import { FaPhotoVideo } from "react-icons/fa"
import TextareaAutosize from "react-textarea-autosize"
import styled from "styled-components"

import { StIconButton, StButton } from "shared/styles/Buttons"
import StAvatar from "shared/styles/Avatar"
import TweetFile from "shared/styles/TweetFile";

const Wrapper = styled.div`
  display: flex;
  padding: 1rem 1rem;
  border-bottom: 7px solid ${(props) => props.theme.tertiaryColor};

  textarea {
    width: 100%;
    background: inherit;
    border: none;
    font-size: 1.23rem;
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.primaryColor};
    margin-bottom: 1.4rem;
  }

  .new-tweet {
    display: flex;
    flex-direction: column;
  }

  .new-tweet-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  svg {
    fill: ${(props) => props.theme.accentColor};
    margin-right: 2rem;
    cursor: pointer;
  }

  button {
    position: relative;
  }
`;

const NewFeed = () => {
  const [tweetFiles, setTweetFiles] = useState([])

  return (
    <Wrapper>
      <StAvatar src={"https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?pid=ImgDet&rs=1"} alt="avatar" />
      <form onSubmit={()=>{}}>
        <div className="new-tweet">
          <TextareaAutosize
            cols="48"
            placeholder="What's happening?"
            type="text"
            value="What's happening?"
          />

          {tweetFiles[0] && (
            <TweetFile newtweet src={"https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?pid=ImgDet&rs=1"} alt="preview" />
          )}

          <div className="new-tweet-action">
            <div className="svg-input">
              <StIconButton> 
                <FaPhotoVideo size={30} />
              </StIconButton>
              <input id="file-input" accept="image/*" type="file" onChange={()=>{}} />
            </div>
            <StButton sm disabled={false}>
              Tweet
            </StButton>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default NewFeed
