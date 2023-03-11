const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server)


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

app.use(express.static(path.resolve('./public')))

app.get('/',(req,res)=>{
    res.sendFile('/public/index.html')
})

server.listen(3000,()=>{console.log(`server in running`);})