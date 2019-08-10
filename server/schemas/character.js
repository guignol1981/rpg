const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const characterSchema = new Schema({
    user: { type: 'ObjectId', ref: 'User', required: true },
    name: { type: String, required: true },
    level: { type: Number, default: 1 }
});

module.exports = mongoose.model('Character', characterSchema);
