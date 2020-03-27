import React from 'react';
import LandingPage from './Containers/LandingPage';
import { Route } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
     <Route path='/locationID/:id' render={() =>  <LandingPage/> } />
     <Route path='/pcpID/:id' render={() =>  <LandingPage/> } />
     <Route exact path='/' render={() =>  <LandingPage/> } />
    </div>
  );
}

export default App;
