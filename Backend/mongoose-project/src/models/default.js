const mongoose = require('mongoose');

const defaultSchema = new mongoose.Schema({
    name : String,
    status : Boolean,   // 0 - InActive 1 - Active
    order : Number,
    created_at : Date,
    updated_at : Date,
    deleted_at : Date,
});

const defaultModal = mongoose.model('defaults', defaultSchema);

module.exports = defaultModal;