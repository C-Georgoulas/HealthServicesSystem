import React, { useState, useEffect, useRef } from 'react'
// importing the main container
import Nav from './Nav'
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
import MenuItem from '@material-ui/core/MenuItem';
// drug select form
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
// importing history
import {useLocation, useHistory} from 'react-router';
// date picker for admission
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

export default function PatientDetailsEdit({match}) {

    // using the state object passed from PatientDetails.js in link to use, in the useEffect.
    let data = useLocation();
    const [editPatient, setEditPatient] = useState ({})

    useEffect(() => {
        fetch(`/api/patients/${data.state.passedPatientId}`)
        .then(response => response.json())
        .then(json => setEditPatient(json))
       
       }, [])

       const history = useHistory();

const onEditedPatientSubmit = (e) => {
    e.preventDefault()
    fetch(`/api/patients/${data.state.passedPatientId}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({editPatient}),
    })
    .then(res => res.json())
    .then(json => setEditPatient(json.editPatient))
    history.goBack();
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
      minWidth: 200,
    },
  });

const classes = useStyles();

// date picker

const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-01T00:00:00'));

const handleDateChange = (date) => {
setSelectedDate(date);
setEditPatient({...editPatient, admissionDate: date})
};

// condition dropdown options

const [condition, setCondition] = React.useState();

const handleChange = (event) => {
setCondition(event.target.value);
setEditPatient({...editPatient, condition: event.target.value});
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
    setEditPatient({...editPatient, department: event.target.value});
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
    setEditPatient({...editPatient, sex: event.target.value});
  };

const sexSelect = [
  {
    value: 'Male',
  },
  {
    value: 'Female',
  },
];

const renderValue = (value) => {
    return value;
  }

  const form = useRef();


    return (
      <div>
        <Nav/>
        <br></br>
        <Container maxWidth="md">
        <ValidatorForm
            ref={form}
            onSubmit={onEditedPatientSubmit}
            onError={errors => console.log(errors)}>
          {/* <form className={classes.root} noValidate autoComplete="off" onSubmit={onEditedPatientSubmit}> */}
        <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h6" component="h2">
         PATIENT DETAILS - <span style={{color: 'gray'}}>MODIFY</span>
      </Typography>
      <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        InputLabelProps={{shrink: true}}
        id="standard-basic" 
        label="NAME"
        value={editPatient.fullName}
        name="editPatient[fullName]"
        onChange={e => setEditPatient({...editPatient, fullName: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the name of the patient!']}
        />
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator 
        InputLabelProps={{shrink: true}}
        id="standard-basic" 
        label="AGE" 
        type="number"
        value={editPatient.age}
        name="editPatient[age]"
        onChange={e => setEditPatient({...editPatient, age: e.target.value})}
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
          value={editPatient.sex || ''}          
          renderValue={ () => renderValue(editPatient.sex)}
          name="editPatient[sex]"
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
        InputLabelProps={{shrink: true}}
        id="standard-basic" 
        label="WEIGHT" 
        type="number"
        name="editPatient[weight]"
        onChange={e => setEditPatient({...editPatient, weight: e.target.value})}
        value={editPatient.weight}
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
          value={editPatient.admissionDate}
          name="editPatient[admissionDate]"
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
          value={editPatient.condition || ''}          
          renderValue={ () => renderValue(editPatient.condition)}
          name="editPatient[condition]"
          onChange={handleChange}
          helperText="Please select current patient condition"
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
        InputLabelProps={{shrink: true}}
        id="standard-basic" 
        label="DIAGNOSIS"
        value={editPatient.diagnosis}
        name="editPatient[diagnosis]"
        onChange={e => setEditPatient({...editPatient, diagnosis: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the diagnosis of the patient!']}
         />
        </Typography>
        <Divider />
        { editPatient.author && editPatient.author.name != undefined &&
        <>
        <Typography variant="body2" component="p">
        <TextValidator
        InputLabelProps={{shrink: true}}
        id="standard-basic" 
        disabled
        label="SUPERVISING DOCTOR"
        value={editPatient.author.name}
        validators={['required']}
        errorMessages={['Please add the diagnosis of the patient!']}
         />
        </Typography>
        <Divider />
        </>
        }
        <Typography variant="body2" component="p">
        <TextValidator
          id="standard-select-condition"
          select
          label="DEPARTMENT"
          value={editPatient.department || ''}
          name="editPatient[department]"
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
      </CardContent>
      <CardActions>
      <Button type="submit" size="small" color="primary" variant="outlined">SAVE</Button>
      </CardActions>
    </Card>
    </ValidatorForm>
    {/* </form> */}
        </Container>
        </div>
    )

}