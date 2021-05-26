const socketIo = require('socket.io')

const Messages = require('../schemas/message_schema')
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

      const msg = { 
        content,
        chat: ObjectId(chat),
        sender: ObjectId(sender._id)
      }

      try {
        await Messages.create(msg)
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