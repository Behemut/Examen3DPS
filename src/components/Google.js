import React, { Component, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import {Dropdown} from 'react-bootstrap'

import Menu from "./Menu"

const Dashboard = () => {
    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile()
    const email = profile.getEmail()
    const imageUrl = profile.getImageUrl()

    return (
        <>
            <nav>
                <div></div>
                <img className="push" src={imageUrl}/>
                <Dropdown>
                    <Dropdown.Toggle as="a">
                        {email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                   
                        <Dropdown.Item  onClick={authInstance.signOut}>
                        <Link href="/" replace variant="body2">
                          Cerrar Sesion
                          </Link>
                        </Dropdown.Item>
                   
                        
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
            <div>
              <Menu/>
            </div>
        </>
    )
}

class LoginPage extends React.Component {
    componentDidMount() {
        window.gapi.load('signin2', () => {
            window.gapi.signin2.render('login-button')
        })
    }

    render() {
        return (
            <div className="container">
                <div id="login-button">Sign in with Google</div>
            </div>
        )
    }
}

const LandingPage = () => {
    return (
        <div className="container">
<LoginPage/>
        </div>
    )
}

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isSignedIn: null
        }
    }

   
    initializeGoogleSignIn() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
        client_id: '611987190644-oa8samh59ga1kid9nj0ihh5bp1pbcsjt.apps.googleusercontent.com'
        }).then(() => {
          const authInstance =  window.gapi.auth2.getAuthInstance()
          const isSignedIn = authInstance.isSignedIn.get()
          this.setState({isSignedIn})

          authInstance.isSignedIn.listen(isSignedIn => {
            this.setState({isSignedIn})
          })
        })
      })
    }

    componentDidMount() {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/platform.js'
      script.onload = () => this.initializeGoogleSignIn()
      document.body.appendChild(script)
    }

    ifUserSignedIn(Component) {
        if (this.state.isSignedIn === null) {
            return (
                <h1>Checking if you're signed in...</h1>
            )
        }
        return this.state.isSignedIn ?
            <Component/> :
            <LoginPage/>
    }

    render() {
        return (
            <BrowserRouter>
            <Switch>
                <Route path="/google" render={() => this.ifUserSignedIn(Dashboard)}/>
            </Switch>
        </BrowserRouter>
        )
    }
}

export default withRouter(App);