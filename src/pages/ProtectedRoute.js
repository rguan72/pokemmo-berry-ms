import React, { useContext } from 'react';
import { AuthContext } from '../FirebaseAuthContext';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute(props) {
    const authValue = useContext(AuthContext)
    if (authValue.userDataPresent) {
        if (authValue.user === null) {
            return (<Redirect to={props.redirectTo}></Redirect>)
        }
        return (
            <Route exact path={props.path} component={props.children} user={authValue.user} />
        )
    }
    return <Redirect to={props.redirectTo}></Redirect>
}