import React from 'react'
import { connect } from 'react-redux'

let handleLogIn = (event) => {
    event.preventDefault()
    //now redirect to signup page with history.push
}

let formSubmit = (event, props) => {
    event.preventDefault();
    fetch('http://10.185.3.218:3001/user/new-user',{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "firstName": event.target['firstNameField'].value,
            "lastName": event.target['lastNameField'].value,
            "userName": event.target['usernameField'].value,
            "email": event.target['emailField'].value,
            "password": event.target['passwordField'].value,
            "hardwarePin": event.target['pinField'].value
        })
    }).then(res => {
        return res.json()
    }).then(json => {
        if(json.status === "Success"){
            //Clear token from local storage and set local storage ti contain new token. Then redirect to index
            localStorage.removeItem('token')
            localStorage.setItem('token', json.token)
            props.initUser(json.username)
        }else{
            //clear local storage token. Update store with errors. Then re-render sign-up page
            localStorage.removeItem('token')
        }
    })
}

let mapDispatchToProps = {
    initUser: username => {
        return {payload: username, type: 'INIT_USER'}
    }
}

function signUp(props){
    return(
        <div className="page">
            <div className="pageBackground">
                <div className="form-wrapper">
                    <form className="form" onSubmit={(e) => formSubmit(e, props)}>
                        <div className="form-logo">
                            <i className="material-icons">fastfood</i>
                        </div>

                        <div className="form-title p-b-34 p-t-27">
						    Sign up
					    </div>

                        <div className="inputDiv">
                            <input className="input" type="text" name="firstNameField" placeholder="First Name"></input>
					    </div>

                        <div className="inputDiv">
                            <input className="input" type="text" name="lastNameField" placeholder="Last Name"></input>
					    </div>

                        <div className="inputDiv">
                            <input className="input" type="text" name="usernameField" placeholder="Username"></input>
					    </div>

                        <div className="inputDiv">
                            <input className="input" type="text" name="emailField" placeholder="Email"></input>
					    </div>

                        <div className="inputDiv">
                            <input className="input" type="text" name="passwordField" placeholder="Password"></input>
					    </div>

                        <div className="inputDiv">
                            <input className="input" type="text" name="pinField" placeholder="4 Digit Pin"></input>
					    </div>

                        <div className="buttonDiv">
                            <button className="btn" type="submit">
                                Sign up
                            </button>
                        </div>

                        <div className="text-center p-t-90">
                            <a className="ref" onClick={(e) => handleLogIn(e)}>
                                Already have an account? Log in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // <div>
        //     <form onSubmit={(e) => formSubmit(e)}>
        //         <div>
        //             <label>First Name:</label>
        //             <input name="firstNameField" type="text" />
        //         </div>
        //         <div>
        //             <label>Last Name:</label>
        //             <input name="lastNameField" type="text" />
        //         </div>
        //         <div>
        //             <label>Username:</label>
        //             <input name="usernameField" type="text" />
        //         </div>
        //         <div>
        //             <label>Email:</label>
        //             <input name="emailField" type="text" />
        //         </div>
        //         <div>
        //             <label>Password:</label>
        //             <input name="passwordField" type="text" />
        //         </div>
        //         <div>
        //             <label>4-digit Pin:</label>
        //             <input name="pinField" type="number" />
        //         </div>
        //         <button type="submit">Sign up</button>
        //     </form>
        // </div>
    )
}

export default connect(null, mapDispatchToProps)(signUp)//change null to errors array in order to flash error messages