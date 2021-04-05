const express = require('express');
const router = express.Router();

// Patient Model

const Patient = require('../../models/Patient');
const Note = require('../../models/Note');
const Prescription = require('../../models/Prescription');
const Surgery = require('../../models/Surgery');
const User = require('../../models/User');
const Notification = require('../../models/Notification');


// @ route GET api/patients
// @desc Get all Patients
// access Staff

// sort's use is to sort all patients in a descending manner by the creationdate
router.get('/', (req, res) => {
    Patient.find()
        .populate('author')
        .sort({date: -1})
        .then(patients => res.json(patients))
});

// @ route GET api/patients/prescriptions
// @desc Get all Prescriptions that have been made in the system, collects all of them from all patients
// access Doctors?

router.get('/prescriptions', (req, res) => {
    Prescription.find()
    .populate('author')
    .then(prescriptions => res.json(prescriptions))
});

// @ route GET api/patients/prescriptions/:id
// @desc Get a specific Prescriptions that have been made in the system, collects all of them from all patients
// access Doctors?

router.get('/prescriptions/:id', async (req, res) => {
   Prescription.findById(req.params.id)
    .populate('author')
    .then(prescription => res.json(prescription))
})

router.get('/surgeries/:id', async (req, res) => {
    Surgery.findById(req.params.id)
     .populate('author')
     .then(surgery => res.json(surgery))
 })

// put everything above this shitty /:id route because it bugs out for some reason
// REMEMBER THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @ route GET api/patients/:id
// @desc Get specific patient
// @access Staff

router.get('/:id', (req, res) => {
    Patient.findById(req.params.id)
    .populate('author')
    .populate({path: 'notes', 
    populate: {
        path: 'author'
    }
})
    .populate({path: 'prescriptions', 
    populate: {
        path: 'author'
    }
})
.populate({path: 'surgeries', 
    populate: {
        path: 'author'
    }
})
    .then(patient => res.json(patient))
});

// @route POST api/patients
// @desc Create A Patient
// @access Staff

// Constructing an object to insert to the database
router.post('/', (req, res) => {
    const newPatient = new Patient({
        fullName: req.body.fullName,
        exitDate: req.body.exitDate,
        sex: req.body.sex,
        weight: req.body.weight,
        age: req.body.age,
        notes: req.body.notes,
        department: req.body.department,
        condition: req.body.condition,
        admissionDate: req.body.admissionDate,
        upcomingSurgeries: req.body.upcomingSurgeries,
        prescriptions: req.body.prescriptions,
        author: req.user._id,
        diagnosis: req.body.diagnosis,
        status: req.body.status

    })

    newPatient.save().then(patient => res.json(patient));
});

// @route PUT api/patients
// @desc Edit A Patient
// @access Staff

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    await Patient.findByIdAndUpdate(id, {...req.body.editPatient});
    res.status(200).send({});
})

// @route PUT api/patients
// @desc Edit A Patient
// @access Staff

// router.put('/:id/status', async (req, res) => {
//     const {id} = req.params;
//     await Patient.findByIdAndUpdate(id, {...req.body.editPatient.status});
//     console.log(req.body.editPatient.status)
//     res.status(200).send({});
// })


// @route DELETE api/patients
// @desc Delete A Patient
// @access Staff

// Deleting object from the database based on ID
router.delete('/:id', async (req, res) => {
    // Patient.findById(req.params.id)
    // .then(patient => patient.remove().then(() => res.json({success: true})))
    // .catch(err => res.status(404).json({success: false}));
    await Patient.findByIdAndDelete(req.params.id)
    res.status(200).send({});

})


// NOTES -----------

// @route POST api/patients/:id/notes
// @desc Add a note to patient
// @access Staff

router.post('/:id/notes', async (req, res) => {
   const patient = await Patient.findById(req.params.id);

   // constructing notification
   console.log(patient.author)
   const user = await User.findById(patient.author)
   const notification = new Notification({
       title: "A new note has been added to your patient!",
       details: patient._id
   });
   console.log(notification);
   user.notifications.push(notification);

   // constructing the note object to put in the patient
   const note = new Note(req.body.note);
   note.author = req.user._id
   patient.notes.push(note);
   await note.save()
   await patient.save();
   await notification.save();
   await user.save();
   res.send(note);
})

// @route PUT api/patients/:id/notes
// @desc Edit a specific note of a specific patient
// @access Staff

router.put('/:id/notes/:noteId', (req, res) => {
    Note.findByIdAndUpdate(req.params.noteId, req.body.editNote, function(err, updatedNote) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send({});
        }
    })
})

// @route DELETE api/patients/:id/notes/:noteId
// @desc Delete a note
// @access Administrator, note owner

// sending status 200 seems to have fixed the issue?
router.delete('/:id/notes/:noteId', async (req, res) => {
    const {id, noteId} = req.params
    await Patient.findByIdAndUpdate(id, {$pull: {notes: noteId}});
    await Note.findByIdAndRemove(noteId);
    res.status(200).send({});
})

router.get('/:id/notes/:noteId/edit', async (req, res) => {
    const {noteId} = req.params
    Note.findById(noteId)
    .then(note => res.json(note));
})


// PRESCRIPTIONS ------

// @route POST api/patients/:id/prescriptions
// @desc Add a prescription to a patient
// @access Staff

router.post('/:id/prescriptions', async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    const prescription = new Prescription(req.body.prescription);
    prescription.author = req.user._id
    patient.prescriptions.push(prescription);
    await prescription.save()
    await patient.save();
    res.send(prescription);
 })

// @route DELETE api/patients/:id/notes/:prescriptionId
// @desc Delete a prescription
// @access Administrator, prescription owner

 router.delete('/:id/prescriptions/:prescriptionId', async (req, res) => {
    const {id, prescriptionId} = req.params
    await Patient.findByIdAndUpdate(id, {$pull: {prescriptions: prescriptionId}});
    await Prescription.findByIdAndRemove(prescriptionId);
    res.status(200).send({});
})

router.get('/:id/prescriptions/:prescriptionId/edit', async (req, res) => {
    const {prescriptionId} = req.params
    Prescription.findById(prescriptionId)
    .populate('author')
    .then(prescription => res.json(prescription))
    // await Patient.findByIdAndUpdate(id, {$pull: {notes: noteId}});
    // await Note.findByIdAndRemove(noteId);
    // res.status(200).send({});
})

// @route PUT api/patients/:id/prescriptions/:prescriptionId
// @desc Edit a specific prescription of a specific patient
// @access Staff

router.put('/:id/prescriptions/:prescriptionId', (req, res) => {
    Prescription.findByIdAndUpdate(req.params.prescriptionId, req.body.editPrescription, function(err, updatedPrescription) {
        if (err) {
            console.log("here?")
            console.log(err)
        } else {
            res.status(200).send({});
        }
    })
})

// SURGERIES -----------

// @route POST api/patients/:id/surgeries
// @desc Add a surgery to the patient
// @access Staff

router.post('/:id/surgeries', async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    const surgery = new Surgery(req.body.surgery);
    // note.author = req.user._id
    patient.surgeries.push(surgery);
    await surgery.save()
    await patient.save();
    res.send(surgery);
 })
 
 // @route PUT api/patients/:id/surgeries/:surgeryId
 // @desc Edit a specific surgery of a specific patient
 // @access Staff
 
 router.put('/:id/surgeries/:surgeryId', (req, res) => {
     Surgery.findByIdAndUpdate(req.params.surgeryId, req.body.editSurgery, function(err, updatedSurgery) {
         if (err) {
             console.log(err)
         } else {
             res.status(200).send({});
         }
     })
 })
 
 // @route DELETE api/patients/:id/surgeries/:surgeryId
 // @desc Delete a surgery
 // @access Administrator, note owner
 
 // sending status 200 seems to have fixed the issue?
 router.delete('/:id/surgeries/:surgeryId', async (req, res) => {
     const {id, surgeryId} = req.params
     await Patient.findByIdAndUpdate(id, {$pull: {surgeries: surgeryId}});
     await Surgery.findByIdAndRemove(surgeryId);
     res.status(200).send({});
 })
 
 router.get('/:id/surgeries/:surgeryId/edit', async (req, res) => {
     const {surgeryId} = req.params
     Surgery.findById(surgeryId)
     .then(surgery => res.json(surgery));
 })



module.exports = router;