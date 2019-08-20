import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './navBar'
import { Card } from 'semantic-ui-react'
import ItemCard from './itemCard'
import history from '../history'

let mapStateToProps = state => {
    return {
        username: state.username,
        allItems: state.allItemsArr,
        filterTerms: state.filterTerms,
        searchTerm: state.searchTerm
    }
}

let mapDispatchToProps = {
    updateAllItems: itemsArr => {
        return {payload: itemsArr, type: 'UPDATE_ALL_ITEMS_ARR'}
    }
}

let itemsToDisplay = props => {
    if(props.filterTerms.length > 0 || props.searchTerm.length > 0){
        //This may fail if there is a search term but no filters and vice versa
        let output = []
        output = props.allItems.filter(currItem => {
            return currItem.itemName.toLowerCase().includes(props.searchTerm.toLowerCase())
        })

        if(props.filterTerms.length > 0){
            let filteredByFilters = output.filter(currItem => {
                return props.filterTerms.includes(currItem.category)
            })
            return filteredByFilters
        }
        return output
    }else{
        return props.allItems
    }
}

function Pantry(props){
    useEffect(() => {
        if(props.username.length > 0 && localStorage.getItem('token') !== null){
            //have username and token...just fetch
            fetch(`http://10.185.3.218:3001/user/${props.username}/pantry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                }
            }).then(res => {
                return res.json()
            }).then(json => {
                props.updateAllItems(json)
            })
        }else if(props.username.length < 1 && localStorage.getItem('token') !== null){
            //have token but no username. First fetch username then fetch pantry
            fetch('http://10.185.3.218:3001/user/get-username',{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
            }).then(res => {
                return res.json()
            }).then(json => {
                if(json.status === "Success"){
                    //fetch like first if statement
                    fetch(`http://10.185.3.218:3001/user/${json.username}/pantry`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": localStorage.getItem('token')
                        }
                    }).then(stateRes => {
                        return stateRes.json()
                    }).then(stateJson => {
                        props.updateAllItems(stateJson)
                    })
                }else{
                    localStorage.removeItem('token')
                    history.push('/login')
                }
            })
        }else{
            //do not have a username or token. Redirect to login
            history.push('/login')
        }
    }, [props.username])

    let displayItems = []
    displayItems = itemsToDisplay(props)

    return(
        <div>
            <div className="main">
                <NavBar/>
            </div>
            <div className="pantryBody" >
                <Card.Group itemsPerRow={4}>
                    {displayItems.map( currItem => {
                        return <ItemCard itemName={currItem.itemName} category={currItem.category} />
                    })}
                </Card.Group>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Pantry)