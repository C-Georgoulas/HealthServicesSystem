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



export default function TraineeCreate(props) {

  const [users, setUsers] = useState([

  ])  

      // using the state object passed from PatientDetails.js in link to use, in the useEffect.
      let data = useLocation();
      const [editTrainee, setEditTrainee] = useState ({})
  
      useEffect(() => {
          fetch(`/api/trainees/${data.state.passedTraineeId}`)
          .then(response => response.json())
          .then(json => setEditTrainee(json))
         
         }, [])
  


  // const [accessToken, setAccessToken] = useState(undefined);


// GET/Fetch all users, listener for users

useEffect(() => {
  fetch('/api/admin/users')
  .then(response => response.json())
  .then(json => setUsers(json))

}, [])

// defining patient state and setting default value of patient status to Active after creation

 // Put request to add a trainee
 const history = useHistory();

const onEditedTraineeSubmit = (e) => {
    e.preventDefault()
    console.log(editTrainee);
    fetch(`/api/trainees/${data.state.passedTraineeId}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({editTrainee}),
    })
    .then(res => res.json())
    .then(json => setEditTrainee(json.editTrainee))
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
          minWidth: 192,
        },
      });

const classes = useStyles();

// date picker

const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-01T00:00:00'));

const handleDateChange = (date) => {
    setSelectedDate(date);
    setEditTrainee({...editTrainee, startDate: date})
  };

  // date picker

const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date('2020-01-01T00:00:00'));

const handleDateEndChange = (date) => {
    setSelectedDateEnd(date);
    setEditTrainee({...editTrainee, endDate: date})
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
    setEditTrainee({...editTrainee, sex: event.target.value});
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
  setEditTrainee({...editTrainee, 
    author: user});
}


const [department, setDepartment] = React.useState();

const [role, setRole] = React.useState();

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setEditTrainee({...editTrainee, department: event.target.value});
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

const roleChecker = (role) => {
  if (role === "instructor") {
    return "instructor"
  } else {
    return "Not instructor"
  }
}



    return (
      <div>
       <Nav/>
       <br></br>
        <Container maxWidth="md">
          <ValidatorForm
            ref={form}
            onSubmit={onEditedTraineeSubmit}
            onError={errors => console.log(errors)}>
          {/* // <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}> */}
        <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h6" component="h2">
         TRAINEE DETAILS - <span style={{color: 'gray'}}>Modify</span>
      </Typography>
      <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        InputLabelProps={{shrink: true}}
        id="standard-basic" 
        label="NAME"
        name="editTrainee[fullName]"
        value={editTrainee.fullName}
        onChange={e => setEditTrainee({...editTrainee, fullName: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the name of the trainee!']}
        />
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
         InputLabelProps={{shrink: true}}
        id="standard-basic" 
        label="AGE" 
        type="number"
        name="editTrainee[age]"
        onChange={e => setEditTrainee({...editTrainee, age: e.target.value})}
        value={editTrainee.age}
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
          value={editTrainee.sex || ''}
          name="editTrainee[sex]"
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
          value={editTrainee.startDate}
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
          value={editTrainee.endDate}
          name="trainee[endDate]"
          onChange={handleDateEndChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        </Typography>
        <Divider />
        { editTrainee.author && editTrainee.author.name != undefined &&
        <Select
          id="standard-select-sex"
          className={classes.sex}
          select
          label="INSTRUCTOR"
          value={editTrainee.author.name}
          renderValue={ () => renderValue(editTrainee.author.name)}
          onChange={handleClick}
          validators={['required']}
          errorMessages={['Please select the instructor of the trainee!']}
        >
          {users && users.length > 1 && 

          users
          .filter((user) => {
              return roleChecker(
                  user.role,
              ) === 'instructor';
          })
          .map((user) => (

            <MenuItem key={user._id} value={user} onClick={()=>handleClick2(user)}>
              {user.name}
            </MenuItem>
          ))}
          </Select>
        }
          <TextValidator
          className={classes.sex}
          id="standard-select-condition"
          select
          label="Department"
          value={editTrainee.department || ''}
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
      <Button type="submit" size="small" color="primary" variant="outlined">SAVE</Button>
      </CardActions>
    </Card>
    </ValidatorForm>
        </Container>
        </div>
    )

}