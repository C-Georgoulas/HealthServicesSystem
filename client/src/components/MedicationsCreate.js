import React, { useState, useEffect, useRef }from 'react'
import Nav from './Nav'
import Toolbar from '@material-ui/core/Toolbar';
// importing the main container
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
// date picker for admission
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
// Dropdown
import MenuItem from '@material-ui/core/MenuItem';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
// importing checkbox
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export default function MedicationsCreate(props) {

// make a post request - DONE
// make the prescriptions an array, watch colt steele bootcamp comments - DONE
// make the surgeries an array, watch colt steele bootcamp comments - NOT DONE YET
// add a field for prescriptions and notes - NOT DONE YET

// defining patient state and setting default value of patient status to Active after creation

const [drug, setDrug] = useState({})

 // Post request to add a patient

 const onSubmit = (e) => {
   console.log('hello?')
  e.preventDefault()
  fetch(`/api/drugs`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(drug),
  })
  .then(res => res.json())
  .then(json => setDrug(json.drug))
// redirects to patients table
  props.history.push('/drugs');
}

// checkbox logic

const [checked, setChecked] = React.useState(false);

  const handleCheckbox = (event) => {
    console.log(checked);
    setChecked(event.target.checked);
  };

// styling

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
        sex: {
          minWidth: 192,
        },
      });

const classes = useStyles();

// date picker

// const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-01T00:00:00'));

// const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setPatient({...patient, admissionDate: date})
//   };

// class dropdown options

const [drugClass, setDrugClass] = React.useState();

  const handleChange = (event) => {
    setDrugClass(event.target.value);
    setDrug({...drug, class: event.target.value});
  };

const drugClasses = [
    { value: '5-alpha-reductase inhibitors', },
    { value: '5-aminosalicylates', },
    { value: '5HT3 receptor antagonists', },
    { value: 'ACE inhibitors with calcium channel blocking agents', },
    { value: 'ACE inhibitors with thiazides', },
    { value: 'adamantane antivirals', },
    { value: 'adrenal cortical steroids', },
    { value: 'adrenal corticosteroid inhibitors', },
    { value: 'adrenergic bronchodilators', },
    { value: 'agents for hypertensive emergencies', },
    { value: 'agents for pulmonary hypertension', },
    { value: 'aldosterone receptor antagonists', },
    { value: 'alkylating agents', },
    { value: 'allergenics', },
    { value: 'alpha-glucosidase inhibitors', },
    { value: 'alternative medicines', },
    { value: 'amebicides', },
    { value: 'aminoglycosides', },
    { value: 'aminopenicillins', },
    { value: 'aminosalicylates', },
    { value: 'AMPA receptor antagonists', },
    { value: 'amylin analogs', },
    { value: 'analgesic combinations', },
    { value: 'analgesics', },
    { value: 'androgens and anabolic steroids', },
    { value: 'Angiotensin Converting Enzyme Inhibitors', },
    { value: 'angiotensin II inhibitors with calcium channel blockers', },
    { value: 'angiotensin II inhibitors with thiazides', },
    { value: 'angiotensin receptor blockers', },
    { value: 'angiotensin receptor blockers and neprilysin inhibitors', },
    { value: 'anorectal preparations', },
    { value: 'anorexiants', },
    { value: 'antacids', },
    { value: 'anthelmintics', },
    { value: 'anti-angiogenic ophthalmic agents', },
    { value: 'anti-CTLA-4 monoclonal antibodies', },
    { value: 'anti-infectives', },
    { value: 'anti-PD-1 monoclonal antibodies', },
    { value: 'antiadrenergic agents (central) with thiazides', },
    { value: 'antiadrenergic agents (peripheral) with thiazides', },
    { value: 'antiadrenergic agents, centrally acting', },
    { value: 'antiadrenergic agents, peripherally acting', },
    { value: 'antiandrogens', },
    { value: 'antianginal agents', },
    { value: 'antiarrhythmic agents', },
    { value: 'antiasthmatic combinations', },
    { value: 'antibiotics/antineoplastics', },
    { value: 'anticholinergic antiemetics', },
    { value: 'anticholinergic antiparkinson agents', },
    { value: 'anticholinergic bronchodilators', },
    { value: 'anticholinergic chronotropic agents', },
    { value: 'anticholinergics/antispasmodics', },
    { value: 'anticoagulant reversal agents', },
    { value: 'anticoagulants', },
    { value: 'anticonvulsants', },
    { value: 'antidepressants', },
    { value: 'antidiabetic agents', },
    { value: 'antidiabetic combinations', },
    { value: 'antidiarrheals', },
    { value: 'antidiuretic hormones', },
    { value: 'antidotes', },
    { value: 'antiemetic/antivertigo agents', },
    { value: 'antifungals', },
    { value: 'antigonadotropic agents', },
    { value: 'antigout agents', },
    { value: 'antihistamines', },
    { value: 'antihyperlipidemic agents', },
    { value: 'antihyperlipidemic combinations', },
    { value: 'antihypertensive combinations', },
    { value: 'antihyperuricemic agents', },
    { value: 'antimalarial agents', },
    { value: 'antimalarial combinations', },
    { value: 'antimalarial quinolines', },
    { value: 'antimanic agents', },
    { value: 'antimetabolites', },
    { value: 'antimigraine agents', },
    { value: 'antineoplastic combinations', },
    { value: 'antineoplastic detoxifying agents', },
    { value: 'antineoplastic interferons', },
    { value: 'antineoplastics', },
    { value: 'antiparkinson agents', },
    { value: 'antiplatelet agents', },
    { value: 'antipseudomonal penicillins', },
    { value: 'antipsoriatics', },
    { value: 'antipsychotics', },
    { value: 'antirheumatics', },
    { value: 'antiseptic and germicides', },
    { value: 'antithyroid agents', },
    { value: 'antitoxins and antivenins', },
    { value: 'antituberculosis agents', },
    { value: 'antituberculosis combinations', },
    { value: 'antitussives', },
    { value: 'antiviral agents', },
    { value: 'antiviral boosters', },
    { value: 'antiviral combinations', },
    { value: 'antiviral interferons', },
    { value: 'anxiolytics, sedatives, and hypnotics', },
    { value: 'aromatase inhibitors', },
    { value: 'atypical antipsychotics', },
    { value: 'azole antifungals', },
    { value: 'bacterial vaccines', },
    { value: 'barbiturate anticonvulsants', },
    { value: 'barbiturates', },
    { value: 'BCR-ABL tyrosine kinase inhibitors', },
    { value: 'benzodiazepine anticonvulsants', },
    { value: 'benzodiazepines', },
    { value: 'beta blockers with calcium channel blockers', },
    { value: 'beta blockers with thiazides', },
    { value: 'beta-adrenergic blocking agents', },
    { value: 'beta-lactamase inhibitors', },
    { value: 'bile acid sequestrants', },
    { value: 'biologicals', },
    { value: 'bisphosphonates', },
    { value: 'bone morphogenetic proteins', },
    { value: 'bone resorption inhibitors', },
    { value: 'bronchodilator combinations', },
    { value: 'bronchodilators', },
    { value: 'BTK inhibitors', },
    { value: 'calcimimetics', },
    { value: 'calcineurin inhibitors', },
    { value: 'calcitonin', },
    { value: 'calcium channel blocking agents', },
    { value: 'carbamate anticonvulsants', },
    { value: 'carbapenems', },
    { value: 'carbapenems/beta-lactamase inhibitors', },
    { value: 'carbonic anhydrase inhibitor anticonvulsants', },
    { value: 'carbonic anhydrase inhibitors', },
    { value: 'cardiac stressing agents', },
    { value: 'cardioselective beta blockers', },
    { value: 'cardiovascular agents', },
    { value: 'catecholamines', },
    { value: 'cation exchange resins', },
    { value: 'CD20 monoclonal antibodies', },
    { value: 'CD30 monoclonal antibodies', },
    { value: 'CD33 monoclonal antibodies', },
    { value: 'CD38 monoclonal antibodies', },
    { value: 'CD52 monoclonal antibodies', },
    { value: 'CDK 4/6 inhibitors', },
    { value: 'central nervous system agents', },
    { value: 'cephalosporins', },
    { value: 'cephalosporins/beta-lactamase inhibitors', },
    { value: 'cerumenolytics', },
    { value: 'CFTR combinations', },
    { value: 'CFTR potentiators', },
    { value: 'CGRP inhibitors', },
    { value: 'chelating agents', },
    { value: 'chemokine receptor antagonist', },
    { value: 'chloride channel activators', },
    { value: 'cholesterol absorption inhibitors', },
    { value: 'cholinergic agonists', },
    { value: 'cholinergic muscle stimulants', },
    { value: 'cholinesterase inhibitors', },
    { value: 'CNS stimulants', },
    { value: 'coagulation modifiers', },
    { value: 'colony stimulating factors', },
    { value: 'contraceptives', },
    { value: 'corticotropin', },
    { value: 'coumarins and indandiones', },
    { value: 'cox-2 inhibitors', },
    { value: 'decongestants', },
    { value: 'dermatological agents', },
    { value: 'diagnostic radiopharmaceuticals', },
    { value: 'diarylquinolines', },
    { value: 'dibenzazepine anticonvulsants', },
    { value: 'digestive enzymes', },
    { value: 'dipeptidyl peptidase 4 inhibitors', },
    { value: 'diuretics', },
    { value: 'dopaminergic antiparkinsonism agents', },
    { value: 'drugs used in alcohol dependence', },
    { value: 'echinocandins', },
    { value: 'EGFR inhibitors', },
    { value: 'estrogen receptor antagonists', },
    { value: 'estrogens', },
    { value: 'expectorants', },
    { value: 'factor Xa inhibitors', },
    { value: 'fatty acid derivative anticonvulsants', },
    { value: 'fibric acid derivatives', },
    { value: 'first generation cephalosporins', },
    { value: 'fourth generation cephalosporins', },
    { value: 'functional bowel disorder agents', },
    { value: 'gallstone solubilizing agents', },
    { value: 'gamma-aminobutyric acid analogs', },
    { value: 'gamma-aminobutyric acid reuptake inhibitors', },
    { value: 'gastrointestinal agents', },
    { value: 'general anesthetics', },
    { value: 'genitourinary tract agents', },
    { value: 'GI stimulants', },
    { value: 'glucocorticoids', },
    { value: 'glucose elevating agents', },
    { value: 'glycopeptide antibiotics', },
    { value: 'glycoprotein platelet inhibitors', },
    { value: 'glycylcyclines', },
    { value: 'gonadotropin releasing hormones', },
    { value: 'gonadotropin-releasing hormone antagonists', },
    { value: 'gonadotropins', },
    { value: 'group I antiarrhythmics', },
    { value: 'group II antiarrhythmics', },
    { value: 'group III antiarrhythmics', },
    { value: 'group IV antiarrhythmics', },
    { value: 'group V antiarrhythmics', },
    { value: 'growth hormone receptor blockers', },
    { value: 'growth hormones', },
    { value: 'guanylate cyclase-C agonists', },
    { value: 'H. pylori eradication agents', },
    { value: 'H2 antagonists', },
    { value: 'hedgehog pathway inhibitors', },
    { value: 'hematopoietic stem cell mobilizer', },
    { value: 'heparin antagonists', },
    { value: 'heparins', },
    { value: 'HER2 inhibitors', },
    { value: 'herbal products', },
    { value: 'histone deacetylase inhibitors', },
    { value: 'hormones', },
    { value: 'hormones/antineoplastics', },
    { value: 'hydantoin anticonvulsants', },
    { value: 'hydrazide derivatives', },
    { value: 'illicit (street) drugs', },
    { value: 'immune globulins', },
    { value: 'immunologic agents', },
    { value: 'immunostimulants', },
    { value: 'immunosuppressive agents', },
    { value: 'impotence agents', },
    { value: 'in vivo diagnostic biologicals', },
    { value: 'incretin mimetics', },
    { value: 'inhaled anti-infectives', },
    { value: 'inhaled corticosteroids', },
    { value: 'inotropic agents', },
    { value: 'insulin', },
    { value: 'insulin-like growth factors', },
    { value: 'integrase strand transfer inhibitor', },
    { value: 'interferons', },
    { value: 'interleukin inhibitors', },
    { value: 'interleukins', },
    { value: 'intravenous nutritional products', },
    { value: 'investigational drugs', },
    { value: 'iodinated contrast media', },
    { value: 'ionic iodinated contrast media', },
    { value: 'iron products', },
];

// administration dropdown options

const [administration, setAdministration] = React.useState();

  const handleChangeAdministration = (event) => {
    setAdministration(event.target.value);
    setDrug({...drug, administered: event.target.value});
  };

const administrations = [
  {
    value: 'Intravenous (IV)',
  },
  {
    value: 'Oral',
  },
  {
    value: 'Intramuscular (IM) injection',
  },
  {
    value: 'Subcutaneous (SC) injection',
  },
  {
    value: 'Intrathecal Therapy',
  },
];

const form = useRef();


    return (
      <div>
       <Nav/>
       <br></br>
        <Container maxWidth="md">
          <ValidatorForm
            ref={form}
            onSubmit={onSubmit}
            onError={errors => console.log(errors)}>
          {/* // <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}> */}
        <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h6" component="h2">
         PHARMACEUTICAL DRUG - <span style={{color: 'gray'}}>Creation</span>
      </Typography>
      <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="NAME"
        name="drug[name]"
        value={drug.name}
        onChange={e => setDrug({...drug, name: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the name of the pharmaceutical drug!']}
        />
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
          id="standard-select-condition"
          select
          value={drugClass}
          label="DRUG CLASS"
          name="drug[class]"
          onChange={handleChange}
          helperText="Pharmaceutical class for the drug added."
          validators={['required']}
          errorMessages={['Please select the class of the drug!']}
        >
          {drugClasses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextValidator>
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="DESCRIPTION"
        multiline
        helperText="Describe the use of this pharmaceutical medication."
        name="drug[description]"
        value={drug.description}
        onChange={e => setDrug({...drug, description: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the description of the pharmaceutical drug!']}
        />
        </Typography>
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="ADULT DOSAGE"
        name="drug[suggestedDoseAdult]"
        value={drug.suggestedDoseAdult}
        onChange={e => setDrug({...drug, suggestedDoseAdult: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the suggested dose of an adult!!']}
        />
        </Typography>
        <Divider />
        <FormControlLabel
      className={classes.checkbox}
      control={
      <Checkbox
        checked={checked}
        onChange={handleCheckbox}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      }
      label="Is this drug restricted to kids?"/>
    <Divider />
    {checked === false &&
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        label="PEDIATRIC DOSAGE"
        name="drug[suggestedDosePediatric]"
        value={drug.suggestedDosePediatric}
        onChange={e => setDrug({...drug, suggestedDosePediatric: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the suggested dose of a child!']}
        />
        </Typography>
}
{checked === true &&
        <Typography variant="body2" component="p">
        <TextValidator
        id="standard-basic" 
        disabled
        label="PEDIATRIC DOSAGE"
        name="drug[suggestedDosePediatric]"
        value={"Restricted"}
        onChange={e => setDrug({...drug, suggestedDosePediatric: e.target.value})}
        validators={['required']}
        errorMessages={['Please add the suggested dose of a child!']}
        />
        </Typography>
}
        <Divider />
        <Typography variant="body2" component="p">
        <TextValidator
          id="standard-select-condition"
          select
          label="ADMINISTRATION"
          value={administration}
          name="drug[administered]"
          onChange={handleChangeAdministration}
          helperText="The method the pharmaceutical medication is administered into the patient."
          validators={['required']}
          errorMessages={['Please select the method of drug administration!']}
        >
          {administrations.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextValidator>
        </Typography>
        <Divider />
      </CardContent>
      <CardActions>
      <Button type="submit" size="small" color="primary" variant="outlined">CREATE</Button>
      </CardActions>
    </Card>
    </ValidatorForm>
        </Container>
        </div>
    )

}