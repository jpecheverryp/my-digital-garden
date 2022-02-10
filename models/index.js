const User = require('./User');
const Token = require('./RefreshToken');
const Note = require('./Note');

// Associate Users and Notes

User.hasMany(Note);

module.exports = { User, Token, Note };
