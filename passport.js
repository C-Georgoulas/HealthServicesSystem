const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const UserService = require('./service/user-service')
var User = require('./models/User');

module.exports = function (passport) {
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    console.log('serializing user: ');
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserializing user:', user);
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy(
      {
        // Passport uses "username" and "password", so we override with the names that we want those fields to have
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      /**
       * This is the Auth handler. We check for a valid user phone and authenticate if found
       */
      async function (req, email, password, done) {
        const user = await UserService.getOneByField('email', email)

        // Check for valid user
        if (!user) {
          return done('Invalid credentials', false)
        }
        // Check for valid auth
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
          return done('Invalid credentials', false)
        }

        // All is well, return successful user
        console.log("passport.js file returns user")
        console.log(user);
        return done(null, user)
      }
    )
  )
}
