import React, { useState, useEffect } from 'react'
// importing the main container
import Nav from './Nav'
import Container from '@material-ui/core/Container';
// main card import that holds patient details and the action buttons
// ------------------------
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// replacement for the classic <hr> from material ui
import Divider from '@material-ui/core/Divider';
// standard text from material ui
import Typography from '@material-ui/core/Typography';
// styles for the components from material ui
import { makeStyles } from '@material-ui/core/styles';
// input
import TextField from '@material-ui/core/TextField';
// button
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
// drug select form
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText'
// importing history
import {useLocation, useHistory} from 'react-router';

export default function PrescriptionCreate({match}, props) {

    const [patient, setPatient] = useState ({})

    const [prescription, setPrescription] = useState({
      name: patient.fullName,
      diagnosis: patient.diagnosis
    })
    
    useEffect(() => {
        fetch(`/api/patients/${match.params.id}`)
        .then(response => response.json())
        .then(json => setPatient(json))
    
    }, [match.params.id, patient])

  const [drugs, setDrugs] = React.useState([

  ]);

  useEffect(() => {
    fetch('/api/drugs')
    .then(response => response.json())
    .then(json => setDrugs(json))

}, [drugs])

const [categories, setCategories] = React.useState([
  {
    id: 1,
    name: "Miscellaneous analgesics"
  },
  {
    id: 2,
    name: "Benzodiazepines"
  },
  {
    id: 3,
    name: "Aminopenicillins"
  },
  {
    id: 4,
    name: "Miscellaneous antimalarials"
  }
]);

// fixed the issue with the renderValue method and by value={prescription.drug || ''} this covers both cases where the state is not defined!
// this function receives the entire object of "drug" from the API so I can add to the state here to dynamically present the CLASS and DOSAGE
// should probably calculate dosage based on adult/pediatric/under 10 years old in here 
const handleClick = (drug) => {
  if (patient.age >= 18) {
    setPrescription({...prescription, 
      drug: drug.name, 
      class: drug.class, 
      dose: drug.suggestedDoseAdult, 
      name: patient.fullName, 
      diagnosis: patient.diagnosis,
      doctor: "DummyName"});
  } else if (patient.age < 18) {
    setPrescription({...prescription, 
      drug: drug.name, 
      class: drug.class, 
      dose: drug.suggestedDosePediatric, 
      name: patient.fullName, 
      diagnosis: patient.diagnosis,
      doctor: "DummyName"});
  }

}

const renderValue = (value) => {
  return value;
}

const location = useLocation();
const history = useHistory();

const onSubmit = (e) => {
  e.preventDefault()
  fetch(`/api/patients/${match.params.id}/prescriptions`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({prescription}),
  })
  .then(res => res.json())
  .then(json => setPrescription(json.prescription))
  // history.push(`/patients/${match.params.id}`);
  history.goBack();
}

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
        formControl: {
          minWidth: 180,
          maxWidth: 180,
        },
      }));

const classes = useStyles();

    return (
      <div>
        <Nav/>
        <br></br>
        <Container maxWidth="md">
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
        <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h6" component="h2">
         {patient.fullName} - <span style={{color: 'gray'}}>New Prescription</span>
      </Typography>
      <Divider />
        <Typography variant="body2" component="p">
          { patient.age >= "18" &&
        <TextField 
        disabled
        id="standard-disabled" 
        label="DOSAGE CRITERIA" 
        name="prescription[doseCriteria]"
        value="Adult"
        />
          }
          { patient.age < "18" &&
        <TextField 
        disabled
        id="standard-disabled" 
        label="DOSAGE CRITERIA" 
        name="prescription[doseCriteria]"
        value="Pediatric"
        />
          }
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
        <TextField 
         disabled
         InputLabelProps={{shrink: true}}
         id="standard-disabled" 
         label="DOCTOR"
         value="Passport.js"
         name="prescription[doctor]"
        />
        </Typography>
        <Divider />
       <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Pharmaceutical Drugs</InputLabel>
        <Select id="grouped-select" value={prescription.drug || ''} renderValue={ () => renderValue(prescription.drug)}>
          {categories.map(category => 
       (<span>
            <ListSubheader key={category.id}>{category.name}</ListSubheader>
            {drugs.map(drug => drug.class===category.name ? <MenuItem key={drug._id} onClick={()=>handleClick(drug)} value={drug.value}>{drug.name}</MenuItem> : null)}
       </span>)
    )}
        </Select>
        <FormHelperText>Select a Pharmaceutical Drug to prescribe.</FormHelperText>
      </FormControl>
      <Divider />
      <Typography variant="body2" component="p">
      <FormControl className={classes.formControl}>
      <TextField 
        disabled
        InputLabelProps={{shrink: true}}
        id="standard-disabled" 
        label="CLASS"
        value={prescription.class || ''}
        name="prescription[class]"
         />
      </FormControl>
      <Divider />
      </Typography>
      <Typography variant="body2" component="p">
      <FormControl className={classes.formControl}>
        <TextField 
        disabled
        InputLabelProps={{shrink: true}}
        id="standard-disabled" 
        label="TREATMENT DOSAGE"
        value={prescription.dose || ''}
        name="prescription[dose]"
         />
        <FormHelperText>Suggested dosage based on dosage criteria.</FormHelperText>
      </FormControl>
      </Typography>
      <Divider />
      </CardContent>
      <CardActions>
      <Button type="submit" size="small" color="primary" variant="outlined">ADD</Button>
      </CardActions>
    </Card>
    </form>
        </Container>
        </div>
    )

}