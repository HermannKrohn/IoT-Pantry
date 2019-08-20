import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './navBar'
import { Card } from 'semantic-ui-react'
import ItemCard from './itemCard'

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
        fetch(`http://10.185.3.218:3001/user/${props.username}/pantry`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                JWT: localStorage.getItem('token')
            })
        }).then(res => {
            return res.json()
        }).then(json => {
            props.updateAllItems(json)
        })
    }, [])

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