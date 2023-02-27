const mongoose = require('mongoose');

const avatarRegExp = /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/i;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'This field should contain at least 2 characters'],
    maxlength: [30, 'This field should contain maximum 30 characters'],
    required: true
  },
  about: {
    type: String,
    minlength: [2, 'This field should contain at least 2 characters'],
    maxlength: [30, 'This field should contain maximum 30 characters'],
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
