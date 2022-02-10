const User = require('./User');
const Token = require('./RefreshToken');
const Note = require('./Note');

// Associate Users and Notes
User.hasMany(Note);
Note.belongsTo(User);

module.exports = { User, Token, Note };
