import socketIO from 'socket.io-client'
import { store } from './store'

let initUser = username => {
    store.dispatch({ payload: username, type: 'INIT_USER' })
}
let newItem = itemHash => {
    store.dispatch({ payload: itemHash, type: 'SOCKET_PREPEND_ITEM' })
}
let removeItem = UIDHash => {
    store.dispatch({ payload: UIDHash, type: 'SOCKET_REMOVE_ITEM' })
}


let io = {}

function initConnection() {
    io = socketIO('http://10.185.5.18:3001')
}

function joinRoom() {
    io.emit('join-room', {
        JWT: localStorage.getItem('token')
    })
}

let listenersInitted = false

function initListeners() {
    if (!listenersInitted) {
        listenersInitted = true
        io.on('new-item', item => {
            newItem(item)
        })
        io.on('remove-item', UIDHash => {
            removeItem(UIDHash)
        })
        io.on('disconnect', () => {
            window.location.reload()
        })
    }
}

export {
    initConnection, joinRoom, initListeners
} 