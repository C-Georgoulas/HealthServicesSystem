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
import SurgeryCreate from './components/SurgeryCreate'
import SurgeryDetails from './components/SurgeryDetails'
import Administration from './components/Administration'
import Trainees from './components/Trainees'
import Users from './components/Users'
import TraineeCreate from './components/TraineeCreate'
import TraineeDetails from './components/TraineeDetails'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AuthService from "./services/auth.service";
import { UserContext } from './components/UserContext'
import React, { useState, useEffect, useContext, useMemo }from 'react'

function App() {
  const [user, setUser] = useState(null)

// this prevents this providerValue changing unless value or setValue changes
const value = useMemo(() => ({user, setUser}), [user, setUser])

  useEffect(() => {
    async function fetchUser(){
    const receivedUser = await AuthService.getCurrentUser();
    if (receivedUser) {
      setUser(receivedUser);
      console.log("user from async function")
      console.log(user);
    } else {
      console.log("user not logged in");
    }
    }
    fetchUser();
  }, []);

    useEffect(()=> {
        console.log("user from other useEffect")
        console.log(user)
        setUser(user);
    }, [user])
  
  return (
    <Router>
    <div className="App">
    <UserContext.Provider value={value}>
        {user == null &&
               <Switch>
              <Route path="/login" exact component={Login}></Route>
              <Route path='*' exact={true} component={Login} />
              </Switch>
        }
        {user != null &&
        <>
       <Switch>
      <Route path="/" exact component={Dashboard}></Route>
      <Route path="/Tasks" component={Tasks}></Route>
      <Route path="/patients" exact component={Patients}/>
      <Route path="/trainees" exact component={Trainees}/>
      <Route path="/trainees/create" exact component={TraineeCreate}/>
      <Route path="/trainees/:id" exact component={TraineeDetails}/>
      <Route path="/users" exact component={Users}/>
      <Route path="/prescriptions" exact component={Prescriptions}/>
      <Route path="/drugs" exact component={Medications}/>
      <Route path="/drugs/create" exact component={MedicationsCreate}/>
      <Route path="/administration" exact component={Administration}/>
      <Route path="/prescriptions/:id" exact component={PrescriptionDetails}/>
      <Route path="/patients/create" exact component={PatientCreate}/>
      <Route path="/patients/:id" exact component={PatientDetails}/>
      <Route path="/patients/:id/edit" exact component={PatientDetailsEdit}/>
      <Route path="/patients/:id/surgery/new" exact component={SurgeryCreate}/>
      <Route path="/surgeries/:id" exact component={SurgeryDetails}/>
      <Route path="/patients/:id/prescription/new" exact component={PrescriptionCreate}/>
      <Route path="/patients/:id/prescription/:id/edit" exact component={PrescriptionEdit}/>
      </Switch>
      </>
        }
      </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
