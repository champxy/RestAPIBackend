const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    detail:{
        type:String,
    },
    price:{
        type:Number,
    },
    file:{
        type:String,
    }
},{timestamps:true});

module.exports = mongoose.model('Product', productSchema);