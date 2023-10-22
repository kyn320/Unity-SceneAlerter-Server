const express = require('express')
const http = require('http')
const app = express();
const path = require('path')

const server = http.createServer(app);
const socketIO = require('socket.io')

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "views")))

const PORT = process.env.port || 3000;

var roomInfo = {};

io.on("connection", (socket) => {
    socket['nickname'] = '익명 ' + Mathf.floor((Math.random() * 100));
    console.log('Socket is Connected : ' + socket.nickname);

    socket.on('nickname', (nickname) => {
        socket['nickname'] = nickname;
    });

    socket.on("chat", (data)=>{
        console.log('rev : ' + data);
    })

    socket.on("enter",(data)=>{
        socket.join(data["GUID"]);

    })

    socket.on("disconnecting", (data)=>{

    })
})

app.listen(PORT, () => console.log('server is running ' + PORT))