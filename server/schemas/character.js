const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const characterSchema = new Schema({
    name: { type: String, required: true },
    classe: { type: String, required: true },
    level: { type: Number, required: true }
});

module.exports = mongoose.model('Character', characterSchema);
