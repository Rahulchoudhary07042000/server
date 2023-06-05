const express = require("express");
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('./etc/ssl/private/166.170.178.68.host.secureserver.net.key'),
  cert: fs.readFileSync('./etc/ssl/certs/166.170.178.68.host.secureserver.net.crt'),
  secureProtocol: 'TLS_method',
  secureOptions: require('constants').SSL_OP_NO_TLSv1 | require('constants').SSL_OP_NO_TLSv1_1,
};

const app = express();

const server = https.createServer(options, app);
const io = require("socket.io")(server, {
  cors: { origin: "*" }
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
