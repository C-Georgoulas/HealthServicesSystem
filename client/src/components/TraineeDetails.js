import React, { useState, useEffect, useRef }from 'react'
import Nav from './Nav'
// importing the main container
import Container from '@material-ui/core/Container';
// main card import that holds patient details and the action buttons
// ------------------------
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// importing the button from material ui
import Button from '@material-ui/core/Button';
// ------------------------
// styles for the components from material ui
import { makeStyles } from '@material-ui/core/styles';
// standard text from material ui
import Typography from '@material-ui/core/Typography';
// replacement for the classic <hr> from material ui
import Divider from '@material-ui/core/Divider';
// Table
// ------------------------
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// ------------------------
// Icons for the buttons
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// ------------------------
// Tooltip which shows details about an action on hover
import Tooltip from '@material-ui/core/Tooltip';
// From table
import Paper from '@material-ui/core/Paper';
// List from Material UI
// ------------------------
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
// ------------------------
// Dialog component from Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
//---------
import {Link} from 'react-router-dom';
import {useLocation, useHistory} from 'react-router';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';



export default function TraineeDetails({match}, props) {

//---------

// declaring state for the specific patient
const [trainee, setTrainee] = useState ({})

// declaring state for the grades
const [grade, setGrade] = useState({})

// declaring temporary state for the edit grade
const [editGrade, setEditGrade] = useState({})

const [mark, setMark] = useState ([])

// ensure to add the "/" infront of api/patients, so end result is /api/patients so it doesnt get affected by router
// GET/Fetch specific patient,findByID
// fetches for updates continuously, might have to fix it in the future

useEffect(() => {
  fetch(`/api/trainees/${match.params.id}`)
  .then(response => response.json())
  .then(json => {
    setTrainee(json);
    setMark(json.grades.map(grade => grade.mark));
  })
}, [])

//--------- EVERYTHING RELATED TO NOTES FUNCTIONALITY
// Dialog 
const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// Edit Dialog 
const [openEditGrade, setOpenEditGrade] = React.useState(false);

// id passes the selected note through the icon button modify into the editNote state

const handleClickOpenEditGrade = (id) => {
  console.log("HERE IT IS")
  console.log(id)
  setEditGrade(id);
  setOpenEditGrade(true);
};

const handleCloseEditGrade = () => {
  setOpenEditGrade(false);
};

// Put request to edit the specific note of the patient

const onEditedGradeSubmit = (e) => {
  e.preventDefault()
  fetch(`/api/trainees/${match.params.id}/grades/${editGrade._id}`, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({editGrade}),
  })
  .then(res => res.json())
  // .then(json => setEditNote({
  //   title: "",
  //   text: ""
  // }))
  .then(setOpenEditGrade(false));
}

 // Post request to add a note to patient

 // setNote sets the state of the notes so it the edited note appears

  const onGradeSubmit = (e) => {
    e.preventDefault()
    fetch(`/api/trainees/${match.params.id}/grades`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({grade: grade}),
    })
    .then(res => res.json())
    .then(json => setGrade({
      title: "",
      text: ""
    }))
    .then(setOpen(false));
  }

  // Delete request to remove a note from a patient

  const deleteGrade = (gradeID) => {
    fetch(`/api/trainees/${trainee._id}/grades/${gradeID}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
};

//--------- EVERYTHING RELATED TO PRESCRIPTION FUNCTIONALITY

const history = useHistory();

const [editTrainee, setEditTrainee] = React.useState({

})

const onDeactiveTraineeSubmit = (e) => {
    e.preventDefault()
   let updatedTrainee = {
     ...trainee,
     status: 'Inactive',
   }
  fetch(`/api/trainees/${trainee._id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({editTrainee: updatedTrainee})
  })
  .then(res => res.json())
  .then(data => {
    setTrainee(updatedTrainee)
  })
}

const onActivateTraineeSubmit = (e) => {
  e.preventDefault()
 let updatedTrainee = {
   ...trainee,
   status: 'Active',
 }
fetch(`/api/trainees/${trainee._id}`, {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({editTrainee: updatedTrainee})
})
.then(res => res.json())
.then(data => {
  setTrainee(updatedTrainee)
})
}

function arrayAverage(arr){
  //Find the sum
  var sum = 0;
  for(var i in arr) {
      sum += arr[i];
  }
  //Get the length of the array
  var numbersCnt = arr.length;
  //Return the average / mean.
  return (sum / numbersCnt);
}


//---------

//------- surgery functionality

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

//---------

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 150,
    },
    rootTab: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
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
    noteActionPos: {
      top: '30%'
    }
  }));

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const classes = useStyles();
  // for form validation in notes
  const form = useRef();
  const form2 = useRef();



    return (
      <div>
        <Nav/>
        <br></br>
        <Container maxWidth="md">
            {/* MAIN DETAILS */}
            <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h6" component="h2">
         TRAINEE DETAILS - <span>{trainee.status}</span>
      </Typography>
      <Divider />
      <Typography className={classes.title} color="textSecondary" gutterBottom>
          NAME
        </Typography>
        <Typography variant="body2" component="p">
          {trainee.fullName}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          AGE
        </Typography>
        <Typography variant="body2" component="p">
          {trainee.age}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          SEX
        </Typography>
        <Typography variant="body2" component="p">
          {trainee.sex}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          START DATE
        </Typography>
        <Typography variant="body2" component="p">
        {new Date(trainee.startDate).toDateString()}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          AVERAGE GRADE
        </Typography>
        <Typography variant="body2" component="p">
          {arrayAverage(mark)}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          END DATE
        </Typography>
        <Typography variant="body2" component="p">
        {new Date(trainee.endDate).toDateString()}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          ASSIGNED INSTRUCTOR
        </Typography>
        { trainee.author && trainee.author.name != undefined &&
        <Typography variant="body2" component="p">
          {trainee.author.name}
        </Typography>
        }
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          ASSIGNED DEPARTMENT
        </Typography>
        <Typography variant="body2" component="p">
          {trainee.department}
        </Typography>
        <Divider />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="outlined" onClick={handleClickOpen}>ADD A GRADE REPORT</Button>
        {/* <Button size="small" color="primary" variant="outlined" component={Link} to={`/patients/${trainee._id}/prescription/new`}>ADD A PRESCRIPTION</Button> */}
        <Button size="small" color="primary" variant="outlined" component={Link} to=
                        {
                          {
                          pathname: `/trainees/${trainee._id}/edit`,
                          state: {passedTraineeId: trainee._id}
                        }
                          }>MODIFY INFORMATION</Button>
        { trainee.status === "Active" &&
        <Button size="small" color="primary" variant="outlined" onClick={onDeactiveTraineeSubmit}>DE-ACTIVATE TRAINEE</Button>
        }
        { trainee.status === "Inactive" &&
        <Button size="small" color="primary" variant="outlined" onClick={onActivateTraineeSubmit}>ACTIVATE TRAINEE</Button>
        }
      </CardActions>
    </Card>
<br></br>
    {/* COMMENTS / NOTES BY OTHER DOCTORS/STAFF */}
    <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h6" component="h2">
         TRAINEE GRADE REPORTS
      </Typography>
      <Divider/>
      {trainee.grades &&  trainee.grades.length > 0 &&
      <>
    {trainee.grades && trainee.grades.map((grade) => (
    <List className={classes.root} key={grade._id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          { grade.author && grade.author.name != undefined &&
          <Avatar alt={grade.author.name} src="/static/images/avatar/1.jpg" />
          } 
          { !grade.author &&
          <Avatar alt="" src="/static/images/avatar/1.jpg" />
          } 
        </ListItemAvatar>
        <ListItemText
          primary={`${grade.title} — ${grade.mark}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {grade.author && grade.author.name != undefined &&
                <>
              {capitalizeFirstLetter(grade.author.role) + " " + "(" + grade.author.department +")"} {" " + grade.author.name}
              </>
          }
              </Typography>
              {` — ${grade.text}`}
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction className={classes.noteActionPos}>
        <Tooltip title="Modify">
                        <IconButton aria-label="modify" size="small" onClick={() => handleClickOpenEditGrade(grade)}>
                            <EditIcon />
                         </IconButton>
                        </Tooltip> 
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete" size="small" onClick={()=>deleteGrade(grade._id)}>
                            <DeleteIcon />
                          </IconButton>
                         </Tooltip> 
        </ListItemSecondaryAction>
      </ListItem>
      <Divider/>
    </List>
    ))}
    </>
  }
      {trainee.grades &&  trainee.grades.length == 0 &&
        <Typography>
        There's no grade reports on {trainee.fullName} yet!
     </Typography>
        }
    </CardContent>
    </Card>

{/* ADD A NOTE DIALOG */}

<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
<ValidatorForm
            ref={form}
            onSubmit={onGradeSubmit}
            onError={errors => console.log(errors)}>
        <DialogTitle id="form-dialog-title">GRADE REPORT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a grade report to {trainee.fullName}, please fill out the form below.
          </DialogContentText>
          <TextValidator
            autoFocus
            margin="dense"
            id="title"
            name="grade[title]"
            onChange={e => setGrade({...grade, title: e.target.value})}
            value={grade.title}
            validators={['required']}
            errorMessages={['Please add a title to your grade report!']}
            label="Title"
            type="text"
            fullWidth
          />
          <TextValidator
        margin="dense"
        fullWidth
        id="standard-basic" 
        label="Grade" 
        type="number"
        name="grade[mark]"
        onChange={e => setGrade({...grade, mark: e.target.value})}
        value={grade.mark}
        validators={['required']}
        errorMessages={['Please add the grade of the trainee!']}
        />
           <TextValidator
            margin="dense"
            id="description"
            name="grade[text]"
            onChange={e => setGrade({...grade, text: e.target.value})}
            value={grade.text}
            validators={['required']}
            errorMessages={['Please add text to your grade!']}
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
        </ValidatorForm>
        {/* </form> */}
      </Dialog>

      {/* EDIT NOTE */}

      <Dialog open={openEditGrade} onClose={handleCloseEditGrade} aria-labelledby="form-dialog-title">
      <ValidatorForm
            ref={form2}
            onSubmit={onEditedGradeSubmit}
            onError={errors => console.log(errors)}>
        <DialogTitle id="form-dialog-title">EDIT GRADE REPORT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the grade report for {trainee.fullName}, please fill out the form below.
          </DialogContentText>
          <TextValidator
            margin="dense"
            value={editGrade.title}
            id="title"
            name="grade[title]"
            onChange={e => setEditGrade({...editGrade, title: e.target.value})}
            validators={['required']}
            errorMessages={['Please add a title to your grade!']}
            label="Title"
            type="text"
            fullWidth
          />
          <TextValidator
        margin="dense"
        fullWidth
        id="standard-basic" 
        label="GRADE" 
        type="number"
        name="grade[mark]"
        onChange={e => setEditGrade({...editGrade, mark: e.target.value})}
        value={editGrade.mark}
        validators={['required']}
        errorMessages={['Please add the grade of the trainee!']}
        />
           <TextValidator
            margin="dense"
            id="description"
            name="grade[text]"
            value={editGrade.text}
            onChange={e => setEditGrade({...editGrade, text: e.target.value})}
            validators={['required']}
            errorMessages={['Please add a text to your grade!']}
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditGrade} color="primary">
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
    )
}