import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import Header from "shared/layout/Header"
import StAvatar from "shared/styles/Avatar"
import { StButton } from 'shared/styles/Buttons'

import Follow from "./Follow"

const Wrapper = styled.div`
	margin-left: 0.4rem;
	width: 350px;
	background: ${props => props.theme.tertiaryColor2};
	border-radius: 10px;

	div:last-child {
		border-bottom: none;
	}
`;

const UserWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem 1rem;
	border-bottom: 1px solid ${props => props.theme.tertiaryColor};
	font-size: 0.9rem

	button {
		align-self: flex-start;
	}

	.follow-btn {
		margin-top: 15px
	}

`;

const AvatarContainer = styled.div`
	display: flex;
	justify-content: center;

	img {
		margin-top: 8px;
	}
	b {
		margin-top: 15px;
	}
`

export const User = ({ user }) => (
	<UserWrapper>
		<AvatarContainer>
			<StAvatar size="40px" src={`https://th.bing.com/th/id/Rc7b5f6a007a193933d22f1b03bf2b43e?rik=O%2fB5mKeF2WBZyg&pid=ImgRaw`} alt="avatar" />
			<b>{user && user.fullname}</b>
		</AvatarContainer>

		<div className="follow-btn">
			{user && !user.isSelf ? (
				<Follow sm id={user && user.id} isFollowing={true} />
			) : (
				<Link to="/settings/profile">
					<StButton sm outline className="action-btn">
						Edit Profile
					</StButton>
				</Link>
			)}
		</div>
	</UserWrapper>
);

const WhoToFollow = () => {
	// const { data, loading } = useQuery(USERS);

	// if (loading) return <Loader />;

	return (
		<Wrapper>
			<Header>Who to follow</Header>
			{[{id: 1962, isFollowing: true, fullname: "Khanh Chuong"},
			{id: 1963, isFollowing: true, fullname: "Khanh Chuong"}].map(user => (
				<User key={user.id} user={user} />
			))}
		</Wrapper>
	);
};

export default WhoToFollow;
