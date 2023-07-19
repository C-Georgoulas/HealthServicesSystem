const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

// passport

const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const { COOKIE_NAME } = require("./client/src/common/config");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config

const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongo DB Connected..."))
  .catch((err) => console.log(err));

// CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const secret = "asdf33g4w4hghjkuil8saef345";
const env = process.env.NODE_ENV || "development";
const isLocal = env === "development";
/* Session Setup */
app.use(cookieParser("asdf33g4w4hghjkuil8saef345")); // read cookies (needed for auth)
if (!isLocal) {
  app.set("trust proxy", 1);
}
app.use(
  session({
    httpOnly: false,
    name: COOKIE_NAME,
    keys: [secret],
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
);

/* Session management with Passport */
app.use(passport.initialize());
app.use(passport.session());
require("./passport")(passport);

// Register Schema
require("./models/User");

// Insert some default users
// require('./config/_insertDefaultUsers')

const patients = require("./routes/api/patients");
const auth = require("./routes/api/auth");
const drugs = require("./routes/api/drugs");
const trainees = require("./routes/api/trainees");
const admin = require("./routes/api/admin");

// Use Routes

app.use("/api/patients", patients);
app.use("/api/drugs", drugs);
app.use("/api/trainees", trainees);
app.use("/api/auth", auth);
app.use("/api/admin", admin);
app.use(cors());

// Connect to deployment port or localhost

const port = process.env.PORT || 5000;

// Serve static assets if in production

if (process.env.NODE_ENV === "production") {
  // Set a static folder
  app.use(express.static(path.join(__dirname, "client", "build")));
  console.log("hello");
  app.get("*", (req, res) => {
    // directing the build to load the index.html file, should be loaded unless it hits the API.
    res.sendFile(path.join(_dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
