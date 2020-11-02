import React, {useContext } from "react";
import app from '../firebase';
import { AuthContext } from "./Auth.js";
import 'firebase/auth'
import Menu from './Menu'
import {Dropdown} from 'react-bootstrap'

const Home = () => {

  const { currentUser } = useContext(AuthContext);

    return ( 
        <>
            <nav>
                <div></div>
                <Dropdown>
                    <Dropdown.Toggle as="a">
                    {currentUser.email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item  onClick={() => app.auth().signOut()}>
                          Cerrar Sesion
                        </Dropdown.Item>
                        
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
            <div>
              <Menu/>
            </div>
        </>
    );
  };

  export default Home;