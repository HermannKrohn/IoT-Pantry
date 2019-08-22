import React from 'react'
import history from '../history'

let handleRedirect = (route) => {
    history.push(route)
}

function LandingPage(){
    return(
        <div className="page">
            <div className="pageBackground">
                <div className="homepage-container">
                    <h1 className="homepage-main-text">Your Pantry. Everywhere.</h1>
                    <h3 className="homepage-sub-text">Log in or Sign up to get started</h3>
                    <div className="homepage-button-div">
                        <button className="homepage-btn login-btn" onClick={(e) => handleRedirect('/login')}>Log in</button>
                        <button className="homepage-btn sign-up-btn" onClick={(e) => handleRedirect('/sign-up')}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage