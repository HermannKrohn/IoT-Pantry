import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/loginPage.css'

let handleSignUp = (event) => {
    event.preventDefault()
    //now redirect to signup page with history.push
}

let formSubmit = (event, props) => {
    event.preventDefault()
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
            props.initUser(json.username)
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

let mapDispatchToProps = {
    initUser: username => {
        return {payload: username, type: 'INIT_USER'}
    }
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

                        <div className="form-title p-b-34 p-t-27">
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

