const express = require('express');
const router = express.Router();

// Trainee Model

const Trainee = require('../../models/Trainee');
const Grade = require('../../models/Grade');

// @ route GET api/trainees
// @desc Get all Trainees
// access Instructors

// sort's use is to sort all patients in a descending manner by the creationdate
router.get('/', (req, res) => {
    Trainee.find()
        .populate('author')
        .sort({date: -1})
        .then(trainees => res.json(trainees))
});

// @ route GET api/patients/grades
// @desc Get all Grades that have been submitted into the system.
// access Instructors

router.get('/grades', (req, res) => {
    Grade.find()
    .then(grades => res.json(grades))
});

// @ route GET api/patients/prescriptions/:id
// @desc Get a specific grade that has been added to the system.
// access Instructors

router.get('/grades/:id', async (req, res) => {
   Grade.findById(req.params.id)
    .populate('author')
    .then(grade => res.json(grade))
})

// put everything above this shitty /:id route because it bugs out for some reason
// REMEMBER THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @ route GET api/trainees/:id
// @desc Get specific trainee
// access Instructors

router.get('/:id', (req, res) => {
    Trainee.findById(req.params.id)
    .populate('author')
    .populate({path: 'grades', 
    populate: {
        path: 'author'
    }
})
    .then(trainee => res.json(trainee))
});

// @route POST api/trainees
// @desc Create A Trainee
// @access Instructors

// Constructing an object to insert to the database
router.post('/', (req, res) => {
    console.log(req.body);
    const newTrainee = new Trainee({
        fullName: req.body.fullName,
        endDate: req.body.endDate,
        sex: req.body.sex,
        age: req.body.age,
        grades: req.body.grades,
        startDate: req.body.startDate,
        author: req.body.author,
        status: req.body.status,
        department: req.body.department,
        averageGrade: req.body.averageGrade
    })

    newTrainee.save().then(trainee => res.json(trainee));
});

// @route PUT api/trainees
// @desc Edit A Trainee
// @access Instructors

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    await Trainee.findByIdAndUpdate(id, {...req.body.editTrainee});
    res.status(200).send({});
})

// Deleting object from the database based on ID
router.delete('/:id', async (req, res) => {
    await Trainee.findByIdAndDelete(req.params.id)
    res.status(200).send({});

})

// GRADES -----------

// @route POST api/patients/:id/grades
// @desc Add a note to trainee
// @access Instructors

router.post('/:id/grades', async (req, res) => {
    const trainee = await Trainee.findById(req.params.id);
    const grade = new Grade(req.body.grade);
    grade.author = req.user._id
    trainee.grades.push(grade);
    await grade.save()
    await trainee.save();
    res.send(grade);
 })
 
 // @route PUT api/patients/:id/grades
 // @desc Edit a specific grade of a specific trainee
// @access Instructors
 
 router.put('/:id/grades/:gradeId', (req, res) => {
     Grade.findByIdAndUpdate(req.params.gradeId, req.body.editGrade, function(err, updatedGrade) {
         if (err) {
             console.log(err)
         } else {
             res.status(200).send({});
         }
     })
 })
 
 // @route DELETE api/patients/:id/notes/:noteId
 // @desc Delete a grade
 // @access Administrator, grade owner
 
 // sending status 200 seems to have fixed the issue?
 router.delete('/:id/grades/:gradeId', async (req, res) => {
     const {id, gradeId} = req.params
     await Trainee.findByIdAndUpdate(id, {$pull: {grades: gradeId}});
     await Grade.findByIdAndRemove(gradeId);
     res.status(200).send({});
 })
 
 router.get('/:id/grades/:gradeId/edit', async (req, res) => {
     const {gradeId} = req.params
     Grade.findById(gradeId)
     .then(grade => res.json(grade));
 })

 module.exports = router;