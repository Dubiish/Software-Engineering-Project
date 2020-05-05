import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customer from "./components/customer/Customer.js";
import Order from "./components/Order.js";
import Default from "./components/Default";
import NewCustomer from "./components/customer/NewCustomer.js";

class App extends React.Component {

  state = {
    api: "http://localhost:4000/"
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/customer/new">
            <NewCustomer api={this.state.api} />
          </Route>
          <Route path="/customer">
            <Customer api={this.state.api} />
          </Route>
          <Route path="/order">
            <Order api={this.state.api} />
          </Route>
          <Route path="/">
            <Default api={this.state.api} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
