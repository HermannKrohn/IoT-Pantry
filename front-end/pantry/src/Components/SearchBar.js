import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function SearchBar(){
    return(
        <input className="search-navbar" type="text" placeholder="Search"/>
    )
}

export default SearchBar
