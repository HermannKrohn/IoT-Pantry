import React from 'react'

function LandingPage(){
    return(
        <div className="page">
            <div className="pageBackground">
                <div className="homepage-container">
                    <h1 className="homepage-main-text">Your Pantry. Everywhere.</h1>
                    <h3 className="homepage-sub-text">Log in or Sign up to get started</h3>
                    <div className="homepage-button-div">
                        <button className="homepage-btn login-btn">Log in</button>
                        <button className="homepage-btn sign-up-btn">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage