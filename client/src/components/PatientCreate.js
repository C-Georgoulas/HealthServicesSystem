import React, { useState, useEffect, useRef }from 'react'
import Nav from './Nav'
import Toolbar from '@material-ui/core/Toolbar';
// importing the main container
import Container from '@material-ui/core/Container';
// main card import that holds patient details and the action buttons
// ------------------------
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// replacement for the classic <hr> from material ui
import Divider from '@material-ui/core/Divider';
// standard text from material ui
import Typography from '@material-ui/core/Typography';
// styles for the components from material ui
import { makeStyles } from '@material-ui/core/styles';
// input
import TextField from '@material-ui/core/TextField';
// button
import Button from '@material-ui/core/Button';
// date picker for admission
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
// Dropdown
import MenuItem from '@material-ui/core/MenuItem';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'



export default function PatientCreate(props) {

// make a post request - DONE
// make the prescriptions an array, watch colt steele bootcamp comments - DONE
// make the surgeries an array, watch colt steele bootcamp comments - NOT DONE YET
// add a field for prescriptions and notes - NOT DONE YET

// defining patient state and setting default value of patient status to Active after creation

const [patient, setPatient] = useState (
      {status: "Active"}
)

 // Post request to add a patient

 const onSubmit = (e) => {
   console.log('hello?')
  e.preventDefault()
  fetch(`/api/patients`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(patient),
  })
  .then(res => res.json())
  .then(json => setPatient(json.patient))
  .then(props.history.push('/patients'))
  .then(props.history.go(0));
// redirects to patients table
}


// styling

const useStyles = makeStyles({
        root: {
          minWidth: 150,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
        sex: {
          minWidth: 192,
        },
      });

const classes = useStyles();

// date picker

const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-01T00:00:00'));

const handleDateChange = (date) => {
    setSelectedDate(date);
    setPatient({...patient, admissionDate: date})
  };

// condition dropdown options

const [condition, setCondition] = React.useState();

  const handleChange = (event) => {
    setCondition(event.target.value);
    setPatient({...patient, condition: event.target.value});
  };

const conditions = [
  {
    value: 'Stable',
  },
  {
    value: 'Unstable',
  },
];

// department dropdown options

const [department, setDepartment] = React.useState();

  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
    setPatient({...patient, department: event.target.value});
  };

const departments = [
  {
    value: 'Pathology',
  },
  {
    value: 'Psychology',
  },
  {
    value: 'Surgery',
  },
];

const [sex, setSex] = React.useState();

  const handleChangeSex = (event) => {
    setSex(event.target.value);
    setPatient({...patient, sex: event.target.value});
  };

const sexSelect = [
  {
    value: 'Male',
  },
  {
    value: 'Female',
  },
];

const form = useRef();


    return (
      <div>
       <Nav/>
       <br></br>
        <Container maxWidth="md">
          <ValidatorForm
            ref={form}
            onSubmit={onSubmit}
            onError={errors => console.log(errors)}>
          {/* // <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}> */}
        <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h6" component="h2">
         PATIENT DETAILS - <span style={{color: 'gray'}}>Admission</span>
      </Typography>
      <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="NAME"
        name="patient[fullName]"
        value={patient.fullName}
        onChange={e => setPatient({...patient, fullName: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the name of the patient!']}
        />
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="AGE" 
        type="number"
        name="patient[age]"
        onChange={e => setPatient({...patient, age: e.target.value})}
        value={patient.age}
        validators={['required']}
        errorMessages={['Please add the age of the patient!']}
        />
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
          id="standard-select-sex"
          className={classes.sex}
          select
          label="SEX"
          value={sex}
          name="patient[sex]"
          onChange={handleChangeSex}
          validators={['required']}
          errorMessages={['Please select the sex of the patient!']}
        >
          {sexSelect.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextValidator>
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="WEIGHT" 
        type="number"
        name="patient[weight]"
        onChange={e => setPatient({...patient, weight: e.target.value})}
        value={patient.weight}
        validators={['required']}
        errorMessages={['Please add the weight of the patient!']}
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
          label="ADMISSION DATE"
          value={selectedDate}
          name="patient[admissionDate]"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        </Typography>
        <Typography variant="body2" component="p">
        <TextValidator
          id="standard-select-condition"
          select
          label="CONDITION"
          value={condition}
          name="patient[condition]"
          onChange={handleChange}
          helperText="Current patient condition."
          validators={['required']}
          errorMessages={['Please select the condition of the patient!']}
        >
          {conditions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextValidator>
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="DIAGNOSIS"
        name="patient[diagnosis]"
        onChange={e => setPatient({...patient, diagnosis: e.target.value})}
        value={patient.diagnosis}
        validators={['required']}
        errorMessages={['Please add the diagnosis of the patient!']}
         />
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
          id="standard-select-condition"
          select
          label="DEPARTMENT"
          value={department}
          name="patient[department]"
          onChange={handleChangeDepartment}
          helperText="Department that will handle the patient based on diagnosis"
          validators={['required']}
          errorMessages={['Please select the department of the patient!']}
        >
          {departments.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextValidator>
        </Typography>
        <Divider />
        {/* <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="SUPERVISOR"
        name="patient[supervisor]"
        value={patient.supervisor}
        validators={['required']}
        errorMessages={['Please add the supervising doctor of the patient!']}
        onChange={e => setPatient({...patient, supervisor: e.target.value})} 
        />
        </Typography>
        <Divider />                 */}
      </CardContent>
      <CardActions>
      <Button type="submit" size="small" color="primary" variant="outlined">ADMIT</Button>
      </CardActions>
    </Card>
    </ValidatorForm>
        </Container>
        </div>
    )

}