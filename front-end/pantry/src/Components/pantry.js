import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './navBar'

function Pantry(){
    return(
        <div>
            <div className="main">
                <NavBar/>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Pantry