import React from "react"
import styled from "styled-components"

import Header from "shared/layout/Header"

import Suggestions from "./Suggestions"
import FeedList from "./FeedList"
import NewFeed from "./NewFeed"

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
        	<Suggestions />
		</HomeContainer>
	)
}

export default Home
