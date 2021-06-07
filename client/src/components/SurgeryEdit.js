import React, { useState, useEffect, useRef } from "react";
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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// importing history
import { useLocation, useHistory } from "react-router";
// date picker for admission
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function PatientDetailsEdit({ match }) {
  // using the state object passed from PatientDetails.js in link to use, in the useEffect.
  let data = useLocation();
  const [editSurgery, setEditSurgery] = useState({});

  useEffect(() => {
    fetch(
      `/api/patients/${data.state.passedPatientId}/surgeries/${match.params.id}/edit`
    )
      .then((response) => response.json())
      .then((json) => setEditSurgery(json));
  }, []);

  const history = useHistory();

  const onEditedSurgerySubmit = (e) => {
    e.preventDefault();
    fetch(
      `/api/patients/${data.state.passedPatientId}/surgeries/${match.params.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editSurgery }),
      }
    )
      .then((res) => res.json())
      .then((json) => setEditSurgery(json.editSurgery));
    history.goBack();
  };

  // styling

  const useStyles = makeStyles({
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
    sex: {
      //   minWidth: 200,
    },
  });

  const classes = useStyles();

  // date picker

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-01-01T00:00:00")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setEditSurgery({ ...editSurgery, startDate: date });
  };

  // condition dropdown options

  const [condition, setCondition] = React.useState();

  const handleChange = (event) => {
    setCondition(event.target.value);
    setEditSurgery({ ...editSurgery, condition: event.target.value });
  };

  const conditions = [
    {
      value: "Stable",
    },
    {
      value: "Unstable",
    },
  ];

  // department dropdown options

  // const [department, setDepartment] = React.useState();

  //   const handleChangeDepartment = (event) => {
  //     setDepartment(event.target.value);
  //     setEditSurgery({...editSurgery, department: event.target.value});
  //   };

  // const departments = [
  //   {
  //     value: 'Pathology',
  //   },
  //   {
  //     value: 'Psychology',
  //   },
  //   {
  //     value: 'Surgery',
  //   },
  // ];

  // const [sex, setSex] = React.useState();

  //   const handleChangeSex = (event) => {
  //     setSex(event.target.value);
  //     setEditSurgery({...editSurgery, sex: event.target.value});
  //   };

  // const sexSelect = [
  //   {
  //     value: 'Male',
  //   },
  //   {
  //     value: 'Female',
  //   },
  // ];

  const renderValue = (value) => {
    return value;
  };

  const form = useRef();

  return (
    <div>
      <Nav />
      <br></br>
      <Container maxWidth="md">
        <ValidatorForm
          ref={form}
          onSubmit={onEditedSurgerySubmit}
          onError={(errors) => console.log(errors)}
        >
          {/* <form className={classes.root} noValidate autoComplete="off" onSubmit={onEditedPatientSubmit}> */}
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2">
                SURGERY DETAILS - <span style={{ color: "gray" }}>MODIFY</span>
              </Typography>
              <Divider />
              <Typography variant="body2" component="p">
                <TextValidator
                  InputLabelProps={{ shrink: true }}
                  id="standard-basic"
                  label="OPERATION TITLE"
                  value={editSurgery.title}
                  name="editSurgery[title]"
                  onChange={(e) =>
                    setEditSurgery({ ...editSurgery, title: e.target.value })
                  }
                  validators={["required"]}
                  errorMessages={[
                    "Please add the title of the surgery operation!",
                  ]}
                />
              </Typography>
              <Divider />
              <Typography variant="body2" component="p">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="SURGERY SCHEDULED DATE"
                    value={editSurgery.startDate}
                    name="editPatient[startDate]"
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Typography>
              <Divider />
              <Typography variant="body2" component="p">
                <TextValidator
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  id="standard-basic"
                  label="SURGERY OPERATION DESCRIPTION"
                  multiline
                  value={editSurgery.text}
                  name="editSurgery[text]"
                  onChange={(e) =>
                    setEditSurgery({ ...editSurgery, text: e.target.value })
                  }
                  validators={["required"]}
                  errorMessages={["Please add the details of the surgerey!"]}
                />
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
        </ValidatorForm>
        {/* </form> */}
      </Container>
    </div>
  );
}
