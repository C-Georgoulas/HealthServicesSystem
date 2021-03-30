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
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText'
import {useLocation, useHistory} from 'react-router';




export default function SurgeryCreate({match}, props) {

  const [patient, setPatient] = useState ({})

  useEffect(() => {
    fetch(`/api/patients/${match.params.id}`)
    .then(response => response.json())
    .then(json => setPatient(json))

}, [match.params.id, patient])


  const [users, setUsers] = useState([

  ])  

// GET/Fetch all users, listener for users

useEffect(() => {
  fetch('/api/admin/users')
  .then(response => response.json())
  .then(json => setUsers(json))

}, [])

// defining patient state and setting default value of patient status to Active after creation

const [surgery, setSurgery] = useState ({

})


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
          minWidth: 500,
        },
      });

const classes = useStyles();

// date picker

const [selectedDate, setSelectedDate] = React.useState(new Date('2021-01-01T00:00:00'));

const handleDateChange = (date) => {
    setSelectedDate(date);
    setSurgery({...surgery, startDate: date})
  };

const [author, setAuthor] = React.useState();

// figure out a way to pass the user object ID into trainee.author 
// handeClick = (user) right now returns the event and NOT the user

const handleClick = (user) => {
  // console.log(user);
    setAuthor(user.name);
}

const handleClick2 = (user) => {
  setSurgery({...surgery, 
    author: user});
}

// const location = useLocation();
const history = useHistory();

const onSubmit = (e) => {
  e.preventDefault()
  fetch(`/api/patients/${match.params.id}/surgeries`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({surgery}),
  })
  .then(res => res.json())
  .then(json => setSurgery(json.surgery))
  // history.push(`/patients/${match.params.id}`);
  history.goBack();
}

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
      <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h6" component="h2">
         {patient.fullName} - <span style={{color: 'gray'}}>New Surgery</span>
      </Typography>
      <Divider />
        <Typography variant="body2" component="p">
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextField 
        disabled
        InputLabelProps={{shrink: true}}
        id="standard-disabled" 
        label="DIAGNOSIS"
        value={patient.diagnosis}
        name="prescription[diagnosis]"
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
          label="SURGERY PLANNED DATE"
          value={selectedDate}
          name="surgery[startDate]"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        </Typography>
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="SHORT TITLE ON AREA OF SURGERY OPERATION"
        name="surgery[title]"
        value={surgery.title}
        className={classes.sex}
        onChange={e => setSurgery({...surgery, title: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the short title of the body part the surgery will be performed!']}
        />
        </Typography>
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="SURGERY OPERATION DESCRIPTION"
        name="surgery[title]"
        value={surgery.text}
        className={classes.sex}
        multiLine
        rows={4}
        onChange={e => setSurgery({...surgery, text: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the detailed description!']}
        />
        </Typography>
        <Divider />
      </CardContent>
      <CardActions>
      <Button type="submit" size="small" color="primary" variant="outlined">ADD</Button>
      </CardActions>
    </Card>
    </ValidatorForm>
        </Container>
        </div>
    )

}