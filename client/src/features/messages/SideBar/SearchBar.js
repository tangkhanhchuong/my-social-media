import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { useMutation } from 'react-query'

import userRequest from 'http/user_requests'

const SearchBarContainer = styled.div`
    border: none;
    width: 100%;
    padding: 4px 20px;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
`

const UserSearchInput = styled.input`
    width: 100%;
    border: none;
    margin-left: 16px;
`

const SearchBar = ({ setRecommendedUsers, addFinish, setAddFinish }) => {
    const [searchedWord, setSearchedWord] = useState('')

    const { mutate } = useMutation(userRequest.search, { mutationKey: 'search_user' })

    useEffect(() => {
        if(addFinish){
            setSearchedWord("")
            setRecommendedUsers([])
            setAddFinish(false)
        }
    }, [addFinish])

    const onSearchSuccess = (data) => {
        if(!data) return
         
        setRecommendedUsers(data.data)
    }

    const onKeyDown = (e) => {
        const username = e.target.value

        setSearchedWord(username)
        
        if(username.length < 3) {
            setRecommendedUsers([])
            return
        }
        
        mutate(username, {
            onSuccess: onSearchSuccess
        })
    }

    return (
        <SearchBarContainer>
            <FaSearch size={20} />
            <UserSearchInput value={searchedWord} placeholder="Search people" onChange={onKeyDown}/>
        </SearchBarContainer>
    )
}

export default SearchBar
