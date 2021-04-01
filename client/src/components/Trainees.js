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
import SearchBar from 'material-ui-search-bar'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import { UserContext } from './UserContext'




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
  
  export default function DataTable(props) {
    const classes = useStyles();

    const [trainees, setTrainees] = useState([

    ])  

  // GET/Fetch all trainees, listener for trainees

    useEffect(() => {
        fetch('/api/trainees')
        .then(response => response.json())
        .then(json => setTrainees(json))

    }, [])

// DELETE patient on click event on line 177

  const deleteTrainee = (traineeID) => {
      fetch('api/trainees/' + traineeID, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(props.history.go(0))
      console.log(traineeID + "HELLO!!!")
  };



  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searching, setSearching] = React.useState('Trainees');

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

  // request search function that filters the search based on "searching" value (doctors/trainees)
  // basic .includes function that returns the filtered trainees on real time
  // we also set the previous state to the original trainees state before searching, if the previousState.length equals to 0, which means
  // that we havent searched for anything yet

  const requestSearch = (searchedVal) => {
    if (searching === "Trainees") {
    const filteredTrainees = trainees.filter((trainee) => {
      return trainee.fullName.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setTrainees((prevState) => {
      if (previousState.length == 0) {
        setPreviousState(prevState)
      }
    return filteredTrainees
});
  } else if (searching === "Assigned Supervisors") {
    const filteredTrainees = trainees.filter((trainee) => {
      return trainee.author.name.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setTrainees((prevState) => {
      if (previousState.length == 0) {
        setPreviousState(prevState)
      }
    return filteredTrainees
});
  } else {
      console.log("something went wrong");
  }
    
  };

  // we cancel the search and set the trainees to the original state through previousState


  const cancelSearch = () => {
    setSearched("");
    setTrainees(previousState);
    // requestSearch(searched);
  };

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
          <Tab label="Active Trainees" {...a11yProps(0)} />
          <Tab label="Inactive Trainees" {...a11yProps(1)} />
          <Tab label="My Trainees" {...a11yProps(2)} />
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
          <MenuItem value={"Trainees"}>Trainees</MenuItem>
          <MenuItem value={"Assigned Supervisors"}>Assigned Supervisors</MenuItem>
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
            <TableCell align="right"><strong>Traineeship Start</strong></TableCell>
            <TableCell align="right"><strong>Average Grade</strong></TableCell>
            <TableCell align="right"><strong>Supervising Instructor</strong></TableCell>
            <TableCell align="right"><strong>Status</strong></TableCell>
            <TableCell align="center"><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainees.map((trainee) => (
                        <>
          {trainee.status === "Active" &&         
        <Slide direction="up" in={trainees} mountOnEnter unmountOnExit>
        <TableRow key={trainee._id}>
              <TableCell>{trainee.fullName}</TableCell>
              <TableCell align="right">
              {new Date(trainee.startDate).toDateString()}</TableCell>
              <TableCell align="right">{trainee.averageGrade}</TableCell>
              { trainee.author && trainee.author.name != undefined &&
              <TableCell align="right">{trainee.author.name}</TableCell>
              }
              <TableCell align="right">{trainee.status}</TableCell>
              <TableCell align="center">
                  <Tooltip title="Details">
                        <IconButton aria-label="details" component={Link} to={`/trainees/${trainee._id}`}>
                            <PersonPinIcon />
                         </IconButton>
                        </Tooltip> 
                        { user.role === "admin" && 
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete" onClick={()=>deleteTrainee(trainee._id)}>
                            <DeleteIcon />
                          </IconButton>
                         </Tooltip> 
                        }
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
      <TableContainer className={classes.table} component={Paper} style={{overflow: "hidden"}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell align="right"><strong>Traineeship Start</strong></TableCell>
            <TableCell align="right"><strong>Average Grade</strong></TableCell>
            <TableCell align="right"><strong>Supervising Instructor</strong></TableCell>
            <TableCell align="right"><strong>Status</strong></TableCell>
            <TableCell align="center"><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainees.map((trainee) => (
                        <>
          {trainee.status === "Inactive" &&         
        <Slide direction="up" in={trainees} mountOnEnter unmountOnExit>
        <TableRow key={trainee._id}>
              <TableCell>{trainee.fullName}</TableCell>
              <TableCell align="right">
              {new Date(trainee.startDate).toDateString()}</TableCell>
              <TableCell align="right">{trainee.averageGrade}</TableCell>
              { trainee.author && trainee.author.name != undefined &&
              <TableCell align="right">{trainee.author.name}</TableCell>
              }
              <TableCell align="right">{trainee.status}</TableCell>
              <TableCell align="center">
                  <Tooltip title="Details">
                        <IconButton aria-label="details" component={Link} to={`/trainees/${trainee._id}`}>
                            <PersonPinIcon />
                         </IconButton>
                        </Tooltip> 
                        { user.role === "admin" && 
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete" onClick={()=>deleteTrainee(trainee._id)}>
                            <DeleteIcon />
                          </IconButton>
                         </Tooltip> 
                        }
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
      <TableContainer className={classes.table} component={Paper} style={{overflow: "hidden"}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell align="right"><strong>Traineeship Start</strong></TableCell>
            <TableCell align="right"><strong>Average Grade</strong></TableCell>
            <TableCell align="right"><strong>Supervising Instructor</strong></TableCell>
            <TableCell align="right"><strong>Status</strong></TableCell>
            <TableCell align="center"><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainees.map((trainee) => (
                        <>
            {trainee.author.name === user.name &&         
        <Slide direction="up" in={trainees} mountOnEnter unmountOnExit>
        <TableRow key={trainee._id}>
              <TableCell>{trainee.fullName}</TableCell>
              <TableCell align="right">
              {new Date(trainee.startDate).toDateString()}</TableCell>
              <TableCell align="right">{trainee.averageGrade}</TableCell>
              { trainee.author && trainee.author.name != undefined &&
              <TableCell align="right">{trainee.author.name}</TableCell>
              }
              <TableCell align="right">{trainee.status}</TableCell>
              <TableCell align="center">
                  <Tooltip title="Details">
                        <IconButton aria-label="details" component={Link} to={`/trainees/${trainee._id}`}>
                            <PersonPinIcon />
                         </IconButton>
                        </Tooltip> 
                        { user.role === "admin" && 
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete" onClick={()=>deleteTrainee(trainee._id)}>
                            <DeleteIcon />
                          </IconButton>
                         </Tooltip> 
                        }
              </TableCell>
            </TableRow>
            </Slide>
            }
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>      </TabPanel>
      </SwipeableViews>
      </Container>
      </div>
    );
  }

