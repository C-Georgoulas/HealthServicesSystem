import React, { useState, useEffect }from 'react'
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



export default function PatientDetails({match}, props) {

//---------

// declaring state for the specific patient
const [patient, setPatient] = useState ({})

// declaring state for the notes
const [note, setNote] = useState({})

// declaring temporary state for the edit note
const [editNote, setEditNote] = useState({})

// ensure to add the "/" infront of api/patients, so end result is /api/patients so it doesnt get affected by router
// GET/Fetch specific patient,findByID
// fetches for updates continuously, might have to fix it in the future

useEffect(() => {
    fetch(`/api/patients/${match.params.id}`)
    .then(response => response.json())
    .then(json => setPatient(json))

}, [patient])

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
const [openEditNote, setOpenEditNote] = React.useState(false);

// id passes the selected note through the icon button modify into the editNote state

const handleClickOpenEditNote = (id) => {
  console.log("HERE IT IS")
  console.log(id)
  setEditNote(id);
  setOpenEditNote(true);
};

const handleCloseEditNote = () => {
  setOpenEditNote(false);
};

// Put request to edit the specific note of the patient

// BUGS: works properly with backend and updating but once you hit submit on the modal
// you get an error of cannot read property of title of undefined
// Fixed ^

const onEditedNoteSubmit = (e) => {
  e.preventDefault()
  fetch(`/api/patients/${match.params.id}/notes/${editNote._id}`, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({editNote}),
  })
  .then(res => res.json())
  .then(json => setNote(json.editNote))
}

 // Post request to add a note to patient

 // setNote sets the state of the notes so it the edited note appears

  const onNoteSubmit = (e) => {
    e.preventDefault()
    fetch(`/api/patients/${match.params.id}/notes`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({note}),
    })
    .then(res => res.json())
    .then(json => setNote(json.note))
  }

  // BUGS 12 NOVEMBER 2020: BACKEND CRASHES AFTER DELETING TOO MANY NOTES/PRESCRIPTIONS?
  // Doesnt happen on Patient.js though when deleting too many though?
  // Must be a problem with the backend

  // 15th NOVEMBER: problem seemed to be that I wasnt sending status 200 to server from patient.js

  // Delete request to remove a note from a patient

  const deleteNote = (noteID) => {
    fetch(`/api/patients/${patient._id}/notes/${noteID}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
};

//--------- EVERYTHING RELATED TO PRESCRIPTION FUNCTIONALITY

  // Delete request to remove a prescription from a patient

const deletePrescription = (prescriptionID) => {
  fetch(`/api/patients/${patient._id}/prescriptions/${prescriptionID}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
};

const history = useHistory();

const [editPatient, setEditPatient] = React.useState({

})

const onDeactivePatientSubmit = (e) => {
    e.preventDefault()
   let updatedPatient = {
     ...patient,
     status: 'Inactive',
   }
  fetch(`/api/patients/${patient._id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({editPatient: updatedPatient})
  })
  .then(res => res.json())
  .then(data => {
    setPatient(updatedPatient)
  })
}

const onActivatePatientSubmit = (e) => {
  e.preventDefault()
 let updatedPatient = {
   ...patient,
   status: 'Active',
 }
fetch(`/api/patients/${patient._id}`, {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({editPatient: updatedPatient})
})
.then(res => res.json())
.then(data => {
  setPatient(updatedPatient)
})
}


//---------

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
    noteActionPos: {
      top: '30%'
    }
  });

  const classes = useStyles();

    return (
        <Container maxWidth="md">
            {/* MAIN DETAILS */}
            <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h6" component="h2">
         PATIENT DETAILS - <span>{patient.status}</span>
      </Typography>
      <Divider />
      <Typography className={classes.title} color="textSecondary" gutterBottom>
          NAME
        </Typography>
        <Typography variant="body2" component="p">
          {patient.fullName}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          AGE
        </Typography>
        <Typography variant="body2" component="p">
          {patient.age}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          ADMISSION DATE
        </Typography>
        <Typography variant="body2" component="p">
          {patient.admissionDate}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          CONDITION
        </Typography>
        <Typography variant="body2" component="p">
          {patient.condition}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          DIAGNOSIS
        </Typography>
        <Typography variant="body2" component="p">
          {patient.diagnosis}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          SUPERVISING DOCTOR
        </Typography>
        <Typography variant="body2" component="p">
          {patient.supervisor}
        </Typography>
        <Divider />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="outlined" onClick={handleClickOpen}>ADD A NOTE</Button>
        <Button size="small" color="primary" variant="outlined" component={Link} to={`/patients/${patient._id}/prescription/new`}>ADD A PRESCRIPTION</Button>
        <Button size="small" color="primary" variant="outlined" component={Link} to=
                        {
                          {
                          pathname: `/patients/${patient._id}/edit`,
                          state: {passedPatientId: patient._id}
                        }
                          }>MODIFY INFORMATION</Button>
        { patient.status === "Active" &&
        <Button size="small" color="primary" variant="outlined" onClick={onDeactivePatientSubmit}>DE-ACTIVATE PATIENT</Button>
        }
        { patient.status === "Inactive" &&
        <Button size="small" color="primary" variant="outlined" onClick={onActivatePatientSubmit}>ACTIVATE PATIENT</Button>
        }
      </CardActions>
    </Card>
<br></br>
{/* PRESCRIPTIONS TABLE */}

<TableContainer component={Paper} style={{overflow: "hidden"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Prescription</strong></TableCell>
            <TableCell align="right"><strong>Class</strong></TableCell>
            <TableCell align="right"><strong>Treatment Dose</strong></TableCell>
            <TableCell align="right"><strong>Doctor</strong></TableCell>
            <TableCell align="right"><strong>Diagnosis</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {patient.prescriptions && patient.prescriptions.map((prescription) => (
        <TableRow key={prescription._id}>
              <TableCell>{prescription.drug}</TableCell>
              <TableCell align="right">{prescription.class}</TableCell>
              <TableCell align="right">{prescription.dose}</TableCell>
              <TableCell align="right">{prescription.doctor}</TableCell>
              <TableCell align="center">{prescription.diagnosis}</TableCell>
              <TableCell align="center">
                  <Tooltip title="Modify">
                        <IconButton aria-label="modify" component={Link} to=
                        {
                          {
                          pathname: `/patients/${patient._id}/prescription/${prescription._id}/edit`,
                          state: {passedPatientId: patient._id}
                        }
                          }>
                            <EditIcon />
                         </IconButton>
                        </Tooltip> 
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete" onClick={()=>deletePrescription(prescription._id)}>
                            <DeleteIcon />
                          </IconButton>
                         </Tooltip> 
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* COMMENTS / NOTES BY OTHER DOCTORS/STAFF */}
    {patient.notes && patient.notes.map((note) => (
    <List className={classes.root} key={note._id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={note.username} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={note.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              {note.username}
              </Typography>
              {` — ${note.text}`}
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction className={classes.noteActionPos}>
        <Tooltip title="Modify">
                        <IconButton aria-label="modify" size="small" onClick={() => handleClickOpenEditNote(note)}>
                            <EditIcon />
                         </IconButton>
                        </Tooltip> 
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete" size="small" onClick={()=>deleteNote(note._id)}>
                            <DeleteIcon />
                          </IconButton>
                         </Tooltip> 
        </ListItemSecondaryAction>
      </ListItem>
      <Divider/>
    </List>
    ))}

{/* ADD A NOTE DIALOG */}

<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
<form className={classes.root} noValidate autoComplete="off" onSubmit={onNoteSubmit}>
        <DialogTitle id="form-dialog-title">NOTE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a medical note to {patient.fullName}, please fill out the form below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="note[title]"
            onChange={e => setNote({...note, title: e.target.value})}
            label="Title"
            type="text"
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="description"
            name="note[text]"
            onChange={e => setNote({...note, text: e.target.value})}
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
          <Button type="submit" onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
        </form>
      </Dialog>

      {/* EDIT NOTE */}

      <Dialog open={openEditNote} onClose={handleCloseEditNote} aria-labelledby="form-dialog-title">
<form className={classes.root} noValidate autoComplete="off" onSubmit={onEditedNoteSubmit}>
        <DialogTitle id="form-dialog-title">EDIT NOTE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the medical note for {patient.fullName}, please fill out the form below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={editNote.title}
            id="title"
            name="note[title]"
            onChange={e => setEditNote({...editNote, title: e.target.value})}
            label="Title"
            type="text"
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="description"
            name="note[text]"
            value={editNote.text}
            onChange={e => setEditNote({...editNote, text: e.target.value})}
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditNote} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleCloseEditNote} color="primary">
            Save
          </Button>
        </DialogActions>
        </form>
      </Dialog>




</Container>
    )
}