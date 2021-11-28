// render component according to differnt routes

import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
// ROUTES 
// import Header from '../components/header';
import Login from '../components/Login';
import Signup from '../components/Signup';

import CheckPage from '../components/checkPage';
import Home from '../components/Home';
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import Profile from "../components/Dashboard/Profile";
import Calender from "../components/Calendar";
import Call from "../components/Call";
import Chat from "../components/Chat";
import Assignment from "../components/Assignment";
import Teams from "../components/Teams";





function Routes(props) {

  var isUserLoggedIn = useSelector(state => state.signup.is_user_logged_in);
  const dispatch = useDispatch();
  return (
    <div>
      {/* <Provider store={props.store}> */}
      <BrowserRouter>
        <div className="page-content">
          <Switch>
            <Route path="/"
              render={() => {
                return (
                  isUserLoggedIn ?
                    <Redirect to="/home" /> :
                    <Redirect to="/login" />
                )
              }}

            />

          </Switch>
          <Route path="/home" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/check" component={CheckPage} exact />
          <Route path="/signup" component={Signup} exact />
        </div>
      </BrowserRouter>
      {/* </Provider> */}
    </div>
  );
}

export default Routes;