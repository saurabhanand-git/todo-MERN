const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const Name = mongoose.model('NAME',userSchema);

module.exports = Name;