import React, { useState, useEffect } from "react";
// importing the main container
import Nav from "./Nav";
import Container from "@material-ui/core/Container";
// main card import that holds patient details and the action buttons
// ------------------------
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// replacement for the classic <hr> from material ui
import Divider from "@material-ui/core/Divider";
// standard text from material ui
import Typography from "@material-ui/core/Typography";
// styles for the components from material ui
import { makeStyles } from "@material-ui/core/styles";
// input
import TextField from "@material-ui/core/TextField";
// button
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
// drug select form
import Select from "@material-ui/core/Select";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
// importing checkbox
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// importing history
import { useLocation, useHistory } from "react-router";

export default function PrescriptionEdit({ match }, props) {
  const [patient, setPatient] = useState({});

  // ATTENTION!!!!!!
  // ATTENTION!!!!!!
  // ATTENTION!!!!!!
  // ATTENTION!!!!!!

  // route and everything works in terms of editing, I just need to figure out how to showcase the values so the user can see
  // what is already there
  // works for now!!!

  // declaring state for the prescriptions
  // const [prescription, setPrescription] = useState({})

  // using the state object passed from PatientDetails.js in link to use, in the useEffect.
  let data = useLocation();
  // console.log(data.state.passedPrescription)

  // declaring temporary state for the edit note
  const [editPrescription, setEditPrescription] = useState({});

  const [editPrescriptionPlan, setEditPrescriptionPlan] = React.useState(0);

  const handlePrescriptionPlan = (event) => {
    setEditPrescription({
      ...editPrescription,
      prescriptionExpirationDate: event.target.value,
    });
    console.log(editPrescription.prescriptionExpirationDate);
  };

  // giving [] empty array as dependency means the hook runs only once
  // therefore it doesnt update the state constantly with what the prescription already is
  // works for now!
  useEffect(() => {
    fetch(
      `/api/patients/${data.state.passedPatientId}/prescriptions/${match.params.id}/edit`
    )
      .then((response) => response.json())
      .then((json) => setEditPrescription(json));
  }, []);

  useEffect(() => {
    fetch(`/api/patients/${data.state.passedPatientId}`)
      .then((response) => response.json())
      .then((json) => setPatient(json));
  }, [match.params.id, patient]);

  const [drugs, setDrugs] = React.useState([]);

  useEffect(() => {
    fetch("/api/drugs")
      .then((response) => response.json())
      .then((json) => setDrugs(json));
  }, [drugs]);

  const [manualDose, setManualDose] = useState({});

  const handleClick = (drug) => {
    if (checked === false) {
      if (patient.age >= 18) {
        setEditPrescription({
          ...editPrescription,
          drug: drug.name,
          class: drug.class,
          dose: drug.suggestedDoseAdult,
          name: patient.fullName,
          diagnosis: patient.diagnosis,
          doctor: "DummyName",
        });
      } else if (patient.age < 18) {
        setEditPrescription({
          ...editPrescription,
          drug: drug.name,
          class: drug.class,
          dose: drug.suggestedDosePediatric,
          name: patient.fullName,
          diagnosis: patient.diagnosis,
          doctor: "DummyName",
        });
      }
    } else if (checked === true) {
      if (patient.age >= 18) {
        setEditPrescription({
          ...editPrescription,
          drug: drug.name,
          class: drug.class,
          dose: manualDose,
          name: patient.fullName,
          diagnosis: patient.diagnosis,
          doctor: "DummyName",
        });
      } else if (patient.age < 18) {
        setEditPrescription({
          ...editPrescription,
          drug: drug.name,
          class: drug.class,
          dose: manualDose,
          name: patient.fullName,
          diagnosis: patient.diagnosis,
          doctor: "DummyName",
        });
      }
    }
  };

  const renderValue = (value) => {
    return value;
  };

  const history = useHistory();

  const onEditedPrescriptionSubmit = (e) => {
    e.preventDefault();
    console.log(data.state.passedPatientId);
    console.log(match.params.id);
    fetch(
      `/api/patients/${data.state.passedPatientId}/prescriptions/${match.params.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editPrescription }),
      }
    )
      .then((res) => res.json())
      .then((json) => setEditPrescription(json.editPrescription));
    history.goBack();
  };

  // checkbox logic

  const [checked, setChecked] = React.useState(false);

  const handleCheckbox = (event) => {
    console.log(checked);
    setChecked(event.target.checked);
  };

  const [categories, setCategories] = React.useState([
    {
      id: 1,
      name: "Miscellaneous analgesics",
    },
    {
      id: 2,
      name: "Benzodiazepines",
    },
    {
      id: 3,
      name: "Aminopenicillins",
    },
    {
      id: 4,
      name: "Miscellaneous antimalarials",
    },
  ]);

  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 150,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    formControl: {
      minWidth: 180,
      maxWidth: 180,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Nav />
      <br></br>
      <Container maxWidth="md">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={onEditedPrescriptionSubmit}
        >
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2">
                {patient.fullName} -{" "}
                <span style={{ color: "gray" }}>Edit Prescription</span>
              </Typography>
              <Divider />
              <Typography variant="body2" component="p">
                {patient.age >= "18" && (
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="DOSAGE CRITERIA"
                    name="editPrescription[doseCriteria]"
                    value="Adult"
                  />
                )}
                {patient.age < "18" && (
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="DOSAGE CRITERIA"
                    name="editPrescription[doseCriteria]"
                    value="Pediatric"
                  />
                )}
              </Typography>
              <Divider />
              <Typography variant="body2" component="p"></Typography>
              <Divider />
              <Typography variant="body2" component="p">
                <TextField
                  disabled
                  InputLabelProps={{ shrink: true }}
                  id="standard-disabled"
                  label="DIAGNOSIS"
                  value={editPrescription.diagnosis}
                  name="editPrescription[diagnosis]"
                />
              </Typography>
              <Divider />
              {editPrescription.author &&
                editPrescription.author.name != undefined && (
                  <Typography variant="body2" component="p">
                    <TextField
                      disabled
                      InputLabelProps={{ shrink: true }}
                      id="standard-disabled"
                      label="DOCTOR"
                      value={editPrescription.author.name}
                      name="editPrescription[doctor]"
                    />
                  </Typography>
                )}
              <Divider />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">
                  Pharmaceutical Drugs
                </InputLabel>
                <Select
                  id="grouped-select"
                  value={editPrescription.drug || ""}
                  renderValue={() => renderValue(editPrescription.drug)}
                >
                  {categories.map((category) => (
                    <span>
                      <ListSubheader key={category.id}>
                        {category.name}
                      </ListSubheader>
                      {drugs.map((drug) =>
                        drug.class === category.name ? (
                          <>
                            {patient.age <= 12 &&
                              drug.suggestedDosePediatric != "Restricted" && (
                                <MenuItem
                                  key={drug._id}
                                  onClick={() => handleClick(drug)}
                                  value={drug.value}
                                >
                                  {drug.name}
                                </MenuItem>
                              )}
                            {patient.age > 12 && (
                              <MenuItem
                                key={drug._id}
                                onClick={() => handleClick(drug)}
                                value={drug.value}
                              >
                                {drug.name}
                              </MenuItem>
                            )}
                          </>
                        ) : null
                      )}
                    </span>
                  ))}
                </Select>
                <FormHelperText>
                  Select a Pharmaceutical Drug to prescribe.
                </FormHelperText>
                {patient.age <= 12 && (
                  <FormHelperText>
                    Some Pharmaceutical Drugs have been restricted due to the
                    patient's age.
                  </FormHelperText>
                )}
              </FormControl>
              <Divider />
              <Typography variant="body2" component="p">
                <FormControl className={classes.formControl}>
                  <TextField
                    disabled
                    InputLabelProps={{ shrink: true }}
                    id="standard-disabled"
                    label="CLASS"
                    value={editPrescription.class || ""}
                    name="editPrescription[class]"
                  />
                </FormControl>
                <Divider />
              </Typography>
              {editPrescription.drug != undefined && (
                <FormControlLabel
                  className={classes.checkbox}
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckbox}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                  label="Manually calculate dosage"
                />
              )}
              {editPrescription.drug == undefined && (
                <FormControlLabel
                  className={classes.checkbox}
                  control={
                    <Checkbox
                      disabled
                      inputProps={{ "aria-label": "disabled checkbox" }}
                      onChange={handleCheckbox}
                    />
                  }
                  label="Manually calculate dosage"
                />
              )}

              <Divider />
              {checked === false && (
                <Typography variant="body2" component="p">
                  <FormControl className={classes.formControl}>
                    <TextField
                      disabled
                      InputLabelProps={{ shrink: true }}
                      id="standard-disabled"
                      label="TREATMENT DOSAGE"
                      value={editPrescription.dose || ""}
                      name="editPrescription[dose]"
                    />
                    <FormHelperText>
                      Suggested dosage based on dosage criteria.
                    </FormHelperText>
                  </FormControl>
                </Typography>
              )}
              {checked === true && (
                <Typography variant="body2" component="p">
                  <FormControl className={classes.formControl}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      id="standard-disabled"
                      label="TREATMENT DOSAGE"
                      value={editPrescription.dose || ""}
                      onChange={(e) =>
                        setEditPrescription({
                          ...editPrescription,
                          dose: e.target.value,
                        })
                      }
                      name="editPrescription[dose]"
                    />
                    <FormHelperText>
                      Suggested dosage based on dosage criteria.
                    </FormHelperText>
                  </FormControl>
                </Typography>
              )}
              <Divider />
              <Typography variant="body2" component="p">
                <FormControl className={classes.formControl}>
                  {/* <TextField 
        InputLabelProps={{shrink: true}}
        id="standard-disabled" 
        label="PRESCRIPTION PLAN"
        value={prescription.prescriptionExpirationDate || ''}
        name="prescription[prescriptionExpirationDate]"
         /> */}
                  <InputLabel htmlFor="demo-simple-select-label">
                    Prescription Plan
                  </InputLabel>
                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="PRESCRIPTION PLAN"
                    value={editPrescription.prescriptionExpirationDate || ""}
                    onChange={handlePrescriptionPlan}
                  >
                    <MenuItem value={7}>7 Days</MenuItem>
                    <MenuItem value={14}>14 Days</MenuItem>
                  </Select>
                </FormControl>
              </Typography>
              <Divider />
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                size="small"
                color="primary"
                variant="outlined"
              >
                SAVE
              </Button>
            </CardActions>
          </Card>
        </form>
      </Container>
    </div>
  );
}
