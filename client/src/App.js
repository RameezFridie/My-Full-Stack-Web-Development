import React from 'react';

import './App.css';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom"


import Home from './components/Home'
import Music from './components/Music'
import Books from './components/Books'
import Favorite from './components/Favorite'

class App extends React.Component {
  cons
  render(){
    return (
      <Router >
        <Home/>
        <div className='navbar'>
          <nav>
            <ul>
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/Music'}>Search Music</Link>
              </li>
              <li>
                <Link to={'/Books'}>Search Books</Link>
              </li>
              <li>
                <Link to={'/Favorite'}>Favorites</Link>
              </li>
            </ul>
          </nav>
          <Switch>
          <Route path='/Home' component={Home}/>
            <Route path='/Music' component={Music}/>
            <Route path='/Books' component={Books}/>
            <Route path='/Favorite' component={Favorite}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
