import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './Home.js';

class App extends React.Component {

  render() {
    return(
      <Router>
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/'>
            <Default />
          </Route>
        </Switch>
      </Router>      
    )
  }
}

function Default() {
  return(
    <div>
      <h1> Welcome! </h1>
      <Link to="/Home">
        Home
      </Link>
    </div>
  );
}

export default App;
