const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Emri është i detyrueshëm'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email-i është i detyrueshëm'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Fjalëkalimi është i detyrueshëm'],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
