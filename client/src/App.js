import "./App.css";
import Nav from "./components/Nav";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import ErrorScreen from "./components/ErrorScreen";
import Patients from "./components/Patients";
import Dashboard from "./components/Dashboard";
import PatientDetails from "./components/PatientDetails";
import PatientDetailsEdit from "./components/PatientDetailsEdit";
import PatientCreate from "./components/PatientCreate";
import PrescriptionCreate from "./components/PrescriptionCreate";
import PrescriptionEdit from "./components/PrescriptionEdit";
import Prescriptions from "./components/Prescriptions";
import PrescriptionDetails from "./components/PrescriptionDetails";
import Medications from "./components/Medications";
import MedicationsCreate from "./components/MedicationsCreate";
import SurgeryCreate from "./components/SurgeryCreate";
import SurgeryDetails from "./components/SurgeryDetails";
import SurgeryEdit from "./components/SurgeryEdit";
import Administration from "./components/Administration";
import Trainees from "./components/Trainees";
import Users from "./components/Users";
import TraineeCreate from "./components/TraineeCreate";
import TraineeDetails from "./components/TraineeDetails";
import TraineeDetailsEdit from "./components/TraineeDetailsEdit";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthService from "./services/auth.service";
import { UserContext } from "./components/UserContext";
import React, { useState, useEffect, useContext, useMemo } from "react";

function App() {
  const [user, setUser] = useState(null);

  // this prevents this providerValue changing unless value or setValue changes
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    async function fetchUser() {
      const receivedUser = await AuthService.getCurrentUser();
      if (receivedUser) {
        setUser(receivedUser);
        console.log("user from async function");
        console.log(user);
      } else {
        console.log("user not logged in");
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("user from other useEffect");
    console.log(user);
    setUser(user);
  }, [user]);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={value}>
          {user == null && (
            <Switch>
              <Route path="/login" exact component={Login}></Route>
              <Route path="*" exact={true} component={Login} />
            </Switch>
          )}
          {user != null && (
            <>
              <Switch>
                <Route path="/" exact component={Dashboard}></Route>
                <Route path="/patients" exact component={Patients} />
                {(user.role === "admin" || user.role === "instructor") && (
                  <Route path="/trainees" exact component={Trainees} />
                )}
                {(user.role === "admin" || user.role === "instructor") && (
                  <Route
                    path="/trainees/create"
                    exact
                    component={TraineeCreate}
                  />
                )}
                {(user.role === "admin" || user.role === "instructor") && (
                  <Route
                    path="/trainees/:id"
                    exact
                    component={TraineeDetails}
                  />
                )}
                {(user.role === "admin" || user.role === "instructor") && (
                  <Route
                    path="/trainees/:id/edit"
                    exact
                    component={TraineeDetailsEdit}
                  />
                )}
                {user.role === "admin" && (
                  <Route path="/users" exact component={Users} />
                )}
                <Route path="/prescriptions" exact component={Prescriptions} />
                <Route path="/drugs" exact component={Medications} />
                {user.role === "admin" && (
                  <Route
                    path="/drugs/create"
                    exact
                    component={MedicationsCreate}
                  />
                )}
                {(user.role === "admin" || user.role === "instructor") && (
                  <Route
                    path="/administration"
                    exact
                    component={Administration}
                  />
                )}
                <Route
                  path="/prescriptions/:id"
                  exact
                  component={PrescriptionDetails}
                />
                <Route
                  path="/patients/create"
                  exact
                  component={PatientCreate}
                />
                <Route path="/patients/:id" exact component={PatientDetails} />
                <Route
                  path="/patients/:id/edit"
                  exact
                  component={PatientDetailsEdit}
                />
                {(user.department === "Surgery" || user.role === "admin") && (
                  <Route
                    path="/patients/:id/surgery/new"
                    exact
                    component={SurgeryCreate}
                  />
                )}
                {(user.department === "Surgery" || user.role === "admin") && (
                  <Route
                    path="/patients/:id/surgery/:id/edit"
                    exact
                    component={SurgeryEdit}
                  />
                )}
                <Route path="/surgeries/:id" exact component={SurgeryDetails} />
                {user.role != "nurse" && user.role != "trainee" && (
                  <Route
                    path="/patients/:id/prescription/new"
                    exact
                    component={PrescriptionCreate}
                  />
                )}
                {user.role != "nurse" && user.role != "trainee" && (
                  <Route
                    path="/patients/:id/prescription/:id/edit"
                    exact
                    component={PrescriptionEdit}
                  />
                )}
                <Route path="*" exact={true} component={ErrorScreen} />
              </Switch>
            </>
          )}
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
