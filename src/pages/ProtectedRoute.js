import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../FirebaseAuthContext';
import { Route, Redirect } from 'react-router-dom';
import firebase from "firebase/app"
import "firebase/auth"

export default function ProtectedRoute(props) {
    if (props.user) {
        return (
            <Route exact path={props.path} user={props.user}>{props.children}</Route>
        )
    }
    return <Redirect to={props.redirectTo}></Redirect>
}