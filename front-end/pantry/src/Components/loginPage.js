import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import '../css/loginPage.css'

let formSubmit = (event) => {
    event.preventDefault()
    console.log("sending")
    console.log(event.target['passwordField'].value)
    console.log(event.target['usernameField'].value)
    fetch("http://10.0.0.66:3001/user/login", {
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
        <div className="page">
            <div className="pageBackground">
                <div className="form-wrapper">
                    <form className="login-form" onSubmit={(e) => formSubmit(e)}>
                        <span className="login-form-logo">
                            <i className="material-icons">landscape</i>
                        </span>

                        <span className="login-form-title p-b-34 p-t-27">
						    Log in
					    </span>

                        <div className="inputDiv">
                            <input className="input" type="text" name="usernameField" placeholder="Username"></input>
					    </div>

                        <div className="inputDiv">
                            <input className="input" type="text" name="passwordField" placeholder="Password"></input>
					    </div>

                        <div className="buttonDiv">
                            <button className="loginButton" type="submit">
                                Login
                            </button>
                        </div>

                        <div className="text-center p-t-90">
                            <a className="sign-up-ref" href="#">
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

export default loginPage