import React, {useContext } from "react";
import app from '../firebase';
import { AuthContext } from "./Auth.js";
import 'firebase/auth'

const Home = () => {

  const { currentUser } = useContext(AuthContext);



    return (
      <>
        <h1>Bienvenido {currentUser.email}</h1>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
      </>
    );
  };

  export default Home;