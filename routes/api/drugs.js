const express = require('express');
const router = express.Router();

// Drug Model
const Drug = require('../../models/Drug');


// Constructing an object to insert to the database
router.post('/', (req, res) => {
    console.log(req.body.name);
    const newDrug = new Drug({
        name: req.body.name,
        class: req.body.class,
        description: req.body.description,
        suggestedDoseAdult: req.body.suggestedDoseAdult,
        suggestedDosePediatric: req.body.suggestedDosePediatric,
        administered: req.body.administered
    })

    console.log(newDrug);
    console.log("hello");

    newDrug.save().then(drug => res.json(drug));
});

router.get('/', (req, res) => {
    Drug.find()
        .then(drugs => res.json(drugs))
});


// Deleting object from the database based on ID
router.delete('/:id', async (req, res) => {
    await Drug.findByIdAndDelete(req.params.id)
    res.status(200).send({});

})



module.exports = router;