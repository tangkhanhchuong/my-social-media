import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";

import useInput from "hooks/useInput";
import Button from "styles/Button";
import TweetFile from "styles/TweetFile";
import { displayError, uploadImage } from "utils";
import Avatar from "styles/Avatar";
import { UploadFileIcon } from "../Icons";
// import { USER } from "../../queries/client";
// import { FEED } from "../../queries/others";
// import { NEW_TWEET } from "../../queries/tweet";

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

const NewTweet = () => {
  const [tweetFiles, setTweetFiles] = useState([]);
  const tweet = useInput("");

  // const [newTweetMutation, { loading }] = useMutation(NEW_TWEET, {
  //   refetchQueries: [{ query: FEED }],
  // });

  // const handleNewTweet = async (e) => {
  //   e.preventDefault();

  //   if (!tweet.value) return toast("Write something");

  //   const tags = tweet.value.split(" ").filter((str) => str.startsWith("#"));

  //   try {
  //     await newTweetMutation({
  //       variables: {
  //         text: tweet.value,
  //         tags,
  //         files: tweetFiles,
  //       },
  //     });

  //     toast.success("Your tweet has been posted");
  //   } catch (err) {
  //     return displayError(err);
  //   }

  //   tweet.setValue("");
  //   setTweetFiles([]);
  // };

  // const handleTweetFiles = async (e) => {
  //   const imageUrl = await uploadImage(e.target.files[0]);
  //   setTweetFiles([...tweetFiles, imageUrl]);
  // };

  // const {
  //   data: { user },
  // } = useQuery(USER);

  return (
    <Wrapper>
      <Avatar src={"https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?pid=ImgDet&rs=1"} alt="avatar" />
      <form onSubmit={()=>{}}>
        <div className="new-tweet">
          <TextareaAutosize
            cols="48"
            placeholder="What's happening?"
            type="text"
            // value={tweet.value}
            // onChange={tweet.onChange}
            value="What's happening?"
          />

          {tweetFiles[0] && (
            <TweetFile newtweet src={"https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?pid=ImgDet&rs=1"} alt="preview" />
          )}

          <div className="new-tweet-action">
            <div className="svg-input">
              <label htmlFor="file-input">
                <UploadFileIcon />
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
  );
};

export default NewTweet;
