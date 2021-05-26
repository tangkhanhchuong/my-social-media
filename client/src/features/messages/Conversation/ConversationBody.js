import React, { useState } from 'react'
import { connect } from 'react-redux'

import ChatBar from './ChatBar'
import Messages from './Messages'

const ConversationBody = ({ initMessages }) => {

    return (
        <>
            <Messages messages={initMessages} />
            <ChatBar />   
        </>
    )
}

export default ConversationBody