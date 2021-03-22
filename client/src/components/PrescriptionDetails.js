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




export default function PrescriptionDetails({match}, props) {

//---------

// declaring state for the specific patient
const [prescription, setPrescription] = useState ({})

// ensure to add the "/" infront of api/patients, so end result is /api/patients so it doesnt get affected by router
// GET/Fetch specific patient,findByID
// fetches for updates continuously, might have to fix it in the future

useEffect(() => {
    console.log(match.params.id);
    fetch(`/api/patients/prescriptions/${match.params.id}`)
    .then(response => response.json())
    .then(json => setPrescription(json))

}, [prescription])

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
  // for form validation in notes
  const form = useRef();
  const form2 = useRef();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const expirationCalculation = (prescriptionDate) => {
    let expirationDate = new Date (prescriptionDate)
    expirationDate.setDate(expirationDate.getDate() + prescription.prescriptionExpirationDate);
    return expirationDate;
  }
    return (
      <div>
        <Nav/>
        <br></br>
        <Container maxWidth="md">
            {/* MAIN DETAILS */}
            <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h6" component="h2">
         PRESCRIPTION DETAILS
      </Typography>
      <Divider />
      <Typography className={classes.title} color="textSecondary" gutterBottom>
          NAME
        </Typography>
        <Typography variant="body2" component="p">
          {prescription.name}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          DIAGNOSIS
        </Typography>
        <Typography variant="body2" component="p">
          {prescription.diagnosis}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          DOSAGE PLAN
        </Typography>
        <Typography variant="body2" component="p">
          {prescription.prescriptionExpirationDate + " " + "days"}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          ISSUING DATE
        </Typography>
        <Typography variant="body2" component="p">
        {new Date(prescription.prescriptionDate).toDateString()}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          EXPIRATION DATE
        </Typography>
        {prescription.prescriptionDate != undefined &&
        <Typography variant="body2" component="p">
        {expirationCalculation(prescription.prescriptionDate).toDateString()}
       </Typography>
        }
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          ISSUING DOCTOR
        </Typography>
        { prescription.author && prescription.author.name != undefined &&
        <Typography variant="body2" component="p">
          {prescription.author.name}
        </Typography>
          }
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Pharmaceutical Drug
        </Typography>
        <Typography variant="body2" component="p">
        {prescription.drug}
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Pharmaceutical Drug Class
        </Typography>
        <Typography variant="body2" component="p">
          { prescription.class != undefined &&
        capitalizeFirstLetter(prescription.class)
          }
        </Typography>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Dosage
        </Typography>
        <Typography variant="body2" component="p">
        {prescription.dose}
        </Typography>
        <Divider />
      </CardContent>
    </Card>
<br></br>
</Container>
</div>
    )
}