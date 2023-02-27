const mongoose = require('mongoose');

const avatarRegExp = /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/i;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => { return avatarRegExp.test(v) },
      message: 'Please fill-in this field'
    }
  },
});

module.exports = mongoose.model('user', userSchema);
