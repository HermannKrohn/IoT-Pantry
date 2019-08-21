import React from 'react'
import SearchBar from './SearchBar'
import { connect } from 'react-redux'
import history from '../history'

let handleLogOut = (e, props) => {
    //clear store, redirect to home page, clear local storage, and disconnect socket (1. disconnect socket, 2. clear store, 3. clear JWT from local storage, 4. redirect)
    props.clearStore()
    localStorage.removeItem('token')
    history.push('/login')
}

let mapDispatchToProps = {
    appendToFilterTerms: newTerms => {
        return {payload: newTerms, type: 'APPEND_TO_FILTERS'}
    },
    removeFromFilterTerms: newTerms => {
        return {payload: newTerms, type: 'REMOVE_FROM_FILTERS'}
    },
    clearStore: () => {
        return {type: 'CLEAR_STORE'}
    }
}

let mapStateToProps = state => {
    return {
        filterTerms: state.filterTerms
    }
}

let handleChange = (e, props) => {
    if(props.filterTerms.includes(e.target.name)){
        let newFilterTerms = props.filterTerms.filter(currTerm => {
            return currTerm !== e.target.name
        })
        props.removeFromFilterTerms(newFilterTerms)
    }else{
        let newFilterTerms = [...props.filterTerms, e.target.name]
        props.appendToFilterTerms(newFilterTerms)
    }
}

function NavBar(props){
    return(
        <ul className="nav-bar" role="navigation">
                <li className="vegetable-li">
                    <label><input type="checkbox" className="filterInput" name="Vegetable" onChange={(e) => {handleChange(e, props)}}/>Vegetable</label>
                </li>
                <li className="fruit-li">
                    <label><input type="checkbox" className="filterInput" name="Fruit" value="fruit" onChange={(e) => {handleChange(e, props)}}/>Fruit</label>
                </li>
                <li className="grain-li">
                    <label><input type="checkbox" className="filterInput" name="Grain" value="grain" onChange={(e) => {handleChange(e, props)}}/>Grain</label>
                </li>
                <li className="protein-li">
                    <label><input type="checkbox" className="filterInput" name="Protein" value="protein" onChange={(e) => {handleChange(e, props)}}/>Protein</label>
                </li>
                <li className="dairy-li">
                    <label><input type="checkbox" className="filterInput" name="Dairy" value="dairy" onChange={(e) => {handleChange(e, props)}}/>Dairy</label>
                </li>
                <li className="search-li">
                    <SearchBar />
                </li>
                <li className="logout-li">
                    <i class="glyphicon glyphicon-log-in"></i>
                    <p className="logout-text" onClick={(e) => {handleLogOut(e, props)}}>Logout</p>
                </li>
        </ul>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)