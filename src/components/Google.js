import { SingleBedOutlined } from '@material-ui/icons';
import React from 'react';
import { withRouter, Redirect } from "react-router";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'

  class Google extends React.Component{
    insertGapiScript() {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = () => {
        this.initializeGoogleSignIn()
      }
      document.body.appendChild(script)
    }
  
    initializeGoogleSignIn() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
            client_id: '611987190644-oa8samh59ga1kid9nj0ihh5bp1pbcsjt.apps.googleusercontent.com'
        })
        console.log('Api inited')
  
        window.gapi.load('signin2', () => {
          const params = {
            onsuccess: () => {
              return <Redirect to="/" />;
            }
          }
          window.gapi.signin2.render('loginButton', params)
        })
      })
    }
  
    componentDidMount() {
      console.log('Loading')
      this.insertGapiScript();
    }

    signOut =() =>{
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }
  
  
    render() {
      return (
        <div className="Google">
          <h1>Google Login Demo</h1>
          <a id="loginButton" href="/clientes" >Sign in with Google</a>
          <button onClick={() =>{this.signOut()}}>Sign out</button>

        </div>
      );
    }
  }

  export default Google;