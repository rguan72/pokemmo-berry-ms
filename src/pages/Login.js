import React from "react"
import firebase from "firebase/app"
import "firebase/auth"
import Button from "@material-ui/core/Button"
import { Redirect } from 'react-router-dom';


export default function Login({ user }) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().getRedirectResult()
    console.log(user)
    if (user) {
      return <Redirect to="/"></Redirect>
    }
    return (
        <Button
            onClick={() => { 
                firebase.auth().signInWithRedirect(provider) 
            }}
        > 
            Sign in with Google 
        </Button>
    )
}
