
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('passport')

const patients = require('./routes/api/patients');
const drugs = require('./routes/api/drugs');
const trainees = require('./routes/api/trainees')
const ROLES = require('./client/src/common/roles')

// passport

const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const { COOKIE_NAME } = require('./client/src/common/config')


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

const secret = process.env.APP_SECRET
const env = process.env.NODE_ENV || 'development'
const isLocal = env === 'development'
/* Session Setup */
app.use(cookieParser()) // read cookies (needed for auth)
if (!isLocal) {
  app.set('trust proxy', 1)
}
app.use(
  session({
    httpOnly: false,
    name: COOKIE_NAME,
    keys: [secret],
    secure: !isLocal,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
)

/* Session management with Passport */
app.use(passport.initialize())
app.use(passport.session())
require('./passport')(passport)

// Default app route
app.get('/*', function (req, res) {
  // Force redirect to HTTPS because cookie is set to secure: true
  if (!isLocal && req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`)
  } else {
    console.log("do nothing");
  }
})

// Register Schema
require('./models/User')

// Insert some default users
require('./config/_insertDefaultUsers')

// Connect to deployment port or localhost

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

