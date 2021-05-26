import React from "react"
import styled from "styled-components"
import FeedList from "components/FeedList"
import NewTweet from "components/Tweet/NewTweet"
import Header from "components/Header"
import Suggestion from "pages/Suggestion"

const HomeContainer = styled.div`
	display: flex
`

const Home = () => {
	return (
		<HomeContainer>
			<div>
				<Header>
					<span>Home</span>
				</Header>
				<NewTweet />
				<FeedList />
			</div>
        	<Suggestion />
		</HomeContainer>
	)
}

export default Home
