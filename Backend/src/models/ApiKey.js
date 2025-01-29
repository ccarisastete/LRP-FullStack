const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
    key:{type: String, required: true, unique: true},
    clientName:{type: String, required: true, unique: true},
    permissions: {type:[String],default:[]},
    createAt: {type:Date,default:Date.now}
});

module.exports = mongoose.model('ApiKey',apiKeySchema);