import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './navBar'
import { Card } from 'semantic-ui-react'
import ItemCard from './itemCard'

function Pantry(){
    return(
        <div>
            <div className="main">
                <NavBar/>
            </div>
            <div className="pantryBody" >
                <Card.Group itemsPerRow={4}>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                </Card.Group>
            </div>
        </div>
    )
}

export default Pantry