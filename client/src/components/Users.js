import React, { useState, useEffect, useRef }from 'react'
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Container from '@material-ui/core/Container';
import Nav from './Nav'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AuthService from ".././services/auth.service";
// Dialog component from Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EditIcon from '@material-ui/icons/Edit';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    table: {
      // minWidth: 750,
      // maxWdith: 750,
    },
    addEmployeeButton: {
      backgroundColor: "black",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        [theme.breakpoints.up("sm")]: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`
        }
      },
}))

export default function SystemAdministration(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // --------------------------

    /// GETTING ALL USERS

    // const [currentUser, setCurrentUser] = useState({

    // });

    const [users, setUsers] = useState([

    ])  

    // const [accessToken, setAccessToken] = useState(undefined);


  // GET/Fetch all users, listener for users

  useEffect(() => {
    fetch('api/admin/users')
    .then(response => response.json())
    .then(json => setUsers(json))

}, [])

    // dialog for adding users

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleDialogClose = () => {
  setOpen(false);
};

// user object to sent for the POST request

const [user, setUser] = React.useState({})

 // Post request to add a user

 const onUserSubmit = (e) => {
  e.preventDefault()
  fetch(`/api/admin/users/create`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user),
  })
  .then(res => res.json())
  .then(json => setUsers(json.user))
  .then(json => setUser({
    name: "",
    email: "",
    password: "",
    role: "",
    department: ""
  }))
  .then(setOpen(false))
  .then(props.history.go(0))
  .then(props.history.go(0));
}

// delete request

// const deleteUser = (userID) => {
//   const userReceived = AuthService.getCurrentUser();
//   fetch(`http://localhost:8080/admin/users/${userID}/`, {
//     method: 'DELETE',
//     headers: new Headers({
//       'Authorization': 'Bearer ' + userReceived.accessToken,
//       "Content-Type": "application/json", 
//     }), 
//   })
//   .then(response => response.json())
//   console.log(userID + ":user deleted!!!")
// };

// DELETE patient on click event on line 177

const deleteUser = (userID) => {
    console.log(userID);
    fetch('api/admin/users/' + userID, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(props.history.go(0))
    console.log(userID + "HELLO!!!")
};

// edit request


// declaring temporary state for the edit user
const [editUser, setEditUser] = useState({})


// Edit Dialog 
const [openEditUser, setOpenEditUser] = React.useState(false);

// id passes the selected user through the icon button modify into the editUser state

const handleClickOpenEditUser = (id) => {
  console.log("User to edit object below:")
  console.log(id)
  setEditUser(id);
  setOpenEditUser(true);
};

const handleCloseEditUser = () => {
  setOpenEditUser(false);
};

// Put request to edit the specific user of the patient

const onEditedUserSubmit = (e) => {
  e.preventDefault();
  console.log("attempting to send")
  console.log(editUser);
  fetch(`/api/admin/users/${editUser._id}/edit`, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({editUser}),
  })
  .then(res => res.json())
  .then(json => setEditUser({
    name: "",
    email: "",
    department: "",
    role: "",
  }))
  .then(setOpenEditUser(false))
}


// date picker
    
// const [selectedDate, setSelectedDate] = React.useState(new Date('1999-01-01T00:00:00'));
    
// const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setUser({...user, birthday: date})
//     setEditUser({...editUser, birthday: date})
//   };

// role dropdown options

const [role, setRole] = React.useState();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setUser({...user, role: event.target.value});
    // setEditUser({...editUser, role: event.target.value});
  };

  const handleRoleChangeEditUser = (event) => {
    // setRole(event.target.value);
    setEditUser({...editUser, role: event.target.value});
    // setEditUser({...editUser, role: event.target.value});
  };

const roles = [
  {
    value: 'nurse',
  },
  {
    value: 'trainee',
  },
  {
    value: 'doctor',
  },
  {
    value: 'instructor',
  },
  {
    value: 'admin',
  },
];

// department dropdown options

const [department, setDepartment] = React.useState();

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setUser({...user, department: event.target.value});
    // setEditUser({...editUser, role: event.target.value});
  };

  const handleDepartmentChangeEditUser = (event) => {
    // setDepartment(event.target.value);
    setEditUser({...editUser, department: event.target.value});
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

// for form validation in notes
const form = useRef();
const form2 = useRef();

    return (
        <div>
        <Nav/>
        <Toolbar/>
        <div className={classes.content}>
        <Container maxwidth="sm" className={classes.toolbar}>
        <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        >
        CREATE USER
      </Button>
      <p></p>
        <AppBar position="static" color="default">
        {/* <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="USERS" {...a11yProps(0)} />
          <Tab label="APPROVED CARRIERS" {...a11yProps(1)} />
          <Tab label="CARRIER APPLICATIONS" {...a11yProps(2)} />
        </Tabs> */}
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* <TabPanel value={value} index={0} dir={theme.direction}> */}
        <TableContainer className={classes.table} component={Paper} style={{overflowY: "hidden"}}>
        <div style={{width: 'auto', overflowX: 'scroll'}}>
        <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><strong>Name</strong></TableCell>
          <TableCell><strong>Department</strong></TableCell>
          <TableCell><strong>Email</strong></TableCell>
          <TableCell><strong>System Role</strong></TableCell>
          <TableCell align="center"><strong>Action</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users && users.map((user) => (   
      <Slide direction="up" in={users} mountOnEnter unmountOnExit>
      <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.department}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell align="center">
            <Tooltip title="Modify">
                        <IconButton aria-label="modify" size="small" onClick={() => handleClickOpenEditUser(user)}>
                            <EditIcon />
                         </IconButton>
                        </Tooltip> 
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={()=>deleteUser(user._id)}>
                          <DeleteIcon />
                        </IconButton>
                       </Tooltip> 
            </TableCell>
          </TableRow>
          </Slide>
        ))}
      </TableBody>
    </Table>
    </div>
  </TableContainer>
        {/* </TabPanel> */}
      </SwipeableViews>
      <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
<ValidatorForm
            ref={form}
            onSubmit={onUserSubmit}
            onError={errors => console.log(errors)}>
        <DialogTitle id="form-dialog-title">USER CREATION</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new user to the system, please use the form below
          </DialogContentText>
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="user[email]"
            autoComplete="email"
            autoFocus
            onChange={e => setUser({...user, email: e.target.value})}
            value={user.email}
            validators={['required']}
            errorMessages={['Please add an e-mail address to the user!']}
            />
            <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            label="Password"
            name="user[password]"
            onChange={e => setUser({...user, password: e.target.value})}
            value={user.password}
            validators={['required']}
            errorMessages={['Please add a password to the user!']}
            autoFocus
          />
          <TextValidator
          variant="outlined"
          id="standard-select-condition"
          select
          fullWidth
          label="System Role"
          value={role}
          name="user[role]"
          validators={['required']}
          errorMessages={['Please add a system role to the user!']}
          onChange={handleRoleChange}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextValidator>
        <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            type="text"
            label="Full name"
            name="user[name]"
            onChange={e => setUser({...user, name: e.target.value})}
            value={user.name}
            validators={['required']}
            errorMessages={['Please add a name to the user!']}
            autoFocus
          />
           <TextValidator
          variant="outlined"
          id="standard-select-condition"
          select
          fullWidth
          label="Department"
          value={role}
          name="user[department]"
          validators={['required']}
          errorMessages={['Please add a department to the user!']}
          onChange={handleDepartmentChange}
        >
          {departments.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
         </TextValidator>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
      {/* EDIT USER DIALOG */}
{/* <Dialog open={openEditUser} onClose={handleCloseEditUser} aria-labelledby="form-dialog-title">
<ValidatorForm
            ref={form2}
            onSubmit={onEditedUserSubmit}
            onError={errors => console.log(errors)}>
          <DialogTitle id="form-dialog-title">Edit User</DialogTitle> */}
          <Dialog open={openEditUser} onClose={handleCloseEditUser} aria-labelledby="form-dialog-title">
<ValidatorForm
            ref={form2}
            onSubmit={onEditedUserSubmit}
            onError={errors => console.log(errors)}>
        <DialogTitle id="form-dialog-title">USER MODIFICATION</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please change any fields to edit {editUser.name}
          </DialogContentText>
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="editUser[email]"
            autoComplete="email"
            autoFocus
            onChange={e => setEditUser({...editUser, email: e.target.value})}
            value={editUser.email}
            validators={['required']}
            errorMessages={['Please add an e-mail address to the user!']}
            />
   {/* <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            label="Password"
            name="user[password]"
            onChange={e => setUser({...user, password: e.target.value})}
            value={user.password}
            validators={['required']}
            errorMessages={['Please add a password to the user!']}
            autoFocus
          /> */}
          <TextValidator
          variant="outlined"
          id="standard-select-condition"
          select
          fullWidth
          label="System Role"
          value={editUser.role || ''}
          name="editUser[role]"
          validators={['required']}
          errorMessages={['Please add a system role to the user!']}
          onChange={handleRoleChangeEditUser}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextValidator>
        <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            type="text"
            label="Full name"
            name="editUser[name]"
            onChange={e => setEditUser({...editUser, name: e.target.value})}
            value={editUser.name}
            validators={['required']}
            errorMessages={['Please add a name to the user!']}
            autoFocus
          />
           <TextValidator
          variant="outlined"
          id="standard-select-condition"
          select
          fullWidth
          label="Department"
          value={editUser.department}
          name="editUser[department]"
          validators={['required']}
          errorMessages={['Please add a department to the user!']}
          onChange={handleDepartmentChangeEditUser}
        >
          {departments.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
         </TextValidator> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditUser} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
  
        </Container>
        </div>
        </div>
    )
}