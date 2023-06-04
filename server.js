const express =require("express");
const app=express();
const https = require('http');
const server = https.createServer(app);
const io=require("socket.io")(server,{
    cors:{origin:"*"}
});
io.on("connection",(socket)=>{
   //just after connnection
   socket.emit('updateWallet');
   //show battle for it self
   socket.emit('battleopen');
   //brodcast all open battle's
   socket.broadcast.emit('battleopen');
   socket.emit('runningBattle');
   //broadcast all running battles
   socket.broadcast.emit('runningBattle');

   //when a battel is open for all
   socket.on("battleopen",()=>{
    console.log("open");
    socket.emit('battleopen');
    socket.emit('updateWallet');
    socket.broadcast.emit('battleopen');
   
   })
   

   // Running battle
    socket.on("runningBattle",()=>{
       
       socket.emit('runningBattle');
       socket.broadcast.emit('runningBattle');
       socket.emit('updateWallet');
    })
    //update wallet
   

    

   
   socket.on("disconnect",(socket)=>{
    console.log("disconnect");
   })
})
server.listen(5000,()=>{
    console.log("server running ")
})
