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



export default function TraineeCreate(props) {

// make a post request - DONE
// make the prescriptions an array, watch colt steele bootcamp comments - DONE
// make the surgeries an array, watch colt steele bootcamp comments - NOT DONE YET
// add a field for prescriptions and notes - NOT DONE YET

// defining patient state and setting default value of patient status to Active after creation

const [trainee, setTrainee] = useState (
      {status: "Active"}
)

 // Post request to add a patient

 const onSubmit = (e) => {
   console.log('hello?')
  e.preventDefault()
  fetch(`/api/trainees`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(trainee),
  })
  .then(res => res.json())
  .then(json => setTrainee(json.trainee))
  .then(props.history.push('/trainees'))
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
    setTrainee({...trainee, startDate: date})
  };

  // date picker

const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date('2020-01-01T00:00:00'));

const handleDateEndChange = (date) => {
    setSelectedDateEnd(date);
    setTrainee({...trainee, endDate: date})
  };

// // condition dropdown options

// const [condition, setCondition] = React.useState();

//   const handleChange = (event) => {
//     setCondition(event.target.value);
//     setTrainee({...trainee, condition: event.target.value});
//   };

// const conditions = [
//   {
//     value: 'Stable',
//   },
//   {
//     value: 'Unstable',
//   },
// ];

const [sex, setSex] = React.useState();

  const handleChangeSex = (event) => {
    setSex(event.target.value);
    setTrainee({...trainee, sex: event.target.value});
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
         TRAINEE DETAILS - <span style={{color: 'gray'}}>Creation</span>
      </Typography>
      <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="NAME"
        name="trainee[fullName]"
        value={trainee.fullName}
        onChange={e => setTrainee({...trainee, fullName: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the name of the trainee!']}
        />
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="AGE" 
        type="number"
        name="trainee[age]"
        onChange={e => setTrainee({...trainee, age: e.target.value})}
        value={trainee.age}
        validators={['required']}
        errorMessages={['Please add the age of the trainee!']}
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
          name="trainee[sex]"
          onChange={handleChangeSex}
          validators={['required']}
          errorMessages={['Please select the sex of the trainee!']}
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="TRAINEE SHIP START DATE"
          value={selectedDate}
          name="trainee[startDate]"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
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
          label="TRAINEESHIP END DATE"
          value={selectedDateEnd}
          name="trainee[endDate]"
          onChange={handleDateEndChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="ASSIGNED SUPERVISOR"
        name="trainee[supervisor]"
        value={trainee.supervisor}
        validators={['required']}
        errorMessages={['Please add the instructor of thee trainee!']}
        onChange={e => setTrainee({...trainee, supervisor: e.target.value})} 
        />
        </Typography>
        <Divider />                
      </CardContent>
      <CardActions>
      <Button type="submit" size="small" color="primary" variant="outlined">CREATE</Button>
      </CardActions>
    </Card>
    </ValidatorForm>
        </Container>
        </div>
    )

}