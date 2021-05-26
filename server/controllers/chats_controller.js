const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')

const { Chat, Message } = require('../schemas')

const getChats = async (req, res, next) => {
    try{
        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } }})
                                .populate("users")
                                .populate("latestMessage")
                                .sort({ updatedAt: 1 })

        res.status(200).json(chats)
    }
    catch(err) {
        err.statusCode = 400
        next(err)
    }
}

const getChat = async (req, res, next) => {
    try{
        const chat = await Chat.findOne({ _id: req.params.id, users: { $elemMatch: { $eq: req.user.id } }})
                                .populate("users")
        res.status(200).json(chat)
    }
    catch(err) {
        err.statusCode = 400
        next(err)
    }
}

const createChat = async (req, res) => {
    try{
        const { users, isGroupChat } = req.body
    
        if(users.length < 1) throw new Error('Chat must have at least 1 members')

        const userIdInChat = [new ObjectId(req.user.id)]
        for(let userId of users){
            userIdInChat.push(new ObjectId(userId))
        }
        console.log([ ...new Set(userIdInChat) ])
        
        const newChat = await Chat.create({ users: [ ...new Set(userIdInChat) ], isGroupChat })
        res.status(201).json(newChat)
    }
    catch(err) {
        err.statusCode = 400
        next(err)
    }
}

const updateChat = async (req, res) => {
    try{
        const messageId = req.params.id
        const { newMembers } = req.body
        const updatedMessage = await Message.findOneAndUpdate(
            { _id: ObjectId(messageId) },
            { $set: { users : [ ...users, ...new Set(newMembers).map(m => ObjectId(m))] } }
        )

        res.status(200).json(updatedMessage)
    }
    catch(err){
        err.statusCode = 400
        next(err)
    }
}

const deleteChat = async (req, res) => {
    const chatId = req.params.id

    try {
        await Chat.findOneAndDelete(
            { _id: ObjectId(chatId) },
        )

        res.sendStatus(204)
    }
    catch(err) {
        err.statusCode = 400
        next(err)
    }
}

const getMessages = async (req, res, next) => {
    try{
        const chatId = req.params.id

        const messages = await Message.find({ chat: chatId })
                            .populate("sender")
        for(let m of messages){
            if(m.isDeleted) {
                m.content = 'This message is deleted'
            }
        }

        res.status(201).json(messages)
    }
    catch(err) {
        err.statusCode = 400
        next(err)
    }
}

module.exports = {
    getChats,
    getChat,
    createChat,
    updateChat,
    deleteChat,
    getMessages
}