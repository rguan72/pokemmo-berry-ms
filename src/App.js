import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Home from "./pages/Home"
import Archive from "./pages/Archive"
import ProtectedRoute from "./pages/ProtectedRoute"
import Login from "./pages/Login"

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" redirectTo="/login">
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/archive" redirectTo="/login">
          <Archive />
        </ProtectedRoute>
        <Route>
          <Login path="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
