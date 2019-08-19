import React from 'react';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import loginPage from './Components/loginPage'
import signUp from './Components/signUpPage'
import history from './history'
// import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path='/login' component={loginPage}/>
        <Route exact path='/sign-up' component={signUp}/>
        <Route exact path='/:username/pantry' />
      </Router>
    </div>
  );
}

export default App;
