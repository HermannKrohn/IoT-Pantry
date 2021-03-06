import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/loginPage.css'
import history from '../history'
import { initConnection, joinRoom, initListeners } from '../SocketConnections'

let handleSignUp = (event) => {
    event.preventDefault()
    history.push('/sign-up')
}

let mapDispatchToProps = {
    initUser: username => {
        return {payload: username, type: 'INIT_USER'}
    },
    newItem: itemHash => {
        return {payload: itemHash, type: 'SOCKET_PREPEND_ITEM'}
    },
    removeItem: UIDHash  => {
        return {payload: UIDHash, type: 'SOCKET_REMOVE_ITEM'}
    }
}

let formSubmit = (event, props) => {
    event.preventDefault()
    fetch("http://10.185.5.18:3001/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": event.target['usernameField'].value,
            "password": event.target['passwordField'].value
        })
    }).then(res => {
        return res.json()
    }).then(json => {
        if(json.status === "Success"){
            //Clear local storage and then set local storage contain new token. After that, redirect to pantry
            localStorage.removeItem('token')
            localStorage.setItem('token', json.token)
            props.initUser(json.username)
            //move io stuff to its own file and reuse for sign-up form and reconnection
            // const io = socketIO('http://10.185.0.162:3001')
            // io.emit('join-room', {
            //     JWT: localStorage.getItem('token')
            // })
            // io.on('new-item', item => {
            //     props.newItem(item)
            // })
            // io.on('remove-item', UIDHash => {
            //     props.removeItem(UIDHash)
            // })
            // io.on('disconnect', () => {
            //     window.location.reload()
            // })
            initConnection()
            joinRoom()
            initListeners()
            history.push(`/${json.username}/pantry`)
        }else{
            //clear local storage and update state with array of error messages. Then re-render login page
            localStorage.removeItem('token')
        }
    })
}

function loginPage(props){
    return(
        <div className="page">
            <div className="pageBackground">
                <div className="form-wrapper">
                    <form className="form" onSubmit={(e) => formSubmit(e, props)}>
                        <div className="form-logo">
                            <i className="material-icons">fastfood</i>
                        </div>

                        <div className="form-title">
						    Log in
					    </div>

                        <div className="inputDiv">
                            <input className="input" type="text" name="usernameField" placeholder="Username"></input>
					    </div>

                        <div className="inputDiv">
                            <input className="input" type="text" name="passwordField" placeholder="Password"></input>
					    </div>

                        <div className="buttonDiv">
                            <button className="btn" type="submit">
                                Login
                            </button>
                        </div>

                        <div className="text-center p-t-90">
                            <a className="ref" onClick={(e) => handleSignUp(e)}>
                                Don't have an account? Sign up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
//           <div>
//       <form onSubmit={(e) => formSubmit(e)}>
//           <div>
//               <label>Username:</label>
//               <input name="usernameField" type="text" />
//           </div>
//           <div>
//               <label>Password:</label>
//               <input name="passwordField" type="text" />
//           </div>
//           <button type="submit">Login</button>
//       </form>
//   </div> 
    )
}

export default connect(null, mapDispatchToProps)(loginPage)//change null to errors array in order to flash error messages

