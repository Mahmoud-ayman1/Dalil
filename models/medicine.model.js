const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    name:String,
    usage:String,
    dosage:String,
    sideEffects:String,
    link:String,
    category:[String]
})
module.exports=mongoose.model('medicine',schema)
