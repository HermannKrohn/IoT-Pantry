import React from 'react'
import { Route, Redirect } from 'react-router-dom';

let formSubmit = (event) => {
    event.preventDefault()
    fetch("http://localhost:3001/user/login", {
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
            return(
                <Route
                    render={() => {
                        return(
                            <Redirect to={{
                                pathname: '/sign-up'
                            }}/>
                        )
                    }}
                />
            )
        }else{
            //clear local storage and update state with array of error messages. Then re-render login page
            localStorage.removeItem('token')
        }
    })
}

function loginPage(){
    return(
        <div>
            <form onSubmit={(e) => formSubmit(e)}>
                <div>
                    <label>Username:</label>
                    <input name="usernameField" type="text" />
                </div>
                <div>
                    <label>Password:</label>
                    <input name="passwordField" type="text" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default loginPage