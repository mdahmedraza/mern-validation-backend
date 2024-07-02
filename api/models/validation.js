const mongoose=require('mongoose');

const validationScehma=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: String
})
module.exports=mongoose.model('Validation', validationScehma);