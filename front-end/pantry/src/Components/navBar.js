import React from 'react'
import SearchBar from './SearchBar'


function NavBar(){
    return(
        <ul className="nav-bar" role="navigation">
            {/* <li className="filters bar-left"> */}
                <li className="vegetable-li">
                    <label><input type="checkbox" className="filterInput" name="vegetable" value="vegetable"/>Vegetable</label>
                </li>
                <li className="fruit-li">
                    <label><input type="checkbox" className="filterInput" name="fruit" value="fruit"/>Fruit</label>
                </li>
                <li className="grain-li">
                    <label><input type="checkbox" className="filterInput" name="grain" value="grain"/>Grain</label>
                </li>
                <li className="protein-li">
                    <label><input type="checkbox" className="filterInput" name="protein" value="protein"/>Protein</label>
                </li>
                <li className="dairy-li">
                    <label><input type="checkbox" className="filterInput" name="dairy" value="dairy"/>Dairy</label>
                </li>
            {/* </li> */}
            {/* <li className="bar-right"> */}
                <li className="search-li">
                    <SearchBar />
                </li>
                <li className="logout-li">
                    <i class="glyphicon glyphicon-log-in"></i>
                </li>
            {/* </li> */}
        </ul>
    )
}

export default NavBar