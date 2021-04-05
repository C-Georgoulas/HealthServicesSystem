const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserModel = require('../models/User');


const HASH_SALT = 15

const UserService = {
  getById: (id) => {
    return UserModel.findById(id).populate('notifications')
  },

  getOneByField: (fieldName, fieldValue) => {
    return UserModel.findOne({ [fieldName]: fieldValue }).populate('notifications')
  },

  add: async ({ name, email, password, role, department }) => {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }
    const hashedPassword = await bcrypt.hash(password, HASH_SALT)

    const result = await UserModel.findOneAndUpdate(
      { email },
      { name, email, password: hashedPassword, role, department },
      options
    )
    return { ...result._doc }
  },
}

module.exports = UserService
