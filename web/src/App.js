import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customer from "./components/Customer.js";
import Order from "./components/Order.js";
import Default from "./components/Default";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/customer">
            <Customer />
          </Route>
          <Route path="/order">
            <Order />
          </Route>
          <Route path="/">
            <Default />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
