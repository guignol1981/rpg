const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const characterSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: Schema.Types.String, required: true },
    level: { type: Schema.Types.Number, default: 1 }
});

module.exports = mongoose.model('Character', characterSchema);
