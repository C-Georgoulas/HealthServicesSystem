const express = require("express");
const router = express.Router();
const passport = require("passport");
const AccessMiddleware = require("../../config/access");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const UserService = require("../../service/user-service");
const Notification = require("../../models/Notification");

// sort's use is to sort all patients in a descending manner by the creationdate
router.get("/user/:id/notifications", (req, res) => {
  User.findById(req.params.id)
    .populate("notifications")
    .then((user) => res.json(user.notifications));
});

router.put("/notifications/:id", async (req, res) => {
  const { id } = req.params;
  await Notification.findByIdAndUpdate(id, { ...req.body.editNotification });
  res.status(200).send({});
});

// @ route GET api/admin/users
// @desc Get all Users
// access Staff

// sort's use is to sort all patients in a descending manner by the creationdate
router.get("/users", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users));
});

// @route POST api/admin/create
// @desc Create A User
// @access Admin

// Constructing an object to insert to the database
router.post("/users/create", async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    department: req.body.department,
  };
  UserService.add(newUser).then((result) => {
    console.log(newUser);
  });
});

// @route PUT api/admin/users/:id/edit
// @desc Edit A User
// @access Admin

router.put("/users/:id/edit", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, { ...req.body.editUser });
  res.status(200).send({});
  console.log(req.body.editUser);
  // UserService.add(newUser).then((result) => {
  //     console.log(newUser)
  //   })
});

router.delete("/users/:id", async (req, res) => {
  // Patient.findById(req.params.id)
  // .then(patient => patient.remove().then(() => res.json({success: true})))
  // .catch(err => res.status(404).json({success: false}));
  console.log("delete request");
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send({});
});

module.exports = router;
