import React, { useState, useEffect }from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Nav from './Nav'
import { TransitionGroup } from 'react-transition-group';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import {Link} from 'react-router-dom';
import NoteAddIcon from '@material-ui/icons/NoteAdd';



const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    table: {
      minWidth: 650,
    },
    appBar: {
      backgroundColor: "black",
    },
}))


  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
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
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function DataTable() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedB: false,
        label: 'Show Inactive Patients'
      });

    const [prescriptions, setPrescriptions] = useState([

    ])  

  // GET/Fetch all patients, listener for patients

    useEffect(() => {
        fetch('api/patients/prescriptions')
        .then(response => response.json())
        .then(json => setPrescriptions(json))

    }, [prescriptions])

// DELETE patient on click event on line 177

//   const deletePatient = (patientID) => {
//       fetch('api/patients/' + patientID, {
//         method: 'DELETE',
//       })
//       .then(response => response.json())
//       console.log(patientID + "HELLO!!!")
//   };



  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleChangeIndex = (index) => {
    setValue(index);
  };

    return (
      <div>
        <Nav/>
        <br></br>
      <Container maxWidth="md">
          {/* <div style={{display: 'inline-flex'}}>
          <Button startIcon={<LocalHospitalIcon />} color="primary" variant="outlined" className={classes.button}>Add</Button>
          <span style={{marginLeft: "550px", marginTop: "8px"}}>
      </span>
      </div> */}
      <AppBar position="static" className={classes.appBar}>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
      {/* overflow hides the scrollbar at the table on patient GET/POST/UPDATE/DELETE */}
      <TableContainer component={Paper} style={{overflow: "hidden"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Patient</strong></TableCell>
            <TableCell align="right"><strong>Patient Diagnosis</strong></TableCell>
            <TableCell align="right"><strong>Issuing Date</strong></TableCell>
            <TableCell align="right"><strong>Issuing Doctor</strong></TableCell>
            <TableCell align="right"><strong>Pharmaceutical Drug</strong></TableCell>
            <TableCell align="center"><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prescriptions.map((prescription) => (
        <Slide direction="up" in={prescriptions} mountOnEnter unmountOnExit>
        <TableRow key={prescription._id}>
              <TableCell>{prescription.name}</TableCell>
              <TableCell align="right">{prescription.diagnosis}</TableCell>
              <TableCell align="right">{new Date(prescription.prescriptionDate).toDateString()}</TableCell>
              <TableCell align="right">{prescription.doctor}</TableCell>
              <TableCell align="right">{prescription.drug}</TableCell>
              <TableCell align="center">
                  <Tooltip title="Details">
                        <IconButton aria-label="details" component={Link} to={`/prescriptions/${prescription._id}`}>
                            <NoteAddIcon />
                         </IconButton>
                        </Tooltip> 
              </TableCell>
            </TableRow>
            </Slide>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </SwipeableViews>
      </Container>
      </div>
    );
  }

