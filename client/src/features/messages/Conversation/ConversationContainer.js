import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'

import chatRequests from 'http/chat_requests'
import { setAllMessages } from 'store/messages/messages_actions'

import ConversationBody from './ConversationBody'


const mapStateToProps = state => {
    return {
        allMessages: state.socket.allMessages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initializeConversation: async (messages) => await dispatch(setAllMessages(messages))
    }
}

const ConversationContainer = (props) => {
    const { chatId, initializeConversation, allMessages } = props

    const { data } = useQuery('get_messages_in_chat', chatRequests.getMessages.bind(this, chatId))

    useEffect(() => {
        if(data){
            initializeConversation(data.data)
        }
    }, [data])

    if(!data || allMessages.length===0)   return <Spinner />

    return <ConversationBody initMessages={allMessages} />
}


export default connect(mapStateToProps, mapDispatchToProps)(ConversationContainer)