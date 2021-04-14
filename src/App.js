import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Home from "./pages/Home"
import Archive from "./pages/Archive"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import firebase from "firebase/app"
import "firebase/auth"

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          setUser(user)
        } else {
          setUser(false)
        }
      })
  }, [])
  console.log(user)
  if (user) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home user={user} />
          </Route>
          <Route path="/archive">
            <Archive user={user} test />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    )
  } else if (user === null) {
    return "Loading..."
  } else { 
    return (
      <Router>
        <Switch>
          <Route path ="/">
            <Login />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
