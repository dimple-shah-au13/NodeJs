      const mongoose = require('mongoose');

      const userSchema = mongoose.Schema({
          username: {
              type: String,
          },
          email: {
              type: String,
          },
          mobile: {
              type: Number,
          },
          password: {
              type: String,
          },

          tokens: [{
              token: String,

          }]
      });

      var userModel = mongoose.model("user", userSchema) //  here v creating coolections as user in mongoDB and schema via
      module.exports = userModel;

      //module.exports = mongoose.model('user', userSchema); // other way of writing