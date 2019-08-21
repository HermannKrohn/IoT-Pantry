import socketIO from 'socket.io-client'
import { store } from './store'

let initUser = username => {
    store.dispatch({payload: username, type: 'INIT_USER'})
}
let newItem = itemHash => {
    store.dispatch({payload: itemHash, type: 'SOCKET_PREPEND_ITEM'})
}
let removeItem = UIDHash  => {
    store.dispatch({payload: UIDHash, type: 'SOCKET_REMOVE_ITEM'})
}


let io = {}

function initConnection(){
    io = socketIO('http://10.185.0.162:3001')
}

function joinRoom(){
    io.emit('join-room', {
        JWT: localStorage.getItem('token')
    })
}

function initListeners(){
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

export {
    initConnection, joinRoom, initListeners
} 