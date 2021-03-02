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
import SearchBar from 'material-ui-search-bar'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'




const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    table: {
      width: "100%",
    },
    appBar: {
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

    const [patients, setPatients] = useState([

    ])  

  // GET/Fetch all patients, listener for patients

    useEffect(() => {
        fetch('api/patients')
        .then(response => response.json())
        .then(json => setPatients(json))

    }, [])

// DELETE patient on click event on line 177

  const deletePatient = (patientID) => {
      fetch('api/patients/' + patientID, {
        method: 'DELETE',
      })
      .then(response => response.json())
      console.log(patientID + "HELLO!!!")
  };



  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searching, setSearching] = React.useState('Patients');

  const handleChange = (event) => {
    setSearching(event.target.value);
    console.log(searching);
  };


  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // declaring state for searched value to be passed to requestSearch from the SearchBar component

  const [searched, setSearched] = React.useState("")

  // declaring state in order to keep state that was there prior to searching
  // that way we return to the original state without having to refresh, when we are done searching

  const [previousState, setPreviousState] = React.useState([])

  // request search function that filters the search based on "searching" value (doctors/patients)
  // basic .includes function that returns the filtered patients on real time
  // we also set the previous state to the original patients state before searching, if the previousState.length equals to 0, which means
  // that we havent searched for anything yet

  const requestSearch = (searchedVal) => {
    if (searching === "Patients") {
    const filteredPatients = patients.filter((patient) => {
      return patient.fullName.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setPatients((prevState) => {
      if (previousState.length == 0) {
        setPreviousState(prevState)
      }
    return filteredPatients 
});
  } else if (searching === "Doctors") {
    const filteredPatients = patients.filter((patient) => {
      return patient.supervisor.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setPatients((prevState) => {
      if (previousState.length == 0) {
        setPreviousState(prevState)
      }
    return filteredPatients 
});
  } else {
      console.log("something went wrong");
  }
    
  };

  // we cancel the search and set the patients to the original state through previousState


  const cancelSearch = () => {
    setSearched("");
    setPatients(previousState);
    // requestSearch(searched);
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
        <Tabs value={value} onChange={handleTabsChange} aria-label="simple tabs example">
          <Tab label="Active Patients" {...a11yProps(0)} />
          <Tab label="Inactive Patients" {...a11yProps(1)} />
          <Tab label="My Patients" {...a11yProps(2)} />
          <Tab label="Department Patients" {...a11yProps(2)} />
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
      {/* overflow hides the scrollbar at the table on patient GET/POST/UPDATE/DELETE */}
      <TableContainer className={classes.table} component={Paper} style={{overflow: "hidden"}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell align="right"><strong>Age</strong></TableCell>
            <TableCell align="right"><strong>Condition</strong></TableCell>
            <TableCell align="right"><strong>Diagnosis</strong></TableCell>
            <TableCell align="right"><strong>Supervising Doctor</strong></TableCell>
            <TableCell align="right"><strong>Status</strong></TableCell>
            <TableCell align="center"><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
                        <>
          {patient.status === "Active" &&         
        <Slide direction="up" in={patients} mountOnEnter unmountOnExit>
        <TableRow key={patient._id}>
              <TableCell>{patient.fullName}</TableCell>
              <TableCell align="right">{patient.age}</TableCell>
              <TableCell align="right">{patient.condition}</TableCell>
              <TableCell align="right">{patient.diagnosis}</TableCell>
              <TableCell align="right">{patient.supervisor}</TableCell>
              <TableCell align="right">{patient.status}</TableCell>
              <TableCell align="center">
                  <Tooltip title="Details">
                        <IconButton aria-label="details" component={Link} to={`/patients/${patient._id}`}>
                            <PersonPinIcon />
                         </IconButton>
                        </Tooltip> 
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete" onClick={()=>deletePatient(patient._id)}>
                            <DeleteIcon />
                          </IconButton>
                         </Tooltip> 
              </TableCell>
            </TableRow>
            </Slide>
            }
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TableContainer component={Paper} style={{overflow: "hidden"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell align="right"><strong>Age</strong></TableCell>
            <TableCell align="right"><strong>Condition</strong></TableCell>
            <TableCell align="right"><strong>Diagnosis</strong></TableCell>
            <TableCell align="right"><strong>Supervising Doctor</strong></TableCell>
            <TableCell align="right"><strong>Status</strong></TableCell>
            <TableCell align="center"><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
                        <>
          {patient.status === "Inactive" &&         
        <Slide direction="up" in={patients} mountOnEnter unmountOnExit>
        <TableRow key={patient._id}>
              <TableCell>{patient.fullName}</TableCell>
              <TableCell align="right">{patient.age}</TableCell>
              <TableCell align="right">{patient.condition}</TableCell>
              <TableCell align="right">{patient.diagnosis}</TableCell>
              <TableCell align="right">{patient.supervisor}</TableCell>
              <TableCell align="right">{patient.status}</TableCell>
              <TableCell align="center">
                  <Tooltip title="Details">
                        <IconButton aria-label="details" component={Link} to={`/patients/${patient._id}`}>
                            <PersonPinIcon />
                         </IconButton>
                        </Tooltip> 
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete" onClick={()=>deletePatient(patient._id)}>
                            <DeleteIcon />
                          </IconButton>
                         </Tooltip> 
              </TableCell>
            </TableRow>
            </Slide>
            }
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        hello from my patients only
      </TabPanel>
      <TabPanel value={value} index={3}>
        hello from department only patients
      </TabPanel>
      </SwipeableViews>
      </Container>
      </div>
    );
  }

