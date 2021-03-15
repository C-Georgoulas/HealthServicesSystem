
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const patients = require('./routes/api/patients');
const drugs = require('./routes/api/drugs');
const trainees = require('./routes/api/trainees')

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config

const db = require ('./config/keys').mongoURI;

// Connect to MongoDB

mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('Mongo DB Connected...'))
    .catch(err => console.log(err));

// Use Routes

app.use('/api/patients', patients);
app.use('/api/drugs', drugs);
app.use('/api/trainees', trainees)
app.use(cors())

// CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// Connect to deployment port or localhost

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));