import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import { Provider } from "react-redux";
import store from "./store";
import ItemModal from "./components/ItemModal";
import { loadUser } from "./actions/authAction";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppNavbar />
          <Container>
            {" "}
            <Route exact path="/" component={ItemModal} />
            <ShoppingList />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
