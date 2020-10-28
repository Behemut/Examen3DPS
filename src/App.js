
import './App.css';
import Contacts from './components/Contacts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
  <div className="row">
  <div className="col-md-8 offset-md-2">
    <ToastContainer/>
      <Contacts/>
    </div>
  </div>
  );
}

export default App;
