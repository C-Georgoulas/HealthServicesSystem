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
import Input from '@material-ui/core/Input';
// standard text from material ui
import Typography from '@material-ui/core/Typography';
// styles for the components from material ui
import { makeStyles, useTheme} from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
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
      }));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


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

// const handleClick = (user) => {
//   // console.log(user);
//     setAuthor(user.name);
// }

// const handleClick2 = (user) => {
//   setSurgery({...surgery, 
//     author: user});
// }

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

const [personName, setPersonName] = React.useState([]);

const handleChange = (event) => {
  setPersonName(event.target.value);
  setSurgery({...surgery, author: event.target.value});
  console.log(surgery.author);
  // console.log(personName)
  // personName.push(event.target.value)
  // setSurgery({...surgery, author: personName})
  // console.log(surgery.author);
};


function getStyles(user, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(user) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


// const handleChangeMultiple = (event) => {
//   // const { options } = event.target;
//   console.log(event.target)
//   const value = [];
//   for (let i = 0, l = users.length; i < l; i += 1) {
//     if (users[i].selected) {
//       value.push(users[i].value);
//     }
//   }
//   setPersonName(value);
//   console.log(value);
// };

// const handleClick2 = (user) => {
//   setSurgery({...surgery, 
//     author: user});
// }

const form = useRef();

const theme = useTheme();

const departmentChecker = (department) => {
  if (department === "Surgery") {
    return "surgeon"
  } else {
    return "Not surgeon"
  }
}


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
        value={surgery.title || ''}
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
        value={surgery.text || ''}
        className={classes.sex}
        multiLine
        rows={4}
        onChange={e => setSurgery({...surgery, text: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the detailed description!']}
        />
        </Typography>
        <Divider />
        <br></br>
        <InputLabel id="demo-mutiple-name-label">SURGEONS</InputLabel>
        <Select
          id="standard-select-sex"
          className={classes.sex}
          select
          label="SURGEONS"
          value={personName || ''}
          onChange={handleChange}
          multiple
          MenuProps={MenuProps}
          input={<Input />}
          validators={['required']}
          errorMessages={['Please select the participant surgeons!']}
        >
          {users && users.length > 1 &&

          users
          .filter((user) => {
              return departmentChecker(
                  user.department,
              ) === 'surgeon';
          })
          .map((user) => (

            <MenuItem key={user._id} value={user} style={getStyles(user, personName, theme)}>
              {user.name}
            </MenuItem>
          ))}
          </Select>
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