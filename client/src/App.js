import './App.css';
import Nav from './components/Nav'
import Tasks from './components/Tasks'
import Login from './components/Login'
import Patients from './components/Patients'
import Dashboard from './components/Dashboard'
import PatientDetails from './components/PatientDetails'
import PatientDetailsEdit from './components/PatientDetailsEdit'
import PatientCreate from './components/PatientCreate'
import PrescriptionCreate from './components/PrescriptionCreate'
import PrescriptionEdit from './components/PrescriptionEdit'
import Prescriptions from './components/Prescriptions'
import PrescriptionDetails from './components/PrescriptionDetails'
import Medications from './components/Medications'
import MedicationsCreate from './components/MedicationsCreate'
import Administration from './components/Administration'
import Trainees from './components/Trainees'
import TraineeCreate from './components/TraineeCreate'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AuthService from "./services/auth.service";
import React, { useState, useEffect }from 'react'

function App() {

  const [currentUser, setCurrentUser] = useState({

  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();
      console.log(user);
    if (user) {
      setCurrentUser(user);
      console.log(currentUser);
    } else {
      console.log("user not logged");
    }
  }, []);

  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={Dashboard}></Route>
      <Route path="/Tasks" component={Tasks}></Route>
      <Route path="/Login" exact component={Login}></Route>
      <Route path="/patients" exact component={Patients}/>
      <Route path="/trainees" exact component={Trainees}/>
      <Route path="/trainees/create" exact component={TraineeCreate}/>
      <Route path="/prescriptions" exact component={Prescriptions}/>
      <Route path="/drugs" exact component={Medications}/>
      <Route path="/drugs/create" exact component={MedicationsCreate}/>
      <Route path="/administration" exact component={Administration}/>
      <Route path="/prescriptions/:id" exact component={PrescriptionDetails}/>
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
