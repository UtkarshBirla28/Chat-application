
const mongoose = require('mongoose');
const Msg = require('./models/message')
const io = require('socket.io')(3000) //required socket io on port 3000(socket.io is a instance of http)
const mongoDB = 'mongodb+srv://admin-Utkarsh:ub282828@cluster0.5e83scc.mongodb.net/data?retryWrites=true&w=majority'
mongoose.connect(mongoDB).then(()=>{
  console.log('connected');
})
const users= {};

io.on('connection',socket=>{  // io.on is a socket.io instance whick listens many sockets ex=Utkarsh connect Abhay nconnect etc

   Msg.find().then(result=>{
     socket.emit('output-message',result);
   })

    socket.on('new-user-joined',name=>{ //socket.on listens to a particular connection
      console.log(name);
      users[socket.id] = name; // give users a socket id which is equal to name

      socket.broadcast.emit('user-joined',name) //It send events to all connected clients except the sender Ex=if there are 2 people Abhay and Utkarsh and utkarsh just joined so it will send the message to Abhay that Utkarsh joined but the will not be showned to Utkarsh

    })


    socket.on('send', message=>{ //if user send the message if will send the message as callback function
   const messages = new Msg({
     name: users[socket.id],
     message: message
   })
   messages.save().then(()=>{
     socket.broadcast.emit('receive',{message:message, name:users[socket.id]}) //send message and the name of user who send the message to all the users except the user who send the message
   })

   })

    socket.on('disconnect', message=>{
    socket.broadcast.emit('bye',users[socket.id])
   delete users[socket.id]
  })


})
