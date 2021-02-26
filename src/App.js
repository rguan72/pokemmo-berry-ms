import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Home from "./pages/Home"
import Archive from "./pages/Archive"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/archive">
          <Archive />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
