import React from "react"
import firebase from "firebase/app"
import "firebase/auth"
import Button from "@material-ui/core/Button"


export default function Login({ user }) {
    var provider = new firebase.auth.GoogleAuthProvider();
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
