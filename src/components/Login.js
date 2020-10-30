import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../firebase.js";
import { AuthContext } from "./Auth.js";
import 'firebase/auth'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import {Dropdown} from 'react-bootstrap'
import Google from './Google'


//Login a traves de Correo
const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");

      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <>
    <div>
      <h1>Log in Email</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
    <Link to="/google">Continuar con Google</Link>
  
    </>
  );
};


//Login atraves de Google oAuth

export default withRouter(Login);

