const socketIo = require('socket.io')

const { Message, Chat } = require('../schemas')
const { ObjectId } = require('mongodb')

const corsOptions = {
  cors: {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  }
}

const connectSocket = async (server) => {
  const io = await socketIo(server, corsOptions)
  io.on('connection', (socket) => {
    socket.emit("user_connected")
    
    socket.on('send_msg', async (payload) => {
      const { content, sender, chat } = payload
      // create new message
      const msg = { 
        content,
        chat: ObjectId(chat),
        sender: ObjectId(sender._id)
      }
      try {
        const newMessage = await Message.create(msg)

        //assign to latest message of chat
        const updatedChat = await Chat.findOneAndUpdate(
          {_id: ObjectId(chat)}, 
          {latestMessage: newMessage._id, updatedAt: newMessage.updatedAt },
          {new: true}
        )
        
        io.to(chat).emit("receive_msg", { newMessage: { ...payload, sender: { _id: sender._id } }, chat: updatedChat })
      }
      catch(err){
        console.log(err)
        throw(err)
      }

    })

    socket.on('join_conversation', (payload) => {
      const conversationId = payload
      socket.join(conversationId)
    })

    socket.on('add_conversation', (payload) => {
      const conversation = payload
      socket.join(conversation._id)
      socket.broadcast.emit('is_invited_to_conversation', conversation)
    })
  })

}

module.exports = {
    connectSocket
}