import React, {useContext } from "react";
import app from '../firebase';
import { AuthContext } from "./Auth.js";
import 'firebase/auth'
import Contacts from './Contacts';


const Home = () => {

  const { currentUser } = useContext(AuthContext);



    return (
      <>
        <h1>Bienvenido {currentUser.email}</h1>
        <button onClick={() => app.auth().signOut()}>Sign out</button>

      
      <Contacts></Contacts>
            
      </>
    );
  };

  export default Home;