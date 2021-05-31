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
    console.log("user connect")
    socket.emit("user_connected")
    
    socket.on('send_msg', async (payload) => {
      const { content, sender, chat } = payload

      //create new message
      const msg = { 
        content,
        chat: ObjectId(chat),
        sender: ObjectId(sender._id)
      }
      try {
        const newMessage = await Message.create(msg)
        //assign to latest message of chat
        await Chat.findOneAndUpdate({_id: ObjectId(chat)}, {latestMessage: newMessage._id})
      }


      catch(err){
        console.log(err)
      }

      io.sockets.emit("receive_msg", payload)
    })
  })

}

module.exports = {
    connectSocket
}