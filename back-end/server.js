const express = require('express')
const userRoutes = require('./routes/userRoutes.js')
const hardwareRoutes = require('./routes/hardwareRoutes.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const secrets = require('./JWTSecret.js')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const jwt = require('jwt-simple')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: '*', credentials: true}))//origin should be limited to localhost:3000 and the ip addresses of the node mcu boards



app.use('/user', userRoutes)
app.use('/hardware', hardwareRoutes(io))

io.on('connection', socket => {
    console.log("NEW: ", socket.id)

    socket.on('join-room', async function(data){
        let idHash = await jwt.decode(data.JWT, secrets.JWTsecret)
        if(!io.sockets.adapter.rooms[`room-${idHash.id}`]){
            //Room does not exist. Create and join room
            console.log("Room does not exist. Creating and joining")
            socket.join(`room-${idHash.id}`)
            console.log(io.sockets.adapter.rooms)
        }else{
            //Room already exists. Join room
            console.log("Room already exists. Joining")
            socket.join(`room-${idHash.id}`)
            console.log(io.sockets.adapter.rooms)
        }
    })

    socket.on('disconnect', function(){
        console.log("LEFT: ", this.id)
    })
})


http.listen(3001, `${secrets.ipAddress}`,() => {
    console.log(`Listening on http://${secrets.ipAddress}:3001`)
})

module.exports = io