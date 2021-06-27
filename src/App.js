import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
// Components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AuthRoute from "./util/AuthRoute";
import AdminRoute from "./util/AdminRoute";
import GA from "./components/GoogleAnalytics";
// Pages
import Hideout from "./pages/Hideout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialHideout,
  setStorgage,
  setPercentage,
  hideoutSelector,
} from "./slices/hideout";
import { getUser, selectUser } from "./slices/user";
import { getCount } from "./slices/count";
import "./styles/formbase.min.css";

axios.defaults.baseURL =
  "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api";

// axios.defaults.baseURL =
//   "http://localhost:5001/tarkov-hideout-d2603/us-central1/api/";

function App() {
  // Get initial data if available (user, hideout) from local storage

  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { hideout } = useSelector(hideoutSelector);
  let authenticated;

  useEffect(() => {
    if (user) {
      const decodedToken = jwtDecode(user.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        authenticated = false;
        localStorage.removeItem("user");
        localStorage.removeItem("hideout");
        localStorage.removeItem("count");
        window.location.reload(false);
      } else {
        dispatch(setPercentage());

        authenticated = true;
      }
    }

    !authenticated ? dispatch(getInitialHideout()) : false;

    dispatch(getUser());
    dispatch(getCount());

    const interval = setInterval(() => {
      dispatch(setStorgage({ authenticated }));
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Hideout} />
        <AdminRoute exact path="/dashboard" component={Dashboard} user={user} />
        <Route exact path="/profile" component={Profile} />
        <AuthRoute
          exact
          path="/signup"
          component={Signup}
          authenticated={authenticated}
        />
        <AuthRoute
          exact
          path="/login"
          component={Login}
          authenticated={authenticated}
        />
        <Route component={Hideout} />
      </Switch>
      <Footer />
      {/* <GA page="hideout" code="G-SYZEGNJZK0" /> */}
    </Router>
  );
}

export default App;
