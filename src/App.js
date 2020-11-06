
import {BrowserRouter  as Router, Route} from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
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
<Route exact path="/login" component={Login} ></Route>
<Route exact path="/google" component={Google} ></Route>
<Route exact path="/signup" component={SignUp} />
  </div>

</Router>
</AuthProvider>
  );
}

export default App;
