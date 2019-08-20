import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

let mapDispatchToProps = {
    updateSearchTerm: e => {
        e.preventDefault()
        return {payload: e.target.value, type: 'UPDATE_SEARCH_TERM'}
    }
}

function SearchBar(props){
    return(
        <input className="search-navbar" name="searchBar" type="text" placeholder="Search" onChange={(e) => props.updateSearchTerm(e)}/>
    )
}

export default connect(null, mapDispatchToProps)(SearchBar)
