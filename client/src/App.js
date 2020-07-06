import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";

import Home from "./components/Pages/Home";
import Splash from "./components/Pages/Splash";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/Misc/ProtectedRoute";
import PublicOnlyRoute from "./components/Misc/PublicOnlyRoute";
import NotFound from "./components/Pages/NotFound";

import UserContext from "./context/UserContext.js";

import "./style.css";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  // log in the user if an old token is found in local storage.
  // nest an async function within the useEffect to obtain token info on app render

  useEffect(() => {
    const checkLoggedIn = async () => {
      //check local storage for a token
      let token = localStorage.getItem("auth-token");
      // if no token, create filler blank token
      if (token === null) {
        console.log("setting blank token!");
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // use token/placeholder to make validation req to server
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      // if tokenRes is true, load up context with our token + the user data (with no password/email)
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <PublicOnlyRoute exact path="/" component={Splash} />
          <ProtectedRoute path="/home" component={Home} />
          <PublicOnlyRoute path="/login" component={Login} />
          <PublicOnlyRoute path="/register" component={Register} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );
}
