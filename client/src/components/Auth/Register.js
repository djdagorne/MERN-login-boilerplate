import React, { useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import UserContext from "../../context/UserContext.js";
import ErrorNotice from "../Misc/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, email, password, passwordCheck };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
    } catch (error) {
      error.response.data.message && setError(error.response.data.message);
    }
  };
  /* TODO LOOK INTO REACT FORM HOOKS PACKAGE/NPM */
  return (
    <div className="page">
      <h2>Registration</h2>
      {error && (
        <ErrorNotice
          message={error}
          clearError={() => {
            setError(undefined);
          }}
        />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
