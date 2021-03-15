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
// importing checkbox
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// importing history
import {useLocation, useHistory} from 'react-router';

export default function PrescriptionCreate({match}, props) {

    const [patient, setPatient] = useState ({})

    const [prescription, setPrescription] = useState({
      name: patient.fullName,
      diagnosis: patient.diagnosis
    })

    // assuming the following helper
function groupBy(iterable, keyFn) {
  const groups = new Map();
  for (const item of iterable) {
    const key = keyFn(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return groups;
}
    
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

// this ensures that 1 category is made for all drugs that exist in the category
// if a category has no drugs in it, then it is not rendered

const drugsByCategoryName = groupBy(drugs, drug => drug.class.toLowerCase());


const [categories, setCategories] = React.useState([
  {id: 1, name: '5-alpha-reductase inhibitors' },
  {id: 2, name: '5-aminosalicylates' },
  {id: 3, name: '5HT3 receptor antagonists' },
  {id: 4, name: 'ACE inhibitors with calcium channel blocking agents' },
  {id: 5, name: 'ACE inhibitors with thiazides' },
  {id: 6, name: 'adamantane antivirals' },
  {id: 7, name: 'adrenal cortical steroids' },
  {id: 8, name: 'adrenal corticosteroid inhibitors' },
  {id: 9, name: 'adrenergic bronchodilators' },
  {id: 10, name: 'agents for hypertensive emergencies' },
  {id: 11, name: 'agents for pulmonary hypertension' },
  {id: 12, name: 'aldosterone receptor antagonists' },
  {id: 13, name: 'alkylating agents' },
  {id: 14, name: 'allergenics' },
  {id: 15, name: 'alpha-glucosidase inhibitors' },
  {id: 16, name: 'alternative medicines' },
  {id: 17, name: 'amebicides' },
  {id: 18, name: 'aminoglycosides' },
  {id: 19, name: 'aminopenicillins' },
  {id: 20, name: 'aminosalicylates' },
  {id: 21, name: 'AMPA receptor antagonists' },
  {id: 22, name: 'amylin analogs' },
  {id: 23, name: 'analgesic combinations' },
  {id: 24, name: 'analgesics' },
  {id: 25, name: 'androgens and anabolic steroids' },
  {id: 26, name: 'Angiotensin Converting Enzyme Inhibitors' },
  {id: 27, name: 'angiotensin II inhibitors with calcium channel blockers' },
  {id: 28, name: 'angiotensin II inhibitors with thiazides' },
  {id: 29, name: 'angiotensin receptor blockers' },
  {id: 30, name: 'angiotensin receptor blockers and neprilysin inhibitors' },
  {id: 31, name: 'anorectal preparations' },
  {id: 32, name: 'anorexiants' },
  {id: 33, name: 'antacids' },
  {id: 34, name: 'anthelmintics' },
  {id: 35, name: 'anti-angiogenic ophthalmic agents' },
  {id: 36, name: 'anti-CTLA-4 monoclonal antibodies' },
  {id: 37, name: 'anti-infectives' },
  {id: 38, name: 'anti-PD-1 monoclonal antibodies' },
  {id: 39, name: 'antiadrenergic agents (central) with thiazides' },
  {id: 40, name: 'antiadrenergic agents (peripheral) with thiazides' },
  {id: 41, name: 'antiadrenergic agents, centrally acting' },
  {id: 42, name: 'antiadrenergic agents, peripherally acting' },
  {id: 43, name: 'antiandrogens' },
  {id: 44, name: 'antianginal agents' },
  {id: 45, name: 'antiarrhythmic agents' },
  {id: 46, name: 'antiasthmatic combinations' },
  {id: 47, name: 'antibiotics/antineoplastics' },
  {id: 48, name: 'anticholinergic antiemetics' },
  {id: 49, name: 'anticholinergic antiparkinson agents' },
  {id: 50, name: 'anticholinergic bronchodilators' },
  {id: 51, name: 'anticholinergic chronotropic agents' },
  {id: 52, name: 'anticholinergics/antispasmodics' },
  {id: 53, name: 'anticoagulant reversal agents' },
  {id: 54, name: 'anticoagulants' },
  {id: 55, name: 'anticonvulsants' },
  {id: 56, name: 'antidepressants' },
  {id: 57, name: 'antidiabetic agents' },
  {id: 58, name: 'antidiabetic combinations' },
  {id: 59, name: 'antidiarrheals' },
  {id: 60, name: 'antidiuretic hormones' },
  {id: 61, name: 'antidotes' },
  {id: 62, name: 'antiemetic/antivertigo agents' },
  {id: 63, name: 'antifungals' },
  {id: 64, name: 'antigonadotropic agents' },
  {id: 65, name: 'antigout agents' },
  {id: 66, name: 'antihistamines' },
  {id: 67, name: 'antihyperlipidemic agents' },
  {id: 68, name: 'antihyperlipidemic combinations' },
  {id: 69, name: 'antihypertensive combinations' },
  {id: 70, name: 'antihyperuricemic agents' },
  {id: 71, name: 'antimalarial agents' },
  {id: 72, name: 'antimalarial combinations' },
  {id: 73, name: 'antimalarial quinolines' },
  {id: 74, name: 'antimanic agents' },
  {id: 75, name: 'antimetabolites' },
  {id: 76, name: 'antimigraine agents' },
  {id: 77, name: 'antineoplastic combinations' },
  {id: 78, name: 'antineoplastic detoxifying agents' },
  {id: 79, name: 'antineoplastic interferons' },
  {id: 80, name: 'antineoplastics' },
  {id: 81, name: 'antiparkinson agents' },
  {id: 82, name: 'antiplatelet agents' },
  {id: 83, name: 'antipseudomonal penicillins' },
  {id: 84, name: 'antipsoriatics' },
  {id: 85, name: 'antipsychotics' },
  {id: 86, name: 'antirheumatics' },
  {id: 87, name: 'antiseptic and germicides' },
  {id: 88, name: 'antithyroid agents' },
  {id: 89, name: 'antitoxins and antivenins' },
  {id: 90, name: 'antituberculosis agents' },
  {id: 91, name: 'antituberculosis combinations' },
  {id: 92, name: 'antitussives' },
  {id: 93, name: 'antiviral agents' },
  {id: 94, name: 'antiviral boosters' },
  {id: 95, name: 'antiviral combinations' },
  {id: 96, name: 'antiviral interferons' },
  {id: 97, name: 'anxiolytics, sedatives, and hypnotics' },
  {id: 98, name: 'aromatase inhibitors' },
  {id: 99, name: 'atypical antipsychotics' },
  {id: 100, name: 'azole antifungals' },
  {id: 101, name: 'bacterial vaccines' },
  {id: 102, name: 'barbiturate anticonvulsants' },
  {id: 103, name: 'barbiturates' },
  {id: 104, name: 'BCR-ABL tyrosine kinase inhibitors' },
  {id: 105, name: 'benzodiazepine anticonvulsants' },
  {id: 106, name: 'benzodiazepines' },
  {id: 107, name: 'beta blockers with calcium channel blockers' },
  {id: 108, name: 'beta blockers with thiazides' },
  {id: 109, name: 'beta-adrenergic blocking agents' },
  {id: 110, name: 'beta-lactamase inhibitors' },
  {id: 111, name: 'bile acid sequestrants' },
  {id: 112, name: 'biologicals' },
  {id: 113, name: 'bisphosphonates' },
  {id: 114, name: 'bone morphogenetic proteins' },
  {id: 115, name: 'bone resorption inhibitors' },
  {id: 116, name: 'bronchodilator combinations' },
  {id: 117, name: 'bronchodilators' },
  {id: 118, name: 'BTK inhibitors' },
  {id: 119, name: 'calcimimetics' },
  {id: 120, name: 'calcineurin inhibitors' },
  {id: 121, name: 'calcitonin' },
  {id: 122, name: 'calcium channel blocking agents' },
  {id: 123, name: 'carbamate anticonvulsants' },
  {id: 124, name: 'carbapenems' },
  {id: 125, name: 'carbapenems/beta-lactamase inhibitors' },
  {id: 126, name: 'carbonic anhydrase inhibitor anticonvulsants' },
  {id: 127, name: 'carbonic anhydrase inhibitors' },
  {id: 128, name: 'cardiac stressing agents' },
  {id: 129, name: 'cardioselective beta blockers' },
  {id: 130, name: 'cardiovascular agents' },
  {id: 131, name: 'catecholamines' },
  {id: 132, name: 'cation exchange resins' },
  {id: 133, name: 'CD20 monoclonal antibodies' },
  {id: 134, name: 'CD30 monoclonal antibodies' },
  {id: 135, name: 'CD33 monoclonal antibodies' },
  {id: 136, name: 'CD38 monoclonal antibodies' },
  {id: 137, name: 'CD52 monoclonal antibodies' },
  {id: 138, name: 'CDK 4/6 inhibitors' },
  {id: 139, name: 'central nervous system agents' },
  {id: 140, name: 'cephalosporins' },
  {id: 141, name: 'cephalosporins/beta-lactamase inhibitors' },
  {id: 142, name: 'cerumenolytics' },
  {id: 143, name: 'CFTR combinations' },
  {id: 144, name: 'CFTR potentiators' },
  {id: 145, name: 'CGRP inhibitors' },
  {id: 146, name: 'chelating agents' },
  {id: 147, name: 'chemokine receptor antagonist' },
  {id: 148, name: 'chloride channel activators' },
  {id: 149, name: 'cholesterol absorption inhibitors' },
  {id: 150, name: 'cholinergic agonists' },
  {id: 151, name: 'cholinergic muscle stimulants' },
  {id: 152, name: 'cholinesterase inhibitors' },
  {id: 153, name: 'CNS stimulants' },
  {id: 154, name: 'coagulation modifiers' },
  {id: 155, name: 'colony stimulating factors' },
  {id: 156, name: 'contraceptives' },
  {id: 157, name: 'corticotropin' },
  {id: 158, name: 'coumarins and indandiones' },
  {id: 159, name: 'cox-2 inhibitors' },
  {id: 160, name: 'decongestants' },
  {id: 161, name: 'dermatological agents' },
  {id: 162, name: 'diagnostic radiopharmaceuticals' },
  {id: 163, name: 'diarylquinolines' },
  {id: 164, name: 'dibenzazepine anticonvulsants' },
  {id: 165, name: 'digestive enzymes' },
  {id: 166, name: 'dipeptidyl peptidase 4 inhibitors' },
  {id: 167, name: 'diuretics' },
  {id: 168, name: 'dopaminergic antiparkinsonism agents' },
  {id: 169, name: 'drugs used in alcohol dependence' },
  {id: 170, name: 'echinocandins' },
  {id: 171, name: 'EGFR inhibitors' },
  {id: 172, name: 'estrogen receptor antagonists' },
  {id: 173, name: 'estrogens' },
  {id: 174, name: 'expectorants' },
  {id: 175, name: 'factor Xa inhibitors' },
  {id: 176, name: 'fatty acid derivative anticonvulsants' },
  {id: 177, name: 'fibric acid derivatives' },
  {id: 178, name: 'first generation cephalosporins' },
  {id: 179, name: 'fourth generation cephalosporins' },
  {id: 180, name: 'functional bowel disorder agents' },
  {id: 181, name: 'gallstone solubilizing agents' },
  {id: 182, name: 'gamma-aminobutyric acid analogs' },
  {id: 183, name: 'gamma-aminobutyric acid reuptake inhibitors' },
  {id: 184, name: 'gastrointestinal agents' },
  {id: 185, name: 'general anesthetics' },
  {id: 186, name: 'genitourinary tract agents' },
  {id: 187, name: 'GI stimulants' },
  {id: 188, name: 'glucocorticoids' },
  {id: 189, name: 'glucose elevating agents' },
  {id: 190, name: 'glycopeptide antibiotics' },
  {id: 191, name: 'glycoprotein platelet inhibitors' },
  {id: 192, name: 'glycylcyclines' },
  {id: 193, name: 'gonadotropin releasing hormones' },
  {id: 194, name: 'gonadotropin-releasing hormone antagonists' },
  {id: 195, name: 'gonadotropins' },
  {id: 196, name: 'group I antiarrhythmics' },
  {id: 197, name: 'group II antiarrhythmics' },
  {id: 198, name: 'group III antiarrhythmics' },
  {id: 199, name: 'group IV antiarrhythmics' },
  {id: 200, name: 'group V antiarrhythmics' },
  {id: 201, name: 'growth hormone receptor blockers' },
  {id: 202, name: 'growth hormones' },
  {id: 203, name: 'guanylate cyclase-C agonists' },
  {id: 204, name: 'H. pylori eradication agents' },
  {id: 205, name: 'H2 antagonists' },
  {id: 206, name: 'hedgehog pathway inhibitors' },
  {id: 207, name: 'hematopoietic stem cell mobilizer' },
  {id: 208, name: 'heparin antagonists' },
  {id: 209, name: 'heparins' },
  {id: 210, name: 'HER2 inhibitors' },
  {id: 211, name: 'herbal products' },
  {id: 212, name: 'histone deacetylase inhibitors' },
  {id: 213, name: 'hormones' },
  {id: 214, name: 'hormones/antineoplastics' },
  {id: 215, name: 'hydantoin anticonvulsants' },
  {id: 216, name: 'hydrazide derivatives' },
  {id: 217, name: 'illicit (street) drugs' },
  {id: 218, name: 'immune globulins' },
  {id: 219, name: 'immunologic agents' },
  {id: 220, name: 'immunostimulants' },
  {id: 221, name: 'immunosuppressive agents' },
  {id: 222, name: 'impotence agents' },
  {id: 223, name: 'in vivo diagnostic biologicals' },
  {id: 224, name: 'incretin mimetics' },
  {id: 225, name: 'inhaled anti-infectives' },
  {id: 226, name: 'inhaled corticosteroids' },
  {id: 227, name: 'inotropic agents' },
  {id: 228, name: 'insulin' },
  {id: 229, name: 'insulin-like growth factors' },
  {id: 230, name: 'integrase strand transfer inhibitor' },
  {id: 231, name: 'interferons' },
  {id: 232, name: 'interleukin inhibitors' },
  {id: 233, name: 'interleukins' },
  {id: 234, name: 'intravenous nutritional products' },
  {id: 235, name: 'investigational drugs' },
  {id: 236, name: 'iodinated contrast media' },
  {id: 237, name: 'ionic iodinated contrast media' },
  {id: 238, name: 'iron products' },
  {id: 239, name: 'ketolides' },
  {id: 240, name: 'laxatives' },
  {id: 241, name: 'leprostatics' },
  {id: 242, name: 'leukotriene modifiers' },
  {id: 243, name: 'lincomycin derivatives' },
  {id: 244, name: 'local injectable anesthetics' },
  {id: 245, name: 'local injectable anesthetics with corticosteroids' },
  {id: 246, name: 'loop diuretics' },
  {id: 247, name: 'lung surfactants' },
  {id: 248, name: 'lymphatic staining agents' },
  {id: 249, name: 'lysosomal enzymes' },
  {id: 250, name: 'macrolide derivatives' },
  {id: 251, name: 'macrolides' },
  {id: 252, name: 'magnetic resonance imaging contrast media' },
  {id: 253, name: 'malignancy photosensitizers' },
  {id: 254, name: 'mast cell stabilizers' },
  {id: 255, name: 'medical gas' },
  {id: 256, name: 'meglitinides' },
  {id: 257, name: 'melanocortin receptor agonists' },
  {id: 258, name: 'metabolic agents' },
  {id: 259, name: 'methylxanthines' },
  {id: 260, name: 'mineralocorticoids' },
  {id: 261, name: 'minerals and electrolytes' },
  {id: 262, name: 'miscellaneous agents' },
  {id: 263, name: 'miscellaneous analgesics' },
  {id: 264, name: 'miscellaneous antibiotics' },
  {id: 265, name: 'miscellaneous anticonvulsants' },
  {id: 266, name: 'miscellaneous antidepressants' },
  {id: 267, name: 'miscellaneous antidiabetic agents' },
  {id: 268, name: 'miscellaneous antiemetics' },
  {id: 269, name: 'miscellaneous antifungals' },
  {id: 270, name: 'miscellaneous antihyperlipidemic agents' },
  {id: 271, name: 'miscellaneous antihypertensive combinations' },
  {id: 272, name: 'miscellaneous antimalarials' },
  {id: 273, name: 'miscellaneous antineoplastics' },
  {id: 274, name: 'miscellaneous antiparkinson agents' },
  {id: 275, name: 'miscellaneous antipsychotic agents' },
  {id: 276, name: 'miscellaneous antituberculosis agents' },
  {id: 277, name: 'miscellaneous antivirals' },
  {id: 278, name: 'miscellaneous anxiolytics, sedatives and hypnotics' },
  {id: 279, name: 'miscellaneous bone resorption inhibitors' },
  {id: 280, name: 'miscellaneous cardiovascular agents' },
  {id: 281, name: 'miscellaneous central nervous system agents' },
  {id: 282, name: 'miscellaneous coagulation modifiers' },
  {id: 283, name: 'miscellaneous diagnostic dyes' },
  {id: 284, name: 'miscellaneous diuretics' },
  {id: 285, name: 'miscellaneous erythropoiesis agents' },
  {id: 286, name: 'miscellaneous genitourinary tract agents' },
  {id: 287, name: 'miscellaneous GI agents' },
  {id: 288, name: 'miscellaneous hormones' },
  {id: 289, name: 'miscellaneous metabolic agents' },
  {id: 290, name: 'miscellaneous ophthalmic agents' },
  {id: 291, name: 'miscellaneous otic agents' },
  {id: 292, name: 'miscellaneous respiratory agents' },
  {id: 293, name: 'miscellaneous sex hormones' },
  {id: 294, name: 'miscellaneous topical agents' },
  {id: 295, name: 'miscellaneous uncategorized agents' },
  {id: 296, name: 'miscellaneous vaginal agents' },
  {id: 297, name: 'mitotic inhibitors' },
  {id: 298, name: 'monoamine oxidase inhibitors' },
  {id: 299, name: 'mouth and throat products' },
  {id: 300, name: 'mTOR inhibitors' },
  {id: 301, name: 'mucolytics' },
  {id: 302, name: 'multikinase inhibitors' },
  {id: 303, name: 'muscle relaxants' },
  {id: 304, name: 'mydriatics' },
  {id: 305, name: 'narcotic analgesic combinations' },
  {id: 306, name: 'narcotic analgesics' },
  {id: 307, name: 'nasal anti-infectives' },
  {id: 308, name: 'nasal antihistamines and decongestants' },
  {id: 309, name: 'nasal lubricants and irrigations' },
  {id: 310, name: 'nasal preparations' },
  {id: 311, name: 'nasal steroids' },
  {id: 312, name: 'natural penicillins' },
  {id: 313, name: 'neprilysin inhibitors' },
  {id: 314, name: 'neuraminidase inhibitors' },
  {id: 315, name: 'neuromuscular blocking agents' },
  {id: 316, name: 'neuronal potassium channel openers' },
  {id: 317, name: 'next generation cephalosporins' },
  {id: 318, name: 'NHE3 inhibitors' },
  {id: 319, name: 'nicotinic acid derivatives' },
  {id: 320, name: 'NK1 receptor antagonists' },
  {id: 321, name: 'NNRTIs' },
  {id: 322, name: 'non-cardioselective beta blockers' },
  {id: 323, name: 'non-iodinated contrast media' },
  {id: 324, name: 'non-ionic iodinated contrast media' },
  {id: 325, name: 'non-sulfonylureas' },
  {id: 326, name: 'Nonsteroidal anti-inflammatory drugs' },
  {id: 327, name: 'NS5A inhibitors' },
  {id: 328, name: 'nucleoside reverse transcriptase inhibitors (NRTIs)' },
  {id: 329, name: 'nutraceutical products' },
  {id: 330, name: 'nutritional products' },
  {id: 331, name: 'ophthalmic anesthetics' },
  {id: 332, name: 'ophthalmic anti-infectives' },
  {id: 333, name: 'ophthalmic anti-inflammatory agents' },
  {id: 334, name: 'ophthalmic antihistamines and decongestants' },
  {id: 335, name: 'ophthalmic diagnostic agents' },
  {id: 336, name: 'ophthalmic glaucoma agents' },
  {id: 337, name: 'ophthalmic lubricants and irrigations' },
  {id: 338, name: 'ophthalmic preparations' },
  {id: 339, name: 'ophthalmic steroids' },
  {id: 340, name: 'ophthalmic steroids with anti-infectives' },
  {id: 341, name: 'ophthalmic surgical agents' },
  {id: 342, name: 'oral nutritional supplements' },
  {id: 343, name: 'other immunostimulants' },
  {id: 344, name: 'other immunosuppressants' },
  {id: 345, name: 'otic anesthetics' },
  {id: 346, name: 'otic anti-infectives' },
  {id: 347, name: 'otic preparations' },
  {id: 348, name: 'otic steroids' },
  {id: 349, name: 'otic steroids with anti-infectives' },
  {id: 350, name: 'oxazolidinedione anticonvulsants' },
  {id: 351, name: 'oxazolidinone antibiotics' },
  {id: 352, name: 'parathyroid hormone and analogs' },
  {id: 353, name: 'PARP inhibitors' },
  {id: 354, name: 'PCSK9 inhibitors' },
  {id: 355, name: 'penicillinase resistant penicillins' },
  {id: 356, name: 'penicillins' },
  {id: 357, name: 'peripheral opioid receptor antagonists' },
  {id: 358, name: 'peripheral opioid receptor mixed agonists/antagonists' },
  {id: 359, name: 'peripheral vasodilators' },
  {id: 360, name: 'peripherally acting antiobesity agents' },
  {id: 361, name: 'phenothiazine antiemetics' },
  {id: 362, name: 'phenothiazine antipsychotics' },
  {id: 363, name: 'phenylpiperazine antidepressants' },
  {id: 364, name: 'phosphate binders' },
  {id: 365, name: 'PI3K inhibitors' },
  {id: 366, name: 'plasma expanders' },
  {id: 367, name: 'platelet aggregation inhibitors' },
  {id: 368, name: 'platelet-stimulating agents' },
  {id: 369, name: 'polyenes' },
  {id: 370, name: 'potassium sparing diuretics with thiazides' },
  {id: 371, name: 'potassium-sparing diuretics' },
  {id: 372, name: 'probiotics' },
  {id: 373, name: 'progesterone receptor modulators' },
  {id: 374, name: 'progestins' },
  {id: 375, name: 'prolactin inhibitors' },
  {id: 376, name: 'prostaglandin D2 antagonists' },
  {id: 377, name: 'protease inhibitors' },
  {id: 378, name: 'protease-activated receptor-1 antagonists' },
  {id: 379, name: 'proteasome inhibitors' },
  {id: 380, name: 'proton pump inhibitors' },
  {id: 381, name: 'psoralens' },
  {id: 382, name: 'psychotherapeutic agents' },
  {id: 383, name: 'psychotherapeutic combinations' },
  {id: 384, name: 'purine nucleosides' },
  {id: 385, name: 'pyrrolidine anticonvulsants' },
  {id: 386, name: 'quinolones' },
  {id: 387, name: 'radiocontrast agents' },
  {id: 388, name: 'radiologic adjuncts' },
  {id: 389, name: 'radiologic agents' },
  {id: 390, name: 'radiologic conjugating agents' },
  {id: 391, name: 'radiopharmaceuticals' },
  {id: 392, name: 'recombinant human erythropoietins' },
  {id: 393, name: 'renal replacement solutions' },
  {id: 394, name: 'renin inhibitors' },
  {id: 395, name: 'respiratory agents' },
  {id: 396, name: 'respiratory inhalant products' },
  {id: 397, name: 'rifamycin derivatives' },
  {id: 398, name: 'salicylates' },
  {id: 399, name: 'sclerosing agents' },
  {id: 400, name: 'second generation cephalosporins' },
  {id: 401, name: 'selective estrogen receptor modulators' },
  {id: 402, name: 'selective immunosuppressants' },
  {id: 403, name: 'selective phosphodiesterase-4 inhibitors' },
  {id: 404, name: 'selective serotonin reuptake inhibitors' },
  {id: 405, name: 'serotonin-norepinephrine reuptake inhibitors' },
  {id: 406, name: 'serotoninergic neuroenteric modulators' },
  {id: 407, name: 'sex hormone combinations' },
  {id: 408, name: 'sex hormones' },
  {id: 409, name: 'SGLT-2 inhibitors' },
  {id: 410, name: 'skeletal muscle relaxant combinations' },
  {id: 411, name: 'skeletal muscle relaxants' },
  {id: 412, name: 'smoking cessation agents' },
  {id: 413, name: 'somatostatin and somatostatin analogs' },
  {id: 414, name: 'spermicides' },
  {id: 415, name: 'statins' },
  {id: 416, name: 'sterile irrigating solutions' },
  {id: 417, name: 'streptogramins' },
  {id: 418, name: 'streptomyces derivatives' },
  {id: 419, name: 'succinimide anticonvulsants' },
  {id: 420, name: 'sulfonamides' },
  {id: 421, name: 'sulfonylureas' },
  {id: 422, name: 'synthetic ovulation stimulants' },
  {id: 423, name: 'tetracyclic antidepressants' },
  {id: 424, name: 'tetracyclines' },
  {id: 425, name: 'therapeutic radiopharmaceuticals' },
  {id: 426, name: 'therapeutic vaccines' },
  {id: 427, name: 'thiazide diuretics' },
  {id: 428, name: 'thiazolidinediones' },
  {id: 429, name: 'thioxanthenes' },
  {id: 430, name: 'third generation cephalosporins' },
  {id: 431, name: 'thrombin inhibitors' },
  {id: 432, name: 'thrombolytics' },
  {id: 433, name: 'thyroid drugs' },
  {id: 434, name: 'TNF alfa inhibitors' },
  {id: 435, name: 'tocolytic agents' },
  {id: 436, name: 'topical acne agents' },
  {id: 437, name: 'topical agents' },
  {id: 438, name: 'topical allergy diagnostic agents' },
  {id: 439, name: 'topical anesthetics' },
  {id: 440, name: 'topical anti-infectives' },
  {id: 441, name: 'topical anti-rosacea agents' },
  {id: 442, name: 'topical antibiotics' },
  {id: 443, name: 'topical antifungals' },
  {id: 444, name: 'topical antihistamines' },
  {id: 445, name: 'topical antineoplastics' },
  {id: 446, name: 'topical antipsoriatics' },
  {id: 447, name: 'topical antivirals' },
  {id: 448, name: 'topical astringents' },
  {id: 449, name: 'topical debriding agents' },
  {id: 450, name: 'topical depigmenting agents' },
  {id: 451, name: 'topical emollients' },
  {id: 452, name: 'topical keratolytics' },
  {id: 453, name: 'topical non-steroidal anti-inflammatories' },
  {id: 454, name: 'topical photochemotherapeutics' },
  {id: 455, name: 'topical rubefacient' },
  {id: 456, name: 'topical steroids' },
  {id: 457, name: 'topical steroids with anti-infectives' },
  {id: 458, name: 'transthyretin stabilizers' },
  {id: 459, name: 'triazine anticonvulsants' },
  {id: 460, name: 'tricyclic antidepressants' },
  {id: 461, name: 'trifunctional monoclonal antibodies' },
  {id: 462, name: 'ultrasound contrast media' },
  {id: 463, name: 'upper respiratory combinations' },
  {id: 464, name: 'urea anticonvulsants' },
  {id: 465, name: 'urea cycle disorder agents' },
  {id: 466, name: 'urinary anti-infectives' },
  {id: 467, name: 'urinary antispasmodics' },
  {id: 468, name: 'urinary pH modifiers' },
  {id: 469, name: 'uterotonic agents' },
  {id: 470, name: 'vaccine combinations' },
  {id: 471, name: 'vaginal anti-infectives' },
  {id: 472, name: 'vaginal preparations' },
  {id: 473, name: 'vasodilators' },
  {id: 474, name: 'vasopressin antagonists' },
  {id: 475, name: 'vasopressors' },
  {id: 476, name: 'VEGF/VEGFR inhibitors' },
  {id: 477, name: 'viral vaccines' },
  {id: 478, name: 'viscosupplementation agents' },
  {id: 479, name: 'vitamin and mineral combinations' },
  {id: 480, name: 'vitamins' },
  {id: 481, name: 'VMAT2 inhibitors' },  
]);

// fixed the issue with the renderValue method and by value={prescription.drug || ''} this covers both cases where the state is not defined!
// this function receives the entire object of "drug" from the API so I can add to the state here to dynamically present the CLASS and DOSAGE
// should probably calculate dosage based on adult/pediatric/under 10 years old in here 

const [manualDose, setManualDose] = useState ({})

const [prescriptionPlan, setPrescriptionPlan] = React.useState(0);

  const handlePrescriptionPlan = (event) => {
    setPrescription({...prescription, prescriptionExpirationDate: event.target.value});
    console.log(prescription.prescriptionExpirationDate);
  };

const handleClick = (drug) => {
  if (checked === false) {
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
  } else if (checked === true) {
    if (patient.age >= 18) {
      setPrescription({...prescription, 
        drug: drug.name, 
        class: drug.class, 
        dose: manualDose, 
        name: patient.fullName, 
        diagnosis: patient.diagnosis,
        doctor: "DummyName"});
    } else if (patient.age < 18) {
      setPrescription({...prescription, 
        drug: drug.name, 
        class: drug.class, 
        dose: manualDose, 
        name: patient.fullName, 
        diagnosis: patient.diagnosis,
        doctor: "DummyName"});
    }
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

// checkbox logic

const [checked, setChecked] = React.useState(false);

  const handleCheckbox = (event) => {
    console.log(checked);
    setChecked(event.target.checked);
  };

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
        {Array.from(drugsByCategoryName, ([categoryName, drugs]) => (
  <span>
    <ListSubheader>{categoryName}</ListSubheader>
    {drugs.map((drug) => (
      <MenuItem key={drug._id} onClick={()=>handleClick(drug)} value={drug.value}>
        {drug.name}
      </MenuItem>
    ))}
  </span>
))}
        </Select>
        <FormHelperText>Select a Pharmaceutical Drug to prescribe.</FormHelperText>
        {  patient.age <= 12 &&
         <FormHelperText>Some Pharmaceutical Drugs have been restricted due to the patient's age.</FormHelperText>
        }
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
      { prescription.drug != undefined &&
      <FormControlLabel
      className={classes.checkbox}
      control={
      <Checkbox
        checked={checked}
        onChange={handleCheckbox}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      }
      label="Manually calculate dosage"
      />}
      { prescription.drug == undefined &&
      <FormControlLabel
      className={classes.checkbox}
      control={
      <Checkbox
        disabled 
        inputProps={{ 'aria-label': 'disabled checkbox' }}
        onChange={handleCheckbox}
      />
      }
      label="Manually calculate dosage"
      />}

      <Divider/>
      {checked === false &&
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
}
{checked === true &&
      <Typography variant="body2" component="p">
      <FormControl className={classes.formControl}>
        <TextField 
        InputLabelProps={{shrink: true}}
        id="standard-disabled" 
        label="TREATMENT DOSAGE"
        value={prescription.dose || ''}
        onChange={e => setPrescription({...prescription, dose: e.target.value})}
        name="prescription[dose]"
         />
        <FormHelperText>Suggested dosage based on dosage criteria.</FormHelperText>
      </FormControl>
      </Typography>
}
      <Divider />
      <Typography variant="body2" component="p">
      <FormControl className={classes.formControl}>
        {/* <TextField 
        InputLabelProps={{shrink: true}}
        id="standard-disabled" 
        label="PRESCRIPTION PLAN"
        value={prescription.prescriptionExpirationDate || ''}
        name="prescription[prescriptionExpirationDate]"
         /> */}
        <InputLabel htmlFor="demo-simple-select-label">Prescription Plan</InputLabel>
         <Select
          InputLabelProps={{shrink: true}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="PRESCRIPTION PLAN"
          value={prescription.prescriptionExpirationDate || ''}
          onChange={handlePrescriptionPlan}
        >
          <MenuItem value={7}>7 Days</MenuItem>
          <MenuItem value={14}>14 Days</MenuItem>
        </Select>
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