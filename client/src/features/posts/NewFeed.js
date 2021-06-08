import React, { useState } from "react"
import styled from "styled-components"
import { toast } from "react-toastify"
import TextareaAutosize from "react-textarea-autosize"

import useInput from "hooks/useInput"
import Button from "styles/Button"
import TweetFile from "styles/TweetFile"
import { displayError, uploadImage } from "utils"
import Avatar from "styles/Avatar"
import { FaPhotoVideo } from "react-icons/fa"

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
    align-items: center;
  }

  svg {
    width: 24px;
    height: 24px;
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
      <Avatar src={"https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?pid=ImgDet&rs=1"} alt="avatar" />
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
              <label htmlFor="file-input">
                <FaPhotoVideo />
              </label>
              <input id="file-input" accept="image/*" type="file" onChange={()=>{}} />
            </div>
            <Button sm disabled={false}>
              Tweet
            </Button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default NewFeed
