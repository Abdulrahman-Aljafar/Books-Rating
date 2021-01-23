import React from "react";
import { Route, Redirect } from "react-router-dom";
import ToReadBook from "./profile/ToReadBook";

export default function AuthRoute(props) {
  if (props.auth.isLoggedIn) {
    return (
      <Route>
        <ToReadBook
          setAuth={props.setAuth}
        auth = {props.auth} />
      </Route>
    );
  } else {
    return (
      <Route>
        <Redirect to="/" />
      </Route>
    );
  }
}
