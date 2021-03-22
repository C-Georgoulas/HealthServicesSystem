const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Note = require('./Note')
const Prescription = require('./Prescription')

// Create Schema for patients

const PatientSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    sex: {
        type: String
    },
    age: {
        type: Number
    },
    weight: {
        type: Number
    },
    admissionDate: {
        type: Date,
        default: Date.now
    },
    exitDate: {
        type: Date
    },
    condition: {
        type: String
    },
    upcomingSurgeries: {
        type: String
    },
    prescriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Prescription"
        }
    ],
    status: {
        type: String
    },
    department: {
        type: String
    },
    diagnosis: {
        type: String
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
},
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ]


});

// This middleware deletes all notes and prescriptions associated with a specific Patient
// the patient in routes needs to be deleted by findByIdAndDelete otherwise it wont work

PatientSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Note.deleteMany({
            _id: {
                $in: doc.notes
            }
        })
        await Prescription.deleteMany({
            _id: {
                $in: doc.prescriptions
            }
        })
    }
})

module.exports = Patient = mongoose.model('patient', PatientSchema);