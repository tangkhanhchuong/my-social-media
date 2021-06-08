import React from "react"
import styled from "styled-components"

import Header from "components/layout/Header"

import FeedList from "./FeedList"
import NewFeed from "./NewFeed"
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
				<NewFeed />
				<FeedList />
			</div>
        	<Suggestion />
		</HomeContainer>
	)
}

export default Home
