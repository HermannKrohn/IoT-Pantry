import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router'
import loginPage from './Components/loginPage'
import signUp from './Components/signUpPage'
// import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Route exact path='/login' component={loginPage}/>
        <Route exact path='/sign-up' component={signUp}/>
        <Route exact path='/:username/pantry' />
      </BrowserRouter>
    </div>
  );
}

export default App;
