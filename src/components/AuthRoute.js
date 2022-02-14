import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { LOGIN_ROUTE } from "../constants";
import BaseWaiting from "./Base/BaseWaiting";

export default function AuthRoute({ path, component }) {
  const user = useSelector(state => state.User);
  const isAuthenticated = user.user.user_name !== undefined
  return (user.loading ?
    <BaseWaiting />
    : isAuthenticated ?
      <Route path={path} exact component={component} />
      :  <Redirect to={LOGIN_ROUTE} />
  )
}
