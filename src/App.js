
import {BrowserRouter  as Router, Route} from 'react-router-dom';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Home from './components/Home';
import Login from './components/Login';
import Menu from './components/Menu';
import SignUp from './components/SignUp';
import Contacts from './components/Contacts';
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from './components/Auth';
import  Google  from './components/Google'




const  App = () => {
  return (
 <AuthProvider>
<Router>
<ToastContainer/>
  <div>
<PrivateRoute exact path="/" component={Home} ></PrivateRoute>
<PrivateRoute exact path="/clientes" component={Contacts}></PrivateRoute>
<Route exact path="/login" component={Login} ></Route>
<Route exact path="/google" component={Google} ></Route>
<Route exact path="/signup" component={SignUp} />
  </div>

</Router>
</AuthProvider>
  );
}

export default App;
