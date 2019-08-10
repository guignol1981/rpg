const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const destinationSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    isDefault: { type: Schema.Types.Boolean, default: false }
});

module.exports = mongoose.model('Destination', destinationSchema);
