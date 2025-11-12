const mongoose = require('mongoose');

const subSubCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,15}$/,
    },
    slug : {
        type : String,
        default : ''
    },
    image : {
        type : String,
        default : ''
    },
    parent_category : {
        type : String,
        ref : 'categories',
        default : ''
    },
    sub_category : {
        type : String,
        ref : 'sub_categories',
        default : ''
    },
    status : {
        type : Boolean,
        default : 1
    },   // 0 - InActive 1 - Active
    order : {
        type : Number,
        default : 0,
        min : [0, 'Minumum value m ust be greather than 0'],
        max : 1000
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    updated_at : {
        type : Date,
        default : Date.now()
    },
    deleted_at : {
        type : Date,
        default : null
    },
});

const subSubCategoryModal = mongoose.model('sub_sub_categories', subSubCategorySchema);

module.exports = subSubCategoryModal;