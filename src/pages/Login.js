import React from "react"
import firebase from "firebase/app"
import "firebase/auth"
import Button from "@material-ui/core/Button"

export default function Login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return (
        <Button
            onClick={() => { 
                firebase.auth().signInWithRedirect(provider) 
                    .then((googleUser) => {
                        console.log('Google Auth Response', googleUser);
                        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
                        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
                          unsubscribe();
                          // Check if we are already signed-in Firebase with the correct user.
                          if (!isUserEqual(googleUser, firebaseUser)) {
                            // Build Firebase credential with the Google ID token.
                            var credential = firebase.auth.GoogleAuthProvider.credential(
                                googleUser.getAuthResponse().id_token);

                            // Sign in with credential from the Google user.
                            firebase.auth().signInWithCredential(credential).catch((error) => {
                              // Handle Errors here.
                              var errorCode = error.code;
                              var errorMessage = error.message;
                              // The email of the user's account used.
                              var email = error.email;
                              // The firebase.auth.AuthCredential type that was used.
                              var credential = error.credential;
                              console.log({ errorCode, errorMessage, email, credential })
                            });
                          } else {
                            console.log('User already signed-in Firebase.');
                          }
                        });
                    })
            }}
        > 
            Sign in with Google 
        </Button>
    )
}

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}