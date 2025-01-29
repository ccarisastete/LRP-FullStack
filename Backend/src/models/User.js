const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    phone:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')){
        this.password = await bycrypt.hash(this.password, 8);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);