const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    isDeleted: { type: Boolean, default: false}
}, { timestamps: true })

module.exports = mongoose.model('Message', MessageSchema)