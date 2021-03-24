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



export default function TraineeCreate(props) {

  const [users, setUsers] = useState([

  ])  


  // const [accessToken, setAccessToken] = useState(undefined);


// GET/Fetch all users, listener for users

useEffect(() => {
  fetch('/api/admin/users')
  .then(response => response.json())
  .then(json => setUsers(json))

}, [])

// defining patient state and setting default value of patient status to Active after creation

const [trainee, setTrainee] = useState (
      {status: "Active"}
)

 // Post request to add a trainee

 const onSubmit = (e) => {
   console.log('hello?')
   console.log(trainee);
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

const renderValue = (value) => {
  return value;
}

const [author, setAuthor] = React.useState();

// figure out a way to pass the user object ID into trainee.author 
// handeClick = (user) right now returns the event and NOT the user

const handleClick = (user) => {
  // console.log(user);
    setAuthor(user.name);
}

const handleClick2 = (user) => {
  setTrainee({...trainee, 
    author: user});
}


const [department, setDepartment] = React.useState();

const [role, setRole] = React.useState();

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setTrainee({...trainee, department: event.target.value});
    // setEditUser({...editUser, role: event.target.value});
  };

const departments = [
  {
    value: 'Psychology',
  },
  {
    value: 'Pathology',
  },
  {
    value: 'Surgery',
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
        <TextValidator
          id="standard-select-sex"
          className={classes.sex}
          select
          label="INSTRUCTOR"
          value={trainee.author}
          onChange={handleClick}
          validators={['required']}
          errorMessages={['Please select the instructor of the trainee!']}
        >
          {users && users.length > 1 && users.map((user) => (

            <MenuItem key={user._id} value={user} onClick={()=>handleClick2(user)}>
              {user.name}
            </MenuItem>
          ))}
          </TextValidator>
          <TextValidator
          className={classes.sex}
          id="standard-select-condition"
          select
          label="Department"
          value={department}
          validators={['required']}
          errorMessages={['Please add a department to the trainee!']}
          onChange={handleDepartmentChange}
        >
          {departments.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
         </TextValidator>
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