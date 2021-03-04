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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import SearchBar from 'material-ui-search-bar'


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    table: {
      minWidth: 650,
    },
    appBar: {
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "black",
    },
    searchBar: {
      width: "70%",
    },
    filterBar: {
      backgroundColor: "white",
      width: "30%",
      marginLeft: "1%",
    },
    searchContainer: {
      display: "flex",
      width: "100%",
      }
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

    }, [])

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

  const [searching, setSearching] = React.useState('Patients');

  const handleChange = (event) => {
    setSearching(event.target.value);
    console.log(searching);
  };

  const [searched, setSearched] = React.useState("")

  const [previousState, setPreviousState] = React.useState([])

  const requestSearch = (searchedVal) => {
    if (searching === "Patients") {
    const filteredPatients = prescriptions.filter((prescription) => {
      return prescription.name.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setPrescriptions((prevState) => {
      if (previousState.length == 0) {
        setPreviousState(prevState)
      }
    return filteredPatients 
});
  } else if (searching === "Doctors") {
    const filteredPatients = prescriptions.filter((prescription) => {
      return prescription.doctor.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setPrescriptions((prevState) => {
      if (previousState.length == 0) {
        setPreviousState(prevState)
      }
    return filteredPatients 
});
  } else {
      console.log("something went wrong");
  }
    
  };


  const cancelSearch = () => {
    setSearched("");
    setPrescriptions(previousState);
    // requestSearch(searched);
  };


  const datePrescription = (prescriptionDate, prescriptionExpirationDate) => {
    let prescriptionIssueDate = new Date(prescriptionDate)
    // add the days the prescription is meant to be active of to the original prescription date
    prescriptionIssueDate.setDate(prescriptionIssueDate.getDate() + prescriptionExpirationDate);
    // get current time
    let currentDate = new Date()

 // compare current date with expiration to determine if the prescription has expired
    if (currentDate > prescriptionIssueDate) {
      return "Expired"
    } else {
      return "Active"
    }
  }

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
      <Tabs value={value} onChange={handleTabsChange} aria-label="simple tabs example">
          <Tab label="Active Prescriptions" {...a11yProps(0)} />
          <Tab label="All Prescriptions" {...a11yProps(1)} />
          <Tab label="My Prescriptions" {...a11yProps(2)} />
          <Tab label="Expired Prescriptions" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <br></br>
      <div className={classes.searchContainer}>
      <SearchBar className={classes.searchBar}
    value={searched}
    cancelOnEscape={true}
    onChange={(searchVal) => requestSearch(searchVal)}
    onCancelSearch={() => cancelSearch()}
  />
  <FormControl variant="outlined" className={classes.filterBar}>
        {/* <InputLabel id="demo-simple-select-outlined-label">Search Filter</InputLabel> */}
        <Select style={{ height: 49 }}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={searching}
          onChange={handleChange}
        >
          <MenuItem value={"Patients"}>Patients</MenuItem>
          <MenuItem value={"Doctors"}>Doctors</MenuItem>
        </Select>
      </FormControl>
      </div>
  <br></br>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
      <TabPanel value={value} index={0}>
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
        {
    prescriptions
        .filter((prescription) => {
            return datePrescription(
                prescription.prescriptionDate,
                prescription.prescriptionExpirationDate
            ) === 'Active';
        })
        .map((prescription) => (
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
    </TabPanel>
      <TabPanel value={value} index={1}>
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
    </TabPanel>
    <TabPanel value={value} index={2}>
      my prescriptions here
    </TabPanel>
    <TabPanel value={value} index={3}>
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
        {
    prescriptions
        .filter((prescription) => {
            return datePrescription(
                prescription.prescriptionDate,
                prescription.prescriptionExpirationDate
            ) === 'Expired';
        })
        .map((prescription) => (
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
    </TabPanel>
      </SwipeableViews>
      </Container>
      </div>
    );
  }

