const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const ChatSchema = new Schema({
    chatName: { type: String, trim: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' }
}, { timestamps: true })

const Chat = mongoose.model('Chat', ChatSchema)
module.exports = Chat