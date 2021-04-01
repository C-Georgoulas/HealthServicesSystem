import React, { useState, useEffect, useContext }from 'react'
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
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { UserContext } from './UserContext'


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    table: {
      minWidth: 650,
    },
    appBar: {
      maxWidth: 400,
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
  
  export default function DataTable(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedB: false,
        label: 'Show Inactive Patients'
      });

    const [drugs, setDrugs] = useState([

    ])  

  // GET/Fetch all patients, listener for patients

    useEffect(() => {
        fetch('api/drugs/')
        .then(response => response.json())
        .then(json => setDrugs(json))

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

//   const [searching, setSearching] = React.useState('Patients');

//   const handleChange = (event) => {
//     setSearching(event.target.value);
//     console.log(searching);
//   };

//   const [searched, setSearched] = React.useState("")

//   const [previousState, setPreviousState] = React.useState([])

//   const requestSearch = (searchedVal) => {
//     if (searching === "Patients") {
//     const filteredPatients = prescriptions.filter((prescription) => {
//       return prescription.name.toLowerCase().includes(searchedVal.toLowerCase());
//     });

//     setPrescriptions((prevState) => {
//       if (previousState.length == 0) {
//         setPreviousState(prevState)
//       }
//     return filteredPatients 
// });
//   } else if (searching === "Doctors") {
//     const filteredPatients = prescriptions.filter((prescription) => {
//       return prescription.doctor.toLowerCase().includes(searchedVal.toLowerCase());
//     });

//     setPrescriptions((prevState) => {
//       if (previousState.length == 0) {
//         setPreviousState(prevState)
//       }
//     return filteredPatients 
// });
//   } else {
//       console.log("something went wrong");
//   }
    
//   };


//   const cancelSearch = () => {
//     setSearched("");
//     setPrescriptions(previousState);
//     // requestSearch(searched);
//   };

const [open, setOpen] = React.useState(null);

const handleSelect = (id) => {
  setOpen(currentId => {
    // if it's already opened then unselect it
    if (currentId === id) return null
    return id
  })
}

const deleteDrug = (drugID) => {
  fetch('api/drugs/' + drugID, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(props.history.go(0))
  console.log(drugID + "HELLO!!!")
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const {user, setUser} = useContext(UserContext);


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
          <Tab label="All Medications" {...a11yProps(0)} />
          <Tab label="Department Medications" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {/* <br></br>
      <div className={classes.searchContainer}>
      <SearchBar className={classes.searchBar}
    value={searched}
    cancelOnEscape={true}
    onChange={(searchVal) => requestSearch(searchVal)}
    onCancelSearch={() => cancelSearch()}
  />
  <FormControl variant="outlined" className={classes.filterBar}>
        <InputLabel id="demo-simple-select-outlined-label">Search Filter</InputLabel>
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
      </div> */}
  <br></br>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
      <TabPanel value={value} index={0}>
      {/* overflow hides the scrollbar at the table on patient GET/POST/UPDATE/DELETE */}
      <TableContainer component={Paper} style={{overflow: "hidden"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><strong>Pharmaceutical Drug</strong></TableCell>
            <TableCell align="right"><strong>Drug Class</strong></TableCell>
            <TableCell align="right"><strong>Adult Dosage</strong></TableCell>
            <TableCell align="right"><strong>Pediatric Dosage</strong></TableCell>
            <TableCell align="right"><strong>Administration</strong></TableCell>
            { user.role === "admin" &&
            <TableCell align="right"><strong>Actions</strong></TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {drugs.map((drug) => (
            <>
        <TableRow key={drug._id}>
            <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => handleSelect(drug._id)}>
  {open === drug._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
</IconButton>
        </TableCell>
              <TableCell>{drug.name}</TableCell>
              <TableCell align="right">{capitalizeFirstLetter(drug.class)}</TableCell>
              <TableCell align="right">{drug.suggestedDoseAdult}</TableCell>
              <TableCell align="right">{drug.suggestedDosePediatric}</TableCell>
              <TableCell align="right">{drug.administered}</TableCell>
              { user.role === "admin" &&
              <TableCell align="right">
              <Tooltip title="Delete">
                          <IconButton aria-label="delete" onClick={()=>deleteDrug(drug._id)}>
                            <DeleteIcon />
                          </IconButton>
                         </Tooltip> 
              </TableCell>
              }
            </TableRow>
            <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open === drug._id } timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h7" gutterBottom component="div">
                {drug.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </TabPanel>
    <TabPanel value={value} index={1}>
      my department drugs
    </TabPanel>
      </SwipeableViews>
      </Container>
      </div>
    );
  }

