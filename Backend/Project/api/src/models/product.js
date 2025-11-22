const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,15}$/,
    },
    code : {
        type : String,
        required : [true, 'Code is required']
    },
    slug : {
        type : String,
        default : ''
    },
    image : {
        type : String,
        default : ''
    },
    images : {
        type : Array,
        default : []
    },
    actual_price : {
        type : Number,
        default : 0,
        required : [true, 'Actual Price is required'],
    },
    sale_price : {
        type : Number,
        default : 0,
        required : [true, 'Sale price is required'],
    },
    is_featured : {
        type : Number,
        default : 2,  // 1 - Yes 2 - No
    },
    is_new_arrival : {
        type : Number,
        default : 2,  // 1 - Yes 2 - No
    },
    is_onsale : {
        type : Number,
        default : 2,  // 1 - Yes 2 - No
    },
    is_best_selling : {
        type : Number,
        default : 2,  // 1 - Yes 2 - No
    },
    is_upsell : {
        type : Number,
        default : 2,  // 1 - Yes 2 - No
    },
    is_top_rated : {
        type : Number,
        default : 2,  // 1 - Yes 2 - No
    },
    short_description : {
        type : String,
        required : [true, 'Short description is required']
    },
    description : {
        type : String,
        required : [true, 'Description is required']
    },
    quantity : {
        type : Number,
        required : [true, 'Quantity is required']
    },
    estimate_delivery_days : {
        type : String,
        required : [true, 'Estimate delivery days is required']
    },
    dimension : {
        type : String,
        required : [true, 'Dimension is required']
    },
    color_ids : {
        type : Array,
        ref : 'colors',
        required : [true, 'Color is required'],
        default : []
    },
    material_ids : {
        type : Array,
        ref : 'materials',
        default : []
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
    sub_sub_category_ids : {
        type : Array,
        ref : 'sub_sub_categories',
        default : []
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

const productModal = mongoose.model('products', productSchema);

module.exports = productModal;