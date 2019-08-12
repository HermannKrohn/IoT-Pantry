import React from 'react'

let formSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/user/new-user',{
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
        }else{
            //clear local storage token. Update store with errors. Then re-render sign-up page
            localStorage.removeItem('token')
            console.log(json.errors)
        }
    })
}

function signUp(){
    return(
        <div>
            <form onSubmit={(e) => formSubmit(e)}>
                <div>
                    <label>First Name:</label>
                    <input name="firstNameField" type="text" />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input name="lastNameField" type="text" />
                </div>
                <div>
                    <label>Username:</label>
                    <input name="usernameField" type="text" />
                </div>
                <div>
                    <label>Email:</label>
                    <input name="emailField" type="text" />
                </div>
                <div>
                    <label>Password:</label>
                    <input name="passwordField" type="text" />
                </div>
                <div>
                    <label>4-digit Pin:</label>
                    <input name="pinField" type="number" />
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default signUp