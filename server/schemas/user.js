const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    hash: { type: String },
    salt: { type: String }
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

const model = mongoose.model('User', userSchema);

module.exports = model;
