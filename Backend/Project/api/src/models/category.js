const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,15}$/,
        // validate: {
        //     validator: async function(v) {
        //         const data = await this.constructor.findOne({ name: v, deleted_at : null });
        //         return !data;
        //     },
        //     message: props => `The specified data is already in use.`
        // }
    },
    slug : {
        type : String,
        default : ''
    },
    image : {
        type : String,
        default : ''
    },
    sub_categories : {
        type : Array,
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

const categoryModal = mongoose.model('categories', categorySchema);

module.exports = categoryModal;