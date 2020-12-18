import './App.css';
import Nav from './components/Nav'
import Tasks from './components/Tasks'
import Patients from './components/Patients'
import Dashboard from './components/Dashboard'
import PatientDetails from './components/PatientDetails'
import PatientDetailsEdit from './components/PatientDetailsEdit'
import PatientCreate from './components/PatientCreate'
import PrescriptionCreate from './components/PrescriptionCreate'
import PrescriptionEdit from './components/PrescriptionEdit'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={Dashboard}></Route>
      <Route path="/Tasks" component={Tasks}></Route>
      <Route path="/patients" exact component={Patients}/>
      <Route path="/patients/create" exact component={PatientCreate}/>
      <Route path="/patients/:id" exact component={PatientDetails}/>
      <Route path="/patients/:id/edit" exact component={PatientDetailsEdit}/>
      <Route path="/patients/:id/prescription/new" exact component={PrescriptionCreate}/>
      <Route path="/patients/:id/prescription/:id/edit" exact component={PrescriptionEdit}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
